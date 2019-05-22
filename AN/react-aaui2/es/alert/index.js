import _extends from 'babel-runtime/helpers/extends';
import _typeof from 'babel-runtime/helpers/typeof';
import Alert from './Alert';

import { alert, clear } from './util';

var wrapProps = function wrapProps(props) {
  var finalProps = props;

  if ((typeof props === 'undefined' ? 'undefined' : _typeof(props)) !== 'object') {
    finalProps = {
      message: props
    };
  }

  return _extends({}, finalProps);
};

Alert.success = function (props) {
  return alert(_extends({
    type: 'success'
  }, wrapProps(props)));
};

Alert.warning = function (props) {
  return alert(_extends({
    type: 'warning'
  }, wrapProps(props)));
};

Alert.error = function (props) {
  return alert(_extends({
    type: 'danger'
  }, wrapProps(props)));
};

Alert.info = function (props) {
  return alert(_extends({
    type: 'info'
  }, wrapProps(props)));
};

Alert.clear = function () {
  return clear();
};

export default Alert;