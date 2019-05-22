import capitalize from 'lodash/capitalize';
import isFunction from 'lodash/isFunction';
import isNumber from 'lodash/isNumber';
import isInteger from 'lodash/isInteger';
import { hasClass, addClass, removeClass } from 'react-base-ui/lib/utils/dom';
import moment from 'moment';

const { max, min, abs } = Math;

const getPosition = (el) => {
  const { style: { top, bottom } } = el;
  return { top: parseInt(top, 10), bottom: parseInt(bottom, 10) };
};

const getClosestQuater = minutes =>
  [0, 15, 30, 45, 60].reduce((acc, cur) => (abs(acc - minutes) > abs(cur - minutes) ? cur : acc));

export default class ResizeHelper {
  constructor(options = {}) {
    const { snapRadix, onResizeStart, onResizeEnd } = options;
    this.resizables = {};
    this.resizing = null;
    this.snapRadix = isInteger(snapRadix) && snapRadix > 0 ? snapRadix : 10;
    this.onResizeStart = onResizeStart;
    this.onResizeEnd = onResizeEnd;
    this.resizeMouseup = false;
    this.fcEventsContainer = null;
  }

  get isResizing() {
    return !!this.resizing;
  }

  get isResizeMouseup() {
    return this.resizeMouseup;
  }

  focusKept = () => {
    this.resizeMouseup = false;
  }

  snap = (value, bounce = 0) =>
    ((parseInt(value / this.snapRadix, 10) - (value % this.snapRadix === 0 ? 1 : 0)) + bounce)
    * this.snapRadix;

  push = (event) => {
    const { id } = event;
    this.resizables[id] = event;
  }

  start = (e) => {
    /* istanbul ignore else */
    if (e && e.target) {
      const t = e.target;
      if (hasClass(t, 'observe-resize')) {
        const eventId = t.getAttribute('data-resize-id');
        const border = t.getAttribute('data-resize-border');
        this._startResizing(eventId, t, 'container', border, e);
      } else if (hasClass(t, 'fc-content') && t.parentElement && hasClass(t.parentElement, 'observe-resize')) {
        const eventId = t.parentElement.getAttribute('data-resize-id');
        const border = t.parentElement.getAttribute('data-resize-border');
        this._startResizing(eventId, t.parentElement, 'content', border, e);
      }
    }
  }

  stop = () => {
    const { event, container, content, target, border } = this.resizing;

    const resize = {
      border,
      element: container.el,
      setupMinutes: false,
      cleanupMinutes: false
    };

    const movementDelta = getPosition(container.el)[border] - container.startPosition[border];
    const delta = moment.duration(movementDelta * 1.5, 'minutes');
    let roundDelta = moment.duration(0);

    /* istanbul ignore else */
    if (event.end && event.start) {
      const originalEnd = event.end.clone();
      const originalStart = event.start.clone();

      if (target === 'container') {
        if (border === 'top') {
          resize.setupMinutes = content.startPosition.top !== 0;
          const newStart = event.start.clone().add(delta);
          event.start = newStart.minutes(getClosestQuater(newStart.minutes())).seconds(0);
          roundDelta = moment.duration(event.start.diff(originalStart));
        } else if (border === 'bottom') {
          resize.cleanupMinutes = content.startPosition.bottom !== 0;
          const newEnd = event.end.clone().subtract(delta);
          event.end = newEnd.minutes(getClosestQuater(newEnd.minutes())).seconds(0);
          roundDelta = moment.duration(-event.end.diff(originalEnd));
        }
      } else if (target === 'content') {
        if (border === 'top') {
          const newStart = event.start.clone().add(delta).add(event.setupMinutes, 'minutes');
          event.start = newStart.minutes(getClosestQuater(newStart.minutes())).subtract(event.setupMinutes, 'minutes').seconds(0);
          roundDelta = moment.duration(event.start.diff(originalStart));
        } else if (border === 'bottom') {
          const newEnd = event.end.clone().subtract(delta).subtract(event.cleanupMinutes, 'minutes');
          event.end = newEnd.minutes(getClosestQuater(newEnd.minutes())).add(event.cleanupMinutes, 'minutes').seconds(0);
          roundDelta = moment.duration(-event.end.diff(originalEnd));
        }
      }
    }

    this.clearResize();
    /* istanbul ignore else */
    if (isFunction(this.onResizeEnd)) {
      this.onResizeEnd(event, roundDelta, resize);
    }
  }

  observe = (e) => {
    /* istanbul ignore else */
    if (e && e.target) {
      const t = e.target;
      if (hasClass(t, 'aui-resizable')) {
        const { top, bottom } = t.getBoundingClientRect();
        if (e.clientY - top <= 2) {
          addClass(t, 'observe-resize');
          t.setAttribute('data-resize-border', 'top');
        } else if (bottom - e.clientY <= 2) {
          addClass(t, 'observe-resize');
          t.setAttribute('data-resize-border', 'bottom');
        }
      } else if (hasClass(t, 'fc-content') && t.parentElement && hasClass(t.parentElement, 'aui-resizable')) {
        const p = t.parentElement;
        const { top, bottom } = t.getBoundingClientRect();

        if (e.clientY - top <= 3) {
          addClass(p, 'observe-resize');
          p.setAttribute('data-resize-border', 'top');
        } else if (bottom - e.clientY <= 3) {
          addClass(p, 'observe-resize');
          p.setAttribute('data-resize-border', 'bottom');
        } else {
          removeClass(p, 'observe-resize');
          p.removeAttribute('data-resize-border');
        }
      } else {
        const observing = document.getElementsByClassName('observe-resize');
        if (observing.length) {
          Array.prototype.forEach.call(observing, (el) => {
            removeClass(el, 'observe-resize');
            el.removeAttribute('data-resize-border');
          });
        }
      }
    }
  }

