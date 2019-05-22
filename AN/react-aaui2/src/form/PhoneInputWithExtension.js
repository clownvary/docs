import React from 'react'
import { string } from 'prop-types'

import connectForm from './connectForm'
import { FormFieldAPIPropTypes } from './types'
import TextInput from './TextInput'
import PhoneInput from './PhoneInput'
import Field from './Field'
import Row from '../grid/Row'
import Col from '../grid/Col'
import { omit } from '../shared/utils'

class PhoneInputWithExtension extends React.PureComponent {
  static propTypes = {
    name: string,
    extensionName: string,
    value: string,
    phoneRules: string,
    ...FormFieldAPIPropTypes,
  }

  state = {}

  getExtensionName = () =>
    this.props.extensionName || `${this.props.name}Extension`

  handlePhoneExtChange = () => {
    const { api } = this.props

    this.setState({
      phoneExt: api.getValueByName(this.getExtensionName()),
    })
  }

  handlePhoneInputExtensionBlur = () => {
    const { name, value, api } = this.props
    const { errMsg } = api.validateByName(value, name)
    const extErrMsg = api.getErrorByName(this.getExtensionName())

    if (errMsg || extErrMsg) {
      api.setError(errMsg || extErrMsg)
    } else {
      api.setError(null)
    }
  }

  render() {
    const { name, rules, ...rest } = this.props

    return (
      <Row gutter={15} onBlur={this.handlePhoneInputExtensionBlur}>
        <Col span={8}>
          <Field
            component={PhoneInput}
            name={name}
            rules={rules}
            {...omit(rest, ['extensionName'])}
          />
        </Col>
        <Col span={4}>
          <Field
            component={TextInput}
            rules="regexp:(^[0-9]*$)"
            name={this.getExtensionName()}
            value={this.state.phoneExt}
            onChange={this.handlePhoneExtChange}
          />
        </Col>
      </Row>
    )
  }
}

export default connectForm()(PhoneInputWithExtension)
