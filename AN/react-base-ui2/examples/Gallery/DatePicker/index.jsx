import React from 'react';
import moment from 'moment';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import DatePicker from 'src/components/DatePicker';
import DatePickerMd from 'doc/api/components/DatePicker/DatePicker.md';
import DemoPage from '../../App/components/DemoPage';
import { Form, Group } from '../../App/components/Form';

export default class Page extends DemoPage {

  static meta = {
    name: 'Date Picker',
    icon: 'icon-coffee',
    documents: [DatePickerMd],
    description: 'This example demonstrates the features of DatePicker.'
  }

  onValueChange(e) {
    this.log(isArray(e.value) ?
      `[${e.value.map(v => v.format('MM/DD/YYYY')).join(',')}]` :
      e.value.format('MM/DD/YYYY'));
  }

  onCalendarOpen() {
    this.log('Calendar Open');
  }

  onCalendarClose() {
    this.log('Calendar Close');
  }

  renderContent() {
    return (
      <Form title="Date Picker">
        <Group>
          <span className="field-label">Default:</span>
          <span className="field">
            <DatePicker
              onValueChange={(e) => { this.onValueChange(e); }}
              onCalendarOpen={(e) => { this.onCalendarOpen(e); }}
              onCalendarClose={(e) => { this.onCalendarClose(e); }}
            />
          </span>
        </Group>
        <Group>
          <span className="field-label">Customized text:</span>
          <span className="field">
            <DatePicker
              onValueChange={(e) => { this.onValueChange(e); }}
              onCalendarOpen={(e) => { this.onCalendarOpen(e); }}
              onCalendarClose={(e) => { this.onCalendarClose(e); }}
              formatTextValue={(value) => {
                if (!isArray(value)) {
                  value = [value];
                }

                if (isEmpty(value)) return '';

                if (value.length === 1) {
                  return value[0].format('MM/DD-YYYY');
                }

                if (value.length <= 3) {
                  return `Wow! ${value.length} dates are selected`;
                }

                return `Crazy! ${value.length} dates?`;
              }}
            />
          </span>
        </Group>
        <Group>
          <span className="field-label">Single date:</span>
          <span className="field">
            <DatePicker
              onValueChange={(e) => { this.onValueChange(e); }}
              onCalendarOpen={(e) => { this.onCalendarOpen(e); }}
              onCalendarClose={(e) => { this.onCalendarClose(e); }}
              value={moment().add(2, 'days')}
            />
          </span>
        </Group>
        <Group>
          <span className="field-label">Multiple dates:</span>
          <span className="field">
            <DatePicker
              onValueChange={(e) => { this.onValueChange(e); }}
              onCalendarOpen={(e) => { this.onCalendarOpen(e); }}
              onCalendarClose={(e) => { this.onCalendarClose(e); }}
              value={[moment().add(2, 'days'), moment().add(3, 'days')]}
            />
          </span>
        </Group>
      </Form>
    );
  }

}
