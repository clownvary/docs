import React from 'react';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import Table from 'react-base-ui/lib/components/Table';
import './index.less';

class Information extends React.PureComponent {

  infoColumns = [
    { title: 'INFORMATION DESCRIPTION', keyName: 'description', className: 'format-info-desc', format: decodeHtmlStr, sorter: true, minWidth: 235 },
    { title: 'SIGNING STATUS', keyName: 'signingStatus', className: 'format-info-status', format: decodeHtmlStr, sorter: true, minWidth: 150 }
  ];

  infoToRows = infos => infos.map(info => ({ data: info }));

  tableProps = (columns, rows) => ({
    sortable: true,
    striped: false,
    rowSeperator: true,
    columns,
    rows,
    className: 'info-table'
  });

  render() {
    const { infos } = this.props;
    return (
      <Table
        {...this.tableProps(this.infoColumns, this.infoToRows(infos))}
      />
    );
  }
}

export default Information;
