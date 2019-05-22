import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

import {
  Button,
  Form,
  TextInput,
  Combobox,
  TextArea,
} from '../src/index'

import L10nProvider from '../src/shared/L10nProvider'

const localeStr = 'de_DE,de_AT,de_CH,en_AU,en_CA,en_GB,en_ZA,en_IE,en_NZ,en_US,es_ES,fr_CA,fr_FR,fr_CH,it_IT,it_CH,pt_BR,sv_SE,zh_CN'

const localeDataArray = localeStr.split(',').map(l => ({
  text: l,
  value: l,
}))

const countryDataArray = [
  {
    text: 'Canada',
    value: 'can',
  },
  {
    text: 'China',
    value: 'chs',
  },
  {
    text: 'USA',
    value: 'us',
  },
]

let groupId = 0

class App extends PureComponent {
  state = {
    fields: '',
    locale: 'en_US',
    localeData: localeDataArray,
    countryData: countryDataArray,
    INITIAL_FIELDS: {},
    formGroups: [],
  }

  handleChange = fields => {
    this.setState({ fields: JSON.stringify(fields, null, 4) })
  }

  handleGroupChange = (val, name) => {
    const { INITIAL_FIELDS } = this.state
    this.setState({
      INITIAL_FIELDS: {
        ...INITIAL_FIELDS,
        [name]: val,
      },
    })
  }

  handleInsertGroup = () => {
    const { INITIAL_FIELDS, formGroups } = this.state

    const newFields = {
      [`locale_${groupId}`]: 'en_US',
      [`firstName_${groupId}`]: `My Name is ${groupId}`,
      [`country_${groupId}`]: 'can',
    }

    this.setState({
      formGroups: [...formGroups, {
        id: groupId,
      }],
      INITIAL_FIELDS: {
        ...INITIAL_FIELDS,
        ...newFields,
      },
    })
    groupId += 1
  }

  handleClearFields = () => {
    const { INITIAL_FIELDS } = this.state

    const newFields = {}

    Object.keys(INITIAL_FIELDS).forEach(key => {
      newFields[key] = ''
    })

    this.setState({
      INITIAL_FIELDS: {
        ...INITIAL_FIELDS,
        ...newFields,
      },
    })
  }

  render() {
    const { INITIAL_FIELDS, localeData, countryData, locale, fields, formGroups } = this.state

    return (
      <L10nProvider locale={locale}>
        <Form
          fields={INITIAL_FIELDS}
          onChange={this.handleChange}
          onSubmit={values => alert(JSON.stringify(values, null, 4))}
        >
          <Button noSubmit onClick={this.handleInsertGroup}>Insert a group fields</Button>
          <Button noSubmit onClick={this.handleClearFields}>Empty all fields</Button>
          <hr />
          {formGroups.length > 0 ? formGroups.map((group, row) => (
              <div key={row}>
                <Form.VField name={`locale_${row}`} label={`Locale_${row}`} component={Combobox} data={localeData} onChange={({value}) => { this.handleGroupChange(value, `locale_${row}`) }} required />
                <Form.VField name={`firstName_${row}`} label={`First Name ${row}`} component={TextInput} onChange={({value}) => { this.handleGroupChange(value, `firstName_${row}`) }} required />
                <Form.VField name={`country_${row}`} label={`Country ${row}`} component={Combobox} data={countryData} onChange={({value}) => { this.handleGroupChange(value, `country_${row}`) }} required />
                <hr />
              </div>
            )) : undefined}
          <Button type='primary'>Submit</Button>
          <hr />
          <p><strong>Displaying the values and errors here</strong></p>
          <TextArea rows='10' value={fields} />
        </Form>
      </L10nProvider>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'))
