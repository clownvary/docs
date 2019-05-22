import React from 'react';
import Breadcrumb from '../../src/components/Breadcrumb';

import '../base.less';
import '../layout.less';


class App extends React.PureComponent {

  render() {
    const routes = [
      { path: '/test', breadcrumbOptions: { name: 'Test' } }
    ];

    return (
      <div>
        <div className="sample-content">
          <div className="sample-form">
            <Breadcrumb separator="/" routes={routes} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
