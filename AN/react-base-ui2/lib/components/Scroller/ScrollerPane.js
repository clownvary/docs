'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);


var _responsive = require('../../services/responsive');
var _scroll = require('../../services/scroll');var _scroll2 = _interopRequireDefault(_scroll);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                             * Default PropTypes of ScrollerPane.
                                                                                                                                                                                             */ // import { outerWidth, outerHeight } from '../../utils/dom';
var ScrollerPanePropTypes = {
  horizontal: _propTypes.bool,
  vertical: _propTypes.bool,
  group: _propTypes.string };


/** Default Props for ScrollerPane */
var ScrollerPaneProps = {
  horizontal: false,
  vertical: false,
  group: '' };var



ScrollerPane = function (_React$PureComponent) {(0, _inherits3.default)(ScrollerPane, _React$PureComponent);




  function ScrollerPane() {(0, _classCallCheck3.default)(this, ScrollerPane);var _this = (0, _possibleConstructorReturn3.default)(this, (ScrollerPane.__proto__ || (0, _getPrototypeOf2.default)(ScrollerPane)).call(this));


    _this.onResize = _this.onResize.bind(_this);return _this;
  }(0, _createClass3.default)(ScrollerPane, [{ key: 'componentDidMount', value: function componentDidMount()

    {var _props =
      this.props,group = _props.group,onResize = _props.onResize,_props$master = _props.master,master = _props$master === undefined ? false : _props$master,onScroll = _props.onScroll;
      if (group) {
        _scroll2.default.addToGroup(group, this.pane, false, master, onScroll);
      }

      if (this.pane && (0, _isFunction2.default)(onResize)) {
        (0, _responsive.attachResizeEvent)(this.pane, this.onResize);
        var size = this.getSize();
        this.onResize(size, false);
      }
    } }, { key: 'getSize', value: function getSize()

    {
      var size = {
        width: this.pane.clientWidth,
        height: this.pane.clientHeight };


      return size;
    } }, { key: 'componentWillUnmount', value: function componentWillUnmount()

    {var _props2 =
      this.props,group = _props2.group,onResize = _props2.onResize;
      if (group) {
        _scroll2.default.removeFromGroup(group, this.pane);
      }

      if (this.pane && (0, _isFunction2.default)(onResize)) {
        (0, _responsive.detachResizeEvent)(this.pane, this.onResize);
      }
    } }, { key: 'onResize', value: function onResize(

    size, isBody) {var
      onResize = this.props.onResize;
      if (this.pane && (0, _isFunction2.default)(onResize)) {
        var scrollbarSize = _scroll2.default.getScrollbarSize(this.pane);
        if (scrollbarSize) {
          onResize({
            size: size,
            scrollbarSize: scrollbarSize,
            isBody: isBody });

        }
      }
    } }, { key: 'focus', value: function focus()

    {
      this.pane.focus();
    } }, { key: 'render', value: function render()

    {var _this2 = this;var _props3 =





      this.props,horizontal = _props3.horizontal,vertical = _props3.vertical,_props3$style = _props3.style,style = _props3$style === undefined ? {} : _props3$style,children = _props3.children;

      style.overflowX = horizontal ? 'auto' : 'hidden';
      style.overflowY = vertical ? 'auto' : 'hidden';

      return (
        _react2.default.createElement('div', {
            className: 'an-scroller-pane',
            style: style,
            ref: function ref(c) {_this2.pane = c;},
            tabIndex: -1 },

          children));


    } }]);return ScrollerPane;}(_react2.default.PureComponent);ScrollerPane.displayName = 'ScrollerPane';ScrollerPane.defaultProps = ScrollerPaneProps;ScrollerPane.propTypes = ScrollerPanePropTypes;exports.default =



ScrollerPane;module.exports = exports['default'];