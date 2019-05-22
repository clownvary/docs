'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _promise = require('babel-runtime/core-js/promise');var _promise2 = _interopRequireDefault(_promise);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);
var _size = require('lodash/size');var _size2 = _interopRequireDefault(_size);
var _isArray = require('lodash/isArray');var _isArray2 = _interopRequireDefault(_isArray);
var _IDataSource2 = require('./IDataSource');var _IDataSource3 = _interopRequireDefault(_IDataSource2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


/**
                                                                                                                                                                                                      * @class DataSource
                                                                                                                                                                                                      * A class that represents a list of data.
                                                                                                                                                                                                      * @implements {IDataSource}
                                                                                                                                                                                                      */var
DataSource = function (_IDataSource) {(0, _inherits3.default)(DataSource, _IDataSource);
  /**
                                                                                           * @constructor
                                                                                           * @param {String} keyField the key text of map, and the defaul value is id.
                                                                                           * @param {Number} pageSize the page size of data list, and the defaulr value is 20.
                                                                                           */
  function DataSource() {var keyField = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'id';var pageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;(0, _classCallCheck3.default)(this, DataSource);var _this = (0, _possibleConstructorReturn3.default)(this, (DataSource.__proto__ || (0, _getPrototypeOf2.default)(DataSource)).call(this));


    _this.keyField = keyField;
    _this.pageSize = pageSize;
    _this.chunks = null;return _this;
  }

  /** @inheritdoc */(0, _createClass3.default)(DataSource, [{ key: 'getKeyField', value: function getKeyField()
    {
      return this.keyField;
    } }, { key: 'initChunks', value: function initChunks()

    {
      this.chunks = [];
    } }, { key: 'cleanChunks', value: function cleanChunks()

    {
      this.chunks = null;
    } }, { key: 'getChunk', value: function getChunk(

    index) {
      if (!(0, _isArray2.default)(this.chunks)) {
        return null;
      }
      /* istanbul ignore next */
      var data = index >= 0 ||
      index <= this.getChunksCount() ? this.chunks[index - 1] : [];
      return data;
    } }, { key: 'getChunksCount', value: function getChunksCount()

    {
      return (0, _size2.default)(this.chunks);
    } }, { key: 'delayGet', value: function delayGet(

    o) {
      return new _promise2.default(function (resolve) {
        resolve(o);
      });
    } }]);return DataSource;}(_IDataSource3.default);exports.default =


DataSource;module.exports = exports['default'];