'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

Header = function (_React$PureComponent) {(0, _inherits3.default)(Header, _React$PureComponent);function Header() {(0, _classCallCheck3.default)(this, Header);return (0, _possibleConstructorReturn3.default)(this, (Header.__proto__ || (0, _getPrototypeOf2.default)(Header)).apply(this, arguments));}(0, _createClass3.default)(Header, [{ key: 'onDateHeaderClick', value: function onDateHeaderClick(
    e, date) {
      e.stopPropagation();var

      onDateHeaderClick = this.props.onDateHeaderClick;
      if ((0, _isFunction2.default)(onDateHeaderClick)) {
        onDateHeaderClick(e, date);
      }
    } }, { key: 'renderCell', value: function renderCell(

    date) {var _this2 = this;var _props =
      this.props,_props$dateFormat = _props.dateFormat,dateFormat = _props$dateFormat === undefined ? 'DD ddd' : _props$dateFormat,currentDate = _props.currentDate,onDateHeaderClick = _props.onDateHeaderClick;
      var isToday = currentDate ? currentDate.isSame(date.value, 'day') : false;
      var isWeekend = date.value.day() === 0 || date.value.day() === 6;
      var isSunday = date.value.day() === 0;
      var classes = (0, _classnames2.default)(
      'grid-cell an-rc-date-header',
      {
        today: isToday,
        weekend: isWeekend,
        'is-sunday': isSunday });

      /* istanbul ignore next */
      var text = date ? date.value.format(dateFormat) : '';
      return (
        _react2.default.createElement('th', {
            className: classes,
            key: 'header_' + date.key },

          _react2.default.createElement('span', {
              className: (0, _classnames2.default)({ 'an-rc-clickable': (0, _isFunction2.default)(onDateHeaderClick) }),
              onClick: function onClick(e) {return _this2.onDateHeaderClick(e, date.value);} },

            isToday ? 'Today' : text)));



    } }, { key: 'render', value: function render()

    {var _this3 = this;var _props$dates =
      this.props.dates,dates = _props$dates === undefined ? [] : _props$dates;
      return (
        _react2.default.createElement('table', { className: 'an-rc-grid an-rc-grid-header' },
          _react2.default.createElement('thead', null,
            _react2.default.createElement('tr', { className: 'grid-row' },

              dates.map(function (date) {return _this3.renderCell(date);})))));





    } }]);return Header;}(_react2.default.PureComponent);exports.default =


Header;module.exports = exports['default'];