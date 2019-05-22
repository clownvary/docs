import getSegSorter from 'src/components/ResourceCalendar/common/getSegSorter';
import { getEndOfDay } from 'src/utils';
import moment from 'moment';

describe('src/components/ResourceCalendar/common/getSegSorter', () => {

  it('getSegSorter should work well when start not same', () => {
    const segA = {
      start: moment('2018-09-21'),
      eventOrder: 'title'
    };
    const segB = {
      start: moment('2018-09-23'),
      eventOrder: 'title'
    };
    const result = getSegSorter(true)(segA, segB);
    const result2 = getSegSorter(true)(segB, segA);
    expect(result).toEqual(-1);
    expect(result2).toEqual(1);
  });
  it('getSegSorter should work well when start are same', () => {
    const segA = {
      start: moment('2018-09-21'),
      eventOrder: 'title'
    };
    const segB = {
      start: moment('2018-09-21'),
      eventOrder: 'title'
    };
    const result = getSegSorter(true)(segA, segB);
    expect(result).toEqual(0);
  });
  it('getSegSorter should work well when start are same and endtime not same', () => {
    const segA = {
      start: moment('2018-09-21'),
      end: moment('2018-09-23'),

      eventOrder: 'title'
    };
    const segB = {
      start: moment('2018-09-21'),
      end: moment('2018-09-24'),
      eventOrder: 'title'
    };
    const result = getSegSorter(true)(segA, segB);
    expect(result).toEqual(1);
    const result2 = getSegSorter(true)(segB, segA);
    expect(result2).toEqual(-1);
  });
});
