import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-base-ui/lib/components/SVG';
import { FormattedMessage } from 'shared/translation/formatted';
import {
  registerModuleAction,
  changePaymentTypeAction,
  selectItemAction,
  addPayItemAsyncAction,
  setInstanceOfPCIAction,
  getPCILocationOfCCAsyncAction
} from '../../actions/paymentManager';
import * as PaymentTypes from '../../consts/paymentTypes';
import PaymentModules from '../../consts/paymentModules';
import PaymentComponent from '../PaymentComponent';
import selfMessages from './translations';

import './index.less';

const MODULENAME = PaymentModules.PRIMARY;

export class PrimaryPayment extends React.PureComponent {

  componentWillMount() {
    return this.props.registerModuleAction(
      MODULENAME,
      [PaymentTypes.CREDIT_CARD, PaymentTypes.ECHECK],
      PaymentTypes.CREDIT_CARD,
      {
        [PaymentTypes.CREDIT_CARD]: {
          autoCheckFirst: true,
          disableFilterList: true,
          setInstanceOfPCIAction: this.props.setInstanceOfPCIAction,
          getPCILocationOfCCAsyncAction: this.props.getPCILocationOfCCAsyncAction
        },
        [PaymentTypes.ECHECK]: {
          autoCheckFirst: true,
          disableFilterList: true
        }
      }
    );
  }

  render() {
    const { paymentManager } = this.props;
    const data = paymentManager.getIn(['modules', MODULENAME]);

    return (
      <div className="primary-payment">
        <h4>
          <Icon
            name="lock"
            aria-label="lock icon"
          />
          <FormattedMessage {...selfMessages.title} />
        </h4>
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
      </div>
    );
  }
}

export default connect(
  null,
  {
    registerModuleAction,
    changePaymentTypeAction,
    selectItemAction,
    addPayItemAsyncAction,
    setInstanceOfPCIAction,
    getPCILocationOfCCAsyncAction
  }
)(PrimaryPayment);
