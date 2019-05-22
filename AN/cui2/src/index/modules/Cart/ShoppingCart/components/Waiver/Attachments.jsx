import React from 'react';
import Attachment from './Attachment';

import './attachments.less';

export default class Attachments extends React.PureComponent {

  render() {
    const { attachments, waiversAgreements, checkout } = this.props;

    return (
    attachments ?
      <div className="attachments">
        { attachments.map((item, index) => (
          <Attachment
            waiversAgreements={waiversAgreements} itemData={item} key={index} checkout={checkout}
          />
            )) }
      </div> : null
    );
  }

}
