import React from 'react';
import { findDOMNode } from 'react-dom';
import findLastIndex from 'lodash/findLastIndex';
import DateTimeFormat from 'shared/utils/DateTimeFormat';
import UIComponent from 'shared/components/UIComponent';
import openTheExistingPage from 'shared/utils/openTheExistingPage';
import formatCharge from 'shared/utils/formatCharge';
import getDynamicUrl from 'shared/utils/getDynamicUrl';
import { getCurrentInitState } from 'shared/utils/initStateHelper';
import showAndHideAnimation from '../../utils/showAndHideAnimation';
import FacilityItemDetail from './FacilityItemDetail';
import URL from '../../urls';

const {
  permitID,
  receiptID,
  batchID,
  receiptEntryID
} = getCurrentInitState();

function onAddNewCharge(url, params) {
  const finalUrl = getDynamicUrl(url, { permitID, receiptID, receiptEntryID, ...params });
  openTheExistingPage(finalUrl, 'Add New Charge', '600', '600', 'yes');
}

export default class FacilityItem extends UIComponent {
  constructor(props) {
    super(props);

    this.bind('showAndHideHandler');
    this.bind('refreshCharge');
    this.bind('applyToAll');
  }

  componentDidMount() {
    window.__feeAddNewCharge = (eventID, eventIndex, newEntryID) => {
      if (permitID > 0) {
        const params = {
          batchID,
          receiptID,
          eventID,
          eventIndex,
          newEntryID
        };
        this.props.fetchPermitFee(params);
      } else {
        this.props.fetchPermitFee();
      }
      this.props.permitDetailsChanged();
    };
  }

  applyToAll(eventID, newEntryID, transactionID) {
    this.props.applyToAll(eventID, newEntryID, transactionID).then((res) => {
      const { payload: { body: { status } } } = res;
      if (status === 'success') {
        this.refreshCharge();
      }
    });
  }

  refreshCharge() {
    const {
      newEntryID,
      eventID,
      eventIndex
    } = this.props;
    window.__feeAddNewCharge(eventID, eventIndex, newEntryID);
  }

  showAndHideHandler(e) {
    const control = findDOMNode(this.refs[this.props.facilityKey]);
    /* istanbul ignore else */
    if (control) {
      showAndHideAnimation(e, control);
    }
  }

  initShowButton = (charges) => {
    const lastIndex = findLastIndex(charges, charge => (charge.applicableToAllBookings));
    if (lastIndex >= 0) {
      charges.forEach((charge, index) => {
        if (index === lastIndex) {
          charge.showButton = true;
        }
      });
    }
    return charges;
  }

  render() {
    const {
      facilityID,
      transactionID,
      feeActionStatus,
      newEntryID,
      eventID,
      eventIndex,
      applyToAll
    } = this.props;
    const scheduleFee = this.props.scheduleFee ? this.props.scheduleFee : this.props.additionalFee;
    const scheduleAmount = scheduleFee.scheduleAmount;
    const facilityCharges = scheduleFee.facilityCharges;
    const facilityScheduleID = scheduleFee.facilityScheduleID;

    const startDate = scheduleFee.facilitySchedule && scheduleFee.facilitySchedule.startDate ?
                        scheduleFee.facilitySchedule.startDate : '';
    const endDate = scheduleFee.facilitySchedule && scheduleFee.facilitySchedule.endDate ?
                      scheduleFee.facilitySchedule.endDate : '';
    const startTime = scheduleFee.facilitySchedule && scheduleFee.facilitySchedule.startTime ?
                        scheduleFee.facilitySchedule.startTime : '';
    const endTime = scheduleFee.facilitySchedule && scheduleFee.facilitySchedule.endTime ?
                      scheduleFee.facilitySchedule.endTime : '';
    const isSameDay = scheduleFee.facilitySchedule ? DateTimeFormat.parseDate(startDate).isSame(DateTimeFormat.parseDate(endDate)) : '';

    const isRecurringFee = scheduleFee.masterFacilityScheduleID > 0;

    if (applyToAll) {
      scheduleFee.facilityCharges = this.initShowButton(scheduleFee.facilityCharges);
    }
    return (
      <div>
        <div className={`facility-item ${isRecurringFee ? 'recurring-list' : ''}`}>
          <div className={`afx-col item-title ${isRecurringFee ? 'recurring-datetime' : ''}`}>
            {
              this.props.additionalFee ?
                <span>Resource level fees</span>
                :
                <div className={`${isRecurringFee ? 'datetime recurring-border' : ''}`}>
                  <span>
                    <i className="icon icon-calendar-m" />
                    <span className="fee-date">{startDate}</span>
                  </span>

                  <span>
                    <i className="icon icon-clock-m" />
                    <span className="fee-time">{startTime}</span>-
                  </span>

                  {
                    !isSameDay &&
                    <span>
                      <i className="icon icon-calendar-m fee-padding-left" />
                      <span className="fee-date">{endDate}</span>
                    </span>
                  }

                  <span>
                    {
                      !isSameDay && <i className="icon icon-clock-m" />
                    }
                    <span className="fee-time">{endTime}</span>
                  </span>

                </div>
            }
          </div>

          <div className={`afx-col item-amount afx-col-right ${isRecurringFee ? 'recurring-border' : ''}`}>
            <span className="fee-amount-right">{formatCharge(scheduleAmount)}</span>
            {
              facilityCharges.length ?
                <i
                  className="icon icon-chevron-down"
                  onClick={e => this.showAndHideHandler(e)}
                /> : ''
            }
          </div>

          <div className={`afx-col item-option ${isRecurringFee ? 'recurring-border' : ''}`}>
            <div className="facility-option">
              {
                feeActionStatus.allowAddFee &&
                <i
                  className="icon icon-plus"
                  onClick={() => onAddNewCharge(
                    permitID > 0 ? URL.addNewChargeModify : URL.addNewCharge,
                    {
                      facilityID,
                      transactionID,
                      facilityScheduleID,
                      facilityChargeID: -1,
                      newEntryID,
                      eventID,
                      eventIndex
                    }
                  )}
                  title="Add new charge"
                />
              }
            </div>
          </div>
        </div>


        {
          scheduleFee.facilityCharges.length ?
            <div
              className="aaui-flex schedule-fee"
              ref={this.props.facilityKey}
            >
              {
                scheduleFee.facilityCharges.map((detailFee, index) => {
                  const facilityChargeID = detailFee.facilityChargeID;
                  const receiptDetailID = detailFee.receiptDetailID;
                  const detailFeeKey = `detailFee_${facilityChargeID}_${index}`;

                  return (
                    <FacilityItemDetail
                      key={detailFeeKey}
                      {...{
                        detailFee,
                        facilityID,
                        transactionID,
                        facilityScheduleID,
                        facilityChargeID,
                        feeActionStatus,
                        onAddNewCharge,
                        newEntryID,
                        receiptDetailID,
                        permitID,
                        eventID,
                        eventIndex
                      }}
                      showWaringAlert={() => this.props.showWaringAlert({
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
                      })}
                      applyToAll={() => this.applyToAll(eventID, newEntryID, transactionID)}
                    />
                  );
                })
              }
            </div> : ''
        }
      </div>
    );
  }
}
