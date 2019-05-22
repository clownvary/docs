import React, { Component } from 'react'
import { bool, string, object, func, node, any } from 'prop-types'

import CheckboxComponent from './CheckboxComponent'
import { identity } from '../shared/utils'

export default class Checkbox extends Component {
  static displayName = 'AUICheckbox'

  static propTypes = {
    disabled: bool,
    size: string,
    name: string,
    children: node,
    onChange: func,
    value: any, // eslint-disable-line
  }

  static defaultProps = {
    onChange: identity,
  }

  static contextTypes = {
    auiCheckboxGroup: object,
  }

  // Support legacy API for `this.refs.checkbox.checked`
  // It's not recommended because it breaks component encapsulation and
  // it violates the unidirectional data flow for React
  componentDidMount() {
    Object.defineProperties(this, {
      checked: {
        get() {
          return this.checkboxComponent.checked
        },
        set(v) {
          this.checkboxComponent.checked = !!v
        },
      },
    })
  }

  setRef = checkboxComponent => {
    this.checkboxComponent = checkboxComponent
  }

  render() {
    const { children, ...rest } = this.props
    const { auiCheckboxGroup } = this.context

    // Proxy `onChange`, `checked` and `disabled` to `auiCheckboxGroup`
    if (auiCheckboxGroup) {
      rest.onChange = auiCheckboxGroup.onChange
      rest.checked =
        auiCheckboxGroup.value &&
        auiCheckboxGroup.value.indexOf(this.props.value) !== -1
      rest.disabled = this.props.disabled || auiCheckboxGroup.disabled
      rest.size = this.props.size || auiCheckboxGroup.size
      rest.name = this.props.name || auiCheckboxGroup.name
    }

    return (
      <CheckboxComponent ref={this.setRef} {...rest}>
        {children}
      </CheckboxComponent>
    )
  }
}
