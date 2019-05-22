'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _findIndex = require('lodash/findIndex');var _findIndex2 = _interopRequireDefault(_findIndex);
var _slice = require('lodash/slice');var _slice2 = _interopRequireDefault(_slice);
var _utils = require('../common/utils');
var _dom = require('../../../utils/dom');
var _selectScroll = require('../utils/selectScroll');var _selectScroll2 = _interopRequireDefault(_selectScroll);
var _DateCell = require('./DateCell');var _DateCell2 = _interopRequireDefault(_DateCell);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

Content = function (_React$PureComponent) {(0, _inherits3.default)(Content, _React$PureComponent);

  function Content(props) {(0, _classCallCheck3.default)(this, Content);var _this = (0, _possibleConstructorReturn3.default)(this, (Content.__proto__ || (0, _getPrototypeOf2.default)(Content)).call(this,
    props));

    _this.onMarqueeStart = _this.onMarqueeStart.bind(_this);
    _this.onMarqueeEnd = _this.onMarqueeEnd.bind(_this);return _this;
  }(0, _createClass3.default)(Content, [{ key: 'componentDidMount', value: function componentDidMount()

    {
      var scrollContainer = document.querySelector('.an-scroller__content .an-scroller-pane');

      this.selectScroller = new _selectScroll2.default(this.container, {
        deSelectableClasses: ['an-rc-event'],
        selectableClass: 'grid-cell',
        scrollContainer: scrollContainer,
        onStart: this.onMarqueeStart,
        onEnd: this.onMarqueeEnd });

    } }, { key: 'componentWillUnmount', value: function componentWillUnmount()

    {
      this.selectScroller.disable();
      this.selectScroller = null;
    } }, { key: 'getDateCellInfo', value: function getDateCellInfo(

    target) {
      var info = target && target.getAttribute('data-info');
      if (info) {
        var a = info.split('/');
        if (a && a.length === 2) {
          var resourceId = a[0];
          var date = (0, _utils.toDate)(a[1]);

          return {
            resourceId: resourceId,
            date: date };

        }
      }

      return null;
    } }, { key: 'onMarqueeStart', value: function onMarqueeStart(

    e, targetCell) {
      this.startCellInfo = this.getDateCellInfo(targetCell);
    } }, { key: 'onMarqueeEnd', value: function onMarqueeEnd(

    e, targetCell) {var _this2 = this;
      var endCellInfo = this.getDateCellInfo(targetCell);var _props =

      this.props,onMarqueeEnd = _props.onMarqueeEnd,resources = _props.resources,exclusiveMode = _props.exclusiveMode;
      if ((0, _isFunction2.default)(onMarqueeEnd) && this.startCellInfo && endCellInfo) {
        var startIndex = (0, _findIndex2.default)(resources, function (r) {return r.id === _this2.startCellInfo.resourceId;});
        var endIndex = (0, _findIndex2.default)(resources, function (r) {return r.id === endCellInfo.resourceId;});
        if (startIndex > endIndex) {var _ref =
          [endIndex, startIndex];startIndex = _ref[0];endIndex = _ref[1];
        }
        var selectedResources = (0, _slice2.default)(resources, startIndex, endIndex + 1);

        var startDate = this.startCellInfo.date.clone();
        var endDate = endCellInfo.date.clone();
        if (startDate.isAfter(endDate)) {var _ref2 =
          [endDate, startDate];startDate = _ref2[0];endDate = _ref2[1];
        }

        startDate.startOf('day');
        endDate = (0, _utils.getEndOfDay)(endDate, exclusiveMode);

        onMarqueeEnd({
          resources: selectedResources,
          startDate: startDate,
          endDate: endDate });

      }

      delete this.startCellInfo;
    } }, { key: 'onDateDoubleClick', value: function onDateDoubleClick(

    e) {
      var targetCell = (0, _dom.findAncestor)(e.target, 'an-rc-date');
      this.onMarqueeStart(e, targetCell);
      this.onMarqueeEnd(e, targetCell);
    } }, { key: 'renderRow', value: function renderRow(

    resource) {var _this3 = this;
      // eslint-disable-next-line
      var _props2 = this.props,currentDate = _props2.currentDate,dates = _props2.dates,resources = _props2.resources,rowHeight = _props2.rowHeight,rest = (0, _objectWithoutProperties3.default)(_props2, ['currentDate', 'dates', 'resources', 'rowHeight']);
      var style = {};
      if (rowHeight > 0) {
        style.height = rowHeight + 'px';
      }

      return (
        _react2.default.createElement('tr', { className: 'grid-row', style: style, key: 'content_' + resource.key },

          dates.map(function (date) {
            var isToday = currentDate ? currentDate.isSame(date.value, 'day') : false;
            var isWeekend = date.value.day() === 0 || date.value.day() === 6;
            var isSunday = date.value.day() === 0;
            var classes = (0, _classnames2.default)(
            'grid-cell an-rc-date',
            {
              today: isToday,
              weekend: isWeekend,
              'is-sunday': isSunday });


            return (
              _react2.default.createElement('td', {
                  className: classes,
                  'data-info': resource.key + '/' + date.key,
                  key: resource.key + '/' + date.key,
                  onDoubleClick: function onDoubleClick(e) {return _this3.onDateDoubleClick(e);} },

                _react2.default.createElement(_DateCell2.default, (0, _extends3.default)({
                  date: date,
                  resource: resource,
                  rowHeight: rowHeight },
                rest))));



          })));



    } }, { key: 'render', value: function render()

    {var _this4 = this;var _props$resources =
      this.props.resources,resources = _props$resources === undefined ? [] : _props$resources;
      return (
        _react2.default.createElement('table', {
            className: 'an-rc-grid an-rc-grid-content',
            ref: function ref(c) {_this4.container = c;} },

          _react2.default.createElement('tbody', null,

            resources.map(function (resource) {return (
                _this4.renderRow(resource));}))));





    } }]);return Content;}(_react2.default.PureComponent);exports.default =



Content;module.exports = exports['default'];