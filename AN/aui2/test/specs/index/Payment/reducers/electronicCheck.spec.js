import { fromJS } from 'immutable';
import { CHANGE_PAYER } from 'index/Payment/actions/payer';
import {
  ECHECK_FETCH_CHECKS_SUCCESS,
  ECHECK_FETCH_CONFIG_SUCCESS,
  ECHECK_FETCH_ACH_SUCCESS,
  ECHECK_ADD_NEW_TO_LIST
} from 'index/Payment/actions/paymentOptions/electronicCheck';
import reducer from 'index/Payment/reducers/paymentOptions/electronicCheck';

// blocked by index/Payment/components/PaymentOptions/utils/payment.js
// which should not import store to do changes
jest.mock('index/Payment/store', () => ({}));

describe('index/Payment/reducers/paymentOptions/electronicCheck', () => {
  it('ECHECK_FETCH_CHECKS_SUCCESS should work fine', () => {
    const body = { echeck_list: [{ echeck_id: '7901', name: 'echeck#7901' }] };
    const state = reducer(fromJS({}), {
      type: ECHECK_FETCH_CHECKS_SUCCESS,
      payload: { body }
    });
    expect(state.get('eCheckListDropDown')).toEqual(fromJS({
      data: [
        { echeck_id: '7901', name: 'echeck#7901', text: 'echeck#7901', value: '7901' },
        { value: 'newOptionValue', text: 'Use new Electronic Checkcc' }
      ],
      selected: []
    }));
  });

  it('ECHECK_FETCH_CONFIG_SUCCESS should work fine', () => {
    const body = { echeck_config_info: {} };
    const state = reducer(fromJS({}), {
      type: ECHECK_FETCH_CONFIG_SUCCESS,
      payload: { body }
    });
    expect(state.get('eCheckConfig')).toEqual(fromJS({}));
  });

  it('ECHECK_FETCH_ACH_SUCCESS should work fine', () => {
    const body = { result: { contents: [] } };
    const state = reducer(fromJS({}), {
      type: ECHECK_FETCH_ACH_SUCCESS,
      payload: { body }
    });
    expect(state.get('achContent')).toEqual(fromJS([]));
  });

  it('CHANGE_PAYER should work fine', () => {
    const state = reducer(fromJS({}), { type: CHANGE_PAYER });
    expect(state.get('eCheckListDropDown')).toEqual(fromJS({ data: [] }));
  });

  it('ECHECK_ADD_NEW_TO_LIST should work fine', () => {
    const newOption = { echeck_id: '7901', name: 'echeck#7901' };
    const state = reducer(fromJS({
      eCheckListDropDown: { data: [{
        echeck_id: '7901', name: 'echeck#7901'
      }] }
    }), {
      type: ECHECK_ADD_NEW_TO_LIST,
      payload: { newOption }
    });
    expect(state.get('eCheckListDropDown')).toEqual(fromJS({
      data: [
        { value: 'newOptionValue', text: 'Use new Electronic Checkcc' }
      ],
      selected: []
    }));
  });
});
