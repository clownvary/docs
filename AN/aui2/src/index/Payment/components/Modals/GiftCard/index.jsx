import React from 'react';
import { connect } from 'react-redux';
import Input from 'react-base-ui/lib/components/Input';
import Modal from 'react-base-ui/lib/components/Modal';
import Checkbox from 'react-base-ui/lib/components/Checkbox';
import Button from 'react-base-ui/lib/components/Button';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import Alert from 'react-base-ui/lib/components/Alert';

import UIComponent from 'shared/components/UIComponent';

import {
  newGiftCardClose,
  newGiftCardIsOverrideMin,
  newGiftCardIsOverrideMax,
  changeGiftCardType,
  newGiftCardIsOverride,
  getNewGiftCardInfo,
  setNewGiftCardError
} from '../../../actions/paymentOptions/giftCard';

import './index.less';

export class GiftCard extends UIComponent {

  constructor(props) {
    super(props);
    this.state = {
      minNeedOverride: false,
      maxNeedOverride: false,
      giftCardNumber: '',
      giftCardErrorMsg: ''
    };
    this.refundBtnAble = true;
  }

  issueClick() {
    if (this.props.data.isNeedGiftCardNumber && !this.state.giftCardNumber) {
      this.validationNumber();
    } else {
      const {
        giftCardTypeListValue,
        isOverrideMinGiftCard,
        isOverrideMaxGiftCard } = this.props.data;
      const amount = +this.props.amount;
      const minGiftCardAmount = +this.getNewCardMaxMinAmount(false);
      const maxGiftCardAmount = +this.getNewCardMaxMinAmount();

      if (amount < minGiftCardAmount) {
        // istanbul ignore else
        if (!isOverrideMinGiftCard) {
          this.setState({ minNeedOverride: true });
          return false;
        }
      } else if (amount > maxGiftCardAmount) {
        // istanbul ignore else
        if (!isOverrideMaxGiftCard) {
          this.setState({ maxNeedOverride: true });
          return false;
        }
      }

      // istanbul ignore else
      if (this.refundBtnAble) {
        const params = {
          gc_number: this.state.giftCardNumber,
          gc_type_id: giftCardTypeListValue,
          gc_purchased_amount: this.props.amount
        };

        this.refundBtnAble = false;
        this.props.getNewGiftCardInfo({ params, amount: this.props.amount, key: this.props.index });
      }
    }

    return false;
  }

  validationNumber() {
    const errorMsg = this.state.giftCardNumber.length ? '' : 'Required';

    if (errorMsg) {
      this.setState({ giftCardErrorMsg: errorMsg });
    } else {
      this.setState({ giftCardErrorMsg: '' });
    }
  }

  changeGiftCardNumber(e, maxLength, isOnBlur = false) {
    const node = e.target;
    const oldLength = node.value.length;
    const oldIdx = node.selectionStart;
    let giftCardNumber = node.value;

    this.clearMaxMinError();

    if (isOnBlur) {
      this.validationNumber();
    }

    if (giftCardNumber.length > maxLength) {
      giftCardNumber = giftCardNumber.substr(0, maxLength);
    }

    this.setState({ giftCardNumber }, () => {
      if (e.type && e.type.toLowerCase() !== 'blur') {
        const newIdx = Math.max(0, (node.value.length - oldLength) + oldIdx);
        node.selectionStart = node.selectionEnd = newIdx;
      }
    });
    this.clearMaxMinError();
  }

  clearMaxMinError() {
    const {
      isOverrideMinGiftCard,
      isOverrideMaxGiftCard,
      newGiftCardError
    } = this.props.data;

    this.setState({
      minNeedOverride: false,
      maxNeedOverride: false
    });
    this.refundBtnAble = true;

    // istanbul ignore else
    if (isOverrideMinGiftCard) {
      this.props.newGiftCardIsOverrideMin(false);
    }

    // istanbul ignore else
    if (isOverrideMaxGiftCard) {
      this.props.newGiftCardIsOverrideMax(false);
    }
    if (newGiftCardError) {
      this.props.setNewGiftCardError('');
    }
  }

  closeNewGiftCard() {
    this.props.onCancelIssueCard();
    this.props.newGiftCardClose();
    this.clearMaxMinError();
  }

  changeTypeOption(value) {
    this.setState({
      giftCardNumber: ''
    });
    this.clearMaxMinError();
    this.props.changeGiftCardType(value);
  }

