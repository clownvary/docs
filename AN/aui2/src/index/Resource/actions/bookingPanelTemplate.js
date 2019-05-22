import { is } from 'immutable';
import { formatBooking, formatEventResourceBooking } from '../utils/bookingHelper';
import { bookingTemplateState } from '../consts/bookingTemplate';
import { applySetupCleanupMinutesForRecurringBookings } from './bookingPanel';
import { bookingPanelCleanAttendanceError, getServerMessages, bookingPanelCleanDatetimeError } from './bookingPanelValidation';

export const BOOKINGPANELTEMPLATE_UPDATE_IS_NEED_FILL_SCHEDULE = 'BOOKINGPANELTEMPLATE_UPDATE_IS_NEED_FILL_SCHEDULE';
export const BOOKINGPANELTEMPLATE_SET_TEMPLATE = 'BOOKINGPANELTEMPLATE_SET_TEMPLATE';
export const BOOKINGPANELTEMPLATE_APPLY_TEMPLATE_TO_RESOURCE_AND_BOOKINGS = 'BOOKINGPANELTEMPLATE_APPLY_TEMPLATE_TO_RESOURCE_AND_BOOKINGS';
export const BOOKINGPANELTEMPLATE_DELETE = 'BOOKINGPANELTEMPLATE_DELETE';

export const bookingPanelTemplateUpdateIsNeedFillScheduleAction = isNeedFillSchedule => ({
  type: BOOKINGPANELTEMPLATE_UPDATE_IS_NEED_FILL_SCHEDULE,
  payload: {
    isNeedFillSchedule
  }
});

export const bookingPanelSetTemplateResourceAction = templateResourceID => ({
  type: BOOKINGPANELTEMPLATE_SET_TEMPLATE,
  payload: {
    templateResourceID
  }
});

const applySetupCleanupForBaseAndRecurringBookings =
(
  booking,
  resourceID,
  recurringMap,
  bookingPanelError,
  isSetupMinutesUpdated,
  isCleanupMinutesUpdated,
  templateSetupMinutes,
  templateCleanupMinutes
) => {
  const bookingID = booking.get('id');
  const setupMinutes = isSetupMinutesUpdated ? templateSetupMinutes : undefined;
  const cleanupMinutes = isCleanupMinutesUpdated ? templateCleanupMinutes : undefined;
  const newBook = formatBooking(
    formatEventResourceBooking(
      booking.toJS(),
      resourceID,
      setupMinutes,
      cleanupMinutes
    )
  );
  bookingPanelError = bookingPanelCleanDatetimeError(bookingPanelError, bookingID);
  [recurringMap, bookingPanelError] = applySetupCleanupMinutesForRecurringBookings(
    recurringMap, bookingPanelError, bookingID, resourceID, setupMinutes, cleanupMinutes
  );

  const finalBooking = booking.merge({
    ...newBook,
    ignoreClosetime: false,
    ignoreConflict: false,
    ignoreSkipdate: false
  });

  return {
    booking: finalBooking,
    recurringMap,
    bookingPanelError
  };
};

const getAppliedEventTypeIDResourceMap = (
  eventTypeMap,
  bookingPanelResourceMap,
  recurringMap,
  bookingPanelError,
  templateEventTypeID,
  templateEventTypesText,
  templatePrepCodeID,
  templateSetupMinutes,
  templateCleanupMinutes
) => {
  const appliedTemplateResourceMap = bookingPanelResourceMap.map((resource, resourceID) => {
    const hasAvailableBooking = resource.get('bookings').size;

    if (hasAvailableBooking) {
      const hasTemplateEventTypeID = eventTypeMap.get(resourceID)
        .some(type => type.get('id') === templateEventTypeID);

      return resource.withMutations((resourceDetails) => {
        let eventTypeNeedUpdate = false;
        let prepCodeNeedUpdate = false;
        let setUpNeedUpdate = false;
        let cleanUpNeedUpdate = false;
        let isSetupMinutesUpdated = false;
        let isCleanupMinutesUpdated = false;

        if (resourceDetails.get('eventTypeID') === -1) {
          eventTypeNeedUpdate = hasTemplateEventTypeID;
          prepCodeNeedUpdate = templatePrepCodeID > -1;
          setUpNeedUpdate = templateSetupMinutes > 0;
          cleanUpNeedUpdate = templateCleanupMinutes > 0;
        }

        if (eventTypeNeedUpdate) {
          resourceDetails.set('eventTypeID', templateEventTypeID);
          resourceDetails.set('eventType', templateEventTypesText);
        }

        if (resourceDetails.get('prepCodeID') <= 0 && prepCodeNeedUpdate) {
          resourceDetails.set('prepCodeID', templatePrepCodeID);
        }

        if (resourceDetails.get('setupMinutes') === 0 && setUpNeedUpdate) {
          isSetupMinutesUpdated = true;
          resourceDetails.set('setupMinutes', templateSetupMinutes);
        }

        if (resourceDetails.get('cleanupMinutes') === 0 && cleanUpNeedUpdate) {
          isCleanupMinutesUpdated = true;
          resourceDetails.set('cleanupMinutes', templateCleanupMinutes);
        }

        if (isSetupMinutesUpdated || isCleanupMinutesUpdated) {
          resourceDetails.set('bookings', resourceDetails.get('bookings')
            .map((booking) => {
              const result = applySetupCleanupForBaseAndRecurringBookings(
                booking,
                resourceID,
                recurringMap,
                bookingPanelError,
                isSetupMinutesUpdated,
                isCleanupMinutesUpdated,
                templateSetupMinutes,
                templateCleanupMinutes
              );
              recurringMap = result.recurringMap;
              bookingPanelError = result.bookingPanelError;
              return result.booking;
            }
          ));
        }
        return resourceDetails;
      });
    }

    return resource;
  });

  return [appliedTemplateResourceMap, recurringMap, bookingPanelError];
};

