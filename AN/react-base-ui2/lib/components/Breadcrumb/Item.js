'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _reactRouter = require('react-router');
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _propTypes = require('prop-types');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var BreadcrumbItemPropTypes = {
  href: _propTypes.string,
  link: _propTypes.string,
  separator: _propTypes.string,
  isLast: _propTypes.bool };


var BreadcrumbItemProps = {
  isLast: false };var


Item = function (_React$Component) {(0, _inherits3.default)(Item, _React$Component);function Item() {(0, _classCallCheck3.default)(this, Item);return (0, _possibleConstructorReturn3.default)(this, (Item.__proto__ || (0, _getPrototypeOf2.default)(Item)).apply(this, arguments));}(0, _createClass3.default)(Item, [{ key: 'render', value: function render()




    {var _props =
      this.props,href = _props.href,link = _props.link,separator = _props.separator,className = _props.className,children = _props.children,isLast = _props.isLast;
      return (
        _react2.default.createElement('li', { className: (0, _classnames2.default)('an-breadcrumb__item', className) },

          href ?
          _react2.default.createElement('a', { href: href }, children) :
          function () {return link ? _react2.default.createElement(_reactRouter.Link, { to: link }, children) : _react2.default.createElement('span', null, children);}(),

          !isLast && _react2.default.createElement('span', { className: 'an-breadcrumb__separator' }, separator)));


    } }]);return Item;}(_react2.default.Component);Item.displayName = 'BreadcrumbItem';Item.propTypes = BreadcrumbItemPropTypes;Item.defaultProps = BreadcrumbItemProps;exports.default =



Item;module.exports = exports['default'];