import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import UIComponent from 'shared/components/UIComponent';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import Calendar from 'react-base-ui/lib/components/Calendar';
import { momentHelper } from 'react-base-ui/lib/utils';
import Button from 'react-base-ui/lib/components/Button';
import { confirm, dialog } from 'react-base-ui/lib/services/dialog';
import CancelPermit from 'shared/components/CancelPermit';
import { redirect } from 'shared/actions/route';
import { pages, messages } from 'shared/consts';
import { newWindow } from 'shared/utils/func';
import getDynamicUrl from 'shared/utils/getDynamicUrl';
import { Authority } from 'shared/authorities';
import capitalizeWording from 'shared/utils/capitalizeWording';
import DateTimeFormat from 'shared/utils/DateTimeFormat';
import URL from 'shared/urls';
import forEach from 'lodash/forEach';
import {
  gotoRefundDepositFeesPageAction,
  changePermitStatusAsycAction,
  reEnterReservationDetailPageAction,
  confirmCancelPermit,
  cancelPermitAsycAction
} from 'shared/actions/cancelPermit';
import { PERMIT_STATUS_OBJECT, isCancelled, isDenied } from '../../utils/permitStatus';

import './index.less';

import {
  setStatus,
  gotoPaymentModificationPage,
  updateExpirationDate,
  fetchPermitEvents
} from '../../actions/actionBar';
import {
  fetchPermitStatusInfo
} from '../../../Reservation/actions/permitAction';

import CopyPermitView from '../CopyPermit';

export class ActionBar extends UIComponent {

  static cancelPermitMsg = () => {
    const cancelSuccess = messages.reservationDetails.cancelPermitInRD_Success;
    return {
      [messages.messageKey]: cancelSuccess.code
    };
  }
  state = {
    newExpirationDate: ''
  }

  addEvent = () => {
    const { batchID, receiptID, permitID } = this.props.initialData;
    this.props.addEvent({ batchID, receiptID, permitID });
  }

  render() {
    const disableActions = this.props.actionBar.get('disableActions');
    const {
      permitLabel,
      permitNumber,
      viewPermitId,
      permitID,
      permitLockMessage
    } = this.props.initialData;
    const abi = this.props.actionBarInformation;
    const permitStatus = abi.changePermitStatus;

    const permitStatusID = permitStatus.systemBehaviorID;
    const statusAuth = {
      disabled: Authority.isDisabled(permitStatusID),
      hidden: Authority.isHidden(permitStatusID)
    };

    const cancelPermitID = abi.cancelPermit.systemBehaviorID;
    const cancelPermitAuth = {
      disabled: Authority.isDisabled(cancelPermitID),
      hidden: Authority.isHidden(cancelPermitID)
    };

    const makePaymentID = abi.makePayment.systemBehaviorID;
    const makePaymentAuth = {
      disabled: Authority.isDisabled(makePaymentID),
      hidden: Authority.isHidden(makePaymentID)
    };

    const viewPermitID = abi.viewPermitContract.systemBehaviorID;
    const viewPermitAuth = {
      disabled: Authority.isDisabled(viewPermitID),
      hidden: Authority.isHidden(viewPermitID)
    };

    const refundDepositID = abi.refundPermit.systemBehaviorID;
    const refundDepositAuth = {
      disabled: Authority.isDisabled(refundDepositID),
      hidden: Authority.isHidden(refundDepositID)
    };

    const copyPermitID = abi.copyPermit.systemBehaviorID;
    const copyPermitAuth = {
      disabled: Authority.isDisabled(copyPermitID),
      hidden: Authority.isHidden(copyPermitID)
    };

    const eai = this.props.eventActionInformation;
    const disabledAddEvent = Authority.isDisabled(eai.addEvent.systemBehaviorID) ||
      Authority.isHidden(eai.addEvent.systemBehaviorID);
    const permitStatusValue = this.props.permitStatus;
    const showAddEvent = !(disabledAddEvent ||
      isCancelled(permitStatusValue) ||
      isDenied(permitStatusValue)
    );

    const permitContractUrl = getDynamicUrl(URL.permitContract, { permitID: viewPermitId });
    const permitWording = capitalizeWording(permitLabel);
    const { newExpirationDate } = this.state;
    let isExpiration = false;
    let expirationDate;
    let today;
    /* istanbul ignore else */
    if (this.props.expirationDate) {
      expirationDate = moment(this.props.expirationDate);
      today = momentHelper.createMoment(DateTimeFormat.getFullServerTodayDate());
      /* istanbul ignore else */
      if (today.diff(expirationDate, 'd') > 0) {
        isExpiration = true;
      }
    }

    return (
      <div>
        <div className="actions">
          <div>
            <Dropdown
              className="action-item action-status"
              type="secondary"
              data={permitStatus.availableStatusList}
              value={permitStatus.currentStatus.value}
              placeholder={permitStatus.currentStatus.text}
              theme="secondary"
              disabled={statusAuth.disabled || disableActions}
              onChange={obj => this.setStatus(obj)}
            />
            {
              this.props.expirationDate &&
              <div className="expiration-date">
                <span className="expiration-date-field-label">Expiration date:</span>
                <span
                  className={`expiration-date-value ${isExpiration && !newExpirationDate ? 'is-expiration' : ''}`}
                >
                  {newExpirationDate || DateTimeFormat.formatDate(expirationDate)}
                </span>
                <div className={`expiration-date-field ${permitLockMessage ? 'u-hidden' : ''}`}>
                  <i
                    className="icon icon-calendar-m"
                    onClick={(e) => {
                      const popupOptions = {
                        target: e.currentTarget,
                        showShadow: true,
                        showMask: false,
                        distance: 9,
                        closeByEscape: true,
                        focus: true
                      };

                    /* istanbul ignore next */
                      let value;
                      if (!isExpiration) {
                        value = [expirationDate];
                      } else {
                        value = [momentHelper.createMoment(today)];
                      }

                      const self = this;
                      const calendarOptions = {
                        today: momentHelper.createMoment(today),
                        value,
                        min: momentHelper.createMoment(today),
                        valueChanged: (v) => {
                          const newDate = DateTimeFormat.formatDate(v[0]);

                          self.props.updateExpirationDate(newDate).then(() => {
                            self.setState({ newExpirationDate: newDate });
                          });
                          /* istanbul ignore else */
                          if (this.calendar) {
                            this.calendar.cancel();
                          }
                        }
                      };

                      const calendar = Calendar.popup(calendarOptions, popupOptions);
                      /* istanbul ignore else */
                      if (calendar !== this.calendar) {
                        this.calendar = calendar;
                        calendar.result.then().catch(() => { });
                      }
                    }}
                  />
                </div>
              </div>
            }
          </div>
          <div>
            <Button
              className={viewPermitAuth.hidden ? 'u-hidden' : 'btn action-item'}
              disabled={viewPermitAuth.disabled || disableActions}
              onClick={() => newWindow(permitContractUrl)}
            >
              View {permitWording}
            </Button>
            <Button
              className={makePaymentAuth.hidden ? 'u-hidden' : 'btn action-item'}
              disabled={makePaymentAuth.disabled || disableActions}
              onClick={() => this.makePayment(makePaymentAuth.disabled)}
            >
              Payment
            </Button>
            <Button
              className={refundDepositAuth.hidden ? 'u-hidden' : 'btn action-item'}
              disabled={refundDepositAuth.disabled || disableActions}
              onClick={() => this.gotoRefundDeposit()}
            >
              Refund
            </Button>
            <Button
              className={copyPermitAuth.hidden ? 'u-hidden' : 'btn action-item'}
              disabled={copyPermitAuth.disabled || disableActions}
              onClick={this.copyPermitDialog}
            >
              Copy
            </Button>
            <CancelPermit
              className={cancelPermitAuth.hidden ? 'u-hidden' : 'action-item'}
              disabled={cancelPermitAuth.disabled || disableActions}
              permitWording={permitWording}
              permitID={permitID}
              permitNumber={permitNumber}
              onCancelPermit={this.onCancelPermit}
              onCancelPermitWithoutRefund={this.onCancelPermitWithoutRefund}
              onCancelPermitWithoutRefundPermission={this.onCancelPermitWithoutRefundPermission}
            />
            <Button
              className={showAddEvent ? 'btn action-item' : 'u-hidden'}
              onClick={this.addEvent}
            >
              Add Event
            </Button>
          </div>
        </div>
      </div>
    );
  }

  copyPermitDialog = () => {
    this.props.fetchPermitEvents().then(() => {
      const { copyPermitEvents } = this.props.actionBar.toJS();
      dialog(
        'Copy Reservation',
        CopyPermitView,
        {
          redirect: this.props.redirect,
          permitEvents: copyPermitEvents,
          initialData: this.props.initialData
        },
        {
          confirmText: 'Submit',
          cancelText: 'Cancel',
          className: 'copy-permit',
          showCancel: true
        });
    });
  }

  setStatus(obj) {
    const { permitID, batchID, receiptID } = this.props.initialData;

    this.props.setStatus(obj.value);
    const status = this.getStatusByValue(obj.value);

    if (status.text === 'Complete') {
      const completeCallback = () => {
        this.changeStatus(permitID, status);
      };
      this.openConfirm('complete', completeCallback);
    } else if (status.text.slice(0, 4) === 'Deny') { // ANE-52684 IE doesn't support startWith method.
      const denyCallback = () => {
        this.changeStatus(permitID, status);
      };
      this.openConfirm('deny', denyCallback);
    } else if (status.text === 'Stage Sequence') {
      this.props.redirect(pages.buildUrl(pages.stageSequencePage, {
        batch_id: batchID,
        receipt_id: receiptID,
        permit_id: permitID
      }));
    } else {
      this.changeStatus(permitID, status);
    }
  }

  openConfirm(type = 'deny', confirmCallback) {
    const { permitLabel, permitNumber } = this.props.initialData;
    const permitWording = capitalizeWording(permitLabel);
    const denyMsg = (<div className="action-message">
      <span className="action-message-capitalize">{permitWording.toLowerCase()}</span> number: <strong>{permitNumber}</strong>
      <div>Are you sure you want to deny this reservation?</div>
    </div>);
    const completeMsg = (
      <div>
        <div className="action-message">
          <span className="action-message-capitalize">{permitWording.toLowerCase()}</span> number: <strong>{permitNumber}</strong>
        </div>
        <div className="action-message-warning">
          <span className="icon aaui-alert-warning-icon icon-exclamation" /> Completed reservation cannot be modified. Proceed?
       </div>
      </div>);
    const option = {
      title: type === 'deny' ? `Deny ${permitWording}` : `Complete ${permitWording}`,
      cancelText: 'No',
      confirmText: 'Yes',
      showCancel: true
    };
    return confirm(type === 'deny' ? denyMsg : completeMsg, option)
    .then(() => confirmCallback())
    .catch(() => false);
  }
  changeStatus(permit, status, reEnterReservationParams) {
    return this.props.changePermitStatusAsycAction(permit, status, false)
      .then(
        ({ payload }) => {
          /* istanbul ignore next */
          if (payload.body.extrainfo) {
            this.reEnterReservationDetail(reEnterReservationParams);
          }
        },
        error => Promise.reject(error)
      );
  }

  getStatusByValue(value) {
    const abi = this.props.actionBarInformationNoCamel;
    const statusList = abi.change_permit_status.available_status_list;
    let item = {};
    forEach(statusList, (status) => {
      if (status.value === value) {
        item = status;
        return false;
      }

      return true;
    });

    return item;
  }

  gotoRefundDeposit() {
    const { permitID } = this.props.initialData;
    this.props.gotoRefundDepositFeesPageAction(permitID);
  }

  makePayment(isPaymentDisabled) {
    if (isPaymentDisabled) return false;

    return this.props.gotoPaymentModificationPage({
      [pages.paymentPageIndex]: pages.PAY_IN_RESERVATION
    });
  }

  reEnterReservationDetail = (params = {}) => {
    this.props.reEnterReservationDetailPageAction({
      ...params
    });
  }

  onCancelPermit = permitID =>
    this.props.fetchPermitStatusInfo(permitID)
      .then(
        extraInfo => ({
          hasPaiedAmount: extraInfo.has_paied_amount,
          hasRefundPermission: extraInfo.has_refund_permission
        }),
        error => Promise.reject(error)
      )

  // Only Cancel checked no fee/rental selected
  onCancelPermitWithoutRefund = (permitWording, permitNumber, permitID) =>
    confirmCancelPermit(permitWording, permitNumber).then(
      () => this.changeStatus(
        permitID, PERMIT_STATUS_OBJECT.Cancelled, ActionBar.cancelPermitMsg()),
      error => Promise.reject(error)
    )

  onCancelPermitWithoutRefundPermission = () => { // cancel checked and has refund/pay amount
    const { permitID } = this.props.initialData;

    return this.props.cancelPermitAsycAction(permitID, false)
      .then(
        () => this.reEnterReservationDetail(ActionBar.cancelPermitMsg()),
        error => Promise.reject(error)
      );
  }
}

export default connect(
  null,
  {
    setStatus,
    changePermitStatusAsycAction,
    redirect,
    gotoPaymentModificationPage,
    gotoRefundDepositFeesPageAction,
    reEnterReservationDetailPageAction,
    fetchPermitStatusInfo,
    updateExpirationDate,
    cancelPermitAsycAction,
    fetchPermitEvents
  }
)(ActionBar);
