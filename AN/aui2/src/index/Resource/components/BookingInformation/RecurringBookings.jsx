import React from 'react';
import cls from 'classnames';
import { connect } from 'react-redux';
import Button from 'react-base-ui/lib/components/Button';
import UIComponent from 'shared/components/UIComponent';

import BookingDetailItem from './BookingDetailItem';
import {
  applyToAllAsyncAction,
  setRecurringBookingExpandedAction
} from '../../actions/bookingPanelRecurring';

export class RecurringBookings extends UIComponent {

  toggleExpanded = () => {
    const { baseBookingID, expanded } = this.props;
    this.props.setRecurringBookingExpandedAction(baseBookingID, !expanded);
  }

  onApplyButtonClick = () => {
    const { resourceID, baseBookingID } = this.props;
    this.props.applyToAllAsyncAction(resourceID, baseBookingID);
  }

  renderRecurringExpand() {
    const {
      bookings,
      expanded,
      baseBookingID,
      changedBaseBookingMap,
      waitingAppliedBaseBookingIds
    } = this.props;
    const iconClasses = cls('icon', {
      'icon-chevron-up': expanded,
      'icon-chevron-down': !expanded
    });

    const isShowApplyButton = waitingAppliedBaseBookingIds.some(id => id === baseBookingID);
    const isChangedBaseBooking = !!changedBaseBookingMap.get(baseBookingID);

    return (
      <div className="recurring-expand">
        <div className="recurring-expand__apply-section">
          {
            isShowApplyButton &&
              <Button
                className="btn apply-btn"
                type="primary"
                size="xs"
                onClick={this.onApplyButtonClick}
              >
                Apply to all recurrings
              </Button>
          }
        </div>
        <div className="recurring-expand__message-section">
          {
            isChangedBaseBooking && 'modified booking will be moved out of the recurring group.'
          }
        </div>
        <div className="recurring-expand__expand-section">
          <a
            onClick={this.toggleExpanded}
          >
            {`${bookings.size} instances of recurring`}
          </a>
          <i
            className={iconClasses}
            onClick={this.toggleExpanded}
          />
        </div>
      </div>
    );
  }

  renderRecurringBookings() {
    const {
      bookings,
      resource,
      resourceRentalBlocks,
      resourceDateRanges,
      setEditingRentalBlock,
      overrideRentalBlockErrors,
      pendingMovedRecurringBookingMap,
      baseBookingID,
      resourceID,
      bookingsErr
    } = this.props;

    return bookings.map((booking) => {
      const bookingID = booking.get('id');
      const isPendingMoved = pendingMovedRecurringBookingMap.has(bookingID);

      return (<BookingDetailItem
        key={`recurring-booking-${bookingID}`}
        isRecurring
        item={booking}
        baseBookingID={baseBookingID}
        resource={resource}
        resourceID={resourceID}
        showRecurringButton={false}
        hasRecurringBooking={false}
        isPendingMoved={isPendingMoved}
        resourceRentalBlocks={resourceRentalBlocks}
        resourceDateRanges={resourceDateRanges}
        setEditingRentalBlock={setEditingRentalBlock}
        overrideRentalBlockErrors={overrideRentalBlockErrors}
        bookingError={bookingsErr && bookingsErr.get(bookingID)}
      />);
    });
  }

  render() {
    const { expanded } = this.props;
    const classes = cls('detail-item', 'booking-item', { });

    return (
      <table className={classes}>
        <tbody>
          <tr>
            <td className="recurring-expand-wrapper-td">{this.renderRecurringExpand()}</td>
          </tr>
          {
            expanded &&
              <tr>
                <td>{this.renderRecurringBookings()}</td>
              </tr>
          }
        </tbody>
      </table>
    );
  }
}

export default connect(
  null,
  {
    applyToAllAsyncAction,
    setRecurringBookingExpandedAction
  }
)(RecurringBookings);
