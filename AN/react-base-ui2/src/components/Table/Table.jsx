import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import cloneDeep from 'lodash/cloneDeep';
import isArray from 'lodash/isArray';
import isEqual from 'lodash/isEqual';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';
import isNil from 'lodash/isNil';
import isNaN from 'lodash/isNaN';
import isNumber from 'lodash/isNumber';
import uniqueId from 'lodash/uniqueId';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import { isMoment } from 'moment';
import classNames from 'classnames';
import Tabbable from '../../services/wcag/Tabbable';
import { SortOrder, DefaultCSSPrefix } from '../../consts';
import { FixedPosition } from './consts';

/**
 * Default Props for Table
 * @name defaultTableProps
 * @const
 */
const defaultTableProps = {
  /**
   * @type {String}
   * @desc Determines the skin prefix of table.
   */
  prefix: `${DefaultCSSPrefix}-`,
  /**
   * @type {String}
   * @desc Specified class name for the table.
   */
  className: '',
  /**
   * @type {Boolean}
   * @desc Determines the table is sortable or not.
   */
  sortable: false,
  /**
   * @type {Boolean}
   * @desc Determines the table is resizable or not.
   */
  resizable: false,
  /**
   * @type {Boolean}
   * @desc Determines the table has borders between rows or not.
   */
  rowSeperator: false,
  /**
   * @type {Boolean}
   * @desc Determines the table is striped or not.
   */
  striped: true,
  /**
   * @type {Number}
   * @desc Determines the min width of the column.
   */
  minWidth: 30,
  /**
   * @type {String}
   * @desc Determines the default fixed row's position in the table.
   */
  fixed: FixedPosition.BOTTOM,
  /**
   * @type {String}
   * @desc Expand control aria-label text
   */
  ariaLableExpand: '',
  /**
   * @type {String}
   * @desc Collapse control aria-label text
   */
  ariaLableCollapse: '',
  /**
   * @type {Function}
   * @desc Callback when row expanding.
   */
  onExpand: row => row,
  /**
   * @type {Function}
   * @desc Callback when row collapsing.
   */
  onCollapse: row => row
};
const TablePropTypes =
  {
    /**
     * Determines the class prefix of table.
     */
    prefix: PropTypes.string,
    /**
     * Specified class name for the table.
     */
    className: PropTypes.string,
    /**
     * Determines the table is sortable or not.
     */
    sortable: PropTypes.bool,
    /**
     * Determines the table is resizable or not.
     */
    resizable: PropTypes.bool,
    /**
     * Determines the table has borders between rows or not.
     */
    rowSeperator: PropTypes.bool,
    /**
     * Determines the table is striped or not.
     */
    striped: PropTypes.bool,
    /**
     * Determines the min width of the column.
     */
    minWidth: PropTypes.number,
    /**
     * Determines the default fixed row's position in the table.
     */
    fixed: PropTypes.oneOf([FixedPosition.TOP, FixedPosition.BOTTOM]),
    /**
     * Determines the aria-label text on expanded
     */
    ariaLableExpand: PropTypes.string,
    /**
     * Determines the aria-label text on collapsed
     */
    ariaLableCollapse: PropTypes.string,
    /**
     *  Callback when row expanding.
     */
    onExpand: PropTypes.func,
    /**
     * Callback when row collapsing.
     */
    onCollapse: PropTypes.func,
    /**
     * Collection of structured data to render.
     * @typedef {Object} RowData
     * @property {Object} data Plain Javascript object hold the row's data
     * @property {Boolean} expanded Determines the child rows expanded or not
     * @property {Boolean} hidden Determins the row is hidden or not
     * @property {String} className Specify row specified class name
     * @property {Number} fixed Fix row at specified position in the table
     * - 'top'
     * - 'bottom'
     * @property {String} expandControl Key name determines which column
     *                                  should be the expand control
     * @property {Array.<RowData>} extraRows An array of RowData contains extra rows for current row
     * @property {Array.<RowData>} children
     * An object array of RowData contains child rows for current row,
     * and the child rows could be expanded or collapsed
     */
    rows: PropTypes.arrayOf(
      PropTypes.shape({
        data: PropTypes.object.isRequired,
        expanded: PropTypes.bool,
        hidden: PropTypes.bool,
        className: PropTypes.string,
        fixed: PropTypes.number,
        expandControl: PropTypes.string,
        extraRows: PropTypes.array,
        children: PropTypes.shape(PropTypes.arrayOf(PropTypes.object))
      })
    ).isRequired,
    /**
     * Data rendering descriptions.
     * @type {Array.<ColumnDef>}
     * @desc Data rendering descriptions.
     * @typedef {Object} ColumnDef
     * @property {String} title Title of this column
     * @property {String} keyName Data's key name for this column in RowData's data property
     * @property {String} className Specify column specified class name
     * @property {Number} colSpan Specify cell to cross columns
     * @property {Function} format Function to format cell date
     * @property {Function} render Function to customize the cell rendering
     * @property {Function({*}, {*}):Number} sorter Customer sort function for sorting column
     */
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        keyName: PropTypes.string.isRequired,
        className: PropTypes.string,
        colSpan: PropTypes.number,
        format: PropTypes.func,
        render: PropTypes.func,
        sorter: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
      })
    ).isRequired
  };

