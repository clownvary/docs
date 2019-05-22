import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const { string, func } = PropTypes
const propTypes = {
  className: string,
  value: string,
  onChange: func,
}
const defaultProps = {
  className: 'input',
}

export default class TextArea extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value,
      })
    }
  }

  handleChange = e => {
    e.persist()

    this.setState(
      {
        value: e.target.value,
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(e)
        }
      },
    )
  }

  render() {
    const { className, ...rest } = this.props

    return (
      <textarea
        {...rest}
        className={className}
        value={this.state.value}
        onChange={this.handleChange}
      />
    )
  }
}

TextArea.displayName = 'AAUITextArea'
TextArea.propTypes = propTypes
TextArea.defaultProps = defaultProps
