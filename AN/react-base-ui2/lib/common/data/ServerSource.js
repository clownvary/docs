'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _promise = require('babel-runtime/core-js/promise');var _promise2 = _interopRequireDefault(_promise);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _isNumber = require('lodash/isNumber');var _isNumber2 = _interopRequireDefault(_isNumber);
var _size = require('lodash/size');var _size2 = _interopRequireDefault(_size);
var _has = require('lodash/has');var _has2 = _interopRequireDefault(_has);
var _get = require('lodash/get');var _get2 = _interopRequireDefault(_get);
var _fill = require('lodash/fill');var _fill2 = _interopRequireDefault(_fill);
var _Page = require('./Page');var _Page2 = _interopRequireDefault(_Page);
var _DataSource2 = require('./DataSource');var _DataSource3 = _interopRequireDefault(_DataSource2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


var defaultPageParser = function defaultPageParser(response) {var


  data =

  response.body.items;

  if ((0, _has2.default)(response, ['headers', 'page_info'])) {
    var pageInfo = (0, _get2.default)(response, ['headers', 'page_info']);var

    pageNumber =


    pageInfo.page_number,pageSize = pageInfo.total_records_per_page,totalRecords = pageInfo.total_records;

    return new _Page2.default(data, pageSize, totalRecords, pageNumber);
  }

  return new _Page2.default(data);
};

/**
    * @class ServerSource
    * A class that can send a api to server to get data list.
    * @extends {DataSource}
    */var
ServerSource = function (_DataSource) {(0, _inherits3.default)(ServerSource, _DataSource);

  /**
                                                                                             * @constructor
                                                                                             * @param {Fuction} api the url that send to server to get data list.
                                                                                             * @param {Fuction} pageParser  parse page detail, and the default value is defaultPageParser.
                                                                                             * @param {Arrow} data  data source list.
                                                                                             * @param {String} keyField the key text of map.
                                                                                             * @param {Number} pageSize the page size of data list, and the defaulr value is 20.
                                                                                             */
  function ServerSource(api) {var pageParser = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultPageParser;var keyField = arguments[2];var pageSize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 20;(0, _classCallCheck3.default)(this, ServerSource);
    if ((0, _isNumber2.default)(keyField)) {
      pageSize = keyField;
      keyField = 'id';
    }var _this = (0, _possibleConstructorReturn3.default)(this, (ServerSource.__proto__ || (0, _getPrototypeOf2.default)(ServerSource)).call(this,
    keyField, pageSize));

    _this.pageMode = pageSize > 1;
    _this.totalRecords = 0;
    _this.setApi(api, pageParser);return _this;
  }(0, _createClass3.default)(ServerSource, [{ key: 'setApi', value: function setApi(

    api) {var pageParser = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultPageParser;
      if (!(0, _isFunction2.default)(api)) {
        throw new Error('Invalid API');
      }

      this.api = api;
      this.data = null;
      this.pageParser = pageParser;
    }
    /* istanbul ignore next */ }, { key: 'initChunks', value: function initChunks(
    page) {
      if (this.pageMode && page) {
        if (!this.chunks) {
          this.chunks = (0, _fill2.default)(Array(page.pageCount), null);
          this.totalRecords = page.totalRecords;
        }

        // cache the page in chunk
        this.chunks[page.pageNumber - 1] = page;
      } else {
        this.chunks = null;
      }
    } }, { key: 'isLoaded', value: function isLoaded()

    {
      return this.pageMode ? !!this.chunks : !!this.data;
    }

    /** @inheritdoc */ }, { key: 'getData', value: function getData(
    params) {
      if (this.pageMode) {
        throw new Error('Can not get all data in page mode.');
      }

      if (!this.data) {
        return this.loadPage(0, params);
      }

      return this.delayGet(new _Page2.default(this.data));
    }

    /** @inheritdoc */ }, { key: 'getPage', value: function getPage()
    {var pageNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;var params = arguments[1];
      if (!this.pageMode) {
        throw new Error('Can not get page in flat mode.');
      }

      var page = this.getChunk(pageNumber);
      if (page) {
        return this.delayGet(page);
      }

      return this.loadPage(pageNumber, params);
    }

    /** @inheritdoc */ }, { key: 'getTotalRecords', value: function getTotalRecords()
    {
      if (this.isLoaded()) {
        throw new Error('Can not call this method before loaded.');
      }

      if (this.pageMode) {
        return this.totalRecords;
      }

      return (0, _size2.default)(this.data || []);
    }

    /** @inheritdoc */ }, { key: 'getPageCount', value: function getPageCount()
    {
      if (!this.pageMode || this.isLoaded()) {
        throw new Error('Non page mode or data is not loaded.');
      }

      return (0, _size2.default)(this.chunks);
    }
    /* istanbul ignore next */ }, { key: 'loadPage', value: function loadPage()
    {var _this2 = this;var pageNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (pageNumber > 0) {
        params.pageNumber = pageNumber;
      }

      this.triggerEvent('beforeLoad', params);
      var result = new _promise2.default(function (resolve, reject) {
        _this2.api(params).then(function (response) {
          var page = _this2.pageParser(response);
          page.pageNumber = pageNumber;
          page.next = function () {return _this2.getPage(pageNumber + 1);};

          if (_this2.pageMode) {
            _this2.initChunks(page);
          }

          _this2.triggerEvent('afterLoad', page);
          resolve(page);
        }).
        catch(function (error) {return reject(error);});
      });

      return result;
    } }]);return ServerSource;}(_DataSource3.default);exports.default =




ServerSource;module.exports = exports['default'];