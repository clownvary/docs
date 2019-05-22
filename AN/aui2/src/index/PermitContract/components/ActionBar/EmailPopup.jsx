import React from 'react';
import UIComponent from 'shared/components/UIComponent';
import ConfirmAlert from 'shared/components/Alert';
import Alert from 'react-base-ui/lib/components/Alert';
import Input from 'react-base-ui/lib/components/Input';
import TextArea from 'react-base-ui/lib/components/TextArea';

import './emailPopup.less';

export default class EmailPopup extends UIComponent {

  defaultOptionState = { to: '', subject: '', content: '', recipientError: '', showEmailInputPrompt: false };

  emailReg = val => /^[0-9a-z][0-9-._a-z]*@[0-9-.a-z]+\.[a-z]+(?!\W)$/i.test(val);

  constructor(props) {
    super(props);

    this.state = this.defaultOptionState;
  }

  open = () => {
    const { permitNumber, permitLabel = 'Permit', signatures: { customer = {} } } = this.props;
    this.setState(Object.assign({}, this.defaultOptionState, {
      to: customer.email_address || '',
      subject: `${permitLabel} #${permitNumber}`,
      content: `Hello,\nThis is an automated email notification regarding the ${permitLabel} #${permitNumber}.`
    }));

    this._refs.alert.open();
  }

  validateRecipients = recipientString => recipientString.split(',').filter((recipient) => {
    const trimmedRecipient = recipient.trim();
    return trimmedRecipient !== '' && !this.emailReg(trimmedRecipient);
  }).length > 0

  handlePopupConfirm = () => {
    const invalidEmail = this.validateRecipients(this.state.to);

    if (invalidEmail) {
      this.setState({ recipientError: 'The address for Recipients is incorrectly formed.' });
    } else {
      this.props.emailContract({ ...this.state });
      this._refs.alert.onClose();
    }
  }

  handleEmailFocus = ({ target: { value } }) => {
    const { signatures: { customer } } = this.props;

    if (value && value === customer.email_address) {
      this.setState({ to: `${value},` });
    }

    this.setState({ showEmailInputPrompt: true });
  }

  render() {
    const { title, cancelText, confirmText } = this.props;
    const { to, subject, content, recipientError, showEmailInputPrompt } = this.state;

    return (
      <ConfirmAlert
        ref={(alert) => { this._refs.alert = alert; }}
        title={title}
        cancelText={cancelText}
        confirmText={confirmText}
        onConfirm={this.handlePopupConfirm}
        className="emailPopup"
        disableConfirm={!(to.trim() && subject.trim())}
      >
        {
          recipientError && (
            <Alert
              type="error"
              noClose
              className="error-box"
            >
              {recipientError}
            </Alert>
          )
        }
        <div className="emailPopup__grid">
          <div className="emailPopup__label">Recipients</div>
          <div className={`emailPopup__item ${recipientError ? 'emailPopup__item--error' : ''}`}>
            <Input
              type="text"
              value={to}
              aria-label="Recipients"
              onFocus={this.handleEmailFocus}
              onChange={({ target: { value } }) => { this.setState({ to: value, recipientError: '' }); }}
            />
            {
              showEmailInputPrompt && (<div className="emailPopup__item--prompt">* Multiple email addresses separated by commas.</div>)
            }

          </div>
        </div>
        <div className="emailPopup__grid">
          <div className="emailPopup__label emailPopup__label">Email Subject</div>
          <div className="emailPopup__item">
            <Input
              type="text"
              value={subject}
              aria-label="Email Subject"
              maxLength={50}
              onChange={({ target: { value } }) => { this.setState({ subject: value }); }}
            />
          </div>
        </div>
        <div className="emailPopup__grid">
          <div className="emailPopup__label">Email Text</div>
          <div className="emailPopup__item">
            <TextArea
              onChange={({ target: { value } }) => { this.setState({ content: value }); }}
              value={content}
              aria-label="Email Text"
            />
          </div>
        </div>
      </ConfirmAlert>
    );
  }
}
