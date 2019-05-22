'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _promise = require('babel-runtime/core-js/promise');var _promise2 = _interopRequireDefault(_promise);var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _reactDom = require('react-dom');var _reactDom2 = _interopRequireDefault(_reactDom);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _isObject = require('lodash/isObject');var _isObject2 = _interopRequireDefault(_isObject);
var _uniqueId = require('lodash/uniqueId');var _uniqueId2 = _interopRequireDefault(_uniqueId);
var _dom = require('../../utils/dom');



var _consts = require('../../consts');
var _createPopupHOC = require('./components/createPopupHOC');var _createPopupHOC2 = _interopRequireDefault(_createPopupHOC);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


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
                                                                                                                                                                                                                               */ // import { addClass, removeClass, calcScrollWidth } from '../../utils/dom';
// import broswer from '../../utils/browser';
// import { Dock, OS, Effect } from '../../consts';
var PopupOptions = { /**
                      * Whether allow reusing previous created instance.
                      * Default value is false.
                      * @property {Boolean} [cache]
                      */cache: false,
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
  effect: _consts.Effect.NONE,
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
  dockStyle: _consts.Dock.BOTTOM_LEFT,
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
  onAfterChange: null };


var defaultPopupOptions = PopupOptions;


/**
                                         * The interface for a popup service.
                                         * @interface
                                         */var
IPopupService = function () {function IPopupService() {(0, _classCallCheck3.default)(this, IPopupService);}(0, _createClass3.default)(IPopupService, [{ key: 'popup',
    /**
                                                                                                                                                                       * Pops up the wrapped component with custom settings.
                                                                                                                                                                       * @param {PopupOptions} options The popup options.
                                                                                                                                                                       * @param {Object} initProps
                                                                                                                                                                       * The props that will be passed to the wrapped component before popping up.
                                                                                                                                                                       */
    /* istanbul ignore next */value: function popup()
    {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var initProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      initProps.dummy = 'Document only';
    }

    /* istanbul ignore next */ }, { key: 'clearCache', value: function clearCache()
    {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      options.dummy = 'Document only';
    } }]);return IPopupService;}();


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
var createPopupService = function createPopupService(WrappedComponent) {var connectors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var configOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var serviceName = configOptions.name || WrappedComponent.displayName || 'dummy';
  var prefix = serviceName + '_popup_container_';
  var cacheName = serviceName + '_popup_cache';var _configOptions$disabl =




  configOptions.disableScroll,disableScroll = _configOptions$disabl === undefined ? defaultPopupOptions.disableScroll : _configOptions$disabl,otherConfigOptions = (0, _objectWithoutProperties3.default)(configOptions, ['disableScroll']);

  var HOCComponent = (0, _createPopupHOC2.default)(WrappedComponent);
  var serviceOptions = (0, _extends3.default)({}, defaultPopupOptions, otherConfigOptions);
  // let originBodyPaddingRight;

  // const queryContainers = (id = prefix) =>
  // Array.prototype.slice.call(document.body.querySelectorAll(`body > div[id^="${id}"]`), 0);

  var getCachedContainer = function getCachedContainer() {var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
    var container = void 0;
    var cachedId = target && target[cacheName];
    if (cachedId) {
      container = document.getElementById(cachedId);
    }

    return container;
  };

  var createContainer = function createContainer() {var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;var cache = arguments[1];
    var container = cache ? getCachedContainer(target) : null;
    if (!container) {
      var id = (0, _uniqueId2.default)(prefix);
      container = document.createElement('div');
      container.className = 'an-popup an-popup-' + serviceName + '-service';
      container.id = id;
      if (cache) {
        target[cacheName] = id;
      }
      // document.body.appendChild(container);
    } else {
      (0, _dom.removeClass)(container, 'u-hidden');
    }

    if (disableScroll) {
      // if (broswer.os !== OS.MAC &&
      //   ((document.body.offsetHeight + 4) - document.body.clientHeight > 0)) {
      //   const scrollWidth = calcScrollWidth();
      //   originBodyPaddingRight = document.body.style.paddingRight;
      //   document.body.style.paddingRight = `${scrollWidth}px`;
      // }
      (0, _dom.addClass)(document.body, 'modal-open');
    }

    return container;
  };

  var removeContainer = function removeContainer(container) {
    _reactDom2.default.unmountComponentAtNode(container);
    container.parentNode && container.parentNode.removeChild(container);
  };

  var hideContainer = function hideContainer(container, cache) {
    if (cache) {
      (0, _dom.addClass)(container, 'u-hidden');
    } else {
      removeContainer(container);
    }

    if (disableScroll) {
      (0, _dom.removeClass)(document.body, 'modal-open');
      // if (broswer.os !== OS.MAC) {
      //   document.body.style.paddingRight = originBodyPaddingRight;
      // }
    }
  };

  var clearCache = function clearCache() {var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
    if ((0, _isObject2.default)(target)) {
      target = target.target;
    }

    if (target) {
      var container = getCachedContainer(target);
      if (container) {
        removeContainer(container);
      }
    }
  };

  var popup = function popup() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var initProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var popupOptions = (0, _extends3.default)({}, serviceOptions, options);
    /* istanbul ignore next */var _popupOptions$cache =
    popupOptions.cache,cache = _popupOptions$cache === undefined ? false : _popupOptions$cache,_popupOptions$autoClo = popupOptions.autoClose,autoClose = _popupOptions$autoClo === undefined ? 0 : _popupOptions$autoClo,onBeforeOpen = popupOptions.onBeforeOpen,_popupOptions$target = popupOptions.target,target = _popupOptions$target === undefined ? window : _popupOptions$target;

    if (onBeforeOpen && (0, _isFunction2.default)(onBeforeOpen)) {
      if (!onBeforeOpen()) {
        return null;
      }
    }

    var popupContainer = createContainer(target, cache);

    var hocComponent = void 0;
    var promise = new _promise2.default(function (resolve, reject) {
      var onPopupCancel = function onPopupCancel() {
        /* istanbul ignore else */
        if (popupContainer) {
          hideContainer(popupContainer, cache);
          popupContainer = null;
          hocComponent && hocComponent.onClose();
          reject('Popup is canceled');
        }
      };

      var onPopupChange = function onPopupChange(value) {
        /* istanbul ignore else */
        if (popupContainer) {
          hideContainer(popupContainer, cache);
          popupContainer = null;
          hocComponent && hocComponent.onClose();
          resolve(value);
        }
      };

      var popupEvents = {
        onPopupCancel: onPopupCancel,
        onPopupChange: onPopupChange };


      hocComponent = _reactDom2.default.render(
      _react2.default.createElement(HOCComponent, {
        connectors: connectors,
        popupOptions: popupOptions,
        popupEvents: popupEvents,
        initProps: initProps }),

      popupContainer);


      document.body.appendChild(popupContainer);

      popupContainer.__instance = hocComponent;
      hocComponent.onOpen();

      if (autoClose > 0) {
        setTimeout(function () {
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
    popup: popup,
    clearCache: clearCache };

};exports.default =

createPopupService;module.exports = exports['default'];