import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'

import HField from './HField'
import TextInput from './TextInput'
import Store from './store'
import { noop, identity, shallowEqual, omit } from '../shared/utils'
import { FormPropTypes, FormStorePropTypes } from './types'
import { reduceFields, reduceFieldsProp } from './utils'

const aauiFormStore = Object.keys(FormStorePropTypes)[0]
const FormDefaultConfig = {
  preSubmit: noop,
  shouldSubmit: () => true,
  onSubmit: noop,
  postSubmit: noop,
  onFail: noop,
  preChange: identity,
  onChange: noop,
  fields: {},
}

export default class Form extends PureComponent {
  static displayName = 'AUIForm'

  static propTypes = { ...FormPropTypes }

  static defaultProps = { ...FormDefaultConfig }

  static contextTypes = { [aauiFormStore]: PropTypes.instanceOf(Store) }

  static childContextTypes = { ...FormStorePropTypes }

  constructor(props, context) {
    super(props, context)

    // Sync the `this.state` and `this.store.currentState`
    this.parentStore = props[aauiFormStore] || context[aauiFormStore]
    this.state = this.getInitState()
    this.initStore(props)
  }

  getChildContext() {
    return {
      [aauiFormStore]: this.store,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fields !== this.props.fields) {
      // Merge fields when receiving new fields
      const fields = merge(
        {},
        this.store.getState(),
        reduceFieldsProp(nextProps.fields),
      )
      this.store.replaceState(fields)
      this.setState({ fields, changed: false })
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe()
      this.unsubscribe = null
    }
  }

  getInitState() {
    const { fields } = this.props

    return { fields: reduceFieldsProp(fields), isValid: true, changed: false }
  }

  initStore(props) {
    this.store = new Store({
      ...props,
      initialState: this.state.fields,
    })
    // Subscribe the changes of store
    this.unsubscribe = this.store.subscribe(this.handleChange)
    // Keep the child store reference from the parent store
    if (this.parentStore) {
      this.parentStore.childStoreList = [
        ...this.parentStore.childStoreList,
        this.store,
      ]
    }
  }

  handleSubmit = e => {
    e && e.preventDefault && e.preventDefault()

    this.store.tryInvokeValidators()

    const { preSubmit, shouldSubmit, onSubmit, postSubmit, onFail } = this.props
    const { values, errors, isValid } = reduceFields(this.store.getState())

    if (!isValid) {
      return onFail(errors)
    }

    if (shouldSubmit(values, preSubmit(values))) {
      onSubmit(values)
    }

    return postSubmit(values)
  }

  handleChange = () => {
    const fields = this.store.getState()
    const { values, errors, isValid } = reduceFields(fields)
    const { values: currentValues, errors: currentErrors } = reduceFields(
      this.state.fields,
    )
    const { preChange, onChange } = this.props

    if (
      !shallowEqual(currentValues, values) ||
      !shallowEqual(currentErrors, errors)
    ) {
      // trigger 'onChange' here on purpose
      onChange({ values: preChange(values), errors, fields })

      // store -> state
      this.setState({ fields, isValid, changed: true })
    }
  }

  render() {
    const { className = 'form--horizontal' } = this.props
    let children = this.props.children

    // Data-Driven Form
    const fields = Object.keys(this.props.fields).map((fieldKey, index) => {
      const field = this.props.fields[fieldKey] || {}
      const { layout: Layout = HField } = field

      return (
        <Layout
          key={index}
          component={TextInput}
          name={fieldKey}
          {...omit(field, ['layout'])}
        />
      )
    })

    if (typeof children === 'function') {
      children = children({ ...this.state, fields })
    }

    // If we have the `this.parentStore` then it means we're the nested form
    if (this.parentStore) {
      return <div>{children}</div>
    }

    return (
      <form className={className} onSubmit={this.handleSubmit}>
        {children}
      </form>
    )
  }
}

/**
 * Provide utility function and lifecycle methods for `Form`
 */
/* eslint-disable react/no-multi-comp */
export const createForm = (formConfig = {}) => WrappedComponent => {
  class Connect extends PureComponent {
    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  Connect.defaultProps = {
    ...FormDefaultConfig,
    ...formConfig,
  }

  return Connect
}
