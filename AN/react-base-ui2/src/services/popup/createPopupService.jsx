import React from 'react';
import ReactDOM from 'react-dom';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import uniqueId from 'lodash/uniqueId';
import { addClass, removeClass } from '../../utils/dom';
// import { addClass, removeClass, calcScrollWidth } from '../../utils/dom';
// import broswer from '../../utils/browser';
// import { Dock, OS, Effect } from '../../consts';
import { Dock, Effect } from '../../consts';
import createPopupHOC from './components/createPopupHOC';


/**
 * The module that defines static methods that can be used to create
 * popup service.
 *
 * Popup service is a type of UI service that helps managing the popup behaviors
 * of other UI assistants that need to popup and hide, for example dropdown list,
 * tooltip, calendar etc.
 *
 * Popup service can position the popped up content to proper place according to
 * the Dock setting and the real available space.
 *
 * @module PopupService
 */


/**
 * Optional settings for the popup behaviors.
 * @name PopupOptions
 */
const PopupOptions = {
  /**
   * Whether allow reusing previous created instance.
   * Default value is false.
   * @property {Boolean} [cache]
   */
  cache: false,
  /**
   * Whether or not to display the mask layer when in popup state.
   * Default value is false.
   * @property {Boolean} [showMask]
   */
  showMask: false,
  /**
   * Whether or not to display the shadow.
   * Default value is false.
   * @property {Boolean} [showShadow]
   */
  showShadow: false,
  /**
   * Custom CSS class name for popup wrapper.
   * Default value is "".
   * @property {String} [className=""]
   */
  className: '',
  /**
   * Determines the transition effects when popping up and closing.
   * Default value is Effect.NONE
   * @property {effect} [effect=Effect.NONE]
   */
  effect: Effect.NONE,
  /**
   * Whether or not to adjust the postion if the popped UI overlaps with window.
   * Default value is true.
   * @property {Boolean} [noCollision]
   */
  noCollision: true,
  /**
   * Whether or not to stick the popped up UI to the container's
   * boundary if there is no suitable space.
   * Default value is true.
   * @property {Boolean} [stick]
   */
  stick: true,
  /**
   * Whether or not to move focus to the popped UI.
   * Default value is false.
   * @property {Boolean} [focus]
   */
  focus: false,
  /**
   * Time in millisecond to close the popup UI automatically. 0 means no autoclose.
   * Default value is 0.
   * @property {Number} [autoClose]
   */
  autoClose: 0,
  /**
   * Whether or not to close the popped up UI when clicking the out side of the popped UI.
   * Default value is true.
   * @property {Boolean} [closeByClick]
   */
  closeByClick: true,
  /**
   * Whether or not to close the popped up UI when pressing the escape key.
   * Default value is false.
   * * @property {Boolean} [closeByEscape]
   */
  closeByEscape: false,
  closeWhenViewChange: false,
  /**
   * Determines how the popped UI align to the target element.
   * Default value is Dock.BOTTOM_LEFT.
   * @property {Dock} [dockStyle]
   * * @see Dock
   */
  dockStyle: Dock.BOTTOM_LEFT,
  /**
   * Determines whether position options will be treated as cross line.
   * Default value is true.
   * @property {Boolean} [crossLine]
   */
  crossLine: true,
  /**
   * Whether or not to disable desktop scroll.
   * Default value is true.
   * @property {Boolean} [disableScroll]
   */
  disableScroll: true,
  /**
   * Function that will be called before popping up.
   * Return false to disable the pop up behavior.
   * @property {Function} [onBeforeOpen]
   */
  onBeforeOpen: null,
  /**
   * Function that will be called after popping up.
   * @property {Function} [onAfterOpen]
   */
  onAfterOpen: null,
  /**
   * Function that will be called before the closing behavior.
   * Return false to disable the closing behavior.
   * @property {Function} [onBeforeClose]
   */
  onBeforeClose: null,
  /**
   * Function that will be called after the closing behavior.
   * @property {Function} [onAfterClose]
   */
  onAfterClose: null,
  /**
   * Function that will be called before the cancling behavior of the popup HOC is taken.
   * Return false to disable the canceling behavior.
   * @property {Function} [onBeforeCancel]
   */
  onBeforeCancel: null,
  /**
   * Function that will be called after the cancling behavior of the popup HOC.
   * @property {Function} [onAfterCancel]
   */
  onAfterCancel: null,
  /**
   * Function that will be called before the change behavior of the popup HOC is taken.
   * @property {Function} [onBeforeChange]
   */
  onBeforeChange: null,
  /**
   * Function that will be called before the change behavior of the popup HOC.
   * @property {Function} [onAfterChange]
   */
  onAfterChange: null
};

const defaultPopupOptions = PopupOptions;


/**
 * The interface for a popup service.
 * @interface
 */
class IPopupService {
  /**
   * Pops up the wrapped component with custom settings.
   * @param {PopupOptions} options The popup options.
   * @param {Object} initProps
   * The props that will be passed to the wrapped component before popping up.
   */
  /* istanbul ignore next */
  popup(options = {}, initProps = {}) {
    initProps.dummy = 'Document only';
  }

  /* istanbul ignore next */
  clearCache(options = {}) {
    options.dummy = 'Document only';
  }
}

IPopupService.dummy = 'Document only';


