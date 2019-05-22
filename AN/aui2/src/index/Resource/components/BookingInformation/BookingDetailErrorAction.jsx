import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import UIComponent from 'shared/components/UIComponent';
import { Icon } from 'react-base-ui/lib/components/SVG';
import { Authority } from 'shared/authorities';
import { conflictIgnoreType, bookingAPIErrorType } from '../../consts/bookingConflict';
import {
  bookingPanelClearErrAction
} from '../../actions/bookingPanelValidation';

export class BookingDetailErrorAction extends UIComponent {
  isAdvancedOverrideEnable = () => {
    const { bookingError } = this.props;
    const advancedError = bookingError && bookingError.get('datetimeAdvance');

    if (advancedError && advancedError.get('type') === bookingAPIErrorType.OVER_ADVANCE_MAXIMUM) {
      return Authority.isEnabled('overrideMaxAdvancedSetting');
    }

    return Authority.isEnabled('overrideMinAdvancedSetting');
  }

  onOverrideConflict = () => {
    const { bookingError, resourceID, bookingID, isRecurring, baseBookingID } = this.props;
    const conflictError = bookingError && bookingError.get('datetimeConflict');
    const isIgnoreEnabled = conflictError && conflictError.get('isIgnoreEnabled');
    const isConflictOverrided = conflictError && conflictError.get('isOverrided');

    if (isIgnoreEnabled) {
      this.props.bookingPanelClearErrAction({
        errorKey: 'overrideConflict',
        errorValue: !isConflictOverrided,
        resourceID,
        bookingID,
        isRecurring,
        baseBookingID
      });
    }
  }

  onOverrideAdvancedError = () => {
    const { bookingError, resourceID, bookingID, isRecurring, baseBookingID } = this.props;
    const advancedError = bookingError && bookingError.get('datetimeAdvance');
    const isAdvancedErrorOverrided = advancedError && advancedError.get('isOverrided');


    if (!this.isAdvancedOverrideEnable()) {
      return false;
    }

    let key = 'overrideAdvanceMinimum';

    if (advancedError && advancedError.get('type') === bookingAPIErrorType.OVER_ADVANCE_MAXIMUM) {
      key = 'overrideAdvanceMaximum';
    }

    return this.props.bookingPanelClearErrAction({
      errorKey: key,
      errorValue: !isAdvancedErrorOverrided,
      resourceID,
      bookingID,
      isRecurring,
      baseBookingID
    });
  }

  renderOverrideConflictButton() {
    const { bookingError } = this.props;
    const conflictError = bookingError && bookingError.get('datetimeConflict');
    const isIgnoreEnabled = conflictError && conflictError.get('isIgnoreEnabled');
    const ignoreType = conflictError && conflictError.get('ignoreType');
    const isConflictOverrided = conflictError && conflictError.get('isOverrided');
    let hoverOverrideIconText = 'Override';

    if (!isIgnoreEnabled && ignoreType) {
      switch (ignoreType) {
        case conflictIgnoreType.DISABLE_FOR_CLOSETIME_PERMISSON:
        case conflictIgnoreType.DISABLE_FOR_CONFLICT_PERMISSON:
          hoverOverrideIconText = 'You do not have permission to override the conflict';
          break;
        case conflictIgnoreType.DISABLE_FOR_FACILITY_SETTING:
        case conflictIgnoreType.DISABLE_FOR_SETTING:
          hoverOverrideIconText = 'Resource does not allow conflict booking';
          break;
        default:
          hoverOverrideIconText = 'Override';
          break;
      }
    }

    return (conflictError &&
      <div className="conflict-button">
        <a
          title={hoverOverrideIconText}
          onClick={this.onOverrideConflict}
        >
          <i
            className={classNames(
              'icon icon-conflict',
              {
                'override-enable': isIgnoreEnabled,
                'override-disable': !isIgnoreEnabled,
                override: isConflictOverrided
              }
            )}
          />
        </a>
      </div>
    );
  }

  renderAdvancedOverrideButton() {
    const { bookingError } = this.props;
    const advancedError = bookingError && bookingError.get('datetimeAdvance');
    const advancedOverrideEnable = this.isAdvancedOverrideEnable();
    const isAdvancedErrorOverrided = advancedError && advancedError.get('isOverrided');

    return advancedError &&
      <div className="advanced-button">
        <a
          title={advancedOverrideEnable ? 'Override' : 'You do not have permission to override the setting.'}
          onClick={this.onOverrideAdvancedError}
        >
          <Icon
            symbolPrefix="an-icon"
            name="override-time"
            className={classNames('icon-advanced', {
              override: isAdvancedErrorOverrided,
              'override-disable': !advancedOverrideEnable,
              'override-enable': advancedOverrideEnable
            })}
          />
        </a>
      </div>;
  }

  render() {
    const conflictAction = this.renderOverrideConflictButton();
    const advancedErrorAction = this.renderAdvancedOverrideButton();

    if (conflictAction) {
      return conflictAction;
    }

    if (advancedErrorAction) {
      return advancedErrorAction;
    }

    return null;
  }
}

export default connect(
  null,
  {
    bookingPanelClearErrAction
  }
)(BookingDetailErrorAction);
