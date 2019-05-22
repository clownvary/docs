'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _moment = require('moment');var _moment2 = _interopRequireDefault(_moment);
var _isEqual = require('lodash/isEqual');var _isEqual2 = _interopRequireDefault(_isEqual);
var _isEmpty = require('lodash/isEmpty');var _isEmpty2 = _interopRequireDefault(_isEmpty);
var _forEach = require('lodash/forEach');var _forEach2 = _interopRequireDefault(_forEach);
var _cloneDeep = require('lodash/cloneDeep');var _cloneDeep2 = _interopRequireDefault(_cloneDeep);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _Scroller = require('../../../components/Scroller');var _Scroller2 = _interopRequireDefault(_Scroller);
var _Corner = require('../common/Corner');var _Corner2 = _interopRequireDefault(_Corner);
var _Header = require('./Header');var _Header2 = _interopRequireDefault(_Header);
var _Band = require('./Band');var _Band2 = _interopRequireDefault(_Band);
var _Content = require('./Content');var _Content2 = _interopRequireDefault(_Content);
var _segBuilder = require('./segBuilder');var _segBuilder2 = _interopRequireDefault(_segBuilder);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var ViewProps = {
  exclusiveMode: true };


var MIN_HEIGHT = 48;
var EVENT_HEIGHT = 23;var

