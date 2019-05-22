import React from 'react';
import moment from 'moment';
import InputTime from 'src/components/InputTime';
import InputTimeMd from 'doc/api/components/InputTime/InputTime.md';
import DemoPage from '../../App/components/DemoPage';
import pickProps from '../../App/utils/pickProps';
import { Form, Group } from '../../App/components/Form';
import initSettings from './initSettings';


export default class Page extends DemoPage {

  static meta = {
    name: 'Input Time',
    icon: 'icon-clock-m',
    documents: [InputTimeMd],
    description: 'This example demonstrates the features of InputTime.'
  }

  getInitSettings() {
    return initSettings;
  }

  onValueChange(e) {
    this.log(e.value ? e.value.format('h:mm A') : 'Blank value');
  }

  renderContent() {
    const now = moment();
    const { settings } = this.state;
    const props = pickProps(settings, ['showTrigger2', 'allowBlank']);
    return (
      <div>
        <Form title="ANet Traditional Formats">
          <Group>
            <span className="field-label">h:mm A:</span>
            <span className="field">
              <InputTime
                value={now}
                format="h:mm A"
                onValueChange={(e) => { this.onValueChange(e); }}
                {...props}
              />
            </span>
          </Group>
          <Group>
            <span className="field-label">H:mm:</span>
            <span className="field">
              <InputTime
                value={now}
                format="H:mm"
                onValueChange={(e) => { this.onValueChange(e); }}
                {...props}
              />
            </span>
          </Group>
        </Form>

        <Form title="More Candies">
          <Group>
            <span className="field-label">With literal:</span>
            <span className="field">
              <InputTime
                value={now}
                format="[Start time is ]h:mm A"
                onValueChange={(e) => { this.onValueChange(e); }}
                {...props}
              />
            </span>
          </Group>
          <Group>
            <span className="field-label">H:mm a:</span>
            <span className="field">
              <InputTime
                value={now}
                format="H:mm a"
                onValueChange={(e) => { this.onValueChange(e); }}
                {...props}
              />
            </span>
          </Group>
          <Group>
            <span className="field-label">HH:mm A:</span>
            <span className="field">
              <InputTime
                value={now}
                format="HH:mm A"
                onValueChange={(e) => { this.onValueChange(e); }}
                {...props}
              />
            </span>
          </Group>
        </Form>
      </div>
    );
  }

}
