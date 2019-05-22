import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router';
import Breadcrumb from 'react-base-ui/lib/components/Breadcrumb';
import BreadcrumbItem from 'react-base-ui/lib/components/Breadcrumb/Item';
import { withResponsiveProvider } from 'react-base-ui/lib/services/responsive';
import { Sticky, StickyContainer } from 'react-base-ui/lib/components/Sticky';
import syncRequest from 'react-base-ui/lib/common/restClient/syncRequest';
import { HttpMethod } from 'react-base-ui/lib/common/restClient';
import 'react-base-ui/lib/svgs';
import { push } from 'index/actions/router';
import { Heading } from 'shared/components/Heading';
import { formatI18n } from 'shared/translation/formatI18n';
import { FormattedDyncMessage } from 'shared/translation/formatted';
import { homeUrl, activitySearchUrl } from 'shared/consts/legancyUrls';
import buttonsMessages from 'shared/translation/messages/button';
import locationHelp from 'shared/utils/locationHelp';

import ParticipantSection from './components/ParticipantSection';
import SessionSection from './components/SessionSection';
import EnrollDetailSection from './components/EnrollDetailSection';
import FeeSummary from './components/FeeSummary';
import domainHelp from './util/domainHelp';
import selfMessages from './translations';

import {
  fetchParticipants,
  selectParticipant,
  selectEnrollSession,
  expandSection,
  collapseSection,
  selectPickups,
  changeQuestionAnswer,
  validateEnrollForm,
  fetchEnrollFormEntryAsyncAction,
  fetchPickups,
  uiScheduleConflictAction
} from './actions';
import { SESSIONS, ENROLL_DETAIL, PARTICIPANT } from './consts/sectionName';
import './index.less';

