import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import UIComponent from 'shared/components/UIComponent';
import Radio from 'react-base-ui/lib/components/Radio';
import {
  MODIFY_PAYMENT_PLAN_KEY,
  PAY_NOW_KEY
} from '../../consts/paymentActionTypesOnModification';
import {
  updatePaymentTypeOnModification
} from '../../actions/paymentAction';
import AMIds from '../../automationIds';

import './index.less';


export class PaymentAction extends UIComponent {
  /* eslint-disable react/forbid-prop-types */
  static propTypes = {
    paymentAction: PropTypes.object.isRequired
  }
  /* eslint-enable react/forbid-prop-types */

  render() {
    const { paymentAction, paymentPlanWording } = this.props;
    const selectedPayType = paymentAction.get('paymentActionType');

    return (
      <div className="payment-action panel">
        <h3>Action</h3>
        <div className="action-group">
          <div className="action-item">
            <Radio
              name="payment-type"
              data-qa-id={AMIds.paymentAction.action}
              value={MODIFY_PAYMENT_PLAN_KEY}
              checked={selectedPayType === MODIFY_PAYMENT_PLAN_KEY}
              onChange={e => this.updatePaymentType(e, selectedPayType)}
            >Modify {paymentPlanWording}</Radio>
          </div>
          <div className="action-item">
            <Radio
              name="payment-type"
              data-qa-id={AMIds.paymentAction.actionItem}
              value={PAY_NOW_KEY}
              checked={selectedPayType === PAY_NOW_KEY}
              onChange={e => this.updatePaymentType(e, selectedPayType)}
            >Pay now</Radio>
          </div>
        </div>
      </div>
    );
  }

  updatePaymentType(e, prevType) {
    const curType = parseFloat(e.target.value);
    curType !== parseFloat(prevType) && this.props.updatePaymentTypeOnModification(curType);
  }
}

export default connect(
  null,
  {
    updatePaymentTypeOnModification
  }
)(PaymentAction);
