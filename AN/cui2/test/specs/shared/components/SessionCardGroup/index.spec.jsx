import React from 'react';
import SessionCardGroup from 'shared/components/SessionCardGroup';
import { ALL, INDIVIDUAL } from 'shared/components/SessionCardGroup/selectionMode';
import { mountWithIntl as mount } from 'utils/enzymeWithIntl';

describe('shared/components/SessionCardGroup', () => {
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

    let wrapper = mount(<SessionCardGroup sessions={sessions} />);
    expect(wrapper.find('.session-card')).toHaveLength(2);

    wrapper = mount(<SessionCardGroup />);
    expect(wrapper.find('.session-card')).toHaveLength(0);

    expect(wrapper.find('.empty-session-card')).toHaveLength(1);
  });

  it('Should render component correctly for selectable state', () => {
    const sessions = [
      { session_id: 61, is_enable: true },
      { session_id: 62, is_enable: true },
      { session_id: 63, is_enable: true }
    ];
    const onSelect = jest.fn();
    const component = mount(
      <SessionCardGroup
        sessions={sessions}
        selectable
        mode={INDIVIDUAL}
        onSelect={onSelect}
      />);
    expect(component.find('.session-card')).toHaveLength(3);
    expect(component.find('.session-card__selectable')).toHaveLength(3);

    const cards = component.find('.session-card__selectable');
    cards.at(0).simulate('click');
    expect(onSelect).toBeCalledWith([61]);

    component.setProps({ selectedSessionIds: [61] });

    cards.at(0).simulate('click');
    expect(onSelect).toBeCalledWith([]);

    component.setProps({ mode: ALL, selectedSessionIds: [] });
    cards.at(2).simulate('click');
    expect(onSelect).toBeCalledWith([61, 62, 63]);

    component.setProps({ selectedSessionIds: [61, 62, 63] });
    cards.at(2).simulate('click');
    expect(onSelect).toBeCalledWith([]);
  });

  it('if is_enable is true and is_check is false onSelect should work fine', () => {
    const sessions = [
      { session_id: 61, is_enable: true },
      { session_id: 62, is_enable: true },
      { session_id: 63, is_enable: false }
    ];
    const onSelect = jest.fn();
    const component = mount(
      <SessionCardGroup
        sessions={sessions}
        selectable
        mode={INDIVIDUAL}
        onSelect={onSelect}
        selectedSessionIds={[62, 63]}
      />);

    const cards = component.find('.session-card__selectable');
    cards.at(0).simulate('click');
    expect(onSelect).toBeCalledWith([62, 63, 61]);
  });


  it('SessionCardGroup mode equal to ALL and has disabled session should correctly', () => {
    const sessions = [
      { session_id: 61, is_enable: true },
      { session_id: 62, is_enable: true },
      { session_id: 63, is_enable: false }
    ];
    const onSelect = jest.fn();
    const component = mount(
      <SessionCardGroup
        sessions={sessions}
        selectable
        mode={ALL}
        onSelect={onSelect}
      />);

    const cards = component.find('.session-card__selectable');
    cards.at(0).simulate('click');
    expect(onSelect).toBeCalledWith([61, 62]);
  });

  it('SessionCardGroup disabled and selectable is true session should correctly', () => {
    const sessions = [
      { session_id: 61, is_enable: true },
      { session_id: 62, is_enable: false },
      { session_id: 63, is_enable: false }
    ];
    const onSelect = jest.fn();
    const component = mount(
      <SessionCardGroup
        sessions={sessions}
        selectable
        onSelect={onSelect}
      />);

    expect(component.find('.session-card__disabled')).toHaveLength(2);
  });

  it('SessionCardGroup disabled session and selectable is false should correctly', () => {
    const sessions = [
      { session_id: 61, is_enable: true },
      { session_id: 62, is_enable: false },
      { session_id: 63, is_enable: false }
    ];
    const onSelect = jest.fn();
    const component = mount(
      <SessionCardGroup
        sessions={sessions}
        onSelect={onSelect}
      />);

    expect(component.find('.session-card__disabled')).toHaveLength(0);
  });
});
