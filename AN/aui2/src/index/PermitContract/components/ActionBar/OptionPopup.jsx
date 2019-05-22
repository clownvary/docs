import React from 'react';
import classNames from 'classnames';
import { isIE, isEdge } from 'react-base-ui/lib/utils/browser';
import UIComponent from 'shared/components/UIComponent';
import Alert from 'shared/components/Alert';
import Checkbox from 'react-base-ui/lib/components/Checkbox';
import Tabbable from 'react-base-ui/lib/services/wcag/Tabbable';

import { optionsEnum, optionLabelsEnum } from '../../consts/optionsEnum';

import './options.less';

export default class OptionPopup extends UIComponent {
  defaultOptionState = {
    option: optionsEnum.permit,
    containsRecurring: false,
    showBreakdownFee: false
  };

  constructor(props) {
    super(props);
    this.state = this.defaultOptionState;

    this.bind('handlePopupConfirm');
  }

  open = () => {
    this._refs.alert.open();
  }

  handleOptionSelect = (option) => {
    this.setState({ option });
  };

  handleRecurringOptionChange = () => {
    this.setState(prevState => ({ containsRecurring: !prevState.containsRecurring }));
  }

  handlePopupClose = () => {
    this.setState(this.defaultOptionState);
  };

  handlePopupConfirm() {
    this._refs.alert.onClose();
  }

  handleBreakdownFeeChange = () => {
    this.setState({ showBreakdownFee: !this.state.showBreakdownFee });
  }

  renderOption = (value, index) => {
    const { hasAmendment } = this.props;
    const current = this.state.option === value;
    const label = optionLabelsEnum[value];

    const isDisabled = !hasAmendment && optionsEnum.amendment === value;
    const cls = classNames('options-option', {
      'options-option-selected': current,
      'is-disabled': isDisabled
    });

    return (
      <Tabbable
        aria-label={`option${index} ${label} ${current ? 'checked' : 'unchecked'}`}
        onClick={() => { isDisabled || this.handleOptionSelect(value); }}
      >
        <div className={cls}>
          <div>{label}</div>
          <div>{current && <i className="icon icon-check-circle" />}</div>
        </div>
      </Tabbable>

    );
  };

  renderRecurringOption = () => (
    <div className="options-recurring">
      <Checkbox
        className="options-recurring-checkbox"
        checked={this.state.containsRecurring}
        onChange={this.handleRecurringOptionChange}
        title="heckbox Display"
        aria-label={`checkbox Display all bookings for recurring ${this.state.containsRecurring ? 'selected' : 'unselected'}`}
      >
      Display all bookings for recurring
      </Checkbox>
    </div>
  );

  renderBreakdownFee = () => (
    <div className="options-recurring">
      <Checkbox
        className="options-recurring-checkbox"
        checked={this.state.showBreakdownFee}
        onChange={this.handleBreakdownFeeChange}
        aria-label={`checkbox Show detailed breakdown of fees ${this.state.showBreakdownFee ? 'selected' : 'unselected'}`}
      >
      Show detailed breakdown of fees
      </Checkbox>
    </div>
  );

  renderOptions = () => {
    const { option } = this.state;
    const showRecurringOption = (option === optionsEnum.permit ||
                                 option === optionsEnum.schedule);

    const showBreakdownFeeOption = (option === optionsEnum.permit);

    return (
      <div className={classNames('options', { 'ms-tabbable': isIE() || isEdge() })}>
        {this.renderOption(optionsEnum.permit, 1)}
        {this.renderOption(optionsEnum.schedule, 2)}
        {this.renderOption(optionsEnum.amendment, 3)}
        {showRecurringOption && this.renderRecurringOption()}
        {showBreakdownFeeOption && this.renderBreakdownFee()}
      </div>
    );
  }

  render() {
    const { title, cancelText, confirmText } = this.props;
    return (
      <Alert
        ref={(alert) => { this._refs.alert = alert; }}
        title={title}
        cancelText={cancelText}
        confirmText={confirmText}
        onClose={this.handlePopupClose}
        onCancel={this.handlePopupClose}
        onConfirm={this.handlePopupConfirm}
      >
        {this.renderOptions()}
      </Alert>
    );
  }
}
