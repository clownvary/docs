import React from 'react';
import map from 'lodash/map';
import random from 'lodash/random';
import InputNumeric from 'src/components/InputNumeric';
import InputNumericMd from 'doc/api/components/InputNumeric/InputNumeric.md';
import DemoPage from '../../App/components/DemoPage';
import pickProps from '../../App/utils/pickProps';
import { Form, Group } from '../../App/components/Form';
import initSettings from './initSettings';


const numSorter = (a, b) => {
  if (a > b) {
    return 1;
  }

  if (a < b) {
    return -1;
  }

  return 0;
};

const generateNumItems = (min, max, float = false) =>
  (map(Array(20), () => random(min, max, float))).sort(numSorter);

export default class Page extends DemoPage {

  static meta = {
    name: 'Input Numeric',
    icon: 'icon-sign-m',
    documents: [InputNumericMd],
    description: 'This example demonstrates the features of InputNumeric.'
  }

  getInitSettings() {
    return initSettings;
  }

  onValueChange(e) {
    this.log((e.value || 0) + (e.outOfRange ? ' Out of range' : ''));
  }

  renderContent() {
    const { settings } = this.state;
    const props = pickProps(settings, ['showTrigger', 'showSpinner', 'showGroup', 'disabled', 'readonly',
      'allowKeySpin', 'allowMouseSpin', 'increment',
      'placeHolder', 'decimals', 'min', 'max']);
    props.listMaxHeight = '200px';
    props.min = +props.min;
    props.max = +props.max;

    return (
      <div>
        <Form title="Types">
          <Group>
            <span className="field-label">General:</span>
            <span className="field">
              <InputNumeric
                value="12345"
                items={generateNumItems(1, 100000)}
                renderItem={({ item }) => (<div>{item.text} <br /> {item.value}</div>)}
                onValueChange={(e) => { this.onValueChange(e); }}
                {...props}
              />
            </span>
          </Group>
          <Group>
            <span className="field-label">Currency:</span>
            <span className="field">
              <InputNumeric
                value="12345"
                type="currency"
                items={generateNumItems(1, 100000)}
                onValueChange={(e) => { this.onValueChange(e); }}
                {...props}
              />
            </span>
          </Group>
          <Group>
            <span className="field-label">Percentage:</span>
            <span className="field">
              <InputNumeric
                value="1.45"
                type="percent"
                items={generateNumItems(1, 10, true)}
                onValueChange={(e) => { this.onValueChange(e); }}
                {...props}
              />
            </span>
          </Group>
        </Form>

        <Form title="Quantity">
          <Group>
            <span className="field-label">Attendees:</span>
            <span className="field">
              <InputNumeric
                value="1"
                max={10}
                min={1}
                decimals={0}
                icon="icon-people-m"
                showSpinner
                onValueChange={(e) => { this.onValueChange(e); }}
              />
            </span>
          </Group>
          <Group>
            <span className="field-label">Quantity:</span>
            <span className="field">
              <InputNumeric
                value="1"
                max={10}
                min={1}
                decimals={0}
                icon="icon-cart-m"
                showSpinner
                onValueChange={(e) => { this.onValueChange(e); }}
              />
            </span>
          </Group>
        </Form>
      </div>
    );
  }

}
