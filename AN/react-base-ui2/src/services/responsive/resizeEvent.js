import isFunction from 'lodash/isFunction';
import EventEmitter from '../../common/EventEmitter';
import requestAnimationFrame from '../../utils/requestAnimationFrame';
import addEvent from '../../utils/addEvent';

/**
 *
 * @param {HTMLElement} element
 * @param {Function}    onResized
 */
export const attachResizeEvent = (element, onResized, ...args) => {
  if (!element) return;

  element.resizeEmitter = element.resizeEmitter || new EventEmitter();
  element.resizeEmitter.on('resize', onResized, ...args);

  if (element.resizeSensor) return;

  element.resizeSensor = document.createElement('div');
  element.resizeSensor.className = 'resize-sensor';
  const style = 'position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;';
  const styleChild = 'position: absolute; left: 0; top: 0; transition: 0s;';

  element.resizeSensor.style.cssText = style;
  element.resizeSensor.innerHTML =
        `<div class="resize-sensor-expand" style="${style}">` +
            `<div style="${styleChild}"></div>` +
        '</div>' +
        `<div class="resize-sensor-shrink" style="${style}">` +
            `<div style="${styleChild} width: 200%; height: 200%"></div>` +
        '</div>';
  element.appendChild(element.resizeSensor);

  /* istanbul ignore else */
  if (element.resizeSensor.offsetParent !== element) {
    element.style.position = 'relative';
  }

  const expand = element.resizeSensor.childNodes[0];
  const expandChild = expand.childNodes[0];
  const shrink = element.resizeSensor.childNodes[1];
  let dirty;
  let rafId;
  let newWidth;
  let newHeight;
  let lastWidth = element.clientWidth;
  let lastHeight = element.clientHeight;

  const reset = () => {
    expandChild.style.width = '100000px';
    expandChild.style.height = '100000px';

    expand.scrollLeft = 100000;
    expand.scrollTop = 100000;

    shrink.scrollLeft = 100000;
    shrink.scrollTop = 100000;
  };

  reset();

  const handleResize = () => {
    rafId = 0;

    /* istanbul ignore if */
    if (!dirty) return;

    lastWidth = newWidth;
    lastHeight = newHeight;

    if (element.resizeEmitter) {
      const e = { width: newWidth, height: newHeight };
      element.resizeEmitter.emit('resize', e, ...args);
    }
  };

  const handleScroll = () => {
    newWidth = element.clientWidth;
    newHeight = element.clientHeight;
    dirty = newWidth !== lastWidth || newHeight !== lastHeight;

    if (dirty && !rafId) {
      rafId = requestAnimationFrame(handleResize);
    }

    reset();
  };

  addEvent(expand, 'scroll', handleScroll);
  addEvent(shrink, 'scroll', handleScroll);
};

export const detachResizeEvent = (element, onResize, ...args) => {
  if (!element) return;

  if (element.resizeEmitter) {
    if (isFunction(onResize)) {
      element.resizeEmitter.off('resize', onResize, ...args);
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
