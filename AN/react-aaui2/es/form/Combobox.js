import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';

import connectForm from './connectForm';
import Dropdown from '../Dropdown';
import { omit } from '../shared/utils';
import { FormFieldAPIPropTypes } from './types';

var PLACEHOLDER_SELECT = 'react-aaui.common.dropdown.notice.select';
var PLACEHOLDER_FILTER_SELECT = 'react-aaui.common.dropdown.notice.filterSelect';

var Combobox = function (_PureComponent) {
  _inherits(Combobox, _PureComponent);

  function Combobox() {
    var _temp, _this, _ret;

    _classCallCheck(this, Combobox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.handleChange = function (_ref) {
      var value = _ref.value;
      var _this$props = _this.props,
          _this$props$api = _this$props.api,
          setValue = _this$props$api.setValue,
          onValidate = _this$props$api.onValidate,
          onChange = _this$props.onChange;


      onValidate(value);
      setValue(value);

      if (typeof onChange === 'function') {
        onChange({ value: value });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Combobox.prototype.render = function render() {
    var _props = this.props,
        l10n = _props.l10n,
        rest = _objectWithoutProperties(_props, ['l10n']);

    return React.createElement(Dropdown, _extends({
      placeholder: l10n.formatMessage(PLACEHOLDER_SELECT),
      filterPlaceholder: l10n.formatMessage(PLACEHOLDER_FILTER_SELECT)
    }, omit(rest, ['api', 'rules']), {
      onChange: this.handleChange
    }));
  };

  return Combobox;
}(PureComponent);

Combobox.displayName = 'Combobox';
Combobox.propTypes = _extends({}, FormFieldAPIPropTypes);


export default connectForm()(Combobox);