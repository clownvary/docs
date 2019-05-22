
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import isElement from 'lodash/isElement';
import { addClass, removeClass, hasClass } from '../../../utils/dom';
import { Trigger } from '../../../consts';

const defaultOptions = {
  trigger: Trigger.FOCUS
};

class Clearable {
  static tag = '__an_clearable';

  constructor(el, options) {
    this.element = isString(el) ? document.querySelector(el) : el;

    if (!this.element || !isElement(this.element)) {
      throw new Error('Invalid target element');
    }

    this.options = { ...defaultOptions, ...options };
    this.on = false;

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onClick = this.onClick.bind(this);

    if (this.options.enabled) {
      this.enable();
    }
  }

  /* istanbul ignore next */
  onMouseEnter() {
    this.show();
  }

  /* istanbul ignore next */
  onMouseLeave() {
    if (this.hasTrigger(Trigger.FOCUS)) {
      if (document.activeElement === this.element) {
        return;
      }
    }
    this.hide();
  }

  onFocus() {
    this.show();
  }

  onBlur() {
    this.hide();
  }

  onMouseMove(e) {
    const { paddingRight = 0 } = this.options;
    const xWidth = 20;
    const pos = paddingRight + xWidth;

    const onX = this.element.offsetWidth - pos <
      (e.clientX - this.element.getBoundingClientRect().left);

    if (onX) {
      addClass(this.element, 'onX');
    } else {
      removeClass(this.element, 'onX');
    }
  }

  onClick(e) {
    if (hasClass(this.element, 'onX')) {
      const { onClear } = this.options;

      if (isFunction(onClear)) {
        onClear();
      }

      e.stopPropagation();
      e.preventDefault();
    }
  }

  hasTrigger(t) {
    /* istanbul ignore next */
    const { trigger = Trigger.FOCUS } = this.options;
    const triggers = trigger.split('|');
    return triggers.some(v => v.trim() === t);
  }

  enable() {
    if (this.on) {
      throw new Error('Already enabled');
    }

    this.disable();

    if (this.hasTrigger(Trigger.FOCUS)) {
      this.element.addEventListener('focus', this.onFocus);
      this.element.addEventListener('blur', this.onBlur);
    }

    if (this.hasTrigger(Trigger.HOVER)) {
      this.element.addEventListener('mouseenter', this.onFocus);
      this.element.addEventListener('mouseleave', this.onBlur);
    }

    this.element.addEventListener('mousemove', this.onMouseMove);
    this.element.addEventListener('click', this.onClick);

    addClass(this.element, 'an-clearable');
    if (this.options.noEffect) {
      addClass(this.element, 'no-effect');
    }
    this.on = true;
  }

  disable() {
    removeClass(this.element, 'an-clearable');
    if (this.options.noEffect) {
      removeClass(this.element, 'no-effect');
    }

    this.element.removeEventListener('focus', this.onFocus);
    this.element.removeEventListener('blur', this.onBlur);
    this.element.removeEventListener('mouseenter', this.onFocus);
    this.element.removeEventListener('mouseleave', this.onBlur);
    this.element.removeEventListener('mousemove', this.onMouseMove);
    this.element.removeEventListener('click', this.onClick);
    this.on = false;
  }

  show() {
    addClass(this.element, 'x');
  }

  hide() {
    removeClass(this.element, 'x');
  }
}


export default Clearable;
