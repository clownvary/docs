'use strict';

exports.__esModule = true;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BreadcrumbItem = function (_PureComponent) {
  (0, _inherits3.default)(BreadcrumbItem, _PureComponent);

  function BreadcrumbItem() {
    (0, _classCallCheck3.default)(this, BreadcrumbItem);
    return (0, _possibleConstructorReturn3.default)(this, _PureComponent.apply(this, arguments));
  }

  BreadcrumbItem.prototype.render = function render() {
    var _props = this.props,
        divider = _props.divider,
        children = _props.children,
        href = _props.href,
        rest = (0, _objectWithoutProperties3.default)(_props, ['divider', 'children', 'href']);


    return _react2.default.createElement(
      'li',
      rest,
      href != null ? _react2.default.createElement(
        'a',
        { href: href },
        children
      ) : _react2.default.createElement(
        'span',
        null,
        children
      ),
      _react2.default.createElement(
        'span',
        { className: 'crumb__divider' },
        divider
      )
    );
  };

  return BreadcrumbItem;
}(_react.PureComponent);

BreadcrumbItem.propTypes = {
  href: _propTypes.string,
  divider: _propTypes.string,
  children: _propTypes.node.isRequired
};
BreadcrumbItem.defaultProps = {
  divider: '/'
};
exports.default = BreadcrumbItem;
module.exports = exports['default'];