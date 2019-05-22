import React, { PureComponent } from 'react'
import {
  bool,
  string,
  func,
  object,
  node,
  arrayOf,
  shape,
  any,
} from 'prop-types'
import classNames from 'classnames'

import Radio from './Radio'
import { identity } from '../shared/utils'

export default class RadioGroup extends PureComponent {
  static displayName = 'AUIRadioGroup'

  static propTypes = {
    disabled: bool,
    size: string,
    name: string,
    className: string,
    onChange: func,
    data: arrayOf(
      shape({
        text: string.isRequired,
        value: any.isRequired, // eslint-disable-line
      }),
    ),
    children: node,
    value: any, // eslint-disable-line
    defaultValue: any, // eslint-disable-line
  }

  static defaultProps = {
    onChange: identity,
  }

  static childContextTypes = {
    auiRadioGroup: object,
  }

  constructor(props) {
    super(props)

    let value
    if ('value' in props) {
      value = props.value
    } else if ('defaultValue' in props) {
      value = props.defaultValue
    }

    this.state = {
      value,
    }
  }

  getChildContext() {
    return {
      auiRadioGroup: {
        onChange: this.onChange,
        value: this.state.value,
        disabled: this.props.disabled,
        size: this.props.size,
        name: this.props.name,
      },
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value,
      })
    }
  }

  onChange = e => {
    const value = e.target.value
    const { onChange } = this.props

    if (!('value' in this.props)) {
      this.setState({
        value,
      })
    }

    onChange(e)
  }

  render() {
    const { className, data } = this.props
    const classes = classNames('radio-group', className)
    let children = this.props.children

    if (data) {
      children = data.map(({ text, value, ...rest }, index) => (
        <Radio key={index} value={value} {...rest}>
          {text}
        </Radio>
      ))
    }

    return <div className={classes}>{children}</div>
  }
}
