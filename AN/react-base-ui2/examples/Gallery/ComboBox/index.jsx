import React from 'react';
import ComboBox from 'src/components/ComboBox';
import ComboBoxMd from 'doc/api/components/ComboBox/ComboBox.md';
import DemoPage from '../../App/components/DemoPage';
import pickProps from '../../App/utils/pickProps';
import { Form, Group } from '../../App/components/Form';
import initSettings from './initSettings';

const items = [{
  balance: 20,
  text: 111111,
  cardType: 'JG1 Gift Certificate1',
  value: 95
},
{
  balance: 25,
  text: 22222222,
  cardType: 'JG1 Gift Certificate2',
  value: 96
},
{
  balance: 210,
  text: 3333333,
  cardType: 'JG1 Gift Certificate3',
  value: 97
}];

export default class Page extends DemoPage {

  static meta = {
    name: 'ComboBox',
    icon: 'icon-archive',
    documents: [ComboBoxMd],
    description: 'This example demonstrates the features of ComboBox.'
  }

  getInitSettings() {
    return initSettings;
  }

  renderItem = ({ item }) =>
    <ul>
      <li><b>{item.cardType}</b></li>
      <li>{item.text}</li>
      <li>
        {item.balance}
      </li>
    </ul>;

  handleTextChange = () =>
    this.log('text change');

  renderContent() {
    const { settings } = this.state;
    const props = pickProps(settings);
    return (
      <div>
        <Form title="ComboBox">
          <Group>
            <span className="field-label">ComboBox:</span>
            <span className="field">
              <ComboBox
                {...props}
                items={items}
                onListRender={this.renderItem}
                onTextChange={this.handleTextChange}
              />
            </span>
          </Group>
        </Form>
      </div>
    );
  }

}
