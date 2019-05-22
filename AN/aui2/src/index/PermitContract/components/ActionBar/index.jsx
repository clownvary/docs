import React from 'react';
import UIComponent from 'shared/components/UIComponent';
import Button from 'react-base-ui/lib/components/Button';
import PrintOptionPopup from './PrintOptionPopup';
import PdfOptionPopup from './PdfOptionPopup';
import EmailPopup from './EmailPopup';
import './index.less';

export default class ActionBar extends UIComponent {

  onSaveAsPdfBtnClick = () => {
    const signatureSection = document.querySelector('.signature');
    if (signatureSection) {
      signatureSection.style.height = `${signatureSection.offsetHeight}px`;
    }
    this._refs.pdfOptionPopup.open();
  }

  render() {
    const { hasAmendment, permitId, permitNumber, emailContract, savePdfAction,
      permitLabel, showEmail, signatures } = this.props;

    return (
      <div className="actions">
        <Button
          className="btn action-item"
          size="sm"
          onClick={() => { this._refs.printOptionPopup.open(); }}
        >
          Print
        </Button>

        {
          showEmail && (
            <Button
              className="btn action-item"
              size="sm"
              onClick={() => { this._refs.emailPopup.open(); }}
            >
              Send Email
            </Button>
          )
        }

        <Button
          className="btn action-item"
          size="sm"
          onClick={this.onSaveAsPdfBtnClick}
        >
          Save as PDF
        </Button>

        <PrintOptionPopup
          title="Print Options"
          confirmText="Print"
          cancelText="Cancel"
          hasAmendment={hasAmendment}
          ref={(c) => { this._refs.printOptionPopup = c; }}
        />

        <EmailPopup
          title="Email Detail"
          confirmText="Send"
          cancelText="Cancel"
          ref={(c) => { this._refs.emailPopup = c; }}
          permitNumber={permitNumber}
          permitId={permitId}
          permitLabel={permitLabel}
          emailContract={emailContract}
          signatures={signatures}
        />

        <PdfOptionPopup
          ref={(c) => { this._refs.pdfOptionPopup = c; }}
          title="Save PDF"
          confirmText="Save"
          cancelText="Cancel"
          hasAmendment={hasAmendment}
          savePdfAction={savePdfAction}
          permitNumber={permitNumber}
        />
      </div>
    );
  }
}
