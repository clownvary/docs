import { fromJS } from 'immutable';
import magtekReducer from 'index/Payment/reducers/modals/Magtek';
import * as actions from 'index/Payment/actions/modals/Magtek';

const initialState = fromJS({
  cardInfo: {},
  AMSAccountInfo: {},
  isShowModal: false,
  totalFee: '0.00',
  ccScanWithMagesafeDevice: true,
  ccMagesafeDeviceType: 'MagtekDynamag',
  cardTypeList: [],
  error: ''
});

describe('index -> Payment -> reducers -> Magtek', () => {
  it('Should update card information well.', () => {
    const { SET_CARD_INFO } = actions;
    const cardInfo = {
      number: '111'
    };

    const state = magtekReducer(initialState, {
      type: SET_CARD_INFO,
      payload: {
        cardInfo
      }
    });

    expect(state.get('cardInfo').toJS()).toEqual(cardInfo);
  });

  it('Should update AMS account information well.', () => {
    const { SET_AMS_ACCOUNT_INFO } = actions;
    const AMSAccountInfo = {
      accountNumber: '123344'
    };
    const state = magtekReducer(initialState, {
      type: SET_AMS_ACCOUNT_INFO,
      payload: {
        AMSAccountInfo
      }
    });

    expect(state.get('AMSAccountInfo').toJS()).toEqual(AMSAccountInfo);
  });

  it('Should init magtek modal correctly.', () => {
    const { SHOW_MODAL } = actions;
    const isShowModal = true;
    const totalFee = 123;
    const cardTypeList = [{
      name: 'magtek',
      number: 'xxxxx'
    }];

    const state = magtekReducer(initialState, {
      type: SHOW_MODAL,
      payload: {
        isShowModal,
        totalFee,
        cardTypeList
      }
    });

    expect(state.get('isShowModal')).toEqual(isShowModal);
    expect(state.get('totalFee')).toEqual(totalFee);
    expect(state.get('cardTypeList')).toEqual(cardTypeList);
  });

  it('Should update device error correctly.', () => {
    const { SET_SERVER_ERROR } = actions;
    const error = ['error 1', 'error 2'];
    const state = magtekReducer(initialState, {
      type: SET_SERVER_ERROR,
      payload: {
        error
      }
    });

    expect(state.get('error').toJS()).toEqual(error);
  });
});
