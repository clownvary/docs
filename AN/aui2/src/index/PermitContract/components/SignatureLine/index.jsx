import React from 'react';
import classNames from 'classnames';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import './index.less';

class SignatureLine extends React.PureComponent {

  static combineAddress(elements) {
    return elements.filter(v => !!v).join(', ');
  }

  static renderInfoLineView(value, label, displayBreakAll) {
    return (
      value ? (
        <p className={classNames({ 'break-all': displayBreakAll })}>
          {label ? `${decodeHtmlStr(label)}: ` : ''}<span>{decodeHtmlStr(value)}</span>
        </p>
      ) : ''
    );
  }

  renderOrganizationView() {
    const {
      signatures: { org = {} },
      showSignature4Organization,
      initialData: {
        mailingAddressLabel
      }
    } = this.props;
    const combinedAddr = SignatureLine.combineAddress([
      org.mailing_address1, org.mailing_address2, org.mailing_city,
      org.mailing_state
    ]);
    return showSignature4Organization ? (
      <div className="signature-container">
        <div className="signature-line">
          <span aria-label="signature line">X:</span>
        </div>
        <div className="signature-date">
          <span>Date:</span>
        </div>
        <div className="signature-info">
          <p className="signature-info-name">{decodeHtmlStr(org.site_name)}</p>
          { SignatureLine.renderInfoLineView(combinedAddr, mailingAddressLabel || /* istanbul ignore next */ 'Mailing Address') }
          { SignatureLine.renderInfoLineView(org.mailing_zipcode) }
          { SignatureLine.renderInfoLineView(org.phone_number, 'Phone Number') }
          { SignatureLine.renderInfoLineView(org.fax_number, 'Fax Number') }
          { SignatureLine.renderInfoLineView(org.email_address, 'Email Address', true) }
        </div>
      </div>
    ) : (<div className="signature-container" />);
  }

  renderCustomerView() {
    const {
      signatures: { customer = {} },
      initialData: {
        mailingAddressLabel,
        homeLabel,
        workLabel,
        cellLabel
      }
    } = this.props;
    const combinedAddr = SignatureLine.combineAddress([
      customer.mailing_address1, customer.mailing_address2, customer.mailing_city,
      customer.mailing_state
    ]);
    return (
      <div className="signature-info">
        <p className="signature-info-name">{decodeHtmlStr(customer.customer_name)}</p>
        { SignatureLine.renderInfoLineView(customer.customer_id, 'Customer ID') }
        { SignatureLine.renderInfoLineView(combinedAddr, mailingAddressLabel || /* istanbul ignore next */ 'Mailing Address') }
        { SignatureLine.renderInfoLineView(customer.mailing_zipcode) }
        { SignatureLine.renderInfoLineView(customer.work_phone, `${workLabel || /* istanbul ignore next */ 'Work'} Phone Number`) }
        { SignatureLine.renderInfoLineView(customer.home_phone, `${homeLabel || /* istanbul ignore next */ 'Home'} Phone Number`) }
        { SignatureLine.renderInfoLineView(customer.cell_phone, `${cellLabel || /* istanbul ignore next */ 'Cell'} Phone Number`) }
        { SignatureLine.renderInfoLineView(customer.email_address, 'Email Address', true) }
      </div>
    );
  }

  renderCompanyView() {
    const {
      signatures: { company, customer },
      initialData: {
        mailingAddressLabel,
        companyLabel,
        homeLabel,
        workLabel,
        cellLabel
      }
    } = this.props;
    const combinedAddr = SignatureLine.combineAddress([
      company.mailing_address1, company.mailing_address2, company.mailing_city,
      company.mailing_state
    ]);
    return (
      <div className="signature-info">
        <p className="signature-info-name">{decodeHtmlStr(company.company_name)}</p>
        { SignatureLine.renderInfoLineView(company.customer_type, 'Customer Type') }
        { SignatureLine.renderInfoLineView(customer.customer_id, 'Customer ID') }
        { SignatureLine.renderInfoLineView(combinedAddr, mailingAddressLabel || /* istanbul ignore next */ 'Mailing Address') }
        { SignatureLine.renderInfoLineView(company.mailing_zipcode) }
        { SignatureLine.renderInfoLineView(company.company_phone1, `${companyLabel || /* istanbul ignore next */ 'Company'} Phone 1 Number`) }
        { SignatureLine.renderInfoLineView(company.company_phone2, `${companyLabel || /* istanbul ignore next */ 'Company'} Phone 2 Number`) }
        { SignatureLine.renderInfoLineView(customer.customer_name, 'Authorized Agent Name') }
        { SignatureLine.renderInfoLineView(customer.work_phone, `${workLabel || /* istanbul ignore next */ 'Work'} Phone Number`) }
        { SignatureLine.renderInfoLineView(customer.home_phone, `${homeLabel || /* istanbul ignore next */ 'Home'} Phone Number`) }
        { SignatureLine.renderInfoLineView(customer.cell_phone, `${cellLabel || /* istanbul ignore next */ 'Cell'} Phone Number`) }
        { SignatureLine.renderInfoLineView(customer.email_address, 'Email Address', true) }
      </div>
    );
  }

  renderAdditionalCustomerView() {
    return this.props.showSignature4AdditionalCustomer ? (
      <div className="signature-container-additional">
        <p>Additional Customer</p>
        <div className="signature-line">
          <span aria-label="signature line">X:</span>
        </div>
        <div className="signature-date">
          <span>Date:</span>
        </div>
      </div>
    ) : '';
  }

  renderCustomerOrCompanyView() {
    const { signatures: { company } } = this.props;
    return this.props.showSignature4PermitHolder ? (
      <div className="signature-container">
        <div className="signature-line" >
          <span aria-label="signature line">X:</span>
        </div>
        <div className="signature-date">
          <span>Date:</span>
        </div>
        { company ? this.renderCompanyView() : this.renderCustomerView() }
        { this.renderAdditionalCustomerView() }
      </div>
    ) : (<div className="signature-container" />);
  }

  render() {
    return (
      <section className="signature">
        { this.renderOrganizationView() }
        { this.renderCustomerOrCompanyView() }
      </section>
    );
  }
}

export default SignatureLine;
