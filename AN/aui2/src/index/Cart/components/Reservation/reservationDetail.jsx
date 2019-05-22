import React from 'react';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import UIComponent from 'shared/components/UIComponent';
import formatCharge from 'shared/utils/formatCharge';

import './index.less';

export default class ReservationDetail extends UIComponent {
  render() {
    const facilityFee = this.props.facilityFee;
    const facilityFeeAmount = formatCharge(facilityFee.facility_amount);

    return (
      <div className="aaui-flexbox afx-xl-mg-12 detail-item">
        <div className="afx-col name detail-item__name">{decodeHtmlStr(facilityFee.facility_name)}</div>
        <div className="afx-col name detail-item__center">
          <span>Center</span>
          <span>{facilityFee.center_name ? decodeHtmlStr(facilityFee.center_name) : '--'}</span>
        </div>
        <div className="afx-col detail-item__amount align-right">{facilityFeeAmount}</div>
      </div>
    );
  }
}
