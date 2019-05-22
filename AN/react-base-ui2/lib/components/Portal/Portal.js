'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _reactDom = require('react-dom');var _reactDom2 = _interopRequireDefault(_reactDom);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _consts = require('../../consts');
var _dom = require('../../utils/dom');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var defaultGetContainer = function defaultGetContainer() {
  var container = window.document.createElement('div');
  window.document.body.appendChild(container);
  return container;
};

var PortalPropTypes = {
  CSSPrefix: _propTypes2.default.string,
  getContainer: _propTypes2.default.func,
  savePortalRef: _propTypes2.default.func,
  children: _propTypes2.default.node.isRequired,
  onChildrenMount: _propTypes2.default.func };


var PortalDefaultProps = {
  CSSPrefix: _consts.DefaultCSSPrefix,
  getContainer: defaultGetContainer };var


Portal = function (_React$Component) {(0, _inherits3.default)(Portal, _React$Component);function Portal() {(0, _classCallCheck3.default)(this, Portal);return (0, _possibleConstructorReturn3.default)(this, (Portal.__proto__ || (0, _getPrototypeOf2.default)(Portal)).apply(this, arguments));}(0, _createClass3.default)(Portal, [{ key: 'componentDidMount', value: function componentDidMount()




    {
      this.createContainer();
      this.componentDidUpdate();
    } }, { key: 'componentDidUpdate', value: function componentDidUpdate()

    {var _props =
      this.props,savePortalRef = _props.savePortalRef,children = _props.children,onChildrenMount = _props.onChildrenMount;
      this.container && _reactDom2.default.unstable_renderSubtreeIntoContainer(
      this,
      _react2.default.createElement('div', { ref: savePortalRef }, children),
      this.container,
      onChildrenMount);

    } }, { key: 'componentWillUnmount', value: function componentWillUnmount()

    {
      this.removeContainer();
    } }, { key: 'createContainer', value: function createContainer()

    {var _props2 =
      this.props,CSSPrefix = _props2.CSSPrefix,getContainer = _props2.getContainer;var
      portalClassName = this.context.portalClassName;

      var container = getContainer();
      container && (0, _dom.addClass)(container, CSSPrefix + '-portal');
      container && portalClassName && (0, _dom.addClass)(container, portalClassName);
      this.container = container;
    } }, { key: 'removeContainer', value: function removeContainer()

    {
      if (this.container) {
        _reactDom2.default.unmountComponentAtNode(this.container);
        this.container.parentNode.removeChild(this.container);
        this.container = null;
      }
    } }, { key: 'render', value: function render()

    {
      return null;
    } }]);return Portal;}(_react2.default.Component);Portal.propTypes = PortalPropTypes;Portal.defaultProps = PortalDefaultProps;exports.default = Portal;module.exports = exports['default'];