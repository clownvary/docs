'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.detachResizeEvent = exports.attachResizeEvent = undefined;var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _EventEmitter = require('../../common/EventEmitter');var _EventEmitter2 = _interopRequireDefault(_EventEmitter);
var _requestAnimationFrame = require('../../utils/requestAnimationFrame');var _requestAnimationFrame2 = _interopRequireDefault(_requestAnimationFrame);
var _addEvent = require('../../utils/addEvent');var _addEvent2 = _interopRequireDefault(_addEvent);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                  *
                                                                                                                                                                                                  * @param {HTMLElement} element
                                                                                                                                                                                                  * @param {Function}    onResized
                                                                                                                                                                                                  */
var attachResizeEvent = exports.attachResizeEvent = function attachResizeEvent(element, onResized) {for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {args[_key - 2] = arguments[_key];}var _element$resizeEmitte;
  if (!element) return;

  element.resizeEmitter = element.resizeEmitter || new _EventEmitter2.default();
  (_element$resizeEmitte = element.resizeEmitter).on.apply(_element$resizeEmitte, ['resize', onResized].concat(args));

  if (element.resizeSensor) return;

  element.resizeSensor = document.createElement('div');
  element.resizeSensor.className = 'resize-sensor';
  var style = 'position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;';
  var styleChild = 'position: absolute; left: 0; top: 0; transition: 0s;';

  element.resizeSensor.style.cssText = style;
  element.resizeSensor.innerHTML =
  '<div class="resize-sensor-expand" style="' + style + '">' + ('<div style="' +
  styleChild + '"></div>') +
  '</div>' + ('<div class="resize-sensor-shrink" style="' +
  style + '">') + ('<div style="' +
  styleChild + ' width: 200%; height: 200%"></div>') +
  '</div>';
  element.appendChild(element.resizeSensor);

  /* istanbul ignore else */
  if (element.resizeSensor.offsetParent !== element) {
    element.style.position = 'relative';
  }

  var expand = element.resizeSensor.childNodes[0];
  var expandChild = expand.childNodes[0];
  var shrink = element.resizeSensor.childNodes[1];
  var dirty = void 0;
  var rafId = void 0;
  var newWidth = void 0;
  var newHeight = void 0;
  var lastWidth = element.clientWidth;
  var lastHeight = element.clientHeight;

  var reset = function reset() {
    expandChild.style.width = '100000px';
    expandChild.style.height = '100000px';

    expand.scrollLeft = 100000;
    expand.scrollTop = 100000;

    shrink.scrollLeft = 100000;
    shrink.scrollTop = 100000;
  };

  reset();

  var handleResize = function handleResize() {
    rafId = 0;

    /* istanbul ignore if */
    if (!dirty) return;

    lastWidth = newWidth;
    lastHeight = newHeight;

    if (element.resizeEmitter) {var _element$resizeEmitte2;
      var e = { width: newWidth, height: newHeight };
      (_element$resizeEmitte2 = element.resizeEmitter).emit.apply(_element$resizeEmitte2, ['resize', e].concat(args));
    }
  };

  var handleScroll = function handleScroll() {
    newWidth = element.clientWidth;
    newHeight = element.clientHeight;
    dirty = newWidth !== lastWidth || newHeight !== lastHeight;

    if (dirty && !rafId) {
      rafId = (0, _requestAnimationFrame2.default)(handleResize);
    }

    reset();
  };

  (0, _addEvent2.default)(expand, 'scroll', handleScroll);
  (0, _addEvent2.default)(shrink, 'scroll', handleScroll);
};

var detachResizeEvent = exports.detachResizeEvent = function detachResizeEvent(element, onResize) {for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {args[_key2 - 2] = arguments[_key2];}
  if (!element) return;

  if (element.resizeEmitter) {
    if ((0, _isFunction2.default)(onResize)) {var _element$resizeEmitte3;
      (_element$resizeEmitte3 = element.resizeEmitter).off.apply(_element$resizeEmitte3, ['resize', onResize].concat(args));
    } else {
      element.resizeEmitter.removeAllListeners();
    }
    if (!element.resizeEmitter.listeners('resize', true)) return;
  }

  if (element.resizeSensor) {
    if (element.contains(element.resizeSensor)) {
      element.removeChild(element.resizeSensor);
    }
    delete element.resizeSensor;
    delete element.resizeEmitter;
  }
};