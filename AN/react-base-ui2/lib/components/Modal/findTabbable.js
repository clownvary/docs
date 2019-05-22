'use strict';Object.defineProperty(exports, "__esModule", { value: true }); /* istanbul ignore next */
var isHidden = function isHidden(el) {return (
    el.offsetWidth <= 0 && el.offsetHeight <= 0 || el.style.display === 'none');};

var checkVisible = function checkVisible(el, scope) {
  var ourElement = el;
  /* istanbul ignore next */
  while (ourElement) {
    if (ourElement === scope) break;
    if (isHidden(ourElement)) return false;
    ourElement = ourElement.parentNode;
  }
  /* istanbul ignore next */
  return true;
};

var focusable = function focusable(el, tabIndexIsValid, scope) {
  var nodeName = el.nodeName.toLowerCase();
  var isFocusableLink =
  nodeName === 'a' ? el.href || tabIndexIsValid : tabIndexIsValid;
  return (
    (/input|select|textarea|button|object/.test(nodeName) ?
    !el.disabled :
    isFocusableLink) && checkVisible(el, scope));

};

var tabbable = function tabbable(el) {var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;
  var tabIndex = el.getAttribute('tabindex');
  if (tabIndex === null) tabIndex = undefined;
  var tabIsNil = tabIndex === undefined || tabIndex === null;
  return (tabIsNil || tabIndex >= 0) && focusable(el, !tabIsNil, scope);
};

var findTabbable = function findTabbable(element) {return element ? Array.prototype.slice.call(element.querySelectorAll('*')).filter(function (el) {return tabbable(el, element);}) :
  [];};exports.default =

findTabbable;module.exports = exports['default'];