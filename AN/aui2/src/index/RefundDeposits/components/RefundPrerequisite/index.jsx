import { instanceOf, func, arrayOf } from 'prop-types';
import React from 'react';
import UIComponent from 'shared/components/UIComponent';
import Prerequisite from 'shared/components/Prerequisite';
import { getPrerequisiteInfo } from '../../actions/refundDeposits';
import { warningMsg } from '../../consts';
import './index.less';

export default class RefundPrerequisite extends UIComponent {
  static propTypes = {
    deposits: arrayOf(instanceOf(Object)).isRequired,
    rentalFees: arrayOf(instanceOf(Object)).isRequired,
    prerequisite: instanceOf(Object).isRequired,
    updateIsOverrideAction: func.isRequired,
    updateUserPasswordAction: func.isRequired,
    updateUserNameAction: func.isRequired,
    clearPrerequisiteErrsAction: func.isRequired
  };

  render() {
    const {
      prerequisite,
      updateIsOverrideAction,
      updateUserPasswordAction,
      updateUserNameAction,
      clearPrerequisiteErrsAction
    } = this.props;

    return (
      <Prerequisite
        className="refund-prerequisite"
        prerequisite={prerequisite}
        updateIsOverrideAction={updateIsOverrideAction}
        updateUserPasswordAction={updateUserPasswordAction}
        updateUserNameAction={updateUserNameAction}
        clearPrerequisiteErrsAction={clearPrerequisiteErrsAction}
      />
    );
  }

  componentDidMount() {
    const {
      initData: {
        override_info: overrideInfo
      },
      // ONLY if user click [Back] button in Payment Page and back to refundDeposit page,
      // then savedData will be filled with saved data.
      savedData: {
        user_name: userName,
        user_password: userPassword,
        override_checked: isOverride
      }
    } = this.props.initialData;
    const haveOverrideAuthority = (overrideInfo && overrideInfo.has_override_authority) || false;
    const { deposits, rentalFees } = this.props;
    const prerequisiteInfo = getPrerequisiteInfo(deposits, rentalFees);
    /* istanbul ignore else */
    if (!haveOverrideAuthority && userName) {
      this.props.updateUserNameAction(userName);
      this.props.updateUserPasswordAction(userPassword);
    }

    if (isOverride) {
      this.props.updateIsOverrideAction(true);
    }
    /* istanbul ignore else */
    if (haveOverrideAuthority) {
      this.props.updateOverrideAuthorityAction(true);
    }
    /* istanbul ignore else */
    if (prerequisiteInfo.needOverride) {
      this.props.updateNeedOverrideAction(true);
      this.props.updateOverrideMsgAction(`${warningMsg.PREREQUISITE_OVERRIDE_WARNING_MSG}${prerequisiteInfo.refundDate}`);
    }
  }
}
