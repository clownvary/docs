import React from 'react';
import moment from 'moment';
import InputDate from 'src/components/InputDate';
import InputDateMd from 'doc/api/components/InputDate/InputDate.md';
import DemoPage from '../../App/components/DemoPage';
import pickProps from '../../App/utils/pickProps';
import { Form, Group } from '../../App/components/Form';
import initSettings from './initSettings';


export default class Page extends DemoPage {

  static meta = {
    name: 'Input Date',
    icon: 'icon-calendar',
    documents: [InputDateMd],
    description: 'This example demonstrates the features of InputDate.'
  }

  getInitSettings() {
    return initSettings;
  }

  onValueChange(e) {
    this.log(e.value ? e.value.format('MMM DD, YYYY') : 'Blank value');
  }

  renderContent() {
    const now = moment();
    const { settings } = this.state;
    const props = pickProps(settings, ['showTrigger', 'allowBlank', 'min', 'max', 'flexibleCalendar', 'customFormat']);
    return (
      <div>
        <Form title="Custom Format" style={{ width: '500px' }}>
          <h4>Please change the format in settings panel</h4>
          <Group>
            <span className="field-label">{props.customFormat}:</span>
            <span className="field">
              <InputDate
                value={now}
                format={props.customFormat}
                onValueChange={(e) => { this.onValueChange(e); }}
                {...props}
              />
            </span>
          </Group>
        </Form>
        <Form title="ANet Traditional Formats" style={{ width: '600px' }}>
          <Group>
            <span className="field-label">DD MMM YYYY:</span>
            <span className="field">
              <InputDate
                value={now}
                format="DD MMM YYYY"
                onValueChange={(e) => { this.onValueChange(e); }}
                {...props}
              />
            </span>
          </Group>
          <Group>
            <span className="field-label">MMM DD, YYYY:</span>
            <span className="field">
              <InputDate
                value={now}
                format="MMM DD, YYYY"
                onValueChange={(e) => { this.onValueChange(e); }}
                {...props}
              />
            </span>
          </Group>
          <Group>
            <span className="field-label">YYYY MMM DD:</span>
            <span className="field">
              <InputDate
                value={now}
                format="YYYY MMM DD"
                onValueChange={(e) => { this.onValueChange(e); }}
                {...props}
              />
            </span>
          </Group>
        </Form>

        <Form title="More Candies">
          <Group>
            <span className="field-label">MMMM/DD YYYY:</span>
            <span className="field">
              <InputDate
                value={now}
                format="MMMM/DD YYYY"
                onValueChange={(e) => { this.onValueChange(e); }}
                {...props}
              />
            </span>
          </Group>
          <Group>
            <span className="field-label">dddd DD/MM/YYYY:</span>
            <span className="field">
              <InputDate
                value={now}
                format="dddd DD/MM/YYYY"
                onValueChange={(e) => { this.onValueChange(e); }}
                {...props}
              />
            </span>
          </Group>
          <Group>
            <span className="field-label">With literal:</span>
            <span className="field">
              <InputDate
                value={now}
                format="[Start date:] DD/MM/YYYY"
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
