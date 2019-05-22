import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-base-ui/lib/components/SVG';
import { FormattedMessage } from 'shared/translation/formatted';
import {
  registerModuleAction,
  changePaymentTypeAction,
  selectItemAction,
  addPayItemAsyncAction,
  checkSecondaryPaymentAction,
  setInstanceOfPCIAction,
  getPCILocationOfCCAsyncAction
} from '../../actions/paymentManager';
import * as PaymentTypes from '../../consts/paymentTypes';
import PaymentModules from '../../consts/paymentModules';
import PaymentComponent from '../PaymentComponent';
import selfMessages from './translations';

import './index.less';

const MODULENAME = PaymentModules.SECONDARY;

export class SecondaryPayment extends React.PureComponent {

  componentWillMount() {
    this.props.registerModuleAction(
      MODULENAME,
      [PaymentTypes.CREDIT_CARD, PaymentTypes.ECHECK], PaymentTypes.CREDIT_CARD,
      {
        [PaymentTypes.CREDIT_CARD]: {
          disableCVVandCVC: true,
          disableGuarantee: true,
          disableSaveForFurture: true,
          setInstanceOfPCIAction: this.props.setInstanceOfPCIAction,
          getPCILocationOfCCAsyncAction: this.props.getPCILocationOfCCAsyncAction
        },
        [PaymentTypes.ECHECK]: {
          disableTips: true,
          disableGuarantee: true,
          disableSaveForFurture: true
        }
      }
    );
    const { futureCharges } = this.props;
    this.props.checkSecondaryPaymentAction(MODULENAME, futureCharges);
  }

  componentWillReceiveProps(nextProps) {
    const { futureCharges } = nextProps;
    this.props.checkSecondaryPaymentAction(MODULENAME, futureCharges);
  }

  render() {
    const { paymentManager } = this.props;
    const data = paymentManager.getIn(['modules', MODULENAME]);
    const isVisibality = data && data.get('isShow');

    return isVisibality ?
      <div className="secondary-payment">
        <h4>
          <Icon
            name="lock"
            aria-label="lock icon"
          />
          <FormattedMessage {...selfMessages.title} />
        </h4>
        <p className="secondary-payment-tips layout-width-limited u-color-secondarytext">
          <FormattedMessage {...selfMessages.paymentTips} />
        </p>
        <PaymentComponent
          data={data}
          name={MODULENAME}
          onTypeChange={typeName =>
            this.props.changePaymentTypeAction(MODULENAME, typeName)}
          onItemSelectedChange={(typeName, payItemId) =>
            this.props.selectItemAction(MODULENAME, typeName, payItemId)}
          onPayItemAdded={(typeName, payItemInfo) =>
            this.props.addPayItemAsyncAction(MODULENAME, typeName, payItemInfo)}
        />
      </div> : null;
  }
}

export default connect(
  null,
  {
    registerModuleAction,
    changePaymentTypeAction,
    selectItemAction,
    addPayItemAsyncAction,
    checkSecondaryPaymentAction,
    setInstanceOfPCIAction,
    getPCILocationOfCCAsyncAction
  }
)(SecondaryPayment);
