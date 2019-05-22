import { fetchRentalBlockAndDateRangeByResourceIdsAsyncAction } from './configurationData';
import validateBookingsByTimeslot from '../utils/timeslotValidation';
import reservationPeriodUnit from '../consts/reservationPeriodUnit';
import {
  showBookingPanelAction,
  updateBookingToastContentAction,
  getBookingCountAction
} from './bookingPanel';
import {
  addEitableBookingsAndBookingPanelResourcesAction
} from './booking';

export const validateCreateBookingSize = (
  createdBookingSize,
  totalBookingSizeBeforeAdding,
  limitBookingsPerPermit,
  shouldLimitCreatedBooking = true
) => {
  let messageForTheLargeBookings = '';
  let availableBookingSize = createdBookingSize;
  const totalBookingSizeAfterAdding = availableBookingSize + totalBookingSizeBeforeAdding;

  // Limit total bookings
  if (totalBookingSizeAfterAdding > limitBookingsPerPermit) {
    availableBookingSize = limitBookingsPerPermit - totalBookingSizeBeforeAdding;
    messageForTheLargeBookings = `Limit of ${limitBookingsPerPermit} bookings in a single permit has been reached.`;
  }

  // limit created bookings
  if (shouldLimitCreatedBooking && (availableBookingSize > 200)) {
    availableBookingSize = 200;
    messageForTheLargeBookings = 'The first 200 bookings have been added. Please drag on calendar to add more.';
  }

  return {
    messageForTheLargeBookings,
    availableBookingSize
  };
};


const validateBookingsThenDispatch = bookings =>
  (dispatch, getState) => {
    const { initialData, configurationData } = getState();
    const rentalBlockMap = configurationData.get('rentalBlockMap');
    const definedDateRangeMap = configurationData.get('definedDateRangeMap');
    const totalBookingSizeBeforeAdding = dispatch(getBookingCountAction());
    bookings.forEach((newBooking) => {
      const { resource } = newBooking;
      const { resourceID, reservationPeriodUnit: RU } = resource;
      const strResourceID = `${resourceID}`;

      if (RU === reservationPeriodUnit.DEFINED_DATE_RANGE) {
        resource.definedDateRange = definedDateRangeMap.get(strResourceID).toJS();
      }

      if (RU === reservationPeriodUnit.RENTAL_BLOCK) {
        resource.rentalBlock = rentalBlockMap.get(strResourceID).toJS();
      }
    });

    validateBookingsByTimeslot(bookings, (data) => {
      if (bookings && bookings.length) {
        const createdBookingSize = data.length;
        const {
          messageForTheLargeBookings,
          availableBookingSize
         } = validateCreateBookingSize(
          createdBookingSize, totalBookingSizeBeforeAdding, initialData.limitBookingsPerPermit);

        if (availableBookingSize) {
          return dispatch(
            addEitableBookingsAndBookingPanelResourcesAction(data.splice(0, availableBookingSize))
          ).then(() => {
            dispatch(showBookingPanelAction());
            if (messageForTheLargeBookings) {
              dispatch(updateBookingToastContentAction(messageForTheLargeBookings));
            }
          });
        }

        dispatch(showBookingPanelAction());
        if (messageForTheLargeBookings) {
          dispatch(updateBookingToastContentAction(messageForTheLargeBookings));
        }
      }

      return Promise.resolve();
    });
  };

export const createBookingsAction = (bookings = []) => (dispatch, getState) => {
  const { configurationData } = getState();
  const validBookings = bookings.filter(({ resource }) => !!resource);
  const rentalBlockMap = configurationData.get('rentalBlockMap');
  const definedDateRangeMap = configurationData.get('definedDateRangeMap');

  const dateRangeRUList = [];
  const rentalBlockRUList = [];

  validBookings.forEach((booking) => {
    const resource = booking.resource;
    const reservationUnit = resource.reservationPeriodUnit;
    const resourceID = `${resource.resourceID}`;

    if (reservationUnit === 6) {
      const resourceDateRange = definedDateRangeMap.get(resourceID);

      if (!resourceDateRange) {
        dateRangeRUList.push(resourceID);
      }
    }

    if (reservationUnit === 7) {
      const resourceRentalBlock = rentalBlockMap.get(resourceID);

      if (!resourceRentalBlock) {
        rentalBlockRUList.push(resourceID);
      }
    }
  });

  if (rentalBlockRUList.length || dateRangeRUList.length) {
    return dispatch(fetchRentalBlockAndDateRangeByResourceIdsAsyncAction(
      dateRangeRUList, rentalBlockRUList)
    )
      .then(
        () => dispatch(
          validateBookingsThenDispatch(validBookings)
        ),
        err => Promise.reject(err)
      );
  }
  return dispatch(validateBookingsThenDispatch(validBookings));
};
