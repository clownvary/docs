import React from 'react';
import DialogBoxMd from 'doc/api/components/DialogBox/DialogBox.md';
import DemoPage from '../../App/components/DemoPage';
import initSettings from './initSettings';

export default class Page extends DemoPage {
  static meta = {
    name: 'DialogBox',
    icon: 'icon-square-o',
    documents: [DialogBoxMd],
    description: 'This example demonstrates the features of DialogBox.'
  }

  getInitSettings() {
    return initSettings;
  }

  renderContent() {
    return (
      <div>
        <h1>Dialog</h1>
        <h3>Open the settings panel by clicking the Tools icon on header bar</h3>
      </div>
    );
  }
}
