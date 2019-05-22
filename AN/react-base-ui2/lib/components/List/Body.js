'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _throttle = require('lodash/throttle');var _throttle2 = _interopRequireDefault(_throttle);

var _consts = require('./consts');
var _SingleColumnList = require('./SingleColumnList');var _SingleColumnList2 = _interopRequireDefault(_SingleColumnList);
var _MultipleColumnsList = require('./MultipleColumnsList');var _MultipleColumnsList2 = _interopRequireDefault(_MultipleColumnsList);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var BodyPropTypes = {
  data: _propTypes2.default.array.isRequired,
  config: _propTypes2.default.object.isRequired,
  selectedIndex: _propTypes2.default.array,
  onChange: _propTypes2.default.func.isRequired,
  onScrollToBottom: _propTypes2.default.func.isRequired };var


Body = function (_React$PureComponent) {(0, _inherits3.default)(Body, _React$PureComponent);function Body() {(0, _classCallCheck3.default)(this, Body);return (0, _possibleConstructorReturn3.default)(this, (Body.__proto__ || (0, _getPrototypeOf2.default)(Body)).apply(this, arguments));}(0, _createClass3.default)(Body, [{ key: 'componentDidMount', value: function componentDidMount()



    {var _props =
      this.props,asyncable = _props.config.asyncable,onScrollToBottom = _props.onScrollToBottom;
      this.bindScroll(asyncable, onScrollToBottom);
    } }, { key: 'componentWillReceiveProps', value: function componentWillReceiveProps(

    nextProps) {
      if (nextProps.config.asyncable !== this.props.config.asyncable) {
        this.bindScroll(nextProps.config.asyncable, nextProps.onScrollToBottom);
      }
    } }, { key: 'bindScroll', value: function bindScroll(

    asyncable, onScrollToBottom) {var _this2 = this;
      if (asyncable && (0, _isFunction2.default)(onScrollToBottom)) {
        this.body.onscroll = (0, _throttle2.default)(function () {var _body =
          _this2.body,clientHeight = _body.clientHeight,scrollHeight = _body.scrollHeight,scrollTop = _body.scrollTop;
          if (scrollHeight - clientHeight - 50 <= scrollTop) {
            onScrollToBottom();
          }
        }, 400);
      } else {
        this.body.onscroll = null;
      }
    } }, { key: 'render', value: function render()

    {var _this3 = this;var _props2 =







      this.props,data = _props2.data,config = _props2.config,renderer = _props2.renderer,selectedIndex = _props2.selectedIndex,activeIndex = _props2.activeIndex,rest = (0, _objectWithoutProperties3.default)(_props2, ['data', 'config', 'renderer', 'selectedIndex', 'activeIndex']);var


      prefix =


      config.prefix,listType = config.listType,maxHeight = config.maxHeight;

      var newProps = (0, _extends3.default)({},
      rest, {
        config: config,
        data: data,
        renderer: renderer,
        selectedIndex: selectedIndex,
        activeIndex: activeIndex });


      return (
        _react2.default.createElement('div', {
            ref: function ref(body) {_this3.body = body;},
            className: prefix + 'list__body',
            style: { maxHeight: maxHeight } },


          listType === _consts.ListType.SINGLE &&
          _react2.default.createElement(_SingleColumnList2.default,
          newProps),




          listType === _consts.ListType.MULTIPLE &&
          _react2.default.createElement(_MultipleColumnsList2.default,
          newProps)));




    } }]);return Body;}(_react2.default.PureComponent);Body.displayName = 'Body';Body.propsType = BodyPropTypes;exports.default =


Body;module.exports = exports['default'];