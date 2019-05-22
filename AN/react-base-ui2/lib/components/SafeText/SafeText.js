'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _utils = require('../../utils');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var supportedTextTags = ['span', 'div', 'li', 'label', 'p', 'button'];var

SafeText = function (_React$PureComponent) {(0, _inherits3.default)(SafeText, _React$PureComponent);function SafeText() {(0, _classCallCheck3.default)(this, SafeText);return (0, _possibleConstructorReturn3.default)(this, (SafeText.__proto__ || (0, _getPrototypeOf2.default)(SafeText)).apply(this, arguments));}(0, _createClass3.default)(SafeText, [{ key: 'render',



    /**
                                                                                                                                                                                                                                                                                                                                                                              * Default Props of SafeText.
                                                                                                                                                                                                                                                                                                                                                                              */value: function render()


















    {var _props =






      this.props,_props$text = _props.text,text = _props$text === undefined ? '' : _props$text,_props$tagName = _props.tagName,tagName = _props$tagName === undefined ? 'span' : _props$tagName,decode = _props.decode,dangerMode = _props.dangerMode,rest = (0, _objectWithoutProperties3.default)(_props, ['text', 'tagName', 'decode', 'dangerMode']);

      var Tag = '' + tagName;
      var s = decode ? (0, _utils.decodeHtmlStr)(text) : text;
      var newProps = (0, _extends3.default)({},
      rest);


      if (dangerMode) {
        newProps.dangerouslySetInnerHTML = { __html: s };
      }

      return (
        _react2.default.createElement(Tag, newProps,
          dangerMode ? null : s));


    } /** the name of the component */ }]);return SafeText;}(_react2.default.PureComponent);SafeText.displayName = 'SafeText';SafeText.defaultProps = { /**
                                                                                                                                                         * @type {String}
                                                                                                                                                         * @desc defined the unique id for usage of automation test
                                                                                                                                                         */'data-qa-id': '', tagName: 'span', decode: true, dangerMode: false };SafeText.propTypes = { 'data-qa-id': _propTypes2.default.string, tagName: _propTypes2.default.oneOf(supportedTextTags), decode: _propTypes2.default.bool, dangerMode: _propTypes2.default.bool };exports.default = SafeText;module.exports = exports['default'];