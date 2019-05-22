import React from 'react';
import { connect } from 'react-redux';
import Button from 'src/components/Button';
import { MessageBoard, clearAll } from 'src/services/message';
import Content from './content';
import { doAsyncAction, doAsyncChainAction, doDispatchChainAction } from './actions';
import { TestTypes } from './callAPI';

import '../base.less';
import '../layout.less';
import './app.less';

class App extends React.PureComponent {

  onException(custom) {
    this.props.doAsyncAction(TestTypes.TEST_EXCEPTION, custom);
  }

  onHttpFailure(custom) {
    this.props.doAsyncAction(TestTypes.TEST_HTTP_FAILURE, custom);
  }

  onServiceFailure(custom) {
    this.props.doAsyncAction(TestTypes.TEST_SERVICE_FAILURE, custom);
  }

  onAppFailure(custom) {
    this.props.doAsyncAction(TestTypes.TEST_APP_FAILURE, custom);
  }

  doSuccess(custom) {
    this.props.doAsyncAction(TestTypes.TEST_SUCCESS, custom);
  }

  doAsyncChain(custom) {
    this.props.doAsyncChainAction(custom);
  }

  doDispatchChain(custom) {
    this.props.doDispatchChainAction(custom);
  }

  render() {
    return (
      <div>
        <MessageBoard />
        <Content />

        <div className="bottom-bar">
          <div className="button-group">
            <span>Default Behaviors:</span>
            <Button type="primary" size="sm" onClick={() => this.doSuccess()}>API Success</Button>
            <Button type="primary" size="sm" onClick={() => this.onException()}>Exception</Button>
            <Button type="primary" size="sm" onClick={() => this.onHttpFailure()}>HTTP Failure</Button>
            <Button type="primary" size="sm" onClick={() => this.onServiceFailure()}>SERVICE Failure</Button>
            <Button type="primary" size="sm" onClick={() => this.onAppFailure()}>APP Failure</Button>
            <Button type="secondary" size="sm" onClick={() => clearAll()}>Clear Messages</Button>
          </div>
          <div className="button-group">
            <span>Custom Behaviors:</span>
            <Button type="primary" size="sm" onClick={() => this.doSuccess(true)}>API Success</Button>
            <Button type="primary" size="sm" onClick={() => this.onException(true)}>Exception</Button>
            <Button type="primary" size="sm" onClick={() => this.onHttpFailure(true)}>HTTP Failure</Button>
            <Button type="primary" size="sm" onClick={() => this.onServiceFailure(true)}>SERVICE Failure</Button>
            <Button type="primary" size="sm" onClick={() => this.onAppFailure(true)}>APP Failure</Button>
          </div>
          <div className="button-group">
            <span>Chain Behaviors:</span>
            <Button type="primary" size="sm" onClick={() => this.doAsyncChain()}>Function Chain</Button>
            <Button type="primary" size="sm" onClick={() => this.doDispatchChain()}>Dispatch Chain</Button>
          </div>
          <div className="button-group">
            <span>Custom in Chain:</span>
            <Button type="primary" size="sm" onClick={() => this.doAsyncChain(true)}>Function Chain</Button>
            <Button type="primary" size="sm" onClick={() => this.doDispatchChain(true)}>Dispatch Chain</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, {
  doAsyncAction,
  doAsyncChainAction,
  doDispatchChainAction
})(App);
