import _Object$keys from 'babel-runtime/core-js/object/keys';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import { bool, func, object } from 'prop-types';

import TableCell from './TableCell';
import Checkbox from '../Checkbox/Checkbox';
import { noop } from '../shared/utils';

var TableRow = function (_PureComponent) {
  _inherits(TableRow, _PureComponent);

  function TableRow() {
    _classCallCheck(this, TableRow);

    return _possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
  }

  TableRow.prototype.renderTableRowCells = function renderTableRowCells() {
    var _props = this.props,
        cols = _props.cols,
        data = _props.data;


    return _Object$keys(data).map(function (colName) {
      var renderer = cols[colName].renderer;

      return React.createElement(
        TableCell,
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
      checkboxTableCell = React.createElement(
        'td',
        null,
        React.createElement(Checkbox, { onChange: onSelect, checked: selected })
      );
    }

    return React.createElement(
      'tr',
      null,
      checkboxTableCell,
      this.renderTableRowCells()
    );
  };

  return TableRow;
}(PureComponent);

TableRow.propTypes = {
  selected: bool,
  selectable: bool,
  cols: object, // eslint-disable-line
  data: object, // eslint-disable-line
  onSelect: func
};
TableRow.defaultProps = {
  selected: false,
  selectable: true,
  cols: {},
  data: {},
  onSelect: noop
};
export default TableRow;