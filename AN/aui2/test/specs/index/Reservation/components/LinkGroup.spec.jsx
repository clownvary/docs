import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import configurateStore from 'redux-mock-store';
import Button from 'react-base-ui/lib/components/Button';
import LinkGroup from 'index/Reservation/components/LinkGroup';
import jsonRunningCart from 'json/Cart/runningCart.json';
import authority from 'json/authority/authorities.json';
import { Authority } from 'shared/authorities';

const {
  body: { running_cart }
} = jsonRunningCart;


const runningCart = fromJS({
  cartList: running_cart,
  cartLoading: false,
  error: false
});

const props = {
  redirect: jest.fn(),
  initialData: {
    batchID: '1111111',
    receiptID: '2222222',
    receiptEntryID: '3333333'
  }
};

describe('index/Reservation/components/LinkGroup', () => {
  Authority.init(window.__authoritiy__);
  const setup = (initProps, store) => mount(<LinkGroup {...initProps} />, { context: { store } });
  const mockStore = configurateStore();

  it('LinkGroup Components should render without errors', () => {
    const store = mockStore({});
    const component = setup({ store, runningCart, ...props }, store);
    component.find(Button).node.props.onClick();

    expect(component.find('.action-icons').length).toEqual(1);
    expect(component.find('.reservation-running-cart')).toHaveLength(1);
  });

  it('authority equal to hidden LinkGroup Components should render without errors', () => {
    const store = mockStore({});

    const component = setup({ runningCart, ...props }, store);
    expect(component.find('.reservation-running-cart')).toHaveLength(1);
  });

  it('authority equal to hidden LinkGroup Components should render with errors', () => {
    const authoritiy = [{
      "authorityType": "disabled",
      "id": "buttonToCalendarPage",
      "name": "Button To Calendar Page"
    }];
    Authority.init(authoritiy);
    const store = mockStore({});

    const component = setup({ runningCart, ...props }, store);
    expect(component.find('.reservation-running-cart')).toHaveLength(1);
  });
});

