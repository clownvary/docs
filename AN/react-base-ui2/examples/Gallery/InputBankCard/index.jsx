import React from 'react';
import InputBankCard from 'src/components/InputBankCard';
import InputBankCardMd from 'doc/api/components/InputBankCard/InputBankCard.md';
import { Form, Group } from '../../App/components/Form';
import DemoPage from '../../App/components/DemoPage';
import pickProps from '../../App/utils/pickProps';
import initSettings from './initSettings';

export default class Page extends DemoPage {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.state, { value: '35634875638456' });

    this.onInput.bind(this);
  }

  static meta = {
    name: 'Input BankCard',
    icon: 'icon-cc-visa',
    documents: [InputBankCardMd],
    description: 'This example demonstrates the features of InputBankCard.'
  };

  getInitSettings() {
    return initSettings;
  }

  onInput = (e, text, value) => {
    this.log(`text: ${text}, value: ${value}`);
    this.setState({
      value: text
    });
  }

  renderContent() {
    const { settings, value } = this.state;
    const props = pickProps(settings, ['maxLength', 'group', 'gapChar', 'showPrompt', 'keepPosition']);
    return (
      <Form title="InputBankCard">
        <Group>
          <span className="field">
            <InputBankCard
              value={value}
              {...props}
              placeholder="Please enter a card number"
              onInput={(...args) => this.onInput(...args)}
              onBlur={() => this.log('onBlur is called')}
            />
          </span>
        </Group>
      </Form>
    );
  }

}
