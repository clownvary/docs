import React from 'react';
import moment from 'moment';
import { fromJS } from 'immutable';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import { EnrollCalendar } from 'index/modules/Daycare/EnrollForm/components/SessionSection/EnrollCalendar';

describe('index/modules/Daycare/EnrollForm/components/SessionSection/EnrollCalendar', () => {
  const participantId = 1;
  const selectedSessionDateIds = [3878, 3879, 3865];
  const sessionDates = [
    {
      dc_session_date_id: 3878,
      dc_session_id: 38,
      session_date: '15 Jan 2023'
    },
    {
      dc_session_date_id: 3879,
      dc_session_id: 39,
      session_date: '18 Feb 2023'
    },
    {
      dc_session_date_id: 3880,
      dc_session_id: 40,
      session_date: '18 Mar 2023'
    },
    {
      dc_session_date_id: 3881,
      dc_session_id: 41,
      session_date: '18 May 2023'
    }
  ];

  const actions = {
    onSelect: jest.fn(),
    selectSessions: jest.fn(),
    expandSection: jest.fn(),
    collapseSection: jest.fn()
  };

  const setup = (props) => {
    const component = mountWithIntl(
      <EnrollCalendar
        sessionDates={fromJS(sessionDates)}
        selectedSessionDateIds={fromJS(selectedSessionDateIds)}
        participantId={participantId}
        responsive={{ isSm: false, isMd: false, isLg: true }}
        {...actions}
        {...props}
      />
    );

    return {
      component,
      instance: component.instance()
    };
  };

  it('should render weekly sessions', () => {
    const { component } = setup();
    expect(component.find('.enroll-calendar')).toHaveLength(1);
    expect(component.find('.sessions-in-month')).toHaveLength(0);

    component.setProps({ selectedSessionDateIds: fromJS([]) });
    expect(component.find('.sessions-in-month')).toHaveLength(1);
    component.setProps({ participantId: 2 });
    expect(component.find('.sessions-in-month')).toHaveLength(1);

    component.setProps({ selectedSessionDateIds: fromJS([1]) });
    expect(component.find('.sessions-in-month')).toHaveLength(0);
  });

  it('should navigate between months correctly', () => {
    const { component, instance } = setup();

    expect(instance.getFirstSessionDay([])).toBeNull();
    expect(instance.getLastSessionDay([])).toBeNull();

    const state = component.state();
    expect(state.prevDate).toBeNull();

    instance.onNextBtnClick();
    expect(moment(component.state('currentDate')).isSame('2023-02-01', 'day')).toBe(true);

    instance.onNextBtnClick();
    expect(moment(component.state('currentDate')).isSame('2023-03-01', 'day')).toBe(true);

    instance.onNextBtnClick();
    expect(moment(component.state('currentDate')).isSame('2023-05-01', 'day')).toBe(true);
    instance.onNextBtnClick();
    expect(moment(component.state('currentDate')).isSame('2023-05-01', 'day')).toBe(true);

    instance.onPrevBtnClick();
    expect(moment(component.state('currentDate')).isSame('2023-03-01', 'day')).toBe(true);

    instance.onPrevBtnClick();
    expect(moment(component.state('currentDate')).isSame('2023-02-01', 'day')).toBe(true);

    instance.onPrevBtnClick();
    expect(moment(component.state('currentDate')).isSame('2023-01-01', 'day')).toBe(false);
    instance.onPrevBtnClick();
    expect(moment(component.state('currentDate')).isSame('2023-01-01', 'day')).toBe(false);

    const dates = [
      {
        id: 3878,
        date: moment('2023-01-15'),
        sessionId: 38
      },
      {
        id: 3879,
        date: moment('2023-02-15'),
        sessionId: 38
      }
    ];
    const prevDate = instance.getPrevMonthDate(dates, moment('2023-2-15'), moment('2023-1-15'));
    expect(prevDate).toBeNull();

    expect(instance.getLastSessionDay([
      { date: moment('2023-2-15') },
      { date: moment('2023-1-15') }
    ])).toEqual(moment('2023-2-15'));

    expect(instance.getFirstSessionDay([
      { date: moment('2023-2-15') },
      { date: moment('2023-1-15') }
    ], moment('2023-1-14'))).toEqual(moment('2023-1-15'));
  });

  it('should manage selection states correctly', () => {
    const { component, instance } = setup();
    component.setProps({ selectedSessionDateIds: fromJS([]) });

    instance.selectCurrentMonth();
    expect(actions.onSelect).toBeCalled();
    expect(component.state('selectedDates')).toHaveLength(0);

    component.setProps({ selectedSessionDateIds: fromJS([3878]) });
    instance.selectCurrentMonth();
    expect(component.state('selectedDates')).toHaveLength(7);

    const weekdays = instance.getWeekdays(moment('2023-02-18'));
    const weekSessionDates = [
      {
        id: 3879,
        date: moment('2023-02-18'),
        sessionId: 39
      }
    ];
    instance.onDateRowClick({}, weekdays, weekSessionDates);
    expect(component.state('selectedDates')).toHaveLength(14);

    component.setState({ firstSessionDay: null, lastSessionDay: null });
    instance.onDateRowClick({}, weekdays, weekSessionDates);
    expect(component.state('selectedDates')).toHaveLength(7);
    expect(component.state('selectedSessionDates')).toHaveLength(1);

    instance.cleanCurrentMonth();
    expect(component.state('selectedSessionDates')).toHaveLength(0);
  });
});
