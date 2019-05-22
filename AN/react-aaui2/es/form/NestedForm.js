import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _extends from 'babel-runtime/helpers/extends';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import connectForm from './connectForm';
import { FormFieldPropTypes } from './types';

var func = PropTypes.func,
    node = PropTypes.node;

var propTypes = _extends({}, FormFieldPropTypes, {
  children: node,
  onChange: func
});

var NestedForm = function (_PureComponent) {
  _inherits(NestedForm, _PureComponent);

  function NestedForm() {
    var _temp, _this, _ret;

    _classCallCheck(this, NestedForm);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.handleChange = function (_ref) {
      var values = _ref.values,
          errors = _ref.errors;
      var _this$props = _this.props,
          _this$props$api = _this$props.api,
          setValue = _this$props$api.setValue,
          setError = _this$props$api.setError,
          onChange = _this$props.onChange;


      setValue(values);
      setError(errors);

      if (typeof onChange === 'function') {
        onChange({ values: values, errors: errors });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  NestedForm.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        children = _props.children,
        rest = _objectWithoutProperties(_props, ['children']);

    return React.createElement(
      'div',
      null,
      React.Children.map(children, function (child) {
        return React.cloneElement(child, _extends({}, rest, {
          onChange: _this2.handleChange
        }));
      })
    );
  };

  return NestedForm;
}(PureComponent);

NestedForm.propTypes = propTypes;

export default connectForm()(NestedForm);