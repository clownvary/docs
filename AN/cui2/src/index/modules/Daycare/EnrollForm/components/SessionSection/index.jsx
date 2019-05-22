import React from 'react';
import { injectIntl } from 'react-intl';
import Alert from 'react-base-ui/lib/components/Alert';
import { count } from 'react-base-ui/lib/utils/dataAccess';
import { Toasts } from 'react-base-ui/lib/components/Toast';

import { formatI18n } from 'shared/translation/formatI18n';
import { FormattedMessage, FormattedDyncMessage } from 'shared/translation/formatted';
import SessionCardGroup from 'shared/components/SessionCardGroup';
import { ALL, INDIVIDUAL } from 'shared/components/SessionCardGroup/selectionMode';
import { Heading } from 'shared/components/Heading';
import selfMessages from './translations';
import Section from '../Section';
import EnrollCalendar from './EnrollCalendar';
import { SESSIONS } from '../../consts/sectionName';
import * as reservationUnit from '../../consts/reservationUnit';
import messageEnum from '../../consts/messageEnum';
import getAlertMessageStatus from '../../util/getAlertMessageStatus';

import './index.less';

/* eslint-disable no-lonely-if */
export class SessionSection extends React.PureComponent {

  componentWillUnmount() {
    this.toaster && this.toaster.clear();
  }

  onSectionExpandChange = () => {
    const { expanded, disabled, collapseSection, expandSection } = this.props;
    if (!disabled) {
      if (expanded) {
        return collapseSection(SESSIONS);
      }
      return expandSection(SESSIONS);
    }
    return null;
  };

  onDeleteSessionDates = (index) => {
    const { enrollSession, selectSessions } = this.props;
    const deleteDates = enrollSession.getIn(['sessionDatesSummary', index]).toJS();
    const selectedSessionDateIds = enrollSession.get('selectedSessionDateIds').toJS();
    const newSelectedSessionDateIds = selectedSessionDateIds.filter(
      id => !deleteDates.dc_session_date_ids.some(dateId => dateId === id));
    selectSessions(newSelectedSessionDateIds);
  }

  getToastConfig = (toaster) => {
    const { intl: { messages }, onToastClose } = this.props;
    const config = {
      key: selfMessages.scheduleConflictMessage.id,
      duration: 3,
      closable: false,
      content: formatI18n(messages[selfMessages.scheduleConflictMessage.id])
    };

    return {
      ...config,
      onClose: () => {
        toaster.hide ? toaster.hide(config.key) : null;
        onToastClose();
      }
    };
  }

  showConflictMessage = () => {
    if (!this.toasterPromise) {
      const container = document.getElementsByClassName('session-card-container')[0];
      const bottomGap = 24;
      this.toasterPromise = Toasts.create({
        container,
        position: 'bottom',
        style: { bottom: bottomGap }
      });
      this.showConflictMessage();
    } else {
      if (this.toaster) {
        this.toaster.show(this.getToastConfig(this.toaster));
      } else {
        this.toasterPromise.then((t) => {
          this.toaster = t;
          this.toaster.show(this.getToastConfig(this.toaster));
        });
      }
    }
  };

  renderParticipantSessions = () => {
    const { enrollSession, selectSessions } = this.props;
    const {
      sessions, selectedSessionIds, individualSelection, exceptionDates, extraDates
    } = enrollSession.toJS();
    const mode = individualSelection ? INDIVIDUAL : ALL;
    return (
      <div className="session-card-container">
        <SessionCardGroup
          className="no-choice-sessions"
          selectable
          mode={mode}
          sessions={sessions}
          exceptionDates={exceptionDates}
          extraDates={extraDates}
          selectedSessionIds={selectedSessionIds}
          onSelect={selectSessions}
        />
      </div>
    );
  };

