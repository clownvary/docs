import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import { bool, string, array, func, object, oneOfType, oneOf } from 'prop-types';
import classNames from 'classnames';

import TableHead from './TableHead';
import TableRow from './TableRow';
import TablePagination from './TablePagination';
import { noop } from '../shared/utils';

import './Table.less';

var Table = function (_PureComponent) {
  _inherits(Table, _PureComponent);

  function Table() {
    var _temp, _this, _ret;

    _classCallCheck(this, Table);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.handleHeadSelect = function () {
      var _this$props = _this.props,
          selected = _this$props.selected,
          dataSource = _this$props.dataSource,
          onSelect = _this$props.onSelect;

      // If all is selected then clean all selections => []
      // If not all is selected then select all directly => [0, 1, 2 , ..., dataSource.length-1]

      var selections = selected.length === dataSource.length ? [] : dataSource.map(function (d, index) {
        return index;
      });

      onSelect(selections);
    }, _this.handleSelect = function (index) {
      return function () {
        var _this$props2 = _this.props,
            multiSelectable = _this$props2.multiSelectable,
            selected = _this$props2.selected,
            onSelect = _this$props2.onSelect;

        var selections = [index];

        if (multiSelectable) {
          // Remove it if found in `selected`
          if (selected.indexOf(index) !== -1) {
            selections = selected.filter(function (p) {
              return p !== index;
            });
          } else {
            selections = selected.concat(index);
          }
        }

        onSelect(selections);
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Table.prototype.renderTableHead = function renderTableHead() {
    var hideTableHead = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var _props = this.props,
        selectable = _props.selectable,
        multiSelectable = _props.multiSelectable,
        selected = _props.selected,
        cols = _props.cols,
        dataSource = _props.dataSource,
        sortBy = _props.sortBy;

    var className = hideTableHead ? 'table__hidden-header' : '';

    return React.createElement(TableHead, {
      className: className,
      selectable: selectable,
      multiSelectable: multiSelectable,
      selected: selected.length === dataSource.length,
      cols: cols,
      sortBy: sortBy,
      onSelect: this.handleHeadSelect,
      onSort: this.props.onSort
    });
  };

  Table.prototype.renderTableBody = function renderTableBody() {
    var _this2 = this;

    var _props2 = this.props,
        selectable = _props2.selectable,
        selected = _props2.selected,
        cols = _props2.cols,
        dataSource = _props2.dataSource;


    return React.createElement(
      'tbody',
      null,
      dataSource.map(function (d, index) {
        return React.createElement(TableRow, {
          key: index,
          selectable: selectable,
          selected: selected.indexOf(index) !== -1,
          data: d,
          cols: cols,
          onSelect: _this2.handleSelect(index)
        });
      })
    );
  };

  Table.prototype.render = function render() {
    var _classNames;

    var _props3 = this.props,
        className = _props3.className,
        height = _props3.height,
        pagination = _props3.pagination,
        onPaging = _props3.onPaging,
        textOverflow = _props3.textOverflow;


    var tableClasses = classNames('table', 'table--fixed', (_classNames = {}, _classNames['table--' + textOverflow] = textOverflow, _classNames), className);

    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'table-container--fixed' },
        React.createElement(
          'table',
          { className: tableClasses },
          this.renderTableHead(),
          React.createElement('tbody', null)
        )
      ),
      React.createElement(
        'div',
        {
          className: 'table-container',
          style: { height: height !== false ? height : null }
        },
        React.createElement(
          'table',
          { className: tableClasses },
          this.renderTableHead(true),
          this.renderTableBody()
        )
      ),
      React.createElement(TablePagination, _extends({}, pagination, { onPaging: onPaging }))
    );
  };

  return Table;
}(PureComponent);

Table.propTypes = {
  className: string,
  selectable: bool,
  multiSelectable: bool,
  dataSource: array, // eslint-disable-line
  selected: array, // eslint-disable-line
  cols: object, // eslint-disable-line
  height: oneOfType([bool, string]),
  sortBy: string,
  pagination: object, // eslint-disable-line
  onSelect: func,
  onSort: func,
  onPaging: func,
  textOverflow: oneOf(['ellipsis', 'hyphenate'])
};
Table.defaultProps = {
  className: '',
  selectable: true,
  multiSelectable: true,
  dataSource: [],
  selected: [],
  cols: {},
  height: false,
  sortBy: '',
  pagination: null,
  onSelect: noop,
  onSort: noop,
  onPaging: noop,
  textOverflow: 'ellipsis'
};
export default Table;