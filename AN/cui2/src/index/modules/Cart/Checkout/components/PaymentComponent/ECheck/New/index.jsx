import React from 'react';
import classNames from 'classnames';
import Checkbox from 'react-base-ui/lib/components/Checkbox';
import Button from 'react-base-ui/lib/components/Button';
import Input from 'react-base-ui/lib/components/Input';
import { AAUIDropdown } from 'react-base-ui/lib/components/Dropdown';
import Popover from 'react-base-ui/lib/components/Popover';
import { Icon } from 'react-base-ui/lib/components/SVG';
import upperFirst from 'lodash/upperFirst';
import lowerFirst from 'lodash/lowerFirst';

import { withResponsiveProvider, responsivePropTypes } from 'react-base-ui/lib/services/responsive';

import 'shared/assets/images/img-us-check.png';
import 'shared/assets/images/img-ca-check.png';

import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { FormattedMessage } from 'shared/translation/formatted';
import buttonMessages from 'shared/translation/messages/button';
import validationMessages from 'shared/translation/messages/validation';
import selfMessages from '../translations';

import { AccountTypes, FormFields } from '../../consts/eCheck';
import { filterNonDigit } from '../../utils/filterNonDigit';
import { scrollByModule } from '../../utils/operateDom';

import './index.less';

const getSecurityGuaranteeContent = checkLabel => (
  <div className="security-guarantee-content">
    <FormattedMessage
      {...selfMessages.formGuaranteeText} values={{
        checkLabel,
        activeCompanyName: (
          <span>
            <a target="activenetwork" href="http://www.activenetwork.com/">
              <FormattedMessage {...selfMessages.activeCompanyName} />
            </a>
            <Icon
              name="ex-link-m"
              aria-label="open new page icon"
            />
          </span>
        ),
        activePaymentGuidelines: (
          <span>
            <a target="pcicomplianceguide" href="http://www.pcicomplianceguide.org/">
              <FormattedMessage {...selfMessages.activePaymentGuidelines} />
            </a>
            <Icon
              name="ex-link-m"
              aria-label="open new page icon"
            />
          </span>
        )
      }}
    />
  </div>
);

const initialState = {
  errors: {
    [FormFields.ECP_ACCOUNT_TYPE]: null,
    [FormFields.ECP_ACCOUNT_NUMBER]: null,
    [FormFields.ECP_ROUTING_NUMBER]: null
  },
  apiErrors: {},
  showForm: false,
  showGuarantee: false,
  [FormFields.ECP_ACCOUNT_TYPE]: '',
  [FormFields.ECP_ACCOUNT_NUMBER]: '',
  [FormFields.ECP_ROUTING_NUMBER]: '',
  ecpSavedForFurtureUse: false,
  hasSubmitForm: false
};

