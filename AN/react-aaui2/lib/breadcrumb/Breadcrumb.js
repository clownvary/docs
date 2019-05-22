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

var _BreadcrumbItem = require('./BreadcrumbItem');

var _BreadcrumbItem2 = _interopRequireDefault(_BreadcrumbItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Breadcrumb = function (_PureComponent) {
  (0, _inherits3.default)(Breadcrumb, _PureComponent);

  function Breadcrumb() {
    (0, _classCallCheck3.default)(this, Breadcrumb);
    return (0, _possibleConstructorReturn3.default)(this, _PureComponent.apply(this, arguments));
  }

  Breadcrumb.prototype.render = function render() {
    var _props = this.props,
        data = _props.data,
        className = _props.className,
        children = _props.children,
        divider = _props.divider,
        rest = (0, _objectWithoutProperties3.default)(_props, ['data', 'className', 'children', 'divider']);


    return _react2.default.createElement(
      'ul',
      (0, _extends3.default)({ className: (0, _classnames2.default)('crumb', className) }, rest),
      data && data.length > 0 ? data.map(function (_ref, index) {
        var text = _ref.text,
            restData = (0, _objectWithoutProperties3.default)(_ref, ['text']);
        return _react2.default.createElement(
          _BreadcrumbItem2.default,
          (0, _extends3.default)({ key: index }, restData),
          text
        );
      }) : _react2.default.Children.map(children, function (element, index) {
        return (0, _react.cloneElement)(element, {
          divider: divider,
          key: index
        });
      })
    );
  };

  return Breadcrumb;
}(_react.PureComponent);

Breadcrumb.propTypes = {
  className: _propTypes.string,
  data: (0, _propTypes.arrayOf)((0, _propTypes.shape)({
    text: _propTypes.any.isRequired,
    href: _propTypes.string
  })),
  divider: _propTypes.string,
  children: _propTypes.node
};
exports.default = Breadcrumb;
module.exports = exports['default'];