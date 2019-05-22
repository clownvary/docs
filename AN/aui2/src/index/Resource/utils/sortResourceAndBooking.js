import { isIE } from 'react-base-ui/lib/utils/browser';

const dateCompareBase = (x, y) => {
  const dateDiff = x.diff(y);
  if (dateDiff === 0) {
    return 0;
  } else if (dateDiff > 0) {
    return 1;
  }
  return -1;
};

const dateCompare = (x, y) => {
  if (x && y) {
    const startResult = dateCompareBase(x.get('momentEventStart'), y.get('momentEventStart'));
    const endResult = dateCompareBase(x.get('momentEventEnd'), y.get('momentEventEnd'));
    return startResult || endResult;
  }
  return 0;
};

export const sortBookings = (x, y) => {
  try {
    const dateDiff = dateCompare(x, y);
    // order by date range
    if (dateDiff) {
      return dateDiff;
    }
    return 0;
  } catch (e) { // x or y may is undefined
    /* istanbul ignore next */
    return isIE() ? -1 : 1;
  }
};

export const reSortResourcesAndBookings = (bookingPanelResourceMap, resourceDetailMap) =>
  bookingPanelResourceMap
    .toList()
    .map(
      resource => resource.update('bookings', bookings =>
        bookings.sort((x, y) => sortBookings(x, y))))
    .sort((x, y) => {
      try {
        const valueX = x.getIn(['bookings', 0]);
        const valueY = y.getIn(['bookings', 0]);
        const dateDiff = dateCompare(valueX, valueY);
        if (dateDiff) {
          return dateDiff;
        }
        const resourceNameX = resourceDetailMap.getIn([x.get('resourceID'), 'resourceName']);
        const resourceNameY = resourceDetailMap.getIn([y.get('resourceID'), 'resourceName']);

        return resourceNameX.localeCompare(resourceNameY);
      } catch (e) { // valueY or valueX may is undefined
        /* istanbul ignore next */
        return isIE() ? -1 : 1;
      }
    });

export const reSortRecurringBookings = (bookingPanelRecurringMap) => {
  let recurringMap = bookingPanelRecurringMap;

  bookingPanelRecurringMap.map((recurBookingsInfo, baseBookingID) => {
    const recurringBookings = recurBookingsInfo.get('bookings');

    if (recurringBookings && recurringBookings.size > 1) {
      recurringMap = recurringMap.updateIn([baseBookingID, 'bookings'],
        bookings => bookings.sort((x, y) => sortBookings(x, y)));
    }

    return false;
  });

  return recurringMap;
};
