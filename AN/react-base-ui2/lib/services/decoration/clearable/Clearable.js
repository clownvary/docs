'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _isString = require('lodash/isString');var _isString2 = _interopRequireDefault(_isString);
var _isElement = require('lodash/isElement');var _isElement2 = _interopRequireDefault(_isElement);
var _dom = require('../../../utils/dom');
var _consts = require('../../../consts');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var defaultOptions = {
  trigger: _consts.Trigger.FOCUS };var


Clearable = function () {


  function Clearable(el, options) {(0, _classCallCheck3.default)(this, Clearable);
    this.element = (0, _isString2.default)(el) ? document.querySelector(el) : el;

    if (!this.element || !(0, _isElement2.default)(this.element)) {
      throw new Error('Invalid target element');
    }

    this.options = (0, _extends3.default)({}, defaultOptions, options);
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

  /* istanbul ignore next */(0, _createClass3.default)(Clearable, [{ key: 'onMouseEnter', value: function onMouseEnter()
    {
      this.show();
    }

    /* istanbul ignore next */ }, { key: 'onMouseLeave', value: function onMouseLeave()
    {
      if (this.hasTrigger(_consts.Trigger.FOCUS)) {
        if (document.activeElement === this.element) {
          return;
        }
      }
      this.hide();
    } }, { key: 'onFocus', value: function onFocus()

    {
      this.show();
    } }, { key: 'onBlur', value: function onBlur()

    {
      this.hide();
    } }, { key: 'onMouseMove', value: function onMouseMove(

    e) {var _options$paddingRight =
      this.options.paddingRight,paddingRight = _options$paddingRight === undefined ? 0 : _options$paddingRight;
      var xWidth = 20;
      var pos = paddingRight + xWidth;

      var onX = this.element.offsetWidth - pos <
      e.clientX - this.element.getBoundingClientRect().left;

      if (onX) {
        (0, _dom.addClass)(this.element, 'onX');
      } else {
        (0, _dom.removeClass)(this.element, 'onX');
      }
    } }, { key: 'onClick', value: function onClick(

    e) {
      if ((0, _dom.hasClass)(this.element, 'onX')) {var
        onClear = this.options.onClear;

        if ((0, _isFunction2.default)(onClear)) {
          onClear();
        }

        e.stopPropagation();
        e.preventDefault();
      }
    } }, { key: 'hasTrigger', value: function hasTrigger(

    t) {
      /* istanbul ignore next */var _options$trigger =
      this.options.trigger,trigger = _options$trigger === undefined ? _consts.Trigger.FOCUS : _options$trigger;
      var triggers = trigger.split('|');
      return triggers.some(function (v) {return v.trim() === t;});
    } }, { key: 'enable', value: function enable()

    {
      if (this.on) {
        throw new Error('Already enabled');
      }

      this.disable();

      if (this.hasTrigger(_consts.Trigger.FOCUS)) {
        this.element.addEventListener('focus', this.onFocus);
        this.element.addEventListener('blur', this.onBlur);
      }

      if (this.hasTrigger(_consts.Trigger.HOVER)) {
        this.element.addEventListener('mouseenter', this.onFocus);
        this.element.addEventListener('mouseleave', this.onBlur);
      }

      this.element.addEventListener('mousemove', this.onMouseMove);
      this.element.addEventListener('click', this.onClick);

      (0, _dom.addClass)(this.element, 'an-clearable');
      if (this.options.noEffect) {
        (0, _dom.addClass)(this.element, 'no-effect');
      }
      this.on = true;
    } }, { key: 'disable', value: function disable()

    {
      (0, _dom.removeClass)(this.element, 'an-clearable');
      if (this.options.noEffect) {
        (0, _dom.removeClass)(this.element, 'no-effect');
      }

      this.element.removeEventListener('focus', this.onFocus);
      this.element.removeEventListener('blur', this.onBlur);
      this.element.removeEventListener('mouseenter', this.onFocus);
      this.element.removeEventListener('mouseleave', this.onBlur);
      this.element.removeEventListener('mousemove', this.onMouseMove);
      this.element.removeEventListener('click', this.onClick);
      this.on = false;
    } }, { key: 'show', value: function show()

    {
      (0, _dom.addClass)(this.element, 'x');
    } }, { key: 'hide', value: function hide()

    {
      (0, _dom.removeClass)(this.element, 'x');
    } }]);return Clearable;}();Clearable.tag = '__an_clearable';exports.default =



Clearable;module.exports = exports['default'];