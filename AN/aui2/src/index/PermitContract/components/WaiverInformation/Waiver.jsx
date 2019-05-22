import React from 'react';
import escape from 'lodash/escape';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import Table from 'react-base-ui/lib/components/Table';
import { viewAttachment } from 'shared/components/Waiver/util';
import Globalize from 'react-base-ui/lib/services/i18n';
import dateStringSorter from '../../utils/dateStringSorter';
import './index.less';


const openAttachment = (waiver) => {
  const url = `${waiver.akamaiDirectory}servlet/downloadFile.sdi?uploadedfile_id=${waiver.attachmentID}`;
  viewAttachment(url, `Waiver_${waiver.attachmentID}`, '400', '400', 'yes');
};

const renderAttachmentCell = (content, row) => (
  row.data.attachmentID && row.data.attachmentName ? (
    <p>
      <a
        className="waiver-attachment"
        /* eslint-disable */
        href="javascript:void(0)"
        /* eslint-enable */
        onClick={() => {
          openAttachment(row.data);
        }}
      >Attachment</a>
    </p>) : ''
);

const renderNameCell = (content, row) => (
  <div className="waiver-attachment">
    <p>{decodeHtmlStr(row.data.waiverName)}</p>
    {renderAttachmentCell(content, row)}
  </div>
);

const renderSignatureLineCell = (content, row) => (
  row.data.showSignatureLine ? (
    <div>
      <p>
        Signature
      </p>
      <div className="waiver-signature-line">
        { row.data.signatureBase64 && (
          <img alt="" src={`data:image/png;base64,${row.data.signatureBase64}`} />
        )}
      </div>
    </div>
  ) : (
    <div>
      <div className="waiver-signature-line no-signature-line">
        { row.data.signatureBase64 && (
          <img alt="" src={`data:image/png;base64,${row.data.signatureBase64}`} />
        )}
      </div>
    </div>
  )
);

const renderWaiverText = content => (<span
  dangerouslySetInnerHTML={{ __html: escape(content).replace(/\n/g, '<br />') }}
/>);

class Waiver extends React.PureComponent {

  waiverColumns = [
    { title: 'WAIVER NAME', keyName: 'waiverName', className: 'format-waiver-name', format: decodeHtmlStr, sorter: true, render: renderNameCell, minWidth: 142 },
    { title: 'DUE DATE', keyName: 'dueDate', className: 'format-waiver-date', format: decodeHtmlStr, sorter: dateStringSorter(Globalize.ANDateFormat), minWidth: 106 },
    { title: 'FOR', keyName: 'waiverFor', className: 'format-waiver-for', format: decodeHtmlStr, sorter: true, minWidth: 70 },
    { title: 'SIGNING STATUS', keyName: 'signingStatus', className: 'format-waiver-status', format: decodeHtmlStr, sorter: true, minWidth: 150 }
  ];

  waiverToRows = waivers => waivers.map((waiver) => {
    const row = { data: waiver };
    row.extraRows = [];

    if (waiver.waiverText) {
      row.extraRows.push({
        data: waiver,
        columns: [
          { keyName: 'waiverText', colSpan: 4, className: 'format-waiver-content', render: renderWaiverText }
        ]
      });
    }

    if (waiver.showSignatureLine || waiver.signatureBase64) {
      row.extraRows.push({
        data: {
          showSignatureLine: waiver.showSignatureLine,
          signatureBase64: waiver.signatureBase64
        },
        columns: [{
          keyName: 'signatureBase64',
          className: 'format-waiver-signature',
          colSpan: 4,
          render: renderSignatureLineCell
        }]
      });
    }
    return row;
  });

  tableProps = (columns, rows) => ({
    sortable: true,
    striped: false,
    rowSeperator: true,
    columns,
    rows,
    className: 'waiver-table'
  });

  render() {
    const { waivers } = this.props;
    return (
      <Table
        {...this.tableProps(this.waiverColumns, this.waiverToRows(waivers))}
      />
    );
  }
}

export default Waiver;