  getNewCardMaxMinAmount(isMax = true) {
    const { giftCardTypeList, giftCardTypeListValue } = this.props.data;
    let giftCardAmount = 0;

    giftCardTypeList.data.forEach((giftCard) => {
      if (giftCard.value === giftCardTypeListValue) {
        if (isMax) {
          giftCardAmount = giftCard.max_card_balance;
        } else {
          giftCardAmount = giftCard.min_sale_amount;
        }
      }
    });
    return giftCardAmount > 0 ? giftCardAmount : 0;
  }

  render() {
    const { giftCardLabel,
      giftCardTypeList,
      giftCardTypeListValue,
      isUseNewGiftCard,
      newGiftCardError,
      isNeedGiftCardNumber,
      isOverrideMinGiftCard,
      isOverrideMaxGiftCard,
      minOverrideHasAccess,
      minOverrideExplanation,
      maxOverrideHasAccess,
      maxOverrideExplanation } = this.props.data;

    const newGiftCardMin = `$${this.getNewCardMaxMinAmount(false).toFixed(2)}`;
    const newGiftCardMax = `$${this.getNewCardMaxMinAmount(true).toFixed(2)}`;

    return (
      <Modal
        title={`Issue New ${giftCardLabel}`}
        shown={isUseNewGiftCard}
        className="new-giftCard-modal"
        onClose={() => this.closeNewGiftCard()}
      >
        <div className="modal-body">
          {
            !newGiftCardError && this.state.minNeedOverride ?
              <Alert type="error" noClose>
                <ul className="only-one-error">
                  <li>{minOverrideExplanation} {newGiftCardMin}</li>

                  {
                    minOverrideHasAccess ?
                      <li>
                        <Checkbox
                          className="new-override"
                          checked={isOverrideMinGiftCard}
                          onChange={
                            () => this.props.newGiftCardIsOverrideMin(!isOverrideMinGiftCard)
                          }
                        >Override</Checkbox></li> : ''
                  }

                </ul>
              </Alert> : ''
          }

          {
            !newGiftCardError && this.state.maxNeedOverride ?
              <Alert type="error" noClose>
                <ul className="only-one-error">
                  <li>{maxOverrideExplanation} {newGiftCardMax}</li>

                  {
                    maxOverrideHasAccess ?
                      <li>
                        <Checkbox
                          className="new-override"
                          checked={isOverrideMaxGiftCard}
                          onChange={
                            () => this.props.newGiftCardIsOverrideMax(!isOverrideMaxGiftCard)
                          }
                        >Override</Checkbox></li> : ''
                  }

                </ul>
              </Alert> : ''
          }

          {
            newGiftCardError ?
              <Alert type="error" noClose>
                <ul className="only-one-error">
                  <li>{newGiftCardError}</li>
                </ul>
              </Alert> : ''
          }

          <div className="form-group">

            {/* giftCard Type row */}
            {
              <div className="form-row aaui-flexbox">
                <label className="form-label-col" htmlFor="giftCardType">
                  Card Type
                </label>
                <div className="form-entry-col">
                  <Dropdown
                    id="giftCardType"
                    value={giftCardTypeListValue}
                    data={giftCardTypeList.data}
                    placeholder="Select Account type"
                    onChange={({ value }) => this.changeTypeOption(value)}
                  />
                </div>
              </div>
            }

            {/* Number row */}
            {
              isNeedGiftCardNumber ?
                <div className={`form-row aaui-flexbox ${this.state.giftCardErrorMsg ? 'form-error' : ''}`}>
                  <label className="form-label-col" htmlFor="giftCardNumber">
                    Number
                </label>

                  <div className="form-entry-col">
                    <Input
                      id="giftCardNumber"
                      type="text"
                      maxLength={48}
                      value={this.state.giftCardNumber}
                      onBlur={e => this.changeGiftCardNumber(e, 48, true)}
                      onChange={e => this.changeGiftCardNumber(e, 48)}
                    />

                    {
                      this.state.giftCardErrorMsg ?
                        <p>{this.state.giftCardErrorMsg}</p> : ''
                    }

                  </div>
                </div>
                : ''
            }
          </div>
        </div>
        <div className="modal-footer">
          <Button onClick={() => this.closeNewGiftCard()}>Cancel</Button>
          <Button type="strong" onClick={() => this.issueClick()}>Issue</Button>
          {
            /*
            <Button type="strong" onClick={this.issueClick} disabled={this.state.refundBtnDisable}
            >Issue</Button>
            */
          }
        </div>
      </Modal>
    );
  }
}

export default connect(
  null,
  {
    newGiftCardClose,
    newGiftCardIsOverrideMin,
    newGiftCardIsOverrideMax,
    changeGiftCardType,
    newGiftCardIsOverride,
    getNewGiftCardInfo,
    setNewGiftCardError
  }
)(GiftCard);
