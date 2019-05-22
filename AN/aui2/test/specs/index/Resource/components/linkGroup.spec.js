import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import LinkGroup from 'index/Resource/components/LinkGroup';
import jsonRunningCart from 'json/Cart/runningCart.json';
import authority from 'json/authority/authorities.json';
import { Authority, AuthorityType } from 'shared/authorities';


const {
  body: { running_cart }
} = jsonRunningCart;


const runningCart = fromJS({
  cartList: running_cart,
  cartLoading: false,
  error: false
});
const initialData = {
  permitID: -1,
  eventID: 2,
  batchID: '1111111',
  receiptID: '2222222',
  receiptEntryID: '3333333'
};
const props = {
  redirect: jest.fn(),
  initialData
};

describe('index/Resource/components/LinkGroup', () => {
  Authority.init(window.__authoritiy__);
  const setup = (initProps, store) => mount(<LinkGroup {...initProps} />, { context: { store } });
  const mockStore = configureStore();

  it('LinkGroup Components should render without errors', () => {
    const store = mockStore({});
    const component = setup({ store, runningCart, ...props }, store);
    expect(component.find('.booking-resources__link-group').length).toEqual(1);

  });

  it('authority equal to hidden LinkGroup Components should render without errors', () => {
    const authoritiy = [{
      "authorityType": "disabled",
      "id": "buttonToReservationsPage",
      "name": "Button To Reservations Page"
    }];
    Authority.init(authoritiy);
    const store = mockStore({});
    const component = setup({ store, runningCart, ...props }, store);
    expect(component.find('.intro-step-2').length).toBe(0);
  });

  it('authority equal to disabled LinkGroup Components should render without errors', () => {
    const store = mockStore({
      authority: fromJS({
        authorities: [{
          authorityType: AuthorityType.DISABLED,
          id: 'buttonToReservationsPage',
          name: 'Button To Reservations Page'
        }]
      })
    });
    const component = setup({ store, runningCart, ...props }, store);
    component.node.viewBookingClick();
    expect(component.find('.intro-step-2').length).toBe(0);
  });

  it('authority equal to display LinkGroup Components should render without errors', () => {
    const store = mockStore({});

    window.promptWhenLeavePage = () => ({});
    const component = setup({ runningCart, ...props, initialData: { ...initialData, permitID: 1 } }, store);
    component.node.viewBookingClick();
    expect(component.find('.intro-step-2').length).toBe(0);
  });
});

