import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _extends from 'babel-runtime/helpers/extends';
import React, { PureComponent } from 'react';

import connectForm from './connectForm';
import TextArea from '../TextArea';
import { noop, omit } from '../shared/utils';
import { FormFieldAPIPropTypes } from './types';

var propTypes = _extends({}, FormFieldAPIPropTypes);

var FormTextArea = function (_PureComponent) {
  _inherits(FormTextArea, _PureComponent);

  function FormTextArea() {
    var _temp, _this, _ret;

    _classCallCheck(this, FormTextArea);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.handleBlur = function (e) {
      var _this$props = _this.props,
          onValidate = _this$props.api.onValidate,
          onBlur = _this$props.onBlur,
          value = _this$props.value;


      onValidate(value);
      onBlur(e);
    }, _this.handleChange = function (e) {
      var _this$props2 = _this.props,
          setValue = _this$props2.api.setValue,
          onChange = _this$props2.onChange;


      setValue(e.target.value);
      onChange(e);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  FormTextArea.prototype.render = function render() {
    var rest = _objectWithoutProperties(this.props, []);

    return React.createElement(TextArea, _extends({
      type: 'text'
    }, omit(rest, ['api', 'l10n', 'rules']), {
      onBlur: this.handleBlur,
      onChange: this.handleChange
    }));
  };

  return FormTextArea;
}(PureComponent);

FormTextArea.displayName = 'TextArea';
FormTextArea.propTypes = propTypes;
FormTextArea.defaultProps = {
  onChange: noop,
  onBlur: noop
};


export default connectForm()(FormTextArea);