import React from 'react';
import AAUICheckbox from 'react-base-ui/lib/components/Checkbox';
import Modal from 'react-base-ui/lib/components/Modal';
import Button from 'react-base-ui/lib/components/Button';
import { SafeText } from 'react-base-ui/lib/components/SafeText';
import UIComponent from 'shared/components/UIComponent';
import { isIE } from 'react-base-ui/lib/utils/browser';
import 'shared/images/magtek-scra-Dynamag-1.jpg';
import DateTimeFormat from 'shared/utils/DateTimeFormat';
import { cardTypesEnum } from '../../../../consts';
import MagTekCabMSR from './MagTekCabMSR';
import MagTekUserMSR from './MagTekUserMSR';

import './index.less';

const initAppletExpression = [];
const initInputExpression = [];

let inputFileName = '';
let appletFileName = '';
let formatedCardInfo = null;

export default class MagtekDynamag extends UIComponent {

  constructor(props) {
    super(props);
    this.state = {
      title: 'Processing Transaction',
      appletFileName: '',
      use_old_method: false,
      msgInfo: 'Initializing device...',
      showMsgInfo: true,
      errorMsg: '',
      cardInfo: {
        cardNumber: '',
        maskCard: '',
        cardType: '',
        expirationDate: ''
      },
      showCardInfo: false,
      showErrorInfo: false,
      isLoadObject: false,
      saveCardInformation: props.isShowSaveCardInformation || false,
      encryptCard: false,
      showWSIHelper: false
    };
  }

  close() {
    this.setState({
      msgInfo: 'Initializing device...',
      errorMsg: '',
      cardInfo: {
        cardNumber: '',
        maskCard: '',
        cardType: '',
        expirationDate: ''
      },
      showCardInfo: false,
      showMsgInfo: true,
      showErrorInfo: false,
      isLoadObject: false,
      saveCardInformation: this.props.isShowSaveCardInformation || false,
      encryptCard: false,
      showWSIHelper: false
    });

    this.props.setServerError('');
    this.props.hideModalAction();
  }

