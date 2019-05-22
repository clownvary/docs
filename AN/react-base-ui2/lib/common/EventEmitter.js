'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getOwnPropertySymbols = require('babel-runtime/core-js/object/get-own-property-symbols');var _getOwnPropertySymbols2 = _interopRequireDefault(_getOwnPropertySymbols);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);
var _clone = require('lodash/clone');var _clone2 = _interopRequireDefault(_clone);
var _last = require('lodash/last');var _last2 = _interopRequireDefault(_last);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function Events() {
}

function EventListener(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}var

EventEmitter = function () {
  function EventEmitter() {var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '~';var topOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;(0, _classCallCheck3.default)(this, EventEmitter);
    this.prefix = prefix;
    this.topOnly = topOnly;
    this._events = new Events();
    this._eventsCount = 0;
  }(0, _createClass3.default)(EventEmitter, [{ key: 'eventNames', value: function eventNames()

    {var _this = this;
      var names = [];
      var events = void 0;

      /* istanbul ignore else */
      if (this._eventsCount === 0) return names;
      /* istanbul ignore next */
      this._events.keys.forEach(function (name) {return names.push(_this.prefix ? name.slice(1) : name);});

      /* istanbul ignore next */
      if (_getOwnPropertySymbols2.default) {
        return names.concat((0, _getOwnPropertySymbols2.default)(events));
      }

      /* istanbul ignore next */
      return names;
    } }, { key: 'listeners', value: function listeners(

    event, exists) {
      /* istanbul ignore next */
      var evt = this.prefix ? this.prefix + event : event;
      var available = this._events[evt];

      if (exists) return !!available;
      /* istanbul ignore else */
      if (!available) return [];
      /* istanbul ignore next */
      if (available.fn) return [available.fn];
      /* istanbul ignore next */
      return (0, _clone2.default)(available);
    } }, { key: 'emit', value: function emit(

    event) {var _this2 = this;for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {args[_key - 1] = arguments[_key];}
      /* istanbul ignore next */
      var evt = this.prefix ? this.prefix + event : event;

      if (!this._events[evt]) return false;

      var listeners = this._events[evt];
      /* istanbul ignore else */
      if (listeners.fn) {
        listeners = [listeners];
      }

      var fire = function fire(listener) {
        /* istanbul ignore if */
        if (listener.once) _this2._removeListener(event, listener.fn, undefined, true);
        listener.fn.apply(listener.context, args);
      };
      /* istanbul ignore if */
      if (this.topOnly) {
        fire((0, _last2.default)(listeners));
      } else {
        listeners.forEach(function (listener) {return fire(listener);});
      }

      return true;
    } }, { key: '_addListener', value: function _addListener(

    event, fn, context) {var once = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      /* istanbul ignore next */
      var listener = new EventListener(fn, context || this, once);
      /* istanbul ignore next */
      var evt = this.prefix ? this.prefix + event : event;

      if (!this._events[evt]) {
        this._events[evt] = listener;
        this._eventsCount = this._eventsCount + 1;
      } else if (!this._events[evt].fn) this._events[evt].push(listener);else
      {
        this._events[evt] = [this._events[evt], listener];
      }

      return this;
    } }, { key: '_removeListener', value: function _removeListener(

    event, fn, context, once) {
      /* istanbul ignore next */
      var evt = this.prefix ? this.prefix + event : event;
      /* istanbul ignore if */
      if (!this._events[evt]) return this;
      if (!fn) {
        this._eventsCount = this._eventsCount - 1;
        /* istanbul ignore if */
        if (this._eventsCount === 0) {
          this._events = new Events();
        } else {
          delete this._events[evt];
        }
        return this;
      }

      var listeners = this._events[evt];
      /* istanbul ignore if */
      if (listeners.fn) {
        listeners = [listeners];
      }

      listeners = listeners.filter(function (listener) {return listener.fn !== fn ||
        once && !listener.once ||
        context && listener.context !== context;});

      /* istanbul ignore if */
      if (listeners.length) {
        this._events[evt] = listeners.length === 1 ? listeners[0] : listeners;
      } else {
        this._eventsCount = this._eventsCount - 1;
        /* istanbul ignore if */
        if (this._eventsCount === 0) {
          this._events = new Events();
        } else {
          delete this._events[evt];
        }
      }

      return this;
    } }, { key: 'on', value: function on(

    event, fn, context) {
      return this._addListener(event, fn, context);
    } }, { key: 'once', value: function once(

    event, fn, context) {
      return this._addListener(event, fn, context, true);
    } }, { key: 'off', value: function off(

    event, fn, context, once) {
      return this._removeListener(event, fn, context, once);
    } }, { key: 'isOn', value: function isOn(

    event, fn) {
      /* istanbul ignore next */
      var evt = this.prefix ? this.prefix + event : event;

      if (!this._events[evt] || !fn) return false;

      var listeners = this._events[evt];
      /* istanbul ignore else */
      if (listeners.fn) {
        listeners = [listeners];
      }

      return listeners.some(function (listener) {return listener.fn === fn;});
    } }, { key: 'removeAllListeners', value: function removeAllListeners(

    event) {
      var evt = void 0;

      if (event) {
        /* istanbul ignore next */
        evt = this.prefix ? this.prefix + event : event;
        if (this._events[evt]) {
          this._eventsCount = this._eventsCount - 1;
          /* istanbul ignore if */
          if (this._eventsCount === 0) {
            this._events = new Events();
          } else {
            delete this._events[evt];
          }
        }
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }

      return this;
    } }]);return EventEmitter;}();exports.default =


EventEmitter;module.exports = exports['default'];