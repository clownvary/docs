import { MessageGroup, MessageType } from 'src/services/message';
import { pageLoading } from 'src/services/loading';
import { ErrorObj, ErrorType } from 'src/errors';

export const TestTypes = {
  TEST_SUCCESS: 'TEST_SUCCESS',
  TEST_EXCEPTION: 'TEST_EXCEPTION',
  TEST_HTTP_FAILURE: 'TEST_HTTP_FAILURE',
  TEST_SERVICE_FAILURE: 'TEST_SERVICE_FAILURE',
  TEST_APP_FAILURE: 'TEST_APP_FAILURE'
};

export const callAPI = (testType, timeout = 1500) => {
  pageLoading.show();
  let msgGroup = null;
  const result = new Promise((resolve, reject) => {
    setTimeout(() => {
      pageLoading.hide();
      switch (testType) {
        case TestTypes.TEST_SUCCESS:
          resolve('Success');
          break;
        case TestTypes.TEST_EXCEPTION:
          reject(new Error('An exception happened in application.'));
          break;
        case TestTypes.TEST_HTTP_FAILURE:
          msgGroup = new MessageGroup(MessageType.ERROR, 'Resource not found.', 'HTTP Error');
          reject(new ErrorObj(ErrorType.HTTP, msgGroup));
          break;
        case TestTypes.TEST_SERVICE_FAILURE:
          msgGroup = new MessageGroup(MessageType.ERROR, 'Calling service error.', 'Service Error');
          reject(new ErrorObj(ErrorType.SERVICE, msgGroup));
          break;
        case TestTypes.TEST_APP_FAILURE:
          msgGroup = new MessageGroup(MessageType.ERROR, 'Some error happens in business logic.', 'Application Error');
          reject(new ErrorObj(ErrorType.APP, msgGroup));
          break;
        default:
          break;
      }
    }, timeout);
  });

  return result;
};

