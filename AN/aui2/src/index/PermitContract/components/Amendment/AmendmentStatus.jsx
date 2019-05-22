import React from 'react';
import UIComponent from 'shared/components/UIComponent';
import './index.less';

export default class AmendmentStatus extends UIComponent {

  render() {
    const { event } = this.props;

    let changeFrom;
    let changeTo;
    if (event.action_type === 16) {
      changeFrom = event.old_expiration_date;
      changeTo = event.new_expiration_date;
    } else if (event.action_type === 32) {
      changeFrom = event.old_customer_name;
      changeTo = event.new_customer_name;
    } else if (event.action_type === 64) {
      changeFrom = event.old_permit_holder;
      changeTo = event.new_permit_holder;
    } else {
      changeFrom = event.old_permit_status_text;
      changeTo = event.new_permit_status_text;
    }

    return (
      <div className="table-status-content">
        <div className="table-status-from">
          <span className="desc">Revised from</span>
          <span>{changeFrom}</span>
        </div>
        <div className="table-status-to">
          <span className="desc">To</span>
          <span>{changeTo}</span>
        </div>
      </div>
    );
  }
}
