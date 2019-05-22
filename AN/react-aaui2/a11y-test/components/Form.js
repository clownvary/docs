import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'

import {
  Form,
  NestedForm,
  TextInput,
  TextArea,
  UrlInput,
  EmailInput,
  Button,
  PhoneInput,
  NumericInput,
  Combobox,
  Radio,
  FormRadioGroup,
  AddressEditor,
  PostalCodeInput,
} from '../../src/index'
import FormTextArea from '../../src/form/TextArea'
import CountriesConfig from '../../src/form/config/countryConfig.json'
import L10nProvider from '../../src/shared/L10nProvider'
import { reduceInitFields } from '../../src/Form'

const INITIAL_FIELDS_DATA = {
  firstName: {
    value: '',
    parser: v => v,
    formatter: v => v,
    rules: 'required|min:10|max:10',
  },
  lastName: 'last name',
  sports: 'tennis',
  address: {
    fields: {
      country: 'ID',
      line1: 'line11111',
      line2: 'line22222',
      city: 'city11111\ncity2',
      stateProvince: 'AE',
      postalCode: '121212',
    },
  },
}
const localeStr = 'de_DE,de_AT,de_CH,en_AU,en_CA,en_GB,en_ZA,en_IE,en_NZ,en_US,es_ES,fr_CA,fr_FR,fr_CH,it_IT,it_CH,pt_BR,sv_SE,zh_CN'
const localeData = localeStr.split(',').map(l => ({
  text: l,
  value: l,
}))
const dropdownData = [{
  text: 'Tennis',
  value: 'tennis',
}, {
  text: 'Basketball',
  value: 'basketball',
}, {
  text: 'Swimming',
  value: 'swimming',
}]
const NestedComponent = ({ handleClearBtnClick }) => (
  <div>
    <hr />
    <Form.HField name='firstName' label='First Name' component={TextInput} required />
    <Form.HField name='new_sports' label='Sports' component={Combobox} data={dropdownData} required />
    <Button noSubmit onClick={handleClearBtnClick}>Empty Dynamic Fields</Button>
    <hr />
  </div>
)

NestedComponent.propTypes = {
  dynamicInsertFormFields: PropTypes.bool,
}

class App extends React.PureComponent {
  state = {
    fields: '',
    locale: 'en_US',
    country: 'can',
    richText: '',
    INITIAL_FIELDS: INITIAL_FIELDS_DATA,
  }

  handleCountryChange = ({ value }) => {
    this.setState({ country: value })
  }

  handleChange = fields => {
    this.setState({ fields: JSON.stringify(fields, null, 4) })
  }

  handleLocaleChange = ({ value }) => {
    this.setState({ locale: value })
  }

  handleEditorChange(e) {
    this.setState({ richText: e.target.getContent() })
  }

  handleUpdateFirstNameClick = () => {
    const { INITIAL_FIELDS } = this.state

    INITIAL_FIELDS.firstName = String((new Date()).valueOf())
    INITIAL_FIELDS.new_sports = 'basketball'

    this.setState({
      dynamicInsertFormFields: true,
      INITIAL_FIELDS: _.cloneDeep(INITIAL_FIELDS),
    })
  }

  handleClearBtnClick = e => {
    const { INITIAL_FIELDS } = this.state

    INITIAL_FIELDS.firstName = ''
    INITIAL_FIELDS.new_sports =  ''
    
    this.setState({
      INITIAL_FIELDS: _.cloneDeep(INITIAL_FIELDS),
    })
  }

  handleTextAreaChange = e => {
    this.setState({
      INITIAL_FIELDS: reduceInitFields(JSON.parse(e.target.value).values),
    })
  }

  render() {
    const { country, locale, INITIAL_FIELDS, dynamicInsertFormFields } = this.state

    return (
      <div style={{ fontFamily: 'ProximaNova, Arial, sans-serif' }}>
        <L10nProvider locale={locale}>
          <div className='grid'>
            <div className='grid-u-8-12'>
              <Form
                fields={INITIAL_FIELDS}
                onChange={this.handleChange}
                onSubmit={values => alert(JSON.stringify(values, null, 4))}
              >
                <Form.Error />
                <Form.HField name='locale' label='Locale' defaultValue={locale} component={Combobox} data={localeData} onChange={this.handleLocaleChange} />
                <hr />
                <Button noSubmit onClick={this.handleUpdateFirstNameClick}>Dynamic Insert Nested First Name and Sports Form Fields</Button>
                <hr />
                {dynamicInsertFormFields && <NestedComponent handleClearBtnClick={this.handleClearBtnClick} />}
                <Form.VField name='lastName' label='Last Name(VField)' rules='min:2|max:10' component={TextInput} required />
                <Form.HField name='email' label='Email' component={EmailInput} required />
                <Form.HField name='url' label='Url' component={UrlInput} />
                <Form.HField name='phone' label='Phone' component={PhoneInput} />
                <Form.HField name='number' label='Numeric' component={NumericInput} />
                <Form.HField name='regexp' label='RegExp (regexp:(^[a-z][0-9]$))' component={TextInput} rules='regexp:(^[a-z][0-9]$)' />
                <Form.HField name='postalCode' label='US Postal Code' component={PostalCodeInput} countryConfig={CountriesConfig.US} />
                <Form.HField name='combobox' label='combobox' component={Combobox} data={[{ text: 'TEST', value: 'test' }]} />
                <Form.HField name='description' label='Description' component={FormTextArea} rows={10} required />
                <Form.HField name='sports' label='Sports' component={FormRadioGroup}>
                  <Radio value='basketball'>Basketball</Radio>
                  <Radio value='tennis'>Tennis</Radio>
                  <Radio value='swimming'>Swimming</Radio>
                </Form.HField>
                <hr />
                <p>AddressEditor</p>
                <Form.Field name='address' component={AddressEditor} countriesConfig={CountriesConfig} />
                <hr />
                <Form.Field name='anotherAddress' component={NestedForm}>
                  <Form>
                    <p>Here is the nested form</p>
                    <Form.HField name='addressLine' label='addressForm.addressField.US.line1' required component={TextInput} />
                    <Form.HField
                      name='addressCountry'
                      onChange={this.handleCountryChange}
                      value={country}
                      label='addressForm.addressField.country'
                      component={Combobox}
                      data={[{ text: 'Canada', value: 'can' }, { text: 'China', value: 'chs' }, { text: 'Japan1', value: 'jap1' }]}
                      required
                    />
                  </Form>
                </Form.Field>
                <Button type='submit'>Submit</Button>
              </Form>
            </div>
            <div className='grid-u-4-12'>
              <p><strong>Displaying the values and errors here</strong></p>
              <TextArea rows='25' value={this.state.fields} onChange={this.handleTextAreaChange} />
              <Button noSubmit onClick={this.handleUpdateFirstNameClick}>
                Dynamic Insert Nested First Name and Sports Form Fields
              </Button>
            </div>
          </div>
        </L10nProvider>
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'))
