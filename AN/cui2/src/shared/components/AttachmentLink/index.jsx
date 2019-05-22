import React from 'react';
import { Icon } from 'react-base-ui/lib/components/SVG';
import { FormattedDyncMessage } from 'shared/translation/formatted';

import './index.less'

const AttachmentLink = ({ attachmentUrl, attachmentName, attachmentType }) => (
  <div className="attachment-link">
    <a
      href={attachmentUrl}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Icon name="download" type="link" />
      <FormattedDyncMessage
        value={`${attachmentName}${attachmentType ? `.${attachmentType}` : ''}`}
      />
    </a>
  </div>
);

export default AttachmentLink;
