import React from 'react';
import MessageBoard from 'src/components/MessageBoard';
import DemoPage from '../../App/components/DemoPage';
import initSettings from './initSettings';


export default class Page extends DemoPage {
  static meta = {
    name: 'Error Service',
    icon: 'icon-medkit',
    description: 'This example demonstrates the features of Error Handling Service.'
  }

  getInitSettings() {
    return initSettings;
  }

  renderContent() {
    return (
      <div>
        <MessageBoard />
        <h1>Error Handling Service</h1>
        <h3>Open the settings panel by clicking the Tools icon on header bar</h3>
      </div>
    );
  }

}
