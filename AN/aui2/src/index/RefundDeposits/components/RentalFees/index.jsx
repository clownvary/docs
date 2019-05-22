import { arrayOf, object, string, func } from 'prop-types';
import React from 'react';
import { fromJS } from 'immutable';
import UIComponent from 'shared/components/UIComponent';
import DataGrid from 'shared/components/DataGrid';
import { allColumns } from './columns';

export default class RentalFees extends UIComponent {
  static propTypes = {
    rentalFees: arrayOf(object).isRequired,
    labelTotalRentalFee: string.isRequired,
    onSelect: func.isRequired
  };

  render() {
    const {
      rentalFees,
      labelTotalRentalFee
    } = this.props;

    return (
      <div className="deposits-section panel">
        <h3 className="an-panel__header">Rental Fees</h3>
        {
          rentalFees.length === 0 ?
            <div>No fees to refund.</div> :
          [
            <div className="deposits-table">
              <DataGrid
                data={fromJS(rentalFees)}
                columns={allColumns}
                bodyStyle={{ maxHeight: undefined }}
                onSelect={this.onSelect}
              />
            </div>,
            <div className="deposits-total aaui-flexbox">
              <span className="deposits-total-label">RENTAL FEES TO REFUND</span> <span className="deposits-total-amount afx-xl-2-16">{labelTotalRentalFee}</span>
            </div>
          ]
        }
      </div>
    );
  }

  onSelect = (rentalFeeId, selected) => {
    this.props.onSelect(rentalFeeId, selected);
    this.props.updateFeeTaxAndDiscount();
  }
}
