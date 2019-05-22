'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.pageProps = exports.defaultPage = exports.Page = undefined;var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _ceil = require('lodash/ceil');var _ceil2 = _interopRequireDefault(_ceil);
var _identity = require('lodash/identity');var _identity2 = _interopRequireDefault(_identity);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var pageProps = [
'pageSize',
'totalRecords',
'pageCount',
'pageNumber'];


var defaultPage = {
  pageSize: 20,
  totalRecords: 0,
  pageCount: 0,
  pageNumber: 1 };


/**
                    * @class Page
                    * A class that represents a list of data by page as the unit.
                    */var
Page = function () {

  /**
                      * @constructor
                      * @param {Arrow} data  data source list
                      * @param {String} keyField the key text of map, and the defaul value is id.
                      * @param {Number} pageSize the page size of data list, and the defaulr value is 20.
                      * @param {Number} totalRecords The whole pages by page size, and the defaulr value is 0.
                      * @param {Number} pageNumber the current page number, and the defaulr value is 0.
                      */
  function Page(data) {var pageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;var totalRecords = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;var pageNumber = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;(0, _classCallCheck3.default)(this, Page);
    this.data = data;
    this.pageSize = pageSize === 0 ? -1 : pageSize;
    this.totalRecords = totalRecords;
    this.pageCount = (0, _ceil2.default)(this.totalRecords / this.pageSize);
    this.pageNumber = pageNumber;
    this.next = _identity2.default;
  }
  /* istanbul ignore next */(0, _createClass3.default)(Page, [{ key: 'hasNext',







    /* istanbul ignore next */value: function hasNext()
    {
      return this.pageNumber < this.pageCount;
    } }, { key: 'error', get: function get() {if (this.pageNumber <= 0 || this.pageNumber > this.pageCount) {return 'Out of range';}return '';} }]);return Page;}();exports.default =


Page;exports.


Page = Page;exports.
defaultPage = defaultPage;exports.
pageProps = pageProps;