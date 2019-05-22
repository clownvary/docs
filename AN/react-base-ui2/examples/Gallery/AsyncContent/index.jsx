import React from 'react';
import AsyncContent from 'src/components/AsyncContent';
import AsyncContentMd from 'doc/api/components/AsyncContent/AsyncContent.md';
import DemoPage from '../../App/components/DemoPage';
import pickProps from '../../App/utils/pickProps';
import initSettings from './initSettings';

export default class Page extends DemoPage {

  static meta = {
    name: 'Async Content',
    icon: 'icon-loading-m',
    help: '#AsyncContent',
    documents: [AsyncContentMd],
    description: 'This example demonstrates the features of AsyncContent.'
  };

  getInitSettings() {
    return initSettings;
  }

  getPromiseResolvedAfterDelay = delay => new Promise((resolve) => {
    setTimeout(resolve, delay);
  });

  renderContent() {
    const { settings } = this.state;
    const props = pickProps(settings, ['placeHolderType', 'placeHolder', 'delay']);
    const { placeHolderType, placeHolder, delay } = props;
    return (
      <div>
        <AsyncContent
          loader={() => this.getPromiseResolvedAfterDelay(delay)}
          placeHolder={placeHolder}
          component={<h3>Completed!</h3>}
          placeHolderType={placeHolderType}
        />
      </div>
    );
  }

}
