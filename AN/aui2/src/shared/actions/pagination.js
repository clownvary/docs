import forEach from 'lodash/forEach';
import find from 'lodash/find';
import uniqBy from 'lodash/uniqBy';

export const INIT_PAGINATIONS = 'INIT_PAGINATIONS';
export const SHOW_MORE_RECURRING_FEES = 'SHOW_MORE_RECURRING_FEES';

function initSetting(facilityFees, paginations) {
  const paginationOptions = {
    current: 1,
    pageCount: 100,
    isLastPage: false,
    remaining: 0
  };
  if (facilityFees && facilityFees.length) {
    forEach(facilityFees, (facilityFee) => {
      if (facilityFee.scheduleFees.length) {
        // if (masterFacilityScheduleId > 0), the schedule is a recurring-schedule;
        // if (masterFacilityScheduleId === 0), the schedule is a normal-schedule;
        const normalScheduleFees = facilityFee.scheduleFees
          .filter(schedule => !schedule.masterFacilityScheduleID);
        const recurringScheduleFees = facilityFee.scheduleFees
          .filter(schedule => schedule.masterFacilityScheduleID);

        forEach(normalScheduleFees, (normal) => {
          const fees = recurringScheduleFees.filter(item =>
            item.masterFacilityScheduleID === normal.facilityScheduleID
          );
          if (fees.length > 0) {
            const paginationId = fees[0].masterFacilityScheduleID;
            const total = fees.length;
            paginations.unshift({
              ...paginationOptions,
              paginationId,
              total,
              isLastPage: total <= paginationOptions.pageCount,
              remaining: total - (paginationOptions.current * paginationOptions.pageCount)
            });
          }
        });
      }
    });
  }
  return paginations;
}

export const initPaginations = () => (dispatch, getState) => {
  let paginations = getState().pagination.get('paginations').toJS();
  const fromPermitFee = !!getState().permitFee;
  const fromReservationDetail = !!getState().facility;

  if (fromPermitFee) {
    const facilityFees = getState().permitFee.get('facilityFees').toJS();
    paginations = initSetting(facilityFees, []);
  } else if (fromReservationDetail) {
    const events = getState().facility.get('allFacilities').toJS();
    if (Object.values(events).length) {
      forEach(Object.values(events), (event) => {
        const { eventFee: { facilityFees } } = event;
        initSetting(facilityFees, paginations);
      });
    }
  }

  return dispatch({
    type: INIT_PAGINATIONS,
    payload: {
      paginations: uniqBy(paginations, p => p.paginationId)
    }
  });
};

export const showMore = (paginationId, value) => (dispatch, getState) => {
  const paginations = getState().pagination.get('paginations').toJS();
  const pagination = find(paginations, p => p.paginationId === paginationId);
  let currentPage = 1;
  let isLastPage = false;
  let remaining = 0;

  if (pagination) {
    const {
      total,
      pageCount
    } = pagination;
    const remainder = total % pageCount;
    const page = Math.floor(total / pageCount);
    const lastPage = remainder === 0 ? page : page + 1;
    currentPage = value > lastPage ? lastPage : value;
    isLastPage = currentPage === lastPage;
    remaining = total - (currentPage * pageCount);
  }
  return dispatch({
    type: SHOW_MORE_RECURRING_FEES,
    payload: {
      paginationId,
      currentPage,
      isLastPage,
      remaining
    }
  });
};
