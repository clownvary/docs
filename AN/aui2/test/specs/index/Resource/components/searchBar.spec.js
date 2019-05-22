import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import SearchBar from 'index/Resource/components/SearchBar';

const actions = {
  clearFilter: jest.fn(() => Promise.resolve(''))
}

const initialData = {
  facilityTypeLabel: 'FacilityXX',
  instructorLabel: 'Saj',
  eventID: 0,
  maxNumOfResource: '10'
};
const resourceData = {
  totalSize: 10,
  data: [
    {
      name: 'rec&amp;ource1',
      id: 1,
      type: 0,
      selected: true,
      text: 'rec&amp;ource1',
      value: 1
    }
  ],
  totalPage: 12,
  pageNumber: 1,
  isFetchData: true,
  selected: [
    1,
    2
  ],
  loading: false,
  errMsg: ''
};

const filtersData = {
  centers: fromJS({
    data: [
      {
        name: '111111Lois Ce&amp;nter without Facility',
        id: 138,
        selected: false,
        text: '111111Lois Ce&nter without Facility',
        value: 138
      }
    ],
    selected: [0],
    errMsg: 'errMsg'
  }),
  facilityTypes: fromJS({
    data: [
      {
        name: 'faci&amp;lity type 1',
        id: 0,
        selected: true,
        text: 'faci&lity type 1',
        value: 0
      }
    ],
    selected: [
      0
    ]
  }),
  eventTypes: fromJS({
    data: [
      {
        id: 25,
        name: '14.5 I&amp;map Fixed ET',
        selected: false,
        text: '14.5 I&map Fixed ET',
        value: 25
      }
    ],
    selected: []
  }),
  resourceTypes: fromJS({
    data: [
      {
        name: 'reco&amp;urce1',
        id: 1,
        type: 0,
        selected: true,
        text: 'reco&urce1',
        value: 1
      }
    ],
    selected: [
      1,
      2
    ],
    disabledFacilityType: false
  }),
  resources: fromJS(resourceData)
};

const filtersCacheData = {
  centers: '',
  eventTypes: [2],
  facilityTypes: [0, 1],
  resourceTypes: [1, 2, 3],
  resources: [1, 2, 4],
  sites: ''
};

const resourceFilterData = {
  centers: fromJS({
    data: [
      {
        name: '111111Lois Ce&amp;nter without Facility',
        id: 138,
        selected: false,
        text: '111111Lois Ce&nter without Facility',
        value: 138
      },
      {
        name: '14.5 Sprint 4 Moon\'s center',
        id: 151,
        selected: false,
        text: '14.5 Sprint 4 Moon\'s center',
        value: 151
      }
    ],
    selected: [
      138
    ],
    errMsg: ''
  }),
  facilityTypes: fromJS({
    data: [
      {
        name: 'faci&amp;lity type 1',
        id: 0,
        selected: true,
        text: 'faci&lity type 1',
        value: 0
      }
    ],
    selected: [
      0
    ]
  }),
  eventTypes: fromJS({
    data: [
      {
        id: 25,
        name: '14.5 I&amp;map Fixed ET',
        selected: false,
        text: '14.5 I&map Fixed ET',
        value: 25
      }
    ],
    selected: []
  }),
  resourceTypes: fromJS({
    data: [
      {
        name: 'reco&amp;urce1',
        id: 1,
        type: 0,
        selected: true,
        text: 'reco&urce1',
        value: 1
      }
    ],
    selected: [
      1,
      2
    ],
    disabledFacilityType: true
  }),
  resources: fromJS(resourceData)
};


const bookingData = {
  resource_ids: [],
  start_date: '2016 JUN 4',
  end_date: '2016 JUN 4',
  include_linked_resources: true,
  resourceInfo: [],
  bookingInfo: [],
  resize: false,
  ready4Checkout: false,
  inCart: false
};

const quickView = fromJS({
  data: fromJS([{
    'id': '6',
    name: 'test1',
    value: '6',
    'text': 'test1',
    'selected': false,
    'resource_ids': [
        10,
        11
      ]
  }]),
  selectedView: '6'
});


const setup = (initProps, store) => mount(<SearchBar {...initProps} />, { context: { store } });

let props = {
  filters: filtersData,
  filtersCache: filtersCacheData,
  booking: fromJS(bookingData),
  resourceBooking: fromJS(bookingData),
  setFiltersCache: jest.fn(),
  setShowSearchbar: jest.fn(),
  quickView,
  initialData,
  monthView: fromJS({showDayView: false}),
  ...actions
};

