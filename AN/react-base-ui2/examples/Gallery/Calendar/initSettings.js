
import moment from 'moment';
import { FirstDayOfWeek, SelectionMode, TodayBehavior } from 'src/components/Calendar/consts';
import { createOptionPropSpec, createMomentPropSpec, createBooleanPropSpec } from '../../App/utils/createPropSpec';

const initSettings = {
  firstDayOfWeek: createOptionPropSpec('firstDayOfWeek', 'First Day of Week', FirstDayOfWeek.SUNDAY, FirstDayOfWeek, true),
  selectMode: createOptionPropSpec('selectMode', 'Select Mode', SelectionMode.SINGLE, SelectionMode),
  todayBehavior: createOptionPropSpec('todayBehavior', 'Today Behavior', TodayBehavior.DISPLAY, TodayBehavior, true),
  min: createMomentPropSpec('min', 'Min Date', moment(new Date(1900, 0, 1))),
  max: createMomentPropSpec('max', 'Max Date', moment(new Date(2099, 11, 31))),
  value: createMomentPropSpec('value', 'Value', moment().add(2, 'days')),
  displayToday: createBooleanPropSpec('displayToday', 'Display Today', true),
  monthMode: createBooleanPropSpec('monthMode', 'Month Mode', false)
};

export default initSettings;
