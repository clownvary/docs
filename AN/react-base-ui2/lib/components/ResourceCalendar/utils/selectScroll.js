'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _isString = require('lodash/isString');var _isString2 = _interopRequireDefault(_isString);
var _isElement = require('lodash/isElement');var _isElement2 = _interopRequireDefault(_isElement);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _throttle = require('lodash/throttle');var _throttle2 = _interopRequireDefault(_throttle);
var _forEach = require('lodash/forEach');var _forEach2 = _interopRequireDefault(_forEach);
var _findIndex = require('lodash/findIndex');var _findIndex2 = _interopRequireDefault(_findIndex);

var _dom = require('../../../utils/dom');

require('./selectScroll.less');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var defaultOptions = {
  selectableClass: '',
  deSelectableClasses: [],
  enabled: true,
  scrollContainer: null,
  scrollSensitiveDistance: 30,
  scrollVertical: 30,
  scrollHorizontal: 50,
  scrollThrottleTime: 80,
  highlightThrottleTime: 80,
  onStart: null,
  onEnd: null };


var numberSorter = function numberSorter(a, b) {return a - b;};var

SelectScroll = function () {





  function SelectScroll(el, options) {var _this = this;(0, _classCallCheck3.default)(this, SelectScroll);this.




























    getRectBox = function () {
      if (!_this.rectBox) {
        _this.rectBox = document.getElementById(SelectScroll.selectionBoxId);
      }

      if (!_this.rectBox) {
        var rb = document.createElement('div');
        rb.id = SelectScroll.selectionBoxId;var

        scrollContainer = _this.options.scrollContainer;
        /* istanbul ignore next */
        scrollContainer.firstChild ?
        scrollContainer.insertBefore(rb, scrollContainer.firstChild) :
        scrollContainer.appendChild(rb);

        _this.rectBox = rb;
      }

      return _this.rectBox;
    };this.








    preStartCheck = function (currentTarget) {var _options =
      _this.options,selectableClass = _options.selectableClass,deSelectableClasses = _options.deSelectableClasses;

      // Fix: The drag and drop should only happened in the blank space rather than on the events
      if (deSelectableClasses.length > 0) {
        var target = currentTarget;
        var isDragInTheDeSelectableElements = function isDragInTheDeSelectableElements(ele) {return (
            deSelectableClasses.some(function (cls) {return (0, _dom.hasClass)(ele, cls);}));};

        while (target && _this.element.contains(target)) {
          if (isDragInTheDeSelectableElements(target)) {
            return false;
          }

          target = target.parentNode;
        }
      }

      if (selectableClass) {
        var _target = currentTarget;
        while (_target && !(0, _dom.hasClass)(_target, selectableClass)) {
          _target = _target.parentNode;
        }
        if (!_target) {
          return false;
        }
      }

      return true;
    };this.

    preStartCache = function (_ref) {var pageX = _ref.pageX,pageY = _ref.pageY;var
      scrollContainer = _this.options.scrollContainer;

      _this.ipos = [pageX, pageY];
      _this.scrollPos = [scrollContainer.scrollLeft, scrollContainer.scrollTop];

      // cache container
      _this.containerRect = scrollContainer.getBoundingClientRect();

      // cache cells dom by row/column
      var rowCells = [];
      var rows = document.querySelectorAll('.an-scroller__content .grid-row');
      (0, _forEach2.default)(rows, function (row, index) {
        rowCells[index] = row.querySelectorAll('.grid-cell');
      });
      _this.rowCells = rowCells;

      // cache first row/column related rect
      var rowRect = [];
      (0, _forEach2.default)(rowCells, function (row, rowIndex) {
        var rect = row[0].getBoundingClientRect();
        rowRect[rowIndex] = {
          top: rect.top,
          bottom: rect.bottom };

      });
      _this.rowRect = rowRect;

      var columnRect = [];
      (0, _forEach2.default)(rowCells[0], function (cell, cellIndex) {
        var rect = cell.getBoundingClientRect();
        columnRect[cellIndex] = {
          left: rect.left,
          right: rect.right };

      });
      _this.columnRect = columnRect;

      // indexes of the cell that selection start from
      _this.startRowIndex = _this.getRowRectIndexByPoint({ top: _this.ipos[1] });
      _this.startColumnIndex = _this.getColumnRectIndexByPoint({ left: _this.ipos[0] });

      _this.highlightIndexes = [];
    };this.

    start = function (e) {var _options2 =


      _this.options,scrollContainer = _options2.scrollContainer,onStart = _options2.onStart;
      if (!_this.preStartCheck(e.target)) {
        return false;
      }
      _this.preStartCache(e);

      (0, _isFunction2.default)(onStart) && onStart(e, _this.rowCells[_this.startRowIndex][_this.startColumnIndex]);

      _this.cleanSelectingEventListeners();
      _this.bindSelectingEventListeners();

      (0, _dom.addClass)(scrollContainer, SelectScroll.selectingClass);
      return true;
    };this.

    highlightSelections = function (e, g) {
      /* istanbul ignore next */
      if (!_this.ipos) return;var

      scrollContainer = _this.options.scrollContainer;var

      pageX = e.pageX,pageY = e.pageY;var _g$getBoundingClientR =
      g.getBoundingClientRect(),left = _g$getBoundingClientR.left,top = _g$getBoundingClientR.top,right = _g$getBoundingClientR.right,bottom = _g$getBoundingClientR.bottom;

      // mouse current position
      var scrollLeftDiff = scrollContainer.scrollLeft - _this.scrollPos[0];
      var scrollTopDiff = scrollContainer.scrollTop - _this.scrollPos[1];

      // get rect box end position
      var endRowIndex = _this.getRowRectIndexByPoint({
        top: (_this.ipos[1] < pageY + scrollTopDiff ? bottom : top) + scrollTopDiff });

      _this.endRowIndex = endRowIndex;
      var endColumnIndex = _this.getColumnRectIndexByPoint({
        left: (_this.ipos[0] < pageX + scrollLeftDiff ? right : left) + scrollLeftDiff });

      _this.endColumnIndex = endColumnIndex;var _sort =

      [_this.startRowIndex, endRowIndex].sort(numberSorter),_sort2 = (0, _slicedToArray3.default)(_sort, 2),rowIndex1 = _sort2[0],rowIndex2 = _sort2[1];var _sort3 =
      [_this.startColumnIndex, endColumnIndex].sort(numberSorter),_sort4 = (0, _slicedToArray3.default)(_sort3, 2),columnIndex1 = _sort4[0],columnIndex2 = _sort4[1];

      // next round highlight cell row/column index
      var nextHighlightIndexes = [];
      for (var ri = rowIndex1; ri <= rowIndex2; ri += 1) {
        for (var ci = columnIndex1; ci <= columnIndex2; ci += 1) {
          nextHighlightIndexes.push({
            row: ri,
            col: ci });

        }
      }

      // next shall be highlight
      var highlightDiff = nextHighlightIndexes.filter(function (item) {return (
          !_this.highlightIndexes.some(function (before) {return before.row === item.row && before.col === item.col;}));});

      // next shall be recover to normal
      var recoverDiff = _this.highlightIndexes.filter(function (before) {return (
          !nextHighlightIndexes.some(function (item) {return before.row === item.row && before.col === item.col;}));});

      // apply class change
      highlightDiff.forEach(function (item) {
        _this.rowCells[item.row][item.col].classList.add(SelectScroll.highlightClass);
      });
      recoverDiff.forEach(function (item) {
        _this.rowCells[item.row][item.col].classList.remove(SelectScroll.highlightClass);
      });

      // update highlight cell index cache
      _this.highlightIndexes = nextHighlightIndexes;
    };this.

    drawRectRelative = function (e) {
      /* istanbul ignore next */
      if (!_this.ipos) return;

      var g = _this.getRectBox();
      /* istanbul ignore next */
      if (!g) return;var

      scrollContainer = _this.options.scrollContainer;var

      pageX = e.pageX,pageY = e.pageY;

      // base on the scroll position to compare the mouse position
      var x1 = _this.ipos[0] + _this.scrollPos[0];
      var y1 = _this.ipos[1] + _this.scrollPos[1];
      var x2 = pageX + scrollContainer.scrollLeft;
      var y2 = pageY + scrollContainer.scrollTop;var _sort5 =

      [x1, x2].sort(numberSorter);var _sort6 = (0, _slicedToArray3.default)(_sort5, 2);x1 = _sort6[0];x2 = _sort6[1];var _sort7 =
      [y1, y2].sort(numberSorter);var _sort8 = (0, _slicedToArray3.default)(_sort7, 2);y1 = _sort8[0];y2 = _sort8[1];

      var left = x1 - _this.containerRect.left;
      // not out of bounds
      left = Math.max(left, 0);
      // not out of bounds when scrolling
      if (scrollContainer.scrollLeft < _this.scrollPos[0] && left < scrollContainer.scrollLeft) {
        left = scrollContainer.scrollLeft;
      }

      var top = y1 - _this.containerRect.top;
      top = Math.max(top, 0);
      if (scrollContainer.scrollTop < _this.scrollPos[1] && top < scrollContainer.scrollTop) {
        top = scrollContainer.scrollTop;
      }

      var width = x2 - x1;
      width = Math.min(width, scrollContainer.scrollWidth - left);
      if (scrollContainer.scrollLeft > _this.scrollPos[0] &&
      scrollContainer.scrollLeft + scrollContainer.clientWidth < left + width) {
        width = scrollContainer.scrollLeft + scrollContainer.clientWidth - left;
      }
      if (left === 0) {
        width = _this.ipos[0] - _this.containerRect.left + _this.scrollPos[0];
      }

      var height = y2 - y1;
      height = Math.min(height, scrollContainer.scrollHeight - top);
      if (scrollContainer.scrollTop > _this.scrollPos[1] &&
      scrollContainer.scrollTop + scrollContainer.clientHeight < top + height) {
        height = scrollContainer.scrollTop + scrollContainer.clientHeight - top;
      }
      if (top === 0) {
        height = _this.ipos[1] - _this.containerRect.top + _this.scrollPos[1];
      }

      // +/- 1px to resolve mouseup event target issue
      g.style.left = left + 1 + 'px';
      g.style.top = top + 1 + 'px';
      g.style.width = width - 1 + 'px';
      g.style.height = height - 1 + 'px';

      // highlight cell selection
      _this.highlightSelections(e, g);
    };this.

    getRowRectIndexByPoint = function (point) {return (0, _findIndex2.default)(_this.rowRect, function (rect, index) {
        if (index === 0) {
          return rect.bottom >= point.top;
        }
        if (index === _this.rowRect.length - 1) {
          return rect.top <= point.top;
        }
        return rect.top <= point.top && rect.bottom >= point.top;
      });};this.

    getColumnRectIndexByPoint = function (point) {return (0, _findIndex2.default)(_this.columnRect, function (rect, index) {
        if (index === 0) {
          return rect.right >= point.left;
        }
        if (index === _this.columnRect.length - 1) {
          return rect.left <= point.left;
        }
        return rect.left <= point.left && rect.right >= point.left;
      });};this.

    scroll = function (e) {
      /* istanbul ignore next */
      if (!_this.ipos) return;var

      pageX = e.pageX,pageY = e.pageY;var _options3 =


      _this.options,scrollContainer = _options3.scrollContainer,scrollSensitiveDistance = _options3.scrollSensitiveDistance,scrollVertical = _options3.scrollVertical,scrollHorizontal = _options3.scrollHorizontal;
      // check meet the boundary
      var rect = _this.containerRect;var


      scrollLeft =

      scrollContainer.scrollLeft,scrollTop = scrollContainer.scrollTop,scrollWidth = scrollContainer.scrollWidth,scrollHeight = scrollContainer.scrollHeight,clientWidth = scrollContainer.clientWidth,clientHeight = scrollContainer.clientHeight;

      if (scrollTop > 0) {
        var meetTopBoundary = pageY <= rect.top + scrollSensitiveDistance;
        if (meetTopBoundary) {
          var nextScrollTop = scrollTop - scrollVertical;
          scrollContainer.scrollTop = nextScrollTop < 0 ? 0 : nextScrollTop;
        }
      }

      var maxScrollLeft = scrollWidth - clientWidth;
      if (scrollLeft < maxScrollLeft) {
        var meetRightBoundary = pageX >= rect.right - scrollSensitiveDistance;
        if (meetRightBoundary) {
          var nextScrollLeft = scrollLeft + scrollHorizontal;
          scrollContainer.scrollLeft = nextScrollLeft > maxScrollLeft ?
          maxScrollLeft : nextScrollLeft;
        }
      }

      var maxScrollTop = scrollHeight - clientHeight;
      if (scrollTop < maxScrollTop) {
        var meetBottomBoundary = pageY >= rect.bottom - scrollSensitiveDistance;
        if (meetBottomBoundary) {
          var _nextScrollTop = scrollTop + scrollVertical;
          scrollContainer.scrollTop = _nextScrollTop > maxScrollTop ? maxScrollTop : _nextScrollTop;
        }
      }

      if (scrollLeft > 0) {
        var meetLeftBoundary = pageX <= rect.left + scrollSensitiveDistance;
        if (meetLeftBoundary) {
          var _nextScrollLeft = scrollLeft - scrollHorizontal;
          scrollContainer.scrollLeft = _nextScrollLeft < 0 ? 0 : _nextScrollLeft;
        }
      }

      // make sure draw rect called after last throttled scroll
      _this.drawRectRelative(e);
    };this.

    end = function (e) {
      (0, _dom.removeClass)(_this.options.scrollContainer, SelectScroll.selectingClass);

      // make sure the event listeners be removed firstly
      _this.cleanSelectingEventListeners();

      /* istanbul ignore next */
      if (!_this.ipos) return;

      var ipos = _this.ipos;
      delete _this.ipos;

      (0, _forEach2.default)(_this.rowCells, function (row) {
        row && (0, _forEach2.default)(row, function (cell) {
          cell.classList.remove(SelectScroll.highlightClass);
        });
      });

      _this.scrollPos = null;
      _this.rowRect = null;
      _this.columnRect = null;
      _this.highlightIndexes = null;

      /* istanbul ignore next */
      if (ipos[0] === e.pageX && ipos[1] === e.pageY) {
        _this.cleanRectBox();
        return;
      }
      var g = _this.getRectBox();
      /* istanbul ignore next */
      if (!g) return;
      _this.cleanRectBox();

      _this.options.onEnd &&
      _this.options.onEnd(e, _this.rowCells[_this.endRowIndex][_this.endColumnIndex]);

      _this.rowCells = null;
    };this.

    enable = function () {
      if (_this.on) {
        throw new Error('Already enabled');
      }

      _this.disable();
      _this.element.addEventListener('mousedown', _this.start);
      _this.on = true;
    };this.

    disable = function () {
      _this.element.removeEventListener('mousedown', _this.start);
      _this.on = false;
    };this.

    bindSelectingEventListeners = function () {
      document.addEventListener('mousemove', _this.drawRectRelative);
      document.addEventListener('mousemove', _this.scroll);
      document.addEventListener('mouseup', _this.end, true);
    };this.

    cleanSelectingEventListeners = function () {
      document.removeEventListener('mousemove', _this.drawRectRelative);
      document.removeEventListener('mousemove', _this.scroll);
      document.removeEventListener('mouseup', _this.end, true);
    };this.element = (0, _isString2.default)(el) ? document.querySelector(el) : el;if (!this.element || !(0, _isElement2.default)(this.element)) {throw new Error('Invalid target element');}this.options = (0, _extends3.default)({}, defaultOptions, options);this.on = false;this.preStartCheck = this.preStartCheck.bind(this);this.preStartCache = this.preStartCache.bind(this);this.start = this.start.bind(this);this.end = this.end.bind(this);this.getRectBox = this.getRectBox.bind(this);this.drawRectRelative = this.drawRectRelative.bind(this);this.bindSelectingEventListeners = this.bindSelectingEventListeners.bind(this);this.cleanSelectingEventListeners = this.cleanSelectingEventListeners.bind(this);this.getRowRectIndexByPoint = this.getRowRectIndexByPoint.bind(this);this.getColumnRectIndexByPoint = this.getColumnRectIndexByPoint.bind(this);this.scroll = (0, _throttle2.default)(this.scroll, this.options.scrollThrottleTime).bind(this);this.highlightSelections = (0, _throttle2.default)(this.highlightSelections, this.options.highlightThrottleTime).bind(this);this.options.enabled && this.enable();}(0, _createClass3.default)(SelectScroll, [{ key: 'cleanRectBox', value: function cleanRectBox() {if (this.rectBox && this.rectBox.parentNode) {this.rectBox.parentNode.removeChild(this.rectBox);}this.rectBox = null;} }]);return SelectScroll;}();SelectScroll.tag = 'an-rc__select-scroller';SelectScroll.selectionBoxId = 'an-rc__selection';SelectScroll.selectingClass = 'an-rc__no-select';SelectScroll.highlightClass = 'grid-cell__selected';exports.default =


SelectScroll;module.exports = exports['default'];