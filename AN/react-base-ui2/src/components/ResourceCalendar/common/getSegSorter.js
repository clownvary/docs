import isNil from 'lodash/isNil';
import { getEndOfDay } from './utils';

const getEndTime = (seg, exclusiveMode) => {
  if (isNil(seg.end)) {
    return getEndOfDay(seg.start, exclusiveMode);
  }
  return seg.end;
};

const getSegSorter = exclusiveMode => (a, b) => {
  if (a.start.isSame(b.start)) {
    const endA = getEndTime(a, exclusiveMode);
    const endB = getEndTime(b, exclusiveMode);
    if (endA.isSame(endB)) {
      return a.eventOrder.localeCompare(b.eventOrder);
    }
    return endA.isBefore(endB) ? 1 : -1;
  }
  return a.start.isBefore(b.start) ? -1 : 1;
};

export default getSegSorter;