// update the prepCodeID, setupMinutes, cleanupMinutes
const getAppliedPrepCodeIDResourceMap = (
  bookingPanelResourceMap,
  recurringMap,
  bookingPanelError,
  templatePrepCodeID,
  templateSetupMinutes,
  templateCleanupMinutes
) => {
  const appliedTemplateResourceMap = bookingPanelResourceMap.map((resource, resourceID) => {
    const hasAvailableBooking = resource.get('bookings').size;

    if (hasAvailableBooking) {
      return resource.withMutations((resourceDetails) => {
        let isSetupMinutesUpdated = false;
        let isCleanupMinutesUpdated = false;

        if (resourceDetails.get('prepCodeID') <= 0) {
          resourceDetails.set('prepCodeID', templatePrepCodeID);
        }

        if (resourceDetails.get('setupMinutes') === 0) {
          isSetupMinutesUpdated = true;
          resourceDetails.set('setupMinutes', templateSetupMinutes);
        }

        if (resourceDetails.get('cleanupMinutes') === 0) {
          isCleanupMinutesUpdated = true;
          resourceDetails.set('cleanupMinutes', templateCleanupMinutes);
        }

        if (isSetupMinutesUpdated || isCleanupMinutesUpdated) {
          resourceDetails.set('bookings', resourceDetails.get('bookings')
            .map((booking) => {
              const result = applySetupCleanupForBaseAndRecurringBookings(
                booking,
                resourceID,
                recurringMap,
                bookingPanelError,
                isSetupMinutesUpdated,
                isCleanupMinutesUpdated,
                templateSetupMinutes,
                templateCleanupMinutes
              );
              recurringMap = result.recurringMap;
              bookingPanelError = result.bookingPanelError;
              return result.booking;
            }
          ));
        }
        return resourceDetails;
      });
    }

    return resource;
  });

  return [appliedTemplateResourceMap, recurringMap, bookingPanelError];
};

const getAppliedSetupMinutesResourceMap =
(bookingPanelResourceMap, recurringMap, bookingPanelError, templateSetupMinutes) => {
  const appliedTemplateResourceMap = bookingPanelResourceMap.map((resource, resourceID) => {
    const hasAvailableBooking = resource.get('bookings').size;

    if (hasAvailableBooking) {
      return resource.withMutations((resourceDetails) => {
        let isSetupMinutesUpdated = false;

        if (resourceDetails.get('setupMinutes') === 0) {
          isSetupMinutesUpdated = true;
          resourceDetails.set('setupMinutes', templateSetupMinutes);
        }

        if (isSetupMinutesUpdated) {
          resourceDetails.set('bookings', resourceDetails.get('bookings')
            .map((booking) => {
              const result = applySetupCleanupForBaseAndRecurringBookings(
                booking,
                resourceID,
                recurringMap,
                bookingPanelError,
                true,
                false,
                templateSetupMinutes
              );
              recurringMap = result.recurringMap;
              bookingPanelError = result.bookingPanelError;
              return result.booking;
            }
          ));
        }
        return resourceDetails;
      });
    }

    return resource;
  });

  return [appliedTemplateResourceMap, recurringMap, bookingPanelError];
};

