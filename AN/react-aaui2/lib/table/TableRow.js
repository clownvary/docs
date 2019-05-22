'use strict';

exports.__esModule = true;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _TableCell = require('./TableCell');

var _TableCell2 = _interopRequireDefault(_TableCell);

var _Checkbox = require('../Checkbox/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _utils = require('../shared/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableRow = function (_PureComponent) {
  (0, _inherits3.default)(TableRow, _PureComponent);

  function TableRow() {
    (0, _classCallCheck3.default)(this, TableRow);
    return (0, _possibleConstructorReturn3.default)(this, _PureComponent.apply(this, arguments));
  }

  TableRow.prototype.renderTableRowCells = function renderTableRowCells() {
    var _props = this.props,
        cols = _props.cols,
        data = _props.data;


    return (0, _keys2.default)(data).map(function (colName) {
      var renderer = cols[colName].renderer;

      return _react2.default.createElement(
        _TableCell2.default,
        { key: colName },
        renderer ? renderer(data) : data[colName]
      );
    });
  };

  TableRow.prototype.render = function render() {
    var _props2 = this.props,
        selectable = _props2.selectable,
        selected = _props2.selected,
        onSelect = _props2.onSelect;

    var checkboxTableCell = null;

    if (selectable) {
      checkboxTableCell = _react2.default.createElement(
        'td',
        null,
        _react2.default.createElement(_Checkbox2.default, { onChange: onSelect, checked: selected })
      );
    }

    return _react2.default.createElement(
      'tr',
      null,
      checkboxTableCell,
      this.renderTableRowCells()
    );
  };

  return TableRow;
}(_react.PureComponent);

TableRow.propTypes = {
  selected: _propTypes.bool,
  selectable: _propTypes.bool,
  cols: _propTypes.object, // eslint-disable-line
  data: _propTypes.object, // eslint-disable-line
  onSelect: _propTypes.func
};
TableRow.defaultProps = {
  selected: false,
  selectable: true,
  cols: {},
  data: {},
  onSelect: _utils.noop
};
exports.default = TableRow;
module.exports = exports['default'];