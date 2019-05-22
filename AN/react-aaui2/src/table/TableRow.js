import React, { PureComponent } from 'react'
import { bool, func, object } from 'prop-types'

import TableCell from './TableCell'
import Checkbox from '../Checkbox/Checkbox'
import { noop } from '../shared/utils'

export default class TableRow extends PureComponent {
  static propTypes = {
    selected: bool,
    selectable: bool,
    cols: object, // eslint-disable-line
    data: object, // eslint-disable-line
    onSelect: func,
  }

  static defaultProps = {
    selected: false,
    selectable: true,
    cols: {},
    data: {},
    onSelect: noop,
  }

  renderTableRowCells() {
    const { cols, data } = this.props

    return Object.keys(data).map(colName => {
      const renderer = cols[colName].renderer

      return (
        <TableCell key={colName}>
          {renderer ? renderer(data) : data[colName]}
        </TableCell>
      )
    })
  }

  render() {
    const { selectable, selected, onSelect } = this.props
    let checkboxTableCell = null

    if (selectable) {
      checkboxTableCell = (
        <td>
          <Checkbox onChange={onSelect} checked={selected} />
        </td>
      )
    }

    return (
      <tr>
        {checkboxTableCell}
        {this.renderTableRowCells()}
      </tr>
    )
  }
}
