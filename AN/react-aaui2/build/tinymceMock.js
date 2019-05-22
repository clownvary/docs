import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const { string, func } = PropTypes
export default class MceEditor extends PureComponent {
  static propTypes = {
    onChange: func,
    onBlur: func,
    content: string,
  }

  handleOnChange = e => {
    const warp = {
      target: {
        getContent: () => e.target.value,
      },
    }

    this.props.onChange(warp)
  }

  handleOnBlur = e => {
    const warp = {
      target: {
        getContent: () => e.target.value,
      },
    }

    this.props.onBlur(warp)
  }

  render() {
    return (
      <input value={this.props.content} onBlur={this.handleOnBlur} onChange={this.handleOnChange} type="text" />
    )
  }
}
