import React from 'react';
import { connect } from 'react-redux';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import Radio from 'react-base-ui/lib/components/Radio';
import PopupWindowWithMenu from 'shared/utils/openTheExistingPage';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';

import BasePayer from '../BasePayer';
import './index.less';
import URL from '../../urls';
import {
  CUSTOMER_TYPE_VALUE,
  COMPANY_TYPE_VALUE,
  PAYER_TYPE
} from '../../consts/payerConfig';
import {
  changePayerType,
  changePayer,
  changeAgent,
  savePayer,
  updateCustomers,
  fetchAgentsThenUpdateCompany,
  resetAgentsOfCompany
} from '../../actions/payer';

import AMIds from '../../automationIds';

export class Payer extends BasePayer {
  render() {
    const { paymentAction, payment, limitPayer } = this.props;
    const isSelectModifyPaymentPlan = paymentAction.get('isSelectModifyPaymentPlan');
    const isSelectMakeAPayment = paymentAction.get('isSelectMakeAPayment');
    let isAllowChangePayerForModifyPaymentPlan = payment.get('isAllowChangePayerForModifyPaymentPlan');
    let payerTitle = 'Payer';

    if (isSelectModifyPaymentPlan) {
      payerTitle = `Payer for ${payment.get('paymentPlanWording')}`;
    }

    if (isSelectMakeAPayment) {
      payerTitle = 'Payer for Balance';
      isAllowChangePayerForModifyPaymentPlan = true;
    }

    return (
      <div className="payment-payer panel">
        <h2>{ payerTitle }</h2>
        {limitPayer ?
          this.renderPayerWithLimit(isAllowChangePayerForModifyPaymentPlan) :
          this.renderPayerWithoutLimit(isAllowChangePayerForModifyPaymentPlan)
        }
      </div>
    );
  }

