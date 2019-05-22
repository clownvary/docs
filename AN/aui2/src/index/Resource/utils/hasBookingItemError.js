export const hasDateRangeError = bookingError => bookingError && (
  bookingError.get('dateRangeID') ||
  bookingError.get('datetime') ||
  (bookingError.get('datetimeConflict') && !bookingError.getIn(['datetimeConflict', 'isOverrided'])) ||
  (bookingError.get('datetimeAdvance') && !bookingError.getIn(['datetimeAdvance', 'isOverrided']))
);

export const hasRentalBlockError = bookingError => bookingError && (
  bookingError.get('rentalBlockID') ||
  bookingError.get('datetime') ||
  (bookingError.get('datetimeConflict') && !bookingError.getIn(['datetimeConflict', 'isOverrided'])) ||
  (bookingError.get('datetimeAdvance') && !bookingError.getIn(['datetimeAdvance', 'isOverrided']))
);

export const hasNormalError = bookingError => bookingError && (
  bookingError.get('datetime') ||
  (bookingError.get('datetimeConflict') && !bookingError.getIn(['datetimeConflict', 'isOverrided'])) ||
  (bookingError.get('datetimeAdvance') && !bookingError.getIn(['datetimeAdvance', 'isOverrided']))
);

// has some conflict error which is not overrided
export const hasUnOverridedConflict = errorBookings =>
  errorBookings && errorBookings.some(bookingErr =>
    bookingErr &&
    bookingErr.get('datetimeConflict') &&
    !bookingErr.getIn(['datetimeConflict', 'isOverrided'])
  );

// has some advanced error which is not overrided
export const hasUnOverridedAdvancedError = (errorBookings, errorType) =>
  errorBookings && errorBookings.some((errorBooking) => {
    const datetimeAdvanceError = errorBooking && errorBooking.get('datetimeAdvance');

    if (datetimeAdvanceError && datetimeAdvanceError.get('type') === errorType) {
      return !datetimeAdvanceError.get('isOverrided');
    }

    return false;
  }
);
