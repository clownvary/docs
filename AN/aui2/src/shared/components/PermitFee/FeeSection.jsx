import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { confirm } from 'react-base-ui/lib/services/dialog';
import Checkbox from 'react-base-ui/lib/components/Checkbox';
import UIComponent from 'shared/components/UIComponent';
import FacilityList from './FacilityList';
import './index.less';

export default class FeeSection extends UIComponent {

  static propTypes = {
    permitDetailsChanged: PropTypes.func.isRequired,
    feeActionStatus: PropTypes.func.isRequired,
    deleteReservationFeeDetail: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.facilityID = null;
    this.facilityChargeID = null;
    this.bind('showWaringAlert', 'onConfirm');
    this.state = { deleteAll: false, showCheckBox: false };
  }
  resetFee = (shouldDisableResetFee) => {
    if (shouldDisableResetFee) {
      return false;
    }
    const {
      batchID,
      receiptID,
      eventID,
      eventIndex,
      newEntryID
    } = this.props;

    return this.props.resetFeeAsyncAction(eventID, newEntryID)
      .then(() => {
        this.props.permitDetailsChanged();
        return this.props.fetchPermitFee({
          batchID,
          receiptID,
          eventID,
          eventIndex,
          newEntryID
        });
      });
  }

  onCheckChange(checked) {
    this.setState({
      deleteAll: checked
    });
  }
  confirmContent = () => (
    <div className="delete-confirm-content">
      <p>Are you sure you want to delete the fee?</p>
      {
        this.state.showCheckBox && <div>
          <Checkbox
            size="m"
            onChange={e => this.onCheckChange(e.target.checked)}
          >
            Apply delete to all bookings of this resource
          </Checkbox>
        </div>
      }
    </div>
  );

  showWaringAlert({
    facilityID,
    facilityChargeID,
    transactionID,
    receiptDetailID,
    newEntryID,
    batchID,
    receiptID,
    permitID,
    eventID,
    eventIndex
  }) {
    this.facilityID = facilityID;
    this.facilityChargeID = facilityChargeID;
    this.transactionID = transactionID;
    this.receiptDetailID = receiptDetailID;
    this.newEntryID = newEntryID;
    this.batchID = batchID;
    this.receiptID = receiptID;
    this.permitID = permitID;
    this.eventID = eventID;
    this.eventIndex = eventIndex;

    const params = {
      batch_id: this.batchID,
      receipt_id: this.receiptID,
      permit_id: this.permitID,
      transaction_id: this.transactionID,
      receipt_detail_id: this.receiptDetailID,
      facility_id: this.facilityID,
      facility_charge_id: this.facilityChargeID,
      new_entry_id: this.newEntryID
    };
    this.onCheckChange(false);
    this.setState({ showCheckBox: false });
    this.props.detectSameCharge(params).then((res) => {
      const { has_same_charge: hasSameCharge } = res.payload.body;
      hasSameCharge && this.setState({ showCheckBox: true });
      this.openConfirm();
    }).catch(() => {
      this.openConfirm();
    });
  }

  openConfirm() {
    const option = {
      title: 'Delete Fee',
      cancelText: 'No',
      confirmText: 'Yes',
      showCancel: true
    };
    return confirm(this.confirmContent(), option)
    .then(() => this.onConfirm())
    .catch(() => false);
  }

  onConfirm() {
    const { deleteAll } = this.state;
    const params = {
      batch_id: this.batchID,
      receipt_id: this.receiptID,
      permit_id: this.permitID,
      transaction_id: this.transactionID,
      receipt_detail_id: this.receiptDetailID,
      facility_id: this.facilityID,
      facility_charge_id: this.facilityChargeID,
      new_entry_id: this.newEntryID,
      delete_all: deleteAll
    };

    this.props.deleteReservationFeeDetail(params).then(() => {
      this.props.fetchPermitFee({
        batchID: this.batchID,
        receiptID: this.receiptID,
        eventID: this.eventID,
        eventIndex: this.eventIndex,
        newEntryID: this.newEntryID
      });
    });
    this.props.permitDetailsChanged();
  }


  render() {
    const {
      facilityFees, newEntryID, eventID, eventIndex, allowResetFees, disabledResetFee, applyToAll
    } = this.props;
    const shouldDisableResetFee = disabledResetFee || !allowResetFees;

    return (
      <div
        className="reservartion-panel"
        ref={(reservationPanel) => { this._refs.reservationPanel = reservationPanel; }}
      >
        <div className="panel">
          <div className="aaui-flex permit-fee-list-header">
            <div className="afx-col afx-xl-3-12">RESOURCE</div>
            <div className="afx-col afx-xl-5-12">DATE & TIME</div>
            <div className="afx-col afx-xl-3-12 afx-col-right">AMOUNT WITHOUT TAX</div>
            <div
              className={classNames(
                'afx-col',
                'afx-xl-1-12',
                'link',
                'permit-fee__reset',
                { disabled: shouldDisableResetFee }
              )}
              onClick={() => this.resetFee(shouldDisableResetFee)}
            >
              <i className="icon icon-rotate-left" /> Reset fees
            </div>
          </div>
          <div className="permit-fee-list">
            {
              facilityFees.map((facility, index) => {
                const key = `facility_${facility.facilityID}_${index}`;

                return (
                  <FacilityList
                    key={key}
                    facilityKey={key}
                    facility={facility}
                    fetchPermitFee={this.props.fetchPermitFee}
                    permitDetailsChanged={this.props.permitDetailsChanged}
                    feeActionStatus={this.props.feeActionStatus}
                    showWaringAlert={this.showWaringAlert}
                    newEntryID={newEntryID}
                    eventID={eventID}
                    eventIndex={eventIndex}
                    pagination={this.props.pagination}
                    showMore={this.props.showMore}
                    applyToAll={applyToAll}
                  />
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

