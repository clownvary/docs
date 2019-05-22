import React from 'react';
import BackTop from 'src/components/BackTop';
import BackTopMd from 'doc/api/components/BackTop/BackTop.md';
import DemoPage from '../../App/components/DemoPage';
import pickProps from '../../App/utils/pickProps';
import initSettings from './initSettings';

export default class Page extends DemoPage {
  constructor(props) {
    super(props);
    this.onBackTopClick = this.onBackTopClick.bind(this);
  }

  static meta = {
    name: 'BackTop',
    icon: 'icon-arrow-up',
    documents: [BackTopMd],
    description: 'This example demonstrates the features of BackTop.'
  };

  componentDidMount() {
    document.body.style.height = '1600px';
  }

  componentWillUnmount() {
    document.body.style.height = '100%';
  }

  getInitSettings() {
    return initSettings;
  }

  getTarget = () => document.querySelector('.an-demopage__body ');

  backButtonRenderer = (defaultBtn, btnProps) => (<button className="customize-back-top" {...btnProps}>Top</button>);

  onBackTopClick() {
    this.log('BackTop is clicked');
  }

  renderContent() {
    const { settings } = this.state;
    const props = pickProps(settings, ['visibilityHeight', 'scrollDuration', 'customizeRender']);
    if (props.customizeRender) {
      props.backButtonRenderer = this.backButtonRenderer;
    }
    return (
      <div>
        <p>Scrolldown the page to see the back top button.</p>
        <BackTop
          {...props}
          className="mock-back-top"
          getTarget={this.getTarget}
          onClick={this.onBackTopClick}
        />
      </div>
    );
  }
}
