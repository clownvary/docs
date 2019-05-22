import React from 'react';
import { RadioGroup } from 'src/components/Radio';
import RadioMd from 'doc/api/components/Radio/Radio.md';
import RadioGroupMd from 'doc/api/components/Radio/RadioGroup.md';
import DemoPage from '../../App/components/DemoPage';
import pickProps from '../../App/utils/pickProps';
import { Form, Group } from '../../App/components/Form';
import initSettings from './initSettings';

const data = [
  { text: 'apple', value: 'apple' },
  { text: 'book', value: 'book' },
  { text: 'cat', value: 'cat' },
  { text: 'dog', value: 'dog' },
  { text: 'egg', value: 'egg' }
];
const defaultValue = 'cat';

export default class Page extends DemoPage {
  constructor(props) {
    super(props);

    this.onRadioChange = this.onRadioChange.bind(this);
  }

  static meta = {
    name: 'Radio',
    icon: 'icon-dot-circle-o',
    documents: [RadioMd, RadioGroupMd],
    description: 'This example demonstrates the features of Radio.'
  };

  getInitSettings() {
    return initSettings;
  }

  onRadioChange(e) {
    this.log(`checked option: ${e.target.value}`);
  }

  renderContent() {
    const { settings } = this.state;
    const props = pickProps(settings, ['size', 'disabled']);
    return (
      <div className="sample-content">
        <Form title="Radio Group">
          <Group>
            <span className="field">
              <RadioGroup
                name="items"
                data={data}
                defaultValue={defaultValue}
                {...props}
                onChange={this.onRadioChange}
              />
            </span>
          </Group>
        </Form>
      </div>
    );
  }

}
