import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import { shallowEqualImmutable } from 'react-immutable-render-mixin';
import UIComponent from 'shared/components/UIComponent';
import Error from 'shared/components/Error';
import HelpLink from 'shared/components/HelpLink';
import {
  fetchWaiver,
  saveWaiver,
  changeWaiver,
  setWaiverErrorMessage,
  saveWaiverErrorMessage
} from 'shared/actions/waiver';
import {
  fetchNotes,
  saveNotes
} from 'shared/actions/notes';
import PermitFee from 'shared/components/PermitFee';
import Skylogix from 'shared/components/Skylogix';
import { skylogixValueChange } from 'shared/actions/skylogix';
import BreadCrumb from 'shared/components/BreadCrumb';
import Survey, { helper } from 'shared/components/Survey';
import { SpecialHandlingAlert } from 'shared/components/SpecialHandling';
import { fetchSpecialHandlingStatus, closeSpecialHandlingAlert } from 'shared/actions/specialHandling';
import {
  updateIsOverrideAction,
  updateUserNameAction,
  updateUserPasswordAction,
  clearPrerequisiteErrsAction
} from 'shared/actions/prerequisite';
import { scrollTop } from 'shared/utils/func';
import { ANResponseCode } from 'shared/consts';
import { count } from 'react-base-ui/lib/utils/dataAccess';
import LinkGroup from './components/LinkGroup';
import PermitType from './components/PermitType';
import PermitSearch from './components/PermitSearch';
import WaiverSection from './components/Waiver';
import NotesSection from './components/Notes';
import PermitFooterBtns from './components/PermitFooterBtns';
import ApprovalStages from './components/ApprovalStages';
import {
  setWaiverErrors,
  fetchReady4Checkout,
  fetchInCart,
  permitDetailsChanged
} from './actions/index';
import { fetchStageSequences, updateStageSequenceAsyncAction } from './actions/stageSequences';
import { addToCartCheck } from './actions/addToCart';
import {
  fetchQuestionsAsyncAction,
  changeQuestionAsyncAction,
  validateQuestionAsyncAction
} from './actions/survey';

import { getRequiredWaivers } from './utils/getRequiredWaivers';
import './index.less';

export class PermitDetail extends UIComponent {
  componentDidMount() {
    const { batchID,
      receiptID,
      receiptEntryID,
      ssn_numeric_only: ssnNumericOnly,
      ssn_valid_length: ssnValidLength,
      country_code: systemCountryCode,
      area_code: systemAreaCode } = this.props.initialData;
    this.props.fetchReady4Checkout(batchID, receiptID);
    this.props.fetchInCart(batchID, receiptID);
    this.props.fetchStageSequences(batchID, receiptID, receiptEntryID);

    const permitSearch = this.props.permitSearchData;
    const agentId = permitSearch.get('agentValue');
    const customerId = permitSearch.getIn(['customer', 'customer_id']);
    if (customerId > 0 || agentId > 0) {
      this.props.fetchQuestionsAsyncAction();
      this.props.fetchSpecialHandlingStatus(customerId || agentId);
    }

    helper.registerCustomRules({
      systemCountryCode,
      systemAreaCode,
      ssnNumericOnly,
      ssnValidLength
    });
  }

  componentWillReceiveProps(nextProps) {
    const { skylogix } = nextProps;
    const nextWaiver = nextProps.waiver.get('data');
    const Waiver = this.props.waiver.get('data');

    this.SkylogixValue = { is_lighting_PIN_required: skylogix.get('isLightingPINRequired') };
    /* istanbul ignore else */
    if (!shallowEqualImmutable(nextWaiver, Waiver) && isEmpty(getRequiredWaivers(nextWaiver))) {
      this.props.setWaiverErrors({});
    }
  }

  setSkylogixValue = (value) => {
    this.props.skylogixValueChange(value);
  };

  validateWaiverErrors() {
    const requriedWaivers = getRequiredWaivers(this.props.waiver.get('data'));
    if (!isEmpty(requriedWaivers)) {
      this.props.saveWaiverErrorMessage(requriedWaivers);
      this.props.setWaiverErrors();
      scrollTop();
      return false;
    }
    this.props.setWaiverErrors({});
    return true;
  }

