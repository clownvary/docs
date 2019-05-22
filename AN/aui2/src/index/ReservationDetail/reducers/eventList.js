import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';
import { wrapEventIndex } from '../utils/eventKeymanager';
import {
  CONFIG_EVENT,
  SHOW_DETAIL,
  SHOW_UPDATED,
  FETCH_EVENT_DETAIL_SUCCESS,
  SET_EVENT_CONFIG,
  SET_EVENT_VALID_STATUS,
  SHOW_ALL_INVALID_EVENT_DETAIL,
  UPDATE_EVENT_SUMMARY,
  RESTORE_HAS_FETCHED_DETAIL,
  SET_NEEDS_CONFIRM_RESET
} from '../actions/eventList';

const allEventConfig = {};
const getInitialState = (initData) => {
  const initReservationDetail = initData.reservationDetail;
  const eventList = convertCasingPropObj(initReservationDetail).eventList;

  return fromJS({
    error: {},
    isShow: fromJS({}),
    isUpdated: fromJS({}),
    hasFetchedDetail: fromJS({}),
    allEventConfig: fromJS({}),
    eventValidStatus: {},
    needsConfirmReset: false,
    eventList
  });
};

const handlers = {

  [CONFIG_EVENT](state, { payload: { events } }) {
    const isShow = {};
    const isUpdated = {};
    const hasFetchedDetail = {};
    let key;
    events.forEach((item) => {
      key = wrapEventIndex(item.eventIndex);
      isShow[key] = false;
      isUpdated[key] = item.isBookingUpdated;
      hasFetchedDetail[key] = false;
    });

    return state.withMutations((s) => {
      s.set('isShow', fromJS(isShow));
      s.set('isUpdated', fromJS(isUpdated));
      s.set('hasFetchedDetail', fromJS(hasFetchedDetail));
    });
  },

  [SHOW_DETAIL](state, { payload: { eventIndex } }) {
    const isShow = state.get('isShow').toJS();
    isShow[wrapEventIndex(eventIndex)] = !isShow[wrapEventIndex(eventIndex)];

    return state.set('isShow', fromJS(isShow));
  },

  [SHOW_UPDATED](state, { payload: { eventIndex } }) {
    return state.setIn(['isUpdated', wrapEventIndex(eventIndex)], true);
  },

  [FETCH_EVENT_DETAIL_SUCCESS](state, { payload: { body: { event_detail } } }) {
    return state.withMutations((s) => {
      const isShow = s.get('isShow').toJS();
      const hasFetchedDetail = s.get('hasFetchedDetail').toJS();
      const eventIndex = event_detail.event_index;

      isShow[wrapEventIndex(eventIndex)] = true;
      hasFetchedDetail[wrapEventIndex(eventIndex)] = true;

      s.set('hasFetchedDetail', fromJS(hasFetchedDetail));
      s.set('isShow', fromJS(isShow));
    });
  },

  [SET_EVENT_CONFIG](state, { payload: { eventDetailConfig, eventIndex } }) {
    allEventConfig[wrapEventIndex(eventIndex)] = eventDetailConfig;
    return state.set('allEventConfig', fromJS(allEventConfig));
  },

  [SET_EVENT_VALID_STATUS](state, { payload: { eventIndex } }) {
    return state.setIn(['eventValidStatus', wrapEventIndex(eventIndex)], false);
  },

  [SHOW_ALL_INVALID_EVENT_DETAIL](state, { payload: { invalidEvents } }) {
    const isShow = {};
    invalidEvents.forEach((eventIndex) => {
      isShow[eventIndex] = true;
    });

    return state.set('isShow', fromJS(isShow));
  },

  [UPDATE_EVENT_SUMMARY](state, { payload: { eventInfo, eventIndex } }) {
    const eventIndexInList = state.get('eventList').findIndex(
      event => event.get('eventIndex') === eventIndex);
    return state.withMutations((s) => {
      s.setIn(['eventList', eventIndexInList, 'isEventUpdated'], eventInfo.isEventUpdated);
      s.setIn(['eventList', eventIndexInList, 'totalAmount'], eventInfo.totalAmount);
    });
  },

  [RESTORE_HAS_FETCHED_DETAIL](state, { payload: { eventIndex } }) {
    const index = wrapEventIndex(eventIndex);
    return state.withMutations((s) => {
      s.setIn(['isShow', index], false);
      s.setIn(['hasFetchedDetail', index], false);
    });
  },

  [SET_NEEDS_CONFIRM_RESET](state, { payload: { value } }) {
    return state.set('needsConfirmReset', value);
  }
};

export default function getEventListReducer(initData) {
  return reducerHandler(getInitialState(initData), handlers);
}