  render() {
    this.init();
    const cardInfo = this.state.cardInfo;
    const { payAccmount, isShowSaveCardInformation } = this.props;
    return (
      <div className={'magtekDynamag'}>
        <div className={'plugins'} dangerouslySetInnerHTML={{ __html: '<object id="USBHID" name="USBHID" classid="CLSID:22571E97-956A-4CDD-AF8D-AE9C26597683" codebase="/MagTekUSBHID.CAB#version=1,18,0,1"></object>' }} />
        <Modal
          title={this.state.title}
          shown={this.props.showModal}
          onClose={() => { this.close(); }}
        >
          <div className="modal-body">
            <div className={'card-fee'}>
              <div className="aaui-flex afx-xl-mg-12">
                <span className={'afx-col afx-xl-6-12'}>{this.props.cardType}</span>
                <span className={'afx-col afx-xl-6-12'} style={{ textAlign: 'right' }}>{`$ ${payAccmount}`}</span>
              </div>
            </div>
            <div className={'horitalLine'} />
            <div className="card-body">
              <div>
                <div className="deviceIcon">
                  {/* eslint-disable jsx-a11y/img-redundant-alt */}
                  <div className="payment-magtek-img payment-magtek-img--dynamag" title="MagTek Dynamag Device" />
                  {/* eslint-enable */}
                </div>
                <div className="messageSection">
                  <SafeText tagName="div" className={this.state.showMsgInfo ? 'info msgInfo' : 'u-hidden'} text={this.state.msgInfo} dangerMode />
                  <div className={this.state.showErrorInfo ? 'cardError' : 'u-hidden'}>
                    <div className={this.state.showCardInfo && this.state.showErrorInfo ? 'warnInfo' : 'errorContainer'}>
                      <div className={'errorSection'}>
                        <span className={'icon icon-times-circle'} />
                        <div className={'errorMsg'}>
                          <SafeText tagName="div" text={this.state.errorMsg} dangerMode />
                          {
                            this.props.renderWSIHelper(this.state.showWSIHelper)
                          }
                          <div className={this.state.showMagtekHelp ? '' : 'hide'}>
                            <input type="hidden" id="magtek_ipad_input_manual" value={this.state.inputManual} />
                            {/* eslint-disable jsx-a11y/href-no-hash */}
                            <a href="#" onClick={() => { this.retry(); }}>Swipe card</a>
                            {/* eslint-enable */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={this.state.showCardInfo || this.state.encryptCard ? 'u-hidden' : 'cancelBtn'}>
                    <Button onClick={() => { this.close(); }}>Cancel</Button>
                  </div>
                  <div className={this.state.showCardInfo ? 'cardInfo' : 'u-hidden'}>
                    <ul>
                      <li>
                        <div className="cardInfo__label">Card Number</div><div>{cardInfo.maskCard.replace('xxx', '**** ')}</div>
                      </li>
                      <li>
                        <div className="cardInfo__label cardType">Card Type</div><div><span className={`icon cardType-icon icon-${cardTypesEnum[`${cardInfo.cardType}`]}`} /></div>
                      </li>
                      <li>
                        <div className="cardInfo__label">Expiration Date</div><div>{cardInfo.expirationDate}</div>
                      </li>
                      <li className={isShowSaveCardInformation ? 'saveCardInfo' : 'u-hidden'}>
                        <div>
                          <AAUICheckbox
                            ref={(checkbox) => { this._refs.saveCardInformation = checkbox; }}
                            checked={this.state.saveCardInformation}
                            onChange={() => {
                              this.saveCheckbox();
                            }}
                          /> Save card information
                        </div>
                      </li>
                      <li className={'btns'}>
                        <Button style={{ marginRight: '10px' }} onClick={() => { this.close(); }}>Cancel</Button>
                        <Button type="strong" onClick={() => { this.payment(); }}>OK</Button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer" />
        </Modal>
      </div>
    );
  }

  saveCheckbox() {
    const saveCardInformation = formatedCardInfo.saveCardInformation;
    formatedCardInfo.saveCardInformation = !saveCardInformation;
    this.setState({
      saveCardInformation: !saveCardInformation
    }, this.props.setCardInfo.bind(this, formatedCardInfo));
  }

  setInfoMessage(msg) {
    let encryptCard = false;
    // istanbul ignore else
    if (msg === 'Encrypting credit card...') {
      encryptCard = true;
    }
    this.props.setServerError('');
    this.setState({
      title: 'Processing Transaction',
      msgInfo: msg,
      showCardInfo: false,
      showErrorInfo: false,
      showMsgInfo: true,
      encryptCard
    });
  }

  setErrorMessage(msg, isServerError, statusCode) {
    // istanbul ignore else
    if (!isServerError) {
      this.props.setServerError('');
    }
    this.setState({
      title: 'Transaction Failed',
      errorMsg: msg,
      showErrorInfo: true,
      showCardInfo: false,
      showMsgInfo: false,
      encryptCard: false,
      showWSIHelper: statusCode === 5
    });
  }

  setCradInfo(cardInfo, _warnInfo) {
    const index = _warnInfo.indexOf('missing account holder name');
    const newCardInfo = { ...cardInfo };
    this.props.setServerError('');
    if (index > -1) {
      this.setState({
        cardInfo: newCardInfo,
        showMsgInfo: false,
        errorMsg: _warnInfo,
        showErrorInfo: true,
        showCardInfo: true,
        encryptCard: false
      });
    } else {
      this.setState({
        cardInfo: newCardInfo,
        showMsgInfo: false,
        showErrorInfo: false,
        showCardInfo: true,
        encryptCard: false
      });
    }
  }

  retry() {
    this.setState({
      msgInfo: 'Initializing device...',
      errorMsg: '',
      showCardInfo: false,
      showErrorInfo: false,
      showMsgInfo: true,
      encryptCard: false
    }, this.magTekInputDialog);
  }

  init() {
    // istanbul ignore next
    if (isIE()) {
      appletFileName = 'MagTekCabMSR';
      initAppletExpression.push('window.magTekApplet.GetDeviceState();');
    } else {
      appletFileName = 'MagTekAppletMSR';
      initAppletExpression.push('window.magTekApplet.magTekSetInfoMessage("Initializing applet ...");');
      initAppletExpression.push('setTimeout(function () { window.magTekApplet.magTekLoadApplet(); }, 1500);');
    }
    if (this.state.use_old_method) {
      inputFileName = 'MagTekInputMSR';
      initInputExpression.push('window.magTekInput.magTekSetInfoMessage("Initializing applet ...");');
      initInputExpression.push('setTimeout(function () { window.magTekInput.magTekLoadApplet(); }, 1500);');
    } else {
      inputFileName = 'MagTekUserMSR';
      initInputExpression.push('window.magTekInput.magTekSetInfoMessage("Connecting to library ...");');
    }
  }

  reciveAMSWalletIDCallback = (walletID, cardInfo) => {
    formatedCardInfo = this.getFormatedCardInfo(cardInfo);
    this.props.setCardInfo(formatedCardInfo);
    this.props.setAMSAccountInfo({ wallet_id: walletID });
  }

  magTekInputDialog() {
    // istanbul ignore next
    if (appletFileName === 'MagTekCabMSR') {
      window.magTekApplet = new MagTekCabMSR(
          this.setCradInfo.bind(this),
          this.generateWalletID.bind(this),
          this.props.cardTypeList,
          this.reciveAMSWalletIDCallback
      );
      window.magTekApplet.GetDeviceState();
    } else if (appletFileName === 'MagTekAppletMSR') {
      /* eslint-disable */
      /*
      window.magTekApplet = new findFrame('magtekdeviceinterface').MagTekAppletIPAD();
      initAppletExpression.push('window.magTekApplet.magTekSetInfoMessage("Initializing applet ...");');
      initAppletExpression.push('setTimeout(function () { window.magTekApplet.magTekLoadApplet(); }, 1500);');
      window.magTekApplet.magTekSetInfoMessage("Initializing applet ...");
      setTimeout(function () { window.magTekApplet.magTekLoadApplet(); }, 1500);
      */
      /* eslint-enable */
    }


    if (inputFileName === 'MagTekUserMSR') {
      window.magTekInput = new MagTekUserMSR(
        this.setInfoMessage.bind(this),
        this.setErrorMessage.bind(this));
      this.magTekInput = window.magTekInput;
      window.magTekInput.magTekSetInfoMessage('Connecting to library ...');
    } else if (inputFileName === 'MagTekInputMSR') {
      /* eslint-disable */
      /*
      window.magTekInput = new MagTekInputMSR(this.setInfoMessage.bind(this),this.disMtBtns.bind(this),this.showMagtekHelp.bind(this),this.setInputManual.bind(this), this.getInputManual.bind(this)
        ,this.setErrorMessage.bind(this));
      initInputExpression.push('window.magTekInput.magTekSetInfoMessage("Initializing applet ...");');
      initInputExpression.push('setTimeout(function () { window.magTekInput.magTekLoadApplet(); }, 1500);');
      */
      /* eslint-enable */
    }
    /* eslint-disable */
    // istanbul ignore next
    window.magTekInput.magTekInputReset(
      (key, wallet_id, cc_masked, cc_exp, cc_card_type, cc_account_name, cc_account_zip) => {},
      'cc'
    );
    /* eslint-enable */
    this.props.setServerError('');
  }

  showDialog() {
    this.setState({
      msgInfo: 'Initializing device...',
      errorMsg: '',
      cardInfo: { cardNumber: '', maskCard: '', cardType: '', expirationDate: '' },
      showCardInfo: false,
      showMsgInfo: false,
      isLoadObject: true,
      saveCardInformation: this.props.isShowSaveCardInformation || false,
      encryptCard: false
    }, this.magTekInputDialog);
  }

  componentDidUpdate() {
    // istanbul ignore else
    if (this.props.showModal && !this.state.isLoadObject) {
      this.showDialog();
    }
    // istanbul ignore else
    if (this.props.serverError) {
      this.setErrorMessage(this.props.serverError, true);
    }
  }

  getFormatedCardInfo(cardInfo) {
    const expirationYearAndMonth = cardInfo.expirationDate.split('/');
    return {
      CCNumberValue: cardInfo.cardNumber,
      cardTypeID: cardInfo.cardType,
      cardTypeName: '',
      ExpirationDateMonthValue: expirationYearAndMonth[0],
      ExpirationDateYearValue:
        Math.round(DateTimeFormat.getServerTodayDate().getFullYear() / 100) +
          expirationYearAndMonth[1],
      saveCardInformation: this._refs.saveCardInformation.checked
    };
  }

  generateWalletID(cardInfo, accountIDParams, callBackFun) {
    formatedCardInfo = this.getFormatedCardInfo(cardInfo);
    this.props.generateWalletID(formatedCardInfo, accountIDParams, callBackFun);
  }

  payment() {
    this.props.payment();
    this.close();
  }
}
