import React from 'react';
import { connect } from 'react-redux';
import { redirect } from 'shared/actions/route';
import UIComponent from 'shared/components/UIComponent';
import classNames from 'classnames';
import Intro from 'shared/components/Intro';
import Error from 'shared/components/Error';
import { Authority, AuthorityID, AuthorityType } from 'shared/authorities';
import { raiseUnrecognizedAuthCode } from 'shared/actions/Authority';
import BreadCrumb from 'shared/components/BreadCrumb';
import HelpLink from 'shared/components/HelpLink';
import ButtonBar from 'react-base-ui/lib/components/ButtonBar';
import { switchViewAction, updateDateOfDayAndMonthViewAction, fetchReady4CheckoutAsyncAction } from './actions/main';
import { fetchResourcesBookingAsyncAction } from './actions/booking';
import { fetchOnBoardingAsyncAction, updateOnBoardingAsyncAction } from './actions/onboarding';
import { fetchSelectedResources } from './actions/resourceFilters';
import { getResourcesParams } from './utils/resourceParams';
import {
  fetchScheduleTypesAsyncAction,
  fetchAndSetPrepCodeAsyncAction,
  fetchSetupCleanUpAsyncAction
} from './actions/configurationData';
import {
  getEditableBookings
} from './actions/bookingPanel';
import Resources from './components/FullCalendar';
import SearchBar from './components/SearchBar';
import BookingInformation from './components/BookingInformation';
import LinkGroup from './components/LinkGroup';
import DateNav from './components/DateNav';
import QuickView from './components/QuickView';
import MonthView from './components/MonthView';
import { createCalendarTimer } from './components/FullCalendar/utils';

import './index.less';

const steps = [{
  text: '1.Filter out resources.',
  position: 'left-bottom',
  element: '.intro-step-1'
}, {
  text: '2.Open the shopping cart and fulfill your payment.',
  position: 'left',
  element: '.intro-step-2',
  className: 'intro-step2-tooltip'
}, {
  text: '3.Drag-select resources and time slots, and add them to your permit. Enter required fields and click Proceed to add the permit to the shopping cart.',
  position: 'left',
  element: '.intro-step-3',
  className: 'intro-step3-tooltip'
}];

class ResourceCalendar extends UIComponent {
  constructor(props, context) {
    super(props, context);
    this.calendarTimer = createCalendarTimer();
  }

  componentWillUnmount() {
    this.calendarTimer.stop();
    this.calendarTimer = null;
  }

  syncCalendar(...params) {
    /* istanbul ignore else */
    if (this.rsrc) {
      const calendar = this.rsrc.getWrappedInstance();
      calendar.transferCalling(...params);
    }
  }

  getButtonBarProps = (isDayView, lastDateOfDayView) => {
    const dayBtnClassName = isDayView ? 'selected' : '';
    const monthBtnClassName = !isDayView ? 'selected' : '';

    const data = [
      {
        id: 'dayView',
        loading: false,
        disabled: false,
        text: 'Day',
        className: dayBtnClassName
      },
      {
        id: 'monthView',
        loading: false,
        text: 'Month',
        disabled: false,
        className: monthBtnClassName
      }
    ];

    const props = {
      data,
      disabled: false,
      onButtonClick: (e, { id }) => {
        const isSelectDayView = id === 'dayView';
        if (isDayView !== isSelectDayView) {
          this.props.switchViewAction(isSelectDayView, lastDateOfDayView);
        }
      }
    };

    return props;
  }

  onGotoDate = (newSelectedDate) => {
    this.props.updateDateOfDayAndMonthViewAction(newSelectedDate);
    this.props.fetchResourcesBookingAsyncAction()
      .then(
        () => this.syncCalendar('gotoDate', newSelectedDate)
      );
  }

