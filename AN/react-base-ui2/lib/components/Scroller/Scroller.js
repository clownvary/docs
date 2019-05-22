'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');
var _uniqueId = require('lodash/uniqueId');var _uniqueId2 = _interopRequireDefault(_uniqueId);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _ScrollerPane = require('./ScrollerPane');var _ScrollerPane2 = _interopRequireDefault(_ScrollerPane);
var _dom = require('../../utils/dom');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                     * Default PropTypes of Scroller.
                                                                                                                                     */
var ScrollerPropTypes = {
  horizontal: _propTypes.bool,
  vertical: _propTypes.bool };


/** Default Props for Scroller */
var ScrollerProps = {
  horizontal: true,
  vertical: true };var


Scroller = function (_React$PureComponent) {(0, _inherits3.default)(Scroller, _React$PureComponent);




  function Scroller() {(0, _classCallCheck3.default)(this, Scroller);var _this = (0, _possibleConstructorReturn3.default)(this, (Scroller.__proto__ || (0, _getPrototypeOf2.default)(Scroller)).call(this));

    _this.name = (0, _uniqueId2.default)('an-scroller-');
    _this.onContentResize = _this.onContentResize.bind(_this);return _this;
  }(0, _createClass3.default)(Scroller, [{ key: 'getContentSize', value: function getContentSize()

    {
      if (this.contentPane) {
        return this.contentPane.getSize();
      }

      return null;
    } }, { key: 'onContentResize', value: function onContentResize(

    e) {
      if (this.header) {
        var w = e.scrollbarSize.width;
        if (w > 0) {
          this.header.style.marginRight = w - 1 + 'px';
          (0, _dom.addClass)(this.header, 'rightscroll');
        } else {
          this.header.style.marginRight = '';
          (0, _dom.removeClass)(this.header, 'rightscroll');
        }
      }

      if (this.band) {
        this.band.style.marginBottom = '';

        var h = e.scrollbarSize.height;
        if (h > 0) {
          this.band.style.marginBottom = h - 1 + 'px';
          (0, _dom.addClass)(this.band, 'bottomscroll');
        } else {
          (0, _dom.removeClass)(this.band, 'bottomscroll');
        }
      }var

      onContentResize = this.props.onContentResize;
      if ((0, _isFunction2.default)(onContentResize)) {
        onContentResize(e);
      }
    } }, { key: 'render', value: function render()

    {var _this2 = this;var _props =










      this.props,horizontal = _props.horizontal,vertical = _props.vertical,style = _props.style,className = _props.className,corner = _props.corner,header = _props.header,band = _props.band,content = _props.content,onScroll = _props.onScroll;

      var classes = (0, _classnames2.default)(
      'an-scroller an-border-single',
      className);


      return (
        _react2.default.createElement('div', { className: classes, style: style },

          header && _react2.default.createElement('div', null,
            _react2.default.createElement('div', { className: 'an-scroller__header-wrapper' },
              band && _react2.default.createElement('div', { className: 'an-scroller__corner', ref: function ref(c) {_this2.corner = c;} }, corner),
              _react2.default.createElement('div', { className: 'an-scroller__header', ref: function ref(c) {_this2.header = c;} },
                _react2.default.createElement(_ScrollerPane2.default, {
                    horizontal: false,
                    vertical: false,
                    group: this.name },

                  header)))),






          _react2.default.createElement('div', { className: 'an-scroller__body-wrapper' },

            band && _react2.default.createElement('div', { className: 'an-scroller__band', ref: function ref(c) {_this2.band = c;} },
              _react2.default.createElement(_ScrollerPane2.default, {
                  horizontal: false,
                  vertical: false,
                  group: this.name },

                band)),



            _react2.default.createElement('div', { className: 'an-scroller__content', ref: function ref(c) {_this2.content = c;} },
              _react2.default.createElement(_ScrollerPane2.default, {
                  ref: function ref(c) {_this2.contentPane = c;},
                  horizontal: horizontal,
                  vertical: vertical,
                  group: this.name,
                  onResize: this.onContentResize,
                  onScroll: onScroll,
                  master: true },

                content)))));





    } }]);return Scroller;}(_react2.default.PureComponent);Scroller.displayName = 'Scroller';Scroller.defaultProps = ScrollerProps;Scroller.propTypes = ScrollerPropTypes;exports.default =



Scroller;module.exports = exports['default'];