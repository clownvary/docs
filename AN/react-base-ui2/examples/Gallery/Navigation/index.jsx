import React from 'react';
import DemoPage from '../../App/components/DemoPage';
import initSettings from './initSettings';


export default class Page extends DemoPage {
  static meta = {
    name: 'Navigation Service',
    icon: 'icon-retweet',
    description: 'This example demonstrates the features of Navigation Service.'
  }

  getInitSettings() {
    return initSettings;
  }

  renderContent() {
    return (
      <div>
        <h1>Navigation Service</h1>
        <h3>Open the settings panel by clicking the Tools icon on header bar</h3>
      </div>
    );
  }

}
