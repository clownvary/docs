import React from 'react';
import moment from 'moment';
import InputTimeRange from 'src/components/InputTimeRange';
import MomentRange from 'src/common/MomentRange';
import InputTimeRangeMd from 'doc/api/components/InputTimeRange/InputTimeRange.md';
import DemoPage from '../../App/components/DemoPage';
import { Form, Group } from '../../App/components/Form';
import initSettings from './initSettings';

export default class Page extends DemoPage {

  static meta = {
    name: 'Input Time Range',
    icon: 'icon-clock-m',
    documents: [InputTimeRangeMd],
    description: 'This example demonstrates the features of InputTimeRange.'
  }

  getInitSettings() {
    return initSettings;
  }

  onValueChange(timeRange) {
    this.log(timeRange);
  }

  renderContent() {
    const { settings } = this.state;
    const props = settings;

    const format = 'h:mm A';

    const value = new MomentRange({
      start: moment('9:00 AM', format),
      end: moment('12:00 PM', format)
    });

    const items = [{
      value,
      text: '9:00 AM to 12:00 PM',
      selected: false
    }, {
      value: new MomentRange({
        start: moment('8:00 PM', format),
        end: moment('9:00 PM', format)
      }),
      text: '8:00 PM to 9:00 PM',
      selected: false
    }, {
      value: new MomentRange({
        start: moment('1:20 PM', format),
        end: moment('2:50 PM', format)
      }),
      text: '1:20 PM to 2:50 PM',
      selected: false
    }, {
      value: new MomentRange({
        start: moment('4:06 PM', format),
        end: moment('6:00 PM', format)
      }),
      text: '4:06 PM to 6:00 PM',
      selected: false
    }];

    const format1 = 'H:mm';

    const value1 = new MomentRange({
      start: moment('8:00', format1),
      end: moment('9:00', format1)
    });

    const items1 = [{
      value: new MomentRange({
        start: moment('9:00', format1),
        end: moment('12:00', format1)
      }),
      text: '9:00 to 12:00',
      selected: false
    }, {
      value: value1,
      text: '8:00 to 9:00 ',
      selected: false
    }, {
      value: new MomentRange({
        start: moment('1:20', format1),
        end: moment('2:50', format1)
      }),
      text: '1:20 to 2:50',
      selected: false
    }, {
      value: new MomentRange({
        start: moment('4:06', format1),
        end: moment('6:00', format1)
      }),
      text: '4:06 to 6:00',
      selected: false
    }];

    return (
      <div>
        <Form title="ANet Traditional Formats">
          <Group>
            <span className="field-label">h:mm A:</span>
            <span className="field" >
              <InputTimeRange
                format="h:mm A"
                items={items}
                value={value}
                onValueChange={(timeRange) => { this.onValueChange(timeRange); }}
                {...props}
              />
            </span>
          </Group>
          <Group>
            <span className="field-label">H:mm:</span>
            <span className="field">
              <InputTimeRange
                items={items1}
                value={value1}
                onValueChange={(timeRange) => { this.onValueChange(timeRange); }}
                {...props}
                format="H:mm"
              />
            </span>
          </Group>
        </Form>
      </div>
    );
  }

}
