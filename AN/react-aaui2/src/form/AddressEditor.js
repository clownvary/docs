import React, { PureComponent } from 'react'
import { bool, string, object, func, node, any, oneOfType } from 'prop-types'

import AddressStatic from './AddressStatic'
import connectForm from './connectForm'
import NestedForm from './NestedForm'
import Form from './index'
import HField from './HField'
import TextInput from './TextInput'
import Combobox from './Combobox'
import PostalCodeInput, { POSTAL_CODE_FIELD_KEY } from './PostalCodeInput'
import { FormFieldAPIPropTypes } from './types'

const FIELD_PREFIX = 'addressForm.addressField'
const getFieldValue = fieldValue => {
  // `null`, `undefined` => ''
  const finalFieldValue = fieldValue == null ? '' : fieldValue

  return typeof finalFieldValue === 'string'
    ? { value: finalFieldValue }
    : finalFieldValue
}

const getCountry = props => {
  let countryField
  if ('value' in props && props.value) {
    countryField = getFieldValue(props.value.country)
  }

  const country = countryField ? countryField.value : props.country

  return {
    country,
    countryField,
  }
}

class AddressEditor extends PureComponent {
  static propTypes = {
    static: bool,
    country: string,
    countriesConfig: object, // eslint-disable-line
    value: any, // eslint-disable-line

    fieldLayout: oneOfType([node, func]),
    ...FormFieldAPIPropTypes,
  }

  static defaultProps = {
    static: false,
    countriesConfig: {},
    country: 'US',
    fieldLayout: HField,
  }

  constructor(props, context) {
    super(props, context)

    this.state = this.getInitState()
  }

