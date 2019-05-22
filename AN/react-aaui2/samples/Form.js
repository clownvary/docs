import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash'

import { Form, TextArea, Button, Radio, Checkbox, Row, Col } from '../src'

import CountriesConfig from '../src/form/config/countryConfig.json'
import L10nProvider from '../src/shared/L10nProvider'
import { reduceFieldsProp } from '../src/form/utils'
import { localeData, dropdownData } from './DATA'

const {
  Field,
  FlexField,
  NestedForm,
  TextInput,
  PasswordTextInput,
  UrlInput,
  EmailInput,
  PhoneInput,
  PhoneInputWithExtension,
  NumericInput,
  Combobox,
  Select,
  RadioGroup,
  CheckboxGroup,
  AddressEditor,
  PostalCodeInput,
  DateInput,
  DateRangeInput,
} = Form

const fields = {
  locale: 'zh_CN',
  firstName: {
    value: 'Khalil',
    parser: v => v,
    formatter: v => v,
    rules: 'required|min:2|max:10',
  },
  lastName: 'Zhang',
  password: 'start123',
  email: 'kzhang@active.com',
  static_email: 'static_email_field@active.com',
  date: '2014-05-12',
  url: 'http://www.baidu.com',
  phone: '6502041982',
  number: '123456789',
  regexp: 'a1',
  postalCode: '12345',
  combobox: 'test',
  description:
    'This library contains a set of flexiable and practical reusable components conforming to the product styleguide and React-based implementation.',
  sports: 'tennis',
  sports_checkboxgroup: ['basketball', 'tennis'],
  dateRange: {
    value: {
      startDate: '2017-04-12',
      endDate: '2017-06-08',
    },
  },
  address: {
    value: {
      country: 'US',
      line1: 'line1',
      line2: 'line2',
      city: 'city1\ncity2',
      stateProvince: 'AE',
      postalCode: '11111',
    },
  },
  addressWithoutPassingCountriesConfig: {
    value: {
      country: 'ID',
      line1: 'ID line1',
      line2: 'ID line2',
      city: 'ID city1\nID city2',
      stateProvince: 'ID stateProvince1\nID stateProvince2',
    },
  },
  anotherAddress: {
    value: {
      addressLine: 'addressLine',
      addressCountry: 'jap1',
    },
  },
  tinyMCEEditor: 'MY tinyMCEEditor',
}

class App extends React.PureComponent {
  state = {
    formChanged: false,
    locale: 'en_US',
    anotherAddressCountry: 'chs',
    richText: '',
    fields,
  }

  handleAnotherAddressCountryChange = ({ value }) => {
    this.setState({ anotherAddressCountry: value })
  }

  handleChange = ({ fields, values, errors }) => {
    this.setState({
      values: fields,
      errors,
    })
    // console.log('values ' + JSON.stringify(values, null, 4))
    // console.log('errors ' + JSON.stringify(errors, null, 4))
  }

  handleLocaleChange = ({ value: locale }) => {
    this.setState({ locale })
  }

  handleEditorChange(e) {
    this.setState({ richText: e.target.getContent() })
  }

  handleDynamicInsertFormFieldsClick = () => {
    const { fields } = this.state

    fields.firstName = String(new Date().valueOf())
    fields.new_sports = 'basketball'

    this.setState({
      dynamicInsertFormFields: true,
      fields: _.cloneDeep(fields),
    })
  }

  handleClearBtnClick = e => {
    const { fields } = this.state

    fields.firstName = ''
    fields.new_sports = ''

    this.setState({
      fields: _.cloneDeep(fields),
    })
  }

  handleFormValuesTextAreaChange = e => {
    this.setState({
      fields: JSON.parse(e.target.value),
    })
  }

  handleFormErrorsTextAreaChange = e => {
    this.setState({
      fields: JSON.parse(e.target.value),
    })
  }

