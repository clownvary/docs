import React from 'react';
import { connect } from 'react-redux';
import UIComponent from 'shared/components/UIComponent';
import Error from 'shared/components/Error';
import { count } from 'react-base-ui/lib/utils/dataAccess';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import { SafeText } from 'react-base-ui/lib/components/SafeText';
import { isIE, isEdge } from 'react-base-ui/lib/utils/browser';
import classNames from 'classnames';
import HelpLink from 'shared/components/HelpLink';
import ActionBar from './components/ActionBar';
import GeneralPermitInfo from './components/GeneralPermitInfo';
import HolderInfo from './components/HolderInfo';
import HeaderAndFooter from './components/HeaderAndFooter';
import RentalChargesSummary from './components/RentalChargesSummary';
import EventInfo from './components/EventInfo';
import Deposit from './components/Deposit';
import PaymentRefund from './components/PaymentRefund';
import Schedule from './components/Schedule';
import Attachment from './components/Attachment';
import SignatureLine from './components/SignatureLine';
import PaymentSchedules from './components/PaymentSchedules';
import {
  fetchPermitContract,
  fetchPermitSchedule,
  fetchAmendment,
  savePdfAction,
  emailContract
} from './actions';
import Amendment from './components/Amendment';
import './index.less';

class PermitContract extends UIComponent {
  constructor(props) {
    super(props);
    this.state = {
      showSearchbar: false
    };
  }

  renderExportPDFFooter() {
    const { permitContract } = this.props;
    const permitInfo = permitContract.get('permitInfo').toJS();
    return (
      <div className="footer-pdf">
        <div className="footer-pdf__permit"># {permitInfo.permit_number}</div>
        <div className="footer-pdf__status">
          <span className="footer-pdf__statusLabel">Status</span>
          {permitInfo.permit_status}
        </div>
        <div className="footer-pdf__page">
          <span className="footer-pdf__pageLabel">
            <b>Page</b>
          </span>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.fetchPermitContract();
    this.props.fetchPermitSchedule();
    this.props.fetchAmendment();
  }
  render() {
    const { error, permitContract, initialData } = this.props;
    const {
      permitLabel,
      showSignature4PermitHolder,
      showSignature4AdditionalCustomer,
      showSignature4Organization,
      isFromCui,
      showEmail,
      showEmployee
    } = initialData;
    const permitInfo = permitContract.get('permitInfo').toJS();
    const header = permitContract.get('header');
    const footer = permitContract.get('footer');
    const orgInfo = permitContract.get('orgInfo').toJS();
    const chargeSummary = permitContract.get('chargeSummary').toJS();
    const events = permitContract.get('events').toJS();
    const deposits = permitContract.get('deposits').toJS();
    const paymentRefunds = permitContract.get('paymentRefunds').toJS();
    const signatures = permitContract.get('signatures').toJS();
    const permitSchedules = permitContract.get('permitSchedules').toJS();
    const attachedFiles = permitContract.get('attachedFiles').toJS();
    const paymentSchedules = permitContract.get('paymentSchedules').toJS();
    const amendments = permitContract.get('amendments').toJS();

    const hasAmendment = !!(amendments && amendments.length);
    return (
      <div className="permit-contract-page an-page wcag-contrast-mutations">
        <div className="page-container">
          {
            this.renderExportPDFFooter()
          }
          <h1 className="permit__title"><span>{decodeHtmlStr(permitLabel)}</span></h1>
          <h1 className="schedule__title">Schedule</h1>
          <h1 className="amendment__title">Amendment</h1>
          <ActionBar
            hasAmendment={hasAmendment}
            savePdfAction={this.props.savePdfAction}
            emailContract={this.props.emailContract}
            permitNumber={permitInfo.permit_number}
            permitId={permitInfo.permit_id}
            permitLabel={permitLabel}
            showEmail={showEmail}
            signatures={signatures}
          />
          <div className="header-right-float">
            <div className="permit-help-link">{!isFromCui && <HelpLink pageName="PermitContract.jsp" />}</div>
            {
              orgInfo.site_logo &&
              <div className={classNames('permit-logo', { 'ms-tabbable': isIE() || isEdge() })} >
                <SafeText dangerMode text={orgInfo.site_logo} />
              </div>
            }
          </div>
          <GeneralPermitInfo
            permitInfo={permitInfo}
            orgInfo={orgInfo}
            permitLabel={permitLabel}
          />
          {
            header && <HeaderAndFooter header={header} />
          }
          <HolderInfo permitInfo={permitInfo} signatures={signatures} initialData={initialData} />
          <RentalChargesSummary chargeSummary={chargeSummary} />
          <div className="section-separator separate-charge-summary" />
          <EventInfo events={events} />
          { events && count(events) > 0 && <div className="section-separator separate-event-info" /> }
          <Deposit deposits={deposits} />
          <PaymentRefund paymentRefunds={paymentRefunds} />
          {
            paymentSchedules.schedules && count(paymentSchedules.schedules) > 0 &&
            <PaymentSchedules paymentSchedules={paymentSchedules} />
          }
          {
            (
              (deposits && count(deposits) > 0) ||
              (paymentRefunds && count(paymentRefunds) > 0) ||
              (paymentSchedules.schedules && count(paymentSchedules.schedules) > 0)
            ) && <div className="section-separator separate-schedule" />
          }
          {
            permitSchedules && count(permitSchedules) > 0 &&
            <Schedule
              permitSchedules={permitSchedules}
            />
          }
          {
            attachedFiles && count(attachedFiles) > 0 &&
            <div className="section-separator separate-attachment" />
          }
          {
            attachedFiles && count(attachedFiles) > 0 &&
            <Attachment attachedFiles={attachedFiles} />
          }
          {
            hasAmendment &&
            <Amendment
              amendments={amendments}
              showEmployee={showEmployee}
            />
          }
          <div className="section-separator separate-amendment" />
          {
            footer && <HeaderAndFooter footer={footer} />
          }
          <SignatureLine
            signatures={signatures}
            showSignature4PermitHolder={showSignature4PermitHolder}
            showSignature4AdditionalCustomer={showSignature4AdditionalCustomer}
            showSignature4Organization={showSignature4Organization}
            initialData={initialData}
          />
          <Error error={error} />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    error: state.error,
    permitContract: state.permitContract,
    initialData: state.initialData
  }),
  {
    fetchPermitContract,
    fetchPermitSchedule,
    fetchAmendment,
    savePdfAction,
    emailContract
  }
)(PermitContract);
