import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { confirm } from 'react-base-ui/lib/services/dialog';
import Button from 'react-base-ui/lib/components/Button';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import UIComponent from 'shared/components/UIComponent';
import { pages } from 'shared/consts';
import {
  getCancelPermitPermissionAsyncAction,
  gotoRefundDepositFeesPageAction,
  gotoReservationDetailPageAction
} from '../../actions/cancelPermit';

// ANE-76763
export class CancelPermit extends UIComponent {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.string,
    disabled: PropTypes.bool,
    permitWording: PropTypes.string.isRequired,
    permitID: PropTypes.string.isRequired,
    permitNumber: PropTypes.string,
    onCancelPermit: PropTypes.func.isRequired,
    onCancelPermitWithoutRefund: PropTypes.func.isRequired,
    onCancelPermitWithoutRefundPermission: PropTypes.func.isRequired
  }

  onCancelPermitEnabled = (hasPaiedAmount, hasRefundPermission) => {
    const { permitID, permitWording, permitNumber } = this.props;

    if (hasPaiedAmount) {
      if (hasRefundPermission) {
        return this.props.gotoRefundDepositFeesPageAction(
          permitID,
          {
            [pages.cancelPermit]: true
          }
        );
      }
      const lowCasePermit = permitWording.toLowerCase();
      return confirm(
        [
          <div>You don&apos;t have permission to refund {lowCasePermit}.</div>,
          <div>Are you sure you want to cancel this {lowCasePermit} without refund fees?</div>,
          <div className="action-message-warning">
            <span className="icon aaui-alert-warning-icon icon-exclamation" /> Cancelled reservation cannot be modified. Proceed?
          </div>
        ],
        {
          title: `Cancel ${permitWording}`,
          showCancel: true,
          cancelText: 'No',
          confirmText: 'Yes'
        }
      ).then(
        () => this.props.onCancelPermitWithoutRefundPermission(),
        error => Promise.reject(error)
      );
    }

    return this.props.onCancelPermitWithoutRefund(permitWording, permitNumber, permitID);
  }

  cancelPermit = () => {
    const {
      permitID,
      permitWording,
      permitNumber,
      onCancelPermit
    } = this.props;

    return onCancelPermit(permitID, permitWording, permitNumber)
      .then(
        (
          { hasPaiedAmount, hasRefundPermission }
        ) => this.onCancelPermitEnabled(hasPaiedAmount, hasRefundPermission),
        error => Promise.reject(error)
      );
  }

  render() {
    const { className, disabled, permitWording, ...rest } = this.props;
    return (
      <Button
        className={className}
        disabled={disabled}
        onClick={this.cancelPermit}
        {...rest}
      >
        Cancel {decodeHtmlStr(permitWording)}
      </Button>
    );
  }
}

export default connect(
  null,
  {
    getCancelPermitPermissionAsyncAction,
    gotoRefundDepositFeesPageAction,
    gotoReservationDetailPageAction
  }
)(CancelPermit);
