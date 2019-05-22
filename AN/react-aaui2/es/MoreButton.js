import _Object$keys from 'babel-runtime/core-js/object/keys';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import { string, object, bool } from 'prop-types';
import classNames from 'classnames';

import Dropdown from './Dropdown';

var propTypes = {
  className: string,
  title: string,
  data: object,
  style: object,
  filter: bool,
  filterPlaceholder: string,
  disabled: bool
};

var MoreButton = function (_PureComponent) {
  _inherits(MoreButton, _PureComponent);

  function MoreButton() {
    var _temp, _this, _ret;

    _classCallCheck(this, MoreButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.handleChange = function (_ref) {
      var v = _ref.value;

      var handler = _this.props.data[v];

      if (typeof handler === 'function') {
        handler(v);
      }
    }, _this.render = function () {
      var _this$props = _this.props,
          className = _this$props.className,
          style = _this$props.style,
          title = _this$props.title,
          filter = _this$props.filter,
          filterPlaceholder = _this$props.filterPlaceholder,
          disabled = _this$props.disabled;

      var classes = classNames('more-button', className);
      var data = _Object$keys(_this.props.data).map(function (k) {
        return { text: k, value: k };
      });

      return React.createElement(Dropdown, {
        className: classes,
        style: style,
        placeholder: title,
        filter: filter,
        filterPlaceholder: filterPlaceholder,
        data: data,
        value: '',
        disabled: disabled,
        isMoreButton: true,
        onChange: _this.handleChange
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return MoreButton;
}(PureComponent);

MoreButton.displayName = 'AUIMoreButton';
MoreButton.propTypes = propTypes;
MoreButton.defaultProps = {
  title: 'More'
};
export default MoreButton;