import React from 'react';
import moment from 'moment';
import InputMoment from 'src/components/InputMoment';
import InputMomentMd from 'doc/api/components/InputMoment/InputMoment.md';
import InputDateTime from 'src/components/InputDateTime';
import DemoPage from '../../App/components/DemoPage';
import pickProps from '../../App/utils/pickProps';
import { Form, Group } from '../../App/components/Form';
import initSettings from './initSettings';


export default class Page extends DemoPage {

  static meta = {
    name: 'Input Moment',
    icon: 'icon-camera',
    documents: [InputMomentMd],
    description: 'This example demonstrates the features of InputMoment.'
  }

  getInitSettings() {
    return initSettings;
  }

  onValueChange(e) {
    this.log(e.value ? e.value.format('MMM DD, YYYY h:mm A') : 'Blank value');
  }

  renderContent() {
    const now = moment();
    const { settings } = this.state;
    const props = pickProps(settings, ['showTrigger', 'showTrigger2', 'placeHolder', 'min', 'max']);
    return (
      <div>
        <Form title="Input Moment">
          <Group>
            <span className="field-label">Short date & time:</span>
            <span className="field">
              <InputMoment
                value={now}
                onValueChange={(e) => { this.onValueChange(e); }}
                {...props}
              />
            </span>
          </Group>
          <Group>
            <span className="field-label">Long date & time:</span>
            <span className="field">
              <InputMoment
                value={now}
                format="D"
                onValueChange={(e) => { this.onValueChange(e); }}
                {...props}
              />
            </span>
          </Group>
        </Form>

        <Form title="Input DateTime" style={{ width: '530px' }}>
          <Group>
            <span className="field-label">Date Time:</span>
            <span className="field">
              <InputDateTime
                value={now}
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
