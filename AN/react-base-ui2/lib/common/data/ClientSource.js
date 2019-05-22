'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);
var _size = require('lodash/size');var _size2 = _interopRequireDefault(_size);
var _isEmpty = require('lodash/isEmpty');var _isEmpty2 = _interopRequireDefault(_isEmpty);
var _isArray = require('lodash/isArray');var _isArray2 = _interopRequireDefault(_isArray);
var _isNumber = require('lodash/isNumber');var _isNumber2 = _interopRequireDefault(_isNumber);
var _filter2 = require('lodash/filter');var _filter3 = _interopRequireDefault(_filter2);
var _chunk = require('lodash/chunk');var _chunk2 = _interopRequireDefault(_chunk);
var _sortBy = require('lodash/sortBy');var _sortBy2 = _interopRequireDefault(_sortBy);
var _reverse = require('lodash/reverse');var _reverse2 = _interopRequireDefault(_reverse);
var _Page = require('./Page');var _Page2 = _interopRequireDefault(_Page);
var _DataSource2 = require('./DataSource');var _DataSource3 = _interopRequireDefault(_DataSource2);
var _consts = require('../../consts');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                     * @class ClientSource
                                                                                                                                     * A class that represents a list of data.
                                                                                                                                     * @extends {DataSource}
                                                                                                                                     */var
ClientSource = function (_DataSource) {(0, _inherits3.default)(ClientSource, _DataSource);

  /**
                                                                                            * @constructor
                                                                                            * @param {map} data  data source list
                                                                                            * @param {String} keyField the key text of map.
                                                                                            * @param {Number} pageSize the page size of data list, and the defaulr value is 20.
                                                                                            */
  function ClientSource(data, keyField) {var pageSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;(0, _classCallCheck3.default)(this, ClientSource);
    if ((0, _isNumber2.default)(keyField)) {
      pageSize = keyField;
      keyField = 'id';
    }var _this = (0, _possibleConstructorReturn3.default)(this, (ClientSource.__proto__ || (0, _getPrototypeOf2.default)(ClientSource)).call(this,
    keyField, pageSize));
    _this.setData(data);return _this;
  }(0, _createClass3.default)(ClientSource, [{ key: 'setData', value: function setData(

    data) {
      this.rawData = data;
      this.data = data;
      this.filteredData = null;
      this.sortFields = null;
      this.sortOrder = _consts.SortOrder.ASC;
      this.initChunks();
    } }, { key: 'initChunks', value: function initChunks()

    {
      if (this.pageSize > 0 && (0, _isArray2.default)(this.data)) {
        this.chunks = (0, _chunk2.default)(this.data, this.pageSize);
      }
    }

    /** @inheritdoc */ }, { key: 'getData', value: function getData()
    {
      return this.delayGet(new _Page2.default(this.data));
    }

    /** @inheritdoc */ }, { key: 'getPage', value: function getPage()
    {var _this2 = this;var pageNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      /* istanbul ignore next */
      var data = this.getChunk(pageNumber) || [];
      /* istanbul ignore next */
      if (!data) {
        throw new Error('Chunk is not initialized');
      }

      var page = new _Page2.default(data, this.pageSize, this.getTotalRecords(), pageNumber);
      /* istanbul ignore next */
      page.next = function () {return _this2.getPage(pageNumber + 1);};

      return this.delayGet(page);
    }

    /** @inheritdoc */ }, { key: 'getTotalRecords', value: function getTotalRecords()
    {
      return (0, _size2.default)(this.data || []);
    }

    /** @inheritdoc */ }, { key: 'getPageCount', value: function getPageCount()
    {
      return this.getChunksCount();
    }

    /** @inheritdoc */ }, { key: 'sort', value: function sort()
    {var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];var sortOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.SortOrder.ASC;
      if ((0, _isEmpty2.default)(fields) || sortOrder === _consts.SortOrder.ORIGIN) {
        this.clearSort();
      } else {
        this.sortFields = fields;
        this.sortOrder = sortOrder;
        this.doSort();
      }
    }

    /** @inheritdoc */ }, { key: 'clearSort', value: function clearSort()
    {
      this.sortFields = null;
      this.sortOrder = _consts.SortOrder.ORIGIN;
      this.doSort();
    }

    /** @inheritdoc */ }, { key: 'filter', value: function filter(
    filterFunc) {
      /* istanbul ignore next */
      this.filteredData = (0, _filter3.default)(this.rawData || [], filterFunc);
      this.doSort();
    }

    /** @inheritdoc */ }, { key: 'clearFilter', value: function clearFilter()
    {
      this.filteredData = null;
      this.doSort();
    }

    /** @inheritdoc */ }, { key: 'doSort', value: function doSort()
    {
      /* istanbul ignore next */
      var data = this.filteredData || this.rawData || [];
      var sortedData = data;
      if (!(0, _isEmpty2.default)(this.sortFields) && this.sortOrder !== _consts.SortOrder.ORIGIN) {
        sortedData = (0, _sortBy2.default)(data, this.sortFields);
        if (this.sortOrder === _consts.SortOrder.DESC) {
          sortedData = (0, _reverse2.default)(sortedData);
        }
      }

      this.data = sortedData;
      this.initChunks();
    } }]);return ClientSource;}(_DataSource3.default);exports.default =


ClientSource;module.exports = exports['default'];