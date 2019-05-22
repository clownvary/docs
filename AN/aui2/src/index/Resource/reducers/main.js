import moment from 'moment';
import { fromJS } from 'immutable';
import Globalize from 'react-base-ui/lib/services/i18n';
import reducerHandler from 'shared/utils/reducerHandler';
import { getGlobalState, CALENDAR_VIEW_MONTH } from 'shared/utils/globalStateHelper';

import {
  MAIN_UPDATE_DATE_OF_DAY_AND_MONTH_VIEW,
  MAIN_UPDATE_LAST_DATE_OF_DAY_VIEW,
  MAIN_SWITCH_VIEW,
  MAIN_UPDATE_READY4CHECKOUT,
  MAIN_WINDOW_RESIZE
} from '../actions/main';

const getInitialState = () => {
  const { calendarView, calendarDayDate, calendarMonthDate } = getGlobalState();
  const isDayView = +calendarView !== CALENDAR_VIEW_MONTH;
  const calendarDate = isDayView ? calendarDayDate : calendarMonthDate;
  const startDate = Globalize.formatDate(calendarDate);
  const startDateMoment = moment(startDate);
  const lastDateOfDayView = isDayView ? '' : startDate;

  return fromJS({
    startDate,
    startDateMoment,
    lastDateOfDayView,
    isDayView,
    endDate: startDate,
    startDayOfMonthMoment: startDateMoment.clone().startOf('month'),
    endDayOfMonthMoment: startDateMoment.clone().endOf('month'),
    resize: 692,
    ready4Checkout: false
  });
};

const handlers = {
  [MAIN_WINDOW_RESIZE](state, { payload: { value } }) {
    return state.set('resize', value);
  },

  [MAIN_UPDATE_DATE_OF_DAY_AND_MONTH_VIEW](state, { payload: { date } }) {
    const startDateMoment = moment(date);
    const startDayOfMonthMoment = startDateMoment.clone().startOf('month');
    const endDayOfMonthMoment = startDateMoment.clone().endOf('month');

    return state.withMutations((s) => {
      s.set('startDate', date);
      s.set('endDate', date);
      s.set('startDateMoment', startDateMoment);
      s.set('startDayOfMonthMoment', startDayOfMonthMoment);
      s.set('endDayOfMonthMoment', endDayOfMonthMoment);
    });
  },

  [MAIN_UPDATE_LAST_DATE_OF_DAY_VIEW](state, { payload: { date } }) {
    return state.set('lastDateOfDayView', date);
  },

  [MAIN_SWITCH_VIEW](state, { payload: { isDayView } }) {
    return state.set('isDayView', isDayView);
  },

  [MAIN_UPDATE_READY4CHECKOUT](state, { payload: { ready4Checkout } }) {
    return state.set('ready4Checkout', ready4Checkout === 'true');
  }
};

export default function getMainReducer() {
  return reducerHandler(getInitialState(), handlers);
}
