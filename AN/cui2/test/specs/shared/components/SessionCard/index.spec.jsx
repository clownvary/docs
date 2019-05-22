import React from 'react';
import SessionCard from 'shared/components/SessionCard';
import { mountWithIntl as mount } from 'utils/enzymeWithIntl';

describe('shared/components/SessionCard', () => {
  it('Should render component correctly', () => {
    const sessions = [
      {
        session_id: 63,
        session_name: 'Week 1109',
        description: 'week 1109 to week 1115',
        first_date: '2018 Nov 9',
        last_date: '2018 Nov 15',
        beginning_time: '8:00 AM',
        ending_time: '10:00 AM',
        days_of_week: 'Everyday',
        weeks_of_month: ''
      },
      {
        session_id: 64,
        session_name: 'Week 1110',
        description: 'week 1110 to week 1115',
        first_date: '2018 Nov 9',
        last_date: '2018 Nov 15',
        beginning_time: '8:00 AM',
        ending_time: '10:00 AM',
        days_of_week: 'Weekday',
        weeks_of_month: '1st week of month'
      }
    ];

    let wrapper = mount(<SessionCard session={sessions[0]} />);
    expect(wrapper.find('.session-dates').text())
      .toContain(`${sessions[0].first_date} - ${sessions[0].last_date}`);

    wrapper = mount(<SessionCard session={sessions[1]} />);
    expect(wrapper.find('.session-dates').text())
      .toContain(sessions[1].weeks_of_month);

    wrapper = mount(<SessionCard session={sessions[0]} orderable />);
    expect(wrapper.find('.session-card__order')).toHaveLength(1);

    wrapper = mount(<SessionCard session={sessions[0]} orderable index={0} />);
    expect(wrapper.find('.session-card__order').text()).toBe('1');

    const onSelect = jest.fn();
    wrapper = mount(<SessionCard session={sessions[0]} selectable onSelect={onSelect} index={0} />);
    expect(wrapper.find('.icon-svg-check-circle-o')).toHaveLength(1);
    const selectableCard = wrapper.find('.session-card__selectable');
    expect(selectableCard.text()).toBe('2018 Nov 9 - 2018 Nov 15Everyday 8:00 AM - 10:00 AM');
    selectableCard.simulate('click');
    expect(onSelect).toHaveBeenCalled();

    wrapper = mount(<SessionCard session={sessions[0]} selectable onSelect={onSelect} selected index={0} />);
    expect(wrapper.find('.icon-svg-check-circle-c')).toHaveLength(1);

    const onDelete = jest.fn();
    wrapper = mount(<SessionCard session={sessions[0]} deletable onDelete={onDelete} />);
    expect(wrapper.find('.icon-svg-cancel-circle')).toHaveLength(1);
    wrapper.find('.icon-svg-cancel-circle').simulate('click');
    expect(onDelete).toHaveBeenCalled();

    const date = '24,25 Feb 2019';
    wrapper = mount(<SessionCard session={sessions[0]} exceptionDate="" extraDate={date} />);
    expect(wrapper.find('.session-card__footer__item')).toHaveLength(1);
    wrapper = mount(<SessionCard session={sessions[0]} exceptionDate={date} extraDate={date} />);
    expect(wrapper.find('.session-card__footer__item')).toHaveLength(2);
  });

  it('if session selected component Should correctly', () => {
    const session = {
      session_id: 63,
      session_name: 'Week 1109',
      description: 'week 1109 to week 1115',
      first_date: '2018 Nov 9',
      last_date: '2018 Nov 15',
      beginning_time: '8:00 AM',
      ending_time: '10:00 AM',
      days_of_week: 'Everyday',
      weeks_of_month: '',
      session_status: 3,
      "waitlisted_enrolled_dates": [
        "18,19 Jul 2019",
        "21 Aug 2019"
      ],
      "partially_full_dates": [
        "18,19,20 Jul 2018",
        "21 Aug 2019"
      ],
    }

    let wrapper = mount(<SessionCard session={session} selected />);
    expect(wrapper.find('.session-card__footer__label').text()).toBe('Except enrolled/waitlisted dates:');
    wrapper = mount(<SessionCard session={{...session, session_status: 1}} selected />);
    expect(wrapper.find('.session-card__footer__label').text()).toBe('Except enrolled dates:');
    wrapper = mount(<SessionCard session={{...session, session_status: 2}} selected />);
    expect(wrapper.find('.session-card__footer__label').text()).toBe('Except waitlisted dates:');
    wrapper = mount(<SessionCard session={{...session, session_status: 4}} selected />);
    expect(wrapper.find('.session-card__footer__label').text()).toBe('Except full dates:');
    expect(wrapper.find('.session-card__status')).toHaveLength(0);
    wrapper = mount(<SessionCard session={{...session, session_status: 5}} selected />);
    expect(wrapper.find('.session-card__footer__label').text()).toBe('Include full date(s):');

    wrapper = mount(<SessionCard session={{ ...session, session_status: 6 }} selected />);
    let footerLabel = wrapper.find('.session-card__footer__label')
    expect(footerLabel.at(0).text()).toBe('Except enrolled dates:');
    expect(footerLabel.at(1).text()).toBe('Except full dates:');
    expect(wrapper.find('.session-card__status')).toHaveLength(0);

    wrapper = mount(<SessionCard session={{ ...session, session_status: 7 }} selected />);
    footerLabel = wrapper.find('.session-card__footer__label')
    expect(footerLabel.at(0).text()).toBe('Except waitlisted dates:');
    expect(footerLabel.at(1).text()).toBe('Except full dates:');
    expect(wrapper.find('.session-card__status')).toHaveLength(0);

    wrapper = mount(<SessionCard session={{ ...session, session_status: 8 }} selected />);
    footerLabel = wrapper.find('.session-card__footer__label')
    expect(footerLabel.at(0).text()).toBe('Except enrolled/waitlisted dates:');
    expect(footerLabel.at(1).text()).toBe('Except full dates:');
    expect(wrapper.find('.session-times__status')).toHaveLength(0);
    expect(wrapper.find('.session-card__status')).toHaveLength(0);

    wrapper = mount(<SessionCard session={{ ...session, session_status: 9 }} selected />);
    footerLabel = wrapper.find('.session-card__footer__label')
    expect(footerLabel.at(0).text()).toBe('Except enrolled dates:');
    expect(footerLabel.at(1).text()).toBe('Include full date(s):');
    expect(wrapper.find('.session-times__status')).toHaveLength(1);
    expect(wrapper.find('.session-card__status')).toHaveLength(0);

    wrapper = mount(<SessionCard session={{ ...session, session_status: 10 }} selected />);
    footerLabel = wrapper.find('.session-card__footer__label')
    expect(footerLabel.at(0).text()).toBe('Except waitlisted dates:');
    expect(footerLabel.at(1).text()).toBe('Include full date(s):');
    expect(wrapper.find('.session-times__status')).toHaveLength(1);
    expect(wrapper.find('.session-card__status')).toHaveLength(0);

    wrapper = mount(<SessionCard session={{ ...session, session_status: 11 }} selected />);
    footerLabel = wrapper.find('.session-card__footer__label')
    expect(footerLabel.at(0).text()).toBe('Except enrolled/waitlisted dates:');
    expect(footerLabel.at(1).text()).toBe('Include full date(s):');
    expect(wrapper.find('.session-times__status')).toHaveLength(1);
    expect(wrapper.find('.session-card__status')).toHaveLength(0);

    wrapper = mount(<SessionCard session={{ ...session, session_status: 12 }} selected />);
    expect(wrapper.find('.session-card__status')).toHaveLength(1);
    expect(wrapper.find('.session-card__status').text()).toBe('Waiting list');
  });

  it('if session not selected partiallyFullLabel Should correctly', () => {
    const session = {
      session_id: 63,
      session_name: 'Week 1109',
      description: 'week 1109 to week 1115',
      first_date: '2018 Nov 9',
      last_date: '2018 Nov 15',
      beginning_time: '8:00 AM',
      ending_time: '10:00 AM',
      days_of_week: 'Everyday',
      weeks_of_month: '',
      session_status: 3,
      "waitlisted_enrolled_dates": [
        "18,19 Jul 2019",
        "21 Aug 2019"
      ],
      "partially_full_dates": [
        "18,19,20 Jul 2018",
        "21 Aug 2019"
      ],
    }

    let wrapper = mount(<SessionCard session={session} selected={false} />);
    expect(wrapper.find('.session-card__status')).toHaveLength(0);
    wrapper = mount(<SessionCard session={{...session, session_status: 1}} selected={false} />);
    expect(wrapper.find('.session-card__status')).toHaveLength(0);
    wrapper = mount(<SessionCard session={{...session, session_status: 2}} selected={false} />);
    expect(wrapper.find('.session-card__status')).toHaveLength(0);
    wrapper = mount(<SessionCard session={{...session, session_status: 4}} selected={false} />);
    expect(wrapper.find('.session-card__status')).toHaveLength(1);
    expect(wrapper.find('.session-card__status').text()).toBe('Partially Full');
    wrapper = mount(<SessionCard session={{...session, session_status: 5}} selected={false} />);
    expect(wrapper.find('.session-card__status')).toHaveLength(1);
    expect(wrapper.find('.session-card__status').text()).toBe('Partially Full');
    wrapper = mount(<SessionCard session={{ ...session, session_status: 6 }} selected={false} />);
    expect(wrapper.find('.session-card__status')).toHaveLength(1);
    expect(wrapper.find('.session-card__status').text()).toBe('Partially Full');

    wrapper = mount(<SessionCard session={{ ...session, session_status: 7 }} selected={false} />);
    expect(wrapper.find('.session-card__status')).toHaveLength(1);
    expect(wrapper.find('.session-card__status').text()).toBe('Partially Full');

    wrapper = mount(<SessionCard session={{ ...session, session_status: 8 }} selected={false} />);
    expect(wrapper.find('.session-card__status')).toHaveLength(1);
    expect(wrapper.find('.session-card__status').text()).toBe('Partially Full');

    wrapper = mount(<SessionCard session={{ ...session, session_status: 9 }} selected={false} />);
    expect(wrapper.find('.session-card__status')).toHaveLength(1);
    expect(wrapper.find('.session-card__status').text()).toBe('Partially Full');

    wrapper = mount(<SessionCard session={{ ...session, session_status: 10 }} selected={false} />);
    expect(wrapper.find('.session-card__status')).toHaveLength(1);
    expect(wrapper.find('.session-card__status').text()).toBe('Partially Full');

    wrapper = mount(<SessionCard session={{ ...session, session_status: 11 }} selected={false} />);
    expect(wrapper.find('.session-card__status')).toHaveLength(1);
    expect(wrapper.find('.session-card__status').text()).toBe('Partially Full');

    wrapper = mount(<SessionCard session={{ ...session, session_status: 12 }} selected={false} />);
    expect(wrapper.find('.session-card__status')).toHaveLength(1);
    expect(wrapper.find('.session-card__status').text()).toBe('Full');
  });

  it('if session selected and is_check is false Should correctly', () => {
    const newSessions = {
      session_id: 63,
      session_name: 'Week 1109',
      description: 'week 1109 to week 1115',
      first_date: '2018 Nov 9',
      last_date: '2018 Nov 15',
      beginning_time: '8:00 AM',
      ending_time: '10:00 AM',
      days_of_week: 'Everyday',
      weeks_of_month: '',
    }
    let wrapper = mount(<SessionCard session={newSessions} selectable selected={false} />);
    expect(wrapper.find('.icon-svg-check-circle-o')).toHaveLength(1);

  });

  it('if session selected is true Should correctly', () => {
    const newSessions = {
      session_id: 63,
      session_name: 'Week 1109',
      description: 'week 1109 to week 1115',
      first_date: '2018 Nov 9',
      last_date: '2018 Nov 15',
      beginning_time: '8:00 AM',
      ending_time: '10:00 AM',
      days_of_week: 'Everyday',
      weeks_of_month: '',
    }
    let wrapper = mount(<SessionCard selectable session={newSessions} selected />);
    expect(wrapper.find('.icon-svg-check-circle-c')).toHaveLength(1);
  });

  it('if session is_check and disabled is true Should correctly', () => {
    const newSessions = {
      session_id: 63,
      session_name: 'Week 1109',
      description: 'week 1109 to week 1115',
      first_date: '2018 Nov 9',
      last_date: '2018 Nov 15',
      beginning_time: '8:00 AM',
      ending_time: '10:00 AM',
      days_of_week: 'Everyday',
      weeks_of_month: '',
      is_check: true
    }
    let wrapper = mount(<SessionCard selectable disabled session={newSessions} selected={false} />);
    expect(wrapper.find('.icon-svg-check-circle-c')).toHaveLength(1);
  });

  it('if session is_check is true and disabled is false Should correctly', () => {
    const newSessions = {
      session_id: 63,
      session_name: 'Week 1109',
      description: 'week 1109 to week 1115',
      first_date: '2018 Nov 9',
      last_date: '2018 Nov 15',
      beginning_time: '8:00 AM',
      ending_time: '10:00 AM',
      days_of_week: 'Everyday',
      weeks_of_month: '',
      is_check: true
    }
    let wrapper = mount(<SessionCard selectable disabled={false} session={newSessions} selected={false} />);
    expect(wrapper.find('.icon-svg-check-circle-o')).toHaveLength(1);
  });
});
