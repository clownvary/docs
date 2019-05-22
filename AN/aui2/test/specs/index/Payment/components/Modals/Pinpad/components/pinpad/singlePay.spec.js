import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import SinglePay from 'index/Payment/components/Modals/PinPad/components/Pinpad/singlePay';
import Pinpad from 'index/Payment/components/Modals/PinPad/components/Pinpad/pinpad';
import PinpadTransactionFail from 'index/Payment/components/Modals/PinPad/components/PinpadTransactionFail';

jest.mock('index/Payment/components/Modals/PinPad/components/Pinpad/pinpad', () => 'Pinpad');
jest.mock('index/Payment/components/Modals/PinPad/components/PinpadTransactionFail', () => 'PinpadTransactionFail');

describe('index/Payment/components/Modals/PinPad/components/Pinpad/singlePay', () => {

  let store;

  beforeEach(() => {
    store = configureStore(middlewares)({});
  });

  const props = {
    pinpad: {},
    pay: {}
  };

  it('component should render correctly', () => {
    const component = mount(<SinglePay store={store} {...props} />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
