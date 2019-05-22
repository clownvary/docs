/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */

import React from 'react';
import { fromJS } from 'immutable';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import Input from 'react-base-ui/lib/components/Input';
import Modal from 'react-base-ui/lib/components/Modal';
import Button from 'react-base-ui/lib/components/Button';

import middlewares from 'shared/api/middlewares';
import DataGrid from 'shared/components/DataGrid';
import { CashSummarySheet } from 'shared/components/CashSummarySheet';
import jsonCashSummarySheet from 'json/CashSummarySheet/fetch_cashSummarySheet.json';

const {
  body: {
    cashsummarysheetconfirmation
  }
} = jsonCashSummarySheet;

const initialState = {
  display: true,
  finished: false,
  ...cashsummarysheetconfirmation,
  css_list: fromJS(cashsummarysheetconfirmation.css_list),
  selectedCSS: fromJS(cashsummarysheetconfirmation.css_list[0]),
  selectedMode: 0, // 0= Use new cash summary sheet; 1= Use existing summary sheet
  floatAmount: null, //the float amount value which the user inputted
  canSubmit: true
};

function setup(css) {
  css = Object.assign({}, initialState, css);

  let store = null;
  const mockStore = configureStore(middlewares);
  store = mockStore({
    cashSummarySheet: fromJS(css)
  });

  const actions = {
    fetchCashSummarySheetAction: jest.fn(),
    showCashSummarySheetAction: jest.fn(),
    hideCashSummarySheetAction: jest.fn(),
    finishCashSummarySheetAction: jest.fn(),
    changeCashSummarySheetAction: jest.fn(),
    addCashSummarySheetCallBackAction: jest.fn(),
    triggerCallbackAction: jest.fn(),
    switchCashSummarySheetModeAction: jest.fn(),
    inputCashSummarySheetFloatAmountAction: jest.fn(),
    submitCashSummarySheetAction: jest.fn()
  };

  const component = mount( <CashSummarySheet store={store} data={fromJS(css)} {...actions} />);

  return {
    component: component,
    Modal: component.find(Modal),
    DataGrid: component.find(DataGrid),
    Radios: component.find('[name="CashSummarySheetMode"]'),
    RadioNew : component.find('[name="CashSummarySheetMode"]').first(),
    RadioExisting : component.find('[name="CashSummarySheetMode"]').last(),
    Input: component.find(Input).find('input'),
    Buttons: component.find(Button),
    ButtonSubmit: component.find(Button).last(),
    ButtonCancel: component.find(Button).first(),
    Container: component.find('.cashsummarysheet'),
    ContainerRadio: component.find('.cashsummarysheet-radio'),
    ContainerInput: component.find('.cashsummarysheet-new'),
    ContainerGrid: component.find('.cashsummarysheet-grid'),
    actions: actions,
  };
}

describe('shared/components/CashSummarySheet', () => {

  it('should render correctly with using New CSS', () => {
    const {
      Modal,
      Radios,
      Input,
      DataGrid,
      Buttons
    } = setup();

    expect(Modal.length).toEqual(1, `Modal length is ${Modal.length}, expet is 1`);
    expect(Radios.length).toEqual(2, `Radios length is ${Radios.length}, expet is 2`);
    expect(Input.length).toEqual(1, `Input length is ${Input.length}, expect is 1.`);
    expect(DataGrid.length).toEqual(0, `DataGrid length is ${DataGrid.length}, expet is 0`);
    expect(Buttons.length).toEqual(2, `Buttons lengtButtons is ${Buttons.length}, expet is 2`);
  });

  it('should render correctly with using Existing CSS', () => {
    const {
      Modal,
      Radios,
      Input,
      DataGrid,
      Buttons
    } = setup({
      selectedMode: 1
    });

    expect(Modal.length).toEqual(1, `Modal length is ${Modal.length}, expet is 1`);
    expect(Radios.length).toEqual(2, `Radios length is ${Radios.length}, expet is 2`);
    expect(Input.length).toEqual(0, `Input length is ${Input.length}, expect is 0.`);
    expect(DataGrid.length).toEqual(1, `DataGrid length is ${DataGrid.length}, expet is 1`);
    expect(Buttons.length).toEqual(2, `Buttons lengtButtons is ${Buttons.length}, expet is 2`);
  });

  it('should only render New CSS Section', () => {
    const {
      Modal,
      Radios,
      Input,
      DataGrid,
      Buttons
    } = setup({enable_float_amount_confirmation: true});

    expect(Modal.length).toEqual(1, `Modal length is ${Modal.length}, expet is 1`);
    expect(Radios.length).toEqual(0, `Radios length is ${Radios.length}, expet is 0`);
    expect(Input.length).toEqual(1, `Input length is ${Input.length}, expect is 1.`);
    expect(DataGrid.length).toEqual(0, `DataGrid length is ${DataGrid.length}, expet is 0`);
    expect(Buttons.length).toEqual(2, `Buttons lengtButtons is ${Buttons.length}, expet is 2`);
  });

  it('should trigger submit action ', () => {
    const { ButtonSubmit, actions } = setup();
    expect(typeof ButtonSubmit).toBe('object');
    expect(ButtonSubmit.text()).toEqual('Submit');
    ButtonSubmit.simulate('click');
    expect(actions.submitCashSummarySheetAction).toHaveBeenCalled();
  });

  it('should trigger cancel action ', () => {
    const { ButtonCancel, actions } = setup({selectedMode: 1});
    expect(typeof ButtonCancel).toBe('object');
    expect(ButtonCancel.text()).toEqual('Cancel');
    ButtonCancel.simulate('click');
    expect(actions.hideCashSummarySheetAction).toHaveBeenCalled();
  });

  it('should trigger Switch to New Section ', () => {
    const { RadioNew, actions } = setup();
    expect(typeof RadioNew).toBe('object');
    RadioNew.simulate('change', {});
    expect(actions.switchCashSummarySheetModeAction).toHaveBeenCalled();
  });

  it('should trigger Switch to Exsiting Section ', () => {
    const { RadioExisting, actions } = setup();
    expect(typeof RadioExisting).toBe('object');
    RadioExisting.simulate('change', {});
    expect(actions.switchCashSummarySheetModeAction).toHaveBeenCalled();
  });

  it('should trigger hideCashSummarySheetAction when close modal', () => {
    const { Modal, actions } = setup();
    Modal.first().props().onClose();
    expect(actions.hideCashSummarySheetAction).toHaveBeenCalled();
  });

  it('should trigger changeCashSummarySheetAction when selecting in datagrid', () => {
    const { DataGrid, actions } = setup({ selectedMode: 1 });
    DataGrid.first().props().onSelect({ id: 1 });
    expect(actions.changeCashSummarySheetAction).toHaveBeenCalled();
  });

  it('should trigger inputCashSummarySheetFloatAmountAction action ', () => {
    const { Input, actions } = setup();
    expect(typeof Input).toBe('object');
    Input.simulate('change', { target: { value: 'a' } });
    expect(actions.inputCashSummarySheetFloatAmountAction).not.toHaveBeenCalled();

    Input.simulate('change', { target: { value: 1 } });
    expect(actions.inputCashSummarySheetFloatAmountAction).toHaveBeenCalled();
  });
});
