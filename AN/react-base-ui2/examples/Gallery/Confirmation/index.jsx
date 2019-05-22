import React from 'react';
import DemoPage from '../../App/components/DemoPage';
import initSettings from './initSettings';

export default class Page extends DemoPage {
  static meta = {
    name: 'Confirmation',
    icon: 'icon-square-o',
    description: 'This example demonstrates the features of Confirmation.'
  }

  getInitSettings() {
    return initSettings;
  }

  renderContent() {
    return (
      <div>
        <h1>Confirmation Service</h1>
        <h3>Open the settings panel by clicking the Tools icon on header bar</h3>
      </div>
    );
  }
}
