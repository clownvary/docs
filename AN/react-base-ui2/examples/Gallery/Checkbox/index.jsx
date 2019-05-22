import React from 'react';
import Checkbox, { CheckboxGroup } from 'src/components/Checkbox';
import CheckboxMd from 'doc/api/components/Checkbox/Checkbox.md';
import CheckboxGroupMd from 'doc/api/components/Checkbox/CheckboxGroup.md';
import { Form } from '../../App/components/Form';
import DemoPage from '../../App/components/DemoPage';
import pickProps from '../../App/utils/pickProps';
import initSettings from './initSettings';


export default class Page extends DemoPage {
  static meta = {
    name: 'Checkbox',
    documents: [CheckboxMd, CheckboxGroupMd],
    icon: 'icon-check-square-o',
    description: 'This example demonstrates the features of Checkbox.'
  }

  constructor(props) {
    super(props);

    this.state = Object.assign({}, this.state, { checked: false });
  }

  getInitSettings() {
    return initSettings;
  }

  handleChange = (e) => {
    const { checked } = e.target;
    this.setState({ checked });
    this.log(`value: ${e.target.value}`);
    this.log(`checked: ${checked}`);
  }

  handleCheckboxGroupChange = (value) => {
    this.log(`CheckboxGroup value: ${value}`);
  }

  renderContent() {
    const { settings, checked } = this.state;
    const props = pickProps(settings, Object.keys(initSettings));

    const checkboxGroupData = [
      { text: 'Basketball', value: 'basketball' },
      { text: 'Tennis', value: 'tennis' },
      { text: 'Swimming', value: 'swimming' }
    ];

    return (
      <div>
        <Form title="Checkbox">
          <p>Open the settings panel for see more options.</p>
          <Checkbox
            checked={checked}
            {...props}
            onChange={this.handleChange}
          >
            Lighting PIN required
          </Checkbox>
        </Form>
        <Form title="Checkbox Group">
          <p>Default layout, with values from an array.</p>
          <CheckboxGroup
            size={props.size}
            disabled={props.disabled}
            data={checkboxGroupData}
            onChange={this.handleCheckboxGroupChange}
          />
          <br />
          <p>Customized layout, with embed values.</p>
          <CheckboxGroup disabled={props.disabled} value={[2]} size={props.size}>
            <div><Checkbox value={1}>Basketball</Checkbox></div>
            <div><Checkbox value={2}>Tennis</Checkbox></div>
            <div><Checkbox value={3}>Swimming</Checkbox></div>
          </CheckboxGroup>
        </Form>
      </div>
    );
  }
}
