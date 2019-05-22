/* istanbul ignore next */
const hiddenElement = el =>
  (el.offsetWidth <= 0 && el.offsetHeight <= 0) || el.style.display === 'none'

const checkVisible = el => {
  let ourElement = el
  /* istanbul ignore next */
  while (ourElement) {
    if (ourElement === document.body) break
    if (hiddenElement(ourElement)) return false
    ourElement = ourElement.parentNode
  }
  /* istanbul ignore next */
  return true
}

const focusable = (el, tabIndexIsValid) => {
  const nodeName = el.nodeName.toLowerCase()
  const isFocusableLink =
    nodeName === 'a' ? el.href || tabIndexIsValid : tabIndexIsValid
  return (
    (/input|select|textarea|button|object/.test(nodeName)
      ? !el.disabled
      : isFocusableLink) && checkVisible(el)
  )
}

const tabbable = el => {
  let tabIndex = el.getAttribute('tabindex')
  if (tabIndex === null) tabIndex = undefined
  const tabIsNil = tabIndex === undefined || tabIndex === null
  return (tabIsNil || tabIndex >= 0) && focusable(el, !tabIsNil)
}

const findTabbable = element =>
  element
    ? Array.prototype.slice
        .call(element.querySelectorAll('*'))
        .filter(el => tabbable(el))
    : []

export default findTabbable
