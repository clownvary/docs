import React from 'react';
import Button from 'src/components/Button';
import LoadingBar from 'src/components/LoadingBar';
import { Loading } from 'src/services/loading';

import '../base.less';
import '../layout.less';
import './app.less';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      wait: 500,
      count: 20,
      timeout: 50,
      interval: 200
    };
  }

  trigger() {
    const pageLoading = new Loading({ wait: this.state.wait });
    for (let i = 0; i < this.state.count; i += 1) {
      setTimeout(() => pageLoading.show(), this.state.interval * i);
      setTimeout(() => pageLoading.hide(), (this.state.timeout + this.state.interval) * i);
    }
  }

  render() {
    return (
      <div>
        <div className="gallary">
          <div className="loading-sm">
            <LoadingBar />
          </div>
          <div className="loading-md">
            <LoadingBar spinSize="md" />
          </div>
          <div className="loading-lg">
            <LoadingBar spinSize="lg" />
          </div>
        </div>
        <div className="bottom-bar">
          <div>
            <div className="field">
              <span>Loading Bar wait time(ms):</span>
              <input
                defaultValue={this.state.wait}
                onChange={e => this.setState({ wait: parseInt(e.target.value, 10) || 0 })}
              />
            </div>

            <div className="field">
              <span>simulate trigger count:</span>
              <input
                defaultValue={this.state.count}
                onChange={e => this.setState({ count: parseInt(e.target.value, 10) || 0 })}
              />
            </div>
            <div className="field">
              <span>API fetch timeout(ms):</span>
              <input
                defaultValue={this.state.timeout}
                onChange={e => this.setState({ timeout: parseInt(e.target.value, 10) || 0 })}
              />
            </div>
            <div className="field">
              <span>trigger API interval(ms):</span>
              <input
                defaultValue={this.state.interval}
                onChange={e => this.setState({ interval: parseInt(e.target.value, 10) || 0 })}
              />
            </div>
          </div>

          <div className="button-group">
            <Button type="primary" size="sm" onClick={() => this.trigger()}>
              Trigger
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
