import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import PinpadEntry from 'index/Payment/components/Modals/PinPad/components/Pinpad';
import Pinpad from 'index/Payment/components/Modals/PinPad/components/Pinpad/pinpad';
import SinglePay from 'index/Payment/components/Modals/PinPad/components/Pinpad/singlePay';
import MutiplePays from 'index/Payment/components/Modals/PinPad/components/Pinpad/mutiplePays';

jest.mock('index/Payment/components/Modals/PinPad/components/Pinpad/pinpad', () => 'Pinpad');
jest.mock('index/Payment/components/Modals/PinPad/components/Pinpad/singlePay', () => 'SinglePay');
jest.mock('index/Payment/components/Modals/PinPad/components/Pinpad/mutiplePays', () => 'MutiplePays');

describe('index/Payment/components/Modals/PinPad/components/Pinpad/index', () => {

  let store;

  beforeEach(() => {
    store = configureStore(middlewares)({});
  });

  it('component should render correctly', () => {
    const component = mount(<PinpadEntry store={store}/>);
    expect(toJson(component)).toMatchSnapshot();
  });
});
