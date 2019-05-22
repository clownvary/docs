'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _templateObject = (0, _taggedTemplateLiteral3.default)(['an-tooltip\n                      ', '\n                      ', '\n                      an-tooltip__', '\n                      ', '\n                      ', ''], ['an-tooltip\n                      ', '\n                      ', '\n                      an-tooltip__', '\n                      ', '\n                      ', '']);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _isElement = require('lodash/isElement');var _isElement2 = _interopRequireDefault(_isElement);
var _pick = require('lodash/pick');var _pick2 = _interopRequireDefault(_pick);
var _isPromise = require('../../utils/isPromise');var _isPromise2 = _interopRequireDefault(_isPromise);
var _cls = require('../../utils/cls');var _cls2 = _interopRequireDefault(_cls);
var _popup = require('../../services/popup');

var _LoadingBar = require('../../components/LoadingBar');var _LoadingBar2 = _interopRequireDefault(_LoadingBar);
var _consts = require('../../consts');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

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
var TooltipAttrKey = 'data-tooltip';
var TooltipControllerKey = 'data-an-tooltip-controller';

/**
                                                          * Optional settings for the tooltip.
                                                          * @name TooltipOptions
                                                          */
var TooltipOptions = {
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
  dockStyle: _consts.Dock.BOTTOM_LEFT,
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
  selector: '[' + TooltipAttrKey + ']',
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
  trigger: _consts.Trigger.HOVER,
  /**
                                   * Determines the color them of the tooltip.
                                   * Values can be "DARK", "LIGHT", "SUCCESS", "WARNING", "ERROR", "INFO"
                                   * @property {String} [theme="LIGHT"]
                                   * Only implemented "DARK" and "LIGHT" (July 28, 2017)
                                   */
  theme: _consts.Theme.LIGHT,
  /**
                               * Determines the animation effect.
                               * Values can be "NONE", "FADE", "SLIDE", "ZOOM"
                               * @property {String} [theme="NONE"]
                               */
  effect: _consts.Effect.NONE,
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
  onClose: null };var


Tooltip = function (_Component) {(0, _inherits3.default)(Tooltip, _Component);



















  function Tooltip(props) {(0, _classCallCheck3.default)(this, Tooltip);var _this = (0, _possibleConstructorReturn3.default)(this, (Tooltip.__proto__ || (0, _getPrototypeOf2.default)(Tooltip)).call(this,
    props));_this.


























    onOpen = function () {return (0, _isFunction2.default)(_this.props.onOpen) && _this.props.onOpen();};_this.

    onClose = function () {return (0, _isFunction2.default)(_this.props.onClose) && _this.props.onClose();};_this.

    setContentHandler = function (content) {
      var tooltipContent = (0, _isFunction2.default)(content) ? content() : content;

      if ((0, _isPromise2.default)(tooltipContent)) {
        _this.setContent(tooltipContent);
        tooltipContent.then(function (data) {
          if (!_this.isDeleleted) {
            _this.setContent(data, true);
          }
        }).catch(function () {return _this.setContent(
          _react2.default.createElement('div', { className: 'an-tooltip-failed' },
            _react2.default.createElement('i', { className: 'icon icon-error-circle-outline' }), 'Getting tooltip failed!'));},
        true);
      } else {
        _this.setContent(tooltipContent);
      }
    };_this.

    setContent = function (content) {var updateSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      _this.setState({
        content: content },
      function () {
        if (updateSize) {var
          onResize = _this.props.onResize;
          if (onResize && (0, _isFunction2.default)(onResize)) {
            onResize();
          }
        }
      });
    };_this.isDeleleted = false;_this.state = { content: props.content };return _this;}(0, _createClass3.default)(Tooltip, [{ key: 'componentWillMount', value: function componentWillMount() {this.setContentHandler(this.props.content);} }, { key: 'componentDidMount', value: function componentDidMount() {this.onOpen();} }, { key: 'componentWillReceiveProps', value: function componentWillReceiveProps(nextProps) {if (this.props.content !== nextProps.content) {this.setContentHandler(nextProps.content);}} }, { key: 'componentWillUnmount', value: function componentWillUnmount() {this.isDeleleted = true;this.onClose();} }, { key: 'render', value: function render()

    {var _this2 = this;var _props =






      this.props,className = _props.className,theme = _props.theme,showShadow = _props.showShadow,style = _props.style,dockStyle = _props.dockStyle;var


      content =
      this.state.content;

      var arrowPosition = dockStyle.replace(/(\s)/g, '_');

      return (
        _react2.default.createElement('div', {
            ref: function ref(elem) {_this2.tooltipItem = elem;},
            className: (0, _cls2.default)(_templateObject, 'an-tooltip-' +
            theme,
            showShadow ? 'an-tooltip-shadow' : '',
            arrowPosition, 'an-tooltip-' +
            theme + '__' + arrowPosition,
            className || ''),
            style: style },

          (0, _isPromise2.default)(content) ? _react2.default.createElement(_LoadingBar2.default, { fullScreen: false, text: 'Loading...', className: 'an-tooltip__loadingbar', showMask: false }) : content));


    } }]);return Tooltip;}(_react.Component);Tooltip.displayName = 'ANTooltip';Tooltip.defaultProps = { className: TooltipOptions.className, content: TooltipOptions.content, dockStyle: TooltipOptions.dockStyle, theme: TooltipOptions.theme, showShadow: TooltipOptions.showShadow };Tooltip.propTypes = { className: _propTypes2.default.string, content: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func, _propTypes2.default.object]).isRequired, dockStyle: _propTypes2.default.string, theme: _propTypes2.default.string, showShadow: _propTypes2.default.bool };