  render() {
    const { filters, bookingPanel, booking, onboarding, error,
      runningCart, breadCrumb, quickView, initialData, main, configurationData
    } = this.props;
    const editableBookings = this.props.getEditableBookings();
    const availableBookingCount = editableBookings.size;
    const permitID = initialData.permitID;
    const silentOut = permitID === '' && availableBookingCount === 0;

    if (Authority.isDisplayed(AuthorityID.CALENDAR_PAGE)) {
      const hideIntro = onboarding.get('hideIntro');
      const readyIntro = onboarding.get('ready');
      const hasPendingBookingWhenIntoResouce = bookingPanel.get('hasPendingBookingWhenIntoResouce');
      const disableRunningCart = hasPendingBookingWhenIntoResouce &&
        (!main.get('ready4Checkout') || bookingPanel.get('isBookingChanged'));
      const isDayView = main.get('isDayView');
      const startDate = main.get('startDate');
      const lastDateOfDayView = isDayView ? startDate : main.get('lastDateOfDayView');
      const bookingLimitToastContent = bookingPanel.get('bookingLimitToastContent');
      const buttonBarProps = this.getButtonBarProps(isDayView, lastDateOfDayView);
      const resourceMap = configurationData.get('resourceMap');
      const isResourcesExpanded = filters.resources.get('isResourcesExpanded');
      const loadedResourceIDs = bookingPanel.get('loadedResourceIDs');
      const hasSelectedResourcesLoaded = loadedResourceIDs.size > 0;

      return (
        <section
          className={classNames(
            'resource-calendar',
            'an-page',
            {
              'resource-calendar--month': !isDayView
            }
          )}
        >
          {
            /* istanbul ignore next */
            !__STATIC__ &&
            <BreadCrumb
              isPromptUser
              breadCrumb={breadCrumb}
              isSilientOutsideWorkflow={silentOut}
              isCleanedBoforeUnloadPage={silentOut}
            />
          }
          <div>
            <div className="page-title">
              <h1>Resource Calendar</h1>
              <div className="toolBar">
                <LinkGroup
                  initialData={initialData}
                  showIntro={!quickView.get('showModal')}
                  runningCart={runningCart}
                  disableRunningCart={disableRunningCart}
                  redirect={this.props.redirect}
                />
                <HelpLink pageName="CentralBooking.jsp" />
              </div>
            </div>
          </div>
          <div className={hideIntro ? 'searchBarWrapper' : 'searchBarWrapper static'}>
            <div className="filterSection intro-step-1">
              <div>
                <div className="datepickerSection">
                  <DateNav
                    defaultDate={startDate}
                    ref={(c) => { this.dateNav = c; }}
                    isDayView={isDayView}
                    onGotoDate={this.onGotoDate}
                  />
                </div>
                <ButtonBar {...buttonBarProps} />
              </div>

              <div className="quick-view__wrapper">
                <QuickView
                  quickView={quickView}
                  hasSelectedResources={filters.resources.get('selected').size > 0}
                />
              </div>
            </div>
            <SearchBar
              initialData={initialData}
              filters={filters}
              loading
            />
          </div>
          {
            !hasSelectedResourcesLoaded &&
            <div className="no-resource-selected">No resource selected.</div>
          }
          {
          /**
           * Render the Resources only when has resources details been fetched,
           * or the resources will been rendered first then all resources been reset to empty
           * in the fullcalendar-resource
           */
            (hasSelectedResourcesLoaded && isDayView) &&
            <Resources
              ref={(c) => { this.rsrc = c; }}
              getNowTime={this.calendarTimer.getTime}
              unEditableBookings={booking.get('unEditableBookings')}
              editableBookings={editableBookings}
              loadedResourceIDs={loadedResourceIDs}
              initialData={initialData}
              curentEventName={bookingPanel.get('eventName')}
              hasError={error.get('list').size > 0}
              isShownQuickView={quickView.get('showModal')}
              isBookingPanelExpanded={bookingPanel.get('display')}
              availableBookingCount={availableBookingCount}
              selectedDate={startDate}
              startDateMoment={main.get('startDateMoment')}
              bookingPanelResourceMap={bookingPanel.get('resourceMap')}
              rentalBlockMap={configurationData.get('rentalBlockMap')}
              resourceMap={resourceMap}
              isResourcesExpanded={isResourcesExpanded}
              loading
            />
          }
          {
            (hasSelectedResourcesLoaded && !isDayView) &&
            <MonthView
              initialData={initialData}
              customMore={false}
              unEditableBookings={booking.get('unEditableBookings')}
              editableBookings={editableBookings}
              isShownQuickView={quickView.get('showModal')}
              isBookingPanelExpanded={bookingPanel.get('display')}
              isResourcesExpanded={isResourcesExpanded}
              resourceMap={resourceMap}
              bookingPanelResourceMap={bookingPanel.get('resourceMap')}
              availableBookingCount={availableBookingCount}
              switchViewAction={this.props.switchViewAction}
              selectedDate={startDate}
              startDayOfMonthMoment={main.get('startDayOfMonthMoment')}
              endDayOfMonthMoment={main.get('endDayOfMonthMoment')}
              loadedResourceIDs={loadedResourceIDs}
              curentEventName={bookingPanel.get('eventName')}
              currentScheduleType={bookingPanel.get('scheduleType')}
            />
          }
          <Error error={error} />
          <Intro
            steps={steps} hide={hideIntro} ready={readyIntro}
            onClickCallback={this.props.updateOnBoardingAsyncAction}
          />
          <BookingInformation
            initialData={initialData}
            bookingPanel={bookingPanel}
            resize={main.get('resize')}
            hideIntro={hideIntro}
            configurationData={configurationData}
            availableBookingCount={availableBookingCount}
            hasSystemErr={error.get('systemErrors').size > 0}
            bookingLimitToastContent={bookingLimitToastContent}
          />
        </section>
      );
    } /* istanbul ignore next */ else if (Authority.isHidden(AuthorityID.CALENDAR_PAGE)) {
      return undefined;
    }
    return <Error error={error} />;
  }

