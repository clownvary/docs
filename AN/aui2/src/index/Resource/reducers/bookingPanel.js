import { fromJS } from 'immutable';
import isUndefined from 'lodash/isUndefined';
import reducerHandler from 'shared/utils/reducerHandler';
import { bookingTemplateState } from '../consts/bookingTemplate';
import {
  BOOKINGPANEL_UPDATE_EVENT,
  BOOKINGPANEL_UPDATE_PEENDING_BOOKING_STATUS,
  BOOKINGPANEL_UPDATE_BOOKING_LIMITATION_CONTENT,
  BOOKINGPANEL_SHOW,
  BOOKINGPANEL_ADD_CHANGED_BASE_BOOKING,
  BOOKINGPANEL_DELETE_CHANGED_BASE_BOOKING,
  BOOKINGPANEL_RESET_RESOURCE_MAP,
  BOOKINGPANEL_ADD_RESOURCES_TO_RESOURCE_MAP,
  BOOKINGPANEL_UPDATE_RESOURCE_AND_BOOKINGS,
  BOOKINGPANEL_RESET_OVERRIDE_RENTAL_BLOCK,
  BOOKINGPANEL_SET_OVERRIDE_RENTAL_BLOCK,
  BOOKINGPANEL_UPDATE_SELECTED_RESOURCES
} from '../actions/bookingPanel';
import {
  BOOKINGPANEL_ADD_WAITING_APPLIED_BASEBOOKINGIDS,
  BOOKINGPANEL_DELETE_WAITING_APPLIED_BASEBOOKINGIDS,
  BOOKINGPANEL_SET_RECURRING_BOOKING_EXPANDED,
  BOOKINGPANEL_SET_RECURRING_BOOKINGS,
  BOOKINGPANEL_APPLY_RECURRING_BOOKINGS_SUCCESS,
  BOOKINGPANEL_APPLY_RECURRING_BOOKINGS_FAIL,
  BOOKINGPANEL_CONVERT_RECURRING_BOOKING_TO_NORMAL_BOOKING,
  BOOKINGPANEL_FLUSH_ALL_RECURRING_BOOKINGS_AFTER_BOOKING_PANEL_CLOSED
} from '../actions/bookingPanelRecurring';
import {
  BOOKINGPANELTEMPLATE_UPDATE_IS_NEED_FILL_SCHEDULE,
  BOOKINGPANELTEMPLATE_SET_TEMPLATE,
  BOOKINGPANELTEMPLATE_APPLY_TEMPLATE_TO_RESOURCE_AND_BOOKINGS,
  BOOKINGPANELTEMPLATE_DELETE
} from '../actions/bookingPanelTemplate';
import {
  BOOKINGPANEL_DELETE_NORMAL_BOOKING,
  BOOKINGPANEL_DELETE_RECURRING_BOOKING,
  BOOKINGPANEL_DELETE_ALL_BOOKINGS,
  BOOKINGPANEL_DELETE_SET_CLEAR_RECURRING,
  BOOKINGPANEL_DELETE_BASE_BOOKING,
  BOOKINGPANEL_DELETE_BASE_AND_RECURRING_BOOKINGS,
  BOOKINGPANEL_DELETE_ALL_CONFLICTS_AND_CONFLICT_ERRORS
} from '../actions/bookingPanelDelete';
import {
  BOOKINGPANEL_VALIDATION_SET_CLIENT_ERRORS,
  BOOKINGPANEL_VALIDATION_UPDATE_ERROR,
  BOOKINGPANEL_VALIDATION_SET_SERVER_ERRORS,
  BOOKINGPANEL_VALIDATION_UPDATE_BOOKINGS_OVERRIDE_STATUS
} from '../actions/bookingPanelValidation';

