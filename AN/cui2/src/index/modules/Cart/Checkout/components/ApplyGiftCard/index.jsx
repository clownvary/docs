import React from 'react';
import PropTypes from 'prop-types';
import size from 'lodash/size';
import Button from 'react-base-ui/lib/components/Button';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { injectIntl } from 'react-intl';
import ComboBox from 'react-base-ui/lib/components/ComboBox';
import { withResponsiveProvider } from 'react-base-ui/lib/services/responsive';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import { Icon } from 'react-base-ui/lib/components/SVG';
import { FormattedMessage, FormattedNumber, FormattedDyncMessage } from 'shared/translation/formatted';
import { formatI18n } from 'shared/translation/formatI18n';

import * as giftCardActions from '../../actions/applyGiftCard';
import selfMessages from './translations';

import './index.less';

/* eslint-disable max-len */
/* eslint-disable no-script-url */
export class ApplyGiftCard extends React.PureComponent {
  static contextTypes = {
    configurations: PropTypes.object,
    getWording: PropTypes.func
  }

  static propTypes = {
    expanded: PropTypes.bool,
    isMobileOrTablet: PropTypes.bool
  }

  static defaultProps = {
    expanded: true
  }

  componentDidMount() {
    this.props.fetchGiftCardAction();
  }

  componentWillUnmount() {
    this.props.resetGiftCardStateAction();
  }

  handleChange = (value) => {
    this.props.updateCardNumberAction(value);
  }

  handleApply = (cardNumber) => {
    this.props.applyGiftCardAction(cardNumber);
  }

  optionRenderHandle = selectedItem => (
    <ul className="custom-option-render">
      <li className="cus_title"><b><FormattedDyncMessage value={selectedItem.label} /></b></li>
      <li className="cus_text">#<FormattedDyncMessage value={selectedItem.value} /> </li>
      <li className="cus_text">
        <FormattedNumber numberStyle="currency" currency="USD" value={selectedItem.balance} />
      </li>
    </ul>
  );

  render() {
    const { expanded,
      isMobileOrTablet,
      applyGiftCardData,
      orderSummaryData,
      responsive,
      intl: { messages } } = this.props;
    const {
      applyBtnEnable,
      errorMessageShow,
      errorMessage,
      giftCardList,
      appledCardLlist,
      cardNumber
    } = applyGiftCardData.toJS();
    const { due_now: dueNow } = orderSummaryData.toJS();
    const giftCardEnable = this.context.configurations.get('pay_by_gift_certificate_online');
    const giftCardLabel = this.context.getWording('gift_certificate_label');
    const distPlaceHolder = formatI18n(
      selfMessages.giftCardInputPlaceHolder.defaultMessage,
      { giftCard_label: giftCardLabel });

    return (
      <div
        className={classNames('applygiftcard-wrapper', {
          'is-sm-and-md-mod': isMobileOrTablet
        })}
      >
        {
          expanded ?
            <div className="an-col-1-1">
              {
                giftCardEnable ?
                  <div className={classNames('applygiftcard-panel an-panel', { 'hide-panel': dueNow <= 0 && !(appledCardLlist && appledCardLlist.length) })}>
                    {
                      dueNow > 0 ?
                        <div className="applygiftcard-panel__form">
                          <div className="input-group">
                            <ComboBox
                              listConfig={{ showTips: false }}
                              listPopupOptions={{ showShadow: false }}
                              className="giftcard-combobox"
                              aria-label="select gift cards"
                              triggerIconHint="giftCards"
                              listClassName="giftcard-combobox__list"
                              placeHolder={distPlaceHolder}
                              items={giftCardList}
                              maxLength="50"
                              listMaxHeight="300px"
                              value={cardNumber}
                              listWidth={responsive.isLg ? '298px' : null}
                              onTextChange={e => this.handleChange(e.target.value)}
                              onListRender={({ item }) => this.optionRenderHandle(item)}
                              showTrigger={size(giftCardList) > 0}
                            />
                            <Button type="primary" size="sm" disabled={!applyBtnEnable} onClick={() => this.handleApply(cardNumber)}>
                              <FormattedMessage {...selfMessages.buttonAdd} />
                            </Button>
                          </div>
                        </div>
                      : null
                    }
                    <div className="applieditems-box">
                      {
                        errorMessageShow ?
                          <p className="error-message u-color-errortext">
                            <Icon
                              name="times-circle"
                              type="error"
                              aria-label="error icon"
                            />
                            <FormattedDyncMessage value={errorMessage} />
                          </p>
                        : null
                      }
                      {
                        appledCardLlist && appledCardLlist.length ?
                          <ul className="items-list">
                            {
                              appledCardLlist.map(
                                (item, index) =>
                                  (<div key={item.id} ><li className="u-color-secondarytext">
                                    <span className="item-list__title" title={decodeHtmlStr(`${item.cardType || ''}`)}>
                                      <FormattedDyncMessage value={item.cardType} />
                                    </span>
                                    <span className="item-list__amount">-<FormattedNumber numberStyle="currency" currency="USD" value={item.paymentAmount} /></span>
                                    <a
                                      href="javascript:void(0);"
                                      className="item-list__remove"
                                      aria-label={messages[selfMessages.deleteGiftCardAriaLabelText.id]}
                                      onClick={() => this.props.removeGiftCardAction(item.id)}
                                    >
                                      <Icon
                                        name="remove"
                                        aria-label="remove icon"
                                      />
                                    </a>
                                    <span className="item-list__number" title={decodeHtmlStr(`${item.cardNumber || ''}`)}>
                                      #<FormattedDyncMessage value={item.cardNumber} />
                                    </span>
                                  </li>
                                    {index !== appledCardLlist.length - 1 ? <div className="an-split-line" /> : null}
                                  </div>
                                  )
                              )
                            }
                          </ul>
                        : null
                      }
                    </div>
                  </div>
                : null
              }
            </div> : null
        }
      </div>
    );
  }
}
export default injectIntl(withResponsiveProvider(connect(
  null,
/* istanbul ignore next */
  dispatch => ({
    ...bindActionCreators(giftCardActions, dispatch)
  })
)(ApplyGiftCard)));
