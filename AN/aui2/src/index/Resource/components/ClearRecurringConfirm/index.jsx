import React from 'react';
import { connect } from 'react-redux';
import UIComponent from 'shared/components/UIComponent';
import Modal from 'shared/components/Alert';
import Radio from 'react-base-ui/lib/components/Radio';
import {
  setClearRecurringAction,
  deleteNormalBookingAction,
  deleteBaseAndRecurringBookingsAction,
  onlyDeleteBaseBookingAction
} from '../../actions/bookingPanelDelete';

import './index.less';

class ClearRecurringConfirm extends UIComponent {
  clearRecurring = ({ clearAll, resourceID, bookingID }) => {
    if (clearAll) {
      this.props.deleteBaseAndRecurringBookingsAction(resourceID, bookingID);
    } else {
      this.props.onlyDeleteBaseBookingAction(resourceID, bookingID);
    }
    this.props.setClearRecurringAction({ visible: false });
  }

  onCancel = () => {
    this.props.setClearRecurringAction({ visible: false });
    this.props.changeBodyScrollStyle(true);
  }

  onConfirm = () => {
    const state = this.props.recurringClear.toJS();

    this.clearRecurring(state);
    this.props.changeBodyScrollStyle(true);
  }

  render() {
    const state = this.props.recurringClear.toJS();

    if (state.visible) {
      this.props.changeBodyScrollStyle(false);
    }

    return (
      <Modal
        className="modal--delete-confirmation"
        title="Remove Bookings"
        type="confirm"
        shown={state.visible}
        onClose={this.onCancel}
        onCancel={this.onCancel}
        onConfirm={this.onConfirm}
      >
        <div className="clear-booking-confirm">
          <p>
            Do you want to remove all occurrences of the recurring series or just this one?
          </p>
          <div className="selection">
            <Radio
              checked={!state.clearAll}
              onClick={() => this.props.setClearRecurringAction({ clearAll: false })}
            >
              Delete this occurrence
            </Radio>
          </div>
          <div className="selection">
            <Radio
              checked={state.clearAll}
              onClick={() => this.props.setClearRecurringAction({ clearAll: true })}
            >
              Delete the series
            </Radio>
          </div>
        </div>
      </Modal>
    );
  }
}

export default connect(
  null,
  {
    setClearRecurringAction,
    deleteNormalBookingAction,
    deleteBaseAndRecurringBookingsAction,
    onlyDeleteBaseBookingAction
  },
  null,
  {
    withRef: true
  }
)(ClearRecurringConfirm);
