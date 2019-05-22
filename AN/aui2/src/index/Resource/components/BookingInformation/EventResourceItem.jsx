import React from 'react';
import { connect } from 'react-redux';
import find from 'lodash/find';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import UIComponent from 'shared/components/UIComponent';
import SetupDropdown from 'shared/components/SetupDropdown';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import BookingDetails from './BookingDetails';
import AMIds from '../../automationIds';
import {
  bookingPanelUpdateResourceDetailAction,
  bookingPanelUpdateEventAction
} from '../../actions/bookingPanel';
import {
  bookingPanelTemplateUpdateIsNeedFillScheduleAction,
  bookingPanelSetTemplateAndApplyAction
} from '../../actions/bookingPanelTemplate';
import {
  bookingPanelClearErrAction
} from '../../actions/bookingPanelValidation';
import { fetchPrepCodeAsyncAction } from '../../actions/configurationData';

class EventResourceItem extends UIComponent {
  changeEventType = (e) => {
    const {
      bookingPanelResource,
      resourceID,
      resource,
      scheduleTypes,
      resourceEventTypes
    } = this.props;
    const eventTypeID = bookingPanelResource.get('eventTypeID');
    const resourceType = resource.get('resourceType');
    const { value: newEventTypeID } = e;
    const resourceDetailObj = {};

    /* istanbul ignore else */
    if (eventTypeID !== newEventTypeID) {
      const text = this._refs.eventType.findTextByValue(newEventTypeID);
      const { firstResourceID, isNeedFillSchedule } = this.props;
      const filledScheduleTypeID = resourceEventTypes.find(item => item.get('id') === newEventTypeID).get('schedule_type_id');
      const filledScheduleType = scheduleTypes.find(item => item.get('id') === filledScheduleTypeID);
      const filledScheduleTypeName = filledScheduleType && filledScheduleType.get('name');
      // /* istanbul ignore else */
      if (isNeedFillSchedule && eventTypeID === -1 &&
        +resourceID === +firstResourceID && filledScheduleTypeID) {
        this.props.bookingPanelTemplateUpdateIsNeedFillScheduleAction(false);
        this.props.bookingPanelUpdateEventAction(
          { scheduleTypeID: filledScheduleTypeID, scheduleType: filledScheduleTypeName }
        );
      }

      resourceDetailObj.eventType = text;
      resourceDetailObj.eventTypeID = newEventTypeID;
      this.props.fetchPrepCodeAsyncAction({
        event_type_id: newEventTypeID,
        resource_id: resourceID,
        resource_type: resourceType
      }).then(
        ({ payload: { body: { items } } }) => {
          const originalPrepCodeID = resource.get('prepCodeID');
          const selectedPrepCode = find(items, prepcode => prepcode.selected);
          const prepCodeID = selectedPrepCode ? selectedPrepCode.id : -1;
          const setupTime = selectedPrepCode ? selectedPrepCode.setup_time : 0;
          const cleanupTime = selectedPrepCode ? selectedPrepCode.cleanup_time : 0;

          if (prepCodeID > 0) {
            resourceDetailObj.prepCodeID = prepCodeID;
            resourceDetailObj.setupMinutes = setupTime;
            resourceDetailObj.cleanupMinutes = cleanupTime;
          } else if (originalPrepCodeID >= 0) {
            resourceDetailObj.prepCodeID = -1;
            resourceDetailObj.setupMinutes = 0;
            resourceDetailObj.cleanupMinutes = 0;
          }
          this.props.bookingPanelUpdateResourceDetailAction(resourceID, resourceDetailObj);
          this.props.bookingPanelSetTemplateAndApplyAction(resourceID, 'eventTypeID');
          this.props.bookingPanelClearErrAction({
            errorKey: 'eventTypeID',
            resourceID
          });
        },
        (err) => {
          this.props.bookingPanelUpdateResourceDetailAction(resourceID, resourceDetailObj);
          this.props.bookingPanelSetTemplateAndApplyAction(resourceID, 'eventTypeID');
          this.props.bookingPanelClearErrAction({
            errorKey: 'eventTypeID',
            resourceID
          });
          return Promise.reject(err);
        }
      );
    }
  };

  changeEventSetup = (e) => {
    const newMinutes = e.value;
    const { bookingPanelResource, resourceID } = this.props;
    const oldMinutes = bookingPanelResource.get('setupMinutes');
    const resourceDetailObj = {};

    if (oldMinutes !== newMinutes) {
      resourceDetailObj.setupMinutes = newMinutes;
      this.props.bookingPanelUpdateResourceDetailAction(resourceID, resourceDetailObj);
      this.props.bookingPanelSetTemplateAndApplyAction(resourceID, 'setupMinutes');
    }
  };

  changeEventCleanup = (e) => {
    const newMinutes = e.value;
    const { bookingPanelResource, resourceID } = this.props;
    const oldMinutes = bookingPanelResource.get('cleanupMinutes');
    const resourceDetailObj = {};

    if (oldMinutes !== newMinutes) {
      resourceDetailObj.cleanupMinutes = newMinutes;
      this.props.bookingPanelUpdateResourceDetailAction(resourceID, resourceDetailObj);
      this.props.bookingPanelSetTemplateAndApplyAction(resourceID, 'cleanupMinutes');
    }
  };

