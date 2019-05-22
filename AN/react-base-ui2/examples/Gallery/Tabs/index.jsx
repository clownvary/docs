import React from 'react';
import { Tabs, Tab } from 'src/components/Tabs';
import TabsMd from 'doc/api/components/Tabs/Tabs.md';
import TabMd from 'doc/api/components/Tabs/Tab.md';
import DemoPage from '../../App/components/DemoPage';
import pickProps from '../../App/utils/pickProps';
import initSettings from './initSettings';


export default class Page extends DemoPage {
  static meta = {
    name: 'Tabs',
    icon: 'icon-folder-o',
    documents: [TabsMd, TabMd],
    description: 'This example demonstrates the features of Tabs and Tab.'
  };

  constructor(props) {
    super(props);
    this.state = {
      testDisabled: false,
      id: 'mb',
      settings: this.getInitSettings()
    };
    this.onTabChange = this.onTabChange.bind(this);
  }

  getInitSettings() {
    return initSettings;
  }

  onTabChange(id) {
    this.log(`tab selected: ${id}`);
  }

  renderContent() {
    const { settings } = this.state;
    const config = pickProps(settings, ['size', 'selectedId', 'disabledId']);
    const { disabledId } = config;

    return (
      <div className="sample-content">
        <Tabs size="sm" onChange={this.onTabChange} {...config}>
          <Tab disabled={disabledId === 'ng'} id="ng" title="Angular">Angular</Tab>
          <Tab disabled={disabledId === 'mb'} id="mb" title="Ember">Ember</Tab>
          <Tab disabled={disabledId === 'rt'} id="rt" title="React">React</Tab>
          <Tab disabled={disabledId === 'bb'} id="bb" title="Backbone">Backbone</Tab>
        </Tabs>
      </div>
    );
  }

}
