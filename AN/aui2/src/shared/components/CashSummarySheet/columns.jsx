import React from 'react';
import Radio from 'react-base-ui/lib/components/Radio';
import * as da from 'react-base-ui/lib/utils/dataAccess';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import DateTimeFormat from 'shared/utils/DateTimeFormat';

function formatDateTime(dt) {
  const momentDate = DateTimeFormat.parseDateTime(dt);
  const date = DateTimeFormat.formatDate(momentDate);
  const time = DateTimeFormat.formatTime(momentDate);
  return `${date}\n${time}`;
}

const radioColumn = {
  cellClassName: 'afx-xl-1-24 align-center',
  render(content, rowIndex) {
    const currentCSS = this.props.data.get(rowIndex);
    const selectedCSS = this.props.selectedCSS;

    return (
      <div className="aaui-table-cell control-cell text-overflow-clip" >
        <Radio
          name="ExistingCSS"
          checked={selectedCSS != null && selectedCSS.id === currentCSS.get('id')}
          onChange={e => this.onSelectItem(e, currentCSS)}
        />
      </div>
    );
  }
};

const cssIdColumn = {
  title: 'CSS ID',
  name: 'id',
  value: 'id',
  cellClassName: 'afx-xl-3-24 align-right'
};

const statusColumn = {
  title: 'STATUS',
  name: 'status',
  value: 'status',
  cellClassName: 'afx-xl-2-24'
};

const workstationColumn = {
  title: 'WORKSTATION',
  name: 'workstation_name',
  value: 'workstation_name',
  cellClassName: 'afx-xl-4-24',
  render(cellContent, key, item) {
    const name = da.get(item, 'workstation_name');
    return (
      <div className="aaui-table-cell">{decodeHtmlStr(name)}</div>
    );
  }
};

const cssLayoutColumn = {
  title: 'CSS   LAYOUT',
  name: 'cash_summary_sheet_layout_name',
  value: 'cash_summary_sheet_layout_name',
  cellClassName: 'afx-xl-3-24',
  render(cellContent, key, item) {
    const cssLayout = da.get(item, 'cash_summary_sheet_layout_name');
    return (
      <div className="aaui-table-cell">{decodeHtmlStr(cssLayout || '—')}</div>
    );
  }
};

const openedColumn = {
  title: 'OPENED',
  name: 'opened_date',
  value: 'opened_date',
  cellClassName: 'afx-xl-4-24',
  render(cellContent, key, item) {
    const openedDate = da.get(item, 'opened_date');
    const formatedDate = `${formatDateTime(openedDate)}`;
    return (
      <div className="aaui-table-cell u-white-space--pre-wrap">{decodeHtmlStr(formatedDate)}</div>
    );
  }
};

const lastModifiedColumn = {
  name: 'lastmodified',
  value: 'lastmodified',
  title: 'LAST MODIFIED',
  cellClassName: 'afx-xl-4-24',
  render(cellContent, key, item) {
    const lastModifiedDate = da.get(item, 'last_modified_date');
    const formatedDate = `${formatDateTime(lastModifiedDate)}`;
    return (
      <div className="aaui-table-cell u-white-space--pre-wrap">{decodeHtmlStr(formatedDate)}</div>
    );
  }
};

const systemUserColumn = {
  name: 'systemuser',
  value: 'systemuser',
  title: 'SYSTEM USER',
  cellClassName: 'afx-xl-3-24',
  render(cellContent, key, item) {
    const systemUser = da.get(item, 'system_user_name');
    return (
      <div className="aaui-table-cell">{systemUser ? decodeHtmlStr(systemUser) : '—'}</div>
    );
  }
};

const allColumns = [
  radioColumn,
  cssIdColumn,
  statusColumn,
  workstationColumn,
  cssLayoutColumn,
  openedColumn,
  lastModifiedColumn,
  systemUserColumn
];

export default allColumns;
