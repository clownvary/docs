import React from 'react';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import { PermitGrid } from 'index/Reservation/components/PermitGrid';
import DataGrid from 'shared/components/DataGrid';
import { Authority } from 'shared/authorities';

const noResultMessage = 'No results matched your search. Please try again.';

const bookingList = [
  {
    site_name: 'ut magna',
    status_id: 1,
    customer_name: 'Raheem Schamberger',
    permit_number: -5407107,
    event_number: 3,
    permit_start_date: '2015-09-20T21:52:17.009Z',
    booking_number: 1,
    event_name: 'Velma Weissnat Sr.',
    invoice_total: 144.23,
    permit_end_date: '2099-07-30T17:29:04.282Z',
    permit_status: 'Completed',
    outstanding_balance: 0,
    fetched: 'NOT_FETCHED',
    permit_id: 69
  },
  {
    site_name: 'exercitation laboris sed pariatur',
    status_id: 3,
    customer_name: 'Nia Ondricka II',
    permit_number: -18090502,
    event_number: 1,
    permit_start_date: '2016-01-06T15:24:31.884Z',
    booking_number: 0,
    event_name: 'Steve Bechtelar',
    invoice_total: 120,
    permit_end_date: '2114-02-07T02:11:12.127Z',
    permit_status: 'Approved',
    outstanding_balance: 0,
    fetched: 'FETCHED',
    permit_id: 77
  },
  {
    site_name: 'exercitation laboris sed pariatur',
    status_id: 3,
    customer_name: 'Nia Ondricka II',
    permit_number: -18090502,
    event_number: 2,
    permit_start_date: '',
    booking_number: 1,
    event_name: 'Steve Bechtelar',
    invoice_total: 120,
    permit_end_date: '2114-02-07T02:11:12.127Z',
    permit_status: 'Approved',
    outstanding_balance: 0,
    fetched: 'FETCHED',
    permit_id: 80
  },
  {
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
  }
];

const permits = {
  selectedPermit: {
    site_name: 'ut magna',
    status_id: 1,
    customer_name: 'Raheem Schamberger',
    permit_number: -5407107,
    event_number: 3,
    permit_start_date: '2015-09-20T21:52:17.009Z',
    booking_number: 1,
    event_name: 'Velma Weissnat Sr.',
    invoice_total: 144.23,
    permit_end_date: '2099-07-30T17:29:04.282Z',
    permit_status: 'Completed',
    outstanding_balance: 0,
    fetched: 'NOT_FETCHED',
    permit_id: 69
  },
  emptyDataMessage: noResultMessage,
  data: [],
  pagination: {
    total: 2,
    current: 1,
    around: 1,
    edgeCount: 2
  },
  sort: {
    orderOption: '',
    orderBy: ''
  }
};

