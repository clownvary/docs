import React from 'react';
import UIComponent from 'shared/components/UIComponent';
import BookingDetailItem from './BookingDetailItem';
import RecurringBookings from './RecurringBookings';

export default class BookingDetails extends UIComponent {
  render() {
    const { bookingsErr, bookings, resource,
      overrideRentalBlockErrors, recurringMap,
      changedBaseBookingMap,
      waitingAppliedBaseBookingIds,
      pendingMovedRecurringBookingMap,
      resourceID, resourceRentalBlocks, resourceDateRanges
    } = this.props;

    return (
      <div>
        {
          bookings.size &&
            bookings.map((booking) => {
              const data = booking;
              const dataID = data.get('resourceBookingID') > 0
                             ? data.get('resourceBookingID')
                             : data.get('transactionID');
              const key = parseInt(data.get('pendingID'), 10) !== -1 ? data.get('pendingID') : dataID;
              /* istanbul ignore else */
              const bookingId = booking.get('id').toString();
              const expanded = recurringMap.getIn([bookingId, 'expanded']);
              const recurringBookings = recurringMap.getIn([bookingId, 'bookings']);
              const hasRecurringBooking = recurringBookings && recurringBookings.count() > 0;

              return (
                <div>
                  <BookingDetailItem
                    isRecurring={false}
                    key={`booking-detail-item-${key}`}
                    item={booking}
                    resource={resource}
                    resourceID={resourceID}
                    showRecurringButton
                    hasRecurringBooking={hasRecurringBooking}
                    resourceRentalBlocks={resourceRentalBlocks}
                    resourceDateRanges={resourceDateRanges}
                    bookingError={bookingsErr && bookingsErr.get(bookingId)}
                    setEditingRentalBlock={this.props.setEditingRentalBlock}
                    overrideRentalBlockErrors={overrideRentalBlockErrors}
                  />
                  {
                    hasRecurringBooking &&
                      <RecurringBookings
                        expanded={expanded}
                        resource={resource}
                        resourceID={resourceID}
                        bookings={recurringBookings}
                        baseBookingID={bookingId}
                        bookingsErr={bookingsErr}
                        changedBaseBookingMap={changedBaseBookingMap}
                        waitingAppliedBaseBookingIds={waitingAppliedBaseBookingIds}
                        pendingMovedRecurringBookingMap={pendingMovedRecurringBookingMap}
                        resourceRentalBlocks={resourceRentalBlocks}
                        resourceDateRanges={resourceDateRanges}
                        setEditingRentalBlock={this.props.setEditingRentalBlock}
                        overrideRentalBlockErrors={overrideRentalBlockErrors}
                      />
                  }
                </div>
              );
            })
        }
      </div>
    );
  }
}
