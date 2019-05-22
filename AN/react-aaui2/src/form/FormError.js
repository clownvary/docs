import React, { PureComponent } from 'react'
import { string, func, array, node, oneOfType } from 'prop-types'

import getContext from '../shared/getContext'
import { FormStorePropTypes } from './types'
import { reduceFields } from './utils'
import Alert from '../alert'

const aauiFormStore = Object.keys(FormStorePropTypes)[0]

export class FormError extends PureComponent {
  static displayName = 'FormError'

  static propTypes = {
    name: string,
    errorText: node,
    children: oneOfType([func, array]),
  }

  static defaultProps = {
    errorText: <strong>Error</strong>,
  }

  constructor(props, context) {
    super(props, context)

    this.state = { errors: {}, isValid: true, ...props }
    this.store = props[aauiFormStore] || context[aauiFormStore]
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(this.handleChange)
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe()
      this.unsubscribe = null
    }
  }

  getFormErrorState = () => {
    const { name } = this.props
    const { errors = {} } = this.state

    return {
      errors: !name ? errors : { [name]: errors[name] },
    }
  }

  handleChange = () => {
    const fields = this.store.getState()
    const { errors, isValid } = reduceFields(fields)

    this.setState({ errors, isValid })
  }

  render() {
    const { errorText, children } = this.props
    const { isValid } = this.state
    const renderProp = Array.isArray(children) ? children[0] : children

    return (
      !isValid && (
        <Alert type="danger" noClose>
          {errorText}
          {renderProp && renderProp(this.getFormErrorState())}
        </Alert>
      )
    )
  }
}

export default getContext(FormStorePropTypes)(FormError)
