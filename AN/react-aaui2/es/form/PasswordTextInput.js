import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';

import TextInput from './TextInput';

var PasswordTextInput = function (_PureComponent) {
  _inherits(PasswordTextInput, _PureComponent);

  function PasswordTextInput() {
    var _temp, _this, _ret;

    _classCallCheck(this, PasswordTextInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.state = {
      type: 'password'
    }, _this.handleIconClick = function () {
      _this.setState(function (preState) {
        return {
          type: preState.type === 'password' ? 'text' : 'password'
        };
      });
    }, _this.renderIconComponent = function (props) {
      var type = _this.state.type;

      var icon = type === 'password' ? 'icon-lock' : 'icon-unlock';

      return React.createElement(
        'span',
        props,
        React.createElement('i', { className: 'icon ' + icon, onClick: _this.handleIconClick })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  PasswordTextInput.prototype.render = function render() {
    return React.createElement(TextInput, _extends({
      icon: true,
      type: this.state.type,
      PreComponent: this.renderIconComponent
    }, this.props));
  };

  return PasswordTextInput;
}(PureComponent);

PasswordTextInput.displayName = 'PasswordTextInput';
export default PasswordTextInput;