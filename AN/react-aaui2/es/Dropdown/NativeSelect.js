import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import { string, bool, object, func, oneOf, arrayOf, shape } from 'prop-types';
import classNames from 'classnames';
import { filterValidProps, noop, omit } from '../shared/utils';
import * as da from '../shared/data-access';
import injectL10n from '../shared/injectL10n';
import { aauiL10nShape } from '../shared/types';

var Select = function (_Component) {
  _inherits(Select, _Component);

  function Select() {
    var _temp, _this, _ret;

    _classCallCheck(this, Select);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleSelectChange = function (e) {
      var value = e.target.value;
      var onChange = _this.props.onChange;


      onChange({ value: value });
    }, _this.render = function () {
      var _this$props = _this.props,
          className = _this$props.className,
          disabled = _this$props.disabled,
          preIcon = _this$props.preIcon,
          placeholder = _this$props.placeholder,
          size = _this$props.size,
          theme = _this$props.theme,
          isMoreButton = _this$props.isMoreButton,
          style = _this$props.style,
          data = _this$props.data,
          l10n = _this$props.l10n,
          rest = _objectWithoutProperties(_this$props, ['className', 'disabled', 'preIcon', 'placeholder', 'size', 'theme', 'isMoreButton', 'style', 'data', 'l10n']);

      var validProps = filterValidProps(rest);

      var classes = classNames('dropdown', 'dropdown--native', 'dropdown--' + theme, 'dropdown--' + size, {
        'dropdown--disabled': disabled
      }, className);
      var selectClasses = classNames({
        dropdown__button: true,
        dropdown__select: true,
        disabled: disabled
      });

      return React.createElement(
        'div',
        _extends({ className: classes, style: style }, validProps),
        preIcon && React.createElement('i', { className: 'dropdown__prefix-icon ' + preIcon }),
        React.createElement(
          'select',
          _extends({
            className: selectClasses,
            onChange: _this.handleSelectChange,
            disabled: disabled
          }, omit(rest, ['onChange', 'uncontrolled', 'filterPlaceholder', 'highlight', 'maxHeight'])),
          !rest.value && !rest.defaultValue && React.createElement(
            'option',
            { value: 'prompt' },
            placeholder || l10n.formatMessage('react-aaui.common.dropdown.notice.select')
          ),
          data.map(function (item) {
            return React.createElement(
              'option',
              { value: item.value, key: item.value },
              da.get(item, 'text')
            );
          })
        ),
        isMoreButton ? React.createElement('span', { className: 'icon-caret-down' }) : React.createElement('span', { className: 'icon-chevron-down' })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Select;
}(Component);

Select.propTypes = {
  className: string,
  value: string,
  defaultValue: string,
  placeholder: string,
  preIcon: string,
  size: oneOf(['m', 'lg']),
  theme: oneOf(['flat', 'gradient', 'borderless']),
  isMoreButton: bool,
  disabled: bool,
  data: arrayOf(shape({
    text: string,
    value: string
  })),
  style: object, // eslint-disable-line
  onChange: func,
  l10n: aauiL10nShape
};
Select.defaultProps = {
  size: 'm',
  theme: 'flat',
  onChange: noop
};


export default injectL10n()(Select);