  resize = (e) => {
    /* istanbul ignore else */
    if (e && isNumber(e.clientY)) {
      const { target, border, mouse, content, container, boundary } = this.resizing;
      const mouseClientYDelta = border === 'top'
                                  ? e.clientY - mouse.last.clientY
                                  : mouse.last.clientY - e.clientY;

      const containerPosition = getPosition(container.el);
      const contentPosition = getPosition(content.el);
      const limits = boundary[border];
      const currentPosition = containerPosition[border];
      const newContainerPosition =
        parseInt(max(limits.min, min(limits.max, currentPosition + mouseClientYDelta)), 10);
      const positionDelta = newContainerPosition - currentPosition;
      const newContentAbsolutePosition = newContainerPosition + contentPosition[border] + 1;

      /* istanbul ignore else */
      if (
        (target === 'container' && (newContainerPosition % this.snapRadix === 0)) ||
        (target === 'content' && (newContentAbsolutePosition % this.snapRadix === 0))
      ) {
        /* istanbul ignore else */
        if (positionDelta !== 0) {
          container.el.style[border] = `${newContainerPosition}px`;
          container.el.style.zIndex = 3;
          mouse.last.clientY = e.clientY;
          /* istanbul ignore else */
          if (target === 'container' && content.startPosition[border] !== 0) {
            const newContentPosition =
            this.snap(max(0, contentPosition[border] - positionDelta), 1) - 1;
            content.el.style[border] = `${newContentPosition}px`;
            content.el.style[`border${capitalize(border)}Width`] = `${newContentPosition === 0 ? 0 : 1}px`;
          }
        }
      }
    }
  }

  clearResize = () => {
    const { container } = this.resizing;
    this.resizing = null;
    this.resizeMouseup = true;
    removeClass(container.el, 'is-resizing');
    removeClass(document.body, 'is-resizing');
  }

  _startResizing = (eventId, element, mousedownTarget, border, { clientY }) => {
    const contentElement = element.getElementsByClassName('fc-content')[0];
    const contentPosition = getPosition(contentElement);

    let target = mousedownTarget;
    if (mousedownTarget === 'content') {
      /* istanbul ignore else */
      if ((border === 'top' && contentPosition.top === 0) || (border === 'bottom' && contentPosition.bottom === 0)) {
        target = 'container';
      }
    }
    const event = this.resizables[eventId];
    this.resizing = {
      container: {
        el: element,
        startPosition: getPosition(element)
      },
      content: {
        el: contentElement,
        startPosition: contentPosition
      },
      boundary: this._calculateResizeBoundary(element, contentElement, target),
      mouse: {
        last: { clientY }
      },
      target,
      border,
      event
    };

    addClass(element, 'is-resizing');
    addClass(document.body, 'is-resizing');
    /* istanbul ignore else */
    if (isFunction(this.onResizeStart)) {
      this.onResizeStart(event, border);
    }
  }

  _calculateResizeBoundary = (container, content, target) => {
    const containerPosition = getPosition(container);
    const contentPosition = getPosition(content);

    const top = { max: 960, min: 0 };
    const bottom = { max: 0, min: -960 };

    if (target === 'container') {
      if (contentPosition.top === 0) {
        const borderWidth = contentPosition.bottom === 0 ? 0 : 1;
        top.max = this.snap(-containerPosition.bottom - contentPosition.bottom - borderWidth);
      } else {
        top.max = containerPosition.top
                    + contentPosition.top
                    + 1; // 1 is content top border width
      }

      if (contentPosition.bottom === 0) {
        const borderWidth = contentPosition.top === 0 ? 0 : 1;
        bottom.max = -this.snap(containerPosition.top + contentPosition.top + borderWidth, 2);
      } else {
        bottom.max = containerPosition.bottom
                      + contentPosition.bottom
                      + 1; // 1 is content bottom border width
      }
    } else if (target === 'content') {
      top.min = -contentPosition.top - 1; // 1 is content top border width
      bottom.min = -960 - contentPosition.bottom - 1; // 1 is content bottom border width

      top.max = contentPosition.bottom <= 0
        ? this.snap(-containerPosition.bottom) - contentPosition.top - 1
        : this.snap(-containerPosition.bottom - contentPosition.bottom - 1)
            - contentPosition.top - 1;

      bottom.max = contentPosition.top <= 0
        ? -this.snap(containerPosition.top, 2) - contentPosition.bottom - 1
        : -this.snap(containerPosition.top + contentPosition.top + 1, 2)
            - contentPosition.bottom - 1;
    }

    return { top, bottom };
  }
}
