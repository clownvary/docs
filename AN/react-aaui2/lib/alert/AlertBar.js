'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Alert = require('./Alert');

var _Alert2 = _interopRequireDefault(_Alert);

var _utils = require('../shared/utils');

require('./AlertBar.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AlertBar = function (_PureComponent) {
  (0, _inherits3.default)(AlertBar, _PureComponent);

  function AlertBar() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, AlertBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.state = {
      show: false
    }, _this.setRef = function (element) {
      _this.element = element;
    }, _this.handleClose = function () {
      _this.setState({
        show: false
      });

      _this.element && _this.element.addEventListener('animationend', function () {
        _this.props.onClose();
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  AlertBar.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var timeout = this.props.timeout;


    this.animationFrame = setTimeout(function () {
      _this2.setState({
        show: true
      });
    });

    if (timeout) {
      this.timer = setTimeout(function () {
        _this2.setState({
          show: false
        });
      }, timeout);
    }
  };

  AlertBar.prototype.componentWillUnmount = function componentWillUnmount() {
    clearTimeout(this.animationFrame);
    clearTimeout(this.timer);
  };

  AlertBar.prototype.render = function render() {
    var _props = this.props,
        message = _props.message,
        type = _props.type,
        className = _props.className,
        rest = (0, _objectWithoutProperties3.default)(_props, ['message', 'type', 'className']);
    var show = this.state.show;

    var classes = (0, _classnames2.default)({
      'alert-bar': true,
      show: show
    }, className);

    return _react2.default.createElement(
      'div',
      { className: classes, ref: this.setRef },
      _react2.default.createElement(
        _Alert2.default,
        (0, _extends3.default)({}, (0, _utils.omit)(rest, ['timeout']), {
          type: type,
          onClose: this.handleClose
        }),
        _react2.default.createElement(
          'span',
          null,
          message
        )
      )
    );
  };

  return AlertBar;
}(_react.PureComponent);

AlertBar.propTypes = {
  timeout: _propTypes.number,
  type: (0, _propTypes.oneOf)(['success', 'warning', 'danger', 'error', 'info']),
  onClose: _propTypes.func,
  message: _propTypes.node,
  className: _propTypes.string
};
AlertBar.defaultProps = {
  onClose: _utils.noop
};
exports.default = AlertBar;
module.exports = exports['default'];