import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import { MagTek } from 'index/Payment/components/Modals/MagTek';

jest.mock('index/Payment/components/Modals/MagTek/MagtekIPAD', () => 'MagtekIPAD');
jest.mock('index/Payment/components/Modals/MagTek/MagtekDynamag', () => 'MagtekDynamag');

describe('index/Payment/components/Modals/MagTek', () => {

  let store;

  beforeEach(() => {
    store = configureStore(middlewares)({});
  });
  const actions = {
    fetchCardtypeAction: jest.fn(),
    setCardInfo: jest.fn(),
    hideMagtekModalAction: jest.fn(),
    payment: jest.fn(),
    generateWalletID: jest.fn(),
    setServerError: jest.fn()
  }
  const initialData = {
    ccMagesafeDeviceType: 'MagtekIPAD'
  };
  const props = {
    data: fromJS({
      isShowModal: false,
      totalFee: 111,
      error: ''
    }),
    initialData
  };
  const setup = (store, props) => mount(<MagTek store={store} {...props} {...actions} />);

  it('component should render correctly when ccMagesafeDeviceType is not MagtekDaynamg', () => {
    const component = setup(store, props);

    expect(toJson(component)).toMatchSnapshot();
  });

  it('component should render correctly when ccMagesafeDeviceType is MagtekDaynamg', () => {
    const newProps = {
      data: props.data
        .set('cardTypeList', {data: []})
        .set('isShowModal', true),
      initialData: {
        ...initialData,
        ccMagesafeDeviceType: 'MagtekDynamag'
      }
    };
    const component = setup(store, newProps);

    expect(toJson(component)).toMatchSnapshot();
  });
});