  renderWeeklySessions = () => {
    const { enrollSession, selectSessions, participantId } = this.props;

    const sessionDatesSummary = enrollSession.get('sessionDatesSummary');
    const individualSelection = enrollSession.get('individualSelection');
    const sessions = sessionDatesSummary.toJS().map(session => ({
      first_date: session.start_date,
      last_date: session.end_date,
      beginning_time: session.start_time,
      ending_time: session.end_time,
      days_of_week: session.days_of_week
    }));

    return (<div className="an-col-1-1 session-calendar-container">
      <EnrollCalendar
        sessionDates={enrollSession.get('sessionDates')}
        selectedSessionDateIds={enrollSession.get('selectedSessionDateIds')}
        onSelect={selectSessions}
        participantId={participantId}
      />
      { sessions.length > 0 &&
        this.renderWeeklySessionSummary(sessions, individualSelection)
      }
    </div>);
  }

  renderWeeklySessionSummary = (sessions, individualSelection) => {
    const { intl: { messages } } = this.props;
    const selectedSummary = sessions.length > 1 ? 'selectedSummaryPlural' : 'selectedSummarySingular';
    const summary = formatI18n(messages[selfMessages[selectedSummary].id], {
      count: sessions.length
    });
    return (
      <div className="weekly-summary-container">
        <Heading level={4} className="weekly-summary">
          <FormattedDyncMessage value={summary} />
        </Heading>
        <SessionCardGroup
          className="weekly-sessions"
          sessions={sessions}
          deletable={individualSelection}
          onDelete={this.onDeleteSessionDates}
        />
      </div>
    );
  }

  renderAlertMessage() {
    const { enrollSession } = this.props;
    const messageCode = enrollSession.get('sessionsMessageCode');
    const sessionsLength = count(enrollSession.get('sessions'));
    const selectedLength = count(enrollSession.get('selectedSessionIds'));
    const isShowAlertMessage = getAlertMessageStatus(sessionsLength, selectedLength, messageCode);

    const { type, messageKey } = messageEnum[messageCode] || {};

    if (!messageKey || !isShowAlertMessage) {
      return null;
    }

    return (
      <Alert noClose type={type} className="enroll-session__alert">
        <FormattedMessage {...selfMessages[messageKey]} />
      </Alert>
    );
  }


  render() {
    const { intl: { messages }, expanded, disabled, error, enrollSession,
    scheduleConflict
   } = this.props;

    let title;
    let selectionTitle;
    let sessionNode;
    let errorMessage;

    scheduleConflict && this.showConflictMessage();

    switch (enrollSession.get('reservationUnit')) {
      case reservationUnit.NO_CHOICE:
        sessionNode = this.renderParticipantSessions();
        selectionTitle = formatI18n(messages[selfMessages.sessionEnrolling.id]);
        title = `${2} ${selectionTitle}`;
        errorMessage = selfMessages.requiredErrorMessage;
        break;
      case reservationUnit.WEEKLY:
        sessionNode = this.renderWeeklySessions();
        selectionTitle = formatI18n(messages[selfMessages.weeksAndSessionsEnrolling.id]);
        title = `${2} ${selectionTitle}`;
        errorMessage = selfMessages.requiredErrorMessageWeekly;
        break;
      default:
        selectionTitle = formatI18n(messages[selfMessages.sessionEnrolling.id]);
        title = `${2} ${selectionTitle}`;
        errorMessage = selfMessages.requiredErrorMessage;
        break;
    }
    const requiredError = error.get('required');
    return (
      <Section
        name={SESSIONS}
        className="enroll-session"
        title={title}
        ariaLableCollapse={`Section 2 ${selectionTitle} expand detail clickable arrow`}
        ariaLableExpand={`Section 2 ${selectionTitle} collapse detail clickable arrow`}
        expanded={expanded}
        disabled={disabled}
        onChange={this.onSectionExpandChange}
      >
        {
          requiredError ?
            <Alert type="error" noClose className="enroll-session__alert">
              <FormattedMessage {...errorMessage} />
            </Alert> : null
        }
        {
          !requiredError && this.renderAlertMessage()
        }
        {sessionNode}
      </Section>
    );
  }
}

export default injectIntl(SessionSection);