/**
 * Creates a popup service.
 * @function createPopupService
 * @param {Component} WrappedComponent
 * A react UI component to popup or hide.
 * @param {object} [connectiors]
 * Connector functions that bind the behaviors of the popup HOC to the service.
 *
 * Connector functions will be bound to the hoc component
 * and set as events props of the wrapped component.
 *
 * The parameter of the connector function is the popup HOC object,
 * from where we can operate the popup behavior or access the wrapped component.
 * @param {PopupOptions} [configOptions] - Configuration or default options when calling the popup.
 *
 * @returns {IPopupHOC} Returns a high order component that wraps the UI component to popup.
 * @see IPopupHOC
 *
 * @memberof PopupService
 * @example
 * import { createPopupService } from 'react-base-ui/lib/services/popup';
 * import Form from '../components/form';
 *
 * const onCancel = popup => () => {
 *   popup.cancel();
 * };
 * const onOK = popup => (value) => {
 *  popup.change(value);
 * };
 *
 * const formService = createPopupService(Form, { onCancel, onOK });
 *
 * export default formService;
 */
const createPopupService = (WrappedComponent, connectors = {}, configOptions = {}) => {
  const serviceName = configOptions.name || WrappedComponent.displayName || 'dummy';
  const prefix = `${serviceName}_popup_container_`;
  const cacheName = `${serviceName}_popup_cache`;

  const {
    disableScroll = defaultPopupOptions.disableScroll,
    ...otherConfigOptions
  } = configOptions;

  const HOCComponent = createPopupHOC(WrappedComponent);
  const serviceOptions = { ...defaultPopupOptions, ...otherConfigOptions };
  // let originBodyPaddingRight;

  // const queryContainers = (id = prefix) =>
  // Array.prototype.slice.call(document.body.querySelectorAll(`body > div[id^="${id}"]`), 0);

  const getCachedContainer = (/* istanbul ignore next */ target = window) => {
    let container;
    const cachedId = target && target[cacheName];
    if (cachedId) {
      container = document.getElementById(cachedId);
    }

    return container;
  };

  const createContainer = (/* istanbul ignore next */ target = window, cache) => {
    let container = cache ? getCachedContainer(target) : null;
    if (!container) {
      const id = uniqueId(prefix);
      container = document.createElement('div');
      container.className = `${'an-popup an-popup-'}${serviceName}-service`;
      container.id = id;
      if (cache) {
        target[cacheName] = id;
      }
      // document.body.appendChild(container);
    } else {
      removeClass(container, 'u-hidden');
    }

    if (disableScroll) {
      // if (broswer.os !== OS.MAC &&
      //   ((document.body.offsetHeight + 4) - document.body.clientHeight > 0)) {
      //   const scrollWidth = calcScrollWidth();
      //   originBodyPaddingRight = document.body.style.paddingRight;
      //   document.body.style.paddingRight = `${scrollWidth}px`;
      // }
      addClass(document.body, 'modal-open');
    }

    return container;
  };

  const removeContainer = (container) => {
    ReactDOM.unmountComponentAtNode(container);
    container.parentNode && container.parentNode.removeChild(container);
  };

  const hideContainer = (container, cache) => {
    if (cache) {
      addClass(container, 'u-hidden');
    } else {
      removeContainer(container);
    }

    if (disableScroll) {
      removeClass(document.body, 'modal-open');
      // if (broswer.os !== OS.MAC) {
      //   document.body.style.paddingRight = originBodyPaddingRight;
      // }
    }
  };

  const clearCache = (target = window) => {
    if (isObject(target)) {
      target = target.target;
    }

    if (target) {
      const container = getCachedContainer(target);
      if (container) {
        removeContainer(container);
      }
    }
  };

  const popup = (/* istanbul ignore next */ options = {}, initProps = {}) => {
    const popupOptions = { ...serviceOptions, ...options };
    /* istanbul ignore next */
    const { cache = false, autoClose = 0, onBeforeOpen, target = window } = popupOptions;

    if (onBeforeOpen && isFunction(onBeforeOpen)) {
      if (!onBeforeOpen()) {
        return null;
      }
    }

    let popupContainer = createContainer(target, cache);

    let hocComponent;
    const promise = new Promise((resolve, reject) => {
      const onPopupCancel = () => {
        /* istanbul ignore else */
        if (popupContainer) {
          hideContainer(popupContainer, cache);
          popupContainer = null;
          hocComponent && hocComponent.onClose();
          reject('Popup is canceled');
        }
      };

      const onPopupChange = (value) => {
        /* istanbul ignore else */
        if (popupContainer) {
          hideContainer(popupContainer, cache);
          popupContainer = null;
          hocComponent && hocComponent.onClose();
          resolve(value);
        }
      };

      const popupEvents = {
        onPopupCancel,
        onPopupChange
      };

      hocComponent = ReactDOM.render(
        <HOCComponent
          connectors={connectors}
          popupOptions={popupOptions}
          popupEvents={popupEvents}
          initProps={initProps}
        />,
        popupContainer
      );

      document.body.appendChild(popupContainer);

      popupContainer.__instance = hocComponent;
      hocComponent.onOpen();

      if (autoClose > 0) {
        setTimeout(() => {
          hocComponent.cancel();
        }, autoClose);
      }
    });

    /* istanbul ignore else */
    if (hocComponent) {
      hocComponent.result = promise;
    }

    return hocComponent;
  };

  return {
    popup,
    clearCache
  };
};

export default createPopupService;
