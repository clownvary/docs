import React from 'react';
import { injectIntl } from 'react-intl';
import Tag from 'react-base-ui/lib/components/Tag';
import { TagType } from 'react-base-ui/lib/components/Tag/consts';
import { withResponsiveProvider } from 'react-base-ui/lib/services/responsive';
import sessionCardMessage from 'shared/translation/messages/Daycare/sessionCard';
import { formatI18n } from 'shared/translation/formatI18n';
import sessionStatusEnum from './consts/sessionStatusEnum';

export class SessionCardFooter extends React.Component {
  getSessionFooterLabel() {
    const { intl: { messages }, session, } = this.props;
    const sessionStatus = session.session_status;

    let labelText;
    const enrolledLabel = messages[sessionCardMessage.enrolled.id];
    const waitlistedLabel = messages[sessionCardMessage.waitlisted.id];

    switch (sessionStatus) {
      case sessionStatusEnum.HAS_AVAILABLE_AND_ENROLLED:
      case sessionStatusEnum.HAS_AVAILABLE_AND_ENROLLED_FULL_NOT_ALLOWWAITLIST:
      case sessionStatusEnum.ENROLLED_AND_FULL_ALLOWWAITLIST:
        labelText = enrolledLabel;
        break;
      case sessionStatusEnum.HAS_AVAILABLE_AND_WAITLISTED:
      case sessionStatusEnum.HAS_AVAILABLE_AND_WAITLISTED_FULL_NOT_ALLOWWAITLIST:
      case sessionStatusEnum.WAITLISTED_AND_FULL_ALLOWWAITLIST:
        labelText = waitlistedLabel;
        break;
      case sessionStatusEnum.HAS_AVAILABLE_AND_ENROLLED_AND_WAITLISTED:
      case sessionStatusEnum.HAS_AVAILABLE_AND_WAITLISTED_FULL_ENROLLED_NOT_ALLOWWAITLIST:
      case sessionStatusEnum.WAITLISTED_FULL_ENROLLED_ALLOWWAITLIST:
        labelText = `${enrolledLabel}/${waitlistedLabel}`;
        break;
    }
    return labelText;
  }

  renderFooterItem(label, text, tagText) {
    const {responsive: { isSm } } = this.props;
    return (
      <div className="session-card__footer__item u-text-break-all">
        <div className="session-card__footer__label">{label}</div>
        {!isSm ? <div>{text}</div> : null}
        {
          isSm ? <div>
            {text}
            {tagText &&
              <Tag className='session-times__status' type={TagType.PENDING}><span>{tagText}</span></Tag>}
          </div> :
            tagText &&
            <Tag className='session-times__status' type={TagType.PENDING}><span>{tagText}</span></Tag>
        }
      </div>
    );
  }

  render() {
    const { intl: { messages }, exceptionDate, extraDate, session, selected, isPartiallyEnrolledOrWaitlisted,
      isPartiallyFullAndNotAllowWaitlist, isPartiallyFullAndAllowWaitlist, prefix
    } = this.props;
      const sessionStatus = session.session_status;
      const extraDateLabel = messages[sessionCardMessage.extraDates.id];
      const exceptionDateLabel = messages[sessionCardMessage.exceptionDates.id];
      const enrolledWaitlistedDatesLabel = formatI18n(messages[sessionCardMessage.enrolledWaitlistedDates.id], {
        datesType: this.getSessionFooterLabel(messages, sessionStatus)
      });
      const exceptFullDatesLabel = messages[sessionCardMessage.exceptFullDates.id];
      const includeFullDatesLabel = messages[sessionCardMessage.includeFullDates.id];
      const waitingListLableText = messages[sessionCardMessage.waitingList.id];

      const partiallyFullDates = (session.partially_full_dates || []).join(' / ');
      const waitlistedEnrolledDates = (session.waitlisted_enrolled_dates || []).join(' / ');

    if (exceptionDate || extraDate || (selected && (partiallyFullDates || waitlistedEnrolledDates))) {
      return (
        <div className="session-card__footer" id={`${prefix}-footer`}>
          {extraDate && this.renderFooterItem(extraDateLabel, extraDate)}
          {exceptionDate && this.renderFooterItem(exceptionDateLabel, exceptionDate)}
          {
            selected && isPartiallyEnrolledOrWaitlisted &&
            this.renderFooterItem(enrolledWaitlistedDatesLabel, waitlistedEnrolledDates)
          }
          {
            selected && isPartiallyFullAndNotAllowWaitlist &&
            this.renderFooterItem(exceptFullDatesLabel, partiallyFullDates)
          }
          {
            selected && isPartiallyFullAndAllowWaitlist &&
            this.renderFooterItem(includeFullDatesLabel, partiallyFullDates, waitingListLableText)
          }
        </div>
      );
    }
    return null;
  }
}

export default withResponsiveProvider(injectIntl(SessionCardFooter));
