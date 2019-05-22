import React from 'react';
import Steps from 'src/components/Steps';
import Button from 'src/components/Button';
import stepsMd from 'doc/api/components/Steps/steps.md';
import stepItemMd from 'doc/api/components/Steps/stepItem.md';
import DemoPage from '../../App/components/DemoPage';

export default class Page extends DemoPage {
  static meta = {
    name: 'Steps',
    icon: 'icon-list-alt',
    documents: [stepsMd, stepItemMd],
    description: 'This example demonstrates the features of Steps.'
  }

  constructor(props) {
    super(props);

    this.state = Object.assign({}, this.state, { current: 1, currentStatus: 'process' });
  }

  onChange = (activeKey) => {
    this.setState({
      activeKey: [...activeKey]
    });

    this.log(activeKey);
  }

  twoOnChange = (twoActiveKey) => {
    this.setState({
      twoActiveKey: [...twoActiveKey]
    });

    this.log(twoActiveKey);
  }

  getDataSource() {
    return [
      {
        title: 'Finished',
        description: 'description'
      },
      {
        title: 'In process',
        description: 'description'
      },
      {
        title: 'In process',
        description: 'description'
      },
      {
        title: 'error',
        description: 'description'
      }
    ];
  }

  getDataSourceTwo() {
    return [
      {
        title: 'Finished',
        status: 'finish',
        description: 'description'
      },
      {
        title: 'In process',
        status: 'process',
        description: 'description'
      },
      {
        title: 'In process',
        status: 'error',
        description: 'description'
      },
      {
        title: 'error',
        description: 'description'
      }
    ];
  }

  getDataSourceOne() {
    return [
      {
        status: 'finish',
        title: 'Login',
        description: 'description',
        icon: <i className="icon icon-check-circle-o" />
      },
      {
        status: 'error',
        title: 'Verification',
        description: 'description',
        icon: <i className="icon icon-email" />
      },
      {
        status: 'wait',
        title: 'Login',
        description: 'description',
        icon: <i className="icon icon-running" />
      }
    ];
  }

  hanldePrev = () => {
    const { current } = this.state;
    if (current > 1) {
      this.setState({ current: current - 1, currentStatus: 'process' });
    }
  }

  hanldeNext = () => {
    const { current } = this.state;
    const dataLength = this.getDataSource().length;
    if (current < dataLength) {
      this.setState({ current: current + 1, currentStatus: 'process' });
    }

    if ((current + 1) === dataLength) {
      this.setState({ currentStatus: 'error' });
    }
  }

  renderContent() {
    const { current, currentStatus } = this.state;

    return (
      <div className="steps-example">
        <div>
          <Steps labelPlacement="vertical" current={current} currentStatus={currentStatus} dataSource={this.getDataSource()} />
          <div className="butotn-container">
            <Button onClick={this.hanldePrev} className="prev-button">prev</Button>
            <Button onClick={this.hanldeNext}>next</Button>
          </div>
        </div>

        <div className="self-set-icon">
          <Steps dataSource={this.getDataSourceOne()} className="self-icon" />
        </div>

        <div className="vertical">
          <Steps direction="vertical" current={2} >
            {this.getDataSourceTwo().map(item => (
              <Steps.StepItem
                key={item.title}
                title={item.title}
                status={item.status}
                description={item.description}
              />
            ))}
          </Steps>
        </div>
      </div>
    );
  }
}