View = function (_React$PureComponent) {(0, _inherits3.default)(View, _React$PureComponent);


  function View(props) {(0, _classCallCheck3.default)(this, View);var _this = (0, _possibleConstructorReturn3.default)(this, (View.__proto__ || (0, _getPrototypeOf2.default)(View)).call(this,
    props));

    _this.onContentResize = _this.onContentResize.bind(_this);
    _this.state = {
      monthDates: [],
      segResources: [],
      rowHeight: 0,
      built: false };return _this;

  }(0, _createClass3.default)(View, [{ key: 'componentDidMount', value: function componentDidMount()

    {
      this.build(this.props);
    } }, { key: 'componentWillReceiveProps', value: function componentWillReceiveProps(

    nextProps) {var
      displayDate = nextProps.displayDate,resources = nextProps.resources,events = nextProps.events,exclusiveMode = nextProps.exclusiveMode;

      var rebuild = false;
      if (!(0, _isEqual2.default)(resources, this.props.resources)) {
        rebuild = true;
      }

      if (rebuild || !(0, _isEqual2.default)(events, this.props.events)) {
        rebuild = true;
      }

      if (rebuild || (0, _moment2.default)(displayDate).diff((0, _moment2.default)(this.props.displayDate), 'months') !== 0) {
        rebuild = true;
      }

      if (rebuild || exclusiveMode !== this.props.exclusiveMode) {
        rebuild = true;
      }

      if (rebuild) {
        this.build(nextProps);
      }
    } }, { key: 'build', value: function build(

    props) {var
      displayDate = props.displayDate,resources = props.resources,events = props.events,exclusiveMode = props.exclusiveMode,eventOrder = props.eventOrder;var _buildSegs =

      (0, _segBuilder2.default)(displayDate, resources, events, exclusiveMode, eventOrder),monthDates = _buildSegs.monthDates,segResources = _buildSegs.segResources;

      var rowHeight = this.calcRowHeight(resources);
      this.updateVisibility(monthDates, segResources, rowHeight);

      this.setState({
        monthDates: monthDates,
        segResources: segResources,
        rowHeight: rowHeight,
        built: true });

    } }, { key: 'onContentResize', value: function onContentResize()


    {
      this.updateRowHeight();
    } }, { key: 'updateRowHeight', value: function updateRowHeight()

    {var _state =
      this.state,monthDates = _state.monthDates,segResources = _state.segResources,rowHeight = _state.rowHeight;
      var newRowHeight = this.calcRowHeight();

      if (!(0, _isEmpty2.default)(monthDates) &&
      !(0, _isEmpty2.default)(segResources) &&
      newRowHeight > 0 &&
      newRowHeight !== rowHeight) {
        this.updateVisibility(monthDates, segResources, newRowHeight);

        this.setState({
          monthDates: monthDates,
          segResources: (0, _cloneDeep2.default)(segResources),
          rowHeight: newRowHeight,
          built: true });

      }
    } }, { key: 'calcRowHeight', value: function calcRowHeight(

    resources) {
      resources = resources || this.props.resources;
      var count = resources.length;
      if (count > 0 && this.scroller) {
        var size = this.scroller.getContentSize();
        var contentHeight = size.height;
        var rowHeight = Math.max(MIN_HEIGHT, Math.floor(contentHeight / count));

        return rowHeight;
      }

      return 0;
    } }, { key: 'updateVisibility', value: function updateVisibility(

    monthDates, segResources, rowHeight) {
      monthDates = monthDates || this.state.monthDates;
      segResources = segResources || this.state.segResources;
      rowHeight = rowHeight || this.state.rowHeight;

      if (!(0, _isEmpty2.default)(monthDates) && !(0, _isEmpty2.default)(segResources) && rowHeight > 0) {
        var maxEvents = Math.floor(rowHeight / EVENT_HEIGHT);
        var moreLevel = maxEvents - 1;
        (0, _forEach2.default)(segResources, function (resource) {
          (0, _forEach2.default)(resource.dates, function (dateInfo) {var
            segs = dateInfo.segs,levels = dateInfo.levels,count = dateInfo.count;
            (0, _forEach2.default)(segs, function (s) {
              s.display = false;
              var display = s.level < moreLevel || s.level === moreLevel && count === maxEvents;
              s.display = display;
            });

            var countMore = 0;
            (0, _forEach2.default)(levels, function (seg) {
              if (!seg.display) {
                countMore += 1;
              }
            });

            dateInfo.more = countMore;
            dateInfo.moreLevel = moreLevel;

            if (count >= maxEvents) {
              var s = levels[moreLevel];
              if (s && s.display && s.owner && s.owner !== dateInfo) {
                s.display = false;
                s.owner.more += 1;
              }
            }
          });
        });
      }
    } }, { key: 'render', value: function render()

    {var _this2 = this;
      /* eslint-disable no-unused-vars */var _props =













      this.props,cornerLabel = _props.cornerLabel,displayDate = _props.displayDate,_props$currentDate = _props.currentDate,currentDate = _props$currentDate === undefined ? (0, _moment2.default)() : _props$currentDate,_props$dateFormat = _props.dateFormat,dateFormat = _props$dateFormat === undefined ? 'DD ddd' : _props$dateFormat,resources = _props.resources,events = _props.events,onResourceRemove = _props.onResourceRemove,onDateHeaderClick = _props.onDateHeaderClick,onResourceHeaderClick = _props.onResourceHeaderClick,onEventOpen = _props.onEventOpen,onScroll = _props.onScroll,rest = (0, _objectWithoutProperties3.default)(_props, ['cornerLabel', 'displayDate', 'currentDate', 'dateFormat', 'resources', 'events', 'onResourceRemove', 'onDateHeaderClick', 'onResourceHeaderClick', 'onEventOpen', 'onScroll']);var _props2 =

      this.props,className = _props2.className,style = _props2.style,_props2$theme = _props2.theme,theme = _props2$theme === undefined ? '' : _props2$theme;
      var themeClass = theme ? 'theme-' + theme : '';
      var classes = (0, _classnames2.default)(
      'an-rc an-rc-horizontal',
      themeClass,
      className);var _state2 =






      this.state,monthDates = _state2.monthDates,segResources = _state2.segResources,rowHeight = _state2.rowHeight;

      var header =
      _react2.default.createElement(_Header2.default, {
        dates: monthDates,
        currentDate: currentDate,
        dateFormat: dateFormat,
        onDateHeaderClick: onDateHeaderClick });



      var band =
      _react2.default.createElement(_Band2.default, {
        resources: segResources,
        onRemove: onResourceRemove,
        onResourceHeaderClick: onResourceHeaderClick,
        rowHeight: rowHeight });



      var content =
      _react2.default.createElement(_Content2.default, (0, _extends3.default)({
        resources: segResources,
        dates: monthDates,
        currentDate: currentDate,
        onEventOpen: onEventOpen,
        rowHeight: rowHeight },
      rest));



      return _react2.default.createElement(_Scroller2.default, {
        ref: function ref(c) {_this2.scroller = c;},
        className: classes,
        style: style,
        corner: _react2.default.createElement(_Corner2.default, { cornerLabel: cornerLabel }),
        header: header,
        band: band,
        content: content,
        onContentResize: this.onContentResize,
        onScroll: onScroll });

    } }]);return View;}(_react2.default.PureComponent);View.propTypes = ViewProps;exports.default =


View;module.exports = exports['default'];