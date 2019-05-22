import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import { node } from 'prop-types';

import connectForm from './connectForm';
import { noop, omit } from '../shared/utils';
import { RadioGroup } from '../radio';
import { FormFieldAPIPropTypes } from './types';

var FormRadioGroup = function (_PureComponent) {
  _inherits(FormRadioGroup, _PureComponent);

  function FormRadioGroup() {
    var _temp, _this, _ret;

    _classCallCheck(this, FormRadioGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.handleChange = function (e) {
      var _this$props = _this.props,
          setValue = _this$props.api.setValue,
          onChange = _this$props.onChange;


      setValue(e.target.value);
      onChange(e);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  FormRadioGroup.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        rest = _objectWithoutProperties(_props, ['children']);

    return React.createElement(
      RadioGroup,
      _extends({}, omit(rest, ['api', 'rules']), {
        onChange: this.handleChange
      }),
      children
    );
  };

  return FormRadioGroup;
}(PureComponent);

FormRadioGroup.displayName = 'AUIRadioGroup';
FormRadioGroup.propTypes = _extends({}, FormFieldAPIPropTypes, {
  children: node
});
FormRadioGroup.defaultProps = {
  onChange: noop
};


export default connectForm()(FormRadioGroup);