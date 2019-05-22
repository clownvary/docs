import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import {
  SET_CARD_INFO,
  SHOW_MODAL,
  SET_AMS_ACCOUNT_INFO,
  SET_SERVER_ERROR
} from '../../actions/modals/Magtek';

const initialState = fromJS({
  cardInfo: {},
  AMSAccountInfo: {},
  isShowModal: false,
  totalFee: '0.00',
  cardTypeList: [],
  error: ''
});

const handlers = {
  [SET_CARD_INFO](state, { payload: { cardInfo } }) {
    return state.set('cardInfo', fromJS(cardInfo));
  },
  [SET_AMS_ACCOUNT_INFO](state, { payload: { AMSAccountInfo } }) {
    return state.set('AMSAccountInfo', fromJS(AMSAccountInfo));
  },
  [SHOW_MODAL](state, { payload: {
    isShowModal, totalFee, cardTypeList, isShowSaveCardInformation
  } }) {
    return state.withMutations((s) => {
      s.set('totalFee', totalFee);
      s.set('cardTypeList', cardTypeList);
      s.set('isShowModal', isShowModal);
      s.set('isShowSaveCardInformation', isShowSaveCardInformation);
    });
  },
  [SET_SERVER_ERROR](state, { payload: { error } }) {
    return state.set('error', fromJS(error));
  }
};

export default reducerHandler(initialState, handlers);
