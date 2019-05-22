'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _defineProperty2 = require('babel-runtime/helpers/defineProperty');var _defineProperty3 = _interopRequireDefault(_defineProperty2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _moment = require('moment');var _moment2 = _interopRequireDefault(_moment);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var SessionCalendarDateCell = function SessionCalendarDateCell(props) {var _classNames;var

  prefixCls =

  props.prefixCls,rowDate = props.rowDate,today = props.today,disabled = props.disabled,waiting = props.waiting,selected = props.selected,selectionStart = props.selectionStart,selectionEnd = props.selectionEnd;
  return (
    _react2.default.createElement('td', {
        className: (0, _classnames2.default)(
        prefixCls + '-day', (_classNames = {}, (0, _defineProperty3.default)(_classNames,

        prefixCls + '-day__today', today), (0, _defineProperty3.default)(_classNames,
        prefixCls + '-day__disabled', disabled), (0, _defineProperty3.default)(_classNames,
        prefixCls + '-day__waiting', waiting), (0, _defineProperty3.default)(_classNames,
        prefixCls + '-day__selected', selected), (0, _defineProperty3.default)(_classNames,
        prefixCls + '-day__block-start', selectionStart), (0, _defineProperty3.default)(_classNames,
        prefixCls + '-day__block-end', selectionEnd), _classNames)) },


      _react2.default.createElement('div', null,
        rowDate.format('D'))));



};

SessionCalendarDateCell.propTypes = {
  prefixCls: _propTypes2.default.string,
  rowDate: _propTypes2.default.instanceOf(_moment2.default),
  today: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  waiting: _propTypes2.default.bool,
  selected: _propTypes2.default.bool,
  selectionStart: _propTypes2.default.bool,
  selectionEnd: _propTypes2.default.bool };exports.default =


SessionCalendarDateCell;module.exports = exports['default'];