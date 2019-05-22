import React from 'react';
import PropTypes from 'prop-types';
import Input from 'react-base-ui/lib/components/Input';
import { AAUIDropdown } from 'react-base-ui/lib/components/Dropdown';
import Button from 'react-base-ui/lib/components/Button';
import { Icon } from 'react-base-ui/lib/components/SVG';
import { injectIntl } from 'react-intl';
import classNames from 'classnames';

import { FormattedMessage } from 'shared/translation/formatted';
import WCAGHiddenLabel from 'shared/components/WCAG/WCAGHiddenLabel';
import stringHelper from 'react-base-ui/lib/helper/string';
import { billingAddressFormFields as fields, formModes } from '../../../consts';
import { scrollByClass } from '../../PaymentComponent/utils/operateDom';

import selfMessages from './translations';
import './index.less';

/* eslint-disable max-len */
/* eslint-disable no-script-url */
export class BillingAddressForm extends React.PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      toJS: PropTypes.func,
      get: PropTypes.func
    }).isRequired,
    config: PropTypes.shape({
      canCreate: PropTypes.bool.isRequired,
      isInternational: PropTypes.bool.isRequired
    }).isRequired,

    onCreate: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
    onChangeCountry: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onValidate: PropTypes.func.isRequired
  };

  componentDidUpdate() {
    const { data } = this.props;
    const formErrors = data.get('formErrors');
    const hasSubmitForm = data.get('hasSubmitForm');
    if (hasSubmitForm && formErrors.size) {
      const errorElements = this.billingAddressForm.getElementsByClassName('input--error');
      const firstErrorElement = errorElements[0];
      firstErrorElement && firstErrorElement.getElementsByClassName('input__field')[0].focus();
    }
  }

  getFieldAriaDescribedBy(fieldName, serviceFieldName) {
    const { data } = this.props;
    const formErrors = data.get('formErrors');

    const error = formErrors.get(serviceFieldName) ? formErrors.get(serviceFieldName) : formErrors.get(fieldName);

    return error ? { 'aria-describedby': `frm${fieldName}_error` } : {};
  }

  renderError = (errMessage, parentID) =>
    (
      errMessage ?
        <div className="form__filed__error">
          <Icon
            name="times-circle"
            type="error"
            aria-label="error icon"
          />
          {
            selfMessages[errMessage] ?
              <span id={`${parentID}_error`} role="alert">
                {this.props.intl.messages[selfMessages[errMessage].id]}
              </span>
              : errMessage
          }
        </div>
        : null
    );

  renderFormField = (
    fieldType,
    fieldLabelObj,
    fieldControl,
    fieldError,
    required,
    hideWcagLabel = false
  ) =>
    (
      <div
        className={classNames(
          'form__wraper',
          'form__group',
          {
            'form__group--error':
            !stringHelper.isNullOrEmpty(fieldError)
          })}
      >
        <div className="layout-width-limited">
          <div className="an-grid an-col-mg-10">
            <label
              className={classNames(
                'form__label',
                { 'form__label--require': required },
                'an-col',
                'an-col-6-20',
                'an-sm-col-1-1'
              )}
              style={hideWcagLabel ? { height: 0 } : null}
              htmlFor={`frm${fieldType}`}
            >
              {hideWcagLabel ? <WCAGHiddenLabel value={this.props.intl.messages[fieldLabelObj.id]} />
                : (fieldLabelObj && <FormattedMessage {...fieldLabelObj} />)}
            </label>
            <div className="form__control an-col an-col-14-20 an-sm-col-1-1">
              {fieldControl}
              {this.renderError(fieldError, fieldControl.props.id)}
            </div>
          </div>
        </div>
      </div>
    )

  render() {
    const {
      intl: { messages },
      data,
      config
    } = this.props;

    const countries = data.get('countries');
    const selectedCountry = data.get('selectedCountry');
    const selectedState = data.get('selectedState');
    const formData = data.get('formData');
    const isFormDisplay = data.get('isFormDisplay');
    const isFormHeaderDisplay = data.get('isFormHeaderDisplay');
    const formErrors = data.get('formErrors');
    const formMode = data.get('formMode');
    const isStateShownAsList = data.get('isStateShownAsList');

    return (
      <div className="billingaddress-wrapper__form" ref={(el) => { this.billingAddressForm = el; }}>
        {
          config.canCreate && isFormHeaderDisplay ?
            <a
              href="javascript:void(0);"
              className={classNames('title', 'link', { disable: !config.canAdd })}
              onClick={() => { isFormDisplay ? this.props.onHide() : this.props.onCreate(); }}
            >
              <FormattedMessage {...selfMessages.labelAdd} />
              <Icon
                type="link"
                name={`chevron-${isFormDisplay ? 'up' : 'down'}`}
                aria-label={`chevron ${isFormDisplay ? 'up icon' : 'down icon'}`}
              />
            </a>
            : null
        }
        {
          isFormDisplay &&
            <div className="billingaddress-form">

              {
                formMode === formModes.CREATE && this.renderFormField(
                  fields.FIRST,
                  selfMessages.labelFirstName,
                  <Input
                    id={`frm${fields.FIRST}`}
                    required
                    maxLength={40}
                    value={formData.get(fields.FIRST)}
                    className={classNames({ 'input--error': !!formErrors.get(fields.FIRST) })}
                    {...this.getFieldAriaDescribedBy(fields.FIRST)}
                    onInput={e => this.props.onChange(fields.FIRST, e.target.value, formMode)}
                    onBlur={e => this.props.onValidate(fields.FIRST, e.target.value, formMode)}
                  />,
                  formErrors.get(fields.FIRST),
                  true
                )
              }

              {
                formMode === formModes.CREATE && this.renderFormField(
                  fields.LAST,
                  selfMessages.labelLastName,
                  <Input
                    id={`frm${fields.LAST}`}
                    required
                    maxLength={40}
                    value={formData.get(fields.LAST)}
                    className={classNames({ 'input--error': !!formErrors.get(fields.LAST) })}
                    {...this.getFieldAriaDescribedBy(fields.LAST)}
                    onInput={e => this.props.onChange(fields.LAST, e.target.value, formMode)}
                    onBlur={e => this.props.onValidate(fields.LAST, e.target.value, formMode)}
                  />,
                  formErrors.get(fields.LAST),
                  true
                )
              }

              {
                formMode === formModes.UPDATE && this.renderFormField(
                  fields.MAILINGNAME,
                  selfMessages.labelMailingName,
                  <Input
                    id={`frm${fields.MAILINGNAME}`}
                    required
                    maxLength={150}
                    value={formData.get(fields.MAILINGNAME)}
                    className={classNames({ 'input--error': !!formErrors.get(fields.MAILINGNAME) })}
                    {...this.getFieldAriaDescribedBy(fields.MAILINGNAME)}
                    onInput={e => this.props.onChange(fields.MAILINGNAME, e.target.value, formMode)}
                    onBlur={e => this.props.onValidate(fields.MAILINGNAME, e.target.value, formMode)}
                  />,
                  formErrors.get(fields.MAILINGNAME),
                  true
                )
              }

              {
                this.renderFormField(
                  fields.ADDRESS1,
                  selfMessages.labelStreetAddress,
                  <Input
                    id={`frm${fields.ADDRESS1}`}
                    required
                    maxLength={35}
                    value={formData.get(fields.ADDRESS1)}
                    className={classNames({ 'input--error': !!formErrors.get(fields.ADDRESS1) })}
                    {...this.getFieldAriaDescribedBy(fields.ADDRESS1)}
                    onInput={e => this.props.onChange(fields.ADDRESS1, e.target.value, formMode)}
                    onBlur={e => this.props.onValidate(fields.ADDRESS1, e.target.value, formMode)}
                  />,
                  formErrors.get(fields.ADDRESS1),
                  true
                )
              }

              {
                this.renderFormField(
                  fields.ADDRESS2,
                  selfMessages.secondaryStreetAddress,
                  <Input
                    id={`frm${fields.ADDRESS2}`}
                    maxLength={35}
                    value={formData.get(fields.ADDRESS2)}
                    onInput={e => this.props.onChange(fields.ADDRESS2, e.target.value, formMode)}
                    onBlur={e => this.props.onValidate(fields.ADDRESS2, e.target.value, formMode)}
                  />,
                  formErrors.get(fields.ADDRESS2),
                  false,
                  true
                )
              }

              {
                config.isInternational && this.renderFormField(
                  fields.COUNTRY,
                  selfMessages.labelCountry,
                  <AAUIDropdown
                    id={`frm${fields.COUNTRY}`}
                    required
                    placeholder={messages[selfMessages.placeholderCountry.id]}
                    data={countries.toJS()}
                    value={selectedCountry.get('value')}
                    className={classNames({ 'input--error': !!formErrors.get(fields.COUNTRY) })}
                    {...this.getFieldAriaDescribedBy(fields.COUNTRY)}
                    onChange={({ value }) => {
                      if (value !== selectedCountry.get('value')) {
                        this.props.onChangeCountry(value, formMode);
                      }
                    }}
                    maxHeight="350px"
                  />,
                  formErrors.get(fields.COUNTRY),
                  true
                )
              }

              {
                this.renderFormField(
                  fields.STATE,
                  selfMessages.labelStateProvince,
                  isStateShownAsList ?
                    <AAUIDropdown
                      id={`frm${fields.STATE}`}
                      required
                      placeholder={messages[selfMessages.placeholderCStateProvince.id]}
                      data={selectedCountry.toJS().states || []}
                      value={selectedState.get('value')}
                      className={classNames({ 'input--error': !!formErrors.get(fields.STATE) })}
                      {...this.getFieldAriaDescribedBy(fields.STATE)}
                      onChange={
                        ({ value }) => {
                          this.props.onChange(fields.STATE, value, formMode);
                          this.props.onValidate(fields.STATE, value, formMode);
                        }
                      }
                      maxHeight="350px"
                    />
                    :
                    <Input
                      id={`frm${fields.STATE}`}
                      required
                      maxLength={15}
                      value={formData.get(fields.STATE)}
                      className={classNames({ 'input--error': !!formErrors.get(fields.STATE) })}
                      {...this.getFieldAriaDescribedBy(fields.STATE)}
                      onInput={e => this.props.onChange(fields.STATE, e.target.value, formMode)}
                      onBlur={e => this.props.onValidate(fields.STATE, e.target.value, formMode)}
                    />,
                  formErrors.get(fields.STATE),
                  true
                )
              }

              <div className="city-zipcode-wrapper">
                {
                  this.renderFormField(
                    fields.CITY,
                    selfMessages.labelCity,
                    <Input
                      id={`frm${fields.CITY}`}
                      required
                      maxLength={40}
                      value={formData.get(fields.CITY)}
                      className={classNames({ 'input--error': !!formErrors.get(fields.CITY) })}
                      {...this.getFieldAriaDescribedBy(fields.CITY)}
                      onInput={e => this.props.onChange(fields.CITY, e.target.value, formMode)}
                      onBlur={e => this.props.onValidate(fields.CITY, e.target.value, formMode)}
                    />,
                    formErrors.get(fields.CITY),
                    true
                  )
                }

                {
                  this.renderFormField(
                    fields.ZIPCODE,
                    selfMessages.labelZipCode,
                    <Input
                      id={`frm${fields.ZIPCODE}`}
                      required
                      maxLength={10}
                      className={classNames('zipcode', { 'input--error': !!(formErrors.get(fields.ZIPCODE) || formErrors.get(fields.ZIPCODE_SERVICE)) })}
                      value={formData.get(fields.ZIPCODE)}
                      {...this.getFieldAriaDescribedBy(fields.ZIPCODE, fields.ZIPCODE_SERVICE)}
                      onInput={
                        (e) => {
                          this.props.onChange(fields.ZIPCODE, e.target.value, formMode);
                          this.props.onChange(fields.ZIPCODE_SERVICE);
                        }
                      }
                      onBlur={e => this.props.onValidate(fields.ZIPCODE, e.target.value, formMode)}
                    />,
                    formErrors.get(fields.ZIPCODE) || formErrors.get(fields.ZIPCODE_SERVICE),
                    true
                  )
                }
              </div>

              <div className="form__wraper form__group">
                <div className="layout-width-limited">
                  <div className="an-grid an-col-mg-10">
                    <div className="an-col an-col-6-20" />
                    <div className="an-col an-col-14-20 an-sm-col-1-1">
                      {
                        formMode === formModes.CREATE ?
                          <Button
                            type="primary"
                            size="sm"
                            className="btn-add"
                            onClick={() => this.props.onSubmit().then(
                              () => scrollByClass('billingaddress-wrapper')
                            )}
                          >
                            <FormattedMessage {...selfMessages.buttonAdd} />
                          </Button>
                          : null
                      }
                      {formMode === formModes.UPDATE ?
                        <div className="an-grid button-row-update">
                          <Button
                            size="sm"
                            onClick={this.props.onCancel}
                          >
                            <FormattedMessage {...selfMessages.buttonCancel} />
                          </Button>

                          <Button
                            type="primary"
                            size="sm"
                            onClick={() => this.props.onSubmit().then(
                              () => scrollByClass('billingaddress-wrapper')
                            )}
                          >
                            <FormattedMessage {...selfMessages.buttonSave} />
                          </Button>
                        </div>
                        : null
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
        }
      </div>
    );
  }
}

export default injectIntl(BillingAddressForm);
