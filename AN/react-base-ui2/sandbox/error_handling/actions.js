
import { showSuccess, showError, clearAll } from 'src/services/message';
import { ErrorObj } from '../../src/errors';
import { callAPI, TestTypes } from './callAPI';


export const doAsyncAction = (testType, custom = false) => () =>
  callAPI(testType).then(() => {
    if (custom) {
      showSuccess('Congratulations! The API call is success!');
    }
  }).catch((error) => {
    if (custom) {
      clearAll();
      if (ErrorObj.isException(error)) {
        showError(error.message);
        alert('Hey, we get an exception, display it on message board.');
      } else if (ErrorObj.isErrorObj(error)) {
        showError(error.messageGroup);
        alert('Use message board for HTTP and service error.');
      }
    } else {
      return Promise.reject(error);
    }
  });

const asyncAction1 = () => () =>
  callAPI(TestTypes.TEST_SUCCESS);

const asyncAction2 = custom => () =>
  callAPI(TestTypes.TEST_SERVICE_FAILURE).catch((error) => {
    if (custom) {
      showError(error.messageGroup);
      alert('Custom error handling: Showing error in message board instead of confirmation.');
    } else {
      return Promise.reject(error);
    }
  });

export const doAsyncChainAction = custom => (dispatch) => {
  clearAll();
  return asyncAction1()(dispatch).then(() => asyncAction2(custom)(dispatch));
};

// We DO NOT recomend chainnig dispatch
// Dispatch should follow principle of "throw and forget"
export const doDispatchChainAction = custom => (dispatch) => {
  clearAll();
  return dispatch(asyncAction1()).then(() => dispatch(asyncAction2(custom)));
};
