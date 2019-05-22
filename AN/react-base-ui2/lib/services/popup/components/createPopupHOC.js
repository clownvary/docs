'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n            ', '\n          '], ['\n            ', '\n          ']),_templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n              an-popup-wrapper\n              ', '\n              ', '\n              ', ''], ['\n              an-popup-wrapper\n              ', '\n              ', '\n              ', '']);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _reactDom = require('react-dom');
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _reactIntl = require('react-intl');
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _mapValues = require('lodash/mapValues');var _mapValues2 = _interopRequireDefault(_mapValues);
var _throttle = require('lodash/throttle');var _throttle2 = _interopRequireDefault(_throttle);
var _consts = require('../../../consts');
var _responsive = require('../../responsive');var _responsive2 = _interopRequireDefault(_responsive);
var _i18n = require('../../i18n');
var _utils = require('../../../utils');
var _mirror = require('./mirror');var _mirror2 = _interopRequireDefault(_mirror);
var _PositionCalculator = require('./PositionCalculator');var _PositionCalculator2 = _interopRequireDefault(_PositionCalculator);
var _Edge = require('./consts/Edge');var Edge = _interopRequireWildcard(_Edge);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


/**
                                                                                                                                                                                                                                                                                                                                                                                                                                              * High order component that wraps the popup UI component.
                                                                                                                                                                                                                                                                                                                                                                                                                                              * When calling the IPopupService.popup method, we got this HOC.
                                                                                                                                                                                                                                                                                                                                                                                                                                              *
                                                                                                                                                                                                                                                                                                                                                                                                                                              * This HOC is also available in the parameter of connector functions,
                                                                                                                                                                                                                                                                                                                                                                                                                                              * so that user can implement custom behavior that connect the popup content with the app's logic.
                                                                                                                                                                                                                                                                                                                                                                                                                                              *
                                                                                                                                                                                                                                                                                                                                                                                                                                              * We consider every popup behaviors can only be any of the two:
                                                                                                                                                                                                                                                                                                                                                                                                                                              * 1) Indicator, for example, tooltip
                                                                                                                                                                                                                                                                                                                                                                                                                                              * 2) Value input assistant, for example, calendar or dropdownlist
                                                                                                                                                                                                                                                                                                                                                                                                                                              *
                                                                                                                                                                                                                                                                                                                                                                                                                                              * This HOC mainly provides two methods, cancel and change.
                                                                                                                                                                                                                                                                                                                                                                                                                                              *
                                                                                                                                                                                                                                                                                                                                                                                                                                              * @interface
                                                                                                                                                                                                                                                                                                                                                                                                                                              */var
IPopupHOC = function () {function IPopupHOC() {(0, _classCallCheck3.default)(this, IPopupHOC);}(0, _createClass3.default)(IPopupHOC, [{ key: 'cancel',

    /**
                                                                                                                                                        * Cancel the pop up behaviors.
                                                                                                                                                        * onBeforeCancel and onAfterCancel will be called.
                                                                                                                                                        */
    /* istanbul ignore next */value: function cancel() {
    }

    /**
       * Popup UI would like to change some value.
       * onBeforeChange and onAfterChange will be called.
       */
    /* istanbul ignore next */ }, { key: 'change', value: function change(value) {
      return value;
    }

    /**
       * Gets the wrapped component.
       */
    /* istanbul ignore next */ }, { key: 'getWrappedComponent', value: function getWrappedComponent() {

    } }]);return IPopupHOC;}();


IPopupHOC.dummy = 'Document only';


