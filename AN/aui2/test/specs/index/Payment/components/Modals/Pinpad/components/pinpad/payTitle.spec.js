import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import PayTitle from 'index/Payment/components/Modals/PinPad/components/Pinpad/payTitle';

describe('index/Payment/components/Modals/PinPad/components/Pinpad/payTitle', () => {

  let store;

  beforeEach(() => {
    store = configureStore(middlewares)({});
  });

  const props = {
    pay: {
      paymentTypeName: "Credit Card",
      amount: "123.00",
      headerHtml: 'pinpad type title'
    }
  };

  it('component should render correctly', () => {
    const component = mount(<PayTitle store={store} {...props} />);
    expect(toJson(component)).toMatchSnapshot();

    const newProps = {
      pay: {
        ...props.pay,
        headerHtml: null
      }
    };
    component.setProps(newProps);
    expect(component.find('div > div').text()).toBe('');
  });
});
