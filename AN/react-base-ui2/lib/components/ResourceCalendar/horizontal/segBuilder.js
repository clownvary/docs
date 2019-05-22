'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _isNil = require('lodash/isNil');var _isNil2 = _interopRequireDefault(_isNil);
var _moment = require('moment');var _moment2 = _interopRequireDefault(_moment);
var _utils = require('../common/utils');
var _EventSeg = require('../common/EventSeg');var _EventSeg2 = _interopRequireDefault(_EventSeg);
var _getSegSorter = require('../common/getSegSorter');var _getSegSorter2 = _interopRequireDefault(_getSegSorter);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var getDateInfo = function getDateInfo(dateMap, date) {
  var dateKey = (0, _utils.getDateKey)(date);
  dateMap[dateKey] = dateMap[dateKey] || {
    key: dateKey,
    levels: {},
    maxLevel: 0,
    segs: [],
    count: 0,
    more: 0,
    moreLevel: 0 };


  return dateMap[dateKey];
};

var getAvailableLevel = function getAvailableLevel(dateInfo) {
  for (var i = 0; i < dateInfo.maxLevel; i += 1) {
    if ((0, _isNil2.default)(dateInfo.levels[i])) {
      return i;
    }
  }

  return dateInfo.maxLevel;
};

var addToDateInfo = function addToDateInfo(dateInfo, seg) {var master = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  dateInfo.levels[seg.level] = seg;
  dateInfo.maxLevel = Math.max(seg.level + 1, dateInfo.maxLevel);
  dateInfo.count += 1;

  if (master) {
    dateInfo.segs.push(seg);
    seg.owner = dateInfo;
  }
};

var reducer = function reducer(result, seg) {
  var date = seg.start.clone();
  var dateInfo = getDateInfo(result, date);
  var level = getAvailableLevel(dateInfo);
  seg.level = level;

  addToDateInfo(dateInfo, seg, true);

  if (seg.isCrossDays && seg.span) {
    for (var i = 0; i < seg.span; i += 1) {
      date.add(1, 'days');
      var di = getDateInfo(result, date);
      addToDateInfo(di, seg);
    }
  }

  return result;
};

var buildSegs = function buildSegs() {var displayDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _moment2.default)();var resources = arguments[1];var events = arguments[2];var exclusiveMode = arguments[3];var eventOrder = arguments[4];
  var dates = (0, _utils.getDaysInMonth)(displayDate);
  var monthStart = dates[0].clone().startOf('day');
  var monthEnd = (0, _utils.getEndOfDay)(dates[dates.length - 1], exclusiveMode);
  var monthDates = dates.map(function (d) {return {
      value: d.clone(),
      key: (0, _utils.getDateKey)(d) };});


  var segResources = resources.map(function (resource) {
    var resourceEvents = events.filter(function (event) {return event.resourceId === resource.id;});
    var resourceSegs = resourceEvents.map(function (event, index) {
      if (!event.start) {
        throw new Error('The event ' + event.resourceId + ' must have a start time.');
      }

      var eventStart = (0, _moment2.default)(event.start);
      var eventEnd = event.end ? (0, _moment2.default)(event.end) : null;
      var isPrevMonthEvents = eventEnd ?
      eventEnd.isSameOrBefore(monthStart) : eventStart.isBefore(monthStart);
      var isNextMonthEvents = eventStart.isAfter(monthEnd);

      if (isPrevMonthEvents || isNextMonthEvents) {
        return false;
      }

      event.start = eventStart;
      event.end = eventEnd;

      var start = _moment2.default.max(monthStart, eventStart);
      var end = eventEnd ? _moment2.default.min(monthEnd, eventEnd) : null;
      var customBlockStyle = event.customBlockStyle;
      var customIconStyle = event.customIconStyle;
      var seg = new _EventSeg2.default(resource, event, start, end, index,
      exclusiveMode, eventOrder, customBlockStyle, customIconStyle);

      return seg;
    }).filter(function (seg) {return seg;});

    var segSorter = (0, _getSegSorter2.default)(exclusiveMode);
    var crossSegs = resourceSegs.filter(function (seg) {return seg.isCrossDays;}).sort(segSorter);
    var allDaySegs = resourceSegs.filter(function (seg) {return seg.isAllDay;}).sort(segSorter);
    var otherSegs = resourceSegs.filter(function (seg) {return seg.type === 'short';}).sort(segSorter);

    var resourceDates = {};
    resourceDates = crossSegs.reduce(reducer, resourceDates);
    resourceDates = allDaySegs.reduce(reducer, resourceDates);
    resourceDates = otherSegs.reduce(reducer, resourceDates);

    return (0, _extends3.default)({},
    resource, {
      key: resource.id,
      events: resourceEvents,
      dates: resourceDates });

  });

  return { monthDates: monthDates, segResources: segResources };
};exports.default =

buildSegs;module.exports = exports['default'];