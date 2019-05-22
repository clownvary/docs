import React from 'react';
import AAUICheckbox from 'react-base-ui/lib/components/Checkbox';
import Modal from 'react-base-ui/lib/components/Modal';
import Button from 'react-base-ui/lib/components/Button';
import { SafeText } from 'react-base-ui/lib/components/SafeText';
import UIComponent from 'shared/components/UIComponent';
import { isIE } from 'react-base-ui/lib/utils/browser';
import 'shared/images/magtek-pin-ipad-1.jpg';
import DateTimeFormat from 'shared/utils/DateTimeFormat';
import { cardTypesEnum } from '../../../../consts';
import MagTekUserIPAD from './MagTekUserIPAD';
import MagTekCabIPAD from './MagTekCabIPAD';

import './index.less';

const initAppletExpression = [];
const initInputExpression = [];

let appletFileName = '';
let inputFileName = '';
let formatedCardInfo = null;

export default class MagtekIPAD extends UIComponent {

  constructor(props) {
    super(props);
    this.state = {
      title: 'Processing Transaction',
      appletFileName: '',
      use_old_method: false,
      msgInfo: 'Initializing device...',
      showMsgInfo: true,
      errorMsg: '',
      disMtBtns: true,
      showMagtekHelp: false,
      inputManual: 'false',
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
      isLoadObject: false,
      saveCardInformation: this.props.isShowSaveCardInformation || false,
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
      <div className={'magtekIPAD'}>
        <div className={'plugins'} dangerouslySetInnerHTML={{ __html: '<object id="ipad" name="ipad" classid="CLSID:B45C24D6-8861-436A-845C-7162432BC590" codebase="device-libs/MagTekIPAD.CAB#version=2,0,0,2"></object>' }} />
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
                  <div className="payment-magtek-img payment-magtek-img--pinpad" title="MagTek IPAD Device" />
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
                            <a href="#" onClick={() => { this.cardSwipe(); }}>Swipe card</a>
                            {/* eslint-enable */}
                            <span> or </span>
                            {/* eslint-disable jsx-a11y/href-no-hash */}
                            <a href="#" onClick={() => { this.manualKeypad(); }}>Manual entry</a>
                            {/* eslint-enable */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={this.state.showErrorInfo && this.state.showCardInfo ? 'u-hidden' : 'cancelBtn'}>
                      <Button onClick={() => { this.close(); }}>Cancel</Button>
                    </div>
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
                            value={'saveCheckbox'}
                            checked={this.state.saveCardInformation}
                            onChange={() => {
                              this.saveCheckbox();
                            }}
                          /> Save card information
                        </div>
                      </li>
                      <li className={'btns'}>
                        <Button style={{ marginRight: '10px' }} onClick={() => { this.close(); }}>Cancel</Button> <Button type="strong" onClick={() => { this.payment(); }}>OK</Button>
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
    this.props.setServerError('');
    this.setState({
      title: 'Processing Transaction',
      msgInfo: msg,
      showCardInfo: false,
      showErrorInfo: false,
      showMsgInfo: true
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
      showWSIHelper: statusCode === 5
    });
  }

  disMtBtns(isDisabled) {
    this.setState({
      disMtBtns: isDisabled
    });
  }

  showMagtekHelp(isShown) {
    this.setState({
      showMagtekHelp: isShown
    });
  }

  setInputManual(value) {
    this.setState({
      inputManual: value
    });
  }

  getInputManual() {
    return this.state.inputManual;
  }

  cardSwipe() {
    this.props.setServerError('');
    window.magTekInput.doRequestInput(false);
  }

  manualKeypad() {
    this.props.setServerError('');
    window.magTekInput.doRequestInput(true);
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
        showCardInfo: true,
        showErrorInfo: true
      });
    } else {
      this.setState({
        cardInfo: newCardInfo,
        showMsgInfo: false,
        showCardInfo: true,
        showErrorInfo: false
      });
    }
  }

  init() {
    // istanbul ignore next
    if (isIE()) {
      appletFileName = 'MagTekCabIPAD';
      initAppletExpression.push('window.magTekApplet.doInit();');
    } else {
      appletFileName = 'MagTekAppletIPAD';
      initAppletExpression.push('window.magTekApplet.magTekSetInfoMessage("Initializing applet ...");');
      initAppletExpression.push('setTimeout(function () { window.magTekApplet.magTekLoadApplet(); }, 1500);');
    }
    if (this.state.use_old_method) {
      inputFileName = 'MagTekInputIPAD';
      initInputExpression.push('window.magTekInput.magTekSetInfoMessage("Initializing applet ...");');
      initInputExpression.push('setTimeout(function () { window.magTekInput.magTekLoadApplet(); }, 1500);');
    } else {
      inputFileName = 'MagTekUserIPAD';
      initInputExpression.push('window.magTekInput.magTekSetInfoMessage("Connecting to library  ...");');
      initInputExpression.push('window.magTekInput.enableModeButtons(false);');
      /* eslint-disable */
      /*
      initInputExpression.push('if (!isXNETHost()) { window.magTekInput.applet_frame = findFrame("magtekdeviceinterface"); }');
      */
      /* eslint-enable */
    }
  }

  reciveAMSWalletIDCallback = (walletID, cardInfo) => {
    formatedCardInfo = this.getFormatedCardInfo(cardInfo);
    this.props.setCardInfo(formatedCardInfo);
    this.props.setAMSAccountInfo({ wallet_id: walletID });
  }

  magTekInputDialog() {
    // istanbul ignore next
    if (appletFileName === 'MagTekCabIPAD') {
      /* eslint-disable */
      /*
      window.magTekApplet = new findFrame('magtekdeviceinterface').MagTekCabIPAD(this.setCradInfo);
      */
      /* eslint-enable */
      window.magTekApplet = new MagTekCabIPAD(
        this.setCradInfo.bind(this),
        this.generateWalletID.bind(this),
        this.props.cardTypeList,
        this.reciveAMSWalletIDCallback
      );
      // initAppletExpression.push('window.magTekApplet.doInit();');
      window.magTekApplet.doInit();
    } else if (appletFileName === 'MagTekAppletIPAD') {
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

    if (inputFileName === 'MagTekUserIPAD') {
      window.magTekInput = new MagTekUserIPAD(
        this.setInfoMessage.bind(this),
        this.disMtBtns.bind(this),
        this.showMagtekHelp.bind(this),
        this.setInputManual.bind(this),
        this.getInputManual.bind(this)
        , this.setErrorMessage.bind(this));
      this.magTekInput = window.magTekInput;
      /* eslint-disable */
      /*
      initInputExpression.push('window.magTekInput.magTekSetInfoMessage("Connecting to library  ...");');
      initInputExpression.push('window.magTekInput.enableModeButtons(false);');
      initInputExpression.push('if (!isXNETHost()) { window.magTekInput.applet_frame = findFrame("magtekdeviceinterface"); }');
      */
      /* eslint-enable */
      window.magTekInput.magTekSetInfoMessage('Connecting to library ...');
      window.magTekInput.enableModeButtons(false);
    } else if (inputFileName === 'MagTekInputIPAD') {
      /* eslint-disable */
      /*
      window.magTekInput = new MagTekInputIPAD(this.setInfoMessage.bind(this),this.disMtBtns.bind(this),this.showMagtekHelp.bind(this),this.setInputManual.bind(this), this.getInputManual.bind(this)
        ,this.setErrorMessage.bind(this));
      initInputExpression.push('window.magTekInput.magTekSetInfoMessage("Initializing applet ...");');
      initInputExpression.push("setTimeout(function () { window.magTekInput.magTekLoadApplet(); }, 1500);");
      window.magTekInput.magTekSetInfoMessage("Initializing applet ...");
      setTimeout(function () { window.magTekInput.magTekLoadApplet(); }, 1500);
      */
      /* eslint-enable */
    }
    /* eslint-disable */
    // istanbul ignore next
    window.magTekInput.magTekInputReset((key, wallet_id, cc_masked, cc_exp, cc_card_type, cc_account_name, cc_account_zip) => {
    }, 'cc');
    /* eslint-enable */
    // this.props.setServerError('');
  }

  showDialog() {
    this.setState({
      msgInfo: 'Initializing device...',
      errorMsg: '',
      disMtBtns: true,
      showMagtekHelp: false,
      inputManual: 'false',
      cardInfo: { cardNumber: '', maskCard: '', cardType: '', expirationDate: '' },
      showCardInfo: false,
      showMsgInfo: false,
      isLoadObject: true,
      saveCardInformation: this.props.isShowSaveCardInformation || false
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
      window.magTekApplet.DeviceEndSession();
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
