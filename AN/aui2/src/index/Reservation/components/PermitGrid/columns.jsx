import React from 'react';
import Checkbox from 'react-base-ui/lib/components/Checkbox';
import statusColorMap from 'shared/consts/statusStyleColor';
import * as da from 'react-base-ui/lib/utils/dataAccess';
import unescape from 'lodash/unescape';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';

const checkboxColumn = {
  cellClassName: 'grid-status-checkbox-column',
  render(content, rowIndex) {
    const permit = this.props.data.get(rowIndex);
    const permitStatus = permit.get('permit_status');
    const selectedPermit = this.props.selectedPermit;

    return (
      <div className="aaui-table-cell control-cell">
        <span className="status-circle" style={{ backgroundColor: statusColorMap[permitStatus] }} />
        <Checkbox
          className="permit-grid-checkbox"
          checked={selectedPermit && selectedPermit.get('permit_id') === permit.get('permit_id')}
          onClick={e => e.stopPropagation()}
          onChange={(e) => { this.onSelectItem(e, permit); }}
        />
      </div>
    );
  }
};

const permitNumberColumn = {
  name: 'permit_number',
  value: 'permitnumber',
  title: `${decodeHtmlStr(window.__reservation__.__initialState__.permitLabel)} #`,
  hasSortBar: true,
  cellClassName: 'align-right grid-permit-number-column',
  headerCellOptions: {
    'data-min-width': 100
  }
};

const eventNameColumn = {
  name: 'event_name',
  value: 'eventname',
  title: 'EVENT NAME',
  hasSortBar: true,
  cellClassName: 'grid-event-name-column',
  render(cellContent, key, item) {
    return (
      <div className="aaui-table-cell">
        <div className="text-ellipsis">
          <span
            onMouseOver={(e) => { this.onMouseEnter(e, item); }}
            onMouseOut={(e) => { this.onMouseLeave(e); }}
          >
            {decodeHtmlStr(da.get(item, 'event_name'))}
          </span>
        </div>
      </div>
    );
  },
  headerCellOptions: {
    'data-min-width': 115
  }
};

const customerNameColumn = {
  name: 'customer_name',
  value: 'customername',
  hasSortBar: true,
  title: 'CUSTOMER/ORG',
  cellClassName: 'grid-customer-name-column',
  render(cellContent, key, item) {
    const companyName = da.get(item, 'company_name');
    return (
      <div className="aaui-table-cell">
        { companyName || da.get(item, 'customer_name')}
      </div>
    );
  },
  headerCellOptions: {
    'data-min-width': 105
  }
};

const customerEmailColumn = {
  name: 'email',
  value: 'email',
  hasSortBar: true,
  title: 'EMAIL',
  cellClassName: 'grid-email-column',
  render(cellContent, key, item) {
    return (
      <div className="aaui-table-cell">
        { da.get(item, 'email') || '--'}
      </div>
    );
  },
  headerCellOptions: {
    'data-min-width': 105
  }
};

const permitStartDateColumn = {
  name: 'permit_start_date',
  value: 'startscheduledate',
  hasSortBar: true,
  title: 'START DATE',
  cellClassName: 'grid-permit-start-date-cell',
  render(cellContent, key, item) {
    const permitStartDate = da.get(item, 'permit_start_date');
    return (
      <div className="aaui-table-cell">
        {unescape(permitStartDate || '--')}
      </div>
    );
  },
  headerCellOptions: {
    'data-min-width': 105
  }
};

const customerNameAuthColumn = Object.assign({}, customerNameColumn, {
  render(content, rowIndex) {
    const permit = this.props.data.get(rowIndex);
    const permitStatus = permit.get('permit_status');
    const customerName = permit.get('customer_name');

    return (
      <div
        className="aaui-table-cell control-cell"
        style={{ borderLeftColor: statusColorMap[permitStatus] }}
      >
        {customerName}
      </div>
    );
  }
});

const statusColumn = {
  name: 'permit_status',
  value: 'permitstatus',
  hasSortBar: true,
  title: 'STATUS',
  cellClassName: 'grid-permit-status-attachment-column',
  render(status, key, row) {
    const hasUploadedFile = da.get(row, 'has_uploaded_file');
    return (
      <div className="aaui-table-cell">
        <div className="permit-status-cell">{status}</div>
        <div className="attachment-cell">
          {hasUploadedFile && <icon className="icon icon-paperclip" />}
        </div>
      </div>
    );
  },
  headerCellOptions: {
    'data-min-width': 110
  }
};

const eventNameAuthColumn = Object.assign({}, eventNameColumn, {
  cellClassName: 'afx-xl-2-10'
});

export const allColumns = [checkboxColumn, customerNameColumn, customerEmailColumn, eventNameColumn,
  permitStartDateColumn, permitNumberColumn, statusColumn];
export const authorityColumns = [customerNameAuthColumn, eventNameAuthColumn,
  permitStartDateColumn, permitNumberColumn, statusColumn];
