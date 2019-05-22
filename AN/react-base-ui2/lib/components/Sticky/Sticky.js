'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _defineProperty2 = require('babel-runtime/helpers/defineProperty');var _defineProperty3 = _interopRequireDefault(_defineProperty2);var _assign = require('babel-runtime/core-js/object/assign');var _assign2 = _interopRequireDefault(_assign);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);



var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _responsive = require('../../services/responsive');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                      * @description
                                                                                                                                                      * Sticky will be triggered when element is 0 pixels from top (default).
                                                                                                                                                      *
                                                                                                                                                      * @class
                                                                                                                                                      */var
Sticky = function (_Component) {(0, _inherits3.default)(Sticky, _Component);











  /**
                                                                              * ContextTypes of Sticky
                                                                              */

















  function Sticky(props) {(0, _classCallCheck3.default)(this, Sticky);var _this = (0, _possibleConstructorReturn3.default)(this, (Sticky.__proto__ || (0, _getPrototypeOf2.default)(Sticky)).call(this,
    props));_this.

























    handleResizeEvent = function () {
      var contentClientRect = _this.content.getBoundingClientRect();
      var calculatedHeight = contentClientRect.height;
      _this.placeholder.style.paddingBottom = _this.props.disableCompensation ? 0 : (_this.state.isSticky ? calculatedHeight : 0) + 'px';
    };_this.

    handleContainerEvent = function (_ref) {var distanceFromTop = _ref.distanceFromTop,distanceFromBottom = _ref.distanceFromBottom;
      var container = _this.context.getContainerNode();

      var placeholderClientRect = _this.placeholder.getBoundingClientRect();
      var contentClientRect = _this.content.getBoundingClientRect();
      var calculatedHeight = contentClientRect.height;

      var bottomDifference = distanceFromBottom - _this.props.bottomOffset - calculatedHeight +
      _this.props.topOffset;

      var wasSticky = !!_this.state.isSticky;
      var isSticky = distanceFromTop <= -_this.props.topOffset &&
      distanceFromBottom > -_this.props.bottomOffset;

      distanceFromBottom = (_this.props.relative ?
      container.scrollHeight - container.scrollTop : distanceFromBottom) -
      calculatedHeight;

      var style = !isSticky ? {} : {
        top: bottomDifference > 0 ? -_this.props.topOffset : bottomDifference + -_this.props.topOffset };


      var assignStyle = _this.props.fullScreen ? {
        left: 0,
        right: 0 } :
      {
        left: placeholderClientRect.left,
        width: placeholderClientRect.width };


      style = isSticky ? (0, _assign2.default)(style, assignStyle) : {};

      _this.setState({
        isSticky: isSticky,
        calculatedHeight: calculatedHeight,
        style: style });


      var stickyStatus = {
        isSticky: isSticky,
        distanceFromTop: distanceFromTop,
        distanceFromBottom: distanceFromBottom,
        calculatedHeight: calculatedHeight,
        style: style };


      if (isSticky !== wasSticky) {
        (0, _isFunction2.default)(_this.props.onChange) && _this.props.onChange(stickyStatus);
      }
    };_this.state = { isSticky: false, style: {} };return _this;} /** Default Props of Sticky */(0, _createClass3.default)(Sticky, [{ key: 'componentWillMount', value: function componentWillMount() {if (!this.context.addListener) throw new TypeError('Expected Sticky to be mounted within StickyContainer');this.context.addListener(this.handleContainerEvent);} }, { key: 'componentDidMount', value: function componentDidMount() {(0, _responsive.attachResizeEvent)(this.content, this.handleResizeEvent);} }, { key: 'componentDidUpdate', value: function componentDidUpdate() {this.placeholder.style.paddingBottom = this.props.disableCompensation ? 0 : (this.state.isSticky ? this.state.calculatedHeight : 0) + 'px';} }, { key: 'componentWillUnmount', value: function componentWillUnmount() {this.context.removeListener(this.handleContainerEvent);(0, _responsive.detachResizeEvent)(this.content, this.handleResizeEvent);} }, { key: 'render', value: function render()

    {var _this2 = this;
      var className = (0, _classnames2.default)('an-sticky', (0, _defineProperty3.default)({
        'is-sticky': this.state.isSticky },
      this.props.className || '', this.state.isSticky));


      return (
        _react2.default.createElement('div', null,
          _react2.default.createElement('div', { ref: function ref(placeholder) {_this2.placeholder = placeholder;} }),
          _react2.default.createElement('div', {
              className: className,
              style: this.state.style,
              ref: function ref(content) {_this2.content = content;} },

            this.props.children)));



    } }]);return Sticky;}(_react.Component); /* The MIT License (MIT)
                                              * FROM  https://github.com/captivationsoftware/react-sticky
                                              */Sticky.defaultProps = { topOffset: 0, bottomOffset: 0, relative: false, onChange: function onChange() {}, fullScreen: false, disableCompensation: false };Sticky.contextTypes = { addListener: _propTypes2.default.func, removeListener: _propTypes2.default.func, getContainerNode: _propTypes2.default.func };Sticky.propTypes = { className: _propTypes2.default.string, topOffset: _propTypes2.default.number, bottomOffset: _propTypes2.default.number, relative: _propTypes2.default.bool, children: _propTypes2.default.node.isRequired, onChange: _propTypes2.default.func, fullScreen: _propTypes2.default.bool, disableCompensation: _propTypes2.default.bool };exports.default = Sticky;module.exports = exports['default'];