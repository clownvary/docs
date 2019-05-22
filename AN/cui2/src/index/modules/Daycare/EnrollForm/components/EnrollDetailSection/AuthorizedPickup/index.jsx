import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { injectIntl } from 'react-intl';
import isObject from 'lodash/isObject';
import Select from 'react-base-ui/lib/components/Select';
import { formatI18n } from 'shared/translation/formatI18n';
import { FormattedMessage } from 'shared/translation/formatted';
import openTheExistingPage from 'shared/utils/openTheExistingPage';

import { PICKUP } from '../../../consts/sectionName';
import selfMessages from '../translations';
import getAddFamilyMemberUrl from '../../../util/getAddFamilyMemberUrl';
import domainHelp from '../../../util/domainHelp';
import './index.less';

export class AuthorizedPickup extends PureComponent {
  static contextTypes = {
    configurations: React.PropTypes.object,
    systemSettings: React.PropTypes.object
  }

  componentDidMount() {
    window.addEventListener('unload', this.closeNewFamilyMemberWindow);
  }

  componentWillUnmount() {
    this.closeNewFamilyMemberWindow();
    window.removeEventListener('unload', this.closeNewFamilyMemberWindow);
  }

  onSelectRef = (node) => {
    this.selectNode = node;
  }

  getMenuContainer = () => ReactDOM.findDOMNode(this.selectNode)// eslint-disable-line

  closeNewFamilyMemberWindow = () => {
    this.newFamilyMemberWindow && this.newFamilyMemberWindow.close();
  }

  buildPickupOptionData = () => this.props.pickupList.map(item => ({
    text: item.name,
    value: item.customer_id,
    secondaryText: item.phone,
    tertiaryText: item.email
  }));

  showNewFamilyMemberPage = () => {
    const { loginedCustomerId } = this.props;
    const { systemSettings } = this.context;
    const originalBaseUrl = systemSettings.get('original_base_url');
    domainHelp.setDomainToSecondLevel();

    const url = getAddFamilyMemberUrl({
      originalBaseUrl,
      loginedCustomerId,
      type: PICKUP,
      callback: '__newFamilyMember'
    });

    window.__newFamilyMember = (data) => {
      const { selectedPickupIds, onPickupSelect, fetchPickups } = this.props;
      if (isObject(data) && data.type === PICKUP) {
        const customerId = parseInt(data.customer_id, 10);
        if (customerId) {
          fetchPickups().then(() => {
            onPickupSelect([...selectedPickupIds, customerId]);
          });
          this.closeNewFamilyMemberWindow();
        }
      }
    };

    this.newFamilyMemberWindow = openTheExistingPage(url, 'New family member', '1000', '800', 'yes');
  }

  optionItemRenderer = (itemProps) => {
    const { optionItemPrefixCls, className, selected, option, active, mouseEvents } = itemProps;
    const itemCustomizeCls = 'enroll-pickup-option-item';
    const itemClassName = classNames(optionItemPrefixCls, className, itemCustomizeCls, {
      [`${optionItemPrefixCls}__active`]: active,
      [`${itemCustomizeCls}__active`]: active,
      [`${optionItemPrefixCls}__selected`]: selected,
      [`${itemCustomizeCls}__selected`]: selected
    });
    return (
      <div
        className={itemClassName}
        {...mouseEvents}
      >
        <div className={`${itemCustomizeCls}__text`}>{option.text}</div>
        <div className={`${itemCustomizeCls}__extra`}>
          {
            option.secondaryText ? (
              <span className={`${itemCustomizeCls}__secondary`}>
                {option.secondaryText}
              </span>
            ) : null
          }
          {
            option.tertiaryText ? (
              <span className={`${itemCustomizeCls}__tertiary`}>
                {option.tertiaryText}
              </span>
            ) : null
          }
        </div>
      </div>
    );
  };

  render() {
    const {
      intl: { messages }, participantName, requiredPreMark, requiredPostMark,
      selectedPickupIds, error, onPickupSelect
    } = this.props;
    const pickupTitle = formatI18n(messages[selfMessages.pickup.id], { participantName });
    const pickupPlaceholder = formatI18n(messages[selfMessages.pickupPlaceholder.id]);
    const pickupOptionData = this.buildPickupOptionData();
    const requiredError = error.get('required');
    return (
      <div className="enroll-pickup">
        <div className="enroll-pickup-title" id="enroll-pickup-title">
          {requiredPreMark} {pickupTitle} {requiredPostMark}
        </div>
        <div className="enroll-pickup-select">
          <Select
            ref={this.onSelectRef}
            className={classNames({
              'enroll-pickup-select__error': requiredError
            })}
            aria-labelledby={'enroll-pickup-title'}
            choiceValues={selectedPickupIds}
            optionData={pickupOptionData}
            placeholder={pickupPlaceholder}
            optionItemRenderer={this.optionItemRenderer}
            onChange={onPickupSelect}
            getMenuContainer={this.getMenuContainer}
          />
          {
            requiredError ? (
              <div className="enroll-pickup__error">
                <i className="icon icon-times-circle" />
                <FormattedMessage {...selfMessages.pickupRequiredErrorMessage} />
              </div>
            ) : null
          }
        </div>
      </div>
    );
  }
}

export default injectIntl(AuthorizedPickup);
