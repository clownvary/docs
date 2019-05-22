import React from 'react';
import { fromJS } from 'immutable';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import Confirmation from 'index/Confirmation';

const setup = (store, props) => mount(<Confirmation {...props} />, { context: { store } });
const initialData = {
  receiptHeaderID: 0,
  permitWording: 'Permit'
};

describe('index/Confirmation/index', () => {
  const store = configureStore(middlewares)({
    winResize: fromJS({ resize: false }),
    permitConfirmation: fromJS({
      permitNumber: null,
      autoPrintPermits: false,
      autoPrintReceipts: false,
      email: '',
      receiptHeaderID: '',
      permitOwnerName: '',
      customerName: '',
      companyName: '',
      permitTransactions: [],
      automaticReceiptEmail: false,
      receiptNumber: ''
    }),
    error: fromJS({
      list: [],
      systemErrors: [],
      businessErrors: []
    }),
    loading: fromJS({
      display: false,
      text: ''
    }),
    initialData
  });
  const getProps = (props = {}) => (Object.assign({
    winResize: fromJS({ resize: false }),
    permitConfirmation: fromJS({})
  }, props));

  it('component and initialization works fine', () => {
    const component = setup(store, getProps());

    const container = component.find('div.confirmation-page');

    expect(container.find('PermitConfirmation')).toHaveLength(1);
    expect(container.find('Error')).toHaveLength(1);
  });
});

jest.mock('shared/utils/iframe', () => ({
  isInIframe: true
}) );
jest.mock('shared/components/Root', () => ({
  caculateIframeHeight(){ return 10 }
}) );
jest.mock('shared/components/BreadCrumb', () => 'BreadCrumb' );

describe('index/Confirmation/index is in Iframe', () => {
  const store = configureStore(middlewares)({
    winResize: fromJS({ resize: true }),
    permitConfirmation: fromJS({
      permitNumber: null,
      autoPrintPermits: false,
      autoPrintReceipts: false,
      email: '',
      receiptHeaderID: '',
      permitOwnerName: '',
      customerName: '',
      companyName: '',
      permitTransactions: [],
      automaticReceiptEmail: false,
      receiptNumber: ''
    }),
    error: fromJS({
      list: [],
      systemErrors: [],
      businessErrors: []
    }),
    loading: fromJS({
      display: false,
      text: ''
    }),
    initialData
  });

  const getProps = (props = {}) => (Object.assign({
    winResize: fromJS({ resize: true }),
    permitConfirmation: fromJS({}),
  }, props));

  it('component works when winResize is true', () => {
    __STATIC__ = false;
    const component = setup(store, getProps());
    const container = component.find('div.confirmation-page');

    expect(container.find('PermitConfirmation')).toHaveLength(1);
    expect(container.find('Error')).toHaveLength(1);
  });
});