  handleAddToCartCheck = () => {
    const onError = () => {
      scrollTop();
    };
    this.props.addToCartCheck(this.SkylogixValue, onError);
  };

  handleSubmit = () => {
    this.validateWaiverErrors();

    this.props.validateQuestionAsyncAction().then(
      () => this.handleAddToCartCheck(),
      () => scrollTop()
    );
  }

  getErrors() {
    const { main, permitSearchData, prerequisite, survey } = this.props;

    const {
      customer_error_msg: customerErrorMsg
    } = window.__permitDetail__.__initialState__;

    const waiverErrs = main.getIn(['errors', 'waiverErrors']);
    const questionErrs = survey.get('errors');
    const prerequisiteErrs = prerequisite.get('errors');

    const arrErrMessages = [];
    if (customerErrorMsg &&
      !permitSearchData.get('agentValue') &&
      !permitSearchData.getIn(['customer', 'customer_id'])) {
      arrErrMessages.push(customerErrorMsg);
    }

    if (isArray(questionErrs) && questionErrs.length) {
      questionErrs.forEach(err => arrErrMessages.push(err.message));
    }

    if (waiverErrs && waiverErrs.size) {
      waiverErrs.map(msg => msg && arrErrMessages.push(msg));
    }

    if (prerequisiteErrs && prerequisiteErrs.size) {
      prerequisiteErrs.map(err => arrErrMessages.push(err.get('message')));
    }

    return arrErrMessages;
  }

