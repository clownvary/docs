import React, { Component } from 'react'
import { bool, number, string, object, func, node, oneOfType } from 'prop-types'

import RadioComponent from './RadioComponent'
import { identity } from '../shared/utils'

export default class Radio extends Component {
  static displayName = 'AUIRadio'

  static propTypes = {
    value: oneOfType([string, number]),
    disabled: bool,
    size: string,
    name: string,
    children: node,
    onChange: func,
  }

  static defaultProps = {
    onChange: identity,
  }

  static contextTypes = {
    auiRadioGroup: object,
  }

  // Support legacy API for `this.refs.checkbox.checked`
  // It's not recommended because it breaks component encapsulation and
  // it violates the unidirectional data flow for React
  componentDidMount() {
    Object.defineProperties(this, {
      checked: {
        get() {
          return this.radioComponent.checked
        },
        set(v) {
          this.radioComponent.checked = !!v
        },
      },
    })
  }

  setRef = radioComponent => {
    this.radioComponent = radioComponent
  }

  render() {
    const { children, ...rest } = this.props
    const { auiRadioGroup } = this.context

    // Proxy `onChange`, `checked` and `disabled` to `auiRadioGroup`
    if (auiRadioGroup) {
      rest.onChange = auiRadioGroup.onChange
      rest.checked = this.props.value === auiRadioGroup.value
      rest.disabled = this.props.disabled || auiRadioGroup.disabled
      rest.size = this.props.size || auiRadioGroup.size
      rest.name = this.props.name || auiRadioGroup.name
    }

    return (
      <RadioComponent ref={this.setRef} {...rest}>
        {children}
      </RadioComponent>
    )
  }
}
