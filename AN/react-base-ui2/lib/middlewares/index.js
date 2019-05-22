'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.presetRedux = exports.thunkMiddleware = exports.promiseMiddleware = undefined;var _thunkMiddleware = require('./thunkMiddleware');var _thunkMiddleware2 = _interopRequireDefault(_thunkMiddleware);
var _promiseMiddleware = require('./promiseMiddleware');var _promiseMiddleware2 = _interopRequireDefault(_promiseMiddleware);
var _errorMiddleware = require('./errorMiddleware');var _errorMiddleware2 = _interopRequireDefault(_errorMiddleware);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var presetRedux = [
_errorMiddleware2.default,
_thunkMiddleware2.default,
_promiseMiddleware2.default];exports.



promiseMiddleware = _promiseMiddleware2.default;exports.
thunkMiddleware = _thunkMiddleware2.default;exports.
presetRedux = presetRedux;