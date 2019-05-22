import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { shallowEqualImmutable } from 'react-immutable-render-mixin';
import { count } from 'react-base-ui/lib/utils/dataAccess';

import isArray from 'lodash/isArray';
import map from 'lodash/map';

import UIComponent from 'shared/components/UIComponent';
import Error from 'shared/components/Error';
import HelpLink from 'shared/components/HelpLink';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';
import Messager from 'shared/components/MessagerFromQueryString';
import Alert from 'react-base-ui/lib/components/Alert';
import { redirect } from 'shared/actions/route';
import { pages } from 'shared/consts';
import { scrollTop } from 'shared/utils/func';
import Skylogix from 'shared/components/Skylogix';
import BreadCrumb from 'shared/components/BreadCrumb';
import 'shared/components/CancelPermit/index.less';
import {
  saveWaiver,
  changeWaiverByEventID,
  saveWaiverErrorMessage,
  setWaiverErrorMessage,
  loadAddableWaivers
} from 'shared/actions/waiver';
import { saveNotes } from 'shared/actions/notes';
import { updateSkylogix } from 'shared/actions/skylogix';
import { SpecialHandlingAlert } from 'shared/components/SpecialHandling';
import { fetchSpecialHandlingStatus, fetchSpecialHandlingInfo } from 'shared/actions/specialHandling';
import { helper } from 'shared/components/Survey';
import { showMore } from 'shared/actions/pagination';
import { deleteReservationFeeDetail, resetFeeAsyncAction, applyToAll, detectSameCharge } from 'shared/actions/permitFee';
import ActionBar from './components/ActionBar';
import GeneralInformation from './components/GeneralInformation';
import EventList from './components/EventList';
import FeeSummary from './components/FeeSummary';
import AttachmentManage from './components/AttachmentManage';
import Footer from './components/Footer';
import './index.less';

import {
  permitDetailsChanged,
  setWaiverErrors,
  updateWaiverConfirmChangeError,
  removeWaiverConfirmChangeError,
  showTotalBalanceDueDetail
} from './actions/index';

import {
  showDetail,
  showUpdated,
  fetchEventDetail,
  configEvent,
  addEvent,
  setEventValidStatus,
  checkAllWaiverRequried,
  updateFee,
  fetchReservationFeeThenUpdate,
  deleteEvent,
  confirmAndResetFees,
  confirmAndResetFeesAfterSpecialHandling
} from './actions/eventList';

import { fetchAttachments, deleteAttachment, removeAttachedFile } from './actions/attachment';
import {
  deleteQuestionAsyncAction,
  changeQuestionAsyncAction,
  validateQuestionsAsyncAction,
  addQuestionAsyncAction
} from './actions/survey';

import {
  clickConfirmChange,
  isClickedConfirmChanges,
  confirmReservationDetailChange
} from './actions/footer';

import { fetchBalanceDueDetailAsyncAction } from './actions/balanceDueDetail';

import {
  setAmendmentReason,
  setAmendmentReasonShown,
  saveAmendmentReason
} from './actions/modals/amendmentReason';


import {
  fetchAgents,
  updateHolderInfo,
  getNewPermitHolder,
  updatePermitHolder,
  changeCustomerOrCompany,
  setResetFeesConfirmation
} from './actions/permitHolder';

import { isCancelled, isDenied } from './utils/permitStatus';
import AmendmentReasonModal from './components/modals/AmendmentReason';

const queryParams = queryString.parse(location.search);
const lastOperation = queryParams.operation;
let showMessager = true;

export class ReservationDetail extends UIComponent {
  componentWillReceiveProps(nextProps) {
    const nextWaiver = nextProps.waiver.get('allWaivers');
    const Waiver = this.props.waiver.get('allWaivers');
    const confirmChangeError = nextProps.main.get('confirmChangeError');
    if (!shallowEqualImmutable(nextWaiver, Waiver)
      && !confirmChangeError.get('waiverErrors').size) {
      this.props.setWaiverErrors({});
    }
  }

  componentDidMount() {
    const { initialData } = this.props;
    const {
      ssn_numeric_only: ssnNumericOnly,
      ssn_valid_length: ssnValidLength,
      country_code: systemCountryCode,
      area_code: systemAreaCode,
      reservationDetail: {
        general_information: {
          customer_id: customerId
        }
      }
    } = initialData;

    this.props.fetchSpecialHandlingStatus(customerId);

    helper.registerCustomRules({
      systemCountryCode,
      systemAreaCode,
      ssnNumericOnly,
      ssnValidLength
    });
  }

