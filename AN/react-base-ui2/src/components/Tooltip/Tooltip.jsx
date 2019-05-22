import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import isElement from 'lodash/isElement';
import pick from 'lodash/pick';
import isPromise from '../../utils/isPromise';
import cls from '../../utils/cls';
import { createPopupService } from '../../services/popup';

import LoadingBar from '../../components/LoadingBar';
import { Dock, Trigger, Theme, Effect } from '../../consts';

/**
 * The module that defines create tooltip component.
 *
 * To be used user's selectors.
 *
 * Use popup service to open/close tooltip.
 *
 * @module Tooltip
 */

/**
 * Set an Attribute name of selector to be used for tooltip
 */
const TooltipAttrKey = 'data-tooltip';
const TooltipControllerKey = 'data-an-tooltip-controller';

/**
 * Optional settings for the tooltip.
 * @name TooltipOptions
 */
let TooltipOptions = {
  /**
   * Custom CSS class to be added to the tooltip’s outer DOM.
   * Default value is "".
   * @property {String} [className=""]
   */
  className: '',
  /**
   * The content of the tooltip.
   * Default value is "".
   * @property Fuction: callback which can return the content directly,
   * or a Promise that returns the content.
   * @property String:  HTML string for tooltip content.
   * @property Element: A DOM element to use for the tooltip content.
   * @property Component: A React UI component.
   * @property Object: A async content.
   * @property {Function|Node|Object} [content=""]
   */
  content: '',
  /**
   * Determines the position of the tooltip relative to the associated target element.
   * The value is one of the const defined in Dock
   * Default value is Dock.BOTTOM_LEFT.
   * @property {Dock} [dockStyle]
   * * @see Dock
   */
  dockStyle: Dock.BOTTOM_LEFT,
  /**
   * Offset in pixel between the tooltip and the target element.
   * Default value is 0.
   * @property {Number|string} [distance=0]
   */
  distance: 0,
  /**
   * Determines whether show shadow.
   * Default value is false.
   * @property {Boolean} [showShadoe=false]
   */
  showShadow: false,
  /**
   * A CSS selector that determines which items should have tooltips
   * Default is "[data-tooltip]",
   * which means these doms which have *data-tooltip* attribute will be used.
   * @property {String} [selector="[data-tooltip]"]
   */
  selector: `[${TooltipAttrKey}]`,
  /**
   * Determines whether the tooltip will track the mouse’ position.
   * Default is false, don't need to track mouse.
   * @property {Boolean} [trackMouse=false]
   * Not implemented(July 28, 2017)
   */
  trackMouse: false,
  /**
   * Determines the trigger method when popping up the tooltip.
   * Values can be "HOVER", "CLICK" or "FOCUS".
   * Default is "HOVER".
   * @property {String} [trigger="HOVER"]
   */
  trigger: Trigger.HOVER,
  /**
   * Determines the color them of the tooltip.
   * Values can be "DARK", "LIGHT", "SUCCESS", "WARNING", "ERROR", "INFO"
   * @property {String} [theme="LIGHT"]
   * Only implemented "DARK" and "LIGHT" (July 28, 2017)
   */
  theme: Theme.LIGHT,
  /**
   * Determines the animation effect.
   * Values can be "NONE", "FADE", "SLIDE", "ZOOM"
   * @property {String} [theme="NONE"]
   */
  effect: Effect.NONE,
  /**
   * Fired when the tooltip is created. Used for customizing the tooltip instance.
   * @property {Function} [onCreate]
   * Not implemented(July 28, 2017)
   */
  onCreate: null,
  /**
   * Fired after the tooltip is open.
   * @property {Function} [onOpen]
   */
  onOpen: null,
  /**
   * Fired after the tooltip is close.
   * @property {Function} [onClose]
   */
  onClose: null
};

class Tooltip extends Component {

  static displayName = 'ANTooltip';

  static defaultProps = {
    className: TooltipOptions.className,
    content: TooltipOptions.content,
    dockStyle: TooltipOptions.dockStyle,
    theme: TooltipOptions.theme,
    showShadow: TooltipOptions.showShadow
  };

