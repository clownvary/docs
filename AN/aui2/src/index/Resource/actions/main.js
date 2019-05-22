import { updateResourceViewState } from 'shared/utils/globalStateHelper';
import URL from '../urls';
import { fetchResourcesBookingAsyncAction } from './booking';

export const MAIN_UPDATE_DATE_OF_DAY_AND_MONTH_VIEW = 'MAIN_UPDATE_DATE_OF_DAY_AND_MONTH_VIEW';
export const MAIN_UPDATE_LAST_DATE_OF_DAY_VIEW = 'MAIN_UPDATE_LAST_DATE_OF_DAY_VIEW';
export const MAIN_SWITCH_VIEW = 'MAIN_SWITCH_VIEW';
export const MAIN_UPDATE_READY4CHECKOUT = 'MAIN_UPDATE_READY4CHECKOUT';
export const MAIN_WINDOW_RESIZE = 'MAIN_WINDOW_RESIZE';

export function resizeAction(bodyHeight) {
  return {
    type: MAIN_WINDOW_RESIZE,
    payload: {
      value: bodyHeight
    }
  };
}

const switchView = isDayView => ({
  type: MAIN_SWITCH_VIEW,
  payload: {
    isDayView
  }
});


const updateDateOfDayAndMonthView = date => ({
  type: MAIN_UPDATE_DATE_OF_DAY_AND_MONTH_VIEW,
  payload: {
    date
  }
});

/**
 * When the user
 *  1. Select date for the day view or
 *  2. Choose month from the month view by the Date Nav
 *  3. Choose date from the month view date header
 * will trigger this action.
 */
export const updateDateOfDayAndMonthViewAction = date =>
  (dispatch, getState) => {
    const { main } = getState();
    updateResourceViewState(date, main.get('isDayView'));
    dispatch(updateDateOfDayAndMonthView(date));
  };

const updateLastDateOfDayView = date => ({
  type: MAIN_UPDATE_LAST_DATE_OF_DAY_VIEW,
  payload: {
    date
  }
});

export const updateLastDateOfDayViewAction = date =>
  (dispatch, getState) => {
    const { main } = getState();
    updateResourceViewState(date, main.get('isDayView'));
    dispatch(updateLastDateOfDayView(date));
  };


export const switchViewAction = (isDayView, date) => (dispatch) => {
  dispatch(switchView(isDayView));

  if (isDayView) {
    dispatch(updateDateOfDayAndMonthViewAction(date));
  } else {
    dispatch(updateLastDateOfDayViewAction(date));
  }

  return dispatch(fetchResourcesBookingAsyncAction());
};

const fetchReady4Checkout = () =>
  (dispatch, getState) => {
    const { batchID, receiptID } = getState().initialData;
    return dispatch({
      types: ['', '', ''],
      promise: API => API.get(URL.ready4checkout, {
        body: {
          batch_id: batchID,
          receipt_id: receiptID
        }
      })
    });
  };

export const fetchReady4CheckoutAsyncAction = () =>
  dispatch => dispatch(fetchReady4Checkout())
    .then(
      ({ payload: { body } }) => {
        dispatch({
          type: MAIN_UPDATE_READY4CHECKOUT,
          payload: {
            ready4Checkout: body.ready4checkout
          }
        });
      },
      err => Promise.reject(err)
    );
