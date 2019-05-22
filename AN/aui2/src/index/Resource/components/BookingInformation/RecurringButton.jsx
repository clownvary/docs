import React from 'react';
import cls from 'classnames';
import { connect } from 'react-redux';
import UIComponent from 'shared/components/UIComponent';

import ReservationPeriodUnit from '../../consts/reservationPeriodUnit';
import { startRecurringBooking } from '../../actions/recurringPattern';

export class RecurringButton extends UIComponent {
  isDisabled() {
    const {
      bookingError,
      hasRecurringBooking,
      reservationPeriodUnit,
      isNoRentalBlockOrEmpty
    } = this.props;

    return hasRecurringBooking ||
      (bookingError && bookingError.get('datetimeConflict') && !bookingError.getIn(['datetimeConflict', 'isOverrided'])) ||
      reservationPeriodUnit === ReservationPeriodUnit.DEFINED_DATE_RANGE ||
      (reservationPeriodUnit === ReservationPeriodUnit.RENTAL_BLOCK && isNoRentalBlockOrEmpty);
  }

  onAddRecurringBookins = () => {
    if (!this.isDisabled()) {
      this.props.startRecurringBooking({
        booking: this.props.booking
      });
    }
  }

  render() {
    const classes = cls('icon', 'icon-repeat-m', {
      'recurring-disable': this.isDisabled()
    });

    return (
      <i
        title="Create recurring"
        className={classes}
        onClick={this.onAddRecurringBookins}
      />
    );
  }
}

export default connect(
  null,
  {
    startRecurringBooking
  }
)(RecurringButton);
