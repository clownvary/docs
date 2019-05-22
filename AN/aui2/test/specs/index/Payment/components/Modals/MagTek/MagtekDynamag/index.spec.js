import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import Button from 'react-base-ui/lib/components/Button';
import AAUICheckbox from 'react-base-ui/lib/components/Checkbox';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import MagtekDynamag from 'index/Payment/components/Modals/MagTek/MagtekDynamag';
import Modal from 'react-base-ui/lib/components/Modal';

jest.mock('react-base-ui/lib/components/Modal', () => 'Modal');

describe('index/Payment/components/Modals/MagTek/MagtekDynamag', () => {

  let store;

  beforeEach(() => {
    store = configureStore(middlewares)({});
  });
  const renderWSIHelper = jest.fn;

  const actions = {
    setServerError: jest.fn(),
    hideModalAction: jest.fn(),
    setCardInfo: jest.fn(),
    generateWalletID: jest.fn(),
    payment: jest.fn()
  }
  const props = {
    cardType: "Credit Card",
    payAccmount: "0.00",
    showModal: false,
    serverError: "",
    isShowSaveCardInformation: false,
    cardTypeList: undefined,
    renderWSIHelper
  };
  const setup = (store, props) => mount(<MagtekDynamag store={store} {...props} {...actions} />);

  it('component should render correctly when hasn`t shown modal', () => {
    const component = setup(store, props);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('component should render correctly when has show modal and is in refund workflow', () => {
    const newProps = {
      ...props,
      isShowSaveCardInformation: true,
      showModal: true
    };
    const component = setup(store, newProps);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('component should work fine on interaction', () => {
    const component = setup(store, props);
    expect(component).toBeTruthy();
    window.magTekInput = {
      magTekSetInfoMessage: jest.fn(),
      enableModeButtons: jest.fn(),
      magTekInputReset: jest.fn(),
      doRequestInput: jest.fn(),
      magTekLoadApplet: jest.fn()
    }
    window.magTekApplet = {
      DeviceEndSession: jest.fn()
    }
    const instance = component.instance();
    instance.generateWalletID({
      expirationDate: ''
    });
    component.setProps({
      ...props,
      showModal: true,
      isShowSaveCardInformation: false,
      serverError: 'error happend'
    });
    component.setState({
      showMsgInfo: false,
      showErrorInfo: true,
      showCardInfo: true,
      showMagtekHelp: true
    });
    component.find('a').at(0).simulate('click');
    component.find(Button).at(0).simulate('click');
    component.find(Button).at(1).simulate('click');
    component.find(Button).at(2).simulate('click');
    component.find(AAUICheckbox).find('input').at(0).simulate('change');
    instance.setErrorMessage('', false);
    instance.setCradInfo({maskCard: ''}, 'missing account holder name');
    instance.setCradInfo({maskCard: ''}, '');
    instance.setInfoMessage('Encrypting credit card...');
    component.setState({
      use_old_method: true
    })
    instance.init();
    instance.magTekInputDialog();
    expect(actions.setServerError).toHaveBeenCalled();
    expect(actions.hideModalAction).toHaveBeenCalled();
    expect(actions.setCardInfo).toHaveBeenCalled();
    expect(actions.generateWalletID).toHaveBeenCalled();
    expect(actions.payment).toHaveBeenCalled();
  });
});
