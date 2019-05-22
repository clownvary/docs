'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _isArray = require('lodash/isArray');var _isArray2 = _interopRequireDefault(_isArray);
var _dom = require('../../utils/dom');
var _tryParseInt = require('../../utils/tryParseInt');var _tryParseInt2 = _interopRequireDefault(_tryParseInt);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

ColResizable = function () {









  function ColResizable(domElmTable) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};(0, _classCallCheck3.default)(this, ColResizable);
    this.options = (0, _extends3.default)({}, ColResizable.defaults, options);
    this.domElmTable = domElmTable;

    this.onGripMouseDown = this.onGripMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.init();
  }(0, _createClass3.default)(ColResizable, [{ key: 'init', value: function init()

    {
      (0, _dom.addClass)(this.domElmTable, 'table-col-resizer');

      this.domElmHandleList = [];
      this.domElmTableTheadThList = [];
      this.tableWidth = this.domElmTable.offsetWidth + 'px';

      this.cellSpacing = (0, _tryParseInt2.default)(getComputedStyle(this.domElmTable).getPropertyValue('border-spacing'));
      this.borderLeftWidth = (0, _tryParseInt2.default)(getComputedStyle(this.domElmTable).getPropertyValue('border-left-width'));

      this.createGrips();
    } }, { key: 'createGrips', value: function createGrips()

    {var _this = this;
      var domElmThead = this.domElmTable.querySelector('thead');
      var thList = domElmThead.querySelectorAll('th');

      var domElmThList = [];
      this.domElmHandleContainer = this.domElmTable.previousSibling;
      /* istanbul ignore next */
      var hasHandleContainer = this.domElmHandleContainer && this.domElmHandleContainer.className === 'col-resize-container';
      /* istanbul ignore else */
      if (!hasHandleContainer) {
        this.domElmTable.insertAdjacentHTML('beforebegin', '<div class="col-resize-container"/>');
        this.domElmHandleContainer = this.domElmTable.previousSibling;
      } else {
        Array.prototype.push.apply(this.domElmHandleList, this.domElmHandleContainer.childNodes);
      }

      Array.prototype.push.apply(domElmThList, thList);
      this.thLength = domElmThList.length;
      this.lastThIndex = this.thLength - 1;var

      disabledColumns = this.options.disabledColumns;

      /* istanbul ignore if */
      if (!(0, _isArray2.default)(disabledColumns)) {
        disabledColumns = [];
      }


      domElmThList.forEach(function (domElmTh, index) {
        var disabledColumn = disabledColumns.indexOf(index) !== -1;
        var domElmHandle = void 0;
        /* istanbul ignore else */
        if (!hasHandleContainer) {
          _this.domElmHandleContainer.insertAdjacentHTML('beforeend', '<div class="drag-handle">\n          <i class="icon icon-caret-right"></i>\n          <div class="col-resizer"></div>\n          <i class="icon icon-caret-left"></i>\n        </div>');






          domElmHandle = _this.domElmHandleContainer.lastChild;
        } else {
          domElmHandle = _this.domElmHandleList[index];
        }

        if (index === _this.lastThIndex && !hasHandleContainer) {
          (0, _dom.addClass)(domElmHandle, 'last-handle');
        }

        /* istanbul ignore else */
        if (!disabledColumn && !hasHandleContainer) {
          domElmHandle.addEventListener('mousedown', _this.onGripMouseDown);
        } else if (disabledColumn && !hasHandleContainer) {
          (0, _dom.addClass)(domElmHandle, 'disabled-drag');
        }

        domElmHandle.index = index;
        domElmTh.w = domElmTh.offsetWidth;

        domElmTh.style.width = domElmTh.offsetWidth + 'px';
        /* istanbul ignore else */
        if (!hasHandleContainer) {
          _this.domElmHandleList.push(domElmHandle);
        }
        _this.domElmTableTheadThList.push(domElmTh);
      });
      this.syncGrips();
    } }, { key: 'syncGrips', value: function syncGrips()

    {var
      headerOnly = this.options.headerOnly;
      var theadHight = this.domElmTableTheadThList[0].offsetHeight;

      var height = void 0;
      /* istanbul ignore else */
      if (headerOnly) {
        height = theadHight;
      } else {
        height = this.domElmTable.offsetHeight;
      }

      for (var i = 0; i < this.thLength; i += 1) {
        var domElmTh = this.domElmTableTheadThList[i];

        var left = void 0;
        if (i === 0) {
          left = domElmTh.offsetWidth + this.cellSpacing / 2;
        } else {
          var handleColLeft = this.domElmHandleList[i - 1].style.left + this.cellSpacing / 2;
          left = (0, _tryParseInt2.default)(handleColLeft) + domElmTh.offsetWidth;
        }

        this.domElmHandleList[i].style.left = left + 'px';
        this.domElmHandleList[i].style.height = height + 'px';
      }

      var domElmIconList = [];
      var iconHeight = this.domElmHandleContainer.querySelector('.col-resize-container .icon').offsetHeight;

      var domElemIcons = this.domElmHandleContainer.querySelectorAll('.col-resize-container .icon');
      Array.prototype.push.apply(domElmIconList, domElemIcons);

      domElmIconList.forEach(function (el) {
        var marginTopNumber = (theadHight - iconHeight) / 2;
        el.style.marginTop = (0, _tryParseInt2.default)(marginTopNumber) + 'px';
      });
    } }, { key: 'onGripMouseDown', value: function onGripMouseDown(

    e) {
      e.preventDefault();var
      index = e.currentTarget.index;
      var domElmHandle = this.domElmHandleList[index];
      (0, _dom.addClass)(domElmHandle, 'active-drag');

      domElmHandle.initPageLeftX = e.pageX;
      domElmHandle.initLeft = (0, _tryParseInt2.default)(domElmHandle.style.left);
      domElmHandle.x = domElmHandle.initLeft;
      this.drag = domElmHandle;

      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);

      return false;
    } }, { key: 'onMouseMove', value: function onMouseMove(

    e) {
      e.preventDefault();
      /* istanbul ignore if */
      if (!this.drag) {
        return false;
      }var

      defaultMinWidth = this.options.defaultMinWidth;
      var index = this.drag.index;

      var minWidth = defaultMinWidth;
      var pageLeftX = e.pageX;
      var x = pageLeftX - this.drag.initPageLeftX + this.drag.initLeft;

      var l = this.cellSpacing * 1.5 + minWidth + this.borderLeftWidth;
      /* istanbul ignore next */
      var min = index ? (0, _tryParseInt2.default)(this.domElmHandleList[index - 1].style.left) +
      this.cellSpacing + minWidth : l;

      var max = (0, _tryParseInt2.default)(this.domElmHandleList[index + 1].style.left) -
      this.cellSpacing - minWidth;

      x = Math.max(min, Math.min(max, x));

      var inc = x - this.drag.initLeft;
      var domElmThNow = this.domElmTableTheadThList[index];
      var domElmThElmNext = this.domElmTableTheadThList[index + 1];

      var w = domElmThNow.w + inc;
      var w2 = domElmThElmNext.w - inc;
      var minWidthOne = (0, _tryParseInt2.default)(this.domElmTableTheadThList[index].getAttribute('data-min-width'));
      var minWidthTwo = (0, _tryParseInt2.default)(this.domElmTableTheadThList[index + 1].getAttribute('data-min-width'));

      /* istanbul ignore if */
      if (minWidthOne > w) {
        x = minWidthOne - domElmThNow.w + this.drag.initLeft;
      } else if (minWidthTwo > w2) {
        x = domElmThElmNext.w - minWidthTwo + this.drag.initLeft;
      }

      this.drag.x = x;
      this.drag.style.left = x + 'px';
      /* istanbul ignore else */
      if (this.options.liveDrag) {
        this.syncCols(index);
        this.syncGrips();var
        onResizing = this.options.onResizing;

        /* istanbul ignore if */
        if ((0, _isFunction2.default)(onResizing)) {
          onResizing(e);
        }
      }

      return false;
    } }, { key: 'syncCols', value: function syncCols(

    i, isOver) {
      var inc = this.drag.x - this.drag.initLeft;
      var domElmThNow = this.domElmTableTheadThList[i];
      var domElmThNext = this.domElmTableTheadThList[i + 1];

      var w = domElmThNow.w + inc;
      var w2 = domElmThNext.w - inc;

      domElmThNow.style.width = w + 'px';
      domElmThNext.style.width = w2 + 'px';

      if (isOver) {
        domElmThNow.w = w;
        domElmThNext.w = w2;
      }
    } }, { key: 'onMouseUp', value: function onMouseUp(

    e) {
      document.removeEventListener('mouseup', this.onMouseUp);
      document.removeEventListener('mousemove', this.onMouseMove);
      /* istanbul ignore if */
      if (!this.drag) {
        return false;
      }

      (0, _dom.removeClass)(this.drag, 'active-drag');
      /* istanbul ignore else */
      if (!(this.drag.x - this.drag.initLeft === 0)) {
        var index = this.drag.index;
        this.syncCols(index, true);
        this.syncGrips();var

        onResized = this.options.onResized;
        /* istanbul ignore if */
        if ((0, _isFunction2.default)(onResized)) {
          onResized(e);
        }
      }
      this.drag = null;

      return true;
    } }]);return ColResizable;}();ColResizable.defaults = { liveDrag: true, defaultMinWidth: 30, headerOnly: true, disabledColumns: [], onResizing: null, onResized: null };exports.default = ColResizable;module.exports = exports['default'];