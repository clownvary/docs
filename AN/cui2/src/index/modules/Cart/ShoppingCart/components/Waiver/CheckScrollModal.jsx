import React from 'react';
import Modal from 'react-base-ui/lib/components/Modal';
import Button from 'react-base-ui/lib/components/Button';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import buttonsMessages from 'shared/translation/messages/button';
import { injectIntl } from 'react-intl';
import { FormattedMessage } from 'shared/translation/formatted';
import DialogScrollContainer from 'shared/components/DialogScrollContainer/DialogScrollContainer';
import selfMessages, { PREFIX } from './translations';

/* eslint-disable no-script-url */

export class CheckScrollModal extends React.PureComponent {

  componentWillUpdate(props) {
    if (props.shown) {
      this.handleScroll();
    } else {
      this.container.scrollTop = 0;
    }
  }

  handleScroll() {
    if (this.container &&
      parseInt(this.container.getBoundingClientRect().bottom, 10) >=
      parseInt(this.flag.getBoundingClientRect().bottom, 10)
    ) {
      this.props.onScrollToBottom();
    }
  }

  render() {
    const { waiverText, shown, onClose, intl: { messages }, warningAlertShown } = this.props;
    return (
      <Modal title={messages[`${PREFIX}.title`]} shown={shown} onClose={() => onClose()} className="waiver-dialog">
        <div className="modal-body" onScroll={() => this.handleScroll()}>
          <h3><FormattedMessage {...selfMessages.default_name} /></h3>
          <DialogScrollContainer>
            <div ref={(c) => { this.container = c; }} className="checkScrollModal-container">
              <a href="javascript:void(0);">
                <div dangerouslySetInnerHTML={{ __html: decodeHtmlStr(waiverText) }} />
              </a>
              <br className="waiver-dialog__scroll-br" ref={(c) => { this.flag = c; }} />
            </div>
          </DialogScrollContainer>
        </div>
        <div className="modal-footer">
          <Button type="strong" onClick={() => onClose()} aria-label={warningAlertShown ? messages[selfMessages.wcag_system_waiver_ok_button.id] : ''}>
            <FormattedMessage {...buttonsMessages.ok} />
          </Button>
        </div>
      </Modal>
    );
  }
}
export default injectIntl(CheckScrollModal);