var popupService = (0, _popup.createPopupService)(Tooltip, {}, {
  disableScroll: false,
  className: 'an-popup-tooltip' });

var popupInstance = null;

var getCustomOption = function getCustomOption(target, optionName) {
  if (optionName === 'content') {
    return target.getAttribute(TooltipAttrKey + '-' + optionName) || target.getAttribute('title') || TooltipOptions[optionName];
  }
  return target.getAttribute(TooltipAttrKey + '-' + optionName.toLowerCase()) || TooltipOptions[optionName];
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
Tooltip.build = function () {var selectors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : TooltipOptions.selector;var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  var targets = [].slice.call(container.querySelectorAll(selectors || '[title]'));

  if (targets.length) {
    Tooltip.clean(container);
    targets.forEach(function (target) {
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
Tooltip.clean = function () {var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var targets = [].slice.call(container.querySelectorAll('[' + TooltipControllerKey + ']'));

  if (targets.length) {
    targets.forEach(function (target) {
      Tooltip.unbind(target);
    });
  }
};

var getDomOptions = function getDomOptions(target) {
  var options = {
    className: getCustomOption(target, 'className'),
    trigger: getCustomOption(target, 'trigger'),
    content: getCustomOption(target, 'content'),
    dockStyle: getCustomOption(target, 'dockStyle'),
    distance: getCustomOption(target, 'distance'),
    theme: getCustomOption(target, 'theme'),
    onOpen: getCustomOption(target, 'onOpen'),
    onClose: getCustomOption(target, 'onClose') };


  return options;
};

Tooltip.bind = function (target, options) {
  if (!(0, _isElement2.default)(target)) return;
  if (target.getAttribute('' + TooltipControllerKey)) return;

  var domOptions = getDomOptions(target);
  var tooltipOptions = (0, _extends3.default)({}, domOptions, options);var _tooltipOptions$trigg =

  tooltipOptions.trigger,trigger = _tooltipOptions$trigg === undefined ? _consts.Trigger.HOVER : _tooltipOptions$trigg;
  target.setAttribute('' + TooltipControllerKey, true);

  target.showHandler = function () {
    Tooltip.open(target, tooltipOptions);
  };

  switch (trigger) {
    case _consts.Trigger.HOVER:
      target.addEventListener('mouseenter', target.showHandler);
      target.addEventListener('mouseleave', Tooltip.close);
      break;
    case _consts.Trigger.CLICK:
      target.addEventListener('click', target.showHandler);
      break;
    case _consts.Trigger.FOCUS:
      target.addEventListener('focus', target.showHandler);
      target.addEventListener('blur', Tooltip.close);
      break;
    default:
      break;}

};

Tooltip.unbind = function (target) {
  if (!(0, _isElement2.default)(target)) return;
  if (target.getAttribute('' + TooltipControllerKey)) {
    target.removeAttribute('' + TooltipControllerKey);
    var showHandler = target.showHandler;
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
Tooltip.option = function (options) {
  if (options) {
    TooltipOptions = (0, _extends3.default)({},
    TooltipOptions,
    options);

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
Tooltip.open = function (target) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (target) {
    var popupOptionNames = ['dockStyle', 'distance', 'effect', 'position', 'stick', 'autoClose'];
    var globalPopupOptions = (0, _pick2.default)(TooltipOptions, popupOptionNames);
    var customPopupOptions = (0, _pick2.default)(options, popupOptionNames);
    var popupOptions = (0, _extends3.default)({
      target: target,
      closeByClick: false,
      closeByEscape: true,
      closeWhenViewChange: true },
    globalPopupOptions,
    customPopupOptions);


    var initOptionNames = ['className', 'content', 'theme', 'showShadow', 'onOpen', 'onClose'];
    var globalInitOptions = (0, _pick2.default)(TooltipOptions, initOptionNames);
    var customInitOptions = (0, _pick2.default)(options, initOptionNames);

    var initOptions = (0, _extends3.default)({},
    globalInitOptions,
    customInitOptions);


    if (popupInstance) {
      Tooltip.close(true);
    }

    popupInstance = popupService.popup(popupOptions, initOptions);
    popupInstance.result.catch(function () {});
  }

  return popupInstance;
};

/**
    * close the current tooltip.
    * @function close
    */
Tooltip.close = function () {var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  if (popupInstance) {
    popupInstance.cancel(force);
    popupInstance = null;
  }
};exports.default =

Tooltip;module.exports = exports['default'];