  componentDidMount() {
    // Load `countryConfig.json` if not passed as prop
    if (Object.keys(this.props.countriesConfig).length === 0) {
      import(/* webpackChunkName: "AUI/countryConfig" */
      './config/countryConfig.json').then(countriesConfig => {
        this.setState({
          countriesConfig,
        })
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { country } = getCountry(this.props)
    const { country: nextCountry } = getCountry(nextProps)

    if (this.props.country !== nextProps.country || country !== nextCountry) {
      this.clearError()
    }
  }

  getInitState() {
    const { countriesConfig } = this.props

    return {
      countriesConfig,
    }
  }

  getAvailCountries() {
    const { l10n } = this.props
    const { countriesConfig } = this.state

    return Object.keys(countriesConfig).map(country => ({
      text: l10n.formatMessage(`country.displayName.${country}`),
      value: country,
    }))
  }

  // Split field value into multiple parts for `line2.2`, `city.2`, etc.
  reduceFields = country => {
    const { value = {}, api: { getError } } = this.props
    const { countriesConfig } = this.state
    const countryConfig = countriesConfig[country]

    if (!countryConfig || !countryConfig.addressForm) {
      return { country, ...value }
    }

    const countryAddressFields = countryConfig.addressForm.addressFields

    return Object.keys(countryAddressFields).reduce(
      (r, k) => {
        const countryAddressField = countryAddressFields[k]
        const { position, options = [] } = countryAddressField
        const error = getError() || {}

        let addressPart = countryAddressField.addressPart

        const { value: fieldValue = '', ...fieldRest } = getFieldValue(
          value[addressPart],
        )
        const valueArr = fieldValue.split('\n')

        let finalField = {
          ...fieldRest,
          value: valueArr[0],
          errMsg: error[addressPart] || '',
        }

        // It means it has multiple parts for one address part
        if (position > 1) {
          addressPart = `${addressPart}.${position}`

          finalField = {
            ...fieldRest,
            value: valueArr[position - 1] || '',
            errMsg: error[addressPart] || '',
          }
        }

        // If it has multiple options (`Combobox`), we should check whether the value matches
        if (options && options.length !== 0 && fieldValue) {
          const data = options.map(option => option.fieldOptionValue)

          if (data.indexOf(fieldValue) === -1) {
            finalField.value = ''
          }
        }

        return { ...r, [addressPart]: finalField }
      },
      { country },
    )
  }

  reduceCountryAddressFields = country => {
    const { l10n } = this.props
    const { countriesConfig } = this.state
    let countryConfig = countriesConfig[country]

    if (!countryConfig) {
      countryConfig = countriesConfig.US
    }

    if (!countryConfig || !countryConfig.addressForm) {
      return []
    }

    const code = countryConfig.iso3166Code
    const countryAddressFields = countryConfig.addressForm.addressFields || []

    return Object.keys(countryAddressFields).reduce((r, k) => {
      const countryAddressField = countryAddressFields[k]
      const {
        required,
        addressPart,
        position,
        options = [],
      } = countryAddressField

      // Find the label key
      let label = `${FIELD_PREFIX}.${code}.${addressPart}`
      if (position > 1) {
        label = `${label}.${position}`
      }
      if (!l10n.formatMessage(label)) {
        label = `${FIELD_PREFIX}.${addressPart}`
      }

      let reducedAddressField = {
        name: position > 1 ? `${addressPart}.${position}` : addressPart,
        label,
        component: TextInput,
        required,
      }

      if (options && options.length !== 0) {
        const data = options.map(option => ({
          text: l10n.formatMessage(
            `${addressPart}.displayName.${code}.${option.fieldOptionValue}`,
          ),
          value: option.fieldOptionValue,
        }))
        reducedAddressField = {
          ...reducedAddressField,
          component: Combobox,
          maxHeight: '320px',
          data,
        }
      }

      if (addressPart === POSTAL_CODE_FIELD_KEY) {
        reducedAddressField = {
          ...reducedAddressField,
          countryConfig,
          component: PostalCodeInput,
        }
      }

      return [...r, reducedAddressField]
    }, [])
  }

  // Callback before triggering `onChange` of `Form`
  handlePreChange = values => {
    const { value = {} } = this.props
    const { countriesConfig } = this.state
    const { country } = values
    const valueKeys = Object.keys(values)
    const countryConfig = countriesConfig[country]

    if (!countryConfig || !countryConfig.addressForm) {
      return values
    }

    const countryAddressFields = countryConfig.addressForm.addressFields

    return Object.keys(countryAddressFields).reduce(
      (r, k) => {
        const countryAddressField = countryAddressFields[k]
        const { addressPart, position } = countryAddressField
        const addressPartPosition = `${addressPart}.${position}`
        const addressPartPositionValue = values[addressPartPosition]
        const addressPartValue = getFieldValue(value[addressPart])

        let finalFieldValue = values[addressPart]

        // If found `line2.2`, `city.2`, `stateProvince.2`, `line2.3` or `city.3`
        if (
          position > 1 &&
          addressPartPositionValue &&
          valueKeys.indexOf(addressPartPosition)
        ) {
          finalFieldValue = `${finalFieldValue}\n${addressPartPositionValue}`
        }

        return {
          ...r,
          [addressPart]: {
            ...addressPartValue,
            value: finalFieldValue,
          },
        }
      },
      { country },
    )
  }

  handleCountryChange = () => {
    this.clearError()
  }

  clearError() {
    const { api: { setError } } = this.props

    // Clear the error when country changes
    setError(null)
  }

  render() {
    const { fieldLayout: FieldLayout, ...rest } = this.props
    const { country, countryField } = getCountry(rest)
    const fields = this.reduceFields(country)
    const countries = this.getAvailCountries()
    const reducedCountryAddressFields = this.reduceCountryAddressFields(country)

    if (this.props.static) {
      return <AddressStatic address={this.props.value} {...rest} />
    }

    return (
      <NestedForm {...rest} fields={fields} preChange={this.handlePreChange}>
        <Form>
          <FieldLayout
            maxHeight="320px"
            name="country"
            label={`${FIELD_PREFIX}.country`}
            component={Combobox}
            data={countries}
            required
            onChange={this.handleCountryChange}
            {...countryField}
          />
          {reducedCountryAddressFields.map(f => (
            <FieldLayout key={f.name} name={f.name} {...f} />
          ))}
        </Form>
      </NestedForm>
    )
  }
}

export default connectForm()(AddressEditor)
