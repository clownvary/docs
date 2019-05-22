import isString from 'lodash/isString';
import isElement from 'lodash/isElement';
import isFunction from 'lodash/isFunction';
import throttle from 'lodash/throttle';

import { offset, addClass, removeClass, hasClass } from '../../../utils/dom';

const defaultOptions = {
  elements: '',
  selectableClass: '',
  deSelectableClasses: [],
  selectedClass: '',
  key: false,
  enabled: true,
  scrollEnabled: false,
  scrollContainer: null,
  scrollSensitiveDistance: 50,
  scrollVertical: 50,
  scrollHorizontal: 50,
  scrollThrottleTime: 100,
  onStart: null,
  onEnd: null,
  onSelect: null,
  onDeselect: null
};

const numberSorter = (a, b) => a - b;

class Selectable {
  static tag = '__an_selectable';

  constructor(el, options) {
    this.element = isString(el) ? document.querySelector(el) : el;

    if (!this.element || !isElement(this.element)) {
      throw new Error('Invalid target element');
    }

    this.options = { ...defaultOptions, ...options };
    this.on = false;

    this.start = this.start.bind(this);
    this.drawRect = this.drawRect.bind(this);
    this.end = this.end.bind(this);
    this.isScrollEnabled = this.isScrollEnabled.bind(this);
    this.cleanSelectingEventListeners = this.cleanSelectingEventListeners.bind(this);

    this.options.enabled && this.enable();

    this.scroll = throttle(this.scroll, this.options.scrollThrottleTime).bind(this);
  }

  getRectBox = () => {
    if (!this.rectBox) {
      this.rectBox = document.getElementById('an-selection-box');
    }

    if (!this.rectBox) {
      const rb = document.createElement('div');
      rb.id = 'an-selection-box';

      if (this.isScrollEnabled()) {
        const { scrollContainer: container } = this.options;
        /* istanbul ignore next */
        container.firstChild ?
          container.insertBefore(rb, container.firstChild) :
          container.appendChild(rb);
      } else {
        document.body.appendChild(rb);
      }

      this.rectBox = rb;
    }

    return this.rectBox;
  };

  cleanRectBox() {
    if (this.rectBox && this.rectBox.parentNode) {
      this.rectBox.parentNode.removeChild(this.rectBox);
    }
    this.rectBox = null;
  }

  start = (e) => {
    const { selectableClass, deSelectableClasses, key, scrollContainer: container,
      onStart } = this.options;

    // Fix: The drag and drop should only happend in the blank space rather than on the events
    if (deSelectableClasses.length > 0) {
      let target = e.target;
      const isDragInTheDeSelectableElements = ele => deSelectableClasses.some(
        cls => hasClass(ele, cls));

      while (target && this.element.contains(target)) {
        if (isDragInTheDeSelectableElements(target)) {
          return false;
        }

        target = target.parentNode;
      }
    }

    if (selectableClass) {
      let target = e.target;
      while (target && !hasClass(target, selectableClass)) {
        target = target.parentNode;
      }
      if (!target) {
        return false;
      }
    }

    isFunction(onStart) && onStart(e);
    if (key && !e[key]) {
      return false;
    }

    this.ipos = [e.pageX, e.pageY];

    if (this.isScrollEnabled()) {
      this.scrollPos = [container.scrollLeft, container.scrollTop];
    }

    addClass(document.body, 'an-noselect');
    this.items.forEach((el) => {
      el.addEventListener('click', this.suspend, true);
    });

    this.cleanSelectingEventListeners();

    if (this.isScrollEnabled()) {
      document.addEventListener('mousemove', this.scroll);
      document.addEventListener('mousemove', this.drawRectRelative);
    } else {
      document.addEventListener('mousemove', this.drawRect);
    }
    window.addEventListener('mouseup', this.end, true);
    return true;
  };

  drawRect = (e) => {
    if (!this.ipos) return;

    const g = this.getRectBox();
    if (!g) return;

    let tmp;
    let x1 = this.ipos[0];
    let y1 = this.ipos[1];
    let x2 = e.pageX;
    let y2 = e.pageY;
    if (x1 > x2) {
      tmp = x2;
      x2 = x1;
      x1 = tmp;
    }
    if (y1 > y2) {
      tmp = y2;
      y2 = y1;
      y1 = tmp;
    }
    g.style.left = `${x1 + 1}px`;
    g.style.top = `${y1 + 1}px`;
    g.style.width = `${x2 - x1 - 1}px`;
    g.style.height = `${y2 - y1 - 1}px`;
  }

