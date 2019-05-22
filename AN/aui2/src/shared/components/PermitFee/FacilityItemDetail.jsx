import React from 'react';
import classNames from 'classnames';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import UIComponent from 'shared/components/UIComponent';
import formatCharge from 'shared/utils/formatCharge';
import DateTimeFormat from 'shared/utils/DateTimeFormat';
import Tooltip from 'react-base-ui/lib/components/Tooltip';
import { Dock } from 'react-base-ui/lib/consts';
import Button from 'react-base-ui/lib/components/Button';
import map from 'lodash/map';
import size from 'lodash/size';
import throttle from 'lodash/throttle';
import uniqueId from 'lodash/uniqueId';
import URL from '../../urls';

export default class FacilityItemDetail extends UIComponent {
  constructor(props) {
    super(props);
    this.tooltipId = `tooltip_${uniqueId()}`;
    this.bind('deleteAlertOpen');
    this.bind('applyToAll');
  }
  componentDidMount() {
    this.initTooltip();
    document.addEventListener('scroll', this.onScroll);
  }
  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll);
  }

  componentDidUpdate() {
    this.initTooltip();
  }
  deleteAlertOpen() {
    this.props.showWaringAlert();
  }
  applyToAll() {
    this.props.applyToAll();
  }
  generateContent = data =>
    (
      <div className="extra-fee-tooltip__content">
        <p>
          This extra booking fee is calculated based on the specified date and time
          below(not the reservation date and time).
        </p>
        <ul>
          {
            map(data, (item) => {
              const startDate = item && item.startDate ?
                item.startDate : '';
              const endDate = item && item.endDate ?
                item.endDate : '';
              const startTime = item && item.startTime ?
                item.startTime : '';
              const endTime = item && item.endTime ?
                item.endTime : '';
              const isSameDay = item ? DateTimeFormat.parseDate(startDate).isSame(DateTimeFormat.parseDate(endDate)) : '';
              return (
                <li>
                  <span>
                    <i className="icon icon-calendar-m" />
                    <span className="fee-date">{startDate}</span>
                  </span>

                  <span>
                    <i className="icon icon-clock-m" />
                    <span className="fee-time">{startTime}</span>
                    <span className="connector">-</span>
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
                </li>);
            }
            )
          }
        </ul>
      </div>
    );


  initTooltip() {
    const target = document.getElementById(this.tooltipId);
    const { isExtraBookingFee, extraDateTimes } = this.props.detailFee;
    if (isExtraBookingFee && size(extraDateTimes) > 0) {
      const options = {
        className: 'extra-fee-tooltip',
        showShadow: false,
        dockStyle: Dock.BOTTOM_LEFT,
        content: this.generateContent(extraDateTimes)
      };
      Tooltip.unbind(target);
      Tooltip.bind(target, options);
    }
  }

  onScroll = throttle(() => {
    Tooltip.close();
  }, 40);

  render() {
    const {
      facilityID,
      transactionID,
      facilityScheduleID,
      facilityChargeID,
      feeActionStatus,
      detailFee,
      newEntryID,
      receiptDetailID,
      permitID,
      eventID,
      eventIndex
    } = this.props;
    const detailUnitFee = formatCharge(detailFee.unitFee);
    const detailAmount = formatCharge(detailFee.amount);
    let unitCharge = '';

    if (detailFee.isPercentageDiscount) {
      unitCharge = `${detailFee.unitFee.toFixed(2)}%`;
    } else {
      unitCharge = `${detailUnitFee} ${detailFee.abbrevUnitOfMeasure} x ${detailFee.quantity}`;
    }

    return (
      <div
        className={classNames(
          'facility-item',
          'item-detail-list',
          { 'high-light': detailFee.applicableToAllBookings || detailFee.appliedToAllBookings }
        )}
      >
        <div className="afx-col item-fee-name">
          <div className="facility-fee">{decodeHtmlStr(detailFee.chargeName)}
            {
              (detailFee.isExtraBookingFee && size(detailFee.extraDateTimes) > 0) ?
                <i className="icon icon-info-circle" id={this.tooltipId} /> : null
            }
          </div>
        </div>
        <div className="afx-col item-fee-detail">{decodeHtmlStr(unitCharge)}</div>
        <div className="afx-col item-amount fee-amount">{decodeHtmlStr(detailAmount)}</div>
        <div className="afx-col item-option">
          <div className="facility-option">
            {
              feeActionStatus.allowEditFee && <i
                className="icon icon-sign-m" title="Edit charge"
                onClick={() => this.props.onAddNewCharge(
                  permitID > 0 ? URL.editChargeModify : URL.addNewCharge,
                  {
                    facilityID,
                    transactionID,
                    facilityScheduleID,
                    facilityChargeID,
                    newEntryID,
                    receiptDetailID,
                    eventID,
                    eventIndex,
                    sdirequath: Date.now()
                  }
                )}
              />
            }
            {
              feeActionStatus.allowDeleteFee &&
              <i className="icon icon-trash" title="Delete charge" onClick={this.deleteAlertOpen} />
            }
          </div>
          {
            detailFee.showButton &&
              <div className="apply-to-all">
                <Button title="Apply fee/s to all booking of this resource." noSubmit type="primary" size="sm" onClick={this.applyToAll}>Apply to all</Button>
              </div>
          }
        </div>
      </div>
    );
  }
}
