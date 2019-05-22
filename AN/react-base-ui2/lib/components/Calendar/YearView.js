'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _defineProperty2 = require('babel-runtime/helpers/defineProperty');var _defineProperty3 = _interopRequireDefault(_defineProperty2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _moment = require('moment');var _moment2 = _interopRequireDefault(_moment);

var _i18n = require('../../services/i18n');
var _consts = require('../../consts');
var _utils = require('../../utils');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var ROW = 3;
var COL = 4;
var YearViewPropTypes = {
  config: _propTypes2.default.shape({
    prefix: _propTypes2.default.string.isRequired,
    currentDate: _propTypes2.default.instanceOf(_moment2.default),
    value: _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(_moment2.default)) }),

  onYearClick: _propTypes2.default.func.isRequired };var


YearView = function (_React$PureComponent) {(0, _inherits3.default)(YearView, _React$PureComponent);function YearView() {(0, _classCallCheck3.default)(this, YearView);return (0, _possibleConstructorReturn3.default)(this, (YearView.__proto__ || (0, _getPrototypeOf2.default)(YearView)).apply(this, arguments));}(0, _createClass3.default)(YearView, [{ key: 'getYears', value: function getYears(



    currentDate) {
      var currentYear = currentDate.year();

      var firstYear = currentYear - currentYear % 10 - 1;

      var rows = [];
      var cols = void 0;
      var pass = 0;
      for (var iIndex = 0; iIndex < ROW; iIndex += 1) {
        cols = [];
        for (var jIndex = 0; jIndex < COL; jIndex += 1) {
          cols.push({
            year: firstYear + pass,
            index: pass,
            title: firstYear + pass });

          pass += 1;
        }
        rows.push(cols);
      }

      return rows;
    } }, { key: 'renderCell', value: function renderCell(

    cell) {var _props =







      this.props,_props$config = _props.config,prefix = _props$config.prefix,today = _props$config.today,value = _props$config.value,onYearClick = _props.onYearClick;var
      index = cell.index,year = cell.year,title = cell.title;
      var isSelected = value && value.some(function (v) {return year === v.year();});
      var isCurrentYear = year === today.year();

      return (
        _react2.default.createElement('td', { key: 'td_' + index },
          _react2.default.createElement('div', {
              key: 'div_' + index,
              className: (0, _classnames2.default)(
              prefix + 'calendar-table-cell',
              prefix + 'calendar-year', (0, _defineProperty3.default)({},
              prefix + 'calendar-year-first', index === 0), (0, _defineProperty3.default)({},
              prefix + 'calendar-year-last', index === ROW * COL - 1), (0, _defineProperty3.default)({},
              prefix + 'calendar-year-current', isCurrentYear), (0, _defineProperty3.default)({},
              prefix + 'calendar-year-selected', isSelected), (0, _defineProperty3.default)({},
              prefix + 'calendar-year-disable', false)),
              onClick: function onClick() {return onYearClick(year);},
              tabIndex: 0,
              onKeyDown: function onKeyDown(e) {return (0, _utils.listenKeyDown)(e,
                [_consts.KeyCode.ENTER, _consts.KeyCode.SPACE],
                function () {return onYearClick(year);});} },


            title)));



    } }, { key: 'render', value: function render()

    {var _this2 = this;var _props$config2 =





      this.props.config,prefix = _props$config2.prefix,_props$config2$curren = _props$config2.currentDate,currentDate = _props$config2$curren === undefined ? _i18n.Globalize.getToday() : _props$config2$curren;
      var years = this.getYears(currentDate);
      return (
        _react2.default.createElement('table', { className: prefix + 'calendar-table' },
          _react2.default.createElement('tbody', null,
            years.map(function (row, rowIndex) {return (
                _react2.default.createElement('tr', { key: 'tr' + rowIndex, className: prefix + 'calendar-table-row' },
                  row.map(function (col) {return _this2.renderCell(col);})));}))));





    } }]);return YearView;}(_react2.default.PureComponent);YearView.displayName = 'YearView';YearView.propTypes = YearViewPropTypes;exports.default =


YearView;module.exports = exports['default'];