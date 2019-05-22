import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _Object$keys from 'babel-runtime/core-js/object/keys';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import { bool, string, func, object } from 'prop-types';

import TableCell from './TableCell';
import Checkbox from '../Checkbox/Checkbox';
import { noop } from '../shared/utils';

var TableHead = function (_PureComponent) {
  _inherits(TableHead, _PureComponent);

  function TableHead() {
    var _temp, _this, _ret;

    _classCallCheck(this, TableHead);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.handleSort = function (colName) {
      return function () {
        var _this$props = _this.props,
            onSort = _this$props.onSort,
            cols = _this$props.cols;
        var sorted = cols[colName].sorted;


        if (sorted !== false) {
          onSort({
            column: colName,
            order: sorted !== 'ASC' ? 'ASC' : 'DESC'
          });
        }
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  TableHead.prototype.renderTableHeadCells = function renderTableHeadCells() {
    var _this2 = this;

    var _props = this.props,
        sortBy = _props.sortBy,
        cols = _props.cols;


    return _Object$keys(cols).map(function (colName) {
      var col = cols[colName];
      var sorted = col.sorted;

      var canSortForColumn = sortBy === colName && sorted !== false;
      var sortIconClassName = void 0;

      // Only one column was allowed to be sorted
      if (canSortForColumn) {
        sortIconClassName = 'sort-icon';

        if (sorted === 'ASC') {
          sortIconClassName += ' sort-up';
        } else {
          sortIconClassName += ' sort-down';
        }
      }

      return React.createElement(
        TableCell,
        {
          key: colName,
          className: sortIconClassName,
          tagName: 'th',
          onClick: _this2.handleSort(colName),
          style: col.style
        },
        colName
      );
    });
  };

  TableHead.prototype.render = function render() {
    var _props2 = this.props,
        selectable = _props2.selectable,
        multiSelectable = _props2.multiSelectable,
        selected = _props2.selected,
        onSelect = _props2.onSelect,
        onSort = _props2.onSort,
        sortBy = _props2.sortBy,
        cols = _props2.cols,
        rest = _objectWithoutProperties(_props2, ['selectable', 'multiSelectable', 'selected', 'onSelect', 'onSort', 'sortBy', 'cols']);

    var checkboxTableCell = void 0;

    if (selectable) {
      if (multiSelectable) {
        checkboxTableCell = React.createElement(
          'th',
          null,
          React.createElement(Checkbox, { onChange: onSelect, checked: selected })
        );
      } else {
        checkboxTableCell = React.createElement('th', null);
      }
    }

    return React.createElement(
      'thead',
      rest,
      React.createElement(
        'tr',
        null,
        checkboxTableCell,
        this.renderTableHeadCells()
      )
    );
  };

  return TableHead;
}(PureComponent);

TableHead.propTypes = {
  selected: bool,
  selectable: bool,
  multiSelectable: bool,
  cols: object, // eslint-disable-line
  sortBy: string,
  onSelect: func,
  onSort: func
};
TableHead.defaultProps = {
  selected: false,
  selectable: true,
  multiSelectable: true,
  cols: {},
  sortBy: '',
  onSelect: noop,
  onSort: noop
};
export default TableHead;