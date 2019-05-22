import React from 'react';
import Phone from 'src/components/Phone';
import PhoneMd from 'doc/api/components/Phone/index.md';
import DemoPage from '../../App/components/DemoPage';
import pickProps from '../../App/utils/pickProps';
import initSettings from './initSettings';

export default class Page extends DemoPage {

  static meta = {
    name: 'Phone',
    icon: 'icon-phone',
    documents: [PhoneMd],
    description: 'This example demonstrates the features of Phone.'
  }

  getInitSettings() {
    return initSettings;
  }

  onPhoneChange(phone) {
    this.log(phone);
  }

  renderContent() {
    const { settings } = this.state;
    const props = pickProps(settings);
    return (
      <div>
        <Phone
          value="110-123456-09"
          onChange={phone => this.onPhoneChange(phone)}
          {...props}
        />
      </div>
    );
  }
}
