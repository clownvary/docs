import { Message, MessageType } from 'src/common/message';
import { ErrorObj, ErrorType } from 'src/common/error';
import { pageLoading } from 'src/services/loading';
import * as TestType from './consts/TestType';


export const callAPI = (testType, timeout = 500) => {
  pageLoading.show();
  let msg = null;
  const result = new Promise((resolve, reject) => {
    setTimeout(() => {
      pageLoading.hide();
      switch (testType) {
        case TestType.SUCCESS:
          resolve('Success');
          break;
        case TestType.FAILURE_EXCEPTION:
          reject(new Error('An exception happened in application.'));
          break;
        case TestType.FAILURE_HTTP:
          msg = new Message(MessageType.ERROR, 'Resource not found.', 'HTTP Error');
          reject(new ErrorObj(ErrorType.HTTP, msg));
          break;
        case TestType.FAILURE_SERVICE:
          msg = new Message(MessageType.ERROR, 'Calling service error.', 'Service Error');
          reject(new ErrorObj(ErrorType.SERVICE, msg));
          break;
        case TestType.FAILURE_APP:
          msg = new Message(MessageType.ERROR, 'Some error happens in business logic.', 'Application Error');
          reject(new ErrorObj(ErrorType.APP, msg));
          break;
        default:
          break;
      }
    }, timeout);
  });

  return result;
};

