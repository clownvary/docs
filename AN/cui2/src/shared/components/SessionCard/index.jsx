import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { injectIntl } from 'react-intl';
import isInteger from 'lodash/isInteger';
import uniqueId from 'lodash/uniqueId';
import { Icon } from 'react-base-ui/lib/components/SVG';
import Tag from 'react-base-ui/lib/components/Tag';
import { TagType } from 'react-base-ui/lib/components/Tag/consts';
import { KeyCode } from 'react-base-ui/src/consts';
import Card from 'shared/components/Card';
import { Heading } from 'shared/components/Heading';
import { FormattedDyncMessage } from 'shared/translation/formatted';
import sessionCardMessage from 'shared/translation/messages/Daycare/sessionCard';
import sessionStatusEnum from './consts/sessionStatusEnum';
import SessionCardFooter from './SessionCardFooter';

import 'react-base-ui/lib/svgs/check-circle-c.svg';
import 'react-base-ui/lib/svgs/check-circle-o.svg';
import 'react-base-ui/src/svgs/cancel-circle.svg';

import './index.less';

class SessionCard extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    orderable: PropTypes.bool,
    selectable: PropTypes.bool,
    index: (props, propName, componentName) => {
      if (props.orderable && !isInteger(props[propName])) {
        return new Error(`Prop '${propName}' is required and needs to be an integer if prop 'orderable' is true`);
      }
    },
    session: PropTypes.shape({
      session_id: PropTypes.String,
      first_date: PropTypes.string,
      last_date: PropTypes.string,
      beginning_time: PropTypes.string,
      ending_time: PropTypes.string,
      days_of_week: PropTypes.string,
      weeks_of_month: PropTypes.string
    }),
    selected: PropTypes.bool,
    onSelect: PropTypes.func
  };

  constructor(props) {
    super(props);
    this._uniqueId = uniqueId('session-card-');
  }

  renderDates() {
    const {
      first_date: firstDate,
      last_date: lastDate,
      weeks_of_month: weeksOfMonth
    } = this.props.session;

    return (
      <div className="session-dates an-col-2-5 an-md-col-4-11 an-sm-col-1-1" id={`${this._uniqueId}-date`}>
        <div className="session-dates__date">
          <Icon name="calendar-o" focusable="false"/>
          <FormattedDyncMessage value={`${firstDate} - ${lastDate}`} />
        </div>
        {
          weeksOfMonth &&
          <FormattedDyncMessage className="session-dates__text" value={weeksOfMonth} />
        }
      </div>
    );
  }

  renderTimes() {
    const {
      beginning_time: beginningTime,
      ending_time: endingTime,
      days_of_week: daysOfWeek
    } = this.props.session;
    return (
      <div className="session-times an-col-3-5 an-md-col-7-11 an-sm-col-1-1" id={`${this._uniqueId}-time`}>
        <Icon name="clock-m" focusable="false"/>
        <div>
          <FormattedDyncMessage value={`${daysOfWeek} `} />
          <FormattedDyncMessage value={`${beginningTime} - ${endingTime}`} />
        </div>
      </div>
    );
  }

  renderSessionTagNode() {
    const { selected, session, index, intl: { messages } } = this.props;
    const fullLabel = messages[sessionCardMessage.full.id];
    const waitingListLabel = messages[sessionCardMessage.waitingList.id];
    const partiallyFullLabel = messages[sessionCardMessage.partiallyFull.id];

    let tagType;
    let tagLabel;

    if (!selected && this.isShowPartiallyFull()) {
      tagType = TagType.ERROR;
      tagLabel = partiallyFullLabel;
    }

    if (session.session_status === sessionStatusEnum.FULL_NO_AVAILABLE_ALLOWWAITLIST) {
      tagType = selected ? TagType.PENDING : TagType.ERROR;
      tagLabel = selected ? waitingListLabel : fullLabel;
    }

    return tagType && <Tag type={tagType} className="session-card__status" id={`${this._uniqueId}-status`}>{tagLabel}</Tag>;
  }

  hasTag = () =>{
    const { selected, session } = this.props;

    let tagType;

    if (!selected && this.isShowPartiallyFull()) {
      tagType = TagType.ERROR;
    }

    if (session.session_status === sessionStatusEnum.FULL_NO_AVAILABLE_ALLOWWAITLIST) {
      tagType = selected ? TagType.PENDING : TagType.ERROR;
    }
    return !!tagType;
  }

  isShowPartiallyFull() {
    const { session } = this.props;
    const sessionStatus = session.session_status;

    return (sessionStatus === sessionStatusEnum.HAS_AVAILABLE_AND_FULL ||
      sessionStatus === sessionStatusEnum.HAS_AVAILABLE_AND_FULL_ALLOWWAITLIST ||
      this.isWaitlistedOrFullOrEnrolledAndNotAllowWaitLis() ||
      this.isWaitlistedOrFullOrEnrolledAndAllowWaitLis()
    )
  }

  isWaitlistedOrFullOrEnrolledAndNotAllowWaitLis() {
    const { session } = this.props;
    const sessionStatus = session.session_status;

    return (sessionStatus === sessionStatusEnum.HAS_AVAILABLE_AND_ENROLLED_FULL_NOT_ALLOWWAITLIST ||
      sessionStatus === sessionStatusEnum.HAS_AVAILABLE_AND_WAITLISTED_FULL_NOT_ALLOWWAITLIST ||
      sessionStatus === sessionStatusEnum.HAS_AVAILABLE_AND_WAITLISTED_FULL_ENROLLED_NOT_ALLOWWAITLIST
    )
  }

  isWaitlistedOrFullOrEnrolledAndAllowWaitLis() {
    const { session } = this.props;
    const sessionStatus = session.session_status;

    return (sessionStatus === sessionStatusEnum.ENROLLED_AND_FULL_ALLOWWAITLIST ||
      sessionStatus === sessionStatusEnum.WAITLISTED_AND_FULL_ALLOWWAITLIST ||
      sessionStatus === sessionStatusEnum.WAITLISTED_FULL_ENROLLED_ALLOWWAITLIST
    )
  }

  isPartiallyEnrolledOrWaitlisted() {
    const { session } = this.props;
    const sessionStatus = session.session_status;
    return (sessionStatus === sessionStatusEnum.HAS_AVAILABLE_AND_ENROLLED ||
      sessionStatus === sessionStatusEnum.HAS_AVAILABLE_AND_WAITLISTED ||
      sessionStatus === sessionStatusEnum.HAS_AVAILABLE_AND_ENROLLED_AND_WAITLISTED ||
      this.isWaitlistedOrFullOrEnrolledAndNotAllowWaitLis() ||
      this.isWaitlistedOrFullOrEnrolledAndAllowWaitLis()
    )
  }

  isPartiallyFullAndNotAllowWaitlist() {
    const { session } = this.props;
    const sessionStatus = session.session_status;
    return (sessionStatus === sessionStatusEnum.HAS_AVAILABLE_AND_FULL ||
      this.isWaitlistedOrFullOrEnrolledAndNotAllowWaitLis()
    );
  }

  isPartiallyFullAndAllowWaitlist() {
    const { session } = this.props;
    const sessionStatus = session.session_status;
    return (sessionStatus === sessionStatusEnum.HAS_AVAILABLE_AND_FULL_ALLOWWAITLIST ||
      this.isWaitlistedOrFullOrEnrolledAndAllowWaitLis()
    );
  }

  onCardClick = () => {
    const { selectable, onSelect, selected, session, disabled } = this.props;
    !disabled && selectable && onSelect && onSelect(session.session_id, !selected);
  };

  onKeyDown = (e) => {
    const keyCode = e.keyCode || e.which;

    if (keyCode === KeyCode.SPACE) {
      this.onCardClick();
      e.stopPropagation();
      e.preventDefault();
    }
  }

  onDeleteClick = () => {
    const { deletable, onDelete, index } = this.props;
    deletable && onDelete && onDelete(index);
  };

  getAriaLabelledby = () => {
    const { session, selected, index, extraDate, exceptionDate } = this.props;
    const partiallyFullDates = session.partially_full_dates || [];
    const waitlistedEnrolledDates = session.waitlisted_enrolled_dates || [];
    const showFooter = exceptionDate || extraDate || (selected && (partiallyFullDates.length || waitlistedEnrolledDates.length));
    const showTag = this.hasTag();
    const prefix = this._uniqueId;

    let ariaLabelIDs = [`${prefix}-date`, `${prefix}-time`] ;
    if (showFooter) {
      ariaLabelIDs.push(`${prefix}-footer`);
    }

    if (showTag) {
      ariaLabelIDs.push(`${prefix}-status`);
    }

    return ariaLabelIDs.join(' ');
  }

  render() {
    const { session, className, orderable, selectable, selected,
      disabled, index, deletable, extraDate, exceptionDate } = this.props;
    const isCheckedAndDisabled = session.is_check && disabled;
    return (
      <Card
        className={classNames('session-card', {
          'session-card__selectable': selectable,
          'session-card__disabled': disabled,
          'is-tag': this.hasTag()
        }, className)}
        onClick={this.onCardClick}
        onKeyDown={this.onKeyDown}
      >
        <div className="session-card__body">
          {
            orderable &&
            <Heading className="session-card__order">
              {index + 1}
            </Heading>
          }
          {
            selectable &&
            <div
              className="session-card__selection"
              role="checkbox"
              tabIndex={disabled ? -1 : 0}
              aria-checked={selected || isCheckedAndDisabled}
              aria-disabled={disabled}
              aria-labelledby={this.getAriaLabelledby()}
            >
              {
                selected || isCheckedAndDisabled ?
                  <Icon symbolPrefix="an-icon" name="check-circle-c" focusable="false"/> :
                  <Icon symbolPrefix="an-icon" name="check-circle-o" focusable="false"/>
              }
            </div>
          }
          <div className="session-card__content an-col-11-12 an-sm-col-7-8">
            {this.renderDates()}
            {this.renderTimes()}
          </div>

          { this.renderSessionTagNode() }
          {
            deletable &&
            <Icon symbolPrefix="an-icon" name="cancel-circle" onClick={this.onDeleteClick} />
          }
        </div>
        <SessionCardFooter
          session={session}
          exceptionDate={exceptionDate}
          extraDate={extraDate}
          selected={selected}
          prefix={this._uniqueId}
          isPartiallyEnrolledOrWaitlisted={this.isPartiallyEnrolledOrWaitlisted()}
          isPartiallyFullAndNotAllowWaitlist={this.isPartiallyFullAndNotAllowWaitlist()}
          isPartiallyFullAndAllowWaitlist={this.isPartiallyFullAndAllowWaitlist()}
        />
      </Card>
    );
  }
}

export default injectIntl(SessionCard);