const getAppliedCleanupMinutesResourceMap =
(bookingPanelResourceMap, recurringMap, bookingPanelError, templateCleanupMinutes) => {
  const appliedTemplateResourceMap = bookingPanelResourceMap.map((resource, resourceID) => {
    const hasAvailableBooking = resource.get('bookings').size;

    if (hasAvailableBooking) {
      return resource.withMutations((resourceDetails) => {
        let isCleanupMinutesUpdated = false;

        if (resourceDetails.get('cleanupMinutes') === 0) {
          isCleanupMinutesUpdated = true;
          resourceDetails.set('cleanupMinutes', templateCleanupMinutes);
        }

        if (isCleanupMinutesUpdated) {
          resourceDetails.set('bookings', resourceDetails.get('bookings')
            .map((booking) => {
              const result = applySetupCleanupForBaseAndRecurringBookings(
                booking,
                resourceID,
                recurringMap,
                bookingPanelError,
                false,
                true,
                undefined,
                templateCleanupMinutes
              );
              recurringMap = result.recurringMap;
              bookingPanelError = result.bookingPanelError;
              return result.booking;
            }
          ));
        }
        return resourceDetails;
      });
    }

    return resource;
  });
  return [appliedTemplateResourceMap, recurringMap, bookingPanelError];
};

const getAppliedAttendanceResourceMap = (
  bookingPanelResourceMap,
  recurringMap,
  bookingPanelError,
  configurationData,
  equipmentTemplate,
  templateAttendance
) => {
  const attendanceNeedUpdate = !equipmentTemplate;
  const appliedTemplateResourceMap = bookingPanelResourceMap.map((resource, resourceID) => {
    const hasAvailableBooking = resource.get('bookings').size;
    const resourceType = configurationData.getIn(['resourceMap', resourceID, 'resourceType']);
    const isResourceNotBeEquipment = resourceType === 0 || resourceType === 2;

    if (hasAvailableBooking) {
      return resource.withMutations((resourceDetails) => {
        if (attendanceNeedUpdate && templateAttendance > 0 && isResourceNotBeEquipment) {
          resourceDetails.set('bookings', resourceDetails.get('bookings')
            .map((booking) => {
              const bookingID = booking.get('id');
              let recurringBookings = recurringMap.getIn([bookingID, 'bookings']);

              if (recurringBookings && recurringBookings.size) {
                recurringBookings = recurringBookings.map((recurringBook) => {
                  if (!recurringBook.get('attendanceChanged')) {
                    bookingPanelError = bookingPanelCleanAttendanceError(
                      bookingPanelError, recurringBook.get('id')
                    );
                    return recurringBook.merge({
                      attendance: templateAttendance,
                      attendanceChanged: true,
                      ignoreConflict: false
                    });
                  }
                  return recurringBook;
                });

                recurringMap = recurringMap.setIn([bookingID, 'bookings'], recurringBookings);
              }

              if (!booking.get('attendanceChanged')) {
                bookingPanelError = bookingPanelCleanAttendanceError(
                  bookingPanelError, bookingID
                );
                return booking.merge({
                  attendance: templateAttendance,
                  attendanceChanged: true,
                  ignoreConflict: false
                });
              }

              return booking;
            }
          ));
        }
        return resourceDetails;
      });
    }

    return resource;
  });

  return [appliedTemplateResourceMap, recurringMap, bookingPanelError];
};

/**
 * @param {string} changedKey
 * changedKey is 'eventTypeID', 'prepCodeID', 'setupMinutes', 'cleanupMinutes', 'attendance'
 */
