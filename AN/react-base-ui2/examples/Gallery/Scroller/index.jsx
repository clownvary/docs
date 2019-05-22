import React from 'react';
import Scroller from 'src/components/Scroller';
import pickProps from '../../App/utils/pickProps';
import DemoPage from '../../App/components/DemoPage';
import initSettings from './initSettings';


class Page extends DemoPage {

  static meta = {
    name: 'Scroller',
    icon: 'icon-pace',
    align: 'center',
    description: 'This example demonstrates the features of Scroller.'
  };

  getInitSettings() {
    return initSettings;
  }

  renderContent() {
    const { settings } = this.state;
    const props = pickProps(settings, ['horizontal', 'vertical']);

    const corner = (
      <div style={{ width: '100%', height: '100%', backgroundColor: '#fd6e42' }}>
        <span>Duang</span>
      </div>
    );

    const header = (
      <div style={{ width: '1000px', height: '30px', backgroundColor: '#e1ff71' }}>
        <span>Header goes here</span>
        <span style={{ float: 'right' }}>Tail is here</span>
      </div>
    );

    const band = (
      <div style={{ width: '80px', height: '800px', backgroundColor: '#9ef9a1' }}>
        <span>Band goes here</span>
      </div>
    );

    const content = (
      <div style={{ width: '1000px', height: '800px', backgroundColor: 'lightblue' }}>
        <span>Content goes here</span>
      </div>
    );

    return (
      <div className="demo-layout">
        <Scroller
          style={{ width: '100%', height: '100%' }}
          corner={corner}
          header={header}
          band={band}
          content={content}
          {...props}
        />
      </div>
    );
  }
}


export default Page;
