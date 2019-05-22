import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import EventInfoTooltip from 'index/Reservation/components/PermitGrid/EventInfoTooltip';

const item = {
  site_name: 'exercitation laboris sed pariatur',
  status_id: 4,
  customer_name: 'Nia Ondricka II',
  permit_number: -18090502,
  event_number: 1,
  permit_start_date: '2016-01-06T15:24:31.884Z',
  booking_number: 8,
  event_name: 'Steve Bechtelar',
  invoice_total: 120,
  permit_end_date: '2114-02-07T02:11:12.127Z',
  permit_status: 'Approved',
  outstanding_balance: 0,
  fetched: 'FETCHED_MEET_ERROR',
  permit_id: 79
};

const props = {
  item: fromJS(item)
};

describe('index/Reservation/components/PermitGrid/EventInfoTooltip', () => {
  const setup = initProps => mount(<EventInfoTooltip {...initProps} />);

  it('EventInfoTooltip should render correctly', () => {
    const component = setup(props);
    expect(component.find('.an-eventinfo-tooltip__content')).toHaveLength(1);
    expect(component.find('.permit-tooltip-loading-error')).toHaveLength(1);
  });

  it('EventInfoTooltip fetched equal to "FETCHED" should render correctly', () => {
    const nextProps = {
      item: fromJS({ ...item, fetched: 'FETCHED' })
    };
    const component = setup(nextProps);

    expect(component.find('.an-eventinfo-tooltip__content')).toHaveLength(1);
    expect(component.find('strong')).toHaveLength(1);
    expect(component.find('div')).toHaveLength(8);

    component.setProps({
      item: nextProps.item.set('event_number', 0).set('booking_number', 0)
    });
    expect(component.find('div')).toHaveLength(6);
    expect(component.find('strong').text()).toEqual('0 event (0 booking item)');

    component.setProps({
      item: nextProps.item.set('booking_number', 1)
    });
    expect(component.find('strong').text()).toEqual('1 event (1 booking item)');

    component.setProps({
      item: nextProps.item.set('event_number', 2)
    });
    expect(component.find('strong').text()).toEqual('2 events (8 booking items)');
  });

  it('EventInfoTooltip fetched equal to "NOT_FETCHED" should render correctly', () => {
    const nextProps = {
      item: fromJS({ ...item, fetched: 'NOT_FETCHED' })
    };
    const component = setup(nextProps);
    expect(component.find('.an-eventinfo-tooltip__content')).toHaveLength(0);
  });
});
