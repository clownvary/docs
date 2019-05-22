'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);
var _Evented2 = require('../Evented');var _Evented3 = _interopRequireDefault(_Evented2);
var _consts = require('../../consts');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


/**
                                                                                                                                     * @interface IDataSource
                                                                                                                                     * An interface that represents a list of data.
                                                                                                                                     */var
IDataSource = function (_Evented) {(0, _inherits3.default)(IDataSource, _Evented);
  function IDataSource() {(0, _classCallCheck3.default)(this, IDataSource);return (0, _possibleConstructorReturn3.default)(this, (IDataSource.__proto__ || (0, _getPrototypeOf2.default)(IDataSource)).call(this,
    'DataSource'));
  }

  /**
     * Get data list
     * @returns {array}
     */
  /* istanbul ignore next */(0, _createClass3.default)(IDataSource, [{ key: 'getData', value: function getData()
    {
      console.log('[IDataSource] Method not implemented.');
    }

    /**
       * Get key field
       * @returns {string}
       */
    /* istanbul ignore next */ }, { key: 'getKeyField', value: function getKeyField()
    {
      console.log('[IDataSource] Method not implemented.');
    }

    /**
       * Get page number
       * @returns {number}
       */
    /* istanbul ignore next */ }, { key: 'getPage', value: function getPage()
    {var pageNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      console.log(pageNumber);
      console.log('[IDataSource] Method not implemented.');
    }

    /**
       * Get total records
       * @returns {number}
       */
    /* istanbul ignore next */ }, { key: 'getTotalRecords', value: function getTotalRecords()
    {
      console.log('[IDataSource] Method not implemented.');
    }

    /**
       * Get page count
       * @returns {number}
       */
    /* istanbul ignore next */ }, { key: 'getPageCount', value: function getPageCount()
    {
      console.log('[IDataSource] Method not implemented.');
    }

    /**
       * Sort the data
       * @param fields {array}
       * @param sortOrder {string} the default order is ASC.
       */
    /* istanbul ignore next */ }, { key: 'sort', value: function sort()
    {var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];var sortOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.SortOrder.ASC;
      console.log(sortOrder);
      console.log('[IDataSource] Method not implemented.');
    }

    /**
       * Clear sort
       */
    /* istanbul ignore next */ }, { key: 'clearSort', value: function clearSort()
    {
      console.log('[IDataSource] Method not implemented.');
    }

    /**
       * Filter the data
       */
    /* istanbul ignore next */ }, { key: 'filter', value: function filter(
    filterFunc) {
      console.log(filterFunc);
      console.log('[IDataSource] Method not implemented.');
    }

    /**
       * Clear filter
       */
    /* istanbul ignore next */ }, { key: 'clearFilter', value: function clearFilter()
    {
      console.log('[IDataSource] Method not implemented.');
    } }]);return IDataSource;}(_Evented3.default);exports.default =


IDataSource;module.exports = exports['default'];