const filters = {
  permitNumber: '',
  startDateObj: null,
  endDate: '',
  searchPlaceholder: 'Enter permit shirly number to search...',
  endDateObj: null,
  startDate: '',
  status: {
    label: 'statuses',
    data: [
      {
        name: 'Approved',
        id: 0,
        selected: true,
        text: 'Approved',
        value: 0
      },
      {
        name: 'Denied',
        id: 1,
        selected: false,
        text: 'Denied',
        value: 1
      },
      {
        name: 'Tentative',
        id: 2,
        selected: false,
        text: 'Tentative',
        value: 2
      }
    ],
    selected: [
      0
    ]
  },
  facilityTypes: {
    label: 'facility shirly types',
    data: [
      {
        name: 'facility type 1',
        id: 0,
        selected: true,
        text: 'facility type 1',
        value: 0
      },
      {
        name: 'facility type 2',
        id: 1,
        selected: false,
        text: 'facility type 2',
        value: 1
      },
      {
        name: 'facility type 3facility type 3facility type 3facility type 3facility type 3facility type 3',
        id: 2,
        selected: false,
        text: 'facility type 3facility type 3facility type 3facility type 3facility type 3facility type 3',
        value: 2
      }
    ],
    selected: [
      0
    ]
  },
  tags: {
    currentTags: [
      'All centers',
      'facility type 1',
      'All event types',
      'Approved'
    ],
    isDefaultTags: false
  },
  displayFilter: false,
  centers: {
    label: 'centers',
    data: [
      {
        name: '111111Lois Center without Facility',
        id: 138,
        selected: false,
        text: '111111Lois Center without Facility',
        value: 138
      },
      {
        name: '14.5 Sprint 4 Moon\'s center14.5 Sprint 4 Moon\'s center14.5 Sprint 4 Moon\'s center14.5 Sprint 4 Moon\'s center14.5 Sprint 4 Moon\'s center14.5 Sprint 4 Moon\'s center',
        id: 151,
        selected: false,
        text: '14.5 Sprint 4 Moon\'s center14.5 Sprint 4 Moon\'s center14.5 Sprint 4 Moon\'s center14.5 Sprint 4 Moon\'s center14.5 Sprint 4 Moon\'s center14.5 Sprint 4 Moon\'s center',
        value: 151
      },
      {
        name: '3 center',
        id: 149,
        selected: false,
        text: '3 center',
        value: 149
      },
      {
        name: '111111Lois Ce&amp;nter without Facility',
        id: 1318,
        selected: false,
        text: '111111Lois Ce&nter without Facility',
        value: 1318
      },
      {
        name: '14.5 Sprint 4 Moon\'s center',
        id: 1511,
        selected: false,
        text: '14.5 Sprint 4 Moon\'s center',
        value: 1511
      },
      {
        name: '3 center',
        id: 1419,
        selected: false,
        text: '3 center',
        value: 1419
      }
    ],
    selected: [],
    errMsg: ''
  },
  eventTypes: {
    label: 'event types',
    data: [
      {
        id: 34,
        name: '\'South West Hub Café &amp;',
        selected: false,
        text: '\'South West Hub Café &',
        value: 34
      },
      {
        id: 51,
        name: '15.4 demo - Event Type - Lin Test15.4 demo - Event Type - Lin Test15.4 demo - Event Type - Lin Test',
        selected: false,
        text: '15.4 demo - Event Type - Lin Test15.4 demo - Event Type - Lin Test15.4 demo - Event Type - Lin Test',
        value: 51
      },
      {
        id: 39,
        name: '3 event type',
        selected: false,
        text: '3 event type',
        value: 39
      },
      {
        id: 69,
        name: '3 event type - Cloned',
        selected: false,
        text: '3 event type - Cloned',
        value: 69
      }
    ],
    selected: []
  }
};

const props = {
  permits: fromJS(permits),
  filters: fromJS(filters)
};

