import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import * as da from 'react-base-ui/lib/utils/dataAccess';
import AAUICheckbox from 'react-base-ui/lib/components/Checkbox';
import Collapse from 'react-base-ui/lib/components/Collapse';
import UIComponent from 'shared/components/UIComponent';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';

import {
  waiverNameClick,
  viewAttachment,
  waiverCheckBoxClick
} from './util';


import './index.less';

export default class Waiver extends UIComponent {

  static propTypes = {
    waiver: PropTypes.shape({
      data: PropTypes.array
    }).isRequired,
    afterAgreeWaiver: PropTypes.func
  }

  constructor() {
    super();

    this.state = {
      displayWaiverList: true
    };
  }

  handleAddWaiver = (addableWaiversLength) => {
    const { disabledAddWaivers } = this.props;
    /* istanbul ignore if */
    if (!addableWaiversLength || disabledAddWaivers) {
      return;
    }
    this.props.loadAddableWaivers();
  }

  render() {
    const {
      waiver, permitWording, addableWaivers = [], addableWaiversLoaded, disabledAddWaivers
    } = this.props;
    let data = this.props.data || waiver.get('data');
    const permitID = waiver.get('permitID');
    const hasNew = this.props.hasNew || waiver.get('hasNew');
    const errorMsg = waiver.get('errorMsg');
    const addableWaiversLength = da.count(addableWaivers);

    if (permitID > 0 && addableWaiversLoaded) {
      data = addableWaivers.concat(data);
    }
    const panelHeader = (
      <span>
        <span>Waivers and Information</span>
        <span className={classNames('update-changed-label', { 'u-hidden': hasNew !== 'true' })}>UPDATED</span>
      </span>
    );

    return (
      <div>
        {
          (waiver.get('showWaiver') && (data.size > 0 || addableWaiversLength > 0)) &&
          <Collapse activeKey="waiver">
            <Collapse.Panel Header={panelHeader} key="waiver">
              <div className="waiver">
                <div className="header-section">
                  <span>WAIVER DESCRIPTION</span>
                  {
                      permitID > 0 && !addableWaiversLoaded &&
                      <span
                        className={classNames('header-section__add-link', { 'is-disabled': disabledAddWaivers || !addableWaiversLength })}
                        onClick={() => this.handleAddWaiver(addableWaiversLength)}
                      >
                        <i className="icon icon-plus-circle" />
                        Add waivers and information
                      </span>
                    }
                </div>
                <div
                  className={classNames('dataList', { empty: !data.size && addableWaiversLength && !addableWaiversLoaded })}
                >
                  {
                      data.map((item, i) => {
                        const transactionstageId = item.get('transactionstageID') ? item.get('transactionstageID') : 0;
                        const temp = transactionstageId === -1 ? item.get('attachedchecklistitemID') : item.get('transactionstageID');
                        const itemId = permitID > 0 ? temp : item.get('attachedchecklistitemID');
                        const stageId = item.get('stageID');
                        const stageVersion = item.get('stageVersion');
                        const stageType = item.get('stageType');
                        const attachmentId = item.get('attachmentID');
                        const attachmentName = item.get('attachmentName');
                        const showDisplayPermit = item.get('showDisplayPermit');
                        const displayPermitSelected = item.get('displayPermitSelected');
                        const disableAgreeToWaiver = item.get('disableAgreetowaiver');
                        const agreeToWaiverSelected = item.get('agreetowaiverSelected');
                        const isRequired = item.get('isRequired');
                        const enableSignature = item.get('canModifySignature');
                        const signatureBase64 = item.get('signatureBase64');
                        const itemText = item.get('itemText');
                        const waiverIndex = item.get('waiverIndex');
                        const errorMessage = displayPermitSelected && errorMsg[waiverIndex];
                        let isLastAddableWaiverCls = '';

                        if (addableWaiversLength && i === addableWaiversLength - 1) {
                          isLastAddableWaiverCls = 'last-addwaiver-item';
                        }
                        return (
                          <div
                            key={itemId}
                            className={`item ${(i === data.size - 1) ? 'last-item' : ''}${isLastAddableWaiverCls}`}
                          >
                            <div className="aaui-flex afx-xl-mg-12">
                              <div className={`afx-col ${permitID > 0 ? 'afx-xl-8-12' : 'afx-xl-12-12'}`}>
                                <input ref={`stageVersion${waiverIndex}`} type="hidden" value={stageVersion} />
                                <input ref={`transactionstage_id${waiverIndex}`} type="hidden" value={transactionstageId} />
                                <input type="hidden" id={`${waiverIndex}stage_version`} name={`${waiverIndex}stage_version`} value={stageVersion} />
                                <input type="hidden" ref={`${waiverIndex}SigBase64`} id={`${waiverIndex}SigBase64`} name={`${waiverIndex}SigBase64`} value={signatureBase64} />
                                {
                                  stageType === 1 ?
                                    (
                                      <a className="link" href="###" onClick={() => this.clickWaiverName(itemId, stageId, stageVersion, waiverIndex)}>
                                        <span
                                          id={`${waiverIndex}description`}
                                          className="desc aLink"
                                          title={decodeHtmlStr(da.get(item, 'description'))}
                                        >
                                          {decodeHtmlStr(da.get(item, 'description'))}
                                        </span>
                                      </a>
                                    ) :
                                    (
                                      <span
                                        id={`${waiverIndex}description`}
                                        className="desc"
                                        title={decodeHtmlStr(da.get(item, 'description'))}
                                      >
                                        {decodeHtmlStr(da.get(item, 'description'))}
                                      </span>
                                    )
                                }
                              </div>
                              {
                                permitID > 0 && (
                                  <div className="afx-col afx-xl-4-12 waiver-date">
                                    <div>Due: {item.get('dueDate') || '--'}</div>
                                    <div>Completed: {item.get('completeDate') || '--'}</div>
                                  </div>
                                )
                              }
                            </div>
                            <div className="aaui-flex afx-xl-mg-12">
                              <div className="afx-col afx-xl-8-12 waiver-display-agreement">
                                <div>
                                  <AAUICheckbox
                                    ref={`permit${waiverIndex}`}
                                    id={`${waiverIndex}permitChbx`}
                                    disabled={!showDisplayPermit || this.props.readOnly}
                                    checked={displayPermitSelected}
                                    onChange={() => this.displayInPermit(itemId, true, '', waiverIndex)}
                                  />
                                  Include in {decodeHtmlStr(permitWording) || 'permit'}
                                </div>
                                <div className={displayPermitSelected ? '' : 'visibility-hide'}>
                                  <AAUICheckbox
                                    ref={`agreeToWaiver${waiverIndex}`}
                                    id={`${waiverIndex}waiverCheckBox`}
                                    value={attachmentId}
                                    disabled={disableAgreeToWaiver || this.props.readOnly}
                                    checked={agreeToWaiverSelected}
                                    onChange={() => this.agreeToWaiver(itemId, enableSignature,
                                      stageType, waiverIndex, transactionstageId)}
                                  />
                                  <span className="requried-wrapper">
                                    <i className={`icon ${isRequired ? 'icon-asterisk' : ''}`} />
                                  </span>
                                  <span>
                                    Agree to waiver
                                  </span>
                                  {
                                    displayPermitSelected &&
                                    errorMessage &&
                                    (
                                      <span className="errorMsg">
                                        {errorMessage}
                                      </span>
                                    )
                                  }
                                </div>
                              </div>
                              <div className="afx-col afx-xl-4-12 waiver-sign-attachment">
                                {
                                  enableSignature && stageType === 1 ? (
                                    <div>
                                      {
                                        this.props.readOnly ? '' :
                                        <a className="link signName" onClick={() => this.clkSignaturePad(itemId, stageId, stageVersion, waiverIndex)}>
                                          <i className="icon icon-sign-m" />
                                          <span>Sign</span>
                                        </a>
                                      }
                                      <span id={`${waiverIndex}itemText`} style={{ display: 'none' }}>{itemText}</span>
                                    </div>
                                  ) : undefined
                                }
                                {
                                  attachmentName ? (
                                    <div className="waiver-attachment">
                                      <a className="link" onClick={() => { this.viewAttachment(attachmentId); }} >
                                        <i className="icon icon-file-solid-m" />
                                        <span>Attachment</span>
                                      </a>
                                    </div>
                                  ) : undefined
                                }
                              </div>
                            </div>
                          </div>
                        );
                      })
                    }
                </div>
              </div>
            </Collapse.Panel>
          </Collapse>
        }
      </div>
    );
  }

