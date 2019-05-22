import URL from '../urls';

export const FETCH_ON_BOARDING_SUCCESS = 'FETCH_ON_BOARDING_SUCCESS';
export const UPDATE_ON_BOARDING_SUCCESS = 'UPDATE_ON_BOARDING_SUCCESS';
export const READY_ON_BOARDING = 'READY_ON_BOARDING';

export function fetchOnBoardingAsyncAction() {
  return {
    types: ['', FETCH_ON_BOARDING_SUCCESS, ''],
    promise: API => API.get(URL.onBoardingFeature)
  };
}

export function updateOnBoardingAsyncAction() {
  return {
    types: ['', UPDATE_ON_BOARDING_SUCCESS, ''],
    promise: API => API.post(URL.onBoardingFeature)
  };
}

export function readyOnBoardingAction() {
  return {
    type: READY_ON_BOARDING
  };
}