/**
 * @desc
 * Table to render a collection of structured data
 * with nested rows and sorting support
 *
 * @example
 * const rows = [
 *  { data: { a: 'hello', b: 'world', c: 'row 1' } },
 *  { data: { a: 'hello', b: 'world', c: 'row 2' } },
 *  { data: { a: 'hello', b: 'world', c: 'row 3' } }
 * ]
 *
 * const columns = [
 *  { title: 'Column A', keyName: 'a' },
 *  { title: 'Column B', keyName: 'b' },
 *  { title: 'Column C', keyName: 'c' },
 * ]
 *
 * <Table rows={rows} columns={columns} />
 */
class Table extends Component {

  static displayName = 'Table';

  static defaultProps = defaultTableProps;

  static propTypes = TablePropTypes;

  constructor(props) {
    super(props);
    this.tableKey = uniqueId();
    const rows = this.prepareRows(props.rows);

    this.state = {
      rows,
      originalRows: cloneDeep(rows),
      columns: cloneDeep(props.columns)
    };
  }

  componentWillReceiveProps(nextProps) {
    const newState = {};

    if (!isEqual(this.props.rows, nextProps.rows)) {
      const rows = this.prepareRows(nextProps.rows);
      newState.rows = rows;
      newState.originalRows = cloneDeep(rows);
    }

    if (!isEqual(this.props.columns, nextProps.columns)) {
      newState.columns = cloneDeep(nextProps.columns);
    }

    if (Object.keys(newState).length) {
      this.setState(newState);
    }
  }

  getSorter = ({ sortOrder, sorter: columnSorter }) => {
    const sorter = isFunction(columnSorter) ? columnSorter : this.defaultSorter;
    return sortOrder === SortOrder.DESC ? (...args) => -sorter(...args) : sorter;
  }

  prepareRows = (propRows) => {
    const rows = cloneDeep(propRows);
    this.patchKeys(rows);
    return rows;
  }

  patchKeys = (rows, hasChildren = false, rowKey) => {
    rows.forEach((row, rowIndex) => {
      row._key = hasChildren ? `${rowKey}_child${rowIndex}` : `${this.tableKey}_row${rowIndex}`;
      if (isArray(row.extraRows)) {
        row.extraRows.forEach((extraRow, extraRowIndex) => {
          extraRow._key = `${row._key}_extra${extraRowIndex}`;
        });
      }

      if (isObject(row.children) && isArray(row.children.rows)) {
        this.patchKeys(row.children.rows, true, row._key);
      }
    });
  }

  toggleRowExpandState = (rowIndexes) => {
    const rows = cloneDeep(this.state.rows);
    const { onExpand, onCollapse } = this.props;

    let row;
    let children;

    rowIndexes.forEach((rowIndex) => {
      row = (isObject(children) && isArray(children.rows))
        ? children.rows[rowIndex]
        : rows[rowIndex];
      children = row.children;
    });

    row.expanded = !row.expanded;
    if (row.expanded) {
      if (isFunction(onExpand)) {
        onExpand(row);
      }
    } else if (isFunction(onCollapse)) {
      onCollapse(row);
    }

    this.setState({ rows });
  }