  static propTypes = {
    className: PropTypes.string,
    content: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.object]).isRequired,
    dockStyle: PropTypes.string,
    theme: PropTypes.string,
    showShadow: PropTypes.bool
  }

  constructor(props) {
    super(props);

    this.isDeleleted = false;
    this.state = {
      content: props.content
    };
  }

  componentWillMount() {
    this.setContentHandler(this.props.content);
  }

  componentDidMount() {
    this.onOpen();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.content !== nextProps.content) {
      this.setContentHandler(nextProps.content);
    }
  }

  componentWillUnmount() {
    this.isDeleleted = true;
    this.onClose();
  }

  onOpen = () => isFunction(this.props.onOpen) && this.props.onOpen();

  onClose = () => isFunction(this.props.onClose) && this.props.onClose();

  setContentHandler = (content) => {
    const tooltipContent = isFunction(content) ? content() : content;

    if (isPromise(tooltipContent)) {
      this.setContent(tooltipContent);
      tooltipContent.then((data) => {
        if (!this.isDeleleted) {
          this.setContent(data, true);
        }
      }).catch(() => this.setContent(
        <div className="an-tooltip-failed">
          <i className="icon icon-error-circle-outline" />Getting tooltip failed!
        </div>), true);
    } else {
      this.setContent(tooltipContent);
    }
  }

  setContent = (content, updateSize = false) => {
    this.setState({
      content
    }, () => {
      if (updateSize) {
        const { onResize } = this.props;
        if (onResize && isFunction(onResize)) {
          onResize();
        }
      }
    });
  }

  render() {
    const {
      className,
      theme,
      showShadow,
      style,
      dockStyle
    } = this.props;

    const {
      content
    } = this.state;

    const arrowPosition = dockStyle.replace(/(\s)/g, '_');

    return (
      <div
        ref={(elem) => { this.tooltipItem = elem; }}
        className={cls`an-tooltip
                      ${`an-tooltip-${theme}`}
                      ${showShadow ? 'an-tooltip-shadow' : ''}
                      an-tooltip__${arrowPosition}
                      ${`an-tooltip-${theme}__${arrowPosition}`}
                      ${className || ''}`}
        style={style}
      >
        {isPromise(content) ? <LoadingBar fullScreen={false} text="Loading..." className="an-tooltip__loadingbar" showMask={false} /> : content}
      </div>
    );
  }
}

const popupService = createPopupService(Tooltip, {}, {
  disableScroll: false,
  className: 'an-popup-tooltip'
});
let popupInstance = null;

const getCustomOption = (target, optionName) => {
  if (optionName === 'content') {
    return target.getAttribute(`${TooltipAttrKey}-${optionName}`) || target.getAttribute('title') || TooltipOptions[optionName];
  }
  return target.getAttribute(`${TooltipAttrKey}-${optionName.toLowerCase()}`) || TooltipOptions[optionName];
};

/**
 * Build Tooltip.
 * @function build
 * @param {DOMString} selectors - DOMString selectors
 * Default is Tooltip attribute,
 * which means the tooltip attribute's elements will be added their own trigger eventListener.
 * If the value is empty string,
 * which means the title attribute's elements will be used their own trigger eventListener.
 * The selectors value can be recognized by document.querySelectorAll().
 * @param {DOM} container - DOM element
 * Default is document.
 * The value is a DOM element.
 * which means every element in container will to add the tooltip eventListener.
 * when calling the build.
 */
Tooltip.build = (selectors = TooltipOptions.selector, container = document) => {
  const targets = [].slice.call(container.querySelectorAll(selectors || '[title]'));

  if (targets.length) {
    Tooltip.clean(container);
    targets.forEach((target) => {
      Tooltip.bind(target);
    });
  }
};

/**
 * clean Tooltip
 * @function clean
 * @param {DOM} container - DOM element
 * Default is document.
 * The value is a DOM element.
 * which means every element in container will to remove the tooltip eventListener.
 * when calling the clean.
 */
