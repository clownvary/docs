import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _Object$defineProperties from 'babel-runtime/core-js/object/define-properties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import { bool, string, object, func, node, any } from 'prop-types';

import CheckboxComponent from './CheckboxComponent';
import { identity } from '../shared/utils';

var Checkbox = function (_Component) {
  _inherits(Checkbox, _Component);

  function Checkbox() {
    var _temp, _this, _ret;

    _classCallCheck(this, Checkbox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.setRef = function (checkboxComponent) {
      _this.checkboxComponent = checkboxComponent;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // Support legacy API for `this.refs.checkbox.checked`
  // It's not recommended because it breaks component encapsulation and
  // it violates the unidirectional data flow for React
  Checkbox.prototype.componentDidMount = function componentDidMount() {
    _Object$defineProperties(this, {
      checked: {
        get: function get() {
          return this.checkboxComponent.checked;
        },
        set: function set(v) {
          this.checkboxComponent.checked = !!v;
        }
      }
    });
  };

  Checkbox.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        rest = _objectWithoutProperties(_props, ['children']);

    var auiCheckboxGroup = this.context.auiCheckboxGroup;

    // Proxy `onChange`, `checked` and `disabled` to `auiCheckboxGroup`

    if (auiCheckboxGroup) {
      rest.onChange = auiCheckboxGroup.onChange;
      rest.checked = auiCheckboxGroup.value && auiCheckboxGroup.value.indexOf(this.props.value) !== -1;
      rest.disabled = this.props.disabled || auiCheckboxGroup.disabled;
      rest.size = this.props.size || auiCheckboxGroup.size;
      rest.name = this.props.name || auiCheckboxGroup.name;
    }

    return React.createElement(
      CheckboxComponent,
      _extends({ ref: this.setRef }, rest),
      children
    );
  };

  return Checkbox;
}(Component);

Checkbox.displayName = 'AUICheckbox';
Checkbox.propTypes = {
  disabled: bool,
  size: string,
  name: string,
  children: node,
  onChange: func,
  value: any // eslint-disable-line
};
Checkbox.defaultProps = {
  onChange: identity
};
Checkbox.contextTypes = {
  auiCheckboxGroup: object };
export default Checkbox;