  loopSortOrder = (column, index) => {
    const { sortOrder = SortOrder.ORIGIN } = column;

    let newSortOrder;

    if (sortOrder === SortOrder.ORIGIN) {
      newSortOrder = SortOrder.DESC;
    } else if (sortOrder === SortOrder.DESC) {
      newSortOrder = SortOrder.ASC;
    } else {
      newSortOrder = SortOrder.ORIGIN;
    }

    const columns = cloneDeep(this.state.columns);
    columns.forEach((col, i) => {
      if (i === index) {
        col.sortOrder = newSortOrder;
      } else {
        delete col.sortOrder;
      }
    });

    const rows = this.sortRows(columns[index]);

    this.setState({
      columns,
      rows
    });
  }

  defaultSorter = ({ value: a }, { value: b }) => {
    if (isMoment(a) && isMoment(b)) {
      return a.diff(b);
    } else if (isString(a) && isString(b)) {
      const aa = a.toLowerCase();
      const bb = b.toLowerCase();
      if (aa < bb) return -1;
      if (aa > bb) return 1;
      return 0;
    } else if (isNil(a) && !isNil(b)) {
      return -1;
    } else if (isNil(a) && isNil(b)) {
      return 0;
    } else if (!isNil(a) && isNil(b)) {
      return 1;
    }
    // Number, Date and Boolean support sub operator
    // Different types comparison returns 0
    const result = a - b;
    return !isNumber(result) || isNaN(result) ? 0 : result;
  }

  sortRows = (column) => {
    const { sortOrder, keyName } = column;
    const { fixed: defaultFixedPosition = FixedPosition.BOTTOM } = this.props;
    const originalRows = cloneDeep(this.state.originalRows);

    if (sortOrder === SortOrder.ORIGIN) {
      return originalRows;
    }

    const sortableRows = [];
    const fixedRows = {
      [FixedPosition.TOP]: [],
      [FixedPosition.BOTTOM]: []
    };

    originalRows.forEach((row) => {
      const fixedRowContainer = fixedRows[row.fixed];

      // Row could be fixed at the top or the bottom of the rows,
      // this could be controlled by the row "fixed" property.
      // RowData: { data: {...}, fixed: FixedPosition.TOP }
      if (isArray(fixedRowContainer)) {
        fixedRowContainer.push(row);
      } else if (Object.prototype.hasOwnProperty.call(row.data, keyName)) {
        sortableRows.push(row);
      } else {
        fixedRows[defaultFixedPosition].push(row);
      }
    });

    const mappedSortableRows = sortableRows.map((row, index) => {
      let value = row.data[`${keyName}Sort`];

      if (isNull(value) || isUndefined(value) || isNaN(value)) {
        value = row.data[keyName];
      }

      return {
        index,
        row,
        value
      };
    });

    mappedSortableRows.sort(this.getSorter(column));

    return fixedRows[FixedPosition.TOP]
      .concat(mappedSortableRows.map(({ index }) => sortableRows[index]))
      .concat(fixedRows[FixedPosition.BOTTOM]);
  }

  renderSorterIcon = (column) => {
    const { sortOrder } = column;

    let sortOrderIcon = 'icon-sort';

    if ([SortOrder.ASC, SortOrder.DESC].indexOf(sortOrder) >= 0) {
      sortOrderIcon = `icon-sort-${sortOrder}`;
    }

    return (
      <i
        className={classNames('icon', sortOrderIcon)}
        aria-label={this.getSortLabel(sortOrder)}
      />
    );
  }

  getSortLabel = (sortOrder = SortOrder.ORIGIN, type = 'aria-label') => {
    let sortLabel;
    const ariaSort = type === 'aria-sort';
    switch (sortOrder) {
      case SortOrder.ORIGIN:
        sortLabel = ariaSort ? 'none' : ' ';
        break;
      case SortOrder.ASC:
        sortLabel = ariaSort ? 'ascending' : 'sort up';
        break;
      case SortOrder.DESC:
        sortLabel = ariaSort ? 'descending' : 'sort down';
        break;
      default:
        break;
    }
    return sortLabel;
  }

