import React from 'react';
import UIComponent from 'shared/components/UIComponent';
import CollapsePanel from 'react-base-ui/lib/components/CollapsePanel';
import ResourceBookingSummary from './ResourceBookingSummary';

import './index.less';

export default class BookingSummary extends UIComponent {

  constructor(props) {
    super(props);
    this.state = {
      expanded: true
    };
  }

  toggleState = () => this.setState({ expanded: !this.state.expanded });

  render() {
    const { resources } = this.props;
    const firstResource = resources[0];
    const title = 'Booking Summary';
    const ariaLabel = `${title} ${this.state.expanded ? 'collapse' : 'expand'} detail clickable arrow`;

    return (
      <CollapsePanel
        title={title}
        ariaLabel={ariaLabel}
        expanded={this.state.expanded}
        className="booking-summary"
        onExpand={this.toggleState}
        onCollapse={this.toggleState}
      >
        {
          resources.map((resource, index) => (
            <ResourceBookingSummary
              key={index}
              firstResource={firstResource}
              resource={resource}
            />
          ))
        }

      </CollapsePanel>
    );
  }
}
