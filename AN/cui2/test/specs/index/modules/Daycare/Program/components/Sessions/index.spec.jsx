import React from 'react';
import { fromJS } from 'immutable';
import { mountWithIntl } from 'utils/enzymeWithIntl';

import Sessions from 'index/modules/Daycare/Program/components/Sessions';

const defaultProps = {
  sessions: fromJS({
    fetched: true,
    sessions: [],
    exceptionDates: {},
    extraDates: {}
  })
};

const setup = (_props = {}) => {
  const props = Object.assign({}, defaultProps, _props);
  const component = mountWithIntl(<Sessions {...props} />);
  return component;
};

describe('index/modules/Daycare/Program/components/Sessions', () => {
  it('Should render different sessions correctly', () => {
    let wrapper = setup();

    expect(wrapper.find('.title').text()).toBe('Session');
    expect(wrapper.find('.empty-session-card')).toHaveLength(1);

    wrapper = setup({
      sessions: fromJS({
        fetched: true,
        sessions: [
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
          }
        ],
        exceptionDates: [],
        extraDates: []
      })
    });
    expect(wrapper.find('.title').text()).toBe('1 Session');
    expect(wrapper.find('.session-card')).toHaveLength(1);

    wrapper = setup({
      sessions: fromJS({
        fetched: true,
        sessions: [
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
            weeks_of_month: ''
          }
        ],
        exceptionDates: [
          {
            63: '10,11 Nov 2018',
            64: '10 Nov 2018'
          }
        ],
        extraDates: [
          {
            63: '20 Nov 2018'
          }
        ]
      })
    });

    expect(wrapper.find('.title').text()).toBe('2 Sessions');
    expect(wrapper.find('.session-card')).toHaveLength(2);
  });

  it('shall display empty before the fetching session response returns', () => {
    const wrapper = setup({
      sessions: defaultProps.sessions.set('fetched', false)
    });
    expect(wrapper.find('.title').text()).toBe('Session');
    expect(wrapper.find('.session-card')).toHaveLength(0);
  });
});
