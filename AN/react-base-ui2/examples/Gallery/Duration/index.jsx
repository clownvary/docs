import React from 'react';
import Duration from 'src/components/Duration';
import DurationMd from 'doc/api/components/Duration/Duration.md';
import DemoPage from '../../App/components/DemoPage';

export default class Page extends DemoPage {
  static meta = {
    name: 'Duration',
    icon: 'icon-clock-m',
    documents: [DurationMd],
    description: 'This example demonstrates the features of Duration.'
  }

  onDurationChange = (value) => {
    this.log(value);
  }

  renderContent() {
    return (
      <div>
        <p id="duration_id">Duration Component</p>
        <Duration
          ariaLabelledbyProvider={ids => `duration_id${ids ? ` ${ids}` : ''}`}
          onChange={value => this.onDurationChange(value)}
        />
      </div>
    );
  }
}
