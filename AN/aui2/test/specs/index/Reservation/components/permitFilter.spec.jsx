import React from 'react';
import { fromJS } from 'immutable';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import InputDate from 'react-base-ui/lib/components/InputDate';
import Input from 'react-base-ui/lib/components/Input';
import Button from 'react-base-ui/lib/components/Button';
import PermitFilter from 'index/Reservation/components/PermitFilter';
import PermitSearchType from 'index/Reservation/consts/permitSearchType';

const filtersData = {
  startDate: '',
  endDate: '',
  permitNumber: 0,

  tags: {
    currentTags: ['All centers', 'All Facility Types', 'All event Types', 'All status'],
    isDefaultTags: false
  },

  eventTypes: {
    data: [{
      id: 34,
      name: 'South West Hub Café &amp;',
      selected: false
    },
    {
      id: 51,
      name: '15.4 demo - Event Type - Lin Test',
      selected: false
    }
    ],
    selected: [],
    error: false,
    loading: false
  },

  centers: {
    data: [{
      name: '111111Lois Center without Facility',
      id: 138,
      selected: false
    },
    {
      name: '14.5 Sprint 4 Moon`s center',
      id: 151,
      selected: false
    }
    ],
    selected: [],
    error: false,
    loading: false
  },

  status: {
    data: [{
      name: 'Approved',
      id: 0,
      selected: true
    }, {
      name: 'Denied',
      id: 1,
      selected: false
    }, {
      name: 'Tentative',
      id: 2,
      selected: false
    }],
    selected: [],
    error: false,
    loading: false
  },

  facilityTypes: {
    data: [{
      name: 'facility type 1',
      id: 0,
      selected: true
    }, {
      name: 'facility type 2',
      id: 1,
      selected: false
    }, {
      name: 'facility type 3',
      id: 2,
      selected: false
    }],
    selected: [],
    error: false,
    loading: false
  }
};

const dropdownSelectedData = {
  value: [
    138,
    151,
    149,
    1318,
    1511,
    1419
  ],
  checkedItems: [
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
    }
  ]
};

const initialData = {
  facilityWording: 'Facility'
};
const props = {
  filters: fromJS(filtersData),
  initialData
};

jest.mock('index/Reservation/actions/permitGrid', () => ({
  changePage: jest.fn(),
  changeSort: jest.fn(),
  fetchPermits: jest.fn(),
  selectPermit: jest.fn()
}));

jest.mock('index/Reservation/actions/permitFilter', () => ({
  changeCenter: jest.fn(),
  changeEndDate: jest.fn(),
  changeFacilityType: jest.fn(),
  changeEventTypeAction: jest.fn(),
  changeStatus: jest.fn(),
  changeStartDate: jest.fn(),
  updateSearchValue: jest.fn(),
  clearErrMsg: jest.fn(),
  clearFilterAction: jest.fn(callback => callback()),
  changePermitNumberAndFetchPermitsAction: jest.fn((value, callback) => {
    callback();
  })
}));

describe('index/Reservation/components/PermitFilter', () => {
  const setup = (initProps, store) => mount(<PermitFilter {...initProps} />, { context: { store } });

  it('Reservation Components should render without errors', () => {
    const mockStore = configureStore();
    const store = mockStore({});

    const component = setup(props, store);

    const e = {
      keyCode: 86,
      shiftKey: true,
      ctrlKey: true,
      preventDefault: () => { }
    };

    const wrapInput = component.find(Input);
    expect(wrapInput.node.props.maxLength).toEqual(100);
    wrapInput.node.props.onKeyDown(e);
    wrapInput.node.props.onKeyDown({ ...e, keyCode: 27 });
    wrapInput.node.props.onKeyDown({ ...e, keyCode: 13 });
    wrapInput.node.props.onKeyDown({ ...e, keyCode: 98 });
    wrapInput.node.props.onKeyDown({ ...e, shiftKey: false, keyCode: 50 });
    wrapInput.node.props.onChange({ target: { value: '233sdf2' }});
    component.find(Button).node.props.onClick({});

    expect(component.find('.search-input')).toHaveLength(1);

    component.find('.filter-clean').simulate('click');

    const wrapDropdown = component.find(Dropdown);
    const searchTypeDropdown = wrapDropdown.at(0);
    expect(searchTypeDropdown.find('div').at(0).hasClass('search-type-dropdown')).toBeTruthy();
    expect(searchTypeDropdown.find('li[title="Customer/Org Name"]')).toHaveLength(1);
    expect(searchTypeDropdown.find('li[title="Customer/Org Email"]')).toHaveLength(1);
    expect(searchTypeDropdown.node.props.defaultValue).toEqual(PermitSearchType.PERMIT_NUMBER);
    searchTypeDropdown.node.props.onChange({ value: PermitSearchType.PERMIT_NUMBER });
    searchTypeDropdown.node.props.onChange({ value: PermitSearchType.CUSTOMER_NAME });

    wrapDropdown.at(1).node.props.onChange(dropdownSelectedData);
    wrapDropdown.at(1).node.props.onChange({ ...dropdownSelectedData, value: [138, 151] });
    wrapDropdown.at(2).node.props.onChange({ value: [1, 2, 3] });
    wrapDropdown.at(3).node.props.onChange({ value: [1, 2, 3] });
    wrapDropdown.at(4).node.props.onChange({ value: [1, 2, 3] });

    expect(wrapDropdown).toHaveLength(5);

    const button = component.find('button');
    button.at(2).simulate('click');
    expect(button.at(2).hasClass('is-expanded')).toBe(true);
    component.find('.checkbox__input').at(0).simulate('click');
    button.at(2).simulate('click');
    expect(button.at(2).hasClass('is-expanded')).toBe(false);

    button.at(3).simulate('click');
    expect(button.at(3).hasClass('is-expanded')).toBe(true);
    button.at(3).simulate('click');
    expect(button.at(3).hasClass('is-expanded')).toBe(false);

    const wrapInputDate = component.find(InputDate);

    expect(wrapInputDate).toHaveLength(2);

    wrapInputDate.at(0).node.props.onValueChange({ value: { toDate: () => new Date('2017-07-5') } });
    wrapInputDate.at(0).node.props.onValueChange({ value: { toDate: () => new Date('2017-07-5') } });

    wrapInputDate.at(1).node.props.onValueChange({ value: { toDate: () => new Date('2017-07-6') } });
    wrapInputDate.at(1).node.props.onValueChange({ value: { toDate: () => new Date('2017-07-6') } });
  });

  it('filters should render without errors', () => {
    const mockStore = configureStore();
    const store = mockStore({});

    const nextFiltersData = {
      ...filtersData,
      tags: {
        currentTags: ['All centers', 'All Facility Types', 'All event Types', 'All status'],
        isDefaultTags: true
      }
    };
    const component = setup({
      filters: fromJS(nextFiltersData),
      initialData
    }, store);

    expect(component.find('.icon-chevron-down')).toHaveLength(5);
    expect(component.find('.filter')).toHaveLength(1);
    component.setProps({ filters: fromJS({ ...nextFiltersData, createdByMe: true }) })
  });
});

