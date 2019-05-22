import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import isString from 'lodash/isString';
import Alert from 'react-base-ui/lib/components/Alert';
import UIComponent from 'shared/components/UIComponent';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import { Authority } from 'shared/authorities';
import {
  bookingPanelUpdateEventAction
} from '../../actions/bookingPanel';
import {
  bookingPanelClearErrAction,
  getAdvanceErrorMessage,
  getConflictMessage,
  getErrorsString
} from '../../actions/bookingPanelValidation';
import {
  hasUnOverridedAdvancedError,
  hasUnOverridedConflict
} from '../../utils/hasBookingItemError';
import {
  deleteAllConflictsBookingsAction
} from '../../actions/bookingPanelDelete';
import { bookingAPIErrorType } from '../../consts/bookingConflict';

export class ErrorSection extends UIComponent {
  onOverrideAllMinumum = () => {
    this.props.bookingPanelClearErrAction({
      errorKey: 'overrideAdvanceMinimum',
      errorValue: true
    });
  }

  onUnOverrideAllMinumum = () => {
    this.props.bookingPanelClearErrAction({
      errorKey: 'overrideAdvanceMinimum',
      errorValue: false
    });
  }

  onOverrideAllMaximum = () => {
    this.props.bookingPanelClearErrAction({
      errorKey: 'overrideAdvanceMaximum',
      errorValue: true
    });
  }

  onUnOverrideAllMaximum = () => {
    this.props.bookingPanelClearErrAction({
      errorKey: 'overrideAdvanceMaximum',
      errorValue: false
    });
  }

  onOverrideAllConflict = () => {
    this.props.bookingPanelClearErrAction({
      errorKey: 'overrideConflict',
      errorValue: true
    });
  }

  onUnOverrideAllConflict = () => {
    this.props.bookingPanelClearErrAction({
      errorKey: 'overrideConflict',
      errorValue: false
    });
  }

  onDeleteAllConfilicts = () => {
    this.props.deleteAllConflictsBookingsAction();
  }

  render() {
    const { error } = this.props;
    const errorBookings = error.get('bookings');
    const hasDisabledConflict = errorBookings && errorBookings
      .some(bookingError =>
        bookingError &&
        bookingError.get('datetimeConflict') &&
        !bookingError.getIn(['datetimeConflict', 'isIgnoreEnabled'])
      );
    const hasNoOverridedAdvancedMinimumError = hasUnOverridedAdvancedError(
      errorBookings, bookingAPIErrorType.BELOW_ADVANCE_MINIMUM);
    const hasNoOverridedAdvancedMaximumError = hasUnOverridedAdvancedError(
      errorBookings, bookingAPIErrorType.OVER_ADVANCE_MAXIMUM);

    const hasNoOverridedConflict = hasUnOverridedConflict(errorBookings);
    const belowMinimumNumber = error.get('belowMinimumNumber');
    const overMaximumNumber = error.get('overMaximumNumber');
    const conflictNumber = error.get('conflictNumber');
    const eventName = error.get('eventName');
    const hasEventNameError = isString(eventName) && eventName.length;
    const overrideMinAdvanceCls = classNames({
      'u-hidden': !Authority.isEnabled('overrideMinAdvancedSetting'),
      'override-advanced': Authority.isEnabled('overrideMinAdvancedSetting')
    });
    const overrideMaxAdvanceCls = classNames({
      'u-hidden': !Authority.isEnabled('overrideMaxAdvancedSetting'),
      'override-advanced': Authority.isEnabled('overrideMaxAdvancedSetting')
    });

    return (<div
      className={`${error.get('code') !== '1015' &&
        (error.get('serverMessages').size > 0 ||
          error.get('clientMessages').size > 0 ||
          hasEventNameError ||
          conflictNumber > 0 ||
          belowMinimumNumber > 0 ||
          overMaximumNumber > 0
      )
        ? '' : 'u-hidden'}`}
    >
      <Alert
        type="error"
        noClose
        className="error-box"
      >
        <ul>
          {error.get('serverMessages').map((item, i) => <li key={i}>{decodeHtmlStr(item)}</li>)}
          {error.get('clientMessages').map((item, i) => <li key={i}>{decodeHtmlStr(item)}</li>)}
          {
            !!belowMinimumNumber &&
            <li>
              {getAdvanceErrorMessage(belowMinimumNumber, true)}
              {
                  hasNoOverridedAdvancedMinimumError ?
                    <a
                      className={overrideMinAdvanceCls}
                      onClick={this.onOverrideAllMinumum}
                    >
                      {`Override ${getErrorsString(belowMinimumNumber)}`}
                    </a>
                :
                    <a
                      className={overrideMinAdvanceCls}
                      onClick={this.onUnOverrideAllMinumum}
                    >
                    Undo override
                  </a>
              }
            </li>
          }
          {!!overMaximumNumber &&
            <li>
              {getAdvanceErrorMessage(overMaximumNumber, false)}
              {
                hasNoOverridedAdvancedMaximumError ?
                  <a
                    className={overrideMaxAdvanceCls}
                    onClick={this.onOverrideAllMaximum}
                  >
                    {`Override ${getErrorsString(overMaximumNumber)}`}
                  </a>
                :
                  <a
                    className={overrideMaxAdvanceCls}
                    onClick={this.onUnOverrideAllMaximum}
                  >
                    Undo override
                  </a>
                }
            </li>
          }
          {hasEventNameError && <li>{eventName}</li>}
          {conflictNumber > 0 ? <li>{getConflictMessage(conflictNumber)}
            {hasNoOverridedConflict ?
              <span>
                <a
                  className={`${hasDisabledConflict ? 'u-hidden' : 'booking-conflict'}`}
                  onClick={this.onOverrideAllConflict}
                >
                  {conflictNumber > 1 ? 'Override all conflicts' : 'Override conflict'}
                </a>
                <a
                  className={`booking-conflict ${hasDisabledConflict ? '' : 'booking-conflict__deletion'}`}
                  onClick={this.onDeleteAllConfilicts}
                >
                  Delete all conflicts
                </a>
              </span>
              :
              <a
                className={`${hasDisabledConflict ? 'u-hidden' : 'booking-conflict'}`}
                onClick={this.onUnOverrideAllConflict}
              >
                Undo override
            </a>
            }
          </li> : ''}
        </ul>
      </Alert>
    </div>);
  }
}

export default connect(
  null,
  {
    bookingPanelUpdateEventAction,
    bookingPanelClearErrAction,
    deleteAllConflictsBookingsAction
  }
)(ErrorSection);
