import React, { PureComponent } from 'react'
import { bool, string, array, func, object, oneOfType, oneOf } from 'prop-types'
import classNames from 'classnames'

import TableHead from './TableHead'
import TableRow from './TableRow'
import TablePagination from './TablePagination'
import { noop } from '../shared/utils'

import './Table.less'

export default class Table extends PureComponent {
  static propTypes = {
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
    textOverflow: oneOf(['ellipsis', 'hyphenate']),
  }

  static defaultProps = {
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
    textOverflow: 'ellipsis',
  }

  handleHeadSelect = () => {
    const { selected, dataSource, onSelect } = this.props

    // If all is selected then clean all selections => []
    // If not all is selected then select all directly => [0, 1, 2 , ..., dataSource.length-1]
    const selections =
      selected.length === dataSource.length
        ? []
        : dataSource.map((d, index) => index)

    onSelect(selections)
  }

  handleSelect = index => () => {
    const { multiSelectable, selected, onSelect } = this.props
    let selections = [index]

    if (multiSelectable) {
      // Remove it if found in `selected`
      if (selected.indexOf(index) !== -1) {
        selections = selected.filter(p => p !== index)
      } else {
        selections = selected.concat(index)
      }
    }

    onSelect(selections)
  }

  renderTableHead(hideTableHead = false) {
    const {
      selectable,
      multiSelectable,
      selected,
      cols,
      dataSource,
      sortBy,
    } = this.props
    const className = hideTableHead ? 'table__hidden-header' : ''

    return (
      <TableHead
        className={className}
        selectable={selectable}
        multiSelectable={multiSelectable}
        selected={selected.length === dataSource.length}
        cols={cols}
        sortBy={sortBy}
        onSelect={this.handleHeadSelect}
        onSort={this.props.onSort}
      />
    )
  }

  renderTableBody() {
    const { selectable, selected, cols, dataSource } = this.props

    return (
      <tbody>
        {dataSource.map((d, index) => (
          <TableRow
            key={index}
            selectable={selectable}
            selected={selected.indexOf(index) !== -1}
            data={d}
            cols={cols}
            onSelect={this.handleSelect(index)}
          />
        ))}
      </tbody>
    )
  }

  render() {
    const { className, height, pagination, onPaging, textOverflow } = this.props

    const tableClasses = classNames(
      'table',
      'table--fixed',
      {
        [`table--${textOverflow}`]: textOverflow,
      },
      className,
    )

    return (
      <div>
        <div className="table-container--fixed">
          <table className={tableClasses}>
            {this.renderTableHead()}
            <tbody />
          </table>
        </div>
        <div
          className="table-container"
          style={{ height: height !== false ? height : null }}
        >
          <table className={tableClasses}>
            {this.renderTableHead(true)}
            {this.renderTableBody()}
          </table>
        </div>
        <TablePagination {...pagination} onPaging={onPaging} />
      </div>
    )
  }
}
