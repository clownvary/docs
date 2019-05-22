import React, { PureComponent } from 'react'
import { string, object, bool } from 'prop-types'
import classNames from 'classnames'

import Dropdown from './Dropdown'

const propTypes = {
  className: string,
  title: string,
  data: object,
  style: object,
  filter: bool,
  filterPlaceholder: string,
  disabled: bool,
}

export default class MoreButton extends PureComponent {
  static displayName = 'AUIMoreButton'
  static propTypes = propTypes
  static defaultProps = {
    title: 'More',
  }

  handleChange = ({ value: v }) => {
    const handler = this.props.data[v]

    if (typeof handler === 'function') {
      handler(v)
    }
  }

  render = () => {
    const {
      className,
      style,
      title,
      filter,
      filterPlaceholder,
      disabled,
    } = this.props
    const classes = classNames('more-button', className)
    const data = Object.keys(this.props.data).map(k => ({ text: k, value: k }))

    return (
      <Dropdown
        className={classes}
        style={style}
        placeholder={title}
        filter={filter}
        filterPlaceholder={filterPlaceholder}
        data={data}
        value=""
        disabled={disabled}
        isMoreButton
        onChange={this.handleChange}
      />
    )
  }
}
