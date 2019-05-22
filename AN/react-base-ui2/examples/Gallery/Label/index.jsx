import React from 'react';
import Label from 'src/components/Label';
import LabelMd from 'doc/api/components/Label/Label.md';
import DemoPage from '../../App/components/DemoPage';
import pickProps from '../../App/utils/pickProps';
import initSettings from './initSettings';

export default class Page extends DemoPage {
  static meta = {
    name: 'Label',
    icon: 'icon-tag',
    documents: [LabelMd],
    description: 'This example demonstrates the features of Label.'
  }

  getInitSettings() {
    return initSettings;
  }

  renderContent() {
    const { settings } = this.state;
    const props = pickProps(settings);

    return (
      <div>
        <Label {...props}>Add Icons From Library…</Label>
      </div>
    );
  }
}
