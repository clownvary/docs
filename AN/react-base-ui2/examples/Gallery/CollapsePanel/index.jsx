import React from 'react';
import CollapsePanel from 'src/components/CollapsePanel';
import CollapsePanelMd from 'doc/api/components/CollapsePanel/CollapsePanel.md';
import DemoPage from '../../App/components/DemoPage';
import { Form, Group } from '../../App/components/Form';
import pickProps from '../../App/utils/pickProps';
import initSettings from './initSettings';

export default class Page extends DemoPage {
  static meta = {
    name: 'Collapse Panel',
    icon: 'icon-chevron-down',
    documents: [CollapsePanelMd],
    description: 'This example demonstrates the features of CollapsePanel.'
  }

  constructor(props) {
    super(props);

    this.onExpand.bind(this);
    this.onCollapse.bind(this);
  }

  getInitSettings() {
    return initSettings;
  }

  onExpand = () => {
    this.updateSetting('expanded', true);
    this.log('Expanded');
  }

  onCollapse = () => {
    this.updateSetting('expanded', false);
    this.log('Collapsed');
  }

  renderContent() {
    const { settings } = this.state;
    const props = pickProps(settings, ['expanded', 'transition', 'showSummary']);
    const summary = props.showSummary ? (<b>Summary goes here...</b>) : null;
    return (
      <CollapsePanel
        title="Profile"
        summary={summary}
        onExpand={this.onExpand}
        onCollapse={this.onCollapse}
        {...props}
      >
        <Form title="User Entries">
          <Group>
            <span className="field-label">First Name:</span>
            <span className="field">
              <input />
            </span>
          </Group>
          <Group>
            <span className="field-label">Last Name:</span>
            <span className="field">
              <input />
            </span>
          </Group>
          <Group>
            <span className="field-label">Address:</span>
            <span className="field">
              <input />
            </span>
          </Group>
        </Form>
      </CollapsePanel>
    );
  }

}
