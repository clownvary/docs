'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.



addClass = addClass;exports.













removeClass = removeClass;exports.













hasClass = hasClass;exports.







isWindow = isWindow;exports.





































outerWidth = outerWidth;exports.



outerHeight = outerHeight;exports.



scrollLeft = scrollLeft;exports.



scrollTop = scrollTop;exports.



offset = offset;exports.
























calcScrollWidth = calcScrollWidth;exports.














isPointInDOM = isPointInDOM;exports.










findAncestor = findAncestor;var _isNil = require('lodash/isNil');var _isNil2 = _interopRequireDefault(_isNil);var _isArrayLike = require('lodash/isArrayLike');var _isArrayLike2 = _interopRequireDefault(_isArrayLike);var _forEach = require('lodash/forEach');var _forEach2 = _interopRequireDefault(_forEach);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function addClass(elem, className) {if (!className) return;var els = (0, _isArrayLike2.default)(elem) ? elem : [elem];(0, _forEach2.default)(els, function (el) {if (el.classList) {el.classList.add(className.split(' '));} else {el.className += ' ' + className;}});}function removeClass(elem, className) {if (!className) return;var els = (0, _isArrayLike2.default)(elem) ? elem : [elem];(0, _forEach2.default)(els, function (el) {if (el.classList) {el.classList.remove(className.split(' '));} else {el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');}});}function hasClass(elem, className) {if (elem.classList) {return elem.classList.contains(className);}return elem.className.indexOf(className) >= 0;}function isWindow(obj) {return obj != null && obj === obj.window;}var getSize = function getSize(elem, name) {if (isWindow(elem)) {// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
    return elem.document.documentElement['client' + name];} // Get document width or height
  if (elem.nodeType === 9) {var doc = elem.documentElement; // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
    // whichever is greatest
    return Math.max(elem.body['scroll' + name], doc['scroll' + name], elem.body['offset' + name], doc['offset' + name], doc['client' + name]);}return elem['offset' + name];};var getScrollOffset = function getScrollOffset(elem, name) {var props = { scrollLeft: 'pageXOffset', scrollTop: 'pageYOffset' };var win = void 0;if (isWindow(elem)) {win = elem;} else if (elem.nodeType === 9) {win = elem.defaultView;}return win ? win[props[name]] : elem[name];};function outerWidth(elem) {return getSize(elem, 'Width');}function outerHeight(elem) {return getSize(elem, 'Height');}function scrollLeft(elem) {return getScrollOffset(elem, 'scrollLeft');}function scrollTop(elem) {return getScrollOffset(elem, 'scrollTop');}function offset(elem) {if (!elem) {return null;} // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
  // Support: IE <=11 only
  // Running getBoundingClientRect on a
  // disconnected node in IE throws an error
  if (!elem.getClientRects().length) {return { top: 0, left: 0 };}var rect = elem.getBoundingClientRect();var doc = elem.ownerDocument;var docElem = doc.documentElement;var win = doc.defaultView;return { top: rect.top + win.pageYOffset - docElem.clientTop, left: rect.left + win.pageXOffset - docElem.clientLeft };}function calcScrollWidth() {// Create the measurement node
  var scrollDiv = document.createElement('div');scrollDiv.className = 'scrollbar-measure';document.body.appendChild(scrollDiv); // Get the scrollbar width
  var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth; // Delete the DIV
  document.body.removeChild(scrollDiv);return scrollbarWidth;}function isPointInDOM(clientX, clientY, dom) {if (dom && !(0, _isNil2.default)(clientX) && !(0, _isNil2.default)(clientY)) {var rect = dom.getBoundingClientRect();var top = rect.top,bottom = rect.bottom,left = rect.left,right = rect.right;return clientX > left && clientX < right && clientY > top && clientY < bottom;}return false;}function findAncestor(elem, cls) {while (elem && !hasClass(elem, cls)) {elem = elem.parentElement;}return elem;}