  render() {
    const { main, error, permitSearchData, permitTypeData, waiver, notes, permitFeeData,
      addToCart, runningCart, skylogix, breadCrumb, prerequisite, survey, specialHandlingData,
      initialData, pagination, stageSequences } = this.props;
    const {
      permitID,
      hideNotesSection,
      hideChecklistItemsSection,
      hideReservationCharges,
      hideCustomQuestionsSection,
      permitNumber,
      disabledSkyLogix,
      permitLabel: permitWording
    } = initialData;

    const errorMsgs = this.getErrors();

    const disableRunningCart = main.get('inCart') &&
      (!main.get('ready4Checkout') || main.get('isPermitDetailsChanged'));
    const showQuestion = (survey.get('hasRequiredQuestion') || !hideCustomQuestionsSection)
      && count(survey.get('questions')) > 0;
    const showLightingPINRequired = skylogix.get('showLightingPINRequired');
    const isLightingPINRequired = skylogix.get('isLightingPINRequired');
    const companyWording = main.get('companyLabel');

    return (
      <section
        ref={(ref) => { this._refs.permitDetail = ref; }}
        className="an-page permit-detail-page"
        id="permit-detail-page"
        style={{ height: window.forcedSetIFrameHeight }}
      >
        { /* istanbul ignore next */
          !__STATIC__ &&
          <BreadCrumb
            isPromptUser
            breadCrumb={breadCrumb}
          />
        }
        <div>
          <div className="page-title">
            <h1>{permitID > 0 ? `Reservation Details - # ${permitNumber}` : 'New Reservation Details'}</h1>
            <div className="tool-bar">
              <LinkGroup
                runningCart={runningCart}
                disableRunningCart={disableRunningCart}
                initialData={initialData}
              />
              <HelpLink pageName="PermitDetail.jsp" />
            </div>

          </div>
          {
            isArray(errorMsgs) && errorMsgs.length > 0 &&
            <div className="errorSection">
              <span className="icon aaui-alert-error-icon icon-times-circle" />
              <ul className={errorMsgs.length === 1 ? 'li-style-none' : ''}>
                {
                  errorMsgs.map(msg => <li>{msg}</li>)
                }
              </ul>
            </div>
          }
          <PermitType permitTypeData={permitTypeData} />
          <PermitSearch
            prerequisite={prerequisite}
            permitSearchData={permitSearchData}
            specialHandlingData={specialHandlingData}
            updateIsOverrideAction={this.props.updateIsOverrideAction}
            updateUserNameAction={this.props.updateUserNameAction}
            updateUserPasswordAction={this.props.updateUserPasswordAction}
            clearPrerequisiteErrsAction={this.props.clearPrerequisiteErrsAction}
            companyWording={companyWording}
          />
          <Survey
            questions={this.props.survey.toJS().questions}
            changeQuestion={this.props.changeQuestionAsyncAction}
            showQuestions={showQuestion}
            permitID={permitID}
          />
          {hideChecklistItemsSection === 'true' ? '' :
          <WaiverSection
            permitWording={permitWording}
            waiver={waiver}
            showUpArrowIcon={false}
            readOnly={false}
            fetchWaiver={this.props.fetchWaiver}
            saveWaiver={this.props.saveWaiver}
            changeWaiver={this.props.changeWaiver}
            setWaiverErrorMessage={this.props.setWaiverErrorMessage}
            setWaiverAgreeAllAction={this.props.setWaiverAgreeAllAction}
            permitDetailsChanged={this.props.permitDetailsChanged}
          />
          }
          <ApprovalStages
            initialData={initialData}
            stageSequencesList={stageSequences.get('stageSequencesList')}
            updateStageSequenceAsyncAction={this.props.updateStageSequenceAsyncAction}
          />
          {parseInt(permitID, 0) === 0 && hideNotesSection === 'true' ? '' :
          <NotesSection
            notes={notes}
            fetchNotes={this.props.fetchNotes}
            saveNotes={this.props.saveNotes}
            permitDetailsChanged={this.props.permitDetailsChanged}
          />
          }
          {
            hideReservationCharges === 'true' ?
              '' :
              <PermitFee
                permitFeeData={permitFeeData}
                permitDetailsChanged={this.props.permitDetailsChanged}
                initialData={initialData}
                pagination={pagination}
              />
          }
          {
            showLightingPINRequired === 'true' &&
            <Skylogix
              editDefaultValue={isLightingPINRequired}
              getValue={this.setSkylogixValue}
              disabled={disabledSkyLogix}
            />
          }
          <PermitFooterBtns
            addToCart={addToCart}
            skylogixValue={this.SkylogixValue}
            handleSubmit={showQuestion ? this.handleSubmit : this.handleAddToCartCheck}
            initialData={initialData}
          />
          {
            specialHandlingData.get('shown') &&
            <SpecialHandlingAlert
              {...specialHandlingData.toJS()}
              onClose={this.props.closeSpecialHandlingAlert}
            />
          }
          <Error
            error={error}
            title={error.get('list').some(
              errInfo => errInfo && (errInfo.code === ANResponseCode.NO_CUSTOMER_COMPANY_SELECTED)
            ) ? 'Select Customer / Company' : ''}
          />
        </div>
      </section>
    );
  }
}


export default connect(
  state => ({
    main: state.main,
    error: state.error,
    permitSearchData: state.permitSearch,
    permitTypeData: state.permitType,
    waiver: state.waiver,
    notes: state.notes,
    permitFeeData: state.permitFee,
    addToCart: state.addToCart,
    runningCart: state.runningCart,
    question: state.question,
    skylogix: state.skylogix,
    breadCrumb: state.breadCrumb,
    prerequisite: state.prerequisite,
    survey: state.survey,
    specialHandlingData: state.specialHandling,
    initialData: state.initialData,
    stageSequences: state.stageSequences,
    pagination: state.pagination
  }),
  {
    addToCartCheck,
    saveWaiverErrorMessage,
    fetchReady4Checkout,
    fetchInCart,
    fetchWaiver,
    saveWaiver,
    changeWaiver,
    setWaiverErrorMessage,
    setWaiverErrors,
    fetchNotes,
    saveNotes,
    permitDetailsChanged,
    skylogixValueChange,
    updateIsOverrideAction,
    updateUserNameAction,
    updateUserPasswordAction,
    clearPrerequisiteErrsAction,
    fetchQuestionsAsyncAction,
    changeQuestionAsyncAction,
    validateQuestionAsyncAction,
    fetchSpecialHandlingStatus,
    closeSpecialHandlingAlert,
    updateStageSequenceAsyncAction,
    fetchStageSequences
  }
)(PermitDetail);
