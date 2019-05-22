import React from 'react';
import Button from 'src/components/Button';
import ButtonMd from 'doc/api/components/Button/Button.md';
import DemoPage from '../../App/components/DemoPage';
import pickProps from '../../App/utils/pickProps';
import initSettings from './initSettings';

export default class Page extends DemoPage {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  static meta = {
    name: 'Button',
    icon: 'icon-square',
    documents: [ButtonMd],
    description: 'This example demonstrates the features of Button.'
  };

  getInitSettings() {
    return initSettings;
  }

  onButtonClick() {
    this.log('Button is clicked');
  }

  renderContent() {
    const { settings } = this.state;
    const props = pickProps(settings, ['size', 'type', 'loading']);
    return (
      <div>
        <Button
          {...props}
          onClick={this.onButtonClick}
        >
          Hello
        </Button>
      </div>
    );
  }

}
