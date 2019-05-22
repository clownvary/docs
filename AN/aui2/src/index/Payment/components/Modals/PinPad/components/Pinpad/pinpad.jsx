import React from 'react';
import { connect } from 'react-redux';
import Alert from 'react-base-ui/lib/components/Alert';
import UIComponent from 'shared/components/UIComponent';
import { WSIHelper } from 'shared/components/WSIHelper';
import { updateErrorMessage } from '../../actions/pinpad';
import { showFailActionBtns } from '../../actions/pinpadFail';
import { updateModalTitle } from '../../actions/pinpadModal';
import { titles, actionTypes } from '../../consts';

export class Pinpad extends UIComponent {

  render() {
    const { pay, pinpad, children } = this.props;
    let { onClick } = this.props;
    const { promptMessage, debitCardId, isNewCard } = pinpad.payment.toJS();
    const {
      payName,
      errorMessage,
      actionType,
      hasError,
      amount,
      headerHtml,
      paymentTypeId,
      className
    } = pay;
    onClick = onClick || (() => {});

    return (
      <div className={`payment-pinpad ${className || ''}`} onClick={onClick}>
        {
          !isNewCard &&
          <div className="payment-pinpad-header">
            <span>{payName}</span>
            <span>$ {amount}</span>
            <div>{headerHtml || ''}</div>
          </div>
        }
        <div className="payment-pinpad-body aaui-flexbox">
          <div className="payment-pinpad-body-img" title="iPP320 Device" />
          <div className="payment-pinpad-body-right">
            {hasError ?
              <div className="payment-pinpad-error-wrapper aaui-flexbox">
                <Alert type="error" className="payment-pinpad-error-alert" noClose>
                  <div className="error-content">
                    <div className="payment-pinpad-error-message">
                      <div>{this.getErrorMessage(errorMessage, actionType)}</div>
                    </div>
                    { (actionType !== actionTypes.HIDE_RETRY) &&
                      <div className="payment-pinpad-error-action">
                        <span className="payment-pinpad-retry" onClick={() => this.retry(false, paymentTypeId)}>Swipe card</span>
                        {paymentTypeId !== debitCardId ?
                          <span>
                            <span className="payment-pinpad-retry-separation">or</span>
                            <span className="payment-pinpad-retry" onClick={() => this.retry(true, paymentTypeId)}>Manual entry</span>
                          </span> : ''
                        }
                      </div>
                    }
                  </div>
                </Alert>
                {children || ''}
              </div> :
              <p className="payment-pinpad-body-prompts">{promptMessage}</p>
            }
          </div>
        </div>
      </div>
    );
  }

  renderWebServiceHelp = () => {
    const { webStartServicehelpURL } = this.props.pinpad.payment.toJS();

    return <WSIHelper url={webStartServicehelpURL} />;
  }

  getErrorMessage = (errorMessage, actionType) => {
    if (actionType === actionTypes.SERVICE_HELP) {
      return this.renderWebServiceHelp();
    }

    return errorMessage;
  }

  retry(isManulEntry, paymentType) {
    const { pinpad } = this.props;
    const { apdInterfaceApplet } = pinpad.pinpadModal.toJS();
    const { debitCardId, errorMessage, isNewCard } = pinpad.payment.toJS();
    const isDebitCard = paymentType === debitCardId;

    this.props.updateErrorMessage({
      message: '',
      hasError: false,
      actionType: actionTypes.HIDE_RETRY
    });

    /* istanbul ignore else */
    if (errorMessage) {
      this.props.updateErrorMessage({
        message: '',
        isServerErr: true
      });
    }

    this.props.showFailActionBtns(false);
    this.props.updateModalTitle(isNewCard ? titles.NEW_CARD_TITLE : titles.TRANSACTION_TITLE);
    setTimeout(() => { // wait the fail action take work
      apdInterfaceApplet.APDInputStart(isManulEntry, isDebitCard);
    }, 100);
  }
}

export default connect(
  null,
  {
    updateErrorMessage,
    showFailActionBtns,
    updateModalTitle
  }
)(Pinpad);
