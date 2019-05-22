import React from 'react';
import { confirm } from 'react-base-ui/lib/services/dialog';
import UIComponent from 'shared/components/UIComponent';

export default class BasePayer extends UIComponent {
  render() {
    return (<span>BasePayer</span>);
  }

  onPayerChange(skipAlert = false) {
    const { showChangeAlert = false } = this.props;

    if (showChangeAlert && !skipAlert) {
      const defaultOptions = {
        title: 'Reset Payment Method',
        showCancel: true,
        cancelText: 'No',
        confirmText: 'Yes'
      };

      return confirm(
        (<div>
          <p> Payment method will be reset, are you sure you want to continue? </p>
        </div>
        ),
        { ...defaultOptions }
      );
    }

    return Promise.resolve();
  }
}

