'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _throttle = require('lodash/throttle');var _throttle2 = _interopRequireDefault(_throttle);
var _forEach = require('lodash/forEach');var _forEach2 = _interopRequireDefault(_forEach);
var _isNil = require('lodash/isNil');var _isNil2 = _interopRequireDefault(_isNil);
var _dom = require('../../utils/dom');
var _browser = require('../../utils/browser');var _browser2 = _interopRequireDefault(_browser);
var _Orientation = require('../../consts/Orientation');var Orientation = _interopRequireWildcard(_Orientation);
var _EventEmitter = require('../../common/EventEmitter');var _EventEmitter2 = _interopRequireDefault(_EventEmitter);
var _RangeName = require('./consts/RangeName');var RangeName = _interopRequireWildcard(_RangeName);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var defaultBreakpoints = [960, 768];
var defaultRangeNames = [
RangeName.SCREEN_LARGE,
RangeName.SCREEN_MEDIUM,
RangeName.SCREEN_SMALL];var


Responsive = function () {(0, _createClass3.default)(Responsive, null, [{ key: 'getInstance', value: function getInstance()



    {
      if (!Responsive.instance) {
        Responsive.instance = new Responsive();
      }
      return Responsive.instance;
    } }]);

  function Responsive() {(0, _classCallCheck3.default)(this, Responsive);
    this.config = {
      rangeNames: defaultRangeNames,
      breakpoints: defaultBreakpoints };

    this.emitter = new _EventEmitter2.default('responsive~');
    window.addEventListener('resize', (0, _throttle2.default)(this.onResize.bind(this), 300));
    window.addEventListener('orientationchange', this.onOrientationChange.bind(this));
  }(0, _createClass3.default)(Responsive, [{ key: 'isLg', value: function isLg()

    {
      return this.getRangeName() === RangeName.SCREEN_LARGE;
    } }, { key: 'isMd', value: function isMd()

    {
      return this.getRangeName() === RangeName.SCREEN_MEDIUM;
    } }, { key: 'isSm', value: function isSm()

    {
      return this.getRangeName() === RangeName.SCREEN_SMALL;
    } }, { key: 'getOrientation', value: function getOrientation()

    {
      var orientation = '';
      if (!(0, _isNil2.default)(window.orientation)) {
        if (window.orientation === 0 || window.orientation === 180) {// Landscape Mode
          /* istanbul ignore next */
          orientation = _browser2.default.android ? Orientation.LANDSCAPE : Orientation.PORTRAIT;
        } else if (window.orientation === 90 || window.orientation === -90) {// Portrait Mode
          /* istanbul ignore next */
          orientation = _browser2.default.android ? Orientation.PORTRAIT : Orientation.LANDSCAPE;
        }
      }

      return orientation;
    } }, { key: '_getState', value: function _getState()

    {
      return {
        orientation: this.getOrientation(),
        rangeName: this.getRangeName(),
        screenWidth: this.getScreenWidth(),
        isLg: this.isLg(),
        isMd: this.isMd(),
        isSm: this.isSm() };

    } }, { key: 'onOrientationChange', value: function onOrientationChange()

    {
      this.handleChange('orientationchange', true);
    } }, { key: 'onResize', value: function onResize()

    {
      this.handleChange('resize');
    } }, { key: 'handleChange', value: function handleChange()

    {var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'resize';var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var rangeName = this.getRangeName();

      if (force || this.rangeName !== rangeName) {
        this.rangeName = rangeName;
        this.emitter.emit(event, (0, _extends3.default)({},
        this._getState()));

      }
    } }, { key: 'getRangeName', value: function getRangeName()

    {var _config =
      this.config,rangeNames = _config.rangeNames,breakpoints = _config.breakpoints;
      var screenWidth = this.getScreenWidth();
      var length = breakpoints.length;
      var name = rangeNames[0];

      (0, _forEach2.default)(breakpoints, function (value, i) {
        if (screenWidth >= breakpoints[i + 1] && screenWidth < value) {
          name = rangeNames[i + 1];
        } else if (screenWidth < breakpoints[length - 1]) {
          name = rangeNames[length];
        } else if (screenWidth > breakpoints[0]) {
          name = rangeNames[0];
        }
      });
      return name;
    } }, { key: 'getScreenWidth', value: function getScreenWidth()

    {
      return (0, _dom.outerWidth)(window);
    }

    // supports two events: resize and orientationchange
  }, { key: 'addEventListener', value: function addEventListener(event) {var _emitter;for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {args[_key - 1] = arguments[_key];}
      (_emitter = this.emitter).on.apply(_emitter, [event].concat(args));
    } }, { key: 'removeEventListener', value: function removeEventListener(

    event) {var _emitter2;for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {args[_key2 - 1] = arguments[_key2];}
      (_emitter2 = this.emitter).off.apply(_emitter2, [event].concat(args));
    } }, { key: 'setConfig', value: function setConfig(

    config) {
      config = config || {};
      config.rangeNames = config.rangeNames || defaultRangeNames;
      config.breakpoints = config.breakpoints || defaultBreakpoints;
      if (config.rangeNames.length - config.breakpoints.length === 1) {
        this.config = config;
        this.handleChange('resize', true);
      }
    } }, { key: 'getConfig', value: function getConfig()

    {
      return this.config;
    } }]);return Responsive;}();Responsive.instance = null;exports.default = Responsive;module.exports = exports['default'];