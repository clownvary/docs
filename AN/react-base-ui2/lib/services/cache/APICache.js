'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _promise = require('babel-runtime/core-js/promise');var _promise2 = _interopRequireDefault(_promise);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _isArray = require('lodash/isArray');var _isArray2 = _interopRequireDefault(_isArray);
var _size = require('lodash/size');var _size2 = _interopRequireDefault(_size);
var _filter2 = require('lodash/filter');var _filter3 = _interopRequireDefault(_filter2);
var _chunk = require('lodash/chunk');var _chunk2 = _interopRequireDefault(_chunk);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var


APICache = function () {
  function APICache() {var pageSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;(0, _classCallCheck3.default)(this, APICache);
    this.pageSize = pageSize;
    this.data = [];
    this.filteredData = null;
    this.chunks = [];
  }(0, _createClass3.default)(APICache, [{ key: 'paginate', value: function paginate()

    {
      this.chunks = (0, _chunk2.default)(this.filteredData || this.data || [], this.pageSize);
    } }, { key: 'init', value: function init()









    {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      if (!(0, _isArray2.default)(data)) {
        data = [];
      }
      this.data = data;
      this.filteredData = null;
      this.paginate();
    } }, { key: 'filter', value: function filter(

    predicate) {
      this.filteredData = (0, _filter3.default)(this.data, predicate);
      this.paginate();
    } }, { key: 'clearFilter', value: function clearFilter()

    {
      this.filteredData = null;
      this.paginate();
    } }, { key: 'getPage', value: function getPage()

    {var pageNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var pageIndex = Math.min(this.pageCount, pageNumber) - 1;
      var data = pageIndex >= 0 ? this.chunks[pageIndex] : [];
      return data;
    } }, { key: 'getPageByReq', value: function getPageByReq(

    req) {var _this = this;var



      page_number =


      req.headers.page_info.page_number;

      var data = this.getPage(page_number);
      var result = new _promise2.default(function (resolve) {
        var response = {
          payload: {
            headers: {
              response_code: '0000',
              response_message: 'Successful',
              page_info: {
                order_by: '',
                total_records: _this.totalRecords,
                total_records_per_page: _this.pageSize,
                page_number: page_number,
                order_option: 'ASC',
                total_page: _this.pageCount } },


            body: {
              items: data,
              timestamp: new Date().getTime() } } };




        resolve(response);
      });

      return result;
    } }, { key: 'pageCount', get: function get() {return (0, _size2.default)(this.chunks);} }, { key: 'totalRecords', get: function get() {return (0, _size2.default)(this.filteredData || this.data || []);} }]);return APICache;}();exports.default =


APICache;module.exports = exports['default'];