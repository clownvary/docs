import React from 'react';
import { SafeText } from '../../src/components/SafeText/';

import '../base.less';
import '../layout.less';


class App extends React.PureComponent {

  render() {
    return (
      <div>
        <div className="sample-content">
          <div className="sample-form">
            <SafeText text={'default: span -> 111111Lois Ce&amp;nter without Facility'} />

            <SafeText tagName="span" text={'span -> 111111Lois Ce&amp;nter without Facility'} />

            <SafeText tagName="label" text={'label -> 111111Lois Ce&amp;nter without Facility'} />

            <SafeText tagName="div" text={'div -> 111111Lois Ce&amp;nter without Facility'} />

            <SafeText tagName="p" text={'p -> 111111Lois Ce&amp;nter without Facility'} />

            <SafeText tagName="li" text={'li -> 111111Lois Ce&amp;nter without Facility'} />

            <SafeText decode={false} text={'&quot;&lt;script&gt;alert(1);&lt;/script&gt;&quot;'} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
