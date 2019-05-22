import React from 'react';
import LoadingBar from 'src/components/LoadingBar';
import LoadingBarMd from 'doc/api/components/LoadingBar/LoadingBar.md';
import DemoPage from '../../App/components/DemoPage';
import pickProps from '../../App/utils/pickProps';
import initSettings from './initSettings';

export default class Page extends DemoPage {
  static meta = {
    name: 'LoadingBar',
    icon: 'icon-loading-m icon-spin',
    documents: [LoadingBarMd],
    description: 'This example demonstrates the features of LoadingBar.'
  };

  getInitSettings() {
    return initSettings;
  }

  renderContent() {
    const { settings } = this.state;
    const props = pickProps(settings, ['spinSize', 'text']);
    return (
      <div style={{ height: '200px' }}>
        <LoadingBar {...props} />
      </div>
    );
  }
}