  render() {
    const {
      anotherAddressCountry,
      locale,
      fields,
      dynamicInsertFormFields,
    } = this.state

    return (
      <div
        className="container"
        style={{
          marginTop: '100px',
          fontFamily: 'ProximaNova, Arial, sans-serif',
        }}
      >
        <L10nProvider locale={locale}>
          <Row gutter={15}>
            <Col span={8}>
              <Form
                fields={fields}
                onChange={this.handleChange}
                onSubmit={values => alert(JSON.stringify(values, null, 4))}
              >
                {({ changed }) => (
                  <div>
                    <Form.Error />
                    <FlexField
                      name="locale"
                      label="Locale"
                      component={Combobox}
                      data={localeData}
                      onChange={this.handleLocaleChange}
                    />
                    <FlexField
                      name="firstName"
                      label="First Name"
                      component={TextInput}
                      required
                    />
                    <FlexField
                      name="lastName"
                      label="Last Name"
                      rules="min:2|max:10"
                      component={TextInput}
                      required
                    />
                    <FlexField
                      name="password"
                      label="Password"
                      component={PasswordTextInput}
                      required
                    />
                    <FlexField
                      name="email"
                      label="Email"
                      component={EmailInput}
                      required
                    />
                    <FlexField
                      name="date"
                      label="Date"
                      component={DateInput}
                      required
                    />
                    <FlexField
                      name="dateRange"
                      label="DateRange"
                      component={DateRangeInput}
                      required
                    />
                    <FlexField name="url" label="Url" component={UrlInput} />
                    <FlexField
                      name="phone"
                      label="Phone"
                      component={PhoneInput}
                    />
                    <FlexField
                      name="phoneB"
                      label="PhoneExtension"
                      extensionName="phoneBExt"
                      component={PhoneInputWithExtension}
                    />
                    <FlexField
                      name="number"
                      label="Numeric"
                      component={NumericInput}
                    />
                    <FlexField
                      name="regexp"
                      label="RegExp (regexp:(^[a-z][0-9]$))"
                      component={TextInput}
                      rules="regexp:(^[a-z][0-9]$)"
                    />
                    <FlexField
                      name="postalCode"
                      label="US Postal Code"
                      component={PostalCodeInput}
                      countryConfig={CountriesConfig.US}
                    />
                    <FlexField
                      name="combobox"
                      label="Combobox"
                      component={Combobox}
                      data={[{ text: 'TEST', value: 'test' }]}
                    />
                    <FlexField
                      name="Selectcombobox"
                      label="SelectCombobox"
                      component={Select}
                      data={[{ text: 'TEST', value: 'test' }]}
                    />
                    <FlexField
                      name="description"
                      label="Description"
                      component={Form.TextArea}
                      rows={10}
                      required
                    />
                    <FlexField
                      name="sports"
                      label="Sports"
                      component={RadioGroup}
                    >
                      <Radio value="basketball">Basketball</Radio>
                      <Radio value="tennis">Tennis</Radio>
                      <Radio value="swimming">Swimming</Radio>
                    </FlexField>
                    <FlexField
                      name="sports_checkboxgroup"
                      label="Sports"
                      component={CheckboxGroup}
                    >
                      <Checkbox value="basketball">Basketball</Checkbox>
                      <Checkbox value="tennis">Tennis</Checkbox>
                      <Checkbox value="swimming">Swimming</Checkbox>
                    </FlexField>
                    <hr />
                    <p>Static Fileds</p>
                    <FlexField
                      static
                      label="Static Email"
                      name="static_email"
                      component={TextInput}
                    />
                    <hr />
                    <p>AddressEditor</p>
                    <Field
                      name="address"
                      component={AddressEditor}
                      countriesConfig={CountriesConfig}
                    />
                    <hr />
                    <Button disabled={!changed}>Submit</Button>
                  </div>
                )}
              </Form>
            </Col>
            <Col span={4}>
              <p>
                <strong>Form values</strong>
              </p>
              <TextArea
                rows="25"
                value={JSON.stringify(this.state.values, null, 4)}
                onChange={this.handleFormValuesTextAreaChange}
              />
              <hr />
              <p>
                <strong>Form errors</strong>
              </p>
              <TextArea
                rows="25"
                value={JSON.stringify(this.state.errors, null, 4)}
                onChange={this.handleFormErrorsTextAreaChange}
              />
            </Col>
          </Row>
        </L10nProvider>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
