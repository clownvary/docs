import React from 'react';
import { findDOMNode } from 'react-dom';
import toUpper from 'lodash/toUpper';
import Table from 'react-base-ui/lib/components/Table';
import UIComponent from 'shared/components/UIComponent';
import CollapsePanel from 'react-base-ui/lib/components/CollapsePanel';
import createColResizable from 'react-base-ui/lib/helper/colResizable';

import './index.less';

export default class Attachement extends UIComponent {

  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  renderAttachmentName = (content, row) => {
    const {
      akamai_directory: akamaiDirectory,
      uploadedfile_id: uploadedFileId
    } = row.data;
    const attachmentUrl = `${akamaiDirectory}servlet/downloadFileWithAccess.sdi?uploadedfile_id=${uploadedFileId}&popup_window=yes`;
    return (
      <a
        /* eslint-disable */
        href="javascript:void(0)"
        /* eslint-enable */
        onClick={() => window.open(attachmentUrl, `attachment-${uploadedFileId}`, 'resizable')}
      >
        {content}
      </a>
    );
  }

  toggleState = () => this.setState({ expanded: !this.state.expanded });


  render() {
    const { attachedFiles } = this.props;

    const tableProps = {
      resizable: true,
      sortable: true,
      ariaLableExpand: 'Expand detail clickable arrow',
      ariaLableCollapse: 'Collapse detail clickable arrow',
      rows: attachedFiles.map(attachedFile => ({
        data: { ...attachedFile }
      })),
      columns: [
        { title: 'name', keyName: 'display_name', sorter: true, render: this.renderAttachmentName, className: 'attachment-name', minWidth: 200 },
        { title: 'type', keyName: 'file_type', format: toUpper, minWidth: 150 },
        { title: 'size', keyName: 'file_size', format: size => size.replace(/([\d.]+)([^\d.])/ig, '$1 $2'), minWidth: 150 },
        { title: 'upload date', keyName: 'upload_date', minWidth: 150 }
      ]
    };

    const title = 'Attached Files';
    const ariaLabel = `${title} ${this.state.expanded ? 'collapse' : 'expand'} detail clickable arrow`;

    return (
      <CollapsePanel
        title={title}
        ariaLabel={ariaLabel}
        expanded={this.state.expanded}
        className="section-container attachment"
        onExpand={() => { createColResizable(findDOMNode(this._refs.table)); this.toggleState(); }}
        onCollapse={this.toggleState}
      >
        <Table
          ref={(table) => { this._refs.table = table; }}
          {...tableProps}
        />
      </CollapsePanel>
    );
  }
}
