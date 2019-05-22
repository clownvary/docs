import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _Object$defineProperties from 'babel-runtime/core-js/object/define-properties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import { bool, number, string, object, func, node, oneOfType } from 'prop-types';

import RadioComponent from './RadioComponent';
import { identity } from '../shared/utils';

var Radio = function (_Component) {
  _inherits(Radio, _Component);

  function Radio() {
    var _temp, _this, _ret;

    _classCallCheck(this, Radio);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.setRef = function (radioComponent) {
      _this.radioComponent = radioComponent;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // Support legacy API for `this.refs.checkbox.checked`
  // It's not recommended because it breaks component encapsulation and
  // it violates the unidirectional data flow for React
  Radio.prototype.componentDidMount = function componentDidMount() {
    _Object$defineProperties(this, {
      checked: {
        get: function get() {
          return this.radioComponent.checked;
        },
        set: function set(v) {
          this.radioComponent.checked = !!v;
        }
      }
    });
  };

  Radio.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        rest = _objectWithoutProperties(_props, ['children']);

    var auiRadioGroup = this.context.auiRadioGroup;

    // Proxy `onChange`, `checked` and `disabled` to `auiRadioGroup`

    if (auiRadioGroup) {
      rest.onChange = auiRadioGroup.onChange;
      rest.checked = this.props.value === auiRadioGroup.value;
      rest.disabled = this.props.disabled || auiRadioGroup.disabled;
      rest.size = this.props.size || auiRadioGroup.size;
      rest.name = this.props.name || auiRadioGroup.name;
    }

    return React.createElement(
      RadioComponent,
      _extends({ ref: this.setRef }, rest),
      children
    );
  };

  return Radio;
}(Component);

Radio.displayName = 'AUIRadio';
Radio.propTypes = {
  value: oneOfType([string, number]),
  disabled: bool,
  size: string,
  name: string,
  children: node,
  onChange: func
};
Radio.defaultProps = {
  onChange: identity
};
Radio.contextTypes = {
  auiRadioGroup: object };
export default Radio;