import React from 'react';
import Button from 'src/components/Button';
import { confirm } from 'src/services/confirmation';

import '../base.less';
import '../layout.less';
import './app.less';

class App extends React.PureComponent {
  onShowConfirm(msg, options) {
    confirm(
      (
        <div>
          <h3>
            {msg}
          </h3>
        </div>
      ),
      { ...options }
    ).then(() => {
      console.log('Confirmed');
    }, () => {
      console.log('Canceled');
    });
  }

  render() {
    const defaultOptions = {
      title: 'Demo',
      showCancel: true,
      cancelText: 'cancel',
      confirmText: 'ok',
      value: 'Hi'
    };
    return (
      <div>
        <div className="bottom-bar">
          <Button type="primary" size="sm" onClick={() => this.onShowConfirm('This is test...')}>Show Confirm</Button>
          <Button type="primary" size="sm" onClick={() => this.onShowConfirm('Testing with options', defaultOptions)}>Show Confirm(options)</Button>
        </div>
      </div>
    );
  }
}

export default App;