  drawRectRelative = (e) => {
    if (!this.ipos) return;

    const g = this.getRectBox();
    if (!g) return;

    const { scrollContainer: container } = this.options;
    const containerRect = container.getBoundingClientRect();

    // base on the scroll position to compare the mouse position
    let x1 = this.ipos[0] + this.scrollPos[0];
    let y1 = this.ipos[1] + this.scrollPos[1];
    let x2 = e.pageX + container.scrollLeft;
    let y2 = e.pageY + container.scrollTop;

    [x1, x2] = [x1, x2].sort(numberSorter);
    [y1, y2] = [y1, y2].sort(numberSorter);

    let left = x1 - containerRect.left;
    // not out of bounds
    left = Math.max(left, 0);
    // not out of bounds when scrolling
    if (container.scrollLeft < this.scrollPos[0] && left < container.scrollLeft) {
      left = container.scrollLeft;
    }

    let top = y1 - containerRect.top;
    top = Math.max(top, 0);
    if (container.scrollTop < this.scrollPos[1] && top < container.scrollTop) {
      top = container.scrollTop;
    }

    let width = x2 - x1;
    width = Math.min(width, container.scrollWidth - left);
    if (container.scrollLeft > this.scrollPos[0] &&
      container.scrollLeft + container.clientWidth < left + width) {
      width = (container.scrollLeft + container.clientWidth) - left;
    }
    if (left === 0) {
      width = (this.ipos[0] - containerRect.left) + this.scrollPos[0];
    }

    let height = y2 - y1;
    height = Math.min(height, container.scrollHeight - top);
    if (container.scrollTop > this.scrollPos[1] &&
      container.scrollTop + container.clientHeight < top + height) {
      height = (container.scrollTop + container.clientHeight) - top;
    }
    if (top === 0) {
      height = (this.ipos[1] - containerRect.top) + this.scrollPos[1];
    }

    // +/- 1px to resolve mouseup event target issue
    g.style.left = `${left + 1}px`;
    g.style.top = `${top + 1}px`;
    g.style.width = `${width - 1}px`;
    g.style.height = `${height - 1}px`;
  }

  isCross = (a, b) => {
    const { left: aLeft, top: aTop } = offset(a);
    const { left: bLeft, top: bTop } = offset(b);

    return !(((aTop + a.offsetHeight) < (bTop)) ||
    (aTop > (bTop + b.offsetHeight)) ||
    ((aLeft + a.offsetWidth) < bLeft) ||
    (aLeft > (bLeft + b.offsetWidth)));
  };

  scroll = (e) => {
    const { pageX, pageY } = e;

    const { scrollContainer: container, scrollSensitiveDistance,
      scrollVertical, scrollHorizontal } = this.options;
    // check meet the boundary
    const rect = container.getBoundingClientRect();

    const meetTopBoundary = pageY <= rect.top + scrollSensitiveDistance;
    const meetRightBoundary = pageX >= rect.right - scrollSensitiveDistance;
    const meetBottomBoundary = pageY >= rect.bottom - scrollSensitiveDistance;
    const meetLeftBoundary = pageX <= rect.left + scrollSensitiveDistance;

    if (meetTopBoundary || meetBottomBoundary) {
      container.scrollTop += meetTopBoundary ? (-1 * scrollVertical) : scrollVertical;
    }
    if (meetLeftBoundary || meetRightBoundary) {
      container.scrollLeft += meetLeftBoundary ? (-1 * scrollHorizontal) : scrollHorizontal;
    }

    // make sure draw rect called after last throttled scroll
    this.drawRectRelative(e);
  };

  end = (e) => {
    removeClass(document.body, 'an-noselect');

    // make sure the event listeners be removed firstly
    this.cleanSelectingEventListeners();

    if (!this.ipos) return;

    const ipos = this.ipos;
    delete (this.ipos);
    delete (this.scrollPos);

    if (ipos[0] === e.pageX && ipos[1] === e.pageY) {
      this.cleanRectBox();
      return;
    }

    const g = this.getRectBox();
    if (!g) return;

    const s = this.options.selectedClass;
    if (s && this.items) {
      this.items.forEach((el) => {
        if (this.isCross(g, el)) {
          if (hasClass(el, s)) {
            removeClass(el, s);
            this.options.onDeselect && this.options.onDeselect(el);
          } else {
            addClass(el, s);
            this.options.onSelect && this.options.onSelect(el);
          }
        }
        setTimeout(() => {
          el.removeEventListener('click', this.suspend, true);
        }, 100);
      });
    }

    this.cleanRectBox();
    this.options.onEnd && this.options.onEnd(e);
  }

  enable = () => {
    if (this.on) {
      throw new Error('Already enabled');
    }

    const { elements } = this.options;
    this.items = elements ? this.element.querySelectorAll(elements) : [];

    this.disable();
    this.element.addEventListener('mousedown', this.start);
    this.on = true;
  }

  disable = () => {
    this.element.removeEventListener('mousedown', this.start);
    this.on = false;
  };

  suspend = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  isScrollEnabled = () => {
    const { scrollEnabled, scrollContainer: container } = this.options;
    return scrollEnabled && container;
  }

  cleanSelectingEventListeners = () => {
    document.removeEventListener('mousemove', this.drawRect);
    document.removeEventListener('mousemove', this.scroll);
    document.removeEventListener('mousemove', this.drawRectRelative);
    window.removeEventListener('mouseup', this.end);
  }

}

export default Selectable;
