import React, { PureComponent } from 'react'
import { number, string, func, node, oneOf } from 'prop-types'
import classNames from 'classnames'
import Alert from './Alert'

import { noop, omit } from '../shared/utils'
import './AlertBar.less'

export default class AlertBar extends PureComponent {
  static propTypes = {
    timeout: number,
    type: oneOf(['success', 'warning', 'danger', 'error', 'info']),
    onClose: func,
    message: node,
    className: string,
  }

  static defaultProps = {
    onClose: noop,
  }

  state = {
    show: false,
  }

  componentDidMount() {
    const { timeout } = this.props

    this.animationFrame = setTimeout(() => {
      this.setState({
        show: true,
      })
    })

    if (timeout) {
      this.timer = setTimeout(() => {
        this.setState({
          show: false,
        })
      }, timeout)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.animationFrame)
    clearTimeout(this.timer)
  }

  setRef = element => {
    this.element = element
  }

  handleClose = () => {
    this.setState({
      show: false,
    })

    this.element &&
      this.element.addEventListener('animationend', () => {
        this.props.onClose()
      })
  }

  render() {
    const { message, type, className, ...rest } = this.props
    const { show } = this.state
    const classes = classNames(
      {
        'alert-bar': true,
        show,
      },
      className,
    )

    return (
      <div className={classes} ref={this.setRef}>
        <Alert
          {...omit(rest, ['timeout'])}
          type={type}
          onClose={this.handleClose}
        >
          <span>{message}</span>
        </Alert>
      </div>
    )
  }
}
