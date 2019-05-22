import React from 'react';
import UIComponent from 'shared/components/UIComponent';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import formatAmount from '../../utils/formatAmount';
import AmendmentEventAction from './AmendmentEventAction';
import './index.less';

export default class AmendmentInfo extends UIComponent {

  render() {
    const { amendment, title, showEmployee } = this.props;

    const changeStatus = amendment.amendment_details.change_status;
    const addEvents = amendment.amendment_details.add_event;
    const editEvents = amendment.amendment_details.edit_event;
    const deleteEvents = amendment.amendment_details.delete_event;
    const changeExpirationDate = amendment.amendment_details.change_expiration_date.map(item => ({
      ...item,
      action_type: 16
    }));

    const changeAgent = amendment.amendment_details.change_agent;
    const changePermitHolder = amendment.amendment_details.change_permit_holder;

    // order sensitive
    const actionEvents = changeStatus.concat(
      changePermitHolder,
      changeAgent,
      changeExpirationDate,
      addEvents,
      editEvents,
      deleteEvents
    );

    return (
      <div className="amendment">
        <div className="amendment-header u-clearfix">
          <div className="amendment-title">{ title }</div>
          <div className="amendment-info">
            <span>Date: { amendment.amendment_time }</span>
            <span>By: { showEmployee && amendment.employee_id ?
              decodeHtmlStr(amendment.employee_id) :
              decodeHtmlStr(amendment.modify_user_name) }</span>
          </div>
        </div>

        {
          actionEvents &&
          actionEvents.length > 0 &&
          <AmendmentEventAction
            actionEvents={actionEvents}
          />
        }

        {
          // amendment total fee
          amendment.old_total_fee !== amendment.new_total_fee &&
          <div className="amendment-total-fee">
            <div className="amendment-total-fee-name">
              <div>Updated Total Fee:</div>
              <div>Original Total Fee:</div>
            </div>
            <div className="amendment-total-fee-info">
              <div className="green">{formatAmount(amendment.new_total_fee)}</div>
              <div>{formatAmount(amendment.old_total_fee)}</div>
            </div>
          </div>
        }

        {
          // amendment reason
          <div className="amendment-reason">
            <p>Amendment Reason: </p>
            <p className="text-pre-wrap">{amendment.amendment_note || '--'}</p>
          </div>
        }
      </div>
    );
  }
}