  renderPayerWithoutLimit(isAllowChangePayerForModifyPaymentPlan) {
    const { payer, payment } = this.props;
    const { payerType, customers, company } = payer.toJS();
    const successPay = payment.get('successPay');
    const customersData = customers.data;
    const customersLen = customersData.length;
    const customerSelected = customers.selected;
    const companyData = company.data;
    const companyLen = companyData.length;
    const companySelected = company.selected;
    const isChangePayerDisabled = successPay || !isAllowChangePayerForModifyPaymentPlan;
    let companyObj = companyLen && companyData.filter(item => item.id === companySelected);
    let agentsLen = 0;
    companyObj = companyObj && companyObj[0];
    agentsLen = companyObj && companyObj.agents.data.length;

    return (<div>
      <div className="payment-payer-item aaui-flexbox">
        <div className="prt-srch-itm-radio">
          <Radio
            name="chooseRadioGroup"
            disabled={isChangePayerDisabled}
            value={CUSTOMER_TYPE_VALUE}
            data-qa-id={AMIds.payer.customer}
            checked={payerType === CUSTOMER_TYPE_VALUE}
            onChange={e => this.onChooseChange(e)}
          >
            Customer
          </Radio>
          <form action="#" name="new_customer">
            <input type="hidden" name="quick_res_reference_id" ref={(input) => { this.quick_res_reference_id = input; }} />
            <input type="text" name="quick_res_reference" ref={(input) => { this.quick_res_reference = input; }} />
          </form>
        </div>
        {customersLen && payerType === CUSTOMER_TYPE_VALUE ?
          <Dropdown
            className="payment-payer-custom-list"
            data={customersData}
            disabled={isChangePayerDisabled}
            value={customerSelected}
            data-qa-id={AMIds.payer.customerList}
            onChange={({ value }) => this.changePayer(value, customerSelected, CUSTOMER_TYPE_VALUE)}
          /> : ''
        }
        {payerType === CUSTOMER_TYPE_VALUE ?
          <div className="prt-srch-itm-link">
            {customersLen ?
              <span className="payment-payer-link-des">Not in the list?</span> : ''
            }
            <span
              className={`payment-payer-link payment-srch-text ${isChangePayerDisabled ? 'payment-payer-link-disabled' : ''}`}
              onClick={() => this.onCustomerChange(isChangePayerDisabled)}
            >
              <i className="icon icon-search" />
              Search customer
            </span>
          </div>
          : undefined
        }
      </div>

      <div className="payment-payer-item payment-payer-item-company aaui-flexbox">
        <div className="prt-srch-itm-radio">
          <Radio
            name="chooseRadioGroup"
            disabled={isChangePayerDisabled}
            value={COMPANY_TYPE_VALUE}
            data-qa-id={AMIds.payer.organization}
            checked={payerType === COMPANY_TYPE_VALUE}
            onChange={e => this.onChooseChange(e)}
          >
            <span className="company-label">{decodeHtmlStr(company.label)}</span>
          </Radio>
          <form action="#" name="new_company">
            <input type="hidden" name="company_id" ref={(input) => { this.company_id = input; }} />
            <input type="text" name="company" ref={(input) => { this.company = input; }} />
          </form>
        </div>
        <div className="payment-payer-company">
          {companyObj && payerType === COMPANY_TYPE_VALUE ?
            <div className="prt-srch-itm-showName">{decodeHtmlStr(companyObj.name)}</div> : ''
          }

          {payerType === COMPANY_TYPE_VALUE ?
            <div className="prt-srch-itm-link">
              <span
                className={`payment-payer-link payment-srch-text ${isChangePayerDisabled ? 'payment-payer-link-disabled' : ''}`}
                onClick={() => this.onCompanyChange(isChangePayerDisabled)}
              >
                <i className={companyObj ? 'icon icon-exchange' : 'icon icon-search'} />
                {(companyObj ? 'Change ' : 'Search ') + decodeHtmlStr(company.label)}
              </span>
            </div>
            : undefined
          }
          {companyObj && payerType === COMPANY_TYPE_VALUE && agentsLen ?
            <div className="prt-srch-itm-agent">
              <span>{decodeHtmlStr(company.label)} Agent</span>
              <Dropdown
                className="payment-payer-agents-list"
                placeholder="Agent name"
                disabled={isChangePayerDisabled}
                data={companyObj.agents.data}
                value={companyObj.agents.selected}
                data-qa-id={AMIds.payer.agents}
                onChange={({ value }) => this.changeAgent(value,
                  companyObj.agents.selected, COMPANY_TYPE_VALUE)}
              />
            </div> : ''
          }

          {companyObj && payerType === COMPANY_TYPE_VALUE && !agentsLen ?
            <div className="prt-srch-itm-agent">
              <span className="noAgents">No authorized agents.</span>
            </div> : ''
          }
        </div>
      </div>
    </div>);
  }