  setSkylogixValue = (value) => {
    this.props.updateSkylogix(value, permitDetailsChanged);
  };

  validateWaiverErrors() {
    const result = checkAllWaiverRequried(this.props.waiver.get('allWaivers'),
      this.props.eventDetail.get('eventValidStatus'), true);
    if (!result.allRequired) {
      this.props.saveWaiverErrorMessage(result.errors);
      this.props.updateWaiverConfirmChangeError(result.confirmChangeWaiverError);
      this.props.setWaiverErrors();
      scrollTop();
    }
  }

  handleSubmit = () => {
    this.validateWaiverErrors();
    this.props.isClickedConfirmChanges();

    this.props.validateQuestionsAsyncAction().then(
      () => {
        this.props.isClickedConfirmChanges(false);
        this.props.clickConfirmChange();
      },
      () => {
        this.props.isClickedConfirmChanges(false);
        scrollTop();
      }
    );
  }

  getHeaderErrors() {
    let arrErrMessages = [];
    const { survey, main } = this.props;

    map(survey.toJS(), (eventQuestion) => {
      if (isArray(eventQuestion.errors) && eventQuestion.errors.length > 0) {
        arrErrMessages = arrErrMessages.concat(
          eventQuestion.errors.map(objError => objError.message));
      }
    });

    map(main.getIn(['errors', 'waiverErrors']).toJS(), error => arrErrMessages.push(error));

    return arrErrMessages;
  }