/* eslint-disable no-script-url */
export class AddNewECheck extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      toJS: PropTypes.func
    }).isRequired,
    intl: PropTypes.shape({
      messages: PropTypes.shape({}).isRequired
    }).isRequired,
    typeName: PropTypes.string.isRequired,
    onPayItemAdded: PropTypes.func.isRequired,
    responsive: responsivePropTypes
  }

  static contextTypes = {
    getWording: PropTypes.func,
    configurations: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  componentWillMount() {
    this.setState(this.getSpecificState());
  }

  componentWillReceiveProps() {
    this.setState(this.getSpecificState());
  }

  componentDidUpdate() {
    const { hasSubmitForm } = this.state;

    const errorList = this.getErrors();
    const { hasAccountTypeError, hasAccountNumberError, hasRoutingNumberError } = errorList;


    const hasError = hasAccountTypeError || hasAccountNumberError || hasRoutingNumberError;

    if (hasSubmitForm && hasError) {
      const errorElements = this.eckeckForm.getElementsByClassName('input--error');
      const firstErrorElement = errorElements[0];
      firstErrorElement && firstErrorElement.getElementsByClassName('input__field')[0].focus();
    }
  }

  onAccountTypeChange(value) {
    this.resetApiErrors();
    this.setState({ ecpAccountType: value, hasSubmitForm: false },
        () => this.validate([FormFields.ECP_ACCOUNT_TYPE]));
  }

  onAccountNumberChange(e) {
    this.resetApiErrors();
    filterNonDigit(e);
    const value = e.target.value;
    this.setState({ ecpAccountNumber: value });
  }

  onAccountNumberBlur(e) {
    const value = e.target.value;
    this.setState({ ecpAccountNumber: value, hasSubmitForm: false },
        () => this.validate([FormFields.ECP_ACCOUNT_NUMBER]));
  }

  onRoutingNumberChange(e) {
    this.resetApiErrors();
    filterNonDigit(e);
    const value = e.target.value;
    this.setState({ ecpRoutingNumber: value });
  }

  onRoutingNumberBlur(e) {
    const value = e.target.value;
    this.setState({ ecpRoutingNumber: value, hasSubmitForm: false },
        () => this.validate([FormFields.ECP_ROUTING_NUMBER]));
  }

  onCheckSaveFutureUse(e) {
    this.resetApiErrors();
    this.setState({ ecpSavedForFurtureUse: e.target.checked });
  }

  getFieldAriaDescribedBy(hasError, fieldName) {
    const { name } = this.props;
    return hasError ? { 'aria-describedby': `${name}-${fieldName}_error` } : {};
  }

  getErrors() {
    const { errors, apiErrors } = this.state;

    const {
      ERROR_ECP_INVALID_ACCOUNT_TYPE,
      ERROR_AMS_INVALID_ACC_NUM,
      ERROR_AMS_INVALID_ACC_NUM_CODE,
      ERROR_AMS_INVALID_ROUTING
    } = apiErrors;

    const hasAccountTypeError = (errors && errors.ecpAccountType) ||
                                      ERROR_ECP_INVALID_ACCOUNT_TYPE;
    const hasAccountNumberError = (errors && errors.ecpAccountNumber) ||
                                      ERROR_AMS_INVALID_ACC_NUM ||
                                      ERROR_AMS_INVALID_ACC_NUM_CODE;
    const hasRoutingNumberError = (errors && errors.ecpRoutingNumber) ||
                                      ERROR_AMS_INVALID_ROUTING;

    return { hasAccountTypeError, hasAccountNumberError, hasRoutingNumberError };
  }

  getSpecificState() {
    const {
      disableGuarantee,
      disableSaveForFurture
    } = this.props.data.toJS();

    const specificState = {};

    if (disableGuarantee) {
      specificState.showGuarantee = false;
    }

    if (disableSaveForFurture) {
      specificState.ecpSavedForFurtureUse = false;
    }

    return specificState;
  }

  getAccountTypeList() {
    const { intl: { messages } } = this.props;
    return [
      {
        value: AccountTypes.CHECKING,
        text: messages[selfMessages.checking.id]
      },
      {
        value: AccountTypes.SAVINGS,
        text: messages[selfMessages.savings.id]
      }
    ];
  }

  resetApiErrors() {
    this.setState({
      apiErrors: {}
    });
  }

  validate(fields, callBack) {
    const { intl: { messages } } = this.props;
    const requiredMsg = messages[validationMessages.required.id];
    let errors = this.state.errors;
    fields.forEach((field) => {
      const fieldValue = this.state[field];
      errors = { ...errors, [field]: !fieldValue ? requiredMsg : null };
    });
    this.setState({
      errors
    }, () => callBack && callBack());
  }

  submitForm() {
    this.validate([
      FormFields.ECP_ACCOUNT_TYPE,
      FormFields.ECP_ACCOUNT_NUMBER,
      FormFields.ECP_ROUTING_NUMBER
    ], () => {
      const { errors } = this.state;
      if (
        !errors[FormFields.ECP_ACCOUNT_TYPE] &&
        !errors[FormFields.ECP_ACCOUNT_NUMBER] &&
        !errors[FormFields.ECP_ROUTING_NUMBER]) {
        const { typeName, onPayItemAdded } = this.props;
        onPayItemAdded(typeName, {
          ...this.state
        }).then(({ errors: _errors }) => {
          if (_errors) {
            this.setState({
              apiErrors: { ...this.state.apiErrors, ..._errors },
              hasSubmitForm: true
            });
          } else {
            const specificState = this.getSpecificState();
            this.setState({
              ...initialState, ...specificState
            });
            scrollByModule(this.props.name);
          }
        });
      } else {
        this.setState({ hasSubmitForm: true });
      }
    });
  }
  popover = direction => (
    <button
      className="fake-question-circle icon-with-popover"
      aria-label="what is account number and routing number icon"
      data-popover-trigger
    >
      <Icon
        name="question-circle"
        type="link"
      />
      <Popover className="popover system-font-family" direction={direction} style={{ zIndex: 1 }}>
        <div className="an-grid an-col-mg-10">
          <div className="an-col an-col-1-2 an-sm-col-1-1">
            <img alt="United States check" src={`${window.__akamaiUrl}/images/img-us-check.png`} />
          </div>
          <div className="an-col an-col-1-2 an-sm-col-1-1">
            <img alt="Canada check" src={`${window.__akamaiUrl}/images/img-ca-check.png`} />
          </div>
        </div>
      </Popover>
    </button>
);

  render() {
    const checkLabel = this.context.getWording('check_label');
    const showPriorEcp = this.context.configurations.get('show_prior_ecp');

    const {
      data, intl: { messages }, responsive, name
    } = this.props;

    const {
      errors, apiErrors, showForm, showGuarantee, ecpSavedForFurtureUse,
      ecpAccountType, ecpAccountNumber, ecpRoutingNumber
    } = this.state;

    const {
      ERROR_ECP_INVALID_ACCOUNT_TYPE,
      ERROR_AMS_INVALID_ACC_NUM,
      ERROR_AMS_INVALID_ACC_NUM_CODE,
      ERROR_AMS_INVALID_ROUTING
    } = apiErrors;

    const errorList = this.getErrors();
    const { hasAccountTypeError, hasAccountNumberError, hasRoutingNumberError } = errorList;


    const showPopover = direction => (!data.get('disableTips') ? this.popover(direction) : null);

    return (
      <div className="card-form ecp-form" ref={(el) => { this.eckeckForm = el; }}>
        {
          data.get('list').size > 0 ?
            <div className="collapseTrigger ecp-form-trigger">
              <a
                href="javascript:void(0);"
                onClick={() => this.setState({ showForm: !showForm })}
              >
                <FormattedMessage
                  {...selfMessages.useNewEcpText} values={{ checkLabel: lowerFirst(checkLabel) }}
                />
                <Icon
                  name={`chevron-${showForm ? 'up' : 'down'}`}
                  type="link"
                  aria-label={`chevron ${showForm ? 'up icon' : 'down icon'}`}
                />
              </a>
            </div> : null
        }
        {
          data.get('list').size === 0 || showForm ? <div className="form--horizontal">

            {/* Account Type row */}
            <div className={classNames('form__wraper form__group', { 'form__group--error': hasAccountTypeError })}>
              <div className="layout-width-limited">
                <div className="an-grid an-col-mg-10">
                  <label className="form__label form__label--require an-col an-col-6-20 an-sm-col-1-1" htmlFor="fieldAccountType">
                    <FormattedMessage {...selfMessages.formLabelAccountType} />
                  </label>
                  <div className="form__control an-col an-col-14-20 an-sm-col-1-1">
                    <div className="wraper-card-input-icon">
                      <AAUIDropdown
                        id="fieldAccountType"
                        required
                        className={classNames({ 'input--error': hasAccountTypeError })}
                        {...this.getFieldAriaDescribedBy(hasAccountTypeError, 'fieldAccountType')}
                        value={ecpAccountType}
                        data={this.getAccountTypeList()}
                        onChange={({ value }) => this.onAccountTypeChange(value)}
                        placeholder={messages[selfMessages.placeholderOfAccountType.id]}
                      />
                    </div>
                    {
                      hasAccountTypeError ?
                        <div className="form__filed__error">
                          <Icon
                            name="times-circle"
                            type="error"
                            aria-label="error icon"
                          />
                          <span id={`${name}-fieldAccountType_error`} role="alert">
                            {errors.ecpAccountType}
                          </span>
                          {
                            ERROR_ECP_INVALID_ACCOUNT_TYPE ?
                              <span id={`${name}-fieldAccountType_error`} role="alert">
                                {ERROR_ECP_INVALID_ACCOUNT_TYPE}
                              </span> : null
                          }
                        </div> : ''
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* Account Number row */}
            <div className={classNames('form__wraper form__group', { 'form__group--error': hasAccountNumberError })}>
              <div className="layout-width-limited">
                <div className="an-grid an-col-mg-10">
                  <label className="form__label form__label--require an-col an-md-col-6-20 an-lg-col-6-20" htmlFor={`${name}-fieldAccountNumber`}>
                    <FormattedMessage {...selfMessages.formLabelAccountNumber} />
                  </label>
                  { responsive.isSm ? showPopover('n') : null }
                  <div className="form__control an-grid an-col an-col-14-20 an-sm-col-1-1">
                    <div className="an-col an-col-1-1 ecp-field-with-icon">
                      <Input
                        id={`${name}-fieldAccountNumber`}
                        required
                        className={classNames({ 'input--error': hasAccountNumberError })}
                        {...this.getFieldAriaDescribedBy(hasAccountNumberError, 'fieldAccountNumber')}
                        aria-label={`${name} ${messages[selfMessages.formLabelAccountNumber.id]} input`}
                        type="text"
                        maxLength={50}
                        value={ecpAccountNumber}
                        onInput={e => this.onAccountNumberChange(e)}
                        onBlur={e => this.onAccountNumberBlur(e)}
                      />
                      { !responsive.isSm ? showPopover('nw') : null }

                    </div>
                    {
                      hasAccountNumberError ?
                        <div className="form__filed__error">
                          <Icon
                            name="times-circle"
                            type="error"
                            aria-label="error icon"
                          />
                          <span id={`${name}-fieldAccountNumber_error`} role="alert">
                            {errors.ecpAccountNumber}
                          </span>
                          {
                            ERROR_AMS_INVALID_ACC_NUM ?
                              <span id={`${name}-fieldAccountNumber_error`} role="alert">
                                {ERROR_AMS_INVALID_ACC_NUM}
                              </span> : null
                          }

                          {
                            ERROR_AMS_INVALID_ACC_NUM_CODE ?
                              <span id={`${name}-fieldAccountNumber_error`} role="alert">
                                {ERROR_AMS_INVALID_ACC_NUM_CODE}
                              </span> : null
                          }
                        </div> : ''
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* Routing Number row */}
            <div className={classNames('form__wraper form__group', { 'form__group--error': hasRoutingNumberError })}>
              <div className="layout-width-limited">
                <div className="an-grid an-col-mg-10">
                  <label className="form__label form__label--require an-col an-md-col-6-20 an-lg-col-6-20" htmlFor={`${name}-fieldRoutingNumber`}>
                    <FormattedMessage {...selfMessages.formLabelRoutingNumber} />
                  </label>
                  { responsive.isSm ? showPopover('n') : null }
                  <div className="form__control an-grid an-col an-col-14-20 an-sm-col-1-1">
                    <div className="an-col an-col-1-1 ecp-field-with-icon">
                      <Input
                        id={`${name}-fieldRoutingNumber`}
                        required
                        className={classNames({ 'input--error': hasRoutingNumberError })}
                        {...this.getFieldAriaDescribedBy(hasRoutingNumberError, 'fieldRoutingNumber')}
                        aria-label={`${name} ${messages[selfMessages.formLabelRoutingNumber.id]} input`}
                        type="text"
                        maxLength={10}
                        value={ecpRoutingNumber}
                        onInput={e => this.onRoutingNumberChange(e)}
                        onBlur={e => this.onRoutingNumberBlur(e)}
                      />
                      { !responsive.isSm ? showPopover('nw') : null }
                    </div>
                    {
                      hasRoutingNumberError ?
                        <div className="form__filed__error">
                          <Icon
                            name="times-circle"
                            type="error"
                            aria-label="error icon"
                          />
                          <span id={`${name}-fieldRoutingNumber_error`} role="alert">
                            {errors.ecpRoutingNumber}
                          </span>
                          {
                            ERROR_AMS_INVALID_ROUTING ?
                              <span id={`${name}-fieldRoutingNumber_error`} role="alert">
                                {ERROR_AMS_INVALID_ROUTING}
                              </span> : null
                          }
                        </div> : ''
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* Show 'Saving Electronic Check Security Guarantee' row */}
            {
              !data.get('disableGuarantee') && showPriorEcp ?
                <div className="form__wraper">
                  <div className="layout-width-limited">
                    <div className="form__group an-grid an-col-mg-10">
                      <span className="form__label an-col an-col-6-20 an-sm-col-1-1" />
                      <div className="form__control an-col an-col-14-20 an-sm-col-1-1">
                        <div className="collapseTrigger">
                          <a
                            href="javascript:void(0);"
                            className="security-guarantee"
                            onClick={() => this.setState({ showGuarantee: !showGuarantee })}
                          >
                            <FormattedMessage
                              {...selfMessages.formGuaranteeTitle}
                              values={{ checkLabel: upperFirst(checkLabel) }}
                            />
                            <Icon
                              name={`chevron-${showGuarantee ? 'up' : 'down'}`}
                              type="link"
                              aria-label={`chevron ${showGuarantee ? 'up icon' : 'down icon'}`}
                            />
                          </a>
                        </div>
                        {
                          showGuarantee ? getSecurityGuaranteeContent(lowerFirst(checkLabel)) : null
                        }
                      </div>
                    </div>
                  </div>
                </div> : null
            }

            {/* Show 'Save the electronic check for furture use' row */}
            {
              !data.get('disableSaveForFurture') && showPriorEcp ?
                <div className="form__wraper form__group">
                  <div className="layout-width-limited">
                    <div className="an-grid an-col-mg-10">
                      <span className="form__label an-col an-col-6-20 an-sm-col-1-1" />
                      <div className="form__control an-col an-col-14-20 an-sm-col-1-1">
                        <Checkbox
                          size="sm"
                          aria-label={`${name} ${messages[selfMessages.ecpSavedForFurtureUse.id]} checkbox`}
                          onChange={e => this.onCheckSaveFutureUse(e)}
                          checked={ecpSavedForFurtureUse}
                        >
                          <FormattedMessage
                            {...selfMessages.ecpSavedForFurtureUse}
                            values={{ checkLabel: lowerFirst(checkLabel) }}
                          />
                        </Checkbox>
                      </div>
                    </div>
                  </div>
                </div> : null
            }

            {/* Add button row */}
            <div className="form__wraper form__group">
              <div className="layout-width-limited">
                <div className="an-grid an-col-mg-10">
                  <span className="form__label an-col an-col-6-20 an-sm-col-1-1" />
                  <div className="form__control an-col an-col-14-20 an-sm-col-1-1">
                    <Button
                      size="sm" type="primary"
                      onClick={() => this.submitForm()}
                    >
                      <FormattedMessage {...buttonMessages.add} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

          </div> : null
        }
      </div>
    );
  }
}
export default injectIntl(withResponsiveProvider(AddNewECheck));