  renderHeaderCell = (column, index) => {
    const { sortable: defaultSortable, minWidth: defaultMinWidth } = this.props;
    const { sorter, className, title, minWidth: columnMinWidth, sortOrder } = column;
    const sortable = !!(defaultSortable && sorter);
    const minWidth = columnMinWidth || defaultMinWidth;
    return (
      <th
        className={classNames(className, { sortable })}
        data-min-width={minWidth}
        aria-sort={sortable ? this.getSortLabel(sortOrder, 'aria-sort') : null}
      >
        <div >
          {
            sortable ?
              <Tabbable onClick={() => sortable && this.loopSortOrder(column, index)}>
                {title}
                {this.renderSorterIcon(column, index)}
              </Tabbable>
              : title
          }
        </div>
      </th>
    );
  }

  renderTableHead = () => {
    const { columns } = this.state;

    return (
      <thead>
        <tr className="striped">
          {columns.map((column, index) => this.renderHeaderCell(column, index))}
        </tr>
      </thead>
    );
  }

  renderExpandControl = (expanded, rowIndexes) => {
    const { ariaLableExpand, ariaLableCollapse } = this.props;
    const icon = expanded ? 'icon-chevron-up' : 'icon-chevron-down';
    return (
      <Tabbable
        aria-label={expanded ? ariaLableCollapse : ariaLableExpand}
        aria-expanded={expanded}
        onClick={() => this.toggleRowExpandState(rowIndexes)}
      >
        <i className={classNames('icon', 'expand-control', icon)} />
      </Tabbable>
    );
  }

  renderCell = (row, column, rowIndexes) => {
    const { render, className, keyName, format, colSpan } = column;
    const value = row.data[keyName];
    const isExpandControl = keyName === row.expandControl;
    const formatedValue = isFunction(format) ? format(value) : value;
    let content = [formatedValue];

    if (isExpandControl) {
      content.push(this.renderExpandControl(row.expanded, rowIndexes));
    }

    if (isFunction(render)) {
      content = render(content, row, keyName);
    }

    return (
      <td
        className={className}
        colSpan={colSpan}
      >
        <div>
          {content}
        </div>
      </td>
    );
  }

  renderRow = (
    row,
    { columns: defaultColumns, rowSeperator, striped, isStripedRow, isExtraRow },
    rowIndexes
  ) => {
    const { _key, className, columns: rowColumns, hidden } = row;
    const columns = rowColumns || defaultColumns;

    const cellsToRender = [];

    columns.forEach((column) => {
      cellsToRender.push(this.renderCell(row, column, rowIndexes));
    });

    return (
      <tr
        key={_key}
        className={classNames(className, {
          rowSeperator,
          'u-hidden': hidden,
          'extra-row': isExtraRow,
          striped: striped && isStripedRow
        })}
      >
        {cellsToRender}
      </tr>
    );
  }

  renderRows = (rows, config, rowIndexes = [], initStripedStatus = false) => {
    let rowsToRender = [];
    let isStripedRow = initStripedStatus;

    rows.forEach((row, index) => {
      const currentIndexes = rowIndexes.concat([index]);
      rowsToRender.push(this.renderRow(row, { ...config, isStripedRow }, currentIndexes));

      if (isArray(row.extraRows)) {
        row.extraRows.forEach((extraRow) => {
          rowsToRender.push(this.renderRow(extraRow,
            { ...config, isStripedRow, isExtraRow: true },
            currentIndexes));
        });
      }

      isStripedRow = !isStripedRow;

      if (isObject(row.children) && isArray(row.children.rows)) {
        const { columns: childColumns, rows: childRows } = row.children;
        rowsToRender = rowsToRender.concat(
          this.renderRows(
            childRows.map(r => ({ ...r, hidden: !row.expanded })),
            // Drop back to table columns definition
            { ...config, columns: childColumns || config.tableColumns },
            currentIndexes,
            isStripedRow
          )
        );
      }
    });

    return rowsToRender;
  }

  renderTableBody = () => {
    const { rows, columns } = this.state;
    const { rowSeperator, striped } = this.props;

    const rowsToRender = this.renderRows(rows, {
      tableColumns: columns,
      columns,
      rowSeperator,
      striped
    });

    return (
      <tbody>
        {rowsToRender}
      </tbody>
    );
  }

  render() {
    const { prefix, className, resizable } = this.props;
    return (
      <table role="grid" className={classNames('table', 'an-table', 'noMarginBottom', className, `${prefix}table`, { resizable })} >
        {this.renderTableHead()}
        {this.renderTableBody()}
      </table>
    );
  }
}
export default Table;
