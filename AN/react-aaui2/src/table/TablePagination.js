import React, { PureComponent } from 'react'
import { number, object, func } from 'prop-types'

import Pagination from '../Pagination'
import { noop } from '../shared/utils'

export default class TablePagination extends PureComponent {
  static propTypes = {
    totalPages: number,
    currentPage: number,
    style: object, // eslint-disable-line
    onPaging: func,
  }

  static defaultProps = {
    totalPages: 0,
    currentPage: 0,
    style: {},
    onPaging: noop,
  }

  handleClick = currentPage => e => {
    e.preventDefault()

    const { onPaging } = this.props

    onPaging({ currentPage })
  }

  renderPaginationLinkElement = props => {
    const currentPage = parseInt(props.href.split('=')[1], 10)

    return <a onClick={this.handleClick(currentPage)}>{props.children}</a>
  }

  render() {
    const { totalPages, currentPage, style, onPaging, ...rest } = this.props // eslint-disable-line

    return (
      <div style={style}>
        {!!totalPages && (
          <Pagination
            total={totalPages}
            current={currentPage}
            around={4}
            linkElement={this.renderPaginationLinkElement}
            {...rest}
          />
        )}
      </div>
    )
  }
}
