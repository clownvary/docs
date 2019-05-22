import React from 'react';
import get from 'lodash/get';
import { connect } from 'react-redux';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import BasePayer from '../BasePayer';

import { fetchAndResetRefundOptionAction } from '../../actions/paymentOptions/options';

import { CUSTOMER_TYPE_VALUE, COMPANY_TYPE_VALUE } from '../../consts/payerConfig';
import { changeRefundPayer, changeRefundAgent } from '../../actions/payer';

import './index.less';

const SPLITER = '-';

export class RefundPayer extends BasePayer {
  render() {
    const spliter = SPLITER;
    const { payer } = this.props;
    const { payerType, customers, company } = payer.toJS();
    const successPay = this.props.payment.get('successPay');

    let selectedPayer = 0;
    const payerList = [
      ...customers.data.map(objPayer => ({ ...objPayer, value: `${CUSTOMER_TYPE_VALUE}${spliter}${objPayer.id}` })),
      ...company.data.map(objPayer => ({ ...objPayer, value: `${COMPANY_TYPE_VALUE}${spliter}${objPayer.id}` }))];
    let agents = [];
    let selectedAgent = 0;


    if (payerType === CUSTOMER_TYPE_VALUE) {
      selectedPayer = `${CUSTOMER_TYPE_VALUE}${spliter}${customers.selected}`;
    } /* istanbul ignore next */ else if (payerType === COMPANY_TYPE_VALUE) {
      selectedPayer = `${COMPANY_TYPE_VALUE}${spliter}${company.selected}`;
      const [selectedCompany] = payerList.filter(item => item.id === company.selected);
      agents = get(selectedCompany, 'agents.data') || [];
      selectedAgent = get(selectedCompany, 'agents.selected', 0);
    }

    return (
      <div className="payment-payer panel">
        <h2>Refund To</h2>
        <div className="refund-payer-item refund-payer-item-company aaui-flexbox">
          <Dropdown
            className="payment-payer-custom-list"
            data={payerList}
            value={selectedPayer}
            disabled={!!successPay}
            onChange={({ value }) => this.changePayer(value)}
          />
          {payerType === COMPANY_TYPE_VALUE ? this.renderCompanyAgents(
            company.selected, agents, selectedAgent) : null}
        </div>
      </div>
    );
  }

  renderCompanyAgents(selectedCompany = 0, agents, selectedAgent) {
    const successPay = this.props.payment.get('successPay');

    if (agents.length) {
      return (
        <div className="prt-srch-itm-agent">
          <label htmlFor="Agent">Company Agent</label>
          <Dropdown
            id="Agent"
            className="refund-payer-agents-list"
            data={agents}
            disabled={!!successPay}
            value={selectedAgent}
            onChange={({ value }) => this.changeCompanyAgent(selectedCompany, value)}
          />
        </div>
      );
    }
    return (
      <div className="prt-srch-itm-agent">
        <span className="noAgents">No authorized agents.</span>
      </div>
    );
  }

  changePayer(value) {
    const { payer } = this.props;
    const { customers, company, payerType } = payer.toJS();
    /* istanbul ignore next */
    const [selectedPayerType = 0, selectedPayer = 0] = value.split(SPLITER);
    let payerId = 0;

    if (payerType === CUSTOMER_TYPE_VALUE) {
      payerId = customers.selected;
    } /* istanbul ignore next */ else if (payerType === COMPANY_TYPE_VALUE) {
      payerId = company.selected;
    }

    if (`${payerType}${SPLITER}${payerId}` !== value) {
      this.onPayerChange(this.props.paymentOptionsSize === 0)
        .then(() => this.props.changeRefundPayer(
          parseInt(selectedPayer, 10), parseInt(selectedPayerType, 10))
        );
    }
  }

  changeCompanyAgent(selectedCompanyId, selectedAgentId) {
    const { payer } = this.props;
    const { company: { data: payerList } } = payer.toJS();
    const [selectedCompany] = payerList.filter(item => item.id === selectedCompanyId);
    const preAgentId = get(selectedCompany, 'agents.selected');

    if (preAgentId !== selectedAgentId) {
      this.onPayerChange(this.props.paymentOptionsSize === 0)
        .then(
          () => this.props.changeRefundAgent(selectedCompanyId, selectedAgentId)
        );
    }
  }

  componentDidMount() {
    this.props.fetchAndResetRefundOptionAction();
  }
}

export default connect(
  null,
  {
    changeRefundPayer,
    changeRefundAgent,
    fetchAndResetRefundOptionAction
  }
)(RefundPayer);