/* eslint-disable no-script-url */
export class EnrollForm extends React.PureComponent {
  static contextTypes = {
    getWording: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      stuck: false
    };
    this.isSessionModify = false;
    this.isEditChangeParticipant = false;
  }

  componentDidMount() {
    const { params: { programId }, location: { query: { reno = 0 } } } = this.props;
    this.props.fetchEnrollFormEntryAsyncAction(programId, parseInt(reno, 10));
    reno || this.fetchParticipantsAction();

    this.props.router.setRouteLeaveHook(
      this.props.route,
      this.routerWillLeave
    );

    window.addEventListener('unload', this.deleteTransaction);
  }

  componentWillUnmount() {
    locationHelp.destroy();
    this.deleteTransaction();
    window.removeEventListener('unload', this.deleteTransaction);
    domainHelp.resetDomain();
  }

  onToastClose = () => this.props.uiScheduleConflictAction(false);

  onAddToCartButtonClick = () => {
    this.props.validateEnrollForm().then(() => {
      this.isSessionModify = false;
      this.isEditChangeParticipant = false;
      locationHelp.destroy();
      this.props.push('newcart');
    });
  };

  getSectionExpandProps = (sectionName) => {
    const { collapse } = this.props;
    const expanded = !collapse.get('collapseSections').includes(sectionName);
    const disabled = collapse.get('disableSections').includes(sectionName);
    return {
      expanded,
      disabled,
      expandSection: this.props.expandSection,
      collapseSection: this.props.collapseSection
    };
  };

  getParticipantName = () => {
    const { participants } = this.props;
    const participantId = participants.get('id');
    const participant = participants.get('list').find(item => item.get('id') === participantId);
    if (participant) {
      return participant.get('name');
    }
    return null;
  };

  routerWillLeave = () => {
    const { intl: { messages } } = this.props;
    if (locationHelp.beforeunloadPrompt && (this.isSessionModify || this.isEditChangeParticipant)) {
      return messages[selfMessages.beforeunlodadPrompt.id];
    }
    return undefined;
  }

  deleteTransaction = () => {
    const { receipt } = this.props;
    const receiptNumber = receipt.get('receiptNumber');
    if (!locationHelp.notExecuteUnloadCallback && receiptNumber > 0 && this.isSessionModify) {
      const deleteTransactionAPI = `${window.__siteBaseName}/rest/transaction/${receiptNumber}`;
      try {
        syncRequest({
          url: deleteTransactionAPI,
          type: HttpMethod.POST
        });
      } catch (error) {
        navigator.sendBeacon(deleteTransactionAPI);
      }
    }
  }

  fetchParticipantsAction = () => {
    const { params: { programId } } = this.props;
    return this.props.fetchParticipants(programId);
  }


  selectParticipant = (participantId) => {
    const { params: { programId }, receipt, location: { query } } = this.props;
    // if edit transaction only initPromptWhenLeavePage
    if (query.reno) {
      this.isEditChangeParticipant = true;
      this.initLocationHelp();
    }

    const reno = receipt.toJS().receiptNumber;
    return this.props.selectParticipant(programId, participantId, reno);
  };

  fetchPickups = () => {
    const { params: { programId }, participants } = this.props;
    const participantId = participants.get('id');
    this.fetchParticipantsAction();

    return this.props.fetchPickups(programId, participantId);
  }

  initLocationHelp() {
    const { intl: { messages } } = this.props;

    locationHelp.initPromptWhenLeavePage({
      message: messages[selfMessages.beforeunlodadPrompt.id],
      unloadHook: this.deleteTransaction
    });
  }

  initPromptWhenLeavePage() {
    if (!this.isSessionModify) {
      this.initLocationHelp();
      this.isSessionModify = true;
    }
  }

  selectSessions = (ids) => {
    const { intl: { messages }, params: { programId }, receipt } = this.props;
    const reno = receipt.get('receiptNumber');
    const confirmMsg = {
      title: messages[selfMessages.Note.id],
      programChangedAlertMsg: messages[selfMessages.programChangedAlertMsg.id],
      programFullyAlertMsg: messages[selfMessages.programFullyAlertMsg.id],
      ok: messages[buttonsMessages.ok.id]
    };
    const notesMsg = {
      title: messages[selfMessages.Notes.id],
      detail: messages[selfMessages.reSelectParticipant.id]
    };
    this.initPromptWhenLeavePage();
    this.props.selectEnrollSession({ ids, programId, reno, messages: { confirmMsg, notesMsg } });
  };

  selectPickups = (params) => {
    this.initPromptWhenLeavePage();
    this.props.selectPickups(params);
  }

  changeQuestionAnswer = (params) => {
    this.initPromptWhenLeavePage();
    this.props.changeQuestionAnswer(params);
  }

  handleStickyStateChange = ({ isSticky: stuck }) => {
    this.setState({
      stuck
    });
  };

  renderTitle = () => {
    const { enrollForm, intl: { messages } } = this.props;
    const programName = enrollForm.get('programName');
    const enrollInLabel = formatI18n(messages[selfMessages.enrollIn.id]);
    return (
      <Heading level={1} className="enrollform__primary-header">
        <FormattedDyncMessage value={`${enrollInLabel} ${programName}`} />
      </Heading>);
  }

  render() {
    const {
      participants, enrollSession, feeSummary, enrollDetail, survey, enrollForm,
      intl: { messages }, params: { programId }, responsive: { isSm, isMd }
    } = this.props;
    const isMobileOrTablet = isSm || isMd;
    const { stuck } = this.state;
    const loginedCustomerId = enrollForm.get('loginedCustomerId');
    const { getWording } = this.context;
    const activitySearchLabel = formatI18n(messages[selfMessages.activitySearch.id], {
      activityLabel: getWording('online_activities_label')
    });
    const programLabel = formatI18n(messages[selfMessages.program.id], {
      daycareLabel: getWording('daycare_menu_title')
    });
    const enrollFormLabel = formatI18n(messages[selfMessages.enrollForm.id]);
    const programUrl = `${window.location.origin}${window.__siteBaseName}/daycare/program/${programId}`;

    const participantSectionExpandProps = this.getSectionExpandProps(PARTICIPANT);
    const sessionSectionExpandProps = this.getSectionExpandProps(SESSIONS);
    const enrollDetailSectionExpandProps = this.getSectionExpandProps(ENROLL_DETAIL);
    const participantName = this.getParticipantName();
    const error = enrollForm.get('error');
    const scheduleConflict = enrollForm.get('scheduleConflict');

    return (
      <div className="module-daycare">
        <Breadcrumb className="override-breadcrumb">
          <BreadcrumbItem >
            <a
              href="javascript:void(0)"
              onClick={() => locationHelp.redirect(homeUrl)}
            >
              <FormattedDyncMessage value={getWording('online_intro_label')} />
            </a>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <a
              href="javascript:void(0)"
              onClick={() => locationHelp.redirect(activitySearchUrl)}
            >
              <FormattedDyncMessage value={activitySearchLabel} />
            </a>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <a
              href="javascript:void(0)"
              onClick={() => locationHelp.redirect(programUrl)}
            >
              <FormattedDyncMessage value={programLabel} />
            </a>
          </BreadcrumbItem>
          <BreadcrumbItem isLast>{enrollFormLabel}</BreadcrumbItem>
        </Breadcrumb>
        {isMobileOrTablet && this.renderTitle()}
        <StickyContainer>
          <div className="an-grid an-col-mg-30">
            <div
              className="an-col an-col-8-12 an-md-col-1-1 an-sm-col-1-1 an-md-col-order-1 an-sm-col-order-1"
            >
              <div className="an-panel enrollform">
                {!isMobileOrTablet && this.renderTitle()}
                <div className="enrollform__sections">
                  <ParticipantSection
                    sectionNumber={1}
                    loginedCustomerId={loginedCustomerId}
                    fetchParticipantsAction={this.fetchParticipantsAction}
                    participants={this.props.participants}
                    {...participantSectionExpandProps}
                    error={error.get('participant')}
                    selectParticipant={this.selectParticipant}
                  />
                  <SessionSection
                    enrollSession={enrollSession}
                    {...sessionSectionExpandProps}
                    error={error.get('session')}
                    participantId={participants.get('participantId')}
                    selectSessions={this.selectSessions}
                    scheduleConflict={scheduleConflict}
                    onToastClose={this.onToastClose}
                  />
                  <EnrollDetailSection
                    loginedCustomerId={loginedCustomerId}
                    survey={survey}
                    enrollDetail={enrollDetail}
                    participantName={participantName}
                    isMobile={isSm}
                    isTablet={isMd}
                    {...enrollDetailSectionExpandProps}
                    pickupError={error.get('pickup')}
                    selectPickups={this.selectPickups}
                    changeQuestionAnswer={this.changeQuestionAnswer}
                    fetchPickups={this.fetchPickups}
                  />
                </div>
              </div>
            </div>
            <div className="an-col an-col-4-12 an-md-col-1-1 an-sm-col-1-1 an-lg-col-order-1">
              <Sticky
                topOffset={isMobileOrTablet ? 0 : -10}
                fullScreen={isMobileOrTablet}
                onChange={this.handleStickyStateChange}
              >
                <FeeSummary
                  feeSummary={feeSummary}
                  onAddToCartButtonClick={this.onAddToCartButtonClick}
                  stuck={stuck}
                />
              </Sticky>
            </div>
          </div>
        </StickyContainer>
      </div>
    );
  }
}

export default injectIntl(withResponsiveProvider(connect(
  state => ({
    participants: state.modules.Daycare.EnrollForm.participants,
    enrollSession: state.modules.Daycare.EnrollForm.enrollSession,
    collapse: state.modules.Daycare.EnrollForm.collapse,
    receipt: state.modules.Daycare.EnrollForm.receipt,
    enrollDetail: state.modules.Daycare.EnrollForm.enrollDetail,
    survey: state.modules.Daycare.EnrollForm.survey,
    feeSummary: state.modules.Daycare.EnrollForm.feeSummary,
    enrollForm: state.modules.Daycare.EnrollForm.enrollForm
  }),
  {
    fetchEnrollFormEntryAsyncAction,
    fetchParticipants,
    selectParticipant,
    selectEnrollSession,
    expandSection,
    collapseSection,
    selectPickups,
    changeQuestionAnswer,
    validateEnrollForm,
    fetchPickups,
    push,
    uiScheduleConflictAction
  }
)(withRouter(EnrollForm))));
