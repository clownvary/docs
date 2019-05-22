import isNil from 'lodash/isNil';
import moment from 'moment';
import { getDaysInMonth, getDateKey, getEndOfDay } from '../common/utils';
import EventSeg from '../common/EventSeg';
import getSegSorter from '../common/getSegSorter';

const getDateInfo = (dateMap, date) => {
  const dateKey = getDateKey(date);
  dateMap[dateKey] = dateMap[dateKey] || {
    key: dateKey,
    levels: {},
    maxLevel: 0,
    segs: [],
    count: 0,
    more: 0,
    moreLevel: 0
  };

  return dateMap[dateKey];
};

const getAvailableLevel = (dateInfo) => {
  for (let i = 0; i < dateInfo.maxLevel; i += 1) {
    if (isNil(dateInfo.levels[i])) {
      return i;
    }
  }

  return dateInfo.maxLevel;
};

const addToDateInfo = (dateInfo, seg, master = false) => {
  dateInfo.levels[seg.level] = seg;
  dateInfo.maxLevel = Math.max(seg.level + 1, dateInfo.maxLevel);
  dateInfo.count += 1;

  if (master) {
    dateInfo.segs.push(seg);
    seg.owner = dateInfo;
  }
};

const reducer = (result, seg) => {
  const date = seg.start.clone();
  const dateInfo = getDateInfo(result, date);
  const level = getAvailableLevel(dateInfo);
  seg.level = level;

  addToDateInfo(dateInfo, seg, true);

  if (seg.isCrossDays && seg.span) {
    for (let i = 0; i < seg.span; i += 1) {
      date.add(1, 'days');
      const di = getDateInfo(result, date);
      addToDateInfo(di, seg);
    }
  }

  return result;
};

const buildSegs = (displayDate = moment(), resources, events, exclusiveMode, eventOrder) => {
  const dates = getDaysInMonth(displayDate);
  const monthStart = dates[0].clone().startOf('day');
  const monthEnd = getEndOfDay(dates[dates.length - 1], exclusiveMode);
  const monthDates = dates.map(d => ({
    value: d.clone(),
    key: getDateKey(d)
  }));

  const segResources = resources.map((resource) => {
    const resourceEvents = events.filter(event => event.resourceId === resource.id);
    const resourceSegs = resourceEvents.map((event, index) => {
      if (!event.start) {
        throw new Error(`The event ${event.resourceId} must have a start time.`);
      }

      const eventStart = moment(event.start);
      const eventEnd = event.end ? moment(event.end) : null;
      const isPrevMonthEvents = eventEnd ?
        eventEnd.isSameOrBefore(monthStart) : eventStart.isBefore(monthStart);
      const isNextMonthEvents = eventStart.isAfter(monthEnd);

      if (isPrevMonthEvents || isNextMonthEvents) {
        return false;
      }

      event.start = eventStart;
      event.end = eventEnd;

      const start = moment.max(monthStart, eventStart);
      const end = eventEnd ? moment.min(monthEnd, eventEnd) : null;
      const customBlockStyle = event.customBlockStyle;
      const customIconStyle = event.customIconStyle;
      const seg = new EventSeg(resource, event, start, end, index,
        exclusiveMode, eventOrder, customBlockStyle, customIconStyle);

      return seg;
    }).filter(seg => seg);

    const segSorter = getSegSorter(exclusiveMode);
    const crossSegs = resourceSegs.filter(seg => seg.isCrossDays).sort(segSorter);
    const allDaySegs = resourceSegs.filter(seg => seg.isAllDay).sort(segSorter);
    const otherSegs = resourceSegs.filter(seg => seg.type === 'short').sort(segSorter);

    let resourceDates = {};
    resourceDates = crossSegs.reduce(reducer, resourceDates);
    resourceDates = allDaySegs.reduce(reducer, resourceDates);
    resourceDates = otherSegs.reduce(reducer, resourceDates);

    return {
      ...resource,
      key: resource.id,
      events: resourceEvents,
      dates: resourceDates
    };
  });

  return { monthDates, segResources };
};

export default buildSegs;
