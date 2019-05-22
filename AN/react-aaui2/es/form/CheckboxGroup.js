import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import { node } from 'prop-types';

import connectForm from './connectForm';
import { noop, omit } from '../shared/utils';
import { CheckboxGroup } from '../Checkbox';
import { FormFieldAPIPropTypes } from './types';

var FormCheckboxGroup = function (_PureComponent) {
  _inherits(FormCheckboxGroup, _PureComponent);

  function FormCheckboxGroup() {
    var _temp, _this, _ret;

    _classCallCheck(this, FormCheckboxGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.handleChange = function (value) {
      var _this$props = _this.props,
          setValue = _this$props.api.setValue,
          onChange = _this$props.onChange;


      setValue(value);
      onChange(value);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  FormCheckboxGroup.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        rest = _objectWithoutProperties(_props, ['children']);

    return React.createElement(
      CheckboxGroup,
      _extends({}, omit(rest, ['api', 'rules']), {
        onChange: this.handleChange
      }),
      children
    );
  };

  return FormCheckboxGroup;
}(PureComponent);

FormCheckboxGroup.displayName = 'AUICheckboxGroup';
FormCheckboxGroup.propTypes = _extends({}, FormFieldAPIPropTypes, {
  children: node
});
FormCheckboxGroup.defaultProps = {
  onChange: noop
};


export default connectForm()(FormCheckboxGroup);