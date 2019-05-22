import PropTypes from 'prop-types';
import React from 'react';
import capitalize from 'lodash/capitalize';
import classNames from 'classnames';
import { SafeText } from 'react-base-ui/lib/components/SafeText';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import Tooltip from 'react-base-ui/lib/components/Tooltip';
import { Dock } from 'react-base-ui/lib/consts';
import { count } from 'react-base-ui/lib/utils/dataAccess';
import find from 'lodash/find';
import UIComponent from 'shared/components/UIComponent';
import formatCharge from 'shared/utils/formatCharge';
import { Authority } from 'shared/authorities';
import normalizeData from 'shared/utils/normalizeData';
import { SpecialHandlingIcon } from 'shared/components/SpecialHandling';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import Popover from 'react-base-ui/lib/components/Popover';
import AsyncContent from 'react-base-ui/lib/components/AsyncContent';
import { PopupWindowWithMenu } from 'shared/components/Waiver/util';


import './index.less';

import { isCancelled, isDenied, isCompleted } from '../../utils/permitStatus';

import urls from '../../urls';

let isCompanyAgentChange = false;
export default class GeneralInformation extends UIComponent {

  static propTypes = {
    isShowTotalBalanceDueDetail: PropTypes.bool.isRequired
  };

  state = {
    showAgentsDropdown: false
  }

  componentDidMount() {
    const availableCompanyAgents = this.props.permitHolder.get('availableCompanyAgents').toJS();

    if (count(availableCompanyAgents) === 0 && !Authority.isDisabled('changePermitGeneralDetails')) {
      const tooltipOption = {
        content: 'No organization agent.',
        dockStyle: Dock.TOP_CENTER,
        distance: '5',
        showShadow: false,
        selector: '[data-tooltip]',
        trigger: 'hover',
        theme: 'light',
        effect: 'none'
      };

      Tooltip.option(tooltipOption);
      Tooltip.build(tooltipOption.selector);
    }

    this.setupChangePermitHolderCallback();
  }

  componentWillUnmount() {
    Tooltip.clean();
    this.cleanupChangePermitHolderCallback();
  }

  setupChangePermitHolderCallback = () => {
    window.__changePermitHolderCallback = () => {
      const type = this._refs.modifyHolderType.value;
      const id = this._refs.modifyHolderId.value;
      this.props.getNewPermitHolder(type, id)
        .then(({ customerId, companyId }) => {
          this.setState({ selectedAgentId: customerId });
          this.props.updatePermitHolder({ customerId, companyId });
        });
    };
  }

  cleanupChangePermitHolderCallback = () => {
    delete window.__changePermitHolderCallback;
  }

  openAgentsDropdown = (isChangeAgentDisabled) => {
    if (isChangeAgentDisabled) {
      return;
    }

    const availableCompanyAgents = this.props.permitHolder.get('availableCompanyAgents').toJS();
    const { selectedAgentId } = this.state;
    let selectedAgent = find(availableCompanyAgents, { selected: true });

    if (!selectedAgent) {
      selectedAgent = {};
    }

    this.selectAgent(selectedAgentId || selectedAgent.id);
  }

  selectAgent(agentId) {
    this.setState({
      showAgentsDropdown: true,
      selectedAgentId: agentId
    }, () => {
      const dropDownButtonDom = document.querySelector('.change-company-agent-dropdown button');
      /* istanbul ignore else */
      if (dropDownButtonDom) {
        dropDownButtonDom.focus();
      }
    });
  }

  onAgentChange = ({ value: customerId }) => {
    /* istanbul ignore else */
    if (!isCompanyAgentChange) {
      isCompanyAgentChange = true;
    }

    const companyId = this.props.permitHolder.get('companyId');
    const needsConfirmReset = customerId !== this.props.permitHolder.get('customerId');

    this.props.changeCustomerOrCompany(customerId, companyId)
      .then((specialHandling) => {
        this.setState({ selectedAgentId: customerId });
        this.props.setResetFeesConfirmation(needsConfirmReset, specialHandling);
      });
  }

  onMenuHide = () => {
    !isCompanyAgentChange && this.setState({ showAgentsDropdown: false });
  }

