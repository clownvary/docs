import _extends from 'babel-runtime/helpers/extends';
// ------------------------------------
// Constants
// ------------------------------------
export var FORM_INIT = 'FORM_INIT';
export var SET_VALUE = 'SET_VALUE';
export var SET_ERROR = 'SET_ERROR';
export var SET_INIT = 'SET_INIT';

// ------------------------------------
// Actions
// ------------------------------------

export var setValue = function setValue(_ref) {
  var name = _ref.name,
      value = _ref.value;
  return {
    type: SET_VALUE,
    payload: value,
    meta: { name: name }
  };
};

export var setError = function setError(_ref2) {
  var name = _ref2.name,
      value = _ref2.value;
  return {
    type: SET_ERROR,
    payload: value,
    meta: { name: name }
  };
};

export var setInit = function setInit(_ref3) {
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
      return _extends({}, state, {
        errMsg: action.payload
      });
    case SET_VALUE:
      return _extends({}, state, {
        value: action.payload
      });
    case SET_INIT:
      return _extends({}, state, action.payload);
    default:
      return state;
  }
};

export default reducer;