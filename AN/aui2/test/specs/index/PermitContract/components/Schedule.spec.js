import React from 'react';
import { mount } from 'enzyme';
import Schedule from 'index/PermitContract/components/Schedule';

const permitSchedulesData = [
  {
    resource_name: 'zack facility minutes',
    center_name: '*lillian_center1',
    event_name: 'Test Recurring',
    start_date: '30 Jul 2017',
    end_date: '30 Jul 2017',
    schedules: [
      {
        resource_name: 'zack facility minutes',
        center_name: '*lillian_center1',
        event_name: 'Test Recurring',
        start_date: '30 Jul 2017',
        end_date: '30 Jul 2017',
        end_day_of_week: 'Sun',
        start_time: '1:00 AM',
        end_time: '1:30 AM',
        start_day_of_week: 'Sun',
        recurring_indicator: false,
        occurrences: 0
      }
    ],
    exceptions: [
      { date: '8 Aug 2017'},
      { start_date: '8 Aug 2017', end_date: '9 Aug 2017' },
      { /* empty exception date */ }
    ],
    group_pattern_content: '{ "type": 1, "frequency": 1 }',
    end_day_of_week: 'Sun',
    start_time: '1:00 AM',
    end_time: '1:30 AM',
    start_day_of_week: 'Sun',
    recurring_indicator: true,
    occurrences: 9
  },
  {
    resource_name: 'zack facility minutes',
    center_name: '*lillian_center1',
    event_name: 'Test Recurring',
    start_date: '30 Jul 2017',
    end_date: '30 Jul 2017',
    schedules: [
      {
        resource_name: 'zack facility minutes',
        center_name: '*lillian_center1',
        event_name: 'Test Recurring',
        start_date: '30 Jul 2017',
        end_date: '30 Jul 2017',
        end_day_of_week: 'Sun',
        start_time: '1:00 AM',
        end_time: '1:30 AM',
        start_day_of_week: 'Sun',
        recurring_indicator: false,
        occurrences: 0
      }
    ],
    exceptions: [
      { date: '8 Aug 2017'},
      { start_date: '8 Aug 2017', end_date: '9 Aug 2017' },
      { /* empty exception date */ }
    ],
    group_pattern_content: 'wrong group pattern context',
    end_day_of_week: 'Sun',
    start_time: '1:00 AM',
    end_time: '1:30 AM',
    start_day_of_week: 'Sun',
    recurring_indicator: true,
    occurrences: 9
  },
  {
    resource_name: 'zack facility minutes',
    center_name: '*lillian_center1',
    event_name: 'Test Recurring',
    start_date: '30 Jul 2017',
    end_date: '30 Jul 2017',
    schedules: [
      {
        resource_name: 'zack facility minutes',
        center_name: '*lillian_center1',
        event_name: 'Test Recurring',
        start_date: '30 Jul 2017',
        end_date: '30 Jul 2017',
        end_day_of_week: 'Sun',
        start_time: '1:00 AM',
        end_time: '1:30 AM',
        start_day_of_week: 'Sun',
        recurring_indicator: false,
        occurrences: 0
      }
    ],
    exceptions: [
      { date: '8 Aug 2017'},
      { start_date: '8 Aug 2017', end_date: '9 Aug 2017' },
      { /* empty exception date */ }
    ],
    end_day_of_week: 'Sun',
    start_time: '1:00 AM',
    end_time: '1:30 AM',
    start_day_of_week: 'Sun',
    recurring_indicator: true,
    occurrences: 9
  }
];

const permitSchedulesDataTwo = [
  {
    resource_name: 'zack facility minutes',
    center_name: '*lillian_center1',
    event_name: 'Test Recurring',
    start_date: '30 Jul 2017',
    end_date: '30 Jul 2017',
    schedules: [],
    end_day_of_week: 'Sun',
    start_time: '1:00 AM',
    end_time: '1:30 AM',
    start_day_of_week: 'Sun',
    recurring_indicator: false,
    occurrences: 9
  }
];

const setup = props => mount(<Schedule {...props} />);

it('recurring_indicator equal to true the Schedule component should render without errors', () => {
  const permitSchedules = permitSchedulesData;
  const component = setup({ permitSchedules });
  expect(component).toBeTruthy();
  expect(component.find('.expanded')).toHaveLength(1);

  const collapseIcon = component.find('.collapse-panel__title').find('i');
  collapseIcon.simulate('click');
  expect(component.find('.collapsed')).toHaveLength(1);
  const rows = component.find('tr');
  expect(rows.at(0).find('th')).toHaveLength(7);

  const tableCollapseIcon = component.find('tbody').find('.expand-control').first();
  tableCollapseIcon.simulate('click');
  expect(tableCollapseIcon.hasClass('icon-chevron-down')).toBe(false);
  tableCollapseIcon.simulate('click');
  expect(tableCollapseIcon.hasClass('icon-chevron-down')).toBe(true);
});

it('recurring_indicator equal to false the Schedule component should render without errors', () => {
  const permitSchedules = permitSchedulesDataTwo;
  const component = setup({ permitSchedules });
  expect(component).toBeTruthy();
  expect(component.find('.expanded')).toHaveLength(1);

  const collapseIcon = component.find('.collapse-panel__title').find('i');
  collapseIcon.simulate('click');
  const rows = component.find('tr');
  expect(rows.at(0).find('th')).toHaveLength(7);
});
