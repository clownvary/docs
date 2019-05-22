import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';

var withContext = function withContext(childContextTypes, getChildContext) {
  return function (BaseComponent) {
    var WithContext = function (_PureComponent) {
      _inherits(WithContext, _PureComponent);

      function WithContext() {
        var _temp, _this, _ret;

        _classCallCheck(this, WithContext);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.getChildContext = function () {
          return getChildContext(_this.props);
        }, _temp), _possibleConstructorReturn(_this, _ret);
      }

      WithContext.prototype.render = function render() {
        return React.createElement(BaseComponent, this.props);
      };

      return WithContext;
    }(PureComponent);

    WithContext.childContextTypes = childContextTypes;

    return WithContext;
  };
};

export default withContext;