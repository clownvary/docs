'use strict';

exports.__esModule = true;
exports.setInit = exports.setError = exports.setValue = exports.SET_INIT = exports.SET_ERROR = exports.SET_VALUE = exports.FORM_INIT = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Constants
// ------------------------------------
var FORM_INIT = exports.FORM_INIT = 'FORM_INIT';
var SET_VALUE = exports.SET_VALUE = 'SET_VALUE';
var SET_ERROR = exports.SET_ERROR = 'SET_ERROR';
var SET_INIT = exports.SET_INIT = 'SET_INIT';

// ------------------------------------
// Actions
// ------------------------------------

var setValue = exports.setValue = function setValue(_ref) {
  var name = _ref.name,
      value = _ref.value;
  return {
    type: SET_VALUE,
    payload: value,
    meta: { name: name }
  };
};

var setError = exports.setError = function setError(_ref2) {
  var name = _ref2.name,
      value = _ref2.value;
  return {
    type: SET_ERROR,
    payload: value,
    meta: { name: name }
  };
};

var setInit = exports.setInit = function setInit(_ref3) {
  var name = _ref3.name,
      value = _ref3.value;
  return {
    type: SET_INIT,
    payload: value,
    meta: { name: name }
  };
};

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { value: undefined };
  var action = arguments[1];
  var name = arguments[2];

  if (action.meta && name !== action.meta.name) {
    return state;
  }

  switch (action.type) {
    case SET_ERROR:
      return (0, _extends3.default)({}, state, {
        errMsg: action.payload
      });
    case SET_VALUE:
      return (0, _extends3.default)({}, state, {
        value: action.payload
      });
    case SET_INIT:
      return (0, _extends3.default)({}, state, action.payload);
    default:
      return state;
  }
};

exports.default = reducer;