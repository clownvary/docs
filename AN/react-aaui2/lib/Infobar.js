'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Infobar = function (_PureComponent) {
  (0, _inherits3.default)(Infobar, _PureComponent);

  function Infobar() {
    (0, _classCallCheck3.default)(this, Infobar);
    return (0, _possibleConstructorReturn3.default)(this, _PureComponent.apply(this, arguments));
  }

  Infobar.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        style = _props.style,
        children = _props.children,
        noClose = _props.noClose,
        onClose = _props.onClose;


    return _react2.default.createElement(
      'div',
      { className: 'infobar ' + (className || ''), style: style },
      children,
      noClose || _react2.default.createElement(
        'button',
        { type: 'button', className: 'close', onClick: onClose },
        '\xD7'
      )
    );
  };

  return Infobar;
}(_react.PureComponent);

Infobar.displayName = 'AUIInfobar';
Infobar.propTypes = {
  className: _propTypes.string,
  style: _propTypes.object, // eslint-disable-line
  children: _propTypes.node,
  noClose: _propTypes.bool,
  onClose: _propTypes.func
};
Infobar.defaultProps = {
  noClose: false
};
exports.default = Infobar;
module.exports = exports['default'];