  renderCompany() {
    const {
      initialData,
      specialHandlingData,
      reservationDetail: {
        actionBarInformation: {
          changePermitStatus: { currentStatus: permitStatus }
        }
      }
    } = this.props;

    const {
      companyName,
      customerName,
      customerType,
      availableCompanyAgents
    } = this.props.permitHolder.toJS();

    const companyWording = decodeHtmlStr(capitalize(initialData.companyWording));
    const { showAgentsDropdown, selectedAgentId } = this.state;
    const specialHandlingUser = specialHandlingData.get('specialHandling');
    const specialHandlingCustomerId = specialHandlingData.get('customerId');
    const isChangeCompanyDisabled = Authority.isDisabled('changePermitGeneralDetails');
    const isChangeAgentDisabled = isChangeCompanyDisabled || count(availableCompanyAgents) === 0;
    const showChangeCompanyIcon = !(
      isDenied(permitStatus.value) ||
      isCancelled(permitStatus.value) ||
      isCompleted(permitStatus.value)
    );

    return (
      <div className="aaui-flex afx-xl-12 customer-info-row">
        <div className="afx-xl-2-12">
          <div className="customer-info-label">{companyWording}</div>
        </div>
        <div className="afx-xl-2-12">
          <div className="customer-info-value">
            <SafeText
              tagName="div"
              className={classNames('customer-info-text', { 'follow-icon': showChangeCompanyIcon })}
              text={companyName}
            />
            <div className="following-icon">
              {
                showChangeCompanyIcon &&
                <i
                  className={classNames(
                    'icon icon-sign-m',
                    { disabled: isChangeCompanyDisabled }
                  )}
                  disabled={isChangeCompanyDisabled}
                  onClick={() => this.searchPermitHolder(isChangeCompanyDisabled, urls.searchCompany, `Search ${companyWording}`)}
                />
              }
            </div>
          </div>
        </div>
        <div className="afx-xl-2-12">
          <div className="customer-info-label">{companyWording} Agent</div>
        </div>
        <div className="afx-xl-2-12">
          <div
            className={classNames(
              'customer-info-value',
              { 'change-company-agent-group': showAgentsDropdown }
            )}
          >
            {
              showAgentsDropdown ?
                <div className="follow-icon">
                  <Dropdown
                    ref={(dropdown) => { this._refs.companyDropdown = dropdown; }}
                    autoOpen
                    className="change-company-agent-dropdown"
                    data={normalizeData(availableCompanyAgents).data}
                    value={selectedAgentId}
                    onChange={this.onAgentChange}
                    onMenuHide={this.onMenuHide}
                  />
                </div>
                : <SafeText tagName="div" className="customer-info-text follow-icon" text={customerName} />
            }
            <div className="following-icon">
              { specialHandlingUser ? <SpecialHandlingIcon customerId={specialHandlingCustomerId} /> : '' }
              {
                !showAgentsDropdown && showChangeCompanyIcon &&
                <i
                  className={classNames(
                    'icon icon-sign-m',
                    { disabled: isChangeAgentDisabled }
                  )}
                  data-tooltip
                  onClick={() => { this.openAgentsDropdown(isChangeAgentDisabled); }}
                />
              }
            </div>
          </div>
        </div>
        <div className="afx-xl-2-12">
          <div className="customer-info-label">Customer Type</div>
        </div>
        <div className="afx-xl-2-12">
          <div className="customer-info-value">
            <SafeText tagName="div" className="customer-info-text" text={customerType} />
          </div>
        </div>
      </div>
    );
  }

  searchPermitHolder = (isChangePermitHolderDisabled, baseUrl, title) => {
    if (isChangePermitHolderDisabled) { return; }
    PopupWindowWithMenu(`${baseUrl}&callback=__changePermitHolderCallback()`, title, '600', '600', 'yes');
  }

