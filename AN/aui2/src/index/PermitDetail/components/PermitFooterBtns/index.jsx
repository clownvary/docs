import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-base-ui/lib/components/Button';
import { redirect } from 'shared/actions/route';
import UIComponent from 'shared/components/UIComponent';
import { pages } from 'shared/consts';

class PermitFooterBtns extends UIComponent {
  backBtnClick = () => {
    const { batchID, receiptID, receiptEntryID } = this.props.initialData;
    this.props.redirect(pages.buildUrl(pages.calendarPage, {
      batch_id: batchID,
      receipt_id: receiptID,
      receipt_entry_id: receiptEntryID
    }));
  };

  render() {
    return (
      <div>
        <div className="an-page__placeholder" />
        <div className="an-page__footer fixed permit-btn-group">
          <div className="an-page__footer__content">
            <Button onClick={this.backBtnClick}>Back</Button>
            <Button type="strong" onClick={this.props.handleSubmit}>Next</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {
    redirect
  }
)(PermitFooterBtns);
