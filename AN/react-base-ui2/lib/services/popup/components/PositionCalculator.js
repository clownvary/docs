'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _dom = require('../../../utils/dom');var domUtil = _interopRequireWildcard(_dom);
var _mirror = require('./mirror');var _mirror2 = _interopRequireDefault(_mirror);
var _Edge = require('./consts/Edge');var Edge = _interopRequireWildcard(_Edge);
var _FlipMode = require('./consts/FlipMode');var FlipMode = _interopRequireWildcard(_FlipMode);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


var NODE_TYPE_DOCUMENT = 9;
var _docElement = document.documentElement;

var parseAt = function parseAt(ref) {
  var rVertical = /top|middle|bottom/;
  var rHorizontal = /left|center|right/;

  var values = ref.split(' ');
  var y = Edge.BOTTOM;
  var x = Edge.LEFT;

  if (rVertical.test(values[0])) {
    y = values[0];
  } else {
    rVertical.test(values[1]);
    y = values[1];
  }

  if (rHorizontal.test(values[0])) {
    x = values[0];
  } else {
    rHorizontal.test(values[1]);
    x = values[1];
  }

  return { y: y, x: x };
};

var isSameRect = function isSameRect(pos1, pos2) {
  if (pos1 === pos2) {
    return true;
  }
  /* istanbul ignore if */
  if (!pos1 || !pos2) {
    return false;
  }
  return pos1.top === pos2.top && pos1.left === pos2.left &&
  pos1.height === pos2.height && pos1.width === pos2.width;
};

var defaultOptions = {
  main: null,
  target: null,
  boundary: window,
  mainAt: 'top left',
  targetAt: 'top left',
  mainOffset: {
    y: 0,
    x: 0,
    mirror: true },

  targetOffset: {
    y: 0,
    x: 0,
    mirror: true },

  crossLine: true,
  flip: FlipMode.BOTH,
  stick: 'all' };var


