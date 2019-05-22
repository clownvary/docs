'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);

var _consts = require('../../consts');
var _utils = require('../../utils');
var _PlaceHolder = require('./PlaceHolder');
var _PlaceHolderType = require('./consts/PlaceHolderType');var PlaceHolderType = _interopRequireWildcard(_PlaceHolderType);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

DATA_QA_ID = _consts.CustomAttr.DATA_QA_ID;exports.default =

function (loader, _ref) {var placeHolder = _ref.placeHolder,prefix = _ref.prefix,dataQAID = _ref[DATA_QA_ID],placeHolderType = _ref.placeHolderType;return function (_React$Component) {(0, _inherits3.default)(asyncContent, _React$Component);

    function asyncContent() {(0, _classCallCheck3.default)(this, asyncContent);var _this = (0, _possibleConstructorReturn3.default)(this, (asyncContent.__proto__ || (0, _getPrototypeOf2.default)(asyncContent)).call(this));

      _this.state = {
        component: null };


      _this.mounting = true;return _this;
    }(0, _createClass3.default)(asyncContent, [{ key: 'componentDidMount', value: function componentDidMount()

      {var _this2 = this;
        if (!(0, _isFunction2.default)(loader) && !(0, _utils.isPromise)(loader)) {
          return console.error('asyncContent: Loader is not function or promise');
        }

        var component = (0, _isFunction2.default)(loader) ? loader() : loader;

        if (!(0, _utils.isPromise)(component)) {
          return console.error('asyncContent: Loader doesn\'t return a promise');
        }

        return component.
        then(function (module) {return _this2.mounting && _this2.setState({ component: module });}).
        catch(function (err) {return console.error('asyncContent: Loading failed', err);});
      } }, { key: 'componentWillUnmount', value: function componentWillUnmount()

      {
        this.mounting = false;
      } }, { key: 'renderLoader', value: function renderLoader()

      {
        switch (placeHolderType) {
          case PlaceHolderType.ICON:
            return (0, _PlaceHolder.iconPlaceHolder)(placeHolder);
          case PlaceHolderType.TEXT:
          default:
            return (0, _PlaceHolder.textPlaceHolder)(placeHolder);}

      } }, { key: 'render', value: function render()

      {var
        component = this.state.component;

        return (
          _react2.default.createElement('div', {
              className: prefix + 'asynccontent',
              'data-qa-id': dataQAID },

            component || this.renderLoader()));

      } }]);return asyncContent;}(_react2.default.Component);};module.exports = exports['default'];