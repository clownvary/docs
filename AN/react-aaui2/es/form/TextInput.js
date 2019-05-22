import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _extends from 'babel-runtime/helpers/extends';
import React, { PureComponent } from 'react';

import connectForm from './connectForm';
import Input from '../Input';
import { noop, omit } from '../shared/utils';
import { FormFieldAPIPropTypes } from './types';

var propTypes = _extends({}, FormFieldAPIPropTypes);

var TextInput = function (_PureComponent) {
  _inherits(TextInput, _PureComponent);

  function TextInput() {
    var _temp, _this, _ret;

    _classCallCheck(this, TextInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.setWrappedComponentInstance = function (input) {
      _this.input = input;
    }, _this.handleBlur = function (e) {
      var _this$props = _this.props,
          onValidate = _this$props.api.onValidate,
          onBlur = _this$props.onBlur;


      onValidate(_this.input.value);
      onBlur(e);
    }, _this.handleChange = function (e) {
      var _this$props2 = _this.props,
          setValue = _this$props2.api.setValue,
          onChange = _this$props2.onChange;


      setValue(e.target.value);
      onChange(e);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  TextInput.prototype.render = function render() {
    var rest = _objectWithoutProperties(this.props, []);

    return this.props.static ? React.createElement(
      'span',
      null,
      rest.value
    ) : React.createElement(Input, _extends({
      ref: this.setWrappedComponentInstance,
      type: 'text'
    }, omit(rest, ['api', 'l10n', 'rules']), {
      onBlur: this.handleBlur,
      onChange: this.handleChange
    }));
  };

  return TextInput;
}(PureComponent);

TextInput.displayName = 'TextInput';
TextInput.propTypes = propTypes;
TextInput.defaultProps = {
  onChange: noop,
  onBlur: noop
};


export default connectForm()(TextInput);