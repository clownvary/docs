import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _Object$keys from 'babel-runtime/core-js/object/keys';

var _Form$contextTypes;

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import merge from 'lodash/merge';

import HField from './HField';
import TextInput from './TextInput';
import Store from './store';
import { noop, identity, shallowEqual, omit } from '../shared/utils';
import { FormPropTypes, FormStorePropTypes } from './types';
import { reduceFields, reduceFieldsProp } from './utils';

var aauiFormStore = _Object$keys(FormStorePropTypes)[0];
var FormDefaultConfig = {
  preSubmit: noop,
  shouldSubmit: function shouldSubmit() {
    return true;
  },
  onSubmit: noop,
  postSubmit: noop,
  onFail: noop,
  preChange: identity,
  onChange: noop,
  fields: {}
};

var Form = function (_PureComponent) {
  _inherits(Form, _PureComponent);

  function Form(props, context) {
    _classCallCheck(this, Form);

    // Sync the `this.state` and `this.store.currentState`
    var _this = _possibleConstructorReturn(this, _PureComponent.call(this, props, context));

    _this.handleSubmit = function (e) {
      e && e.preventDefault && e.preventDefault();

      _this.store.tryInvokeValidators();

      var _this$props = _this.props,
          preSubmit = _this$props.preSubmit,
          shouldSubmit = _this$props.shouldSubmit,
          onSubmit = _this$props.onSubmit,
          postSubmit = _this$props.postSubmit,
          onFail = _this$props.onFail;

      var _reduceFields = reduceFields(_this.store.getState()),
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

      var _reduceFields2 = reduceFields(fields),
          values = _reduceFields2.values,
          errors = _reduceFields2.errors,
          isValid = _reduceFields2.isValid;

      var _reduceFields3 = reduceFields(_this.state.fields),
          currentValues = _reduceFields3.values,
          currentErrors = _reduceFields3.errors;

      var _this$props2 = _this.props,
          preChange = _this$props2.preChange,
          onChange = _this$props2.onChange;


      if (!shallowEqual(currentValues, values) || !shallowEqual(currentErrors, errors)) {
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
      var fields = merge({}, this.store.getState(), reduceFieldsProp(nextProps.fields));
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


    return { fields: reduceFieldsProp(fields), isValid: true, changed: false };
  };

  Form.prototype.initStore = function initStore(props) {
    this.store = new Store(_extends({}, props, {
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
    var fields = _Object$keys(this.props.fields).map(function (fieldKey, index) {
      var field = _this2.props.fields[fieldKey] || {};
      var _field$layout = field.layout,
          Layout = _field$layout === undefined ? HField : _field$layout;


      return React.createElement(Layout, _extends({
        key: index,
        component: TextInput,
        name: fieldKey
      }, omit(field, ['layout'])));
    });

    if (typeof children === 'function') {
      children = children(_extends({}, this.state, { fields: fields }));
    }

    // If we have the `this.parentStore` then it means we're the nested form
    if (this.parentStore) {
      return React.createElement(
        'div',
        null,
        children
      );
    }

    return React.createElement(
      'form',
      { className: className, onSubmit: this.handleSubmit },
      children
    );
  };

  return Form;
}(PureComponent);

/**
 * Provide utility function and lifecycle methods for `Form`
 */
/* eslint-disable react/no-multi-comp */


Form.displayName = 'AUIForm';
Form.propTypes = _extends({}, FormPropTypes);
Form.defaultProps = _extends({}, FormDefaultConfig);
Form.contextTypes = (_Form$contextTypes = {}, _Form$contextTypes[aauiFormStore] = PropTypes.instanceOf(Store), _Form$contextTypes);
Form.childContextTypes = _extends({}, FormStorePropTypes);
export default Form;
export var createForm = function createForm() {
  var formConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (WrappedComponent) {
    var Connect = function (_PureComponent2) {
      _inherits(Connect, _PureComponent2);

      function Connect() {
        _classCallCheck(this, Connect);

        return _possibleConstructorReturn(this, _PureComponent2.apply(this, arguments));
      }

      Connect.prototype.render = function render() {
        return React.createElement(WrappedComponent, this.props);
      };

      return Connect;
    }(PureComponent);

    Connect.defaultProps = _extends({}, FormDefaultConfig, formConfig);

    return Connect;
  };
};