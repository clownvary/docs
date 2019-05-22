import React from 'react';
import { connect } from 'react-redux';
import Radio from 'react-base-ui/lib/components/Radio';
import UIComponent from 'shared/components/UIComponent';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import { PopupWindowWithMenu } from 'shared/components/Waiver/util';
import Prerequisite from 'shared/components/Prerequisite';
import { SpecialHandlingIcon } from 'shared/components/SpecialHandling';
import { fetchSpecialHandlingStatus, fetchSpecialHandlingInfo } from 'shared/actions/specialHandling';
import URL from '../../urls';
import { SEARCHKINDS } from '../../reducers/permitSearch';
import {
  changeCustomer,
  changeCompany,
  changeChooseState,
  changeCompanyAgent
} from '../../actions/permitSearch';
import AMIds from '../../automationIds';
import './index.less';

const permitID = parseInt(window.__permitDetail__.__initialState__.permitID, 10);

export class PermitSearch extends UIComponent {

  onChooseChange(e) {
    const { value } = e.target;
    const { permitSearchData } = this.props;
    const { chooseState } = permitSearchData.toJS();

    if (value !== chooseState) {
      this.props.changeChooseState(value);
    }
  }

  onChangeAgent({ value }) {
    const { permitSearchData } = this.props;
    const { agentValue } = permitSearchData.toJS();

    if (value === agentValue) {
      return false;
    }
    this.props.changeCompanyAgent(value);
    this.props.fetchSpecialHandlingStatus(value, true);
    return null;
  }

  onCustomerChange() {
    const url = `${URL.searchCustomer}&callback=__permitSearchCustomer()`;

    window.__permitSearchCustomer = () => {
      const customerId = this._refs.quickResReferenceId.value;
      const customerName = this._refs.quickResReference.value;

      /* istanbul ignore else */
      if (customerId && customerName) {
        this.props.changeCustomer({ customer_id: customerId, customer_name: customerName });
      }
    };
    PopupWindowWithMenu(url, 'Search customer', '600', '600', 'yes');
  }

  onCompanyChange() {
    const url = `${URL.searchCompany}&callback=__permitSearchCompany()`;
    const companyWording = this.props.companyWording;

    window.__permitSearchCompany = () => {
      const companyId = this._refs.companyId.value;
      const companyName = this._refs.company.value;

      /* istanbul ignore else */
      if (companyId && companyName) {
        this.props.changeCompany({ company_id: companyId, company_name: companyName });
      }
    };
    PopupWindowWithMenu(url, `Search ${companyWording}`, '600', '600', 'yes');
  }

  generateCustomer({ chooseState, customer }) {
    const isCustomerState = chooseState === SEARCHKINDS.CUSTOMER;
    const customerId = customer.customer_id;
    const customerName = customer.customer_name;
    const showCustomer = isCustomerState && customerId && customerName;
    const { specialHandlingData } = this.props;
    const specialHandlingCustomer = specialHandlingData.get('specialHandling');
    return (
      <div className="permit-search-item">
        {/* show radio and label customer */}
        <div className="prt-srch-itm-radio">
          <Radio
            name="chooseRadioGroup"
            value="customer"
            checked={isCustomerState}
            data-qa-id={AMIds.filters.customer}
            onChange={e => this.onChooseChange(e)}
            disabled={!!permitID}
          >
            Customer
          </Radio>
          <form action="#" name="new_customer">
            <input type="hidden" name="quick_res_reference_id" ref={(ref) => { this._refs.quickResReferenceId = ref; }} />
            <input type="text" name="quick_res_reference" ref={(ref) => { this._refs.quickResReference = ref; }} />
          </form>
        </div>
        {/* show customer name */}
        {
          showCustomer ?
            <div className="prt-srch-itm-showName">{decodeHtmlStr(customerName)}</div> : undefined
        }
        {
          showCustomer && specialHandlingCustomer ? <SpecialHandlingIcon customerId={specialHandlingData.get('customerId')} /> : ''
        }
        {/* show search customer link */}
        {
          isCustomerState && !permitID ?
            <div className="prt-srch-itm-link">
              <a
                /* eslint-disable */
                href="javascript:void(0)"
                /* eslint-enable */
                className="permit-search-link"
                onClick={() => this.onCustomerChange()}
              >
                <i className={customerId && customerName ? 'icon icon-exchange' : 'icon icon-search'} />
                {customerId && customerName ? 'Change customer' : 'Search customer'}
              </a>
            </div>
          : undefined
        }

      </div>
    );
  }