  changeEventPrepCode = (e) => {
    const newPrepCodeID = e.value;
    const { bookingPanelResource, resourceID, prepCodeList } = this.props;
    const oldPrepCodeID = bookingPanelResource.get('prepCodeID');
    const resourceDetailObj = {};
    const prepCodeSelected = prepCodeList.find(item => item.get('id') === newPrepCodeID);

    if (oldPrepCodeID !== newPrepCodeID) {
      resourceDetailObj.prepCodeID = newPrepCodeID !== -1 ? newPrepCodeID : -1;
      resourceDetailObj.setupMinutes = (prepCodeSelected && prepCodeSelected.get('setup_time')) || 0;
      resourceDetailObj.cleanupMinutes = (prepCodeSelected && prepCodeSelected.get('cleanup_time')) || 0;
      this.props.bookingPanelUpdateResourceDetailAction(resourceID, resourceDetailObj);
      this.props.bookingPanelSetTemplateAndApplyAction(resourceID, 'prepCodeID');
    }
  };

  render() {
    const { prepCodeList, setUpList, cleanUpList,
      overrideRentalBlockErrors,
      resourceID, recurringMap, bookingPanelResource, resource,
      resourceRentalBlocks, resourceDateRanges, resourceEventTypes,
      changedBaseBookingMap,
      waitingAppliedBaseBookingIds,
      pendingMovedRecurringBookingMap,
      resourceError, bookingsErr
    } = this.props;
    const eventTypeID = bookingPanelResource.get('eventTypeID');
    const prepCodeID = bookingPanelResource.get('prepCodeID');
    const setupMinutes = bookingPanelResource.get('setupMinutes');
    const cleanupMinutes = bookingPanelResource.get('cleanupMinutes');
    const resourceBookings = bookingPanelResource.get('bookings');
    const prepCodeOptions = prepCodeList.toJS();

    prepCodeOptions.unshift({ text: 'Choose prep code', value: -1 });

    return (
      <li className="detail-list-group">
        <label htmlFor="eslint" className="name">
          {decodeHtmlStr(resource.get('resourceName'))}
        </label>
        <section className="section-resource">
          <div className="form-group">
            <label htmlFor="eventTypeID" className="form-group__label">Event Type</label>
            <div className="event-type">
              <Dropdown
                id="eventTypeID"
                autoOpen
                data-qa-id={AMIds.information.eventType}
                className={`${resourceError && resourceError.get('eventTypeID') ? 'error-field' : ''}`}
                ref={e => (this._refs.eventType = e)}
                placeholder="Choose event type"
                data={resourceEventTypes.toJS()}
                value={eventTypeID}
                onChange={this.changeEventType}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="prepCode" className="form-group__label">Prep Code</label>
            <div className="prep-code">
              <Dropdown
                id="prepCode"
                autoOpen
                placeholder="Choose prep code"
                data={prepCodeOptions}
                data-qa-id={AMIds.information.prepCode}
                value={prepCodeID}
                onChange={this.changeEventPrepCode}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="setupMinutes" className="form-group__label">Setup</label>
            <div className="sm-value">
              <SetupDropdown
                id="setupMinutes"
                data={setUpList.toJS()}
                data-qa-id={AMIds.information.setup}
                value={setupMinutes}
                onBlur={this.changeEventSetup}
                onSelect={this.changeEventSetup}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="cleanupMinutes" className="form-group__label">Cleanup</label>
            <div className="sm-value">
              <SetupDropdown
                id="cleanupMinutes"
                data={cleanUpList.toJS()}
                data-qa-id={AMIds.information.cleanup}
                value={cleanupMinutes}
                onBlur={this.changeEventCleanup}
                onSelect={this.changeEventCleanup}
              />
            </div>
          </div>
        </section>
        <BookingDetails
          bookings={resourceBookings}
          resourceID={resourceID}
          overrideRentalBlockErrors={overrideRentalBlockErrors}
          resource={resource}
          recurringMap={recurringMap}
          changedBaseBookingMap={changedBaseBookingMap}
          waitingAppliedBaseBookingIds={waitingAppliedBaseBookingIds}
          pendingMovedRecurringBookingMap={pendingMovedRecurringBookingMap}
          setEditingRentalBlock={this.props.setEditingRentalBlock}
          resourceRentalBlocks={resourceRentalBlocks}
          resourceDateRanges={resourceDateRanges}
          bookingsErr={bookingsErr}
        />
      </li>
    );
  }
}

export default connect(
  null,
  {
    bookingPanelUpdateResourceDetailAction,
    bookingPanelUpdateEventAction,
    fetchPrepCodeAsyncAction,
    bookingPanelTemplateUpdateIsNeedFillScheduleAction,
    bookingPanelSetTemplateAndApplyAction,
    bookingPanelClearErrAction
  }
)(EventResourceItem);