PositionCalculator = function () {
  function PositionCalculator(options) {(0, _classCallCheck3.default)(this, PositionCalculator);
    this.options = (0, _extends3.default)({}, defaultOptions, options);var _options =

    this.options,main = _options.main,target = _options.target,boundary = _options.boundary,mainAt = _options.mainAt,targetAt = _options.targetAt,crossLine = _options.crossLine,_options$position = _options.position,position = _options$position === undefined ? null : _options$position;

    if (!main) {
      throw new Error('main can not be empty');
    }

    // Quick access to options
    this.main = main;
    this.target = target;
    this.mainAt = parseAt(mainAt);
    this.targetAt = parseAt(targetAt);
    this.boundary = boundary;
    this.crossLine = crossLine;
    this.position = position;

    this.updateRects();
  }(0, _createClass3.default)(PositionCalculator, [{ key: 'getRect', value: function getRect(

    elem) {
      if (elem.nodeType === NODE_TYPE_DOCUMENT) {
        // Document Node
        return {
          width: domUtil.outerWidth(elem),
          height: domUtil.outerHeight(elem),
          top: 0,
          left: 0 };

      }
      if (domUtil.isWindow(elem)) {
        // Window
        return {
          width: domUtil.outerWidth(elem),
          height: domUtil.outerHeight(elem),
          top: domUtil.scrollTop(elem),
          left: domUtil.scrollLeft(elem) };

      }
      if (elem.preventDefault) {
        // is event
        return {
          width: 0,
          height: 0,
          top: elem.pageY,
          left: elem.pageX };

      }
      var offset = domUtil.offset(elem);
      return {
        width: domUtil.outerWidth(elem),
        height: domUtil.outerHeight(elem),
        top: offset.top,
        left: offset.left };

    } }, { key: 'refreshPos', value: function refreshPos(

    elem, pos) {
      var p = this.getRect(elem);
      pos.top = p.top;
      pos.left = p.left;
    } }, { key: 'getBoundary', value: function getBoundary(

    elem) {
      var domElm = elem;
      var offset = void 0;
      if (elem.nodeType === NODE_TYPE_DOCUMENT) {
        // is document node
        domElm = _docElement;
        offset = {
          top: 0,
          left: 0 };

      } else if (domUtil.isWindow(elem)) {
        domElm = _docElement;
        offset = {
          top: domUtil.scrollTop(elem),
          left: domUtil.scrollLeft(elem) };

      } else {
        offset = domUtil.offset(elem);
      }

      return {
        width: domElm.clientWidth,
        height: domElm.clientHeight,
        top: offset.top + domElm.clientTop,
        left: offset.left + domElm.clientLeft };

    } }, { key: 'refreshBoundaryPos', value: function refreshBoundaryPos(

    elem, pos) {
      var bnd = this.getBoundary(elem);
      pos.top = bnd.top;
      pos.left = bnd.left;
    }

    // support percentage offset, for example: { y: '20%', x: 0}
  }, { key: 'parseOffset', value: function parseOffset(offset, size) {
      var rPercent = /%$/;
      return {
        y: parseFloat(offset.y) * (rPercent.test(offset.y) ? size.height / 100 : 1),
        x: parseFloat(offset.x) * (rPercent.test(offset.x) ? size.width / 100 : 1),
        mirror: offset.mirror };

    } }, { key: 'calcRefPoint', value: function calcRefPoint(

    rect, offset, at) {
      var result = {
        top: 0,
        left: 0,
        middle: rect.height * 0.5,
        center: rect.width * 0.5,
        bottom: rect.height,
        right: rect.width };


      // add extra offset
      if (offset.y !== 0) {
        result.middle += offset.y;
        if (offset.mirror) {
          result.top += at.y !== Edge.TOP ? offset.y * -1 : offset.y;
          result.bottom += at.y !== Edge.BOTTOM ? offset.y * -1 : offset.y;
        } else {
          result.top += offset.y;
          result.bottom += offset.y;
        }
      }
      if (offset.x !== 0) {
        result.center += offset.x;
        if (offset.mirror) {
          result.left += at.x !== Edge.LEFT ? offset.x * -1 : offset.x;
          result.right += at.x !== Edge.RIGHT ? offset.x * -1 : offset.x;
        } else {
          result.left += offset.x;
          result.right += offset.x;
        }
      }

      return result;
    } }, { key: 'updateOverflow', value: function updateOverflow(

    distance) {
      var overflow = [];
      distance.top > 0 && overflow.push(Edge.TOP);
      distance.left > 0 && overflow.push(Edge.LEFT);
      distance.bottom < 0 && overflow.push(Edge.BOTTOM);
      distance.right < 0 && overflow.push(Edge.RIGHT);

      if (overflow.length) {
        distance.overflow = overflow;
      } else {
        distance.overflow = null;
      }

      return distance;
    } }, { key: 'calcDistanceToBoundary', value: function calcDistanceToBoundary(

    rect) {
      var result = {
        top: this.boundaryRect.top - rect.top,
        left: this.boundaryRect.left - rect.left,
        bottom: this.boundaryRect.top + this.boundaryRect.height - (rect.top + rect.height),
        right: this.boundaryRect.left + this.boundaryRect.width - (rect.left + rect.width),
        overflow: [] };


      return this.updateOverflow(result);
    } }, { key: 'doFlip', value: function doFlip(

    flip, mainAt, targetAt, distance) {
      var yOverflowEdge = void 0;
      var xOverflowEdge = void 0;

      if (distance.overflow.indexOf(Edge.TOP) !== -1) {
        yOverflowEdge = Edge.TOP;
      }
      if (distance.overflow.indexOf(Edge.BOTTOM) !== -1) {
        if (yOverflowEdge) {
          // overflow in both sides, so main is larger than boundary. Can't be resolved
          yOverflowEdge = null;
        } else {
          yOverflowEdge = Edge.BOTTOM;
        }
      }

      if (distance.overflow.indexOf(Edge.LEFT) !== -1) {
        xOverflowEdge = Edge.LEFT;
      }
      if (distance.overflow.indexOf(Edge.RIGHT) !== -1) {
        if (xOverflowEdge) {
          // overflow in both sides, so main is larger than boundary. Can't be resolved
          xOverflowEdge = null;
        } else {
          xOverflowEdge = Edge.RIGHT;
        }
      }

      if (!yOverflowEdge && !xOverflowEdge) {
        return null;
      }

      var mainFlipedAt = (0, _extends3.default)({}, mainAt);
      var targetFlipedAt = (0, _extends3.default)({}, targetAt);

      flip = flip === true ? FlipMode.BOTH : flip;
      if (flip === FlipMode.MAIN || flip === FlipMode.BOTH) {
        yOverflowEdge && (mainFlipedAt.y = (0, _mirror2.default)(mainFlipedAt.y));
        xOverflowEdge && (mainFlipedAt.x = (0, _mirror2.default)(mainFlipedAt.x));
      }
      if (flip === FlipMode.TARGET || flip === FlipMode.BOTH) {
        yOverflowEdge && (targetFlipedAt.y = (0, _mirror2.default)(targetFlipedAt.y));
        xOverflowEdge && (targetFlipedAt.x = (0, _mirror2.default)(targetFlipedAt.x));
      }

      return {
        mainAt: mainFlipedAt,
        targetAt: targetFlipedAt };

    } }, { key: '_overflowLT', value: function _overflowLT(

    distanceA, distanceB, isY) {
      var edges = isY ? [Edge.TOP, Edge.BOTTOM] : [Edge.LEFT, Edge.RIGHT];

      var a1 = distanceA[edges[0]];
      var b1 = distanceB[edges[0]];
      var a2 = distanceA[edges[1]] * -1; // * -1 to get positive values for overflow
      var b2 = distanceB[edges[1]] * -1;

      // set values without overflow to zero
      a1 < 0 && (a1 = 0);
      a2 < 0 && (a2 = 0);
      b1 < 0 && (b1 = 0);
      b2 < 0 && (b2 = 0);

      /* istanbul ignore next */
      if (a1 < 0 && a2 < 0) {
        // take a
        return true;
      }

      /* istanbul ignore next */
      if (b1 < 0 && b2 < 0) {
        // take b
        return false;
      }

      return a1 + a2 < b1 + b2;
    } }, { key: 'doStick', value: function doStick(

    data, edges) {
      if (edges === 'all') {
        edges = true;
      }
      var overflow = data.distance.overflow;
      if (!overflow.length) {
        return data;
      }

      // to prevent handling overflow in both directions of on axis
      var skipX = false;
      var skipY = false;

      var edge = void 0;
      var diff = void 0;
      var i = void 0;
      for (i = overflow.length - 1; i >= 0; i -= 1) {
        edge = overflow[i];
        switch (edge) {
          case Edge.TOP:
          case Edge.BOTTOM:
            if (!skipY && edges === true || typeof edges === 'string' && edges.indexOf(edge) !== -1) {
              diff = data.distance[edge];
              data.moveBy.y += diff;
              data.distance.top -= diff;
              data.distance.bottom -= diff;
              data.pos.top += diff;
              skipY = true;
            }
            break;

          case Edge.LEFT:
          case Edge.RIGHT:
            if (!skipX && edges === true || edges.indexOf(edge) !== -1) {
              diff = data.distance[edge];
              data.moveBy.x += diff;
              data.distance.left -= diff;
              data.distance.right -= diff;
              data.pos.left += diff;
              skipX = true;
            }
            break;
          default:
            break;}

      }

      this.updateOverflow(data.distance);

      return data;
    } }, { key: 'updateRects', value: function updateRects()

    {
      this.boundaryRect = this.getBoundary(this.boundary);

      var mainRect = this.getRect(this.main);
      var targetRect = null;
      if (this.position && !this.crossLine) {
        targetRect = {
          left: this.position.left,
          top: this.position.top,
          width: 2,
          height: 2 };

      } else /* istanbul ignore next */if (this.target) {
          targetRect = this.getRect(this.target);
        }

      if (!this.mainRect || !isSameRect(mainRect, this.mainRect)) {
        this.mainRect = mainRect;var

        mainOffset = this.options.mainOffset;
        var mo = this.parseOffset(mainOffset, mainRect);
        // negate values, because it shall be defined relative to the main reference point
        // and not relative to the corner.
        mo.x *= -1;
        mo.y *= -1;

        this.mainRefPoint = this.calcRefPoint(mainRect, mo, this.mainAt);
      }

      if (!this.targetRect || !isSameRect(targetRect, this.targetRect)) {
        this.targetRect = targetRect;var

        targetOffset = this.options.targetOffset;
        var to = this.parseOffset(targetOffset, targetRect);

        this.targetRefPoint = this.calcRefPoint(targetRect, to, this.targetAt);
      }
    } }, { key: 'tryCalc', value: function tryCalc(

    mainAt, targetAt) {
      var result = {
        moveBy: null,
        distance: null,
        mainAt: null,
        targetAt: null };


      if (this.targetRect && mainAt && targetAt) {
        var topBottom = false;
        if (mainAt.x === targetAt.x) {
          topBottom = true;
        }

        var top = this.targetRect.top;
        var left = this.targetRect.left;

        if (this.position && this.crossLine) {
          if (topBottom) {
            left = Math.max(this.position.left, left);
            left = Math.min(this.targetRect.left + this.targetRect.width, left);
            top += this.targetRefPoint[targetAt.y];
          } else {
            top = Math.max(this.position.top, top);
            top = Math.min(this.targetRect.top + this.targetRect.height, top);
            left += this.targetRefPoint[targetAt.x];
          }
        } else {
          top += this.targetRefPoint[targetAt.y];
          left += this.targetRefPoint[targetAt.x];
        }

        var mainNewRect = {
          top: top - this.mainRefPoint[mainAt.y],
          left: left - this.mainRefPoint[mainAt.x],
          height: this.mainRect.height,
          width: this.mainRect.width };


        result.moveBy = {
          y: mainNewRect.top - this.mainRect.top,
          x: mainNewRect.left - this.mainRect.left };


        result.pos = mainNewRect;
        result.distance = this.calcDistanceToBoundary(mainNewRect);

        result.mainAt = topBottom ? mainAt.y + ' ' + mainAt.x : mainAt.x + ' ' + mainAt.y;
        result.targetAt = topBottom ? targetAt.y + ' ' + targetAt.x : targetAt.x + ' ' + targetAt.y;
      } else {
        result.moveBy = {
          y: 0,
          x: 0 };

        result.pos = this.mainRect;
        result.distance = this.calcDistanceToBoundary(this.mainRect);
      }

      return result;
    } }, { key: 'calc', value: function calc()

    {
      if (this.mainRect === null) {
        return null;
      }

      // only update the position of elements and scroll offsets, but not the width or height
      this.refreshPos(this.main, this.mainRect);
      this.targetRect && !this.position && this.refreshPos(this.target, this.targetRect);
      this.boundaryRect && this.refreshBoundaryPos(this.boundary, this.boundaryRect);

      var result = this.tryCalc(this.mainAt, this.targetAt);
      if (!result.distance || !result.distance.overflow) {
        // finish, because no collision
        return result;
      }

      // ////////////////////
      // collision handling: flip
      var _options2 = this.options,flip = _options2.flip,stick = _options2.stick;
      if (flip && flip !== FlipMode.NONE && this.targetRect) {
        var flipedPlacement = this.doFlip(flip, this.mainAt, this.targetAt, result.distance);
        if (flipedPlacement) {
          var newResult = this.tryCalc(flipedPlacement.mainAt, flipedPlacement.targetAt);
          newResult.fliped = true;

          if (!newResult.distance.overflow) {
            // finish, because found placement without collision
            return newResult;
          }

          // look for combination with fewest overflow
          var useNew = {
            y: false,
            x: false };

          useNew.y = this._overflowLT(newResult.distance, result.distance, true);
          useNew.x = this._overflowLT(newResult.distance, result.distance, false);

          if (useNew.y !== useNew.x) {
            // need new distance calculation
            result = this.tryCalc({
              y: useNew.y ? flipedPlacement.mainAt.y : this.mainAt.y,
              x: useNew.x ? flipedPlacement.mainAt.x : this.mainAt.x },
            {
              y: useNew.y ? flipedPlacement.targetAt.y : this.targetAt.y,
              x: useNew.x ? flipedPlacement.targetAt.x : this.targetAt.x });

            result.fliped = true;
            if (!result.distance.overflow) {
              // finish, because found position without collision
              return result;
            }
          } else if (useNew.y && useNew.x) {
            result = newResult;
          } // else use "old" result
        }
      }

      // ////////////////////
      // collision handling: stick
      if (stick && stick !== 'none') {
        return this.doStick(result, stick);
      }

      return result;
    } }]);return PositionCalculator;}();exports.default =


PositionCalculator;module.exports = exports['default'];