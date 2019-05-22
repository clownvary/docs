import React, { PureComponent } from 'react'
import { bool, string, func, object } from 'prop-types'

import TableCell from './TableCell'
import Checkbox from '../Checkbox/Checkbox'
import { noop } from '../shared/utils'

export default class TableHead extends PureComponent {
  static propTypes = {
    selected: bool,
    selectable: bool,
    multiSelectable: bool,
    cols: object, // eslint-disable-line
    sortBy: string,
    onSelect: func,
    onSort: func,
  }

  static defaultProps = {
    selected: false,
    selectable: true,
    multiSelectable: true,
    cols: {},
    sortBy: '',
    onSelect: noop,
    onSort: noop,
  }

  handleSort = colName => () => {
    const { onSort, cols } = this.props
    const { sorted } = cols[colName]

    if (sorted !== false) {
      onSort({
        column: colName,
        order: sorted !== 'ASC' ? 'ASC' : 'DESC',
      })
    }
  }

  renderTableHeadCells() {
    const { sortBy, cols } = this.props

    return Object.keys(cols).map(colName => {
      const col = cols[colName]
      const { sorted } = col
      const canSortForColumn = sortBy === colName && sorted !== false
      let sortIconClassName

      // Only one column was allowed to be sorted
      if (canSortForColumn) {
        sortIconClassName = 'sort-icon'

        if (sorted === 'ASC') {
          sortIconClassName += ' sort-up'
        } else {
          sortIconClassName += ' sort-down'
        }
      }

      return (
        <TableCell
          key={colName}
          className={sortIconClassName}
          tagName="th"
          onClick={this.handleSort(colName)}
          style={col.style}
        >
          {colName}
        </TableCell>
      )
    })
  }

  render() {
    const {
      selectable,
      multiSelectable,
      selected,
      onSelect,
      onSort, // eslint-disable-line
      sortBy, // eslint-disable-line
      cols, // eslint-disable-line
      ...rest
    } = this.props
    let checkboxTableCell

    if (selectable) {
      if (multiSelectable) {
        checkboxTableCell = (
          <th>
            <Checkbox onChange={onSelect} checked={selected} />
          </th>
        )
      } else {
        checkboxTableCell = <th />
      }
    }

    return (
      <thead {...rest}>
        <tr>
          {checkboxTableCell}
          {this.renderTableHeadCells()}
        </tr>
      </thead>
    )
  }
}
