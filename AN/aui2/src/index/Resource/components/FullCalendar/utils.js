
import moment from 'moment';
import DateTimeFormat from 'shared/utils/DateTimeFormat';

const {
  permitStartEventDate,
  dateFormat,
  currentDate,
  currentTime,
  permit_label: permitLabel,
  activity_label: activityLabel,
  daycare_label: daycareLabel,
  company_label: companyLabel
} = window.__resourceCalender__.__initialState__;

export const START_EVENT_DATE = permitStartEventDate;
export const DATE_FORMAT = dateFormat;

export const CURRENT_DATE = currentDate;
export const CURRENT_TIME = currentTime;

export const PERMIT_LABEL = permitLabel;
export const ACTIVITY_LABEL = activityLabel;
export const DAYCARE_LABEL = daycareLabel;
export const COMPANY_LABEL = companyLabel;

export const CURRENT_SERVER_DATE_TIME = DateTimeFormat.parseDateTime(`${CURRENT_DATE} ${CURRENT_TIME}`);

export const bookingHelper = {
  list: new Map(),
  /**
   * @type {Jquery Object}
   */
  alllistDoms: null,
  /**
   * @type {boolean}
   * @desc Determines the selection booking action.
   * - true= SINGLE
   * - false= MULTIPLE
   */
  selectSingle: true,

  addItem(key, domValue) {
    this.list.set(key, domValue);
    domValue.addClass('is-selected');
    return this;
  },

  deleteItem(key) {
    this.list.get(key).removeClass('is-selected');
    this.list.delete(key);
    return this;
  },

  clear() {
    this.list.clear();
    if (this.alllistDoms) {
      this.alllistDoms.find('.is-selected').removeClass('is-selected');
    }
    return this;
  },

  setRootDom($el) {
    this.alllistDoms = $el;
    return this;
  },

  get events() {
    return [...this.list.keys()];
  },
 // Single selection action;
  select(key, domValue) {
    if (this.selectSingle) {
      this.clear();
      this.addItem(key, domValue);
      return this;
    }
    if (this.list.has(key)) {
      this.deleteItem(key);
    } else {
      this.addItem(key, domValue);
    }
    return this;
  }
};

export const createCalendarTimer = (startTime = CURRENT_SERVER_DATE_TIME) => {
  const latestTime = moment(startTime);
  let timer = null;

  const start = () => {
    timer = setInterval(() => {
      latestTime.add(1, 's');
    }, 1000);
  };

  const stop = () => {
    if (timer) {
      clearInterval(timer);
    }
  };

  const getTime = () => latestTime;

  return {
    start,
    stop,
    getTime
  };
};
