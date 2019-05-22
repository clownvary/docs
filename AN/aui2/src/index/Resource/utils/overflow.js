export function enableScroll(el, enable) {
  const hideScrollClassName = 'hide-scroll';
  if (el) {
    if (enable) {
      if (el.classList.contains(hideScrollClassName)) {
        el.classList.remove(hideScrollClassName);
      }
    } else if (!el.classList.contains(hideScrollClassName)) {
      el.classList.add(hideScrollClassName);
    }
  }
}
