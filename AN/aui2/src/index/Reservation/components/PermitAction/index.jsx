import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-base-ui/lib/components/Button';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import { confirm } from 'react-base-ui/lib/services/dialog';
import Checkbox from 'react-base-ui/lib/components/Checkbox';
import { raiseUnrecognizedAuthCode } from 'shared/actions/Authority';
import { redirect } from 'shared/actions/route';
import { Authority, AuthorityID, AuthorityType, AuthorityUIType } from 'shared/authorities';
import Alert from 'shared/components/Alert';
import UIComponent from 'shared/components/UIComponent';
import CancelPermit from 'shared/components/CancelPermit';
import capitalizeWording from 'shared/utils/capitalizeWording';
import storeShape from 'shared/utils/storeShape';
import { pages } from 'shared/consts';
import {
  changePermitStatusAsycAction,
  cancelPermitAsycAction,
  confirmCancelPermit
} from 'shared/actions/cancelPermit';

import {
  completePermit,
  fetchPermitStatusInfo,
  fetchPermitStatusList,
  saveCreatedByMe
} from '../../actions/permitAction';
import { changeCreateByMe } from '../../actions/permitFilter';

import './index.less';

export class PermitAction extends UIComponent {
  constructor(props, context) {
    super(props, context);

    this._refs = {};
  }

  handleCreateByMeChange = (e) => {
    const createByMeValue = e.target.checked;
    this.props.changeCreateByMe(createByMeValue);
    saveCreatedByMe(createByMeValue);
  }

  render() {
    const {
      selectedPermit,
      actions,
      createdByMe,
      initialData: {
        permitLabel
      }
    } = this.props;

    const permitWording = capitalizeWording(permitLabel);
    const statusInfo = actions.get('statusInfo').toJS();
    const statusList = actions.get('statusList').toJS();
    const selectedPermitObj = selectedPermit && selectedPermit.toJS();
    const permitNumber = (selectedPermitObj && selectedPermitObj.permit_number) ? selectedPermitObj.permit_number : '';

    const disabledCancel = !statusInfo.can_be_cancelled;
    let disabledStatusChange = statusList.length === 0;

    let actionAuthClass = '';
    if (Authority.isHidden(AuthorityID.PERMIT_ACTIONS)) {
      actionAuthClass = AuthorityUIType.CLASS_HIDDEN;
    } else if (Authority.isDisabled(AuthorityID.PERMIT_ACTIONS)) {
      actionAuthClass = AuthorityUIType.CLASS_DISABLED;
      // must set disabled on dropdown for button text to get grayed out
      disabledStatusChange = true;
    }

    return (
      <div>
        <div className="permit-action">
          <div className="action-item">
            <Dropdown
              className={`btn action-item action-status ${actionAuthClass} ${disabledStatusChange ? 'disabled' : ''}`}
              type="secondary"
              data={statusList}
              value="-1"
              placeholder="Change Status"
              theme="secondary"
              disabled={disabledStatusChange}
              onChange={(value) => { this.onChangePermitStatus(value); }}
            />
            <CancelPermit
              className={actionAuthClass}
              type="secondary"
              size="s"
              disabled={disabledCancel}
              permitWording={permitWording}
              permitID={selectedPermitObj && selectedPermitObj.permit_id}
              permitNumber={selectedPermitObj && selectedPermitObj.permit_number}
              onCancelPermit={this.onCancelPermit}
              onCancelPermitWithoutRefund={this.onCancelPermitWithoutRefund}
              onCancelPermitWithoutRefundPermission={this.onCancelPermitWithoutRefundPermission}
            />
          </div>
          <div>
            <Checkbox
              onChange={this.handleCreateByMeChange}
              checked={createdByMe}
            >
              Created by me
            </Checkbox>
            {
            !Authority.isHidden(AuthorityID.CALENDAR_PAGE) &&
              <Button
                className="btn" type="primary" size="s"
                onClick={() => this.newReservation()}
              >New Reservation</Button>
            }
          </div>
        </div>

        <Alert
          ref={(c) => { this._refs.denyPermitConfirm = c; }}
          title={`Deny ${permitWording}`}
          type="confirm"
          onConfirm={this.onConfirm}
          onClose={this.close}
          onCancel={this.onCancel}
          onOpen={this.onOpen}
          cancelText="No"
          confirmText="Yes"
        >
          <div className="action-message">
            <span className="action-message-capitalize">{permitWording.toLowerCase()}</span> number: <strong>{permitNumber}</strong>
            <div>Are you sure you want to deny this reservation?</div>
          </div>
        </Alert>

        <Alert
          ref={(c) => { this._refs.completePermitConfirm = c; }}
          title={`Complete ${permitWording}`}
          onConfirm={this.onConfirm}
          onClose={this.close}
          onCancel={this.onCancel}
          onOpen={this.onOpen}
          cancelText="No"
          confirmText="Yes"
        >
          <div className="action-message">
            <span className="action-message-capitalize">{permitWording.toLowerCase()}</span> number: <strong>{permitNumber}</strong>
          </div>
          <div className="action-message-warning">
            <span className="icon aaui-alert-warning-icon icon-exclamation" /> Completed reservation cannot be modified. Proceed?
          </div>
        </Alert>

        <Alert
          ref={(c) => { this._refs.requestDateExpired = c; }}
          title="Request Date Expired"
          type="alert"
          confirmText="OK"
        >
          <div>
            Request date for this reservation has expired.
          </div>
        </Alert>
      </div>
    );
  }