  renderPayerWithLimit(isAllowChangePayerForModifyPaymentPlan) {
    const { payer, payment } = this.props;
    const { payerType, customers, company, showPayerType } = payer.toJS();
    const successPay = payment.get('successPay');
    const customersData = customers.data;
    const customersLen = customersData.length;
    const customerSelected = customers.selected;
    const companyData = company.data;
    const companyLen = companyData.length;
    const companySelected = company.selected;
    const isChangePayerDisabled = successPay || !isAllowChangePayerForModifyPaymentPlan;
    let companyObj = companyLen && companyData.filter(item => item.id === companySelected);
    let agentsLen = 0;
    companyObj = companyObj && companyObj[0];
    agentsLen = companyObj && companyObj.agents.data.length;

    return (<div>
      {(showPayerType || (!showPayerType && payerType === CUSTOMER_TYPE_VALUE)) ?
        <div className="payment-payer-item aaui-flexbox">
          <div className="prt-srch-itm-radio">
            {showPayerType ?
              <Radio
                name="chooseRadioGroup"
                disabled={isChangePayerDisabled}
                value={CUSTOMER_TYPE_VALUE}
                data-qa-id={AMIds.payer.customer}
                checked={payerType === CUSTOMER_TYPE_VALUE}
                onChange={e => this.onChooseChange(e)}
              >
                Customer
              </Radio> : <span>Customer</span>
            }
          </div>

          {customersLen && payerType === CUSTOMER_TYPE_VALUE ?
            <Dropdown
              disabled={isChangePayerDisabled}
              className="payment-payer-custom-list"
              data={customersData}
              value={customerSelected}
              data-qa-id={AMIds.payer.customerList}
              onChange={({ value }) => this.changePayer(
                value, customerSelected, CUSTOMER_TYPE_VALUE)}
            /> : ''
          }
        </div> : ''
      }

      {(showPayerType || (!showPayerType && payerType === COMPANY_TYPE_VALUE)) ?
        <div className="payment-payer-item payment-payer-item-company aaui-flexbox">
          <div className="prt-srch-itm-radio">
            {showPayerType ?
              <Radio
                name="chooseRadioGroup"
                disabled={isChangePayerDisabled}
                value={COMPANY_TYPE_VALUE}
                data-qa-id={AMIds.payer.organization}
                checked={payerType === COMPANY_TYPE_VALUE}
                onChange={e => this.onChooseChange(e)}
              >
                <span className="company-label">{decodeHtmlStr(company.label)}</span>
              </Radio> : <span>{decodeHtmlStr(company.label)}</span>
            }
          </div>

          {companyLen && payerType === COMPANY_TYPE_VALUE ?
            <div className="payment-payer-company aaui-flexbox">
              <Dropdown
                className="payment-payer-company-list"
                placeholder="Company name"
                data={companyData}
                value={companySelected}
                disabled={isChangePayerDisabled}
                data-qa-id={AMIds.payer.organizationList}
                onChange={({ value }) => this.changePayer(
                  value, companySelected, COMPANY_TYPE_VALUE)}
              />
              {companyLen && agentsLen ?
                <div className="prt-srch-itm-agent">
                  <span>{decodeHtmlStr(company.label)} Agent</span>
                  <Dropdown
                    className="payment-payer-agents-list"
                    placeholder="Agent name"
                    disabled={isChangePayerDisabled}
                    data={companyObj.agents.data}
                    value={companyObj.agents.selected}
                    data-qa-id={AMIds.payer.agents}
                    onChange={({ value }) => this.changeAgent(
                      value, companyObj.agents.selected, COMPANY_TYPE_VALUE)}
                  />
                </div> : ''
              }
              {companyLen && !agentsLen ?
                <div className="prt-srch-itm-agent">
                  <span className="noAgents">No authorized agents.</span>
                </div> : ''
              }
            </div> : ''
          }
        </div> : ''
      }
    </div>);
  }

  changePayer(selectedVal, prevVal, payerType, isNotPromptUser) {
    if (selectedVal !== prevVal) {
      if (isNotPromptUser) {
        return this.savePayerThenChangeOptions(selectedVal, payerType);
      }

      return this.onPayerChange(this.props.paymentOptionsSize === 0)
        .then(() => this.savePayerThenChangeOptions(selectedVal, payerType));
    }

    return Promise.reject('No need to update payer');
  }

  onChooseChange(e) {
    const val = parseFloat(e.target.value);
    const payer = this.props.payer.toJS();
    const payerType = payer.payerType;

    if (val !== payerType) {
      this.onPayerChange(this.props.paymentOptionsSize === 0)
        .then(() => {
          this.props.changePayerType(+val);
          return this.savePayerThenChangeOptions(payer[PAYER_TYPE[val]].selected, +val);
        });
    }
  }

  changeAgent(selectedVal, prevVal, payerType) {
    const payer = this.props.payer.toJS();
    const selectedCompany = payer[PAYER_TYPE[payerType]].selected;

    if (selectedVal !== prevVal) {
      this.onPayerChange(this.props.paymentOptionsSize === 0)
        .then(() => {
          this.props.changeAgent(selectedCompany, selectedVal);
          return this.savePayerThenChangeOptions(selectedCompany, payerType, selectedVal);
        });
    }
  }