describe('index/Reservation/components/PermitGrid', () => {
  const actions = {
    fetchPermits: jest.fn(),
    selectPermit: jest.fn(),
    changePageThenFetchPermits: jest.fn(),
    changeSort: jest.fn(),
    isPermitAccessible: jest.fn(),
    fetchPermitEventInfo: jest.fn(() => new Promise((resolve) => {
      resolve();
    }))
  };

  Authority.init(window.__authoritiy__);
  const setup = (initProps, store) => mount(<PermitGrid {...initProps} {...actions} />, { context: { store } });

  const resetActions = () => Object.keys(actions).forEach(fn => actions[fn].mockClear());

  const mockStore = configureStore();

  let clock;

  beforeEach(() => {
    clock = jest.useFakeTimers();
  });

  afterEach(() => {
    resetActions();
    clock.clearAllTimers();
  });

  it('PermitGrid should render correctly', () => {
    const store = mockStore({
      authority: fromJS({
        authorities: []
      })
    });

    const component = setup(props, store);

    const wrapDataGrid = component.find(DataGrid);
    wrapDataGrid.node.props.onChange();

    wrapDataGrid.node.props.onSort({ sortField: 'eventname', isDesc: false });
    wrapDataGrid.node.props.onSort({ sortField: 'eventname', isDesc: true });
    wrapDataGrid.node.props.onSelect();

    wrapDataGrid.node.props.OnClick({ target: { parentNode: { tagName: 'A' } } });
    wrapDataGrid.node.props.OnClick({ target: { parentNode: { tagName: 'LABEL' } } });

    expect(component.find('.aaui-table')).toHaveLength(1);
    expect(component.find('.aaui-table-header')).toHaveLength(1);
    expect(component.find('.aaui-table-header-cell')).toHaveLength(7);
    expect(component.find('.aaui-table-body')).toHaveLength(1);
    expect(component.find('.aaui-table-row')).toHaveLength(0);
    expect(component.find('.aaui-table-row-empty')).toHaveLength(1);
    expect(component.find('.aaui-table-row-empty').text()).toBe(noResultMessage);
  });

  it('PermitGrid permits data not null should render correctly', () => {
    const store = mockStore({
      authority: fromJS({
        authorities: []
      })
    });

    const nextPermits = { ...permits, data: bookingList };
    const nextProps = {
      permits: fromJS(nextPermits),
      filters: fromJS(filters)
    };

    const component = setup({ ...nextProps, store });
    component.find('.text-ellipsis').at(0).find('span').simulate('mouseenter');
    jest.runAllTimers();
    component.find('.text-ellipsis').at(0).find('span').simulate('mouseleave');

    component.find('.text-ellipsis').at(1).find('span').simulate('mouseenter');
    jest.runAllTimers();
    component.find('.text-ellipsis').at(1).find('span').simulate('mouseleave');

    component.find('.text-ellipsis').at(2).find('span').simulate('mouseenter');
    jest.runAllTimers();

    const wrapInput = component.find('input');
    wrapInput.at(1).simulate('click');
    wrapInput.at(1).simulate('change');

    expect(component.find('.aaui-table-row').at(0).find('.aaui-table-cell').at(0).find('.status-circle').prop('style')).toEqual({ backgroundColor: '#35c781' });
    expect(component.find('.aaui-table-row').at(1).find('.aaui-table-cell').at(0).find('.status-circle').prop('style')).toEqual({ backgroundColor: '#35c781' });

    const wrapDataGrid = component.find(DataGrid);
    const persist = jest.fn();
    const item = fromJS({ fetched: 'NOT_FETCHED', permit_id: 69 });
    wrapDataGrid.node.props.onMouseEnter({ persist: persist }, item);
    expect(persist).toHaveBeenCalled();

    wrapDataGrid.node.props.onMouseLeave();

    resetActions();
    const instance = component.instance();
    instance.debouncedShowEventInfo({}, item);
    instance.debouncedShowEventInfo.flush();
    expect(actions.fetchPermitEventInfo).toHaveBeenCalled();

    resetActions();
    instance.debouncedShowEventInfo({}, item.set('permit_id', 111));
    instance.debouncedShowEventInfo.flush();
    expect(actions.fetchPermitEventInfo).toHaveBeenCalled();

    resetActions();
    instance.debouncedShowEventInfo({}, item.set('fetched', 'FETCHED'));
    instance.debouncedShowEventInfo.flush();
    expect(actions.fetchPermitEventInfo).not.toHaveBeenCalled();
  });

  it('PermitGrid when permit_id not find should render correctly', () => {
    const store = mockStore({
      authority: fromJS({
        authorities: []
      })
    });

    const nextBookingList = [{
      site_name: 'ut magna',
      status_id: 1,
      customer_name: 'Raheem Schamberger',
      permit_number: -5407107,
      event_number: 3,
      permit_start_date: '2015-09-20T21:52:17.009Z',
      booking_number: 1,
      event_name: 'Velma Weissnat Sr.',
      invoice_total: 144.23,
      permit_end_date: '2099-07-30T17:29:04.282Z',
      permit_status: 'Completed',
      outstanding_balance: 0,
      fetched: 'NOT_FETCHED',
      permit_id: 6
    },
      {
        site_name: 'ut magna',
        status_id: 1,
        customer_name: 'Raheem Schamberger',
        permit_number: -5407107,
        event_number: 3,
        permit_start_date: '2015-09-20T21:52:17.009Z',
        booking_number: 1,
        event_name: 'Velma Weissnat Sr.',
        invoice_total: 144.23,
        permit_end_date: '2099-07-30T17:29:04.282Z',
        permit_status: 'Completed',
        outstanding_balance: 0,
        fetched: 'NOT_FETCHED',
        permit_id: NaN
      }];

    const nextPermits = { ...permits, data: nextBookingList };
    const nextProps = {
      permits: fromJS(nextPermits),
      filters: fromJS(filters)
    };

    const component = setup({ ...nextProps, store });

    component.find('.text-ellipsis').at(1).find('span').simulate('mouseenter');
    jest.runAllTimers();
  });

  it('PermitGrid authorityType equal to "hide" should render correctly', () => {
    const store = mockStore({
      authority: fromJS({
        authorities: [{ id: 'permitActionsOnReservationsPage', authorityType: 'hide' }]
      })
    });

    const nextPermits = { ...permits, data: bookingList };
    const nextProps = {
      permits: fromJS(nextPermits),
      filters: fromJS(filters)
    };
    const component = setup(nextProps, store);

    expect(component.find('.aaui-table')).toHaveLength(1);
    expect(component.find('.aaui-table-header')).toHaveLength(1);
  });
});