it('SearchBar render without errors', () => {
  const mockStore = configureStore(middlewares);
  const store = mockStore({ ...props, ...{ resourceFilter: resourceFilterData } });
  const component = setup(props, store);

  component.find('button').at(0).simulate('click');

  expect(component.find('button').at(0).hasClass('is-expanded')).toBe(true);

  const warpDropdown = component.find(Dropdown);
  warpDropdown.at(0).node.props.onChange({ value: [4, 5] });
  warpDropdown.at(0).node.props.onChange({ value: [1, 2, 3, 4, 6, 7, 8, 9, 10, 13, 19] });

  component.find('button').at(0).simulate('click');
  expect(component.find('button').at(0).hasClass('is-expanded')).toBe(false);

  component.find('button').at(1).simulate('click');
  expect(component.find('button').at(1).hasClass('is-expanded')).toBe(true);
  component.setProps({
    ...props,
    initialData: {
      ...initialData,
      eventID: 2
    }
  });
  warpDropdown.at(1).node.props.onChange({ value: [4] });

  component.find('button').at(1).simulate('click');
  expect(component.find('button').at(1).hasClass('is-expanded')).toBe(false);

  component.find('button').at(2).simulate('click');

  expect(component.find('button').at(2).hasClass('is-expanded')).toBe(true);
  component.setProps({
    ...props,
    initialData: {
      ...initialData,
      eventID: 0,
      receiptEntryID: 0
    }
  });
  warpDropdown.at(2).node.props.onChange({ value: [4] });

  component.find('button').at(2).simulate('click');
  expect(component.find('button').at(2).hasClass('is-expanded')).toBe(false);

  component.find('button').at(3).simulate('click');
  expect(component.find('button').at(3).hasClass('is-expanded')).toBe(true);
  warpDropdown.at(3).node.props.onChange({ value: [4] });

  component.find('button').at(3).simulate('click');
  expect(component.find('button').at(3).hasClass('is-expanded')).toBe(false);

  component.find('button').at(4).simulate('click');
  expect(component.find('button').at(4).hasClass('is-expanded')).toBe(true);

  warpDropdown.at(4).node.props.onChange({ value: [1, 2, 3, 4, 6, 7, 8, 9, 10, 13, 19] });

  warpDropdown.at(4).node.props.ajaxLoading('keyword');

  warpDropdown.at(4).node.props.filterKeyDown();
  warpDropdown.at(4).find('li.aaui-flexbox').at(0).simulate('click');

  component.find('button').at(4).simulate('click');
  expect(component.find('button').at(4).hasClass('is-expanded')).toBe(false);

  component.find('button').at(4).simulate('click');
  component.find('button').at(4).simulate('click');

  component.find('.is-selected').at(0).simulate('click');
  component.find('.is-selected').at(1).simulate('click');

  const newBookingData1 = {
    ...bookingData,
    start_date: '2016 JUN 5',
    end_date: '2016 JUN 5'
  };
  const nextProps1 = {
    ...props,
    booking: fromJS(newBookingData1),
    initialData: {
      ...initialData,
      eventID: 1
    }
  };
  component.setProps(nextProps1);
  expect(props.setFiltersCache).toHaveBeenCalled();

  const newBookingData2 = {
    ...bookingData,
    start_date: '2016 JUN 6',
    end_date: '2016 JUN 6'
  };
  const nextProps2 = {
    ...props,
    booking: fromJS(newBookingData2),
    initialData: {
      ...initialData,
      eventID: -1,
      receiptEntryID: 0
    }
  };
  component.setProps(nextProps2);
  expect(props.setFiltersCache).toHaveBeenCalled();

  const clearFilters = component.find('.clear-filters');
  const disabledClearFilters = component.find('.disabled-clear-filters');

  expect(clearFilters.length).toEqual(1, `clearFilters length is ${clearFilters.length}, expect is 1.`);
  const clearFiltersBtn = component.find('.clear-filters').at(0);
  clearFiltersBtn.simulate('click');
  expect(disabledClearFilters.length).toEqual(0);
});

it('The SearchBar fixedSearchBar equal to false render without error', () => {
  const newResourceData = Object.assign({}, resourceData, { selected: [], loading: true });
  const newFiltersData = Object.assign({}, filtersData, { resources: fromJS(newResourceData) });
  const nextProps = Object.assign(
    {},
    props,
    { filters: newFiltersData }
  );

  const mockStore = configureStore(middlewares);
  const store = mockStore({ ...nextProps, ...{ resourceFilter: resourceFilterData } });
  const component = setup(nextProps, store);

  const warpDropdown = component.find(Dropdown);
  warpDropdown.at(4).node.props.ajaxLoading();
});

it('Clear filter should work well when event id is > 0', () => {
  const mockStore = configureStore(middlewares);
  props.initialData = {
    facilityTypeLabel: 'FacilityXX',
    instructorLabel: 'Saj',
    eventID: 10,
    maxNumOfResource: '10'
  };
  const store = mockStore({ props, ...{ resourceFilter: resourceFilterData } });
  const component = setup(props, store);

  const clearFilters = component.find('.clear-filters');
  const disabledClearFilters = component.find('.disabled-clear-filters');

  expect(clearFilters.length).toEqual(1);
  const clearFiltersBtn = component.find('.clear-filters').at(0);
  clearFiltersBtn.simulate('click');
  expect(disabledClearFilters.length).toEqual(0);
});

it('Clear filter should be disabled', () => {
  props.filters = {
    centers: fromJS({
      selected: []
    }),
    eventTypes: fromJS({
      selected: []
    }),
    resourceTypes: fromJS({
      selected: []
    }),
    facilityTypes: fromJS({
      selected: []
    }),
    resources: fromJS({
      selected: []
    })
  };

  const mockStore = configureStore(middlewares);
  const store = mockStore({ props, ...{ resourceFilter: resourceFilterData } });
  const component = setup(props, store);

  const disabledClearFilters = component.find('.disabled-clear-filters');
  expect(disabledClearFilters.length).toEqual(1);
});