  render() {
    const {
      main, error, actionBar, eventDetail, waiver, notes, facility, feeSummary, footer, skylogix,
      breadCrumb, balanceDueDetail, survey, amendmentReason, specialHandlingData, initialData,
      permitHolder, pagination
    } = this.props;
    const {
      reservationDetail,
      permitID,
      batchID,
      receiptID,
      isReservationDetailUpdated,
      disabledSkyLogix,
      sdireqauth,
      attachmentReadonly,
      permitNumber,
      permitLockMessage
    } = initialData;
    const reservations = convertCasingPropObj(reservationDetail);
    const permitStatus = reservations.actionBarInformation.changePermitStatus.currentStatus;
    const confirmChangeError = main.get('confirmChangeError');
    const errors = main.get('errors');
    const isLightingPINRequired = skylogix.get('isLightingPINRequired');
    const showLightingPINRequired = skylogix.get('showLightingPINRequired');
    const bookingCountExceedError = error.get('list').some(item => item.code === '1050');
    const expiredError = error.get('list').some(item => item.code === '1000');
    const isPermitDetailsChanged = main.get('isPermitDetailsChanged');
    const isSilientInsideWorkflow = !(isPermitDetailsChanged || isReservationDetailUpdated);
    const isSilientOutsideWorkflow = isSilientInsideWorkflow;
    const identifier = permitNumber ? `- ${permitNumber}` : null;
    const eventList = eventDetail.get('eventList');
    const isPermitHolderBeDropIn = permitHolder.get('isPermitHolderBeDropIn');
    const headerErrors = this.getHeaderErrors();

    let errorMessageTitle;
    if (bookingCountExceedError) {
      errorMessageTitle = 'Maximum Number of Bookings';
    } else if (expiredError) {
      errorMessageTitle = 'Request Date Expired';
    }

    if (isPermitDetailsChanged || count(errors.get('waiverErrors'))) {
      showMessager = false;
    }

    return (
      <section className="reservation-detail">
        {__STATIC__ ?
          undefined :
          <BreadCrumb
            isPromptUser
            breadCrumb={breadCrumb}
            isSilientInsideWorkflow={isSilientInsideWorkflow}
            isSilientOutsideWorkflow={isSilientOutsideWorkflow}
          />
        }
        <div className="an-page">
          <div className="page-title">
            <div>
              <h1>Reservation Detail</h1>
              {identifier && <span className="permit-number">{identifier}</span>}
            </div>
            <HelpLink pageName="ReservationDetail.jsp" />
          </div>
          {
            showMessager && <Messager />
          }

          {
            headerErrors.length > 0 &&
            <div className="errorSection">
              <span className="icon aaui-alert-error-icon icon-times-circle" />
              <ul className={headerErrors.length === 1 ? 'li-style-none' : ''}>
                {
                  headerErrors.map((item) => {
                    if (item && isNaN(item)) {
                      return (
                        <li>{item}</li>
                      );
                    }
                    return true;
                  })
                }
              </ul>
            </div>
          }
          {
            permitLockMessage ?
              <Alert type="warning" noClose className="permit-lock-message">
                <span>{permitLockMessage}</span>
              </Alert> : null
            }
          <ActionBar
            initialData={initialData}
            redirect={this.props.redirect}
            actionBar={actionBar}
            actionBarInformation={reservations.actionBarInformation}
            actionBarInformationNoCamel={reservationDetail.action_bar_information}
            expirationDate={reservationDetail.general_information.expiration_date}
            eventActionInformation={reservations.eventActionInformation}
            addEvent={this.props.addEvent}
            permitStatus={permitStatus}
          />
          <GeneralInformation
            eventList={eventList}
            initialData={initialData}
            reservationDetail={reservations}
            specialHandlingData={specialHandlingData}
            balanceDueDetail={balanceDueDetail ? balanceDueDetail.get('data').toJS() : {}}
            isShowTotalBalanceDueDetail={main.get('isShowTotalBalanceDueDetail')}
            isPermitDetailsChanged={isPermitDetailsChanged}
            fetchBalanceDueDetailAsyncAction={this.props.fetchBalanceDueDetailAsyncAction}
            showTotalBalanceDueDetail={this.props.showTotalBalanceDueDetail}
            permitDetailsChanged={this.props.permitDetailsChanged}
            fetchSpecialHandlingStatus={this.props.fetchSpecialHandlingStatus}
            fetchSpecialHandlingInfo={this.props.fetchSpecialHandlingInfo}
            permitHolder={permitHolder}
            updateHolderInfo={this.props.updateHolderInfo}
            getNewPermitHolder={this.props.getNewPermitHolder}
            updatePermitHolder={this.props.updatePermitHolder}
            changeCustomerOrCompany={this.props.changeCustomerOrCompany}
            setResetFeesConfirmation={this.props.setResetFeesConfirmation}
            pos={main.get('pos')}
          />
          <EventList
            ref={(c) => { this.permitDetailForm = c; }}
            eventList={eventList}
            initialData={initialData}
            eventDetail={eventDetail}
            permitID={permitID}
            permitStatus={permitStatus}
            batchID={batchID}
            receiptID={receiptID}
            showDetail={this.props.showDetail}
            fetchEventDetail={this.props.fetchEventDetail}
            configEvent={this.props.configEvent}
            waiverList={waiver}
            noteList={notes}
            facility={facility}
            eventActionInformation={reservations.eventActionInformation}
            redirect={this.props.redirect}
            pages={pages}
            confirmChangeError={confirmChangeError}
            changeWaiverByEventID={this.props.changeWaiverByEventID}
            saveWaiver={this.props.saveWaiver}
            saveNotes={this.props.saveNotes}
            permitDetailsChanged={this.props.permitDetailsChanged}
            removeWaiverConfirmChangeError={this.props.removeWaiverConfirmChangeError}
            setEventValidStatus={this.props.setEventValidStatus}
            setWaiverErrorMessage={this.props.setWaiverErrorMessage}
            lastOperation={lastOperation}
            showUpdated={this.props.showUpdated}
            updateFee={this.props.updateFee}
            fetchReservationFeeThenUpdate={this.props.fetchReservationFeeThenUpdate}
            deleteReservationFeeDetail={this.props.deleteReservationFeeDetail}
            deleteEvent={this.props.deleteEvent}
            loadAddableWaivers={this.props.loadAddableWaivers}
            survey={survey}
            addQuestion={this.props.addQuestionAsyncAction}
            deleteQuestion={this.props.deleteQuestionAsyncAction}
            changeQuestion={this.props.changeQuestionAsyncAction}
            resetFeeAsyncAction={this.props.resetFeeAsyncAction}
            pagination={pagination}
            showMore={this.props.showMore}
            applyToAll={this.props.applyToAll}
            detectSameCharge={this.props.detectSameCharge}
          />

          {!(isCancelled(permitStatus.value) || isDenied(permitStatus.value)) &&
            <FeeSummary summary={feeSummary} />
          }

          {
            showLightingPINRequired === 'true' &&
              <Skylogix
                editDefaultValue={isLightingPINRequired}
                getValue={this.setSkylogixValue}
                disabled={disabledSkyLogix}
              />
          }

          <AttachmentManage
            permitID={permitID}
            sdireqauth={sdireqauth}
            attachedFiles={this.props.attachments.get('attachedFiles')}
            permitStatus={permitStatus}
            attachmentReadonly={attachmentReadonly}
            fetchAttachments={this.props.fetchAttachments}
            deleteAttachment={this.props.deleteAttachment}
            removeAttachedFile={this.props.removeAttachedFile}
          />

          <Footer
            initialData={initialData}
            main={main}
            footer={footer}
            handleSubmit={() => { this.handleSubmit(); }}
            breadCrumb={breadCrumb.get('data')}
            isPermitHolderBeDropIn={isPermitHolderBeDropIn}
            paymentPlanInformation={reservations.paymentPlanInformation}
          />
        </div>
        {
          specialHandlingData.get('shown') &&
          <SpecialHandlingAlert
            {...specialHandlingData.toJS()}
            onClose={this.props.confirmAndResetFeesAfterSpecialHandling}
          />
        }
        <Error error={error} title={errorMessageTitle} />
        <AmendmentReasonModal
          shown={amendmentReason.get('shown')}
          value={amendmentReason.get('value')}
          required={amendmentReason.get('required')}
          onChange={(value) => { this.props.setAmendmentReason(value); }}
          onClose={() => {
            this.props.setAmendmentReasonShown(false);
            this.props.setAmendmentReason(amendmentReason.get('savedValue'));
          }}
          onConfirm={() => {
            this.props.saveAmendmentReason(amendmentReason.get('value'));
            this.props.setAmendmentReasonShown(false);
            this.props.confirmReservationDetailChange(() => { scrollTop(); });
          }}
        />
      </section>
    );
  }
}

