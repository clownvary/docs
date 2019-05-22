import React from 'react';
import Progress from 'src/components/Progress';
import ProgressMd from 'doc/api/components/Progress/Progress.md';
import DemoPage from '../../App/components/DemoPage';
import { Form } from '../../App/components/Form';
import pickProps from '../../App/utils/pickProps';
import initSettings from './initSettings';

export default class Page extends DemoPage {
  static meta = {
    name: 'Progress',
    icon: 'icon-thermometer-medium-high',
    documents: [ProgressMd],
    description: 'This example demonstrates the features of Progress.'
  }

  getInitSettings() {
    return initSettings;
  }

  renderContent() {
    const { settings } = this.state;
    const props = pickProps(settings, ['percent', 'showInfo', 'size']);

    return (
      <Form title="Progress">
        <Progress percent={+props.percent} showInfo={props.showInfo} size={props.size} />
      </Form>
    );
  }

}