  onCustomerChange(isDisabled, isReallyChange) {
    const payer = this.props.payer.toJS();
    const customersObj = payer[PAYER_TYPE[CUSTOMER_TYPE_VALUE]];
    const customers = customersObj.data;
    const customerIds = customers.map(item => item.id);
    /* istanbul ignore if */
    if (isDisabled) {
      return false;
    }

    if (!isReallyChange) {
      this.onCustomerChange(isDisabled, true);

      return false;
    }

    const url = `${URL.searchCustomer}&callback=__permitSearchCustomer()`;
    window.__permitSearchCustomer = () => {
      const customerId = parseFloat(this.quick_res_reference_id.value);
      const customerName = this.quick_res_reference.value;
      /* istanbul ignore else */
      if (customerId && customerName) {
        if (customerIds.indexOf(customerId) === -1) {
          if (payer.params.customerId > 0) {
            return this.onPayerChange(this.props.paymentOptionsSize === 0)
              .then(() => this.changePayer(
                customerId, customersObj.selected, CUSTOMER_TYPE_VALUE, true)
              )
              .then(
                () => this.props.updateCustomers({
                  name: customerName,
                  id: customerId
                })
              );
          }

          return this.changePayer(customerId, customersObj.selected, CUSTOMER_TYPE_VALUE, true)
            .then(() => this.props.updateCustomers({
              name: customerName,
              id: customerId
            }));
        }

        return this.changePayer(customerId, customersObj.selected, CUSTOMER_TYPE_VALUE, true);
      }

      return false;
    };

    PopupWindowWithMenu(url, 'Search customer', '600', '600', 'yes');

    return false;
  }

  onCompanyChange(isDisabled, isReallyChange) {
    const url = `${URL.searchCompany}&callback=__permitSearchCompany()`;
    const payer = this.props.payer.toJS();
    const companyObj = payer[PAYER_TYPE[COMPANY_TYPE_VALUE]];
    const companies = companyObj.data;
    const companyIds = companies.map(item => item.id);

    if (isDisabled) {
      return false;
    }

    if (!isReallyChange) {
      this.onCompanyChange(isDisabled, true);

      return false;
    }

    window.__permitSearchCompany = () => {
      const companyId = parseFloat(this.company_id.value);
      const companyName = this.company.value;

      if (companyId && companyName) {
        if (companyIds.indexOf(companyId) === -1) {
          if (payer.params.companyId > 0) {
            return this.onPayerChange(this.props.paymentOptionsSize === 0)
              .then(() => this.changePayer(
                companyId, companyObj.selected, COMPANY_TYPE_VALUE, true)
              )
              .then(() => this.props.fetchAgentsThenUpdateCompany(
                {
                  name: companyName,
                  id: companyId
                })
              );
          }

          return this.changePayer(companyId, companyObj.selected, COMPANY_TYPE_VALUE, true)
              .then(() => this.props.fetchAgentsThenUpdateCompany(
                {
                  name: companyName,
                  id: companyId
                })
              );
        }

        return this.changePayer(companyId, companyObj.selected, COMPANY_TYPE_VALUE, true);
      }

      return false;
    };

    PopupWindowWithMenu(url, 'Search company', '600', '600', 'yes');
    return false;
  }

  savePayerThenChangeOptions(selectedVal, payerType, selectedAgent) {
    const payer = this.props.payer.toJS();
    let companyId = 0;
    let agentId = 0;
    let customerId = 0;
    let company = null;
    let selectedCompany = null;

    switch (payerType) {
      case CUSTOMER_TYPE_VALUE:
        customerId = selectedVal;
        break;
      case COMPANY_TYPE_VALUE:
        companyId = selectedVal;
        company = payer[PAYER_TYPE[payerType]];
        selectedCompany = company.data.filter(item => item.id === selectedVal)[0];
        /* eslint-disable */
        agentId = selectedAgent || (selectedCompany && selectedCompany.agents.selected || 0);
        /* eslint-enable */
        break;
      default:
        break;
    }

    return this.props.savePayer(
      {
        customer_id: customerId,
        company_id: companyId,
        agent_id: agentId
      },
      selectedVal
    ).then(
      () => this.props.changePayer(selectedVal, payerType)
    );
  }
}

export default connect(
  null,
  {
    changePayerType,
    changePayer,
    changeAgent,
    savePayer,
    updateCustomers,
    fetchAgentsThenUpdateCompany,
    resetAgentsOfCompany
  }
)(Payer);
