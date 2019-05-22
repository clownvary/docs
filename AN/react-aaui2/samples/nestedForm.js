import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import {
  Form,
  NestedForm,
  createForm,
  TextInput,
  EmailInput,
  Button,
  PhoneInput,
  NumericInput,
  Combobox,
} from '../src/index'
import { ValidationResult } from '../src/form/validation'
import L10nProvider from '../src/shared/L10nProvider'

const validator = () => validationResult => {
  const { name, value } = validationResult

  if (name === 'lastName' && value === 'last name') {
    return new ValidationResult(name, value, 'last.name.invalid')
  }

  return validationResult
}

const dropdownData = [
  {
    text: 'Canada',
    value: 'can',
  },
  {
    text: 'China',
    value: 'chs',
  },
  {
    text: 'Japan1',
    value: 'jap1',
  },
]

const AnotherAddressForm = props => (
  <NestedForm {...props}>
    <Form>
      <Form.HField name='addressLine' label='addressForm.addressField.US.line1' required component={TextInput} />
      <Form.HField name='addressCountry' label='addressForm.addressField.country' component={Combobox} data={dropdownData} required />
    </Form>
  </NestedForm>
)
const AddressForm = props => (
  <NestedForm {...props}>
    <Form>
      <p>Here is the nested form</p>
      <Form.Error name='addressCountry' />
      <Form.HField name='addressLine' label='addressForm.addressField.US.line1' required component={TextInput} />
      <Form.HField name='addressCountry' label='addressForm.addressField.country' component={Combobox} data={dropdownData} required />
      <hr />
      <p>Here is another nested nested form</p>
      <Form.Field name='address2' component={AnotherAddressForm} />
    </Form>
  </NestedForm>
)
const CustomizedForm = createForm({
  fields: {
    firstName: {
      defaultValue: 'first name',
      rules: 'required|min:2|max:10',
      parser: v => v,
      formatter: v => v,
      validator,
    },
    lastName: { validator },
    email: { defaultValue: 'defalut@defalut.com' },
  },
  onSubmit: values => {
    console.log(`Form values: ${JSON.stringify(values, null, 4)}`)
  },
  onFail: errors => {
    console.error(`Form errors: ${JSON.stringify(errors, null, 4)}`)
  },
  onChange: state => {
    console.log(`Form changes: ${JSON.stringify(state, null, 4)}`)
  },
})(({ onSubmit, ...rest }) => (
  <Form onSubmit={onSubmit} {...rest}>
    <Form.Error />
    <Form.HField name='firstName' label='First Name' component={TextInput} />
    <Form.HField name='lastName' label='Last Name' component={TextInput} required />
    <Form.HField name='email' label='Email' component={EmailInput} required />
    <Form.HField name='phone' label='Phone' component={PhoneInput} required />
    <Form.HField name='number' label='Numeric' component={NumericInput} required />
    <hr />
    <Form.Field name='address1' component={AddressForm} />
    <Button type='submit'>Submit</Button>
  </Form>
  ))

class App extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      locale: 'en_US',
      messages: {
        'last.name.invalid': 'Hi, the last name is invalid!',
      },
    }
  }

  render() {
    return (
      <div style={{ fontFamily: 'ProximaNova' }}>
        <L10nProvider messages={this.state.messages} locale={this.state.locale}>
          <CustomizedForm
            onSubmit={values => {
              console.log(`CustomizedForm onSubmit values: ${JSON.stringify(values, null, 4)}`)
            }}
          />
        </L10nProvider>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
