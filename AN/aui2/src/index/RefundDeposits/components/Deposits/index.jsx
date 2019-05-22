import { arrayOf, object, string, func } from 'prop-types';
import React from 'react';
import { fromJS } from 'immutable';
import UIComponent from 'shared/components/UIComponent';
import DataGrid from 'shared/components/DataGrid';
import { allColumns } from './columns';
import './index.less';

export default class Deposits extends UIComponent {
  static propTypes = {
    deposits: arrayOf(object).isRequired,
    labelTotalDeposit: string.isRequired,
    onSelect: func.isRequired
  };

  render() {
    const {
      deposits,
      labelTotalDeposit
    } = this.props;

    return (
      <div className="deposits-section panel">
        <h3 className="an-panel__header">Deposits </h3>
        {
          deposits.length === 0 ?
            <div>No deposits to refund.</div> :
          [
            <div className="deposits-table">
              <DataGrid
                data={fromJS(deposits)}
                columns={allColumns}
                bodyStyle={{ maxHeight: undefined }}
                onSelect={this.onSelect}
              />
            </div>,
            <div className="deposits-total aaui-flexbox">
              <span className="deposits-total-label">DEPOSIT TO REFUND</span> <span className="deposits-total-amount afx-xl-2-16">{labelTotalDeposit}</span>
            </div>
          ]
        }
      </div>
    );
  }

  onSelect = (depositId, selected) => {
    this.props.onSelect(depositId, selected);
    this.props.updateFeeTaxAndDiscount();
  }
}
