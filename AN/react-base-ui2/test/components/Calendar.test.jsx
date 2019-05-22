import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import moment from 'moment';

import { Calendar, SelectionMode } from 'src/components/Calendar';

const today = '2018/10/20';

const defaultProps = {
  prefixCls: 'an-',
  today: moment(today),
  firstDayOfWeek: moment().localeData().firstDayOfWeek(),
  minDate: moment(new Date(1900, 1, 1)),
  maxDate: moment(new Date(2099, 12, 31)),
  disabledDates: [3, 4, 5, 6].map(c => moment(today).add(c, 'days')),
  selectMode: SelectionMode.SINGLE,
  value: [moment(today).add(2, 'days')],
  valueChanged: expect.createSpy()
};

const setup = (props = {}) => {
  const newProps = { ...defaultProps, ...props };
  const wrapper = mount(<Calendar {...newProps} />);
  const { prefixCls } = newProps;

  return {
    calendar: wrapper,
    header: wrapper.find(`.${prefixCls}calendar-header`),
    headerPrev: wrapper.find('.icon-chevron-left'),
    headerNext: wrapper.find('.icon-chevron-right'),
    headerToday: wrapper.find(`.${prefixCls}calendar-header-today`),
    headerTitle: wrapper.find(`.${prefixCls}calendar-header-title`),
    table: wrapper.find(`.${prefixCls}calendar-table`),
    dateTableHeaderCells: wrapper.find(`.${prefixCls}calendar-table-header-cell`),
    dateTableBodyCells: wrapper.find(`.${prefixCls}calendar-table-cell`),
    dateTableBodyCellsToday: wrapper.find(`.${prefixCls}calendar-day-today`),
    dateTableBodyCellsSelected: wrapper.find(`.${prefixCls}calendar-day-selected`),
    dateTableBodyCellsDisabled: wrapper.find(`.${prefixCls}calendar-day-disable`),
    monthTableCells: wrapper.find(`.${prefixCls}calendar-month`),
    monthTableCellsSelected: wrapper.find(`.${prefixCls}calendar-month-selected`),
    yearTableCells: wrapper.find(`.${prefixCls}calendar-year`),
    yearTableCellsSelected: wrapper.find(`.${prefixCls}calendar-year-selected`),
    props: newProps
  };
};

test('Calendar renders Successfully in default mode', () => {
  const {
    calendar,
    header,
    table,
    props,
    dateTableBodyCellsToday,
    dateTableBodyCellsSelected,
    dateTableBodyCellsDisabled,
    headerPrev,
    headerNext,
    headerToday,
    headerTitle,
    dateTableHeaderCells
  } = setup();

  expect(calendar.length).toEqual(1);
  expect(header.length).toEqual(1);
  expect(table.length).toEqual(1);

  expect(dateTableHeaderCells.length).toEqual(7);

  expect(dateTableBodyCellsToday.length).toEqual(1);
  expect(dateTableBodyCellsToday.text()).toEqual(props.today.format('D'));

  expect(dateTableBodyCellsSelected.length).toEqual(props.value.length);
  expect(dateTableBodyCellsSelected.text()).toEqual(props.value[0].format('D'));

  expect(dateTableBodyCellsDisabled.length).toEqual(props.disabledDates.length);
  expect(dateTableBodyCellsDisabled.map(cell => cell.text())).toEqual(props.disabledDates.map(d => d.format('D')));

  dateTableBodyCellsToday.simulate('click');
  expect(props.valueChanged).toHaveBeenCalled();

  expect(headerPrev.length).toEqual(1);
  expect(headerNext.length).toEqual(1);
  expect(headerToday.length).toEqual(1);
  expect(headerTitle.length).toEqual(1);

  const today = props.today.clone();

  expect(calendar.find(`.${props.prefixCls}calendar-header-title`).text()).toEqual(today.format(
    'MMM YYYY'));

  headerPrev.simulate('click');
  expect(calendar.find(`.${props.prefixCls}calendar-header-title`).text()).toEqual(today.clone().add(-1, 'M').format(
    'MMM YYYY'));

  headerToday.simulate('click');
  expect(calendar.find(`.${props.prefixCls}calendar-header-title`).text()).toEqual(today.clone().format('MMM YYYY'));

  headerNext.simulate('click');
  expect(calendar.find(`.${props.prefixCls}calendar-header-title`).text()).toEqual(today.clone().add(1, 'M').format(
    'MMM YYYY'));

  headerNext.simulate('click');
  expect(calendar.find(`.${props.prefixCls}calendar-header-title`).text()).toEqual(today.clone().add(2, 'M').format(
    'MMM YYYY'));

  expect(calendar.find(`.${props.prefixCls}calendar-day`).length).toEqual(42);

  headerTitle.simulate('click');
  expect(calendar.find(`.${props.prefixCls}calendar-month`).length).toEqual(12);
  expect(calendar.find(`.${props.prefixCls}calendar-year`).length).toEqual(0);

  headerTitle.simulate('click');
  expect(calendar.find(`.${props.prefixCls}calendar-month`).length).toEqual(0);
  expect(calendar.find(`.${props.prefixCls}calendar-year`).length).toEqual(12);
});
