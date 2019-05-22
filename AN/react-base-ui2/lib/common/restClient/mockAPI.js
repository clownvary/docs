'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.cleanMock = exports.mockAPI = undefined;var _promise = require('babel-runtime/core-js/promise');var _promise2 = _interopRequireDefault(_promise);var _find = require('lodash/find');var _find2 = _interopRequireDefault(_find);
var _isArray = require('lodash/isArray');var _isArray2 = _interopRequireDefault(_isArray);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _isPromise = require('../../utils/isPromise');var _isPromise2 = _interopRequireDefault(_isPromise);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var mockedData = [];
var callRecords = {};

/* istanbul ignore next */
window.__API_Hook__ = function (path) {
  var time = (callRecords[path] || 0) + 1;
  callRecords[path] = time;

  var data = (0, _find2.default)(mockedData, { path: path, time: time }) || (0, _find2.default)(mockedData, { path: path });
  var result = data ? data.result : data;

  if (result) {
    console.warn('Matching API Hook on path: ' + path + ' (' + time + ') times');
  }

  return result;
};

/** Explicily clean up the API hooks
    *
    */
var cleanMock = function cleanMock() {
  mockedData = [];
  callRecords = {};
};

/** Mock up a batch of API calls
    * @param {Array} - data An array of API matching rule and result data
    *
    * Parameter data can be an object or an array of objects that define the matching
    * rules and mocked result.
    * The object has format as below:
    * {
    *  path: '/json/Cart/loadReservationCart.json',
    *  time: 2,
    *  result: { headers: {}, body: {}}
    * }
    *
    * in which,
    * - path: Path to match. We use strict matching.
    * - time: Optional. Not mean date time, but how many times the API is called.
    * - result: An object with headers & body which follow our response format from
    * server or a redirected path to a new JSON file.
    *
    * @param {Function} - caseCaller An callback function, it will help to call cleanMock at the
    * end of promise chain.
    *
    * For example(have caseCaller):
    * ```js
    * mockAPI({
    *   path: 'json/Cart/Checkout/get_agreement.json',
    *   result: 'json/Cart/Checkout/get_agreement_error.json'
    * }, () => store.dispatch(getAgreementAsyncAction()).catch((e) => {
    *   //...
    *   done();
    * }));
    * ```
    *
    * For example(no caseCaller):
    * ```js
    * mockAPI({
    *   path: 'json/Cart/Checkout/get_agreement.json',
    *   result: 'json/Cart/Checkout/get_agreement_error.json'
    * });
    *
    * store.dispatch(getAgreementAsyncAction()).catch((e) => {
    *   //...
    *   cleanMock();
    *   done();
    * }));
    * ```
    *
    */
var mockAPI = function mockAPI(data, caseCaller) {
  mockedData = (0, _isArray2.default)(data) ? data : [data];
  callRecords = {};

  if (caseCaller && (0, _isFunction2.default)(caseCaller)) {
    var promise = caseCaller();

    (0, _isPromise2.default)(promise) && promise.then(cleanMock).catch(function (e) {
      cleanMock();
      return _promise2.default.reject(e);
    });
  }
};exports.


mockAPI = mockAPI;exports.
cleanMock = cleanMock;exports.default =


mockAPI;