const initialState = fromJS({
  display: false,
  /**
   * Fix ANE-90042
   * The Fullcalendar must been rendered when resources has ready,
   * but the resourceFilters.selected only refer to the resources been selected
   * not the detail been fetched, so need another loadedResourceIDs to
   * indicate the resource details has been ready
   */
  loadedResourceIDs: [],
  deleteBookings: [],
  resourceMap: {},
  recurringMap: {},
  changedBaseBookingMap: {},
  pendingMovedRecurringBookingMap: {},
  waitingAppliedBaseBookingIds: [],
  resourceOrders: [],
  hasPendingBookingWhenIntoResouce: false, // same as backFromPermitDetailPage
  bookingLimitToastContent: '',
  eventName: '',
  scheduleTypeID: -1,
  template: {
    state: bookingTemplateState.NO_TEMPLATE,
    resourceID: -1,
    isNeedFillSchedule: true
  },
  recurringClear: {
    visible: false,
    resourceID: -1,
    bookingID: -1,
    clearAll: true
  },
  isBookingChanged: false,
  error: {
    clientMessages: [],
    serverMessages: []
  }
});

const handlers = {
  [BOOKINGPANEL_UPDATE_SELECTED_RESOURCES](state, { payload: { loadedResourceIDs } }) {
    return state.set('loadedResourceIDs', loadedResourceIDs);
  },

  [BOOKINGPANEL_UPDATE_EVENT](state, { payload: { bookingPanelEvent, isBookingChanged } }) {
    const { eventName, scheduleTypeID, scheduleType } = bookingPanelEvent;
    return state.withMutations((s) => {
      if (!isUndefined(eventName)) {
        s.set('eventName', eventName);
      }

      if (!isUndefined(scheduleTypeID)) {
        s.set('scheduleTypeID', scheduleTypeID);
        s.set('scheduleType', scheduleType);
      }
      s.set('isBookingChanged', isBookingChanged);
    });
  },

  [BOOKINGPANEL_UPDATE_PEENDING_BOOKING_STATUS](state) {
    return state.set('hasPendingBookingWhenIntoResouce', true);
  },

  [BOOKINGPANEL_UPDATE_BOOKING_LIMITATION_CONTENT](state, { payload: { content } }) {
    return state.set('bookingLimitToastContent', content);
  },

  [BOOKINGPANEL_SHOW](state, { payload: {
    isShowBookingPanel, resourceMap, resourceOrders, recurringMap } }) {
    return state.withMutations((s) => {
      s.set('display', isShowBookingPanel);
      if (isShowBookingPanel) {
        s.set('resourceMap', resourceMap);
        s.set('recurringMap', recurringMap);
        s.set('resourceOrders', resourceOrders);
      }
    });
  },

  [BOOKINGPANEL_RESET_RESOURCE_MAP](
    state,
    {
      payload: {
        resourceMap,
        recurringMap
      }
    }
  ) {
    return state.withMutations((s) => {
      s.set('resourceMap', resourceMap);
      s.set('recurringMap', recurringMap);
    });
  },

  [BOOKINGPANEL_ADD_RESOURCES_TO_RESOURCE_MAP](
    state, { payload: { resourceMap } }) {
    return state.withMutations((s) => {
      s.set('resourceMap', resourceMap);
      s.set('isBookingChanged', true);
    });
  },

  [BOOKINGPANEL_UPDATE_RESOURCE_AND_BOOKINGS](
    state,
    {
      payload: {
        resourceID,
        resource,
        recurringMap,
        error,
        pendingMovedRecurringBookingMap,
        changedBaseBookingMap,
        deleteBookings,
        waitingAppliedBaseBookingIds
      }
    }
  ) {
    return state.withMutations((s) => {
      s.setIn(['resourceMap', resourceID], resource);
      s.set('isBookingChanged', true);
      s.set('recurringMap', recurringMap);
      if (pendingMovedRecurringBookingMap) {
        s.set('pendingMovedRecurringBookingMap', pendingMovedRecurringBookingMap);
      }
      if (changedBaseBookingMap) {
        s.set('changedBaseBookingMap', changedBaseBookingMap);
      }
      if (deleteBookings) {
        s.set('deleteBookings', deleteBookings);
      }
      if (waitingAppliedBaseBookingIds) {
        s.set('waitingAppliedBaseBookingIds', waitingAppliedBaseBookingIds);
      }
      if (!isUndefined(error)) {
        s.set('error', error);
      }
    });
  },

  [BOOKINGPANEL_RESET_OVERRIDE_RENTAL_BLOCK](
    state, { payload: { resourceID, resource, recurringMap } }) {
    return state.withMutations((s) => {
      s.setIn(['resourceMap', resourceID], resource);
      s.set('recurringMap', recurringMap);
    });
  },

  [BOOKINGPANEL_SET_OVERRIDE_RENTAL_BLOCK](
    state, { payload: { resourceID, resource, recurringMap } }) {
    return state.withMutations((s) => {
      s.setIn(['resourceMap', resourceID], resource);
      s.set('isBookingChanged', true);
      s.set('recurringMap', recurringMap);
    });
  },

  [BOOKINGPANEL_DELETE_NORMAL_BOOKING](
    state, { payload: { deleteBookings, resourceMap, resourceOrders } }) {
    return state.withMutations((s) => {
      s.set('resourceMap', resourceMap);
      s.set('deleteBookings', deleteBookings);
      s.set('resourceOrders', resourceOrders);
      s.set('isBookingChanged', true);
    });
  },

  [BOOKINGPANEL_DELETE_RECURRING_BOOKING](
    state, {
      payload: {
        resourceMap,
        recurringMap,
        deleteBookings,
        pendingMovedRecurringBookingMap
      }
    }
  ) {
    return state.withMutations((s) => {
      s.set('resourceMap', resourceMap);
      s.set('recurringMap', recurringMap);
      s.set('deleteBookings', deleteBookings);
      s.set('pendingMovedRecurringBookingMap', pendingMovedRecurringBookingMap);
      s.set('isBookingChanged', true);
    });
  },

  [BOOKINGPANEL_DELETE_BASE_BOOKING](
    state,
    {
      payload: {
        resourceMap,
        recurringMap,
        deleteBookings,
        changedBaseBookingMap,
        waitingAppliedBaseBookingIds,
        pendingMovedRecurringBookingMap
      }
    }
  ) {
    return state.withMutations((s) => {
      s.set('resourceMap', resourceMap);
      s.set('recurringMap', recurringMap);
      s.set('deleteBookings', deleteBookings);
      s.set('changedBaseBookingMap', changedBaseBookingMap);
      s.set('waitingAppliedBaseBookingIds', waitingAppliedBaseBookingIds);
      s.set('pendingMovedRecurringBookingMap', pendingMovedRecurringBookingMap);
      s.set('isBookingChanged', true);
    });
  },

  [BOOKINGPANEL_DELETE_BASE_AND_RECURRING_BOOKINGS](
    state, {
      payload: {
        deleteBookings,
        resourceMap,
        recurringMap,
        resourceOrders,
        changedBaseBookingMap,
        waitingAppliedBaseBookingIds,
        pendingMovedRecurringBookingMap
      }
    }
  ) {
    return state.withMutations((s) => {
      s.set('resourceMap', resourceMap);
      s.set('recurringMap', recurringMap);
      s.set('deleteBookings', deleteBookings);
      s.set('resourceOrders', resourceOrders);
      s.set('changedBaseBookingMap', changedBaseBookingMap);
      s.set('waitingAppliedBaseBookingIds', waitingAppliedBaseBookingIds);
      s.set('pendingMovedRecurringBookingMap', pendingMovedRecurringBookingMap);
      s.set('isBookingChanged', true);
    });
  },
  [BOOKINGPANEL_DELETE_ALL_CONFLICTS_AND_CONFLICT_ERRORS](
    state, {
      payload: {
        deleteBookings,
        resourceMap,
        recurringMap,
        resourceOrders,
        changedBaseBookingMap,
        waitingAppliedBaseBookingIds,
        pendingMovedRecurringBookingMap,
        error
      }
    }
  ) {
    return state.withMutations((s) => {
      s.set('resourceMap', resourceMap);
      s.set('recurringMap', recurringMap);
      s.set('deleteBookings', deleteBookings);
      s.set('resourceOrders', resourceOrders);
      s.set('changedBaseBookingMap', changedBaseBookingMap);
      s.set('waitingAppliedBaseBookingIds', waitingAppliedBaseBookingIds);
      s.set('pendingMovedRecurringBookingMap', pendingMovedRecurringBookingMap);
      s.set('error', error);
      s.set('isBookingChanged', true);
    });
  },

  [BOOKINGPANEL_DELETE_ALL_BOOKINGS](state) {
    return state.withMutations((s) => {
      s.set('resourceMap', fromJS({}));
      s.set('recurringMap', fromJS({}));
      s.set('eventName', '');
      s.set('scheduleTypeID', -1);
      s.set('scheduleType', '');
      s.setIn(['template', 'resourceID'], -1);
      if (s.getIn(['template', 'state']) === bookingTemplateState.HAS_TEMPLATE) {
        s.setIn(['template', 'state'], bookingTemplateState.DELETED);
      }
      s.setIn(['template', 'isNeedFillSchedule'], true);
      s.set('isBookingChanged', true);
      s.set('deleteBookings', fromJS([]));
      s.set('resourceOrders', fromJS([]));
      s.set('changedBaseBookingMap', fromJS({}));
      s.set('pendingMovedRecurringBookingMap', fromJS({}));
      s.set('waitingAppliedBaseBookingIds', fromJS([]));
    });
  },

  [BOOKINGPANEL_DELETE_SET_CLEAR_RECURRING](state, { payload: { value } }) {
    return state.set('recurringClear', state.get('recurringClear').merge(value));
  },

  [BOOKINGPANEL_SET_RECURRING_BOOKINGS](state, { payload: { resourceMap, recurringMap } }) {
    return state.withMutations((s) => {
      s.set('resourceMap', resourceMap);
      s.set('recurringMap', recurringMap);
      s.set('isBookingChanged', true);
    });
  },

  [BOOKINGPANEL_SET_RECURRING_BOOKING_EXPANDED](state, { payload: { bookingId, expanded } }) {
    return state.setIn(
      ['recurringMap', bookingId, 'expanded'], expanded
    );
  },

  [BOOKINGPANELTEMPLATE_UPDATE_IS_NEED_FILL_SCHEDULE](state, { payload: { isNeedFillSchedule } }) {
    return state.setIn(['template', 'isNeedFillSchedule'], isNeedFillSchedule);
  },

  [BOOKINGPANELTEMPLATE_SET_TEMPLATE](state, { payload: { templateResourceID } }) {
    return state.withMutations((s) => {
      s.setIn(['template', 'resourceID'], templateResourceID);
      s.setIn(['template', 'state'], bookingTemplateState.HAS_TEMPLATE);
    });
  },

  [BOOKINGPANELTEMPLATE_DELETE](state) {
    return state.withMutations((s) => {
      s.setIn(['template', 'resourceID'], -1);
      s.setIn(['template', 'state'], bookingTemplateState.DELETED);
    });
  },

  [BOOKINGPANELTEMPLATE_APPLY_TEMPLATE_TO_RESOURCE_AND_BOOKINGS](
    state, { payload: { resourceMap, recurringMap, error } }) {
    return state.withMutations((s) => {
      s.set('recurringMap', recurringMap);
      s.set('resourceMap', resourceMap);
      s.set('error', error);
    });
  },

  [BOOKINGPANEL_VALIDATION_SET_CLIENT_ERRORS](state, { payload: { recurringMap, error } }) {
    return state.withMutations((s) => {
      s.set('recurringMap', recurringMap);
      s.set('error', error);
    });
  },
  [BOOKINGPANEL_VALIDATION_UPDATE_ERROR](state, { payload: { error } }) {
    return state.set('error', error);
  },

  [BOOKINGPANEL_VALIDATION_SET_SERVER_ERRORS](state, { payload: { error, recurringMap } }) {
    return state.withMutations((s) => {
      s.set('recurringMap', recurringMap);
      s.set('error', error);
    });
  },

  [BOOKINGPANEL_VALIDATION_UPDATE_BOOKINGS_OVERRIDE_STATUS](
    state, { payload: { recurringMap, resourceMap, error } }) {
    return state.withMutations((s) => {
      s.set('recurringMap', recurringMap);
      s.set('resourceMap', resourceMap);
      s.set('error', error);
    });
  },

  [BOOKINGPANEL_ADD_CHANGED_BASE_BOOKING](
    state, { payload }
  ) {
    const changedBaseBookingMap = state.get('changedBaseBookingMap');
    return state.set('changedBaseBookingMap', changedBaseBookingMap.merge(payload));
  },

  [BOOKINGPANEL_DELETE_CHANGED_BASE_BOOKING](
    state, { payload: { id } }
  ) {
    const changedBaseBookingMap = state.get('changedBaseBookingMap');
    return state.set('changedBaseBookingMap', changedBaseBookingMap.delete(id));
  },

  [BOOKINGPANEL_ADD_WAITING_APPLIED_BASEBOOKINGIDS](
    state, { payload: { ids } }
  ) {
    const waitingAppliedBaseBookingIds = state.get('waitingAppliedBaseBookingIds');
    return state.set('waitingAppliedBaseBookingIds', waitingAppliedBaseBookingIds.toSet().union(ids));
  },

  [BOOKINGPANEL_DELETE_WAITING_APPLIED_BASEBOOKINGIDS](
    state, { payload: { ids } }
  ) {
    const waitingAppliedBaseBookingIds = state.get('waitingAppliedBaseBookingIds');
    return state.set(
      'waitingAppliedBaseBookingIds',
      waitingAppliedBaseBookingIds.filter(id => !ids.some(_id => _id === id))
    );
  },

  [BOOKINGPANEL_CONVERT_RECURRING_BOOKING_TO_NORMAL_BOOKING](
    state,
    {
      payload: {
        resourceMap,
        recurringMap,
        pendingMovedRecurringBookingMap
      }
    }
  ) {
    return state.withMutations((s) => {
      s.set('resourceMap', resourceMap);
      s.set('recurringMap', recurringMap);
      s.set('pendingMovedRecurringBookingMap', pendingMovedRecurringBookingMap);
    });
  },

  [BOOKINGPANEL_APPLY_RECURRING_BOOKINGS_SUCCESS](
    state,
    {
      payload: {
        resourceMap,
        recurringMap,
        changedBaseBookingMap,
        waitingAppliedBaseBookingIds,
        error
      }
    }
  ) {
    return state.withMutations((s) => {
      s.set('resourceMap', resourceMap);
      s.set('recurringMap', recurringMap);
      s.set('changedBaseBookingMap', changedBaseBookingMap);
      s.set('waitingAppliedBaseBookingIds', waitingAppliedBaseBookingIds);
      s.set('error', error);
      s.set('isBookingChanged', true);
    });
  },

  [BOOKINGPANEL_APPLY_RECURRING_BOOKINGS_FAIL](
    state, { payload: { /* errorMessage, */ waitingAppliedBaseBookingIds } }
  ) {
    return state.withMutations((s) => {
      s.set('waitingAppliedBaseBookingIds', waitingAppliedBaseBookingIds);
      // s.set('error', errorMessage);
    });
  },

  [BOOKINGPANEL_FLUSH_ALL_RECURRING_BOOKINGS_AFTER_BOOKING_PANEL_CLOSED](
    state,
    {
      payload: {
        resourceMap,
        recurringMap,
        deleteBookings,
        changedBaseBookingMap,
        pendingMovedRecurringBookingMap,
        waitingAppliedBaseBookingIds
      }
    }
  ) {
    return state.withMutations((s) => {
      s.set('resourceMap', resourceMap);
      s.set('recurringMap', recurringMap);
      s.set('deleteBookings', deleteBookings);
      s.set('changedBaseBookingMap', changedBaseBookingMap);
      s.set('pendingMovedRecurringBookingMap', pendingMovedRecurringBookingMap);
      s.set('waitingAppliedBaseBookingIds', waitingAppliedBaseBookingIds);
    });
  }
};

export default reducerHandler(initialState, handlers);