  clickWaiverName = (itemID, stageID, stageVersion, waiverIndex) => {
    const signVal = this.refs[`${waiverIndex}SigBase64`] ? this.refs[`${waiverIndex}SigBase64`].value : '';
    const akamaiDirectory = this.props.waiver.get('akamaiDirectory');
    waiverNameClick(itemID, stageID, stageVersion, signVal, akamaiDirectory,
    this.props.eventID);
  }

  viewAttachment = (attachmentId) => {
    if (attachmentId) {
      const akamaiDirectory = this.props.waiver.get('akamaiDirectory');
      const mypage = `${akamaiDirectory}servlet/downloadFile.sdi?uploadedfile_id=${attachmentId}`;
      viewAttachment(mypage, 'Waiver', '400', '400', 'yes');
    }
  }

  clkSignaturePad = (waiverInputName, stageID, stageVersion, waiverIndex) => {
    const permitID = this.props.waiver.get('permitID');
    const oc = permitID > 0 ? 'TransactionStage' : 'AttachedChecklistItem';
    /* istanbul ignore if */
    if (window.clkSignaturePad) {
      window.clkSignaturePad(
        waiverInputName, stageID, stageVersion, oc,
        this.savedWaiver.bind(this), waiverIndex
      );
    }
  }

  agreeToWaiver = (itemID, enableSignature, stageType, waiverIndex, transactionstageId) => {
    this.props.setEventValidStatus &&
    this.props.setEventValidStatus(this.props.eventIndex);
    this.props.afterAgreeWaiver && this.props.afterAgreeWaiver(waiverIndex);

    const enableDigitalSignature = enableSignature && stageType;
    const result = waiverCheckBoxClick(itemID,
      enableDigitalSignature, waiverIndex, transactionstageId);

    if (result && result.cancel && this.refs[`agreeToWaiver${waiverIndex}`]) {
      // TODO should modify state here, and need be corrected someday DH.
      if (this.refs[`agreeToWaiver${waiverIndex}`].checked !== result.checked) {
        this.refs[`agreeToWaiver${waiverIndex}`].checked = result.checked;
      }
    } else {
      this.props.setWaiverErrorMessage(waiverIndex);
      this.savedWaiver(itemID, false, '', waiverIndex);
    }
  }

