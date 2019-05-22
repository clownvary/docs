import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import moment from 'moment';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import PermitType from 'index/PermitDetail/components/PermitType';
import { PermitTypeSet } from 'index/PermitDetail/components/PermitTypeSet';

const permitTypes = [
  {
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

const permitTypes1 = [{
  text: 'Tentative',
  value: 2,
  id: 1,
  selected: true,
  expirationDateAllowed: true,
  expirationDateRequired: true,
  systemUserNamesAllowed: false,
  permitExpirationDate: 'Jul 12, 2016'
}]

const permitTypeData =
  {
    permitTypesVal: 3,
    dateFormat: 'MM/DD/YYYY',
    currentDate: 'Jun 30, 2016',
    permitReservationUsersSelected: [179],
    receiptID: '2222222',
    resize: false,
    batchID: '1111111',
    receiptEntryID: '3333333',
    permitReservationUsers: [
      {
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
    ],
    permitTypes
  };

const getProps = (override) => ({
  permitTypeData: fromJS({
    ...permitTypeData,
    ...override
  })
});

const setup = (store, initProps) => mount(<PermitType store={store} {...initProps} />, { context: { store } });

describe('index/PermitDetail/components/PermitType', () => {

  test('PermitType should render without errors', () => {
    const store = configureStore(middlewares)(fromJS({
      permitSearch: fromJS({
        customer: { customer_id: 1, customer_name: '' }
      })
    }));
    const component = setup(store, getProps());

    const warpDropdown = component.find(Dropdown);
    warpDropdown.at(0).simulate('click');
    warpDropdown.at(0).node.props.onChange({ value: 2 });
    expect(component.find('.permit-type-list')).toHaveLength(1);
  });

  test('PermitType Dropdown value equal to null should render without errors', () => {
    const store = configureStore(middlewares)(fromJS({
      permitSearch: fromJS({
        customer: { customer_id: 1, customer_name: '' }
      })
    }));
    const component = setup(store, getProps());

    const warpDropdown = component.find(Dropdown);
    warpDropdown.at(0).simulate('click');
    warpDropdown.at(0).node.props.onChange({ value: '' });
    expect(component.find('.permit-type-list')).toHaveLength(1);
  });

  test('PermitType dropdown value equal to permitTypesVals should render without errors', () => {
    const store = configureStore(middlewares)(fromJS({
      permitSearch: fromJS({
        customer: { customer_id: 1, customer_name: '' }
      })
    }));
    const component = setup(store, getProps());

    const warpDropdown = component.find(Dropdown);
    warpDropdown.at(0).simulate('click');
    warpDropdown.at(0).node.props.onChange({ value: 3 });
    expect(component.find('.permit-type-list')).toHaveLength(1);
  });

  test('PermitType for permitExpirationDate', () => {
    const store = configureStore(middlewares)(fromJS({
      permitSearch: fromJS({
        customer: { customer_id: 1, customer_name: '' }
      })
    }));

    const component = setup(store, getProps({ permitTypes: permitTypes1 }));
    const datepicker = component.find('.icon-calendar-m');
    datepicker.simulate('click')
    const permitTypeSet = component.find(PermitTypeSet);

    permitTypeSet.node.calendar.wrappedComponent.props.valueChanged([moment()]);
    expect(component.find('.permit-type-list')).toHaveLength(1);
  })
});
