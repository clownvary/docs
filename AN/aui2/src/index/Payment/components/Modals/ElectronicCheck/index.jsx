import PropTypes from 'prop-types';
import React from 'react';
import { getPureNumber } from 'shared/utils/formatNumber';
import InputBankCard from 'react-base-ui/lib/components/InputBankCard';
import Modal from 'react-base-ui/lib/components/Modal';
import Checkbox from 'react-base-ui/lib/components/Checkbox';
import Button from 'react-base-ui/lib/components/Button';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import Alert from 'react-base-ui/lib/components/Alert';
import Popover from 'react-base-ui/lib/components/Popover';
import UIComponent from 'shared/components/UIComponent';
import AMIds from '../../../automationIds';

import './index.less';

const ACCOUNT_NUMBER = 'accountNumber';
const ROUTING_NUMBER = 'routingNumber';

const ACCOUNT_NUMBER_ERROR = 'Invalid Account Number';
const ROUTING_NUMBER_ERROR = 'Invalid Routing Number';
const defaultState = {
  [ACCOUNT_NUMBER]: '',
  [ROUTING_NUMBER]: ''
};

export default class ECheckModal extends UIComponent {

  static propTypes = {
    data: PropTypes.shape({
      showModel: PropTypes.bool.isRequired,
      accountTypeValue: PropTypes.string.isRequired,
      accountTypeList: PropTypes.shape({
        data: PropTypes.array.isRequired
      }).isRequired,
      saveInformation: PropTypes.bool.isRequired,
      newEcheckError: PropTypes.string.isRequired
    }).isRequired,

    title: PropTypes.string.isRequired,
    showPriorEcp: PropTypes.bool.isRequired,

    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    changeSaveAccountInformation: PropTypes.func.isRequired,
    changeAccountType: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      routingNumber: '',
      accountNumber: ''

    };
  }

  componentDidUpdate() {
    const { showModel } = this.props.data;

    if (!showModel) {
      this.clearError();
      this.resetData();
    }
  }

  submit = () => {
    const { accountNumber, routingNumber } = this.state;
    this.props.onSubmit(getPureNumber(accountNumber), getPureNumber(routingNumber));
  }

  changeEcheckAccountTypeHandler = (value) => {
    this.clearError();
    this.props.changeAccountType(value);
  }

  changeValue = (value, fieldName) => {
    const stateObject = {};
    const { newEcheckError } = this.props.data;
    stateObject[fieldName] = value;
    this.setState(stateObject);
    /* istanbul ignore if */
    if ((ROUTING_NUMBER === fieldName && newEcheckError === ROUTING_NUMBER_ERROR)
    || (ACCOUNT_NUMBER === fieldName && newEcheckError === ACCOUNT_NUMBER_ERROR)) {
      this.clearError();
    }
  }

  resetData = () => {
    this.setState({ ...defaultState });
  }

  closeNewECheck() {
    this.props.onCancel();
  }

  clearError = () => {
    if (this.props.data.newEcheckError) {
      this.props.onError('');
    }
  }

  render() {
    const {
      showModel,
      accountTypeValue,
      accountTypeList,
      saveInformation,
      newEcheckError
    } = this.props.data;
    const { accountNumber, routingNumber } = this.state;

    return (
      <div>
        <Modal
          title={this.props.title}
          shown={showModel}
          className="new-eCheck-modal"
          onClose={() => this.closeNewECheck()}
        >
          <div className="modal-body">
            {/* Error messages */}
            {
              /* eslint-disable react/jsx-boolean-value */
              newEcheckError ?
                <Alert type="danger" noClose>
                  <ul className="only-one-error">
                    <li>{newEcheckError}</li>
                  </ul>
                </Alert> : ''
              /* eslint-enable react/jsx-boolean-value */
            }
            <div className="form-group">

              {/* accountNumber row */}
              <div className={`form-row aaui-flexbox ${newEcheckError === ACCOUNT_NUMBER_ERROR ? 'form-error' : ''}`}>
                <label className="form-label-col" htmlFor={ACCOUNT_NUMBER}>
                  Account Number
                </label>
                <div className="form-entry-col">
                  {
                    showModel &&
                    <InputBankCard
                      id={ACCOUNT_NUMBER}
                      value={accountNumber}
                      maxLength={50}
                      data-qa-id={AMIds.modals.accountNumber}
                      onInput={(e, value) => { this.changeValue(value, ACCOUNT_NUMBER); }}
                    />
                  }
                </div>
                <div className="form-tooltip-col">
                  <span className="icon icon-info-circle popover-base" data-popover-trigger>
                    <Popover className="tooltip">
                      <div className="new_echeck_tip" />
                    </Popover>
                  </span>
                </div>
              </div>

              {/* routingNumber row */}
              <div className={`form-row  aaui-flexbox ${newEcheckError === ROUTING_NUMBER_ERROR ? 'form-error' : ''}`}>
                <label className="form-label-col" htmlFor={ROUTING_NUMBER}>
                  Routing Number
                </label>
                <div className="form-entry-col">
                  {showModel &&
                    <InputBankCard
                      id={ROUTING_NUMBER}
                      maxLength={10}
                      value={routingNumber}
                      data-qa-id={AMIds.modals.routingNumber}
                      onInput={(e, value) => { this.changeValue(value, ROUTING_NUMBER); }}
                    />
                  }
                </div>
                <div className="form-tooltip-col">
                  <span className="icon icon-info-circle popover-base" data-popover-trigger>
                    <Popover className="tooltip">
                      <div className="new_echeck_tip" />
                    </Popover>
                  </span>
                </div>
              </div>

              {/* echeck Type row */}
              {
                <div className="form-row aaui-flexbox">
                  <label className="form-label-col" htmlFor="accountType">
                    Account Type
                  </label>
                  <div className="form-entry-col">
                    <Dropdown
                      id="accountType"
                      value={accountTypeValue}
                      data-qa-id={AMIds.modals.accountType}
                      data={accountTypeList.data}
                      placeholder="Select Account type"
                      onChange={({ value }) => this.changeEcheckAccountTypeHandler(value)}
                      className="echeck-type-dropdown"
                    />
                  </div>
                </div>
              }

              {/* save echeck row */}
              <div className="form-row aaui-flexbox">
                <label className="form-label-col" htmlFor="newECheckCheckBox" />
                <div className="form-entry-col">
                  {
                    this.props.showPriorEcp ?
                      <Checkbox
                        id="newECheckCheckBox"
                        data-qa-id={AMIds.modals.saveInformation}
                        size="m"
                        checked={saveInformation}
                        onChange={e =>
                          this.props.changeSaveAccountInformation(e.target.checked)
                        }
                      >
                        Save account information
                    </Checkbox> : ''
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <Button onClick={() => this.closeNewECheck()}>Cancel</Button>
            <Button
              type="strong"
              onClick={this.submit}
              disabled={!accountNumber || !routingNumber || newEcheckError}
            >
              OK
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}
