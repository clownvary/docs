import React from 'react';
import { fromJS } from 'immutable';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import Section from 'index/modules/Daycare/EnrollForm/components/Section';
import { SessionSection } from 'index/modules/Daycare/EnrollForm/components/SessionSection';

describe('index/modules/Daycare/EnrollForm/components/SessionSection', () => {
  const enrollSession = {
    reservationUnit: 0,
    individualSelection: false,
    sessionsMessageCode: 2,
    sessions: [
      { session_id: 331 },
      { session_id: 333 }
    ],
    selectedSessionIds: [],
    extraDates: { 331: '10,11 Feb 2019' },
    exceptionDates: { 333: '22,23 Feb 2019 / 01 Mar 2019' },
    scheduleConflict: false
  };

  const actions = {
    selectSessions: jest.fn(),
    expandSection: jest.fn(),
    collapseSection: jest.fn()
  };

  const container = document.createElement('div');
  container.className = 'session-card-container';
  document.body.appendChild(container);

  const setup = (props) => {
    const component = mountWithIntl(
      <SessionSection
        enrollSession={fromJS(enrollSession)}
        expanded={false}
        disabled
        error={fromJS({ required: false, messages: [] })}
        {...actions}
        {...props}
      />
    );

    return {
      component
    };
  };

  it('should works correctly if section is disabled', () => {
    const { component } = setup();
    const instance = component.instance();
    expect(component.find(Section)).toHaveLength(1);
    expect(component.find('.is-disabled')).toHaveLength(1);

    const collapseIcon = component.find('.icon-chevron-down');
    collapseIcon.simulate('click');
    expect(actions.expandSection).not.toHaveBeenCalled();
    expect(actions.collapseSection).not.toHaveBeenCalled();

    instance.onSectionExpandChange();
    expect(actions.expandSection).not.toHaveBeenCalled();
    expect(actions.collapseSection).not.toHaveBeenCalled();
  });

  it('should works correctly if section is expanded', () => {
    const { component } = setup({
      expanded: true,
      disabled: false
    });
    expect(component.find(Section)).toHaveLength(1);
    expect(component.find('.is-disabled')).toHaveLength(0);

    const collapseIcon = component.find('.icon-chevron-down');
    collapseIcon.simulate('click');
    expect(actions.collapseSection).toHaveBeenCalled();
  });

  it('should works correctly if section is collapsed', () => {
    const { component } = setup({
      expanded: false,
      disabled: false
    });
    expect(component.find(Section)).toHaveLength(1);
    expect(component.find('.is-disabled')).toHaveLength(0);

    const collapseIcon = component.find('.icon-chevron-down');
    collapseIcon.simulate('click');
    expect(actions.expandSection).toHaveBeenCalled();
  });

  it('should render required error ', () => {
    const { component } = setup({
      expanded: true,
      disabled: false,
      enrollSession: fromJS(Object.assign({}, enrollSession, { individualSelection: true })),
      error: fromJS({ required: true, messages: [] })
    });
    expect(component.find('.enroll-session__alert')).toHaveLength(1);
  });

  it('should render weekly sessions', () => {
    const enrollSessionWeekly = {
      reservationUnit: 3,
      individualSelection: false,
      sessions: [],
      selectedSessionIds: [],
      sessionDates: [
        {
          dc_session_date_id: 3878,
          dc_session_id: 38,
          session_date: '2019 Feb 15'
        },
        {
          dc_session_date_id: 3879,
          dc_session_id: 38,
          session_date: '2019 Feb 18'
        },
        {
          dc_session_date_id: 3865,
          dc_session_id: 40,
          session_date: '2019 Feb 22'
        }
      ],
      sessionDatesSummary: [
        {
          start_date: 'Feb 17',
          start_time: '8:00 AM',
          end_date: 'Feb 23',
          end_time: '10:00 AM',
          days_of_week: 'Wed, Fri',
          dc_session_date_ids: [
            3878,
            3879
          ]
        },
        {
          start_date: 'Feb 17',
          start_time: '8:00 AM',
          end_date: 'Feb 23',
          end_time: '10:00 AM',
          days_of_week: 'Fri',
          dc_session_date_ids: [
            3865
          ]
        }
      ],
      selectedSessionDateIds: [3878, 3879, 3865]
    };

    const selectSessions = jest.fn();
    const { component } = setup({
      expanded: true,
      disabled: false,
      error: fromJS({ required: true, messages: [] }),
      enrollSession: fromJS(Object.assign({}, enrollSessionWeekly, { individualSelection: true })),
      participants: fromJS({ id: 1, validId: 1 }),
      selectSessions
    });
    const instance = component.instance();

    expect(component.find('.session-calendar-container')).toHaveLength(1);
    expect(component.find('.weekly-summary-container')).toHaveLength(1);

    instance.onDeleteSessionDates(0);
    expect(selectSessions).toHaveBeenCalled();

    component.setProps({
      enrollSession: fromJS({
        reservationUnit: 3,
        sessions: [],
        selectedSessionIds: [],
        sessionDates: [
          {
            dc_session_date_id: 3878,
            dc_session_id: 38,
            session_date: '2019 Feb 15'
          }
        ],
        sessionDatesSummary: [
          {
            start_date: 'Feb 17',
            start_time: '8:00 AM',
            end_date: 'Feb 23',
            end_time: '10:00 AM',
            days_of_week: 'Fri',
            dc_session_date_ids: [
              3865
            ]
          }
        ],
        selectedSessionDateIds: [3865],
        extraDates: {},
        exceptionDates: {}
      })
    });
    expect(component.find('.weekly-summary').text()).toContain('1 Week');

    component.setProps({ enrollSession: fromJS({ reservationUnit: 4 }) });
    expect(component.find('.session-calendar-container')).toHaveLength(0);
    expect(component.find('.weekly-summary-container')).toHaveLength(0);
  });

  it('should trigger showConflictMessage correctly', (done) => {
    const { component } = setup();
    const _ins = component.instance();
    _ins.toaster = { show: jest.fn() };
    const mockFunc = jest.spyOn(_ins, 'showConflictMessage');
    component.setProps({ scheduleConflict: true });
    expect(_ins.toasterPromise).toBeDefined();
    expect(mockFunc).toHaveBeenCalled();
    expect(_ins.toaster.show).toHaveBeenCalled();
    done();
  });
  it('should return config correctly', () => {
    const toastCloseSpy = jest.fn();
    const { component } = setup({ onToastClose: toastCloseSpy });
    const _ins = component.instance();
    const toaster = { hide: jest.fn() };
    const config = _ins.getToastConfig(toaster);
    expect(config).toMatchObject({
      closable: false,
      content: 'Schedule conflict: you are already enrolled in another program/activity in this time slot.',
      duration: 3,
      key: 'app.modules.daycare.EnrollForm.SessionSection.scheduleConflictMessage'
    });
  });
  it('should trigger toaster clear when component unmount', () => {
    const toastCloseSpy = jest.fn();
    const { component } = setup();
    component.setProps({ onToastClose: toastCloseSpy, scheduleConflict: true });
    const _ins = component.instance();
    _ins.toaster = { clear: jest.fn() };
    component.unmount();
    expect(_ins.toaster.clear).toHaveBeenCalled();
  });
});
