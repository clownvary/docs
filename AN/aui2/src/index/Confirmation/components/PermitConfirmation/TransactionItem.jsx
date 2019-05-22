import PropTypes from 'prop-types';
import React from 'react';
import formatCharge from 'shared/utils/formatCharge';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';

const TransactionItem = (props) => {
  const data = props.transaction;

  return (
    <li className="transaction-item">
      <div className="summary">
        <span className="item-title">
          {decodeHtmlStr(data.reservation_summary)}
        </span>
        <span className="total-charge">{formatCharge(data.total_charge)}</span>
      </div>
      {
        data.facility_details.map((item, i) => (
          <div key={`facility-detail${i}`} className="aaui-flexbox facility-detail">
            <span className="facility-detail__name">
              {decodeHtmlStr(item.name)}
            </span>
            <span className="facility-detail__center">
             Center
            </span>
            <span className="facility-detail__center-name">
              {item.center_name ? decodeHtmlStr(item.center_name) : '--'}
            </span>
          </div>
          ))
      }
    </li>
  );
};

TransactionItem.propTypes = {
  transaction: PropTypes.shape({})
};

export default TransactionItem;