export const bookingPanelTemplateApplyAction = (templateResourceID, templateResource, changedKey) =>
  (dispatch, getState) => {
    const { configurationData, bookingPanel } = getState();
    const templateEventTypeID = templateResource.get('eventTypeID');
    const templateEventTypesText = templateResource.get('eventType');
    const templatePrepCodeID = templateResource.get('prepCodeID');
    const templateSetupMinutes = templateResource.get('setupMinutes');
    const templateCleanupMinutes = templateResource.get('cleanupMinutes');
    const templateAttendance = templateResource.getIn(['bookings', '0', 'attendance']);
    const originalBookingPanelError = bookingPanel.get('error');
    let recurringMap = bookingPanel.get('recurringMap');
    let bookingPanelError = originalBookingPanelError;
    const equipmentTemplate = configurationData.getIn(['resourceMap', templateResourceID, 'resourceType']) === 1;
    const bookingPanelResourceMap = bookingPanel.get('resourceMap');
    let appliedTemplateResourceMap = bookingPanelResourceMap;

    if (changedKey === 'eventTypeID') {
      [appliedTemplateResourceMap, recurringMap, bookingPanelError] =
        getAppliedEventTypeIDResourceMap(
          configurationData.get('eventTypeMap'),
          bookingPanelResourceMap,
          recurringMap,
          bookingPanelError,
          templateEventTypeID,
          templateEventTypesText,
          templatePrepCodeID,
          templateSetupMinutes,
          templateCleanupMinutes,
        );
    }

    if (changedKey === 'prepCodeID') {
      [appliedTemplateResourceMap, recurringMap, bookingPanelError] =
        getAppliedPrepCodeIDResourceMap(
          bookingPanelResourceMap,
          recurringMap,
          bookingPanelError,
          templatePrepCodeID,
          templateSetupMinutes,
          templateCleanupMinutes
        );
    }

    if (changedKey === 'setupMinutes') {
      [appliedTemplateResourceMap, recurringMap, bookingPanelError] =
        getAppliedSetupMinutesResourceMap(
          bookingPanelResourceMap, recurringMap, bookingPanelError, templateSetupMinutes
        );
    }

    if (changedKey === 'cleanupMinutes') {
      [appliedTemplateResourceMap, recurringMap, bookingPanelError] =
        getAppliedCleanupMinutesResourceMap(
          bookingPanelResourceMap, recurringMap, bookingPanelError, templateCleanupMinutes
        );
    }

    if (changedKey === 'attendance') {
      [appliedTemplateResourceMap, recurringMap, bookingPanelError] =
        getAppliedAttendanceResourceMap(
          bookingPanelResourceMap,
          recurringMap,
          bookingPanelError,
          configurationData,
          equipmentTemplate,
          templateAttendance
        );
    }

    if (changedKey === 'newBookings') {
      [appliedTemplateResourceMap, recurringMap] = getAppliedEventTypeIDResourceMap(
        configurationData.get('eventTypeMap'),
        bookingPanelResourceMap,
        recurringMap,
        bookingPanelError,
        templateEventTypeID,
        templateEventTypesText,
        templatePrepCodeID,
        templateSetupMinutes,
        templateCleanupMinutes,
      );

      [appliedTemplateResourceMap, recurringMap, bookingPanelError] =
        getAppliedAttendanceResourceMap(
          appliedTemplateResourceMap,
          recurringMap,
          bookingPanelError,
          configurationData,
          equipmentTemplate,
          templateAttendance
        );
    }

    if (!is(originalBookingPanelError, bookingPanelError)) {
      bookingPanelError = bookingPanelError.merge(getServerMessages(bookingPanelError));
    }

    dispatch({
      type: BOOKINGPANELTEMPLATE_APPLY_TEMPLATE_TO_RESOURCE_AND_BOOKINGS,
      payload: {
        resourceMap: appliedTemplateResourceMap,
        recurringMap,
        error: bookingPanelError
      }
    });
  };

export const bookingPanelSetTemplateAndApplyAction = (resourceID, changedKey, bookingID = -1) =>
  (dispatch, getState) => {
    const { bookingPanel } = getState();
    const template = bookingPanel.get('template');
    const resourceOrders = bookingPanel.get('resourceOrders');
    const resourceMap = bookingPanel.get('resourceMap');
    const templateState = template.get('state');
    // We are changing the eventType, eventTypeID, prepCodeID, setupMinutes, cleanupMinutes
    const isChangeResourceInfo = bookingID === -1;
    const firstBookingID = resourceMap.getIn([resourceID, 'bookings', '0', 'id']);
    const isChangeFirstBooking = firstBookingID === bookingID;
    const templateResource = resourceMap.get(resourceID);
    let shouldApplyTheTemplate = false;

    if (templateState === bookingTemplateState.NO_TEMPLATE) {
      const isChangeFirstResource = +resourceOrders.get('0') === +resourceID;

      if (isChangeFirstResource && (isChangeFirstBooking || isChangeResourceInfo)) {
        dispatch(bookingPanelSetTemplateResourceAction(resourceID));
        shouldApplyTheTemplate = true;
      }
    } else if (templateState === bookingTemplateState.HAS_TEMPLATE) {
      const templateResourceID = template.get('resourceID');
      const isChangeTemplateResource = +templateResourceID === +resourceID;

      if (isChangeTemplateResource && (isChangeResourceInfo || isChangeFirstBooking)) {
        shouldApplyTheTemplate = true;
      }
    }

    if (shouldApplyTheTemplate) {
      dispatch(bookingPanelTemplateApplyAction(resourceID, templateResource, changedKey));
    }
  };

export const bookingPanelDeleteTemplateAction = () => ({
  type: BOOKINGPANELTEMPLATE_DELETE
});
