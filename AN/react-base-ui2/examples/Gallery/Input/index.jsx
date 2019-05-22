import React from 'react';
import Input from 'src/components/Input';
import InputMd from 'doc/api/components/Input/Input.md';
import DemoPage from '../../App/components/DemoPage';
import pickProps from '../../App/utils/pickProps';
import { Form, Group } from '../../App/components/Form';
import initSettings from './initSettings';

export default class Page extends DemoPage {
  static meta = {
    name: 'Input',
    icon: 'icon-square-o',
    documents: [InputMd],
    description: 'This example demonstrates the features of Input.'
  }

  getInitSettings() {
    this.numberOnly = false;
    return initSettings;
  }

  onValueChange = (value) => {
    if (this.numberOnly) {
      value = value.replace(/\D/g, '');
      this.input.value = value;
    }
    this.log(value);
  }

  onBlur = () => {
    this.log('onBlur');
  }

  renderContent() {
    const { settings } = this.state;
    const props = pickProps(settings);
    this.numberOnly = props.numberOnly;
    delete props.numberOnly;

    return (
      <div>
        <Form title="Input">
          <Group>
            <span className="field-label">Input:</span>
            <span className="field">
              <Input
                {...props}
                onValueChange={e => this.onValueChange(e.value)}
                onBlur={() => this.onBlur()}
                ref={(c) => { this.input = c; }}
              />
            </span>
          </Group>
        </Form>
      </div>
    );
  }
}
