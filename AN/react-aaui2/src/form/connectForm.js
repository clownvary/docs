import { PureComponent, createElement } from 'react'

import Store from './store'
import getDisplayName from '../shared/getDisplayName'
import { identity, reduceReducers, omit } from '../shared/utils'
import { ValidationResult, ruleRunner } from './validation'
import reducer from './module'
import { FormFieldPropTypes, FormStorePropTypes } from './types'
import injectL10n from '../shared/injectL10n'

const aauiFormStore = Object.keys(FormStorePropTypes)[0]
const FormFieldConfig = {
  validator: () => validationResult => validationResult,
  parser: identity,
  formatter: identity,
}
const connectForm = (formFieldConfig = {}) => WrappedComponent => {
  class Connect extends PureComponent {
    static displayName = `Connect(${getDisplayName(WrappedComponent)})`
    static WrappedComponent = WrappedComponent
    static propTypes = {
      ...FormFieldPropTypes,
    }
    static contextTypes = {
      ...FormStorePropTypes,
    }
    static defaultProps = { ...FormFieldConfig, ...formFieldConfig }

    constructor(props, context) {
      super(props, context)

      this.store = props[aauiFormStore] || context[aauiFormStore] || new Store()

      this.boundSetValue = this.store.setValue.bind(this, props.name)
      this.boundGetValue = this.store.getValue.bind(this, props.name)
      this.boundSetError = this.store.setError.bind(this, props.name)
      this.boundGetError = this.store.getError.bind(this, props.name)
      this.boundGetErrorByName = this.store.getError.bind(this)
      this.boundGetValueByName = this.store.getValue.bind(this)
      this.boundApi = this.getApi()
    }

    componentDidMount() {
      if (!this.unregister) {
        this.unregister = this.store.injectReducer(this.props.name, reducer)
      }

      if (!this.unregisterValidator && this.store.tryInjectValidator) {
        this.unregisterValidator = this.store.tryInjectValidator(
          this.props.name,
          this.validate,
        )
      }
    }

    componentWillUnmount() {
      if (this.unregister) {
        this.unregister(this.props.name)
      }

      this.unregister = null

      if (this.unregisterValidator) {
        this.unregisterValidator(this.props.name)
      }

      this.unregisterValidator = null
    }

    onValidate = value => {
      const { errMsg } = this.validate(value)

      this.store.setError(this.props.name, errMsg)
    }

    getWrappedComponentInstance() {
      return this.wrappedComponentInstance
    }

    setWrappedComponentInstance = ref => {
      this.wrappedComponentInstance = ref
    }

    getApi = () => ({
      onValidate: this.onValidate,
      setValue: this.boundSetValue,
      getValue: this.boundGetValue,
      getValueByName: this.boundGetValueByName,
      setError: this.boundSetError,
      getError: this.boundGetError,
      getErrorByName: this.boundGetErrorByName,
      validateByName: this.validateByName,
    })

    validateByName = (value, name) => this.store.validators[name](value)

    validate = value => {
      const {
        name,
        required,
        validator,
        parser,
        rules,
        l10n,
        ...rest
      } = this.props
      const validators = []

      validators.push(ruleRunner)

      // Here is for your custom validation function
      if (validator && typeof validator === 'function') {
        validators.push(validator)
      }

      const chain = validators.map(validateFunc =>
        validateFunc({
          l10n,
          rules: required ? `required|${rules}` : rules,
          ...rest,
        }),
      )
      const { errMsg } = reduceReducers(...chain)(
        new ValidationResult(name, parser(value, { l10n }), null),
      )

      return {
        name,
        value,
        errMsg,
      }
    }

    render() {
      // Filter out props and don't pass through the component hierarchy
      const { errMsg, formatter, value, ...rest } = this.props

      let wrappedComponentProps = {
        ref: this.setWrappedComponentInstance,
        api: this.boundApi,
        ...rest,
      }

      if ('value' in this.props) {
        wrappedComponentProps = {
          ...wrappedComponentProps,
          value: errMsg ? value : formatter(value, this.props),
        }
      }

      this.renderedElement = createElement(
        WrappedComponent,
        omit(wrappedComponentProps, ['required', 'validator', 'parser']),
      )

      return this.renderedElement
    }
  }

  return injectL10n()(Connect)
}

export default connectForm
