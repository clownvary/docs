import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import moment from 'moment/moment';
import Calendar from 'src/components/Calendar/Calendar';
import Header from 'src/components/Calendar/Header';
import DateView from 'src/components/Calendar/DateView';
import MonthView from 'src/components/Calendar/MonthView';
import YearView from 'src/components/Calendar/YearView';
import { FirstDayOfWeek, ViewMode, DateFormat, SelectionMode, TodayBehavior } from 'src/components/Calendar/consts';
import { compareByFormat } from 'src/components/Calendar/utils';

jest.useFakeTimers();

describe('components/Calendar', () => {
  const today = moment(new Date(2018, 5, 5));

  const getProps = props => ({
    prefix: 'snapshot-calendar-',
    firstDayOfWeek: FirstDayOfWeek.MONDAY,
    today,
    min: moment(new Date(1900, 1, 1)),
    max: moment(new Date(2019, 12, 31)),
    disabledDates: [moment(new Date(2018, 5, 30))],
    ...props
  });

  it('Calendar renders year view fine', () => {
    const snapshot = renderer.create(
      <Calendar {...getProps({ viewMode: ViewMode.YEARVIEW })} />
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('Calendar renders month view fine', () => {
    const snapshot = renderer.create(
      <Calendar {...getProps({ viewMode: ViewMode.MONTHVIEW })} />
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('Calendar renders date view fine', () => {
    const snapshot = renderer.create(
      <Calendar {...getProps({ viewMode: ViewMode.DATEVIEW })} />
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('Calendar renders month mode fine', () => {
    const snapshot = renderer.create(
      <Calendar {...getProps({ viewMode: ViewMode.DATEVIEW, monthMode: true })} />
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('Calendar works fine in year view', () => {
    const cal = mount(<Calendar {...getProps({ viewMode: ViewMode.YEARVIEW })} />);
    const instance = cal.instance();

    const header = cal.find(Header);

    header.props().onPrevClick();
    expect(compareByFormat(instance.state.currentDate, moment(new Date(2008, 5, 5)),
      DateFormat.YYYY)).toBeTruthy();
    expect(instance.state.title).toEqual('2000-2009');

    header.props().onNextClick();
    expect(compareByFormat(instance.state.currentDate, moment(new Date(2018, 5, 5)),
      DateFormat.YYYY)).toBeTruthy();
    expect(instance.state.title).toEqual('2010-2019');

    const prevState = instance.state;
    header.props().onTitleClick();
    expect(instance.state).toEqual(prevState);

    const yearView = cal.find(YearView);
    yearView.props().onYearClick('2017');
    expect(compareByFormat(instance.state.currentDate, moment(new Date(2017, 5, 4)),
      DateFormat.MMMYYYY)).toBeTruthy();
    expect(instance.state.viewMode).toEqual(ViewMode.MONTHVIEW);

    header.props().onTodayClick();
    expect(compareByFormat(instance.state.currentDate, today, DateFormat.MMDDYYYY)).toBeTruthy();
    expect(instance.state.viewMode).toEqual(ViewMode.DATEVIEW);
    expect(instance.state.title).toEqual('Jun 2018');

    jest.runAllTimers();
  });

  it('Calendar works fine in month view', () => {
    const cal = mount(<Calendar {...getProps({ viewMode: ViewMode.MONTHVIEW })} />);
    const instance = cal.instance();

    const header = cal.find(Header);

    header.props().onPrevClick();
    expect(compareByFormat(instance.state.currentDate,
      moment(new Date(2017, 5, 4)), DateFormat.MMMYYYY)).toBeTruthy();
    expect(instance.state.title).toEqual('2017');

    header.props().onNextClick();
    expect(compareByFormat(instance.state.currentDate,
      moment(new Date(2018, 5, 4)), DateFormat.MMMYYYY)).toBeTruthy();
    expect(instance.state.title).toEqual('2018');

    header.props().onTitleClick();
    expect(instance.state.viewMode).toEqual(ViewMode.YEARVIEW);
    expect(instance.state.title).toEqual('2010-2019');

    cal.setState({ viewMode: ViewMode.MONTHVIEW });
    const monthView = cal.find(MonthView);
    monthView.props().onMonthClick(moment(new Date(2018, 1, 2)));
    expect(compareByFormat(instance.state.currentDate,
      moment(new Date(2018, 1, 2)), DateFormat.MMMYYYY)).toBeTruthy();
    expect(instance.state.viewMode).toEqual(ViewMode.DATEVIEW);

    cal.setState({ viewMode: ViewMode.MONTHVIEW });
    header.props().onTodayClick();
    expect(compareByFormat(instance.state.currentDate, today, DateFormat.MMDDYYYY)).toBeTruthy();
    expect(instance.state.viewMode).toEqual(ViewMode.DATEVIEW);
    expect(instance.state.title).toEqual('Jun 2018');

    jest.runAllTimers();
  });

  it('Calendar works fine in date view', () => {
    const cal = shallow(<Calendar
      {...getProps({
        viewMode: ViewMode.DATEVIEW,
        max: undefined,
        todayBehavior: TodayBehavior.SELECT
      })}
    />);
    const instance = cal.instance();

    const header = cal.find(Header);

    header.props().onPrevClick();
    expect(compareByFormat(instance.state.currentDate,
      moment(new Date(2018, 4, 4)), DateFormat.MMMYYYY)).toBeTruthy();
    expect(instance.state.title).toEqual('May 2018');

    header.props().onNextClick();
    expect(compareByFormat(instance.state.currentDate,
      moment(new Date(2018, 5, 4)), DateFormat.MMMYYYY)).toBeTruthy();
    expect(instance.state.title).toEqual('Jun 2018');

    header.props().onTitleClick();
    expect(instance.state.viewMode).toEqual(ViewMode.MONTHVIEW);
    expect(instance.state.title).toEqual('2018');

    cal.setState({ viewMode: ViewMode.DATEVIEW });
    const dateView = cal.find(DateView);
    dateView.props().onDateClick(moment(new Date(2018, 5, 1)));
    expect(compareByFormat(instance.state.value[0],
      moment(new Date(2018, 5, 1)), DateFormat.MMDDYYYY)).toBeTruthy();
    expect(instance.state.viewMode).toEqual(ViewMode.DATEVIEW);

    header.props().onTodayClick();
    expect(compareByFormat(instance.state.currentDate, today, DateFormat.MMDDYYYY)).toBeTruthy();
    expect(instance.state.viewMode).toEqual(ViewMode.DATEVIEW);
    expect(instance.state.title).toEqual('Jun 2018');

    cal.setState({ viewMode: ViewMode.DATEVIEW });
    instance.onPrevClick();
    cal.setState({ viewMode: ViewMode.MONTHVIEW });
    instance.onNextClick();
    cal.setState({ viewMode: ViewMode.YEARVIEW });
    instance.updateTitle();
    instance.getCurrentDate(moment());

    cal.setProps({ selectMode: 'single' });
    instance.onDateClick(moment());

    cal.setProps({ selectMode: 'multiple' });
    instance.onDateClick(moment());

    jest.runAllTimers();
  });

  it('Calendar works fine in multiple selection mode', () => {
    const cal = shallow(<Calendar
      {...getProps({
        viewMode: ViewMode.DATEVIEW,
        selectMode: SelectionMode.MULTIPLE,
        today: undefined
      })}
    />);
    const instance = cal.instance();

    const dateView = cal.find(DateView);
    dateView.props().onDateClick(moment(new Date(2018, 5, 1)));
    expect(instance.state.value).toHaveLength(1);

    dateView.props().onDateClick(moment(new Date(2018, 5, 1)));
    expect(instance.state.value).toHaveLength(0);

    dateView.props().onDateClick(moment(new Date(2018, 5, 1)));
    expect(instance.state.value).toHaveLength(1);

    dateView.props().onDateClick(moment(new Date(1899, 5, 1)));
    expect(instance.state.value).toHaveLength(1);

    dateView.props().onDateClick(moment(new Date(2020, 5, 1)));
    expect(instance.state.value).toHaveLength(1);

    dateView.props().onDateClick(moment(new Date(2018, 5, 30)));
    expect(instance.state.value).toHaveLength(1);
  });

  it('Calendar works fine in month mode', () => {
    const cal = shallow(<Calendar
      {...getProps({
        viewMode: ViewMode.DATEVIEW,
        todayBehavior: TodayBehavior.SELECT
      })}
    />);
    const instance = cal.instance();
    expect(instance.state.todayLabel).toEqual('Today');

    cal.setProps({ monthMode: true });
    const monthView = cal.find(MonthView);
    expect(monthView).toBeDefined();
    expect(instance.state.todayLabel).toEqual('Current Month');

    const header = cal.find(Header);
    header.props().onTitleClick();
    expect(instance.state.viewMode).toEqual(ViewMode.YEARVIEW);

    header.props().onTodayClick();
    expect(instance.state.viewMode).toEqual(ViewMode.MONTHVIEW);

    monthView.props().onMonthClick(moment(new Date(2018, 1, 20)));
    expect(compareByFormat(instance.state.currentDate,
      moment(new Date(2018, 1, 1)), DateFormat.MMMYYYY)).toBeTruthy();
    expect(instance.state.viewMode).toEqual(ViewMode.MONTHVIEW);

    cal.setProps({ todayBehavior: TodayBehavior.DISPLAY });
    header.props().onTodayClick();
    expect(instance.state.value).toEqual([]);
  });

  it('Calendar lifecycle works fine', () => {
    const today = moment(new Date(2018, 5, 4));
    const cal = shallow(<Calendar
      {...getProps({
        viewMode: ViewMode.DATEVIEW,
        selectMode: SelectionMode.MULTIPLE,
        today,
        value: [today]
      })}
    />);
    const instance = cal.instance();

    expect(instance.state.currentDate).toEqual(moment(new Date(2018, 5, 4)));

    cal.setProps({ selectMode: SelectionMode.SINGLE });
    expect(instance.state.currentDate).toEqual(moment(new Date(2018, 5, 4)));

    cal.setProps({ value: [moment(new Date(2018, 5, 5))] });
    expect(instance.state.currentDate).toEqual(moment(new Date(2018, 5, 5)));

    Calendar.popup();
  });
});
