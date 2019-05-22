'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);

var _consts = require('../../consts');
var _utils = require('../../utils');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var HeaderPropTypes = {
  onPrevClick: _propTypes2.default.func.isRequired,
  onNextClick: _propTypes2.default.func.isRequired,
  onTitleClick: _propTypes2.default.func.isRequired,
  onTodayClick: _propTypes2.default.func.isRequired,

  title: _propTypes2.default.string.isRequired,
  displayToday: _propTypes2.default.bool.isRequired,
  todayLabel: _propTypes2.default.string.isRequired,
  prefix: _propTypes2.default.string.isRequired };var


Header = function (_React$PureComponent) {(0, _inherits3.default)(Header, _React$PureComponent);function Header() {(0, _classCallCheck3.default)(this, Header);return (0, _possibleConstructorReturn3.default)(this, (Header.__proto__ || (0, _getPrototypeOf2.default)(Header)).apply(this, arguments));}(0, _createClass3.default)(Header, [{ key: 'render', value: function render()



    {var _this2 = this;
      return (
        _react2.default.createElement('div', { className: this.props.prefix + 'calendar-header' },
          _react2.default.createElement('i', {
            className: 'icon icon-chevron-left',
            onClick: this.props.onPrevClick,
            tabIndex: 0,
            onKeyDown: function onKeyDown(e) {return (0, _utils.listenKeyDown)(e,
              [_consts.KeyCode.ENTER, _consts.KeyCode.SPACE],
              function () {return _this2.props.onPrevClick();});} }),



          this.props.displayToday &&
          _react2.default.createElement('span', {
              className: this.props.prefix + 'calendar-header-today',
              onClick: this.props.onTodayClick,
              tabIndex: 0,
              onKeyDown: function onKeyDown(e) {return (0, _utils.listenKeyDown)(e,
                [_consts.KeyCode.ENTER, _consts.KeyCode.SPACE],
                function () {return _this2.props.onTodayClick();});} },

            this.props.todayLabel),

          _react2.default.createElement('span', {
              className: this.props.prefix + 'calendar-header-title',
              onClick: this.props.onTitleClick,
              tabIndex: 0,
              onKeyDown: function onKeyDown(e) {return (0, _utils.listenKeyDown)(e,
                [_consts.KeyCode.ENTER, _consts.KeyCode.SPACE],
                function () {return _this2.props.onTitleClick();});} },

            this.props.title),
          _react2.default.createElement('i', {
            className: 'icon icon-chevron-right',
            onClick: this.props.onNextClick,
            tabIndex: 0,
            onKeyDown: function onKeyDown(e) {return (0, _utils.listenKeyDown)(e,
              [_consts.KeyCode.ENTER, _consts.KeyCode.SPACE],
              function () {return _this2.props.onNextClick();});} })));




    } }]);return Header;}(_react2.default.PureComponent);Header.displayName = 'Header';Header.propTypes = HeaderPropTypes;exports.default =


Header;module.exports = exports['default'];