  renderCustomer() {
    const {
      specialHandlingData,
      reservationDetail: {
        actionBarInformation: {
          changePermitStatus: { currentStatus: permitStatus }
        }
      }
    } = this.props;

    const { customerName, customerType } = this.props.permitHolder.toJS();

    const specialHandlingUser = specialHandlingData.get('specialHandling');
    const specialHandlingCustomerId = specialHandlingData.get('customerId');
    const isChangeCustomerDisabled = Authority.isDisabled('changePermitGeneralDetails');
    const showChangeCustomerIcon = !(
      isDenied(permitStatus.value) ||
      isCancelled(permitStatus.value) ||
      isCompleted(permitStatus.value)
    );

    return (
      <div className="aaui-flex afx-xl-12 customer-info-row">
        <div className="afx-xl-2-12">
          <div className="customer-info-label">Customer</div>
        </div>
        <div className="afx-xl-2-12">
          <div className="customer-info-value">
            <SafeText
              tagName="div"
              className={classNames('customer-info-text', { 'follow-icon': showChangeCustomerIcon })}
              text={customerName}
            />
            <div className="following-icon">
              { specialHandlingUser ? <SpecialHandlingIcon customerId={specialHandlingCustomerId} /> : '' }
              {
                showChangeCustomerIcon &&
                <i
                  className={classNames(
                    'icon icon-sign-m',
                    { disabled: isChangeCustomerDisabled }
                  )}
                  disabled={isChangeCustomerDisabled}
                  onClick={() => this.searchPermitHolder(isChangeCustomerDisabled, urls.searchCustomer, 'Search Customer')}
                />
              }
            </div>
          </div>
        </div>
        <div className="afx-xl-2-12">
          <div className="customer-info-label">Customer Type</div>
        </div>
        <div className="afx-xl-2-12">
          <div className="customer-info-value">
            <SafeText tagName="div" className="customer-info-text" text={customerType} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { reservationDetail, balanceDueDetail } = this.props;
    const { generalInformation } = reservationDetail;
    const permitStatus = reservationDetail.actionBarInformation.changePermitStatus.currentStatus;
    const paymentPlanInformation = reservationDetail.paymentPlanInformation;
    const showPaymentPlan = !(isCancelled(permitStatus.value) || isDenied(permitStatus.value)) &&
      (paymentPlanInformation.nextDueAmount !== 0 ||
        paymentPlanInformation.overDueAmount !== 0);
    const { companyName, customerPhone, customerEmail } = this.props.permitHolder.toJS();

    return (
      <div className="generalInformation panel">
        <div className="customerInfo">
          {
            companyName ? this.renderCompany() : this.renderCustomer()
          }
          <form action="#" name="modify">
            <input type="text" name="holder" ref={(ref) => { this._refs.modifyHolderName = ref; }} />
            <input type="hidden" name="holder_id" ref={(ref) => { this._refs.modifyHolderId = ref; }} />
            <input type="text" name="holder_type" ref={(ref) => { this._refs.modifyHolderType = ref; }} />
            <input type="hidden" name="holder_type_id" />
          </form>
          <div className="aaui-flex afx-xl-12 customer-info-row">
            <div className="afx-xl-2-12">
              <div className="customer-info-label">Phone</div>
            </div>
            <div className="afx-xl-2-12">
              <div className="customer-info-value">
                <SafeText tagName="div" className="customer-info-text" text={customerPhone || '--'} />
              </div>
            </div>
            <div className="afx-xl-2-12">
              <div className="customer-info-label">Email</div>
            </div>
            <div className="afx-xl-2-12">
              <div className="customer-info-value">
                <SafeText tagName="div" className="customer-info-text" text={customerEmail || '--'} />
              </div>
            </div>
          </div>
          <div className="aaui-flex afx-xl-12 customer-info-row">
            <div className="afx-xl-2-12">
              <div className="customer-info-label">Date</div>
            </div>
            <div className="afx-xl-2-12">
              <div className="customer-info-value">
                <SafeText tagName="div" className="customer-info-text" text={generalInformation.permitDate} />
              </div>
            </div>
            <div className="afx-xl-2-12">
              <div className="customer-info-label">System User</div>
            </div>
            <div className="afx-xl-2-12">
              <div className="customer-info-value">
                <SafeText tagName="div" className="customer-info-text" text={generalInformation.systemUser} />
              </div>
            </div>
            <div className="afx-xl-2-12">
              <div className="customer-info-label balance-due">Total Balance Due</div>
            </div>
            <div className="afx-xl-2-12">
              <AsyncContent
                loader={() => this.props.fetchBalanceDueDetailAsyncAction()}
                component={
                  <div className="customer-info-value customer-info-text">
                    <span className="balance-due-text">{formatCharge(balanceDueDetail.totalBalanceDue, 2)}</span>
                    <i
                      data-popover-trigger
                      className="icon icon-info-circle pop-base"
                      onMouseOver={() => this.showTotalBalanceDueDetail(true)}
                      onMouseOut={() => this.showTotalBalanceDueDetail(false)}
                    >
                      <Popover
                        className={this.props.isShowTotalBalanceDueDetail ? 'balance-due-detail' : 'balance-due-detail u-hidden'}
                        direction="sw"
                      >
                        <div className="balance-due__item">
                          <span className="upArrow__label">Rental Charges</span>
                          <span className="amount">{formatCharge(balanceDueDetail.rentalCharges)}</span>
                        </div>
                        <div className="balance-due__item">
                          <span className="upArrow__label">Taxes</span>
                          <span className="amount">{formatCharge(balanceDueDetail.taxes)}</span>
                        </div>
                        <div className="balance-due__item">
                          <span className="upArrow__label">Deposit Claims</span>
                          <span className="amount">{formatCharge(balanceDueDetail.depositClaims)}</span>
                        </div>
                        <div className="balance-due__item">
                          <span className="upArrow__label">Discounts</span>
                          <span className="amount">{formatCharge(balanceDueDetail.chargeDiscounts)}</span>
                        </div>
                        <div className="balance-due__item">
                          <span className="upArrow__label">Rental Charge Payments/Credits</span>
                          <span className="amount">{formatCharge(balanceDueDetail.rentalChargePaymentsCredits)}</span>
                        </div>
                        <div className="balance-due__item bold">
                          <span className="upArrow__label">Rental Charges Balance Due</span>
                          <span className="amount">{formatCharge(balanceDueDetail.rentalChargesBalanceDue)}</span>
                        </div>

                        <hr />

                        <div className="balance-due__item">
                          <span className="upArrow__label">Deposits</span>
                          <span className="amount">{formatCharge(balanceDueDetail.deposits)}</span>
                        </div>
                        <div className="balance-due__item">
                          <span className="upArrow__label">Deposit Taxes</span>
                          <span className="amount">{formatCharge(balanceDueDetail.depositTaxes)}</span>
                        </div>
                        <div className="balance-due__item">
                          <span className="upArrow__label">Discounts</span>
                          <span className="amount">{formatCharge(balanceDueDetail.depositDiscounts)}</span>
                        </div>
                        <div className="balance-due__item">
                          <span className="upArrow__label">Deposit Payments/Credits</span>
                          <span className="amount">{formatCharge(balanceDueDetail.depositPaymentsCredits)}</span>
                        </div>
                        <div className="balance-due__item bold">
                          <span className="upArrow__label">Deposit Balance Due</span>
                          <span className="amount">{formatCharge(balanceDueDetail.depositBalanceDue)}</span>
                        </div>
                      </Popover>
                    </i>
                  </div>
                }
              />
            </div>
          </div>
        </div>
        {
          showPaymentPlan &&
          (<div className="paymentPlan">
            <div className="">
              <div className="paymentPlan__label">Payment Plan</div>
              <div className="detail">
                <span
                  className="item"
                  title={decodeHtmlStr(`Payer: ${paymentPlanInformation.payerName}`)}
                >
                  <i className="icon icon-people-m" />
                  <span> {decodeHtmlStr(paymentPlanInformation.payerName)} </span>
                </span>
                <span className="item" title={`Number of Payment(s): ${paymentPlanInformation.numberOfPayment}`}>
                  <i className="icon icon-calendar-add-m" /> {paymentPlanInformation.numberOfPayment}
                </span>
                {paymentPlanInformation.paymentMethod ?
                  <span className="item" title={`Payment Method: ${paymentPlanInformation.paymentMethod}`}>
                    <i className="icon icon-credit-card-m" /> {paymentPlanInformation.paymentMethod}
                  </span> : undefined
                }
                {paymentPlanInformation.nextDueDate ?
                  <span className="item" title={`Next Due: ${paymentPlanInformation.nextDueDate} ${formatCharge(paymentPlanInformation.nextDueAmount)}`}>
                    <i className="icon icon-arrow-circle-o-right" /> {paymentPlanInformation.nextDueDate} {formatCharge(paymentPlanInformation.nextDueAmount)}
                  </span> :
                  <span className="item" title={`Over Due: ${formatCharge(paymentPlanInformation.overDueAmount)}`}>
                    <i className="icon icon-hourglass-end" />{formatCharge(paymentPlanInformation.overDueAmount)}
                  </span>
                }
              </div>
            </div>
          </div>)
        }
      </div>
    );
  }

  showTotalBalanceDueDetail(isShow) {
    this.props.showTotalBalanceDueDetail(isShow);
  }
}

