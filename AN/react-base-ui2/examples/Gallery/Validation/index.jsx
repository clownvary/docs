import React from 'react';
import map from 'lodash/map';
import { InputField } from 'src/components/Input';
import Button from 'src/components/Button';
import Validation from 'src/services/validation';
import ErrorList from 'src/services/validation/components/ErrorList';
import * as ErrorAlignment from 'src/services/validation/consts/ErrorAlignment';
import { Form, Group } from '../../App/components/Form';
import DemoPage from '../../App/components/DemoPage';

/* eslint-disable max-len */
export default class Page extends DemoPage {
  static meta = {
    name: 'Validation',
    icon: 'icon-check-square-o',
    description: 'This example demonstrates the features of Validation.'
  }

  constructor(props) {
    super(props);
    this.state.errFieldsBySubmit = [];
    this.state.submited = false;
    this.state.submitErrs = [];
    this.state.fields = {
      name: {
        fieldName: 'Name',
        rules: 'required|alpha|minLength:5',
        value: ''
      },
      password: {
        fieldName: 'Password',
        rules: 'required|rangeLength:[6,10]',
        value: ''
      },
      phone: {
        fieldName: 'Phone Number',
        rules: 'digits',
        value: ''
      },
      postalCode: {
        fieldName: 'Postal Code',
        rules: 'zipcode:US',
        value: ''
      },
      eMail: {
        fieldName: 'E-Mail',
        rules: 'required|email',
        value: ''
      },
      url: {
        fieldName: 'URL',
        rules: 'url',
        value: ''
      },
      comment: {
        fieldName: 'Comment',
        rules: 'maxLength:30',
        value: ''
      }
    };
    this.state.validationMessages = {
      rangeLength: '{name} must provide {param} characters.'
    };
  }

  onValidated(fieldName, fieldKey) {
    const { fields, submitErrs } = this.state;

    fields[fieldKey].customMessages = '';
    submitErrs[fieldKey] = '';

    this.setState({
      submitErrs: Object.assign({}, submitErrs),
      fields: Object.assign({}, fields)
    });
  }

  onLeave(fieldKey, fieldVal) {
    const fields = this.state.fields;
    fields[fieldKey].value = fieldVal;
    this.setState({
      fields
    });
  }

  onSubmit() {
    const { fields, validationMessages } = this.state;
    const errors = {};

    map(fields, (filedInfo, fieldKey) => {
      const validateResult = Validation.createValidator(filedInfo.rules, validationMessages)
        .validate(filedInfo.fieldName, filedInfo.value);
      if (!validateResult.isValid) {
        errors[fieldKey] = validateResult.message;
        fields[fieldKey].customMessages = validateResult.message;
      } else {
        fields[fieldKey].customMessages = '';
      }
    });

    this.setState({
      submitErrs: errors,
      fields: Object.assign({}, fields)
    });
  }

  renderContent() {
    const {
      fields,
      validationMessages,
      submitErrs
    } = this.state;
    const messages = Object.keys(submitErrs).map(errFieldKey => submitErrs[errFieldKey]).filter(msg => msg);

    return (
      <div>
        {/* <h2>Welcome.Please fill in your information to register and have fun.</h2> */}
        <ErrorList messages={messages} style={{ padding: '0 0 12px 12px', marginTop: '-20px' }} />
        <Form title="Welcome.Please fill in your information to register and have fun." size="lg">
          {map(fields, (filedInfo, key) => (
            <Group key={`${filedInfo.fieldName}_${key}`}>
              <span className="field-label">
                {filedInfo.labelName || filedInfo.fieldName}
                <span style={{ fontSize: '12px' }}> ({ filedInfo.rules.split('|').join(' | ') })</span>:
              </span>
              <div className="field">
                <InputField
                  rules={filedInfo.rules}
                  fieldName={filedInfo.fieldName}
                  validationMessages={validationMessages}
                  showError
                  errorAlignment={ErrorAlignment.RIGHT}
                  onLeave={(value => this.onLeave(key, value))}
                  customMessages={filedInfo.customMessages}
                  onValidated={() => this.onValidated(filedInfo.fieldName, key)}
                />
              </div>
            </Group>
          ))}
          <Group>
            <span className="field-label" />
            <div className="field">
              <Button
                onClick={() => this.onSubmit()}
              >
                Submit
              </Button>
            </div>
          </Group>
        </Form>
      </div>
    );
  }

}

