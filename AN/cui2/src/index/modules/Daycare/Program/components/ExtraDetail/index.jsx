import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import { Heading } from 'shared/components/Heading';
import Paragraph from 'shared/components/Paragraph';
import AttachmentLink from 'shared/components/AttachmentLink';
import { FormattedDyncMessage } from 'shared/translation/formatted';
import selfMessages from './translations';

import './index.less';

const ExtraDetailItem = ({ detail, altText, index }) => {
  const {
    extraDetailType, detailValue, dataUrl, thumbnailUrl, extraDetailDescription,
    attachmentId, attachmentName, attachmentType, attachmentUrl
  } = detail;
  const itemHead = extraDetailDescription || extraDetailType;
  return (
    <div className="detail-item">
      {
        index > 0 && <div className="an-split-line" />
      }
      <div className="detail-item__head">
        {
          !dataUrl ?
            <FormattedDyncMessage value={itemHead} /> :
            <a
              href={dataUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <FormattedDyncMessage value={itemHead} />
            </a>
        }
      </div>
      <div className="detail-item__paragraph">
        <Paragraph
          preLineWrap
          picture={thumbnailUrl}
          pictureAlt={altText}
        >
          <FormattedDyncMessage value={detailValue} />
        </Paragraph>
      </div>
      {
        attachmentId > 0 &&
        <div className="detail-item__attachment">
          <AttachmentLink
            attachmentUrl={attachmentUrl}
            attachmentName={attachmentName}
            attachmentType={attachmentType}
          />
        </div>
      }
    </div>
  );
};

export class ExtraDetail extends PureComponent {
  render() {
    const { extraDetails, intl: { messages } } = this.props;
    const altText = messages[selfMessages.imageAltText.id];
    return (
      <div className="program-extra">
        <Heading>{messages[selfMessages.moreInformation.id]}</Heading>
        {
          extraDetails.map((detail, index) =>
            <ExtraDetailItem
              key={`detail-item-${detail.extraDetailId}`}
              detail={detail}
              altText={altText}
              index={index}
            />
          )
        }
      </div>
    );
  }
}

export default injectIntl(ExtraDetail);
