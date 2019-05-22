import { fromJS } from 'immutable';
import reducer from 'index/Payment/reducers/paymentOptions/account';
import * as actions from 'index/Payment/actions/paymentOptions/account';
import {
  CHANGE_REFUND_ACCOUNT_OTHER_REASON,
  CHANGE_REFUND_REASON
} from "../../../../../src/index/Payment/actions/paymentOptions/account";

jest.mock('index/Payment/store', () => ({
  getState: jest.fn(),
  dispatch: jest.fn()
}));

describe('index/Payment/reducers/paymentOptions/account', () => {
  it('FETCH_REFUND_ACCOUNT_CONFIG_SUCCESS should work fine', () => {
    const { FETCH_REFUND_ACCOUNT_CONFIG_SUCCESS } = actions;
    const options = {
      reasons: [
        { id: '112', name: 'reason1' },
        { id: '113', name: 'reason2' },
      ],
      display: true,
      request_refund: true
    };
    const state = reducer(fromJS({}), {
      type: FETCH_REFUND_ACCOUNT_CONFIG_SUCCESS,
      payload: { body: { options } }
    });
    expect(state.get('display')).toEqual(options.display);
    expect(state.get('requestRefund')).toEqual(options.request_refund);
    expect(state.get('reasons')).toEqual(fromJS({
      data: [
        { id: '112', name: 'reason1', text: 'reason1', value: '112' },
        { id: '113', name: 'reason2', text: 'reason2', value: '113' }
      ],
      selected: -1,
      otherReason: ''
    }));
  });

  it('TOGGLE_REQUEST_REFUND should work fine', () => {
    const { TOGGLE_REQUEST_REFUND } = actions;
    const checked = true;
    const state = reducer(fromJS({}), {
      type: TOGGLE_REQUEST_REFUND,
      payload: { checked }
    });
    expect(state.get('requestRefund')).toEqual(checked);
  });

  it('CHANGE_REFUND_REASON should work fine', () => {
    const { CHANGE_REFUND_REASON } = actions;
    const selected = '114';
    const state = reducer(fromJS({
      reasons: {
        data: [
          { id: '112', name: 'reason1', text: 'reason1', value: '112' },
          { id: '113', name: 'reason2', text: 'reason2', value: '113' }
        ]
      }
    }), {
      type: CHANGE_REFUND_REASON,
      payload: { selected }
    });
    expect(state.getIn(['reasons', 'otherReason'])).toEqual('');
    expect(state.getIn(['reasons', 'selected'])).toEqual(selected);
  });

  it('CHANGE_REFUND_ACCOUNT_OTHER_REASON should work fine', () => {
    const { CHANGE_REFUND_ACCOUNT_OTHER_REASON } = actions;
    const otherReason = 'other reason';
    const state = reducer(fromJS({}), {
      type: CHANGE_REFUND_ACCOUNT_OTHER_REASON,
      payload: { otherReason }
    });
    expect(state.getIn(['reasons', 'otherReason'])).toEqual(otherReason);
  });
});