  componentDidMount() {
    const { initialData, filters } = this.props;
    const { batchID, receiptID } = initialData;
    const types = [AuthorityType.DISPLAYED, AuthorityType.HIDDEN];

    if (Authority.typeNotIn(AuthorityID.CALENDAR_PAGE, types)) {
      this.props.raiseUnrecognizedAuthCode(AuthorityID.CALENDAR_PAGE);
    }
    this.calendarTimer.start();
    // disable onboard, please keep the code here,
    // this function will be opened later
    this.props.fetchOnBoardingAsyncAction();
    this.props.fetchReady4CheckoutAsyncAction(batchID, receiptID);
    this.props.fetchSelectedResources(
      getResourcesParams(initialData, filters)
    ).then(
      () => {
        this.props.fetchScheduleTypesAsyncAction();
        this.props.fetchAndSetPrepCodeAsyncAction();
        this.props.fetchSetupCleanUpAsyncAction();
        this.props.fetchResourcesBookingAsyncAction(true);
      }
    );
  }
}
export default connect(
  state => ({
    filters: state.resourceFilter,
    main: state.main,
    configurationData: state.configurationData,
    booking: state.booking,
    bookingPanel: state.bookingPanel,
    onboarding: state.onboarding,
    error: state.error,
    runningCart: state.runningCart,
    quickView: state.quickView,
    breadCrumb: state.breadCrumb,
    initialData: state.initialData
  }),
  {
    fetchOnBoardingAsyncAction,
    updateOnBoardingAsyncAction,
    redirect,
    fetchReady4CheckoutAsyncAction,
    raiseUnrecognizedAuthCode,
    fetchResourcesBookingAsyncAction,
    switchViewAction,
    fetchSelectedResources,
    updateDateOfDayAndMonthViewAction,
    fetchScheduleTypesAsyncAction,
    fetchAndSetPrepCodeAsyncAction,
    fetchSetupCleanUpAsyncAction,
    getEditableBookings
  }
)(ResourceCalendar);