  generateCompany({ chooseState, agents, agentValue, company }) {
    const { companyWording, specialHandlingData } = this.props;
    const isCompanyState = chooseState === SEARCHKINDS.COMPANY;
    const companyId = company.company_id;
    const companyName = company.company_name;
    const specialHandlingAgent = specialHandlingData.get('specialHandling');
    return (
      <div className="permit-search-item">
        {/* show radio and label company */}
        <div className="prt-srch-itm-radio permit-company-radio">
          <Radio
            name="chooseRadioGroup"
            value="company"
            checked={isCompanyState}
            data-qa-id={AMIds.filters.organization}
            onChange={e => this.onChooseChange(e)}
            disabled={!!permitID}
          >
            {decodeHtmlStr(companyWording)}
          </Radio>
          <form action="#" name="new_company">
            <input type="hidden" name="company_id" ref={(ref) => { this._refs.companyId = ref; }} />
            <input type="text" name="company" ref={(ref) => { this._refs.company = ref; }} />
          </form>
        </div>
        <div className="permit-company">
          {/* show company name */}
          {
            isCompanyState && companyId && companyName ?
              <div className="prt-srch-itm-showName">{decodeHtmlStr(companyName)}</div> :
            undefined
          }

          {/* show search company link */}
          {
            isCompanyState && !permitID ?
              <div className="prt-srch-itm-link">
                <a
                  /* eslint-disable */
                  href="javascript:void(0)"
                  /* eslint-enable */
                  className="permit-search-link"
                  onClick={() => this.onCompanyChange()}
                >
                  <i className={companyId && companyName ? 'icon icon-exchange' : 'icon icon-search'} />
                  {companyId && companyName ? `Change ${decodeHtmlStr(companyWording)}` : `Search ${decodeHtmlStr(companyWording)}`}
                </a>
              </div>
            : undefined
          }
        </div>

        <div className="permit-agent">
          {/* show agent info */}
          {
            isCompanyState && companyId && agents.data && agents.data.length ?
              <div className="prt-srch-itm-agent">
                <label htmlFor="Agent">{decodeHtmlStr(companyWording)} Agent</label>
                <Dropdown
                  showTextTip
                  placeholder="Select agent"
                  data={agents.data}
                  value={agentValue || -1}
                  data-qa-id={AMIds.filters.agents}
                  style={{ width: 'auto', minWidth: '180px' }}
                  onChange={value => this.onChangeAgent(value)}
                  disabled={!!permitID}
                />
                { specialHandlingAgent ? <SpecialHandlingIcon customerId={specialHandlingData.get('customerId')} /> : '' }
              </div>
            :
              <div className="prt-srch-itm-agent">
                {isCompanyState && companyId ? <span className="noAgents">No authorized agents</span> : ''}
              </div>
          }
        </div>
      </div>
    );
  }

  render() {
    const {
      permitSearchData,
      prerequisite,
      updateIsOverrideAction,
      updateUserPasswordAction,
      updateUserNameAction,
      clearPrerequisiteErrsAction,
      companyWording
    } = this.props;
    const data = permitSearchData.toJS();
    return (
      <div className="permit-search panel">
        <div className="permit-search-title">Choose Customer/{decodeHtmlStr(companyWording)}</div>
        <Prerequisite
          prerequisite={prerequisite}
          updateIsOverrideAction={updateIsOverrideAction}
          updateUserPasswordAction={updateUserPasswordAction}
          updateUserNameAction={updateUserNameAction}
          clearPrerequisiteErrsAction={clearPrerequisiteErrsAction}
        />
        {this.generateCustomer(data)}
        {this.generateCompany(data)}
      </div>
    );
  }
}

export default connect(
  null,
  {
    changeCustomer,
    changeCompany,
    changeChooseState,
    changeCompanyAgent,
    fetchSpecialHandlingStatus,
    fetchSpecialHandlingInfo
  }
)(PermitSearch);
