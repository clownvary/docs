import React from 'react';
import UIComponent from 'shared/components/UIComponent';
import EventResourceItem from './EventResourceItem';

export default class EventResource extends UIComponent {
  shouldComponentUpdate(nextProps) { // ANE-85173
    if (!this.props.display && !nextProps.display) {
      return false;
    }
    return true;
  }

  render() {
    const {
      isNeedFillSchedule,
      configurationData,
      bookingPanelResourceMap,
      bookingPanelRecurringMap,
      changedBaseBookingMap,
      waitingAppliedBaseBookingIds,
      pendingMovedRecurringBookingMap,
      resourceOrders,
      resourcesErr,
      bookingsErr
    } = this.props;
    const cleanUps = configurationData.get('cleanUps');
    const setUps = configurationData.get('setUps');
    const prepCodes = configurationData.get('prepCodes');
    const resourceMap = configurationData.get('resourceMap');
    const rentalBlockMap = configurationData.get('rentalBlockMap');
    const definedDateRangeMap = configurationData.get('definedDateRangeMap');
    const eventTypeMap = configurationData.get('eventTypeMap');
    const scheduleTypes = configurationData.get('scheduleTypes');
    const firstResourceID = resourceOrders.get(0);

    return (
      <section className="section-details">
        <ul className={`detail-list ${resourceOrders.size > 0 ? '' : 'no-item'}`}>
          {
            resourceOrders.size > 0 ?
              (resourceOrders.map((resourceID) => {
                const resourceError = resourcesErr && resourcesErr.get(resourceID);
                const recurringMap = bookingPanelRecurringMap
                  .filter(b => String(b.get('resourceID')) === resourceID);

                return (
                  <EventResourceItem
                    key={`event-resource-item-${resourceID}`}
                    resourceID={`${resourceID}`}
                    resource={resourceMap.get(resourceID)}
                    recurringMap={recurringMap}
                    changedBaseBookingMap={changedBaseBookingMap}
                    waitingAppliedBaseBookingIds={waitingAppliedBaseBookingIds}
                    pendingMovedRecurringBookingMap={pendingMovedRecurringBookingMap}
                    bookingPanelResource={bookingPanelResourceMap.get(resourceID)}
                    prepCodeList={prepCodes}
                    setUpList={setUps}
                    cleanUpList={cleanUps}
                    isNeedFillSchedule={isNeedFillSchedule}
                    resourceRentalBlocks={rentalBlockMap.get(resourceID)}
                    resourceDateRanges={definedDateRangeMap.get(resourceID)}
                    resourceEventTypes={eventTypeMap.get(resourceID)}
                    setEditingRentalBlock={this.props.setEditingRentalBlock}
                    scheduleTypes={scheduleTypes}
                    firstResourceID={firstResourceID}
                    resourceError={resourceError}
                    bookingsErr={bookingsErr}
                  />
                );
              }))
              : (<li className="detail-item">No reservation items.</li>)
          }
        </ul>
      </section>
    );
  }
}
