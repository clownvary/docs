import URL from '../urls';
import getDynamicUrl from '../utils/getDynamicUrl';

export const FETCH_SPECIAL_HANDLING_STATUS_SUCCESS =
  'FETCH_SPECIAL_HANDLING_STATUS_SUCCESS';
export const FETCH_SPECIAL_HANDLING_INFO_SUCCESS =
  'FETCH_SPECIAL_HANDLING_INFO_SUCCESS';
export const RESET_SPECIAL_HANDLING = 'RESET_SPECIAL_HANDLING';
export const TOGGLE_SPECIAL_HANDLING = 'TOGGLE_SPECIAL_HANDLING';

export const resetSpecialHandling = () => ({
  type: RESET_SPECIAL_HANDLING
});

export const closeSpecialHandlingAlert = () => ({
  type: TOGGLE_SPECIAL_HANDLING,
  payload: {
    shown: false
  }
});

export const fetchSpecialHandlingInfo = customerId => ({
  types: ['', FETCH_SPECIAL_HANDLING_INFO_SUCCESS, ''],
  promise: API =>
      API.get(getDynamicUrl(URL.fetchSpecialHandlingInfo, { customerId }))
});

export const fetchSpecialHandlingStatus = (customerId, shownAlert) => dispatch =>
  dispatch({
    types: ['', FETCH_SPECIAL_HANDLING_STATUS_SUCCESS, ''],
    promise: API =>
      API.get(getDynamicUrl(URL.fetchSpecialHandlingStatus, { customerId }))
  }).then(
    ({ payload: {
         body: {
           customer_special_handling_info: {
             customer_special_handling: specialHandling
           }
         }
       }
     }) => shownAlert && specialHandling && dispatch(fetchSpecialHandlingInfo(customerId))
  );
