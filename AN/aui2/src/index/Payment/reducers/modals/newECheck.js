import { fromJS } from 'immutable';
import find from 'lodash/find';

import reducerHandler from 'shared/utils/reducerHandler';
import normalizeData from 'shared/utils/normalizeData';
import {
  ECHECK_NEW_CHANGE_ACCOUNT_TYPE,
  ECHECK_NEW_CHANGE_SAVEINFORMATION,
  ECHECK_NEW_SET_ERROR,
  ECHECK_NEW_SET_SHOW_MODAL
} from '../../actions/modals/NewECheck';

const echeckAccountTypeList = [
  {
    selected: true,
    account_type: 'C',
    account_type_name: 'Checking'
  },
  {
    selected: false,
    account_type: 'S',
    account_type_name: 'Savings'
  }
];

const initialState = fromJS({
  accountTypeValue: find(echeckAccountTypeList, v => !!v.selected).account_type,
  saveInformation: true,

  showModel: false,
  accountTypeList: normalizeData(echeckAccountTypeList, {
    valueField: 'account_type',
    textField: 'account_type_name'
  }),
  newEcheckError: ''
});


const handlers = {

  [ECHECK_NEW_CHANGE_ACCOUNT_TYPE](state, { payload: { value } }) {
    return state.set('accountTypeValue', value);
  },

  [ECHECK_NEW_CHANGE_SAVEINFORMATION](state, { payload: { value } }) {
    return state.set('saveInformation', value);
  },

  [ECHECK_NEW_SET_ERROR](state, { payload: { error } }) {
    return state.set('newEcheckError', error);
  },

  [ECHECK_NEW_SET_SHOW_MODAL](state, { payload: { display } }) {
    return state.set('showModel', display);
  }
};

export default reducerHandler(initialState, handlers);
