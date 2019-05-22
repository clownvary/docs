const nodeClass = 'input-group giftcard-combobox';

function handleFocus() {
  window.scrollBy(0, 2);
  window.scrollBy(0, -2);
}

export function fixScroll() {
  let input;
  try {
    input = document.getElementsByClassName(nodeClass)[0].getElementsByTagName('input')[0];
    if (input) {
      input.removeEventListener('focus', handleFocus, false);
      input.addEventListener('focus', handleFocus, false);
    }
  } catch (error) {
    /* istanbul ignore next */
    input = null;
  }
}
