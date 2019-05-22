import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import moment from 'moment';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import DatePicker from 'react-base-ui/lib/components/DatePicker';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import { PermitTypeSet } from 'index/PermitDetail/components/PermitTypeSet';

const permitTypes = [{
    text: 'Normal',
    value: 1,
    id: 0,
    selected: false,
    expirationDateAllowed: false,
    expirationDateRequired: false,
    systemUserNamesAllowed: false,
    permitExpirationDate: ''
  },
  {
    text: 'Tentative',
    value: 2,
    id: 1,
    selected: false,
    expirationDateAllowed: true,
    expirationDateRequired: true,
    systemUserNamesAllowed: false,
    permitExpirationDate: 'Jul 12, 2016'
  },
  {
    text: 'Temporary',
    value: 3,
    id: 2,
    selected: true,
    expirationDateAllowed: true,
    expirationDateRequired: false,
    systemUserNamesAllowed: true,
    permitExpirationDate: 'Jul 12, 2016'
  }
];

const permitTypeData = {
  permitTypesVal: 3,
  dateFormat: 'MM/DD/YYYY',
  currentDate: 'Jun 30, 2016',
  permitReservationUsersSelected: [179, 133],
  receiptID: '2222222',
  resize: false,
  batchID: '1111111',
  receiptEntryID: '3333333',
  permitReservationUsers: [{
      id: 179,
      name: '#Becky 0118',
      selected: false,
      text: '#Becky 0118',
      value: 179
    },
    {
      id: 133,
      name: 'Becky 0512 long long long long long long long long long',
      selected: false,
      text: 'Becky 0512 long long long long long long long long long',
      value: 133
    },
    {
      id: 230,
      name: '$flynn 1',
      selected: false,
      text: '$flynn 1',
      value: 230
    },
    {
      id: 231,
      name: '@flynn 2',
      selected: false,
      text: '@flynn 2',
      value: 231
    },
    {
      id: 218,
      name: 'éGrace 3 site',
      selected: false,
      text: 'éGrace 3 site',
      value: 218
    },
    {
      id: 243,
      name: 'a1 a1',
      selected: false,
      text: 'a1 a1',
      value: 243
    },
    {
      id: 258,
      name: 'AA Demo AA Demo',
      selected: false,
      text: 'AA Demo AA Demo',
      value: 258
    },
    {
      id: 232,
      name: 'flynn 2',
      selected: false,
      text: 'flynn 2',
      value: 232
    },
    {
      id: 281,
      name: 'Grace 3 site',
      selected: false,
      text: 'Grace 3 site',
      value: 281
    },
    {
      id: 242,
      name: 'a1 a1',
      selected: false,
      text: 'a1 a1',
      value: 242
    },
    {
      id: 259,
      name: 'AA Demo AA Demo',
      selected: false,
      text: 'AA Demo AA Demo',
      value: 259
    }
  ]
};

const props = {
  getPermitTypeParams: jest.fn(),
  permitTypeData: fromJS(permitTypeData),
  changeReservationDate: jest.fn(),
  setReservationUsers: jest.fn(),
  changeReservationUsers: jest.fn()
};

const setup = (store, initProps) => mount(<PermitTypeSet store={store} {...initProps} />);

it('PermitTypeSet should render without errors', () => {
  const store = configureStore(middlewares)(fromJS({
    permitSearch: fromJS({
      customer: { customer_id: 1, customer_name: '' }
    })
  }));

  const initData = Object.assign({}, permitTypeData, { permitTypes });
  const initProps = Object.assign({}, props, { permitTypeData: fromJS(initData) });

  const component = setup(store, initProps);
  expect(component).toBeTruthy();

  expect(component.find('.permit-type-set')).toHaveLength(1);
  const timepickerWrap = component.find('.icon-calendar-m');

  timepickerWrap.simulate('click');
  component.node.calendar.wrappedComponent.props.valueChanged([moment()])
  expect(props.changeReservationDate).toHaveBeenCalled();
  props.changeReservationDate.mockClear()

  component.node.calendar.wrappedComponent.props.valueChanged([moment('2016-07-12')])
  expect(props.changeReservationDate).not.toHaveBeenCalled();

  const iconRemove = component.find('.icon-close');
  iconRemove.simulate('click');
  expect(props.changeReservationDate).toHaveBeenCalled();
  expect(component.find('.aaui-dropdown__button-text').text()).toEqual('2 selected');

  const warpDropdown = component.find(Dropdown);
  warpDropdown.simulate('click');
  warpDropdown.node.props.onChange([179, 133]);
  warpDropdown.node.props.onMenuHide();
});

it('PermitTypeSet expirationDateAllowed and systemUserNamesAllowed equal to false should render without errors', () => {
  const store = configureStore(middlewares)(fromJS({
    permitSearch: fromJS({
      customer: { customer_id: 1, customer_name: '' }
    })
  }));
  const nextPermitTypes = [{
      text: 'Normal',
      value: 1,
      id: 1,
      selected: false,
      expirationDateAllowed: false,
      expirationDateRequired: false,
      systemUserNamesAllowed: false,
      permitExpirationDate: ''
    },
    {
      text: 'Tentative',
      value: 2,
      id: 2,
      selected: true,
      expirationDateAllowed: false,
      expirationDateRequired: true,
      systemUserNamesAllowed: false,
      permitExpirationDate: 'Jul 12, 2016'
    },
    {
      text: 'Temporary',
      value: 3,
      id: 3,
      selected: false,
      expirationDateAllowed: false,
      expirationDateRequired: false,
      systemUserNamesAllowed: false,
      permitExpirationDate: 'Jul 12, 2016'
    }
  ];
  const initData = Object.assign({}, permitTypeData, { permitTypes: nextPermitTypes });
  const initProps = Object.assign({}, props, { permitTypeData: fromJS(initData) });

  const component = setup(store, initProps);
  expect(component.find('.permit-type-set-date')).toHaveLength(0);
});