var createPopupHOC = function createPopupHOC(WrappedComponent) {var _class, _temp;return _temp = _class = function (_Component) {(0, _inherits3.default)(_class, _Component);









    function _class(props) {(0, _classCallCheck3.default)(this, _class);var _this = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).call(this,
      props));var _props$popupOptions =




      props.popupOptions,dockStyle = _props$popupOptions.dockStyle,_props$popupOptions$e = _props$popupOptions.effect,effect = _props$popupOptions$e === undefined ? _consts.Effect.NONE : _props$popupOptions$e;

      _this.state = {
        show: true,
        popupPosition: {},
        dockStyle: dockStyle,
        animation: effect === _consts.Effect.NONE ? '' : 'an-' + effect + '-enter' };


      _this.onKeyDown = _this.onKeyDown.bind(_this);
      _this.onViewChange = _this.onViewChange.bind(_this);
      _this.onScrollHandler = (0, _throttle2.default)(function () {return _this.updatePosition(true);}, 40);return _this;
    }(0, _createClass3.default)(_class, [{ key: 'getChildContext', value: function getChildContext()

      {
        return {
          intl: _i18n.Globalize.intl };

      } }, { key: 'isAlive', value: function isAlive()

      {
        return this.state.show;
      } }, { key: 'getItemAt', value: function getItemAt(

      dockStyle) {
        var at = dockStyle.split(' ');
        at[0] = (0, _mirror2.default)(at[0]);
        return at.join(' ');
      } }, { key: 'getMainOffset', value: function getMainOffset(

      dockStyle, distance) {
        distance = Math.max(0, distance);
        var x = 0;
        var y = 0;

        if (distance) {
          var at = dockStyle.split(' ');
          switch (at[0]) {
            case Edge.TOP:
              y = -distance;
              break;
            case Edge.LEFT:
              x = -distance;
              break;
            case Edge.RIGHT:
              x = distance;
              break;
            case Edge.BOTTOM:
              y = distance;
              break;
            default:}

        }
        return { x: x, y: y, mirror: true };
      } }, { key: 'tryFocus', value: function tryFocus()

      {var

        focus =
        this.props.popupOptions.focus;

        if (focus) {
          this.lastFocus = document.activeElement;
          var wc = (0, _reactDom.findDOMNode)(this.wrappedComponent);
          /* istanbul ignore else */
          if (wc) {
            window.setTimeout(function () {return wc.focus();}, 0);
          }
        }
      } }, { key: 'onViewChange', value: function onViewChange()

      {
        this.cancel();
      } }, { key: 'onOpen', value: function onOpen()

      {var _props$popupOptions2 =



        this.props.popupOptions,onAfterOpen = _props$popupOptions2.onAfterOpen,closeWhenViewChange = _props$popupOptions2.closeWhenViewChange;

        if (onAfterOpen && (0, _isFunction2.default)(onAfterOpen)) {
          onAfterOpen();
        }

        window.document.addEventListener('keydown', this.onKeyDown);
        if (closeWhenViewChange) {
          _responsive2.default.addEventListener('orientationchange', this.onViewChange, this);
          if (_utils.browser.mobile) {
            window.document.addEventListener('scroll', this.onScrollHandler);
          }
        }

        this.updatePosition(false);
        this.tryFocus();
      } }, { key: 'onClose', value: function onClose()

      {var _props$popupOptions3 =





        this.props.popupOptions,onAfterClose = _props$popupOptions3.onAfterClose,focus = _props$popupOptions3.focus,closeWhenViewChange = _props$popupOptions3.closeWhenViewChange;

        window.document.removeEventListener('keydown', this.onKeyDown);
        if (closeWhenViewChange) {
          _responsive2.default.removeEventListener('orientationchange', this.onViewChange, this);
          if (_utils.browser.mobile) {
            window.document.removeEventListener('scroll', this.onScrollHandler);
          }
        }

        if (onAfterClose && (0, _isFunction2.default)(onAfterClose)) {
          onAfterClose();
        }

        if (focus && this.lastFocus && this.lastFocus !== document.activeElement) {
          typeof this.lastFocus.focus === 'function' && this.lastFocus.focus();
        }

        this.lastFocus = null;
      } }, { key: 'onKeyDown', value: function onKeyDown(

      e) {var
        closeByEscape = this.props.popupOptions.closeByEscape;
        if (e.keyCode === _consts.KeyCode.ESCAPE && closeByEscape) {
          this.cancel();
        }
      } }, { key: 'updatePosition', value: function updatePosition()

      {var isScrolling = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        if (!this.popupItem) return;var _props$popupOptions4 =







        this.props.popupOptions,_props$popupOptions4$ = _props$popupOptions4.target,target = _props$popupOptions4$ === undefined ? window : _props$popupOptions4$,position = _props$popupOptions4.position,noCollision = _props$popupOptions4.noCollision,stick = _props$popupOptions4.stick,distance = _props$popupOptions4.distance;var


        dockStyle =
        this.props.popupOptions.dockStyle;

        var mainOffset = this.getMainOffset(dockStyle, distance);

        var positionCalculator = new _PositionCalculator2.default({
          main: this.popupItem,
          mainAt: this.getItemAt(dockStyle),
          target: target,
          targetAt: dockStyle,
          position: position,
          flip: noCollision,
          stick: isScrolling ? 'none' : stick,
          mainOffset: mainOffset });


        var result = positionCalculator.calc();
        if (result.fliped) {
          dockStyle = result.targetAt;
        }

        var popupPosition = {
          left: result.pos.left || 0,
          top: result.pos.top || 0 };


        this.setState({
          popupPosition: popupPosition,
          dockStyle: dockStyle });

      } }, { key: 'cancel', value: function cancel()

      {var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;var _props$popupOptions5 =




        this.props.popupOptions,onBeforeCancel = _props$popupOptions5.onBeforeCancel,onAfterCancel = _props$popupOptions5.onAfterCancel,_props$popupOptions5$ = _props$popupOptions5.effect,effect = _props$popupOptions5$ === undefined ? _consts.Effect.NONE : _props$popupOptions5$;var
        onPopupCancel = this.props.popupEvents.onPopupCancel;

        if (force) {
          if (onPopupCancel && (0, _isFunction2.default)(onPopupCancel)) {
            onPopupCancel();
            return;
          }
        }

        if (onBeforeCancel && (0, _isFunction2.default)(onBeforeCancel)) {
          if (!onBeforeCancel()) {
            return;
          }
        }

        this.setState({
          show: false,
          animation: effect === _consts.Effect.NONE ? '' : 'an-' + effect + '-exit' },

        function () {
          if (onAfterCancel && (0, _isFunction2.default)(onAfterCancel)) {
            onAfterCancel();
          }
          if (onPopupCancel && (0, _isFunction2.default)(onPopupCancel)) {
            setTimeout(function () {onPopupCancel();}, effect === _consts.Effect.NONE ? 0 : 200);
          }
        });
      } }, { key: 'change', value: function change(

      value) {var _props$popupOptions6 =




        this.props.popupOptions,onBeforeChange = _props$popupOptions6.onBeforeChange,onAfterChange = _props$popupOptions6.onAfterChange,_props$popupOptions6$ = _props$popupOptions6.effect,effect = _props$popupOptions6$ === undefined ? _consts.Effect.NONE : _props$popupOptions6$;var
        onPopupChange = this.props.popupEvents.onPopupChange;

        if (onBeforeChange && (0, _isFunction2.default)(onBeforeChange)) {
          if (!onBeforeChange(value)) {
            return;
          }
        }

        this.setState({
          show: false,
          animation: effect === _consts.Effect.NONE ? '' : 'an-' + effect + '-exit' },

        function () {
          if (onAfterChange && (0, _isFunction2.default)(onAfterChange)) {
            onAfterChange(value);
          }
          if (onPopupChange && (0, _isFunction2.default)(onPopupChange)) {
            setTimeout(function () {onPopupChange(value);}, effect === _consts.Effect.NONE ? 0 : 200);
          }
        });
      } }, { key: 'onDeskClick', value: function onDeskClick()

      {var
        closeByClick = this.props.popupOptions.closeByClick;
        if (closeByClick) {
          this.cancel();
        }
      } }, { key: 'onResize', value: function onResize()

      {
        this.updatePosition(false);
      } }, { key: 'getWrappedComponent', value: function getWrappedComponent()

      {
        return this.wrappedComponent;
      } }, { key: 'getTarget', value: function getTarget()

      {var
        target = this.props.popupOptions.target;
        return target;
      } }, { key: 'render', value: function render()

      {var _this2 = this;var _props =





        this.props,_props$connectors = _props.connectors,connectors = _props$connectors === undefined ? {} : _props$connectors,_props$popupOptions7 = _props.popupOptions,popupOptions = _props$popupOptions7 === undefined ? {} : _props$popupOptions7,initProps = _props.initProps,rest = (0, _objectWithoutProperties3.default)(_props, ['connectors', 'popupOptions', 'initProps']);var


        showMask =



        popupOptions.showMask,showShadow = popupOptions.showShadow,className = popupOptions.className,closeByClick = popupOptions.closeByClick;var _state =





        this.state,_state$popupPosition = _state.popupPosition,popupPosition = _state$popupPosition === undefined ? { left: '-2000px', top: '-2000px' } : _state$popupPosition,dockStyle = _state.dockStyle,animation = _state.animation;

        var bindedConnectors = (0, _mapValues2.default)(connectors, function (cnn) {return function () {
            var func = cnn(_this2);
            func.apply(undefined, arguments);

            if ((0, _isFunction2.default)(initProps[cnn.name])) {
              initProps[cnn.name].apply(initProps, arguments);
            }
          };});

        return (
          _react2.default.createElement('div', null,
            (closeByClick || showMask) &&
            _react2.default.createElement('div', {
              className: (0, _utils.cls)(_templateObject,
              showMask ? 'an-popup-desk an-popup-mask' : 'an-popup-desk'),

              onMouseDown: function onMouseDown(e) {return e.preventDefault();},
              onClick: function onClick(e) {return _this2.onDeskClick(e);} }),


            _react2.default.createElement('div', {
                className: (0, _utils.cls)(_templateObject2,

                animation,
                showShadow ? 'an-popup-shadow' : '',
                className),

                style: (0, _extends3.default)({}, popupPosition),
                ref: function ref(elem) {_this2.popupItem = elem;} },

              _react2.default.createElement(WrappedComponent, (0, _extends3.default)({},
              rest,
              initProps,
              bindedConnectors, {
                dockStyle: dockStyle,
                ref: function ref(c) {_this2.wrappedComponent = c;},
                onResize: function onResize() {return _this2.onResize();} })))));




      } }]);return _class;}(_react.Component), _class.propTypes = { popupOptions: _propTypes2.default.shape({}) }, _class.childContextTypes = { intl: _reactIntl.intlShape }, _temp;};exports.default =


createPopupHOC;module.exports = exports['default'];