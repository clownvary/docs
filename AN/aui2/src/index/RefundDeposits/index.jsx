import React from 'react';
import { connect } from 'react-redux';
import UIComponent from 'shared/components/UIComponent';
import Error from 'shared/components/Error';
import BreadCrumb from 'shared/components/BreadCrumb';
import {
  updateIsOverrideAction,
  updateUserNameAction,
  updateUserPasswordAction,
  clearPrerequisiteErrsAction,
  updateOverrideAuthorityAction,
  updateNeedOverrideAction,
  updateOverrideMsgAction
} from 'shared/actions/prerequisite';
import HelpLink from 'shared/components/HelpLink';
import 'shared/components/CancelPermit/index.less';
import Deposits from './components/Deposits';
import RentalFees from './components/RentalFees';
import ExtraFees from './components/ExtraFees';
import Notes from './components/Notes';
import Footer from './components/Footer';
import RefundPrerequisite from './components/RefundPrerequisite';

import {
  selectDepositAction,
  selectRentalFeeAction,
  createExtraFeeAction,
  updateExtraFeeClaimChargeAction,
  updateExtraFeeAmountAction,
  deleteExtraFeeAction,
  showNotesAction,
  hideNotesAction,
  changeStaffNotesAction,
  changeCustomerNotesAction,
  getFeeTaxAndDiscountAction
} from './actions/refundDeposits';

import './index.less';

export class RefundDeposits extends UIComponent {

  render() {
    const { data, error, breadCrumb, prerequisite, initialData } = this.props;
    const {
      deposits,
      rentalFees,
      claimCharges,
      extraFees,
      displayNotes,
      customerNotes,
      staffNotes,
      totalDeposit,
      labelTotalDeposit,
      labelTotalCharge,
      totalRefund,
      labelSubTotalRefund,
      labelTotalRefund,
      canAddFee,
      refundChargeAmount,
      refundChargeDesc,
      labelTotalRentalFee,
      cancelPermit,
      fromCancelPermit,
      subTotalRefund,
      defaultRefundChargeAmount
    } = data.toJS();
    const prerequisiteErrs = prerequisite.get('errors').toJS();
    const businessErrs = error.get('businessErrors').toJS();
    const pageErrs = businessErrs.concat(prerequisiteErrs).map(err => err.message);

    return (
      <section className="an-page refundDeposits" style={{ height: window.forcedSetIFrameHeight }}>
        {__STATIC__ ?
          undefined :
          <BreadCrumb
            isPromptUser
            breadCrumb={breadCrumb}
          />
        }
        <div>
          <div className="page-title aaui-flexbox">
            <h1>Deposits and Fees</h1>
            <HelpLink pageName="RefundDeposits.jsp" />
          </div>
          {
            pageErrs && pageErrs.length > 0 ?
              <div className="alert-error aaui-flexbox">
                <span className="content">
                  <i className="icon icon-times-circle" />
                  {pageErrs.join('<br />')}
                </span>
              </div>
              : null
          }
          <RefundPrerequisite
            deposits={deposits}
            rentalFees={rentalFees}
            initialData={initialData}
            prerequisite={prerequisite}
            updateIsOverrideAction={this.props.updateIsOverrideAction}
            updateUserNameAction={this.props.updateUserNameAction}
            updateUserPasswordAction={this.props.updateUserPasswordAction}
            updateOverrideAuthorityAction={this.props.updateOverrideAuthorityAction}
            clearPrerequisiteErrsAction={this.props.clearPrerequisiteErrsAction}
            updateNeedOverrideAction={this.props.updateNeedOverrideAction}
            updateOverrideMsgAction={this.props.updateOverrideMsgAction}
          />

          <Deposits
            deposits={deposits}
            labelTotalDeposit={labelTotalDeposit}
            onSelect={this.props.selectDepositAction}
            updateFeeTaxAndDiscount={this.updateFeeTaxAndDiscount}
          />

          <ExtraFees
            claimCharges={claimCharges}
            deposits={deposits}
            totalDeposit={totalDeposit}
            extraFees={extraFees}
            labelTotalCharge={labelTotalCharge}
            canAddFee={canAddFee}
            onCreate={this.props.createExtraFeeAction}
            onUpdateClaimCharge={this.props.updateExtraFeeClaimChargeAction}
            onUpdateAmount={this.props.updateExtraFeeAmountAction}
            onDelete={this.props.deleteExtraFeeAction}
            updateFeeTaxAndDiscount={this.updateFeeTaxAndDiscount}
          />

          <RentalFees
            rentalFees={rentalFees}
            labelTotalRentalFee={labelTotalRentalFee}
            onSelect={this.props.selectRentalFeeAction}
            updateFeeTaxAndDiscount={this.updateFeeTaxAndDiscount}
          />

          <Notes
            displayNotes={displayNotes}
            customerNotes={customerNotes}
            staffNotes={staffNotes}
            onUpdateCustomerNotes={this.props.changeCustomerNotesAction}
            onUpdateStaffNotes={this.props.changeStaffNotesAction}
            onShow={this.props.showNotesAction}
            onHide={this.props.hideNotesAction}
          />

          <Footer
            totalRefund={totalRefund}
            labelTotalRefund={labelTotalRefund}
            deposits={deposits}
            rentalFees={rentalFees}
            defaultRefundChargeAmount={defaultRefundChargeAmount}
            refundChargeAmount={refundChargeAmount}
            refundChargeDesc={refundChargeDesc}
            subTotalRefund={subTotalRefund}
            labelSubTotalRefund={labelSubTotalRefund}
            cancelPermit={cancelPermit}
            fromCancelPermit={fromCancelPermit}
            updateFeeTaxAndDiscount={this.updateFeeTaxAndDiscount}
            permitWording={initialData.permitWording}
            permitCanBeCancelled={initialData.permitCanBeCancelled}
          />

          <Error error={{ list: error.get('systemErrors') }} />
        </div>
      </section>
    );
  }

  updateFeeTaxAndDiscount = (feeInfo) => {
    const extraFeeId = (feeInfo && feeInfo.extraFeeId) || -1;
    return this.props.getFeeTaxAndDiscountAction({
      extraFeeId
    });
  }
}

export default connect(
  state => ({
    data: state.refundDeposits,
    error: state.error,
    breadCrumb: state.breadCrumb,
    prerequisite: state.prerequisite,
    initialData: state.initialData
  }),
  {
    createExtraFeeAction,
    updateExtraFeeClaimChargeAction,
    updateExtraFeeAmountAction,
    deleteExtraFeeAction,
    showNotesAction,
    hideNotesAction,
    changeStaffNotesAction,
    changeCustomerNotesAction,
    selectDepositAction,
    selectRentalFeeAction,
    updateIsOverrideAction,
    updateUserNameAction,
    updateUserPasswordAction,
    clearPrerequisiteErrsAction,
    updateOverrideAuthorityAction,
    updateNeedOverrideAction,
    updateOverrideMsgAction,
    getFeeTaxAndDiscountAction
  }
)(RefundDeposits);
