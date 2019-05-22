import React from 'react';
import UIComponent from 'shared/components/UIComponent';
import Table from 'react-base-ui/lib/components/Table';
import AmendmentEventActionDetail from './AmendmentEventActionDetail';
import AmendmentStatus from './AmendmentStatus';
import './index.less';

class AmendmentEventAction extends UIComponent {

  actions = {
    0: 'Change status',
    2: 'Add event',
    4: 'Edit event',
    8: 'Delete event',
    16: 'Change Expiration date',
    32: 'Change agent',
    64: 'Change permit holder'
  };

  renderActionDetailCell = (content, row) => {
    const { event } = row.data;
    if (event.action_type && [16, 32, 64].indexOf(event.action_type) === -1) {
      return (
        <AmendmentEventActionDetail event={event} />
      );
    }
    return (
      <AmendmentStatus event={event} />
    );
  };

  getActionTableColumns = [
    { title: 'ACTION', keyName: 'action', className: 'event-action', minWidth: 125 },
    {
      title: 'DETAIL',
      keyName: 'action_type',
      className: 'event-information',
      render: this.renderActionDetailCell,
      minWidth: 778
    }
  ];

  getActionTableRows = actionEvents => actionEvents.map(actionEvent => ({
    data: {
      action: this.actions[actionEvent.action_type] || this.actions[0],
      event: actionEvent
    }
  }));

  render() {
    const { actionEvents } = this.props;

    return (
      <Table
        columns={this.getActionTableColumns}
        rows={this.getActionTableRows(actionEvents)}
        className="amendment-action-table amendment-sort-table"
        striped={false}
      />
    );
  }
}

export default AmendmentEventAction;
