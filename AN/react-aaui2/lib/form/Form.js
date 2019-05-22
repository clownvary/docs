'use strict';

exports.__esModule = true;
exports.createForm = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _Form$contextTypes;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _HField = require('./HField');

var _HField2 = _interopRequireDefault(_HField);

var _TextInput = require('./TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _utils = require('../shared/utils');

var _types = require('./types');

var _utils2 = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var aauiFormStore = (0, _keys2.default)(_types.FormStorePropTypes)[0];
var FormDefaultConfig = {
  preSubmit: _utils.noop,
  shouldSubmit: function shouldSubmit() {
    return true;
  },
  onSubmit: _utils.noop,
  postSubmit: _utils.noop,
  onFail: _utils.noop,
  preChange: _utils.identity,
  onChange: _utils.noop,
  fields: {}
};

var Form = function (_PureComponent) {
  (0, _inherits3.default)(Form, _PureComponent);

  function Form(props, context) {
    (0, _classCallCheck3.default)(this, Form);

    // Sync the `this.state` and `this.store.currentState`
    var _this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call(this, props, context));

    _this.handleSubmit = function (e) {
      e && e.preventDefault && e.preventDefault();

      _this.store.tryInvokeValidators();

      var _this$props = _this.props,
          preSubmit = _this$props.preSubmit,
          shouldSubmit = _this$props.shouldSubmit,
          onSubmit = _this$props.onSubmit,
          postSubmit = _this$props.postSubmit,
          onFail = _this$props.onFail;

      var _reduceFields = (0, _utils2.reduceFields)(_this.store.getState()),
          values = _reduceFields.values,
          errors = _reduceFields.errors,
          isValid = _reduceFields.isValid;

      if (!isValid) {
        return onFail(errors);
      }

      if (shouldSubmit(values, preSubmit(values))) {
        onSubmit(values);
      }

      return postSubmit(values);
    };

    _this.handleChange = function () {
      var fields = _this.store.getState();

      var _reduceFields2 = (0, _utils2.reduceFields)(fields),
          values = _reduceFields2.values,
          errors = _reduceFields2.errors,
          isValid = _reduceFields2.isValid;

      var _reduceFields3 = (0, _utils2.reduceFields)(_this.state.fields),
          currentValues = _reduceFields3.values,
          currentErrors = _reduceFields3.errors;

      var _this$props2 = _this.props,
          preChange = _this$props2.preChange,
          onChange = _this$props2.onChange;


      if (!(0, _utils.shallowEqual)(currentValues, values) || !(0, _utils.shallowEqual)(currentErrors, errors)) {
        // trigger 'onChange' here on purpose
        onChange({ values: preChange(values), errors: errors, fields: fields });

        // store -> state
        _this.setState({ fields: fields, isValid: isValid, changed: true });
      }
    };

    _this.parentStore = props[aauiFormStore] || context[aauiFormStore];
    _this.state = _this.getInitState();
    _this.initStore(props);
    return _this;
  }

  Form.prototype.getChildContext = function getChildContext() {
    var _ref;

    return _ref = {}, _ref[aauiFormStore] = this.store, _ref;
  };

  Form.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.fields !== this.props.fields) {
      // Merge fields when receiving new fields
      var fields = (0, _merge2.default)({}, this.store.getState(), (0, _utils2.reduceFieldsProp)(nextProps.fields));
      this.store.replaceState(fields);
      this.setState({ fields: fields, changed: false });
    }
  };

  Form.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  };

  Form.prototype.getInitState = function getInitState() {
    var fields = this.props.fields;


    return { fields: (0, _utils2.reduceFieldsProp)(fields), isValid: true, changed: false };
  };

  Form.prototype.initStore = function initStore(props) {
    this.store = new _store2.default((0, _extends3.default)({}, props, {
      initialState: this.state.fields
    }));
    // Subscribe the changes of store
    this.unsubscribe = this.store.subscribe(this.handleChange);
    // Keep the child store reference from the parent store
    if (this.parentStore) {
      this.parentStore.childStoreList = [].concat(this.parentStore.childStoreList, [this.store]);
    }
  };

  Form.prototype.render = function render() {
    var _this2 = this;

    var _props$className = this.props.className,
        className = _props$className === undefined ? 'form--horizontal' : _props$className;

    var children = this.props.children;

    // Data-Driven Form
    var fields = (0, _keys2.default)(this.props.fields).map(function (fieldKey, index) {
      var field = _this2.props.fields[fieldKey] || {};
      var _field$layout = field.layout,
          Layout = _field$layout === undefined ? _HField2.default : _field$layout;


      return _react2.default.createElement(Layout, (0, _extends3.default)({
        key: index,
        component: _TextInput2.default,
        name: fieldKey
      }, (0, _utils.omit)(field, ['layout'])));
    });

    if (typeof children === 'function') {
      children = children((0, _extends3.default)({}, this.state, { fields: fields }));
    }

    // If we have the `this.parentStore` then it means we're the nested form
    if (this.parentStore) {
      return _react2.default.createElement(
        'div',
        null,
        children
      );
    }

    return _react2.default.createElement(
      'form',
      { className: className, onSubmit: this.handleSubmit },
      children
    );
  };

  return Form;
}(_react.PureComponent);

/**
 * Provide utility function and lifecycle methods for `Form`
 */
/* eslint-disable react/no-multi-comp */


Form.displayName = 'AUIForm';
Form.propTypes = (0, _extends3.default)({}, _types.FormPropTypes);
Form.defaultProps = (0, _extends3.default)({}, FormDefaultConfig);
Form.contextTypes = (_Form$contextTypes = {}, _Form$contextTypes[aauiFormStore] = _propTypes2.default.instanceOf(_store2.default), _Form$contextTypes);
Form.childContextTypes = (0, _extends3.default)({}, _types.FormStorePropTypes);
exports.default = Form;
var createForm = exports.createForm = function createForm() {
  var formConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (WrappedComponent) {
    var Connect = function (_PureComponent2) {
      (0, _inherits3.default)(Connect, _PureComponent2);

      function Connect() {
        (0, _classCallCheck3.default)(this, Connect);
        return (0, _possibleConstructorReturn3.default)(this, _PureComponent2.apply(this, arguments));
      }

      Connect.prototype.render = function render() {
        return _react2.default.createElement(WrappedComponent, this.props);
      };

      return Connect;
    }(_react.PureComponent);

    Connect.defaultProps = (0, _extends3.default)({}, FormDefaultConfig, formConfig);

    return Connect;
  };
};