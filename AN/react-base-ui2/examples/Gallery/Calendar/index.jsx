import React from 'react';
import Calendar from 'src/components/Calendar';
import isArray from 'lodash/isArray';
import CalendarMd from 'doc/api/components/Calendar/Calendar.md';
import DateViewMd from 'doc/api/components/Calendar/DateView.md';
import MonthViewMd from 'doc/api/components/Calendar/MonthView.md';
import YearViewMd from 'doc/api/components/Calendar/YearView.md';
import HeaderMd from 'doc/api/components/Calendar/Header.md';
import DemoPage from '../../App/components/DemoPage';
import pickProps from '../../App/utils/pickProps';
import initSettings from './initSettings';

export default class Page extends DemoPage {

  static meta = {
    name: 'Calendar',
    icon: 'icon-calendar',
    documents: [CalendarMd, DateViewMd, MonthViewMd, YearViewMd, HeaderMd],
    description: 'This example demonstrates the features of Calendar.'
  }

  getInitSettings() {
    return initSettings;
  }

  renderContent() {
    const { settings } = this.state;
    const props = pickProps(settings);
    props.value = isArray(props.value) ? props.value : [props.value];

    return (
      <Calendar
        {...props} valueChanged={(dates) => {
          this.updateSetting('value', dates[0]);
          this.log(`[event] valueChanged: ${dates[0].toString()}`);
        }}
      />
    );
  }

}