  savedWaiver = (itemID, isInPermit, signatureString = '', waiverIndex) => {
    if (this.props.eventIndex) {
      this.props.changeWaiverByEventID(itemID, isInPermit, signatureString,
      this.props.eventIndex, waiverIndex);
      this.props.showUpdated(this.props.eventIndex);
    } else {
      this.props.changeWaiver(itemID, isInPermit, signatureString);
    }
    const params = this.getParams(itemID, waiverIndex);
    this.props.saveWaiver(params, this.props.permitDetailsChanged, this.props.eventID);
  }

  getParams = (itemID, waiverIndex) => {
    const params = {};
    const waiver = this.props.waiver;
    const permitID = waiver.get('permitID');
    params.batch_id = waiver.get('batchID');
    params.receipt_id = waiver.get('receiptID');
    if (permitID > 0 && this.props.eventID && this.props.eventID > -1) {
      params.attachedchecklistitem_id = itemID;
      params.transaction_stage_id = this.refs[`transactionstage_id${waiverIndex}`] ? this.refs[`transactionstage_id${waiverIndex}`].value : '';
      params.permit_id = permitID;
      params.permit_event_id = this.props.eventID;
    } else {
      params.item_id = itemID;
      params.receipt_entry_id = waiver.get('receiptEntryID') || this.props.newEntryID;
    }
    params.stage_version = this.refs[`stageVersion${waiverIndex}`] ? this.refs[`stageVersion${waiverIndex}`].value : '';
    params.sigbase64 = this.refs[`${waiverIndex}SigBase64`] ? this.refs[`${waiverIndex}SigBase64`].value : '';
    params.displayin_permit_checked = this.refs[`permit${waiverIndex}`] ? !!this.refs[`permit${waiverIndex}`].checked : false;
    params.agreeto_waiver_checked = this.refs[`agreeToWaiver${waiverIndex}`] ? !!this.refs[`agreeToWaiver${waiverIndex}`].checked : false;

    return params;
  }

  toggleWaiverList() {
    this.setState({
      displayWaiverList: !this.state.displayWaiverList
    });
  }

  displayInPermit(itemID, isInPermit, signatureString, waiverIndex) {
    if (this.refs[`permit${waiverIndex}`].checked && this.props.eventIndex && this.props.setEventValidStatus) {
      this.props.setEventValidStatus(this.props.eventIndex);
    }

    this.savedWaiver(itemID, isInPermit, signatureString, waiverIndex);
  }
}
