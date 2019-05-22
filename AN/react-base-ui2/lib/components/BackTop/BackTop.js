'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _Portal = require('../Portal');var _Portal2 = _interopRequireDefault(_Portal);
var _SVG = require('../SVG');
var _easeInOutCubic = require('./easeInOutCubic');var _easeInOutCubic2 = _interopRequireDefault(_easeInOutCubic);
var _DefaultCSSPrefix = require('../../consts/DefaultCSSPrefix');var _DefaultCSSPrefix2 = _interopRequireDefault(_DefaultCSSPrefix);
require('../../svgs/arrow-up.svg');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var backToTopPropTypes = {
  backButtonRenderer: _propTypes2.default.func,
  visibilityHeight: _propTypes2.default.number,
  scrollDuration: _propTypes2.default.number,
  onClick: _propTypes2.default.func };


var backToTopDefaultProps = {
  visibilityHeight: 200,
  scrollDuration: 400,
  backButtonRenderer: function backButtonRenderer(backButton) {return backButton;} };var


BackToTop = function (_Component) {(0, _inherits3.default)(BackToTop, _Component);



  function BackToTop(props) {(0, _classCallCheck3.default)(this, BackToTop);var _this = (0, _possibleConstructorReturn3.default)(this, (BackToTop.__proto__ || (0, _getPrototypeOf2.default)(BackToTop)).call(this,
    props));_this.















    getDefaultBackButton = function () {return (
        _react2.default.createElement('div', { className: _DefaultCSSPrefix2.default + '-back-top__btn', onClick: _this.scrollToTop },
          _react2.default.createElement(_SVG.Icon, { symbolPrefix: 'an-icon', name: 'arrow-up', focusable: 'false', size: 'sm' })));};_this.



    getCurrentScrollTop = function () {return (
        window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop);};_this.

    setScrollTop = function (value) {
      document.body.scrollTop = value;
      document.documentElement.scrollTop = value;
    };_this.

    scrollToTop = function (e) {var _this$props =
      _this.props,scrollDuration = _this$props.scrollDuration,onClick = _this$props.onClick;
      var scrollTop = _this.getCurrentScrollTop();
      var startTime = Date.now();
      var frameFunc = function frameFunc() {
        var timestamp = Date.now();
        var time = timestamp - startTime;
        _this.setScrollTop((0, _easeInOutCubic2.default)(time, scrollTop, 0, scrollDuration));
        if (time < scrollDuration) {
          window.requestAnimationFrame(frameFunc);
        } else {
          _this.setScrollTop(0);
        }
      };
      window.requestAnimationFrame(frameFunc);

      onClick && onClick(e);
    };_this.

    handleScroll = function () {var
      visibilityHeight = _this.props.visibilityHeight;
      var scrollTop = _this.getCurrentScrollTop();
      _this.setState({
        visible: scrollTop > visibilityHeight });

    };_this.state = { visible: false };return _this;}(0, _createClass3.default)(BackToTop, [{ key: 'componentDidMount', value: function componentDidMount() {window.addEventListener('scroll', this.handleScroll);this.handleScroll();} }, { key: 'componentWillUnmount', value: function componentWillUnmount() {window.removeEventListener('scroll', this.handleScroll);} }, { key: 'render', value: function render()

    {var
      visible = this.state.visible;
      if (!visible) {
        return null;
      }var _props =

      this.props,className = _props.className,backButtonRenderer = _props.backButtonRenderer,rest = (0, _objectWithoutProperties3.default)(_props, ['className', 'backButtonRenderer']);
      var buttonNode = backButtonRenderer(this.getDefaultBackButton(), (0, _extends3.default)({},
      rest, { onClick: this.scrollToTop }));

      return (
        _react2.default.createElement(_Portal2.default, null,
          _react2.default.createElement('div', { className: (0, _classnames2.default)(_DefaultCSSPrefix2.default + '-back-top', className) },
            buttonNode)));



    } }]);return BackToTop;}(_react.Component);BackToTop.propTypes = backToTopPropTypes;BackToTop.defaultProps = backToTopDefaultProps;exports.default =


BackToTop;module.exports = exports['default'];