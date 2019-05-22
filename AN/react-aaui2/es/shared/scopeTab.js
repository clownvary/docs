import findTabbable from './findTabbable';

export default (function (node) {
  var tabbable = findTabbable(node);
  return function (event) {
    // jsdom can not calculate offsetWidth, so in test environment tabbable.length is always 0
    /* istanbul ignore else */
    if (!tabbable.length) {
      event.preventDefault();
    } else {
      var finalTabbable = tabbable[event.shiftKey ? 0 : tabbable.length - 1];
      var leavingFinalTabbable = finalTabbable === document.activeElement ||
      // handle immediate shift+tab after opening with mouse
      node === document.activeElement;
      if (!leavingFinalTabbable) return;

      event.preventDefault();
      var target = tabbable[event.shiftKey ? tabbable.length - 1 : 0];
      target.focus();
    }
  };
});