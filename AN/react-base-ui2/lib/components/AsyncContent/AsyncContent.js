'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _promise = require('babel-runtime/core-js/promise');var _promise2 = _interopRequireDefault(_promise);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _consts = require('../../consts');
var _createAsyncContent = require('./createAsyncContent');var _createAsyncContent2 = _interopRequireDefault(_createAsyncContent);
var _PlaceHolderType = require('./consts/PlaceHolderType');var PlaceHolderType = _interopRequireWildcard(_PlaceHolderType);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Default Props for AsyncContent
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */
var AsyncContentProps = {
  /**
                           * Defines the unique id for automation test
                           */
  'data-qa-id': 'AsyncContent',
  /**
                                 * Determines the prefix for CSS class names
                                 */
  prefix: _consts.DefaultCSSPrefix + '-',
  loader: function loader() {return _promise2.default.resolve();},
  /**
                                                                    * The default charactor when loading.
                                                                    */
  placeHolder: 'loading',
  /**
                           * The type of Placeholder.
                           */
  placeHolderType: PlaceHolderType.TEXT };

var AsyncContentPropTypes = {
  /**
                               * Defines the unique id for automation test
                               */
  'data-qa-id': _propTypes2.default.string,
  /**
                                             * Determines the prefix for CSS class names
                                             */
  prefix: _propTypes2.default.string,
  /**
                                       * Async component will be rendered
                                       */
  component: _propTypes2.default.node,
  /**
                                        * Contains the job need be executed.
                                        */
  loader: _propTypes2.default.func,
  /**
                                     * The default charactor when loading.
                                     */
  placeHolder: _propTypes2.default.string,
  /**
                                            * The type of Placeholder.
                                            */
  placeHolderType: _propTypes2.default.oneOf([
  PlaceHolderType.TEXT, PlaceHolderType.ICON]) };


/** AsyncContent is an UI component that can display content in waiting and show manner.*/var
AsyncContent = function (_React$PureComponent) {(0, _inherits3.default)(AsyncContent, _React$PureComponent);function AsyncContent() {(0, _classCallCheck3.default)(this, AsyncContent);return (0, _possibleConstructorReturn3.default)(this, (AsyncContent.__proto__ || (0, _getPrototypeOf2.default)(AsyncContent)).apply(this, arguments));}(0, _createClass3.default)(AsyncContent, [{ key: 'render',


    /** The default Props*/value: function render()


    {var _props =






      this.props,placeHolder = _props.placeHolder,loader = _props.loader,prefix = _props.prefix,component = _props.component,dataQAId = _props['data-qa-id'],placeHolderType = _props.placeHolderType;
      var newComponent = (0, _createAsyncContent2.default)(function () {return loader().then(function () {return component;});},
      { placeHolder: placeHolder, prefix: prefix, 'data-qa-id': dataQAId, placeHolderType: placeHolderType });
      return _react2.default.createElement(newComponent);
    } /** The display name*/ }]);return AsyncContent;}(_react2.default.PureComponent);AsyncContent.displayName = 'AsyncContent';AsyncContent.defaultProps = AsyncContentProps;AsyncContent.propTypes = AsyncContentPropTypes;exports.default =

AsyncContent;module.exports = exports['default'];