Tooltip.clean = (container = document) => {
  const targets = [].slice.call(container.querySelectorAll(`[${TooltipControllerKey}]`));

  if (targets.length) {
    targets.forEach((target) => {
      Tooltip.unbind(target);
    });
  }
};

const getDomOptions = (target) => {
  const options = {
    className: getCustomOption(target, 'className'),
    trigger: getCustomOption(target, 'trigger'),
    content: getCustomOption(target, 'content'),
    dockStyle: getCustomOption(target, 'dockStyle'),
    distance: getCustomOption(target, 'distance'),
    theme: getCustomOption(target, 'theme'),
    onOpen: getCustomOption(target, 'onOpen'),
    onClose: getCustomOption(target, 'onClose')
  };

  return options;
};

Tooltip.bind = (target, options) => {
  if (!isElement(target)) return;
  if (target.getAttribute(`${TooltipControllerKey}`)) return;

  const domOptions = getDomOptions(target);
  const tooltipOptions = { ...domOptions, ...options };

  const { trigger = Trigger.HOVER } = tooltipOptions;
  target.setAttribute(`${TooltipControllerKey}`, true);

  target.showHandler = () => {
    Tooltip.open(target, tooltipOptions);
  };

  switch (trigger) {
    case Trigger.HOVER:
      target.addEventListener('mouseenter', target.showHandler);
      target.addEventListener('mouseleave', Tooltip.close);
      break;
    case Trigger.CLICK:
      target.addEventListener('click', target.showHandler);
      break;
    case Trigger.FOCUS:
      target.addEventListener('focus', target.showHandler);
      target.addEventListener('blur', Tooltip.close);
      break;
    default:
      break;
  }
};

Tooltip.unbind = (target) => {
  if (!isElement(target)) return;
  if (target.getAttribute(`${TooltipControllerKey}`)) {
    target.removeAttribute(`${TooltipControllerKey}`);
    const showHandler = target.showHandler;
    if (showHandler) {
      target.removeEventListener('mouseenter', showHandler);
      target.removeEventListener('click', showHandler);
      target.removeEventListener('focus', showHandler);
    }

    target.removeEventListener('mouseleave', Tooltip.close);
    target.removeEventListener('blur', Tooltip.close);
  }
};

/**
 * Get or set the default options.
 * @function option
 * @param {object} options - Get or set the settings options of Tooltip
 * when calling the option.
 * @returns {Object} Returns the settings options of Tooltip if no param.
 */
Tooltip.option = (options) => {
  if (options) {
    TooltipOptions = {
      ...TooltipOptions,
      ...options
    };
  }
  return TooltipOptions;
};

/**
 * Open a Tooltip.
 * @function open
 * @param {node|DOMString} target - Target DOM element or query selector
 * when calling the open.
 * @param {object} options - Configured options of Tooltip
 * when calling the open.
 * @returns {Object} Returns a popup instance.
 */
Tooltip.open = (target, options = {}) => {
  if (target) {
    const popupOptionNames = ['dockStyle', 'distance', 'effect', 'position', 'stick', 'autoClose'];
    const globalPopupOptions = pick(TooltipOptions, popupOptionNames);
    const customPopupOptions = pick(options, popupOptionNames);
    const popupOptions = {
      target,
      closeByClick: false,
      closeByEscape: true,
      closeWhenViewChange: true,
      ...globalPopupOptions,
      ...customPopupOptions
    };

    const initOptionNames = ['className', 'content', 'theme', 'showShadow', 'onOpen', 'onClose'];
    const globalInitOptions = pick(TooltipOptions, initOptionNames);
    const customInitOptions = pick(options, initOptionNames);

    const initOptions = {
      ...globalInitOptions,
      ...customInitOptions
    };

    if (popupInstance) {
      Tooltip.close(true);
    }

    popupInstance = popupService.popup(popupOptions, initOptions);
    popupInstance.result.catch(() => { });
  }

  return popupInstance;
};

/**
 * close the current tooltip.
 * @function close
 */
Tooltip.close = (force = false) => {
  if (popupInstance) {
    popupInstance.cancel(force);
    popupInstance = null;
  }
};

export default Tooltip;
