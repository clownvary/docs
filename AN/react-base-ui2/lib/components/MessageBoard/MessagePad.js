'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);
var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _isString = require('lodash/isString');var _isString2 = _interopRequireDefault(_isString);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _Alert = require('../Alert/Alert');var _Alert2 = _interopRequireDefault(_Alert);
var _SafeText = require('../SafeText');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var


MessagePad = function (_PureComponent) {(0, _inherits3.default)(MessagePad, _PureComponent);function MessagePad() {(0, _classCallCheck3.default)(this, MessagePad);return (0, _possibleConstructorReturn3.default)(this, (MessagePad.__proto__ || (0, _getPrototypeOf2.default)(MessagePad)).apply(this, arguments));}(0, _createClass3.default)(MessagePad, [{ key: 'render', value: function render()










    {var _props =
      this.props,message = _props.message,_onClose = _props.onClose,className = _props.className;var _message$details =
      message.details,details = _message$details === undefined ? [] : _message$details,type = message.type,id = message.id,title = message.title,_message$dismissable = message.dismissable,dismissable = _message$dismissable === undefined ? false : _message$dismissable;
      var contentClass = details.length > 1 ? 'message-content' : 'message-content single-line';

      return (
        _react2.default.createElement(_Alert2.default, {
            key: id,
            type: type,
            noClose: !dismissable,
            onClose: function onClose() {return _onClose(id);},
            className: (0, _classnames2.default)('message-pad', className) },

          _react2.default.createElement('div', { className: contentClass },

            title ? _react2.default.createElement('span', { className: 'title' }, title) : undefined,


            _react2.default.createElement('ul', null,
              details.map(function (line, i) {
                if ((0, _isString2.default)(line)) {
                  return _react2.default.createElement(_SafeText.SafeText, { dangerMode: true, tagName: 'li', text: line, key: i });
                }

                return _react2.default.createElement('li', { key: i }, line);
              })))));




    } }]);return MessagePad;}(_react.PureComponent);MessagePad.displayName = 'MessagePad';MessagePad.propTypes = { message: _propTypes2.default.shape({}), onClose: _propTypes2.default.func };MessagePad.defaultProps = {};exports.default =


MessagePad;module.exports = exports['default'];