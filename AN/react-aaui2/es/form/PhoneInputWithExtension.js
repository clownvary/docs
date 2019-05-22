import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { string } from 'prop-types';

import connectForm from './connectForm';
import { FormFieldAPIPropTypes } from './types';
import TextInput from './TextInput';
import PhoneInput from './PhoneInput';
import Field from './Field';
import Row from '../grid/Row';
import Col from '../grid/Col';
import { omit } from '../shared/utils';

var PhoneInputWithExtension = function (_React$PureComponent) {
  _inherits(PhoneInputWithExtension, _React$PureComponent);

  function PhoneInputWithExtension() {
    var _temp, _this, _ret;

    _classCallCheck(this, PhoneInputWithExtension);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.state = {}, _this.getExtensionName = function () {
      return _this.props.extensionName || _this.props.name + 'Extension';
    }, _this.handlePhoneExtChange = function () {
      var api = _this.props.api;


      _this.setState({
        phoneExt: api.getValueByName(_this.getExtensionName())
      });
    }, _this.handlePhoneInputExtensionBlur = function () {
      var _this$props = _this.props,
          name = _this$props.name,
          value = _this$props.value,
          api = _this$props.api;

      var _api$validateByName = api.validateByName(value, name),
          errMsg = _api$validateByName.errMsg;

      var extErrMsg = api.getErrorByName(_this.getExtensionName());

      if (errMsg || extErrMsg) {
        api.setError(errMsg || extErrMsg);
      } else {
        api.setError(null);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  PhoneInputWithExtension.prototype.render = function render() {
    var _props = this.props,
        name = _props.name,
        rules = _props.rules,
        rest = _objectWithoutProperties(_props, ['name', 'rules']);

    return React.createElement(
      Row,
      { gutter: 15, onBlur: this.handlePhoneInputExtensionBlur },
      React.createElement(
        Col,
        { span: 8 },
        React.createElement(Field, _extends({
          component: PhoneInput,
          name: name,
          rules: rules
        }, omit(rest, ['extensionName'])))
      ),
      React.createElement(
        Col,
        { span: 4 },
        React.createElement(Field, {
          component: TextInput,
          rules: 'regexp:(^[0-9]*$)',
          name: this.getExtensionName(),
          value: this.state.phoneExt,
          onChange: this.handlePhoneExtChange
        })
      )
    );
  };

  return PhoneInputWithExtension;
}(React.PureComponent);

PhoneInputWithExtension.propTypes = _extends({
  name: string,
  extensionName: string,
  value: string,
  phoneRules: string
}, FormFieldAPIPropTypes);


export default connectForm()(PhoneInputWithExtension);