  onChangePermitStatus(value) {
    const { selectedPermit, actions } = this.props;
    const statusList = actions.get('statusList');
    const newStatusValue = (value.value ? value.value : value);
    const newStatus = statusList.find(x => x.get('value') === newStatusValue).toJS();
    const permit = selectedPermit && selectedPermit.toJS();
    if (newStatus && newStatus.status_text) {
      if (newStatus.status_text === 'Complete') {
        this._refs.completePermitConfirm.onConfirm = function completePermitConfirm() {
          this._refs.completePermitConfirm.onClose();
          this.props.fetchPermitStatusInfo(permit.permit_id)
            .then((extraInfo) => {
              if (extraInfo.is_modifying || extraInfo.is_pending_recalculation) {
                this.permitIsBeingModified();
              } else if (!extraInfo.can_be_completed) {
                this.permitCannotBeModifed();
              } else {
                this.props.completePermit({ permit_id: permit.permit_id });
              }
            });
        }.bind(this);
        this._refs.completePermitConfirm.open();
      } else if (newStatus.status_text.slice(0, 4) === 'Deny') { // ANE-52684 IE doesn't support startWith method.
        this._refs.denyPermitConfirm.onConfirm = function denyPermitConfirm() {
          this._refs.denyPermitConfirm.onClose();
          this.props.fetchPermitStatusList(permit.permit_id)
            .then((body) => {
              const extraInfo = body.extrainfo;
              const statusItems = body.statusitems;
              if (extraInfo.is_modifying) {
                this.permitIsBeingModified();
              } else if (!PermitAction.findStatusExists(statusItems, newStatus)) {
                this.permitCannotBeModifed();
              } else {
                this.props.changePermitStatusAsycAction(permit.permit_id, newStatus, true);
              }
            });
        }.bind(this);
        this._refs.denyPermitConfirm.open();
      } else {
        this.props.fetchPermitStatusList(permit.permit_id)
          .then((body) => {
            const extraInfo = body.extrainfo;
            const statusItems = body.statusitems;
            /* istanbul ignore if */
            if (extraInfo.is_modifying) {
              this.permitIsBeingModified();
            } else if (!PermitAction.findStatusExists(statusItems, newStatus)) {
              this.permitCannotBeModifed();
            } else if (extraInfo.is_expired && newStatus.status_text.slice(0, 7) === 'Approve') { // ANE-52684 IE doesn't support startWith method.
              this._refs.requestDateExpired.open();
            } else {
              this.props.changePermitStatusAsycAction(permit.permit_id, newStatus, true);
            }
          });
      }
    }
  }

  static findStatusExists(statusItems, status) {
    if (statusItems && statusItems.length) {
      let i = statusItems.length;
      while (i) {
        i -= 1;
        const x = statusItems[i];
        if (x.status_type === status.status_type &&
          x.status_id === status.status_id &&
          x.transaction_stage_id === status.transaction_stage_id &&
          x.stage_id === status.stage_id &&
          x.permit_status_action === status.permit_status_action) {
          return true;
        }
      }
    }
    return false;
  }

  onConfirmCancelPermit = () => {
    const { selectedPermit } = this.props;
    const selectedPermitObj = selectedPermit && selectedPermit.toJS();
    const permitID = (selectedPermitObj && selectedPermitObj.permit_id) || '';
    this.props.cancelPermitAsycAction(permitID, true);
  }

  onCancelPermitWithoutRefund = (permitWording, permitNumber) =>
    confirmCancelPermit(permitWording, permitNumber)
      .then(
        () => this.onConfirmCancelPermit(),
        error => Promise.reject(error)
      )

  onCancelPermitWithoutRefundPermission = () => { // paid amount is more that zero
    this.onConfirmCancelPermit();
  }

  permitIsBeingModified = () => confirm(
    'This reservation is currently in use. Please try again later.',
    {
      title: 'System Message',
      confirmText: 'OK'
    }
  ).then(() => Promise.reject())

  permitCannotBeModifed = () => confirm(
    'This reservation cannot be modified.',
    {
      title: 'System Message',
      confirmText: 'OK'
    }
  ).then(() => Promise.reject())

  onCancelPermit = permitID =>
    this.props.fetchPermitStatusInfo(permitID)
      .then(
        (extraInfo) => {
          if (extraInfo.is_modifying || extraInfo.is_pending_recalculation) {
            return this.permitIsBeingModified();
          } else if (!extraInfo.can_be_cancelled) {
            return this.permitCannotBeModifed();
          }

          return {
            hasPaiedAmount: extraInfo.has_paied_amount,
            hasRefundPermission: extraInfo.has_refund_permission
          };
        },
        error => Promise.reject(error)
      )

  componentDidMount() {
    const types = [AuthorityType.HIDDEN, AuthorityType.ENABLED, AuthorityType.DISABLED];
    if (Authority.typeNotIn(AuthorityID.PERMIT_ACTIONS, types)) {
      this.props.raiseUnrecognizedAuthCode(AuthorityID.PERMIT_ACTIONS);
    }
  }

  newReservation = () => {
    this.props.redirect(pages.buildUrl(pages.calendarPage, {
      permit_id: 0
    }), null, false);
  };
}

PermitAction.contextTypes = {
  store: storeShape
};

PermitAction.propTypes = {
  store: storeShape
};

export default connect(
  null,
  {
    completePermit,
    cancelPermitAsycAction,
    changePermitStatusAsycAction,
    fetchPermitStatusInfo,
    fetchPermitStatusList,
    raiseUnrecognizedAuthCode,
    redirect,
    changeCreateByMe
  }
)(PermitAction);
