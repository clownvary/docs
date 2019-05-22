import React from 'react';
import { FormattedDate, FormattedNumber, FormattedTime } from 'react-intl';
import { createPopupService } from 'src/services/popup';

import '../base.less';
import '../layout.less';

class Form extends React.Component {

  render() {
    return (
      <div className="sample-form">
        <div className="row">
          <span className="field-label">Date:</span>
          <div className="field">
            <FormattedDate value={new Date()} />
          </div>
        </div>
        <div className="row">
          <span className="field-label">Time:</span>
          <div className="field">
            <FormattedTime value={new Date()} />
          </div>
        </div>
        <div className="row">
          <span className="field-label">Currency:</span>
          <div className="field">
            <FormattedNumber value={1234567.89} style="currency" currency="USD" />
          </div>
        </div>
      </div>
    );
  }
}


const popupService = createPopupService(Form);

Form.popup = (popupOptions) => {
  popupService.popup(popupOptions).result.catch((e) => {});
};

export default Form;
