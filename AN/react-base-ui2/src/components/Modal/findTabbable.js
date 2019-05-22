/* istanbul ignore next */
const isHidden = el =>
  (el.offsetWidth <= 0 && el.offsetHeight <= 0) || el.style.display === 'none';

const checkVisible = (el, scope) => {
  let ourElement = el;
  /* istanbul ignore next */
  while (ourElement) {
    if (ourElement === scope) break;
    if (isHidden(ourElement)) return false;
    ourElement = ourElement.parentNode;
  }
  /* istanbul ignore next */
  return true;
};

const focusable = (el, tabIndexIsValid, scope) => {
  const nodeName = el.nodeName.toLowerCase();
  const isFocusableLink =
    nodeName === 'a' ? el.href || tabIndexIsValid : tabIndexIsValid;
  return (
    (/input|select|textarea|button|object/.test(nodeName)
      ? !el.disabled
      : isFocusableLink) && checkVisible(el, scope)
  );
};

const tabbable = (el, scope = document.body) => {
  let tabIndex = el.getAttribute('tabindex');
  if (tabIndex === null) tabIndex = undefined;
  const tabIsNil = tabIndex === undefined || tabIndex === null;
  return (tabIsNil || tabIndex >= 0) && focusable(el, !tabIsNil, scope);
};

const findTabbable = element => (element ? Array.prototype.slice.call(element.querySelectorAll('*')).filter(el => tabbable(el, element))
    : []);

export default findTabbable;
