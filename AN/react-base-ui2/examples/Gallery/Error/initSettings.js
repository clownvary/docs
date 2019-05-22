

import { showSuccess, showError, clearAll } from 'src/services/message';
import { ErrorObj } from 'src/common/error';
import { createActionSpec, createOptionPropSpec, createBooleanPropSpec } from '../../App/utils/createPropSpec';
import pickProps from '../../App/utils/pickProps';
import * as TestType from './consts/TestType';
import { callAPI } from './callAPI';

const onSimulate = (settings, spec, log) => {
  const props = pickProps(settings, ['testType', 'custom']);
  const { testType = TestType.SUCCESS, custom = false } = props;
  window.demo_store.dispatch(() => callAPI(testType).then(() => {
    if (custom) {
      clearAll();
      showSuccess('Congratulations! The API call is success!');
    }
  }).catch((error) => {
    if (custom) {
      clearAll();
      if (ErrorObj.isException(error)) {
        showError(error.message);
        log('Hey, we got an exception...');
      } else if (ErrorObj.isErrorObj(error)) {
        showError(error.message);
        log(`Error with type ${error.type} happended`);
      }
    } else {
      return Promise.reject(error);
    }
  }));
};

const initSettings = {
  custom: createBooleanPropSpec('custom', 'Use Custom Handler', false),
  testType: createOptionPropSpec('testType', 'Simulation Type', TestType.SUCCESS, TestType),
  simulate: createActionSpec('simulate', 'Simulate', onSimulate)
};

export default initSettings;