export default connect(
  state => ({
    main: state.main,
    error: state.error,
    actionBar: state.actionBar,
    eventDetail: state.eventDetail,
    waiver: state.waiver,
    notes: state.notes,
    facility: state.facility,
    feeSummary: state.feeSummary,
    footer: state.footer,
    skylogix: state.skylogix,
    attachments: state.attachments,
    breadCrumb: state.breadCrumb,
    balanceDueDetail: state.balanceDueDetail,
    survey: state.survey,
    specialHandlingData: state.specialHandling,
    amendmentReason: state.amendmentReason,
    permitHolder: state.permitHolder,
    initialData: state.initialData,
    pagination: state.pagination
  }),
  {
    showDetail,
    fetchEventDetail,
    configEvent,
    addEvent,
    redirect,
    changeWaiverByEventID,
    saveWaiverErrorMessage,
    saveWaiver,
    saveNotes,
    permitDetailsChanged,
    updateWaiverConfirmChangeError,
    setEventValidStatus,
    setWaiverErrorMessage,
    showUpdated,
    clickConfirmChange,
    removeWaiverConfirmChangeError,
    isClickedConfirmChanges,
    setWaiverErrors,
    fetchReservationFeeThenUpdate,
    updateFee,
    updateSkylogix,
    deleteReservationFeeDetail,
    deleteEvent,
    showTotalBalanceDueDetail,
    fetchBalanceDueDetailAsyncAction,
    deleteQuestionAsyncAction,
    changeQuestionAsyncAction,
    validateQuestionsAsyncAction,
    fetchAttachments,
    deleteAttachment,
    removeAttachedFile,
    resetFeeAsyncAction,
    loadAddableWaivers,
    addQuestionAsyncAction,
    setAmendmentReason,
    setAmendmentReasonShown,
    saveAmendmentReason,
    confirmReservationDetailChange,
    fetchSpecialHandlingStatus,
    fetchSpecialHandlingInfo,
    fetchAgents,
    updateHolderInfo,
    getNewPermitHolder,
    updatePermitHolder,
    changeCustomerOrCompany,
    setResetFeesConfirmation,
    confirmAndResetFees,
    confirmAndResetFeesAfterSpecialHandling,
    showMore,
    applyToAll,
    detectSameCharge
  }
)(ReservationDetail);
