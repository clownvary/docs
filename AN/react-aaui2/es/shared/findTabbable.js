/* istanbul ignore next */
var hiddenElement = function hiddenElement(el) {
  return el.offsetWidth <= 0 && el.offsetHeight <= 0 || el.style.display === 'none';
};

var checkVisible = function checkVisible(el) {
  var ourElement = el;
  /* istanbul ignore next */
  while (ourElement) {
    if (ourElement === document.body) break;
    if (hiddenElement(ourElement)) return false;
    ourElement = ourElement.parentNode;
  }
  /* istanbul ignore next */
  return true;
};

var focusable = function focusable(el, tabIndexIsValid) {
  var nodeName = el.nodeName.toLowerCase();
  var isFocusableLink = nodeName === 'a' ? el.href || tabIndexIsValid : tabIndexIsValid;
  return (/input|select|textarea|button|object/.test(nodeName) ? !el.disabled : isFocusableLink) && checkVisible(el);
};

var tabbable = function tabbable(el) {
  var tabIndex = el.getAttribute('tabindex');
  if (tabIndex === null) tabIndex = undefined;
  var tabIsNil = tabIndex === undefined || tabIndex === null;
  return (tabIsNil || tabIndex >= 0) && focusable(el, !tabIsNil);
};

var findTabbable = function findTabbable(element) {
  return element ? Array.prototype.slice.call(element.querySelectorAll('*')).filter(function (el) {
    return tabbable(el);
  }) : [];
};

export default findTabbable;