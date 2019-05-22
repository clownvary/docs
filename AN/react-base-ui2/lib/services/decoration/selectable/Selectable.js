'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _isString = require('lodash/isString');var _isString2 = _interopRequireDefault(_isString);
var _isElement = require('lodash/isElement');var _isElement2 = _interopRequireDefault(_isElement);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _throttle = require('lodash/throttle');var _throttle2 = _interopRequireDefault(_throttle);

var _dom = require('../../../utils/dom');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var defaultOptions = {
  elements: '',
  selectableClass: '',
  deSelectableClasses: [],
  selectedClass: '',
  key: false,
  enabled: true,
  scrollEnabled: false,
  scrollContainer: null,
  scrollSensitiveDistance: 50,
  scrollVertical: 50,
  scrollHorizontal: 50,
  scrollThrottleTime: 100,
  onStart: null,
  onEnd: null,
  onSelect: null,
  onDeselect: null };


var numberSorter = function numberSorter(a, b) {return a - b;};var

Selectable = function () {


  function Selectable(el, options) {(0, _classCallCheck3.default)(this, Selectable);_initialiseProps.call(this);
    this.element = (0, _isString2.default)(el) ? document.querySelector(el) : el;

    if (!this.element || !(0, _isElement2.default)(this.element)) {
      throw new Error('Invalid target element');
    }

    this.options = (0, _extends3.default)({}, defaultOptions, options);
    this.on = false;

    this.start = this.start.bind(this);
    this.drawRect = this.drawRect.bind(this);
    this.end = this.end.bind(this);
    this.isScrollEnabled = this.isScrollEnabled.bind(this);
    this.cleanSelectingEventListeners = this.cleanSelectingEventListeners.bind(this);

    this.options.enabled && this.enable();

    this.scroll = (0, _throttle2.default)(this.scroll, this.options.scrollThrottleTime).bind(this);
  }(0, _createClass3.default)(Selectable, [{ key: 'cleanRectBox', value: function cleanRectBox()


























    {
      if (this.rectBox && this.rectBox.parentNode) {
        this.rectBox.parentNode.removeChild(this.rectBox);
      }
      this.rectBox = null;
    } }]);return Selectable;}();Selectable.tag = '__an_selectable';var _initialiseProps = function _initialiseProps() {var _this = this;this.getRectBox = function () {if (!_this.rectBox) {_this.rectBox = document.getElementById('an-selection-box');}if (!_this.rectBox) {var rb = document.createElement('div');rb.id = 'an-selection-box';if (_this.isScrollEnabled()) {var container = _this.options.scrollContainer; /* istanbul ignore next */container.firstChild ? container.insertBefore(rb, container.firstChild) : container.appendChild(rb);} else {document.body.appendChild(rb);}_this.rectBox = rb;}return _this.rectBox;};this.

  start = function (e) {var _options =

    _this.options,selectableClass = _options.selectableClass,deSelectableClasses = _options.deSelectableClasses,key = _options.key,container = _options.scrollContainer,onStart = _options.onStart;

    // Fix: The drag and drop should only happend in the blank space rather than on the events
    if (deSelectableClasses.length > 0) {
      var target = e.target;
      var isDragInTheDeSelectableElements = function isDragInTheDeSelectableElements(ele) {return deSelectableClasses.some(
        function (cls) {return (0, _dom.hasClass)(ele, cls);});};

      while (target && _this.element.contains(target)) {
        if (isDragInTheDeSelectableElements(target)) {
          return false;
        }

        target = target.parentNode;
      }
    }

    if (selectableClass) {
      var _target = e.target;
      while (_target && !(0, _dom.hasClass)(_target, selectableClass)) {
        _target = _target.parentNode;
      }
      if (!_target) {
        return false;
      }
    }

    (0, _isFunction2.default)(onStart) && onStart(e);
    if (key && !e[key]) {
      return false;
    }

    _this.ipos = [e.pageX, e.pageY];

    if (_this.isScrollEnabled()) {
      _this.scrollPos = [container.scrollLeft, container.scrollTop];
    }

    (0, _dom.addClass)(document.body, 'an-noselect');
    _this.items.forEach(function (el) {
      el.addEventListener('click', _this.suspend, true);
    });

    _this.cleanSelectingEventListeners();

    if (_this.isScrollEnabled()) {
      document.addEventListener('mousemove', _this.scroll);
      document.addEventListener('mousemove', _this.drawRectRelative);
    } else {
      document.addEventListener('mousemove', _this.drawRect);
    }
    window.addEventListener('mouseup', _this.end, true);
    return true;
  };this.

  drawRect = function (e) {
    if (!_this.ipos) return;

    var g = _this.getRectBox();
    if (!g) return;

    var tmp = void 0;
    var x1 = _this.ipos[0];
    var y1 = _this.ipos[1];
    var x2 = e.pageX;
    var y2 = e.pageY;
    if (x1 > x2) {
      tmp = x2;
      x2 = x1;
      x1 = tmp;
    }
    if (y1 > y2) {
      tmp = y2;
      y2 = y1;
      y1 = tmp;
    }
    g.style.left = x1 + 1 + 'px';
    g.style.top = y1 + 1 + 'px';
    g.style.width = x2 - x1 - 1 + 'px';
    g.style.height = y2 - y1 - 1 + 'px';
  };this.

  drawRectRelative = function (e) {
    if (!_this.ipos) return;

    var g = _this.getRectBox();
    if (!g) return;var

    container = _this.options.scrollContainer;
    var containerRect = container.getBoundingClientRect();

    // base on the scroll position to compare the mouse position
    var x1 = _this.ipos[0] + _this.scrollPos[0];
    var y1 = _this.ipos[1] + _this.scrollPos[1];
    var x2 = e.pageX + container.scrollLeft;
    var y2 = e.pageY + container.scrollTop;var _sort =

    [x1, x2].sort(numberSorter);var _sort2 = (0, _slicedToArray3.default)(_sort, 2);x1 = _sort2[0];x2 = _sort2[1];var _sort3 =
    [y1, y2].sort(numberSorter);var _sort4 = (0, _slicedToArray3.default)(_sort3, 2);y1 = _sort4[0];y2 = _sort4[1];

    var left = x1 - containerRect.left;
    // not out of bounds
    left = Math.max(left, 0);
    // not out of bounds when scrolling
    if (container.scrollLeft < _this.scrollPos[0] && left < container.scrollLeft) {
      left = container.scrollLeft;
    }

    var top = y1 - containerRect.top;
    top = Math.max(top, 0);
    if (container.scrollTop < _this.scrollPos[1] && top < container.scrollTop) {
      top = container.scrollTop;
    }

    var width = x2 - x1;
    width = Math.min(width, container.scrollWidth - left);
    if (container.scrollLeft > _this.scrollPos[0] &&
    container.scrollLeft + container.clientWidth < left + width) {
      width = container.scrollLeft + container.clientWidth - left;
    }
    if (left === 0) {
      width = _this.ipos[0] - containerRect.left + _this.scrollPos[0];
    }

    var height = y2 - y1;
    height = Math.min(height, container.scrollHeight - top);
    if (container.scrollTop > _this.scrollPos[1] &&
    container.scrollTop + container.clientHeight < top + height) {
      height = container.scrollTop + container.clientHeight - top;
    }
    if (top === 0) {
      height = _this.ipos[1] - containerRect.top + _this.scrollPos[1];
    }

    // +/- 1px to resolve mouseup event target issue
    g.style.left = left + 1 + 'px';
    g.style.top = top + 1 + 'px';
    g.style.width = width - 1 + 'px';
    g.style.height = height - 1 + 'px';
  };this.

  isCross = function (a, b) {var _offset =
    (0, _dom.offset)(a),aLeft = _offset.left,aTop = _offset.top;var _offset2 =
    (0, _dom.offset)(b),bLeft = _offset2.left,bTop = _offset2.top;

    return !(aTop + a.offsetHeight < bTop ||
    aTop > bTop + b.offsetHeight ||
    aLeft + a.offsetWidth < bLeft ||
    aLeft > bLeft + b.offsetWidth);
  };this.

  scroll = function (e) {var
    pageX = e.pageX,pageY = e.pageY;var _options2 =


    _this.options,container = _options2.scrollContainer,scrollSensitiveDistance = _options2.scrollSensitiveDistance,scrollVertical = _options2.scrollVertical,scrollHorizontal = _options2.scrollHorizontal;
    // check meet the boundary
    var rect = container.getBoundingClientRect();

    var meetTopBoundary = pageY <= rect.top + scrollSensitiveDistance;
    var meetRightBoundary = pageX >= rect.right - scrollSensitiveDistance;
    var meetBottomBoundary = pageY >= rect.bottom - scrollSensitiveDistance;
    var meetLeftBoundary = pageX <= rect.left + scrollSensitiveDistance;

    if (meetTopBoundary || meetBottomBoundary) {
      container.scrollTop += meetTopBoundary ? -1 * scrollVertical : scrollVertical;
    }
    if (meetLeftBoundary || meetRightBoundary) {
      container.scrollLeft += meetLeftBoundary ? -1 * scrollHorizontal : scrollHorizontal;
    }

    // make sure draw rect called after last throttled scroll
    _this.drawRectRelative(e);
  };this.

  end = function (e) {
    (0, _dom.removeClass)(document.body, 'an-noselect');

    // make sure the event listeners be removed firstly
    _this.cleanSelectingEventListeners();

    if (!_this.ipos) return;

    var ipos = _this.ipos;
    delete _this.ipos;
    delete _this.scrollPos;

    if (ipos[0] === e.pageX && ipos[1] === e.pageY) {
      _this.cleanRectBox();
      return;
    }

    var g = _this.getRectBox();
    if (!g) return;

    var s = _this.options.selectedClass;
    if (s && _this.items) {
      _this.items.forEach(function (el) {
        if (_this.isCross(g, el)) {
          if ((0, _dom.hasClass)(el, s)) {
            (0, _dom.removeClass)(el, s);
            _this.options.onDeselect && _this.options.onDeselect(el);
          } else {
            (0, _dom.addClass)(el, s);
            _this.options.onSelect && _this.options.onSelect(el);
          }
        }
        setTimeout(function () {
          el.removeEventListener('click', _this.suspend, true);
        }, 100);
      });
    }

    _this.cleanRectBox();
    _this.options.onEnd && _this.options.onEnd(e);
  };this.

  enable = function () {
    if (_this.on) {
      throw new Error('Already enabled');
    }var

    elements = _this.options.elements;
    _this.items = elements ? _this.element.querySelectorAll(elements) : [];

    _this.disable();
    _this.element.addEventListener('mousedown', _this.start);
    _this.on = true;
  };this.

  disable = function () {
    _this.element.removeEventListener('mousedown', _this.start);
    _this.on = false;
  };this.

  suspend = function (e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };this.

  isScrollEnabled = function () {var _options3 =
    _this.options,scrollEnabled = _options3.scrollEnabled,container = _options3.scrollContainer;
    return scrollEnabled && container;
  };this.

  cleanSelectingEventListeners = function () {
    document.removeEventListener('mousemove', _this.drawRect);
    document.removeEventListener('mousemove', _this.scroll);
    document.removeEventListener('mousemove', _this.drawRectRelative);
    window.removeEventListener('mouseup', _this.end);
  };};exports.default =



Selectable;module.exports = exports['default'];