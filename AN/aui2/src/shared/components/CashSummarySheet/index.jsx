import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fromJS, Map } from 'immutable';

import Input from 'react-base-ui/lib/components/Input';
import Modal from 'react-base-ui/lib/components/Modal';
import Button from 'react-base-ui/lib/components/Button';
import Radio from 'react-base-ui/lib/components/Radio';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import DateTimeFormat from 'shared/utils/DateTimeFormat';

import DataGrid from '../DataGrid';
import UIComponent from '../UIComponent';
import allColumns from './columns';

import {
  fetchCashSummarySheetAction,
  changeCashSummarySheetAction,
  addCashSummarySheetCallBackAction,
  showCashSummarySheetAction,
  hideCashSummarySheetAction,
  finishCashSummarySheetAction,
  switchCashSummarySheetModeAction,
  submitCashSummarySheetAction,
  inputCashSummarySheetFloatAmountAction
} from '../../actions/cashSummarySheet';

import './index.less';


export class CashSummarySheet extends UIComponent {
  static propTypes = {
    submitCashSummarySheetAction: PropTypes.func.isRequired,
    inputCashSummarySheetFloatAmountAction: PropTypes.func.isRequired,
    changeCashSummarySheetAction: PropTypes.func.isRequired,
    showCashSummarySheetAction: PropTypes.func.isRequired,
    hideCashSummarySheetAction: PropTypes.func.isRequired,
    finishCashSummarySheetAction: PropTypes.func.isRequired,
    switchCashSummarySheetModeAction: PropTypes.func.isRequired,
    data: PropTypes.instanceOf(Map),
    dateFormat: PropTypes.string,
    timeFormat: PropTypes.string
  };

  render() {
    const { title = 'Cash Summary Sheet Confirmation', data } = this.props;

    const {
      earliest_opened_date,
      enable_float_amount_confirmation: enableFloatAmountConfirmation,
      disabled_float_amount,
      site_name,
      workstation_name,
      css_list,
      display,
      selectedCSS,
      selectedMode,
      floatAmount,
      canSubmit
    } = data.toJS();

    return (
      <div className="cashsummarysheet">
        <Modal
          shown={display}
          title={title}
          onClose={() => this.props.hideCashSummarySheetAction()}
        >
          <div className="modal-body">
            {
              !enableFloatAmountConfirmation &&
              this.renderChoice(earliest_opened_date, selectedMode)
            }
            {
              selectedMode === 0 &&
              this.renderFloatAmount(floatAmount, disabled_float_amount)
            }
            {
              !enableFloatAmountConfirmation && selectedMode === 1 &&
              this.renderExistingCSSGrid(css_list, site_name, workstation_name, selectedCSS)
            }
          </div>
          <div className="modal-footer">
            <Button onClick={() => this.props.hideCashSummarySheetAction()}>Cancel</Button>
            <Button disabled={!canSubmit} type="strong" onClick={() => this.props.submitCashSummarySheetAction()}>Submit</Button>
          </div>
        </Modal>
      </div>
    );
  }

  renderChoice = (earliestOpenedDate, selectedMode) => {
    const date = DateTimeFormat.formatDate(earliestOpenedDate);
    return (
      <div className="cashsummarysheet-radio">
        <span>{`There is one or more cash summary sheet opened from ${date}.`}</span>
        <ul>
          <li>
            <Radio
              name="CashSummarySheetMode"
              checked={selectedMode === 0}
              onChange={() => this.props.switchCashSummarySheetModeAction(0)}
            >
              <span className="radio-checkbox-txt" title="Use new cash summary sheet">Use new cash summary sheet</span>
            </Radio>
          </li>
          <li>
            <Radio
              name="CashSummarySheetMode"
              checked={selectedMode === 1}
              onChange={() => this.props.switchCashSummarySheetModeAction(1)}
            >
              <span className="radio-checkbox-txt" title="Use existing cash summary sheet">Use existing cash summary sheet</span>
            </Radio>
          </li>
        </ul>
      </div>
    );
  };

  renderFloatAmount = (floatAmount, disabledFloatAmount) => (
    <div className="cashsummarysheet-new">
      <span>Please count the beginning balance in the drawer.</span>
      <div>
        <span><strong>Float Amount</strong></span>
        <Input
          className="floatamount"
          maxLength="10"
          placeholder=""
          value={floatAmount}
          disabled={disabledFloatAmount}
          onChange={(e) => {
            const value = e.target.value;
            if (/^(\d*(\.)?\d{0,2})$/.test(value)) {
              this.props.inputCashSummarySheetFloatAmountAction(value);
            }
          }}
          onKeyPress={(e) => {
            /* istanbul ignore next */
            const regex = new RegExp('[\\d\\.]');
            /* istanbul ignore next */
            if (!regex.test(e.key) && e.key !== 'Delete') {
              e.preventDefault();
            }
          }}
        />
      </div>
    </div>
  );

  renderExistingCSSGrid = (cssList, siteName, workstationName, selectedCSS) => (
    <div>
      <div className="cashsummarysheet-grid">
        <label htmlFor="eslint"><strong>Site</strong></label>
        <span>{decodeHtmlStr(siteName)}</span>
        <label htmlFor="eslint"><strong>WorkStation</strong></label>
        <span>{decodeHtmlStr(workstationName)}</span>
      </div>

      <div className="cashsummarysheet-list">
        <DataGrid
          data={fromJS(cssList)}
          selectedCSS={selectedCSS}
          columns={allColumns}
          bodyStyle={{ maxHeight: 'none' }}
          emptyDataMessage={''}
          dateFormat={this.props.dateFormat}
          timeFormat={this.props.timeFormat}
          onSelect={css => this.props.changeCashSummarySheetAction(css.id)}
        />
      </div>
    </div>
  );
}

export default connect(
  state => ({
    data: state.cashSummarySheet
  }),
  {
    fetchCashSummarySheetAction,
    changeCashSummarySheetAction,
    addCashSummarySheetCallBackAction,
    showCashSummarySheetAction,
    hideCashSummarySheetAction,
    finishCashSummarySheetAction,
    switchCashSummarySheetModeAction,
    submitCashSummarySheetAction,
    inputCashSummarySheetFloatAmountAction
  }
)(CashSummarySheet);
