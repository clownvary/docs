import React from 'react';
import Button from 'src/components/Button';
import {
   MessageBoard,
   showError,
   clearError,
   showWarning,
   clearWarning,
   clearAll
} from 'src/services/message';

import '../base.less';
import '../layout.less';
import './app.less';

class App extends React.PureComponent {
  onShowError() {
    showError([
      'The firt line of error message.<br>With HTML in.',
      'The second line of error message.'
    ]);
  }

  onClearError() {
    clearError();
  }

  onAppendError() {
    showError([
      'Some more error...'
    ], { appendMode: true });
  }

  onRemoveError() {
    clearError([
      'Some more error...'
    ]);
  }

  onShowWarning() {
    showWarning([
      'Some warning goes here...'
    ]);
  }

  onClearWarning() {
    clearWarning();
  }

  onClearAll() {
    clearAll();
  }

  render() {
    return (
      <div>
        <MessageBoard />
        <div className="bottom-bar">
          <Button type="primary" size="sm" onClick={this.onShowError}>Show Errors</Button>
          <Button type="primary" size="sm" onClick={this.onAppendError}>Append Errors</Button>
          <Button type="primary" size="sm" onClick={this.onRemoveError}>Remove Errors</Button>
          <Button type="primary" size="sm" onClick={this.onClearError}>Clear Errors</Button>
          <Button type="secondary" size="sm" onClick={this.onShowWarning}>Show Warning</Button>
          <Button type="secondary" size="sm" onClick={this.onClearWarning}>Clear Warning</Button>
          <Button type="strong" size="sm" onClick={this.onClearAll}>Clear All</Button>
        </div>
      </div>
    );
  }
}

export default App;
