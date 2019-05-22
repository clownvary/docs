import _Object$keys from 'babel-runtime/core-js/object/keys';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import createListenerCollection from '../shared/createListenerCollection';
import { FORM_INIT, setInit, setError, setValue } from './module';

var hasOwnProperty = Object.prototype.hasOwnProperty;

var Store = function () {
  function Store() {
    var _this = this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$asyncReducers = _ref.asyncReducers,
        asyncReducers = _ref$asyncReducers === undefined ? {} : _ref$asyncReducers,
        _ref$validators = _ref.validators,
        validators = _ref$validators === undefined ? {} : _ref$validators,
        _ref$initialState = _ref.initialState,
        initialState = _ref$initialState === undefined ? {} : _ref$initialState;

    _classCallCheck(this, Store);

    this.setError = function (name, value) {
      _this.dispatch(setError({
        name: name,
        value: value
      }));
    };

    this.getError = function (name) {
      var state = _this.getState();
      var stateForField = state[name];

      return stateForField && stateForField.errMsg;
    };

    this.setValue = function (name, value) {
      _this.dispatch(setValue({
        name: name,
        value: value
      }));
    };

    this.getValue = function (name) {
      var state = _this.getState();
      var stateForField = state[name];

      return stateForField && stateForField.value;
    };

    this.asyncReducers = asyncReducers;
    this.validators = validators;
    this.initialState = initialState;
    this.currentState = initialState;

    this.listeners = createListenerCollection();
    this.childStoreList = [];
  }

  Store.prototype.tryInjectValidator = function tryInjectValidator(key, validator) {
    return this.injectValidator(key, validator);
  };

  Store.prototype.injectValidator = function injectValidator(key, validator) {
    var _this2 = this,
        _extends2;

    if (typeof validator !== 'function') {
      throw new Error('Validator should be function when injecting async validator');
    }

    var unregisterValidator = function unregisterValidator(k) {
      delete _this2.validators[k];
    };

    // Don't inject the same validator
    if (hasOwnProperty.call(this.validators, key)) {
      return unregisterValidator;
    }

    this.validators = _extends({}, this.validators, (_extends2 = {}, _extends2[key] = validator, _extends2));

    return unregisterValidator;
  };

  Store.prototype.tryInvokeValidators = function tryInvokeValidators() {
    var _this3 = this;

    var currentState = this.getState();
    var validators = this.validators;
    var validatorKeys = _Object$keys(validators);

    // Try to invoke validators from child stores
    this.childStoreList.forEach(function (childStore) {
      childStore.tryInvokeValidators();
    });

    return validatorKeys.reduce(function (r, k) {
      var validator = validators[k];
      var validationResult = validator(currentState[k].value);

      // Dispatch `setError` action if possible
      if (validationResult.errMsg) {
        _this3.dispatch(setError({
          name: validationResult.name,
          value: validationResult.errMsg
        }));
      }

      return [].concat(r, [validationResult]);
    }, []);
  };

  Store.prototype.injectReducer = function injectReducer(key, reducer) {
    var _this4 = this,
        _extends3;

    if (typeof reducer !== 'function') {
      throw new Error('Reducer should be function when injecting async reducer');
    }

    var unregister = function unregister(k) {
      delete _this4.asyncReducers[k];
    };

    // Don't inject the same reducer
    if (hasOwnProperty.call(this.asyncReducers, key)) {
      return unregister;
    }

    this.asyncReducers = _extends({}, this.asyncReducers, (_extends3 = {}, _extends3[key] = reducer, _extends3));

    // Initialize form field status and get the default values
    this.dispatch({ type: FORM_INIT }, true);

    // Sync form field initital state if we have set that in the `initialState`
    if (this.initialState[key]) {
      this.dispatch(setInit({
        name: key,
        value: this.initialState[key]
      }), true);
    }

    return unregister;
  };

  Store.prototype.dispatch = function dispatch(action, suppressNotify) {
    var _this5 = this;

    if (typeof action.type === 'undefined') {
      throw new Error('Action must have a `type` property');
    }

    var state = this.currentState;
    var nextState = {};
    var reducerKeys = _Object$keys(this.asyncReducers);

    reducerKeys.forEach(function (k) {
      var reducer = _this5.asyncReducers[k];
      var previousStateForReducer = state[k];
      var nextStateForReducer = reducer(previousStateForReducer, action, k);

      nextState[k] = nextStateForReducer;
    });

    this.currentState = nextState;

    !suppressNotify && this.listeners.notify();
  };

  /** If you subscribe or unsubscribe while the listeners are being invoked, this
   *  will not have any effect on the `dispatch()` that is currently in progress.
  */


  Store.prototype.subscribe = function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    return this.listeners.subscribe(listener);
  };

  Store.prototype.getState = function getState() {
    return this.currentState;
  };

  Store.prototype.replaceState = function replaceState(state) {
    this.initialState = state;
    this.currentState = state;
  };

  return Store;
}();

export default Store;