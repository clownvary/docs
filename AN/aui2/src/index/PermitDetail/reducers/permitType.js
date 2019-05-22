import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import normalizeData from 'shared/utils/normalizeData';

import {
  formatTypesData,
  changeTypeSelected,
  changeUsersSelected,
  changeExpirationDate
} from '../utils/formatTypesData';

import {
  SET_PERMIT_RESERVATION_USERS,
  SET_PERMIT_RESERVATION_DATE,
  SET_PERMIT_RESERVATION_TYPE
} from '../actions/permitType';

const getInitialState = (initData) => {
  const {
    currentDate,
    dateFormat,
    batchID,
    receiptID,
    receiptEntryID,
    permitTypeDetail: {
      permit_hold_types: permitHoldTypes,
      expiration_date: expirationDate,
      default_expiration_date: defaultExpirationDate,
      permit_reservation_users: permitReservationUsersSelected
    },
    permitReservationUsers
  } = initData;
  const initTypeList = formatTypesData(permitHoldTypes, expirationDate, defaultExpirationDate);

  return fromJS({
    currentDate,
    dateFormat,
    batchID,
    receiptID,
    receiptEntryID,
    permitTypes: initTypeList.data,
    permitTypesVal: initTypeList.selected,
    permitReservationUsersSelected: permitReservationUsersSelected || [],
    permitReservationUsers: permitReservationUsers ?
      normalizeData(permitReservationUsers).data : null,
    resize: false
  });
};

const handlers = {

  [SET_PERMIT_RESERVATION_DATE](state, { payload: { value } }) {
    return state.withMutations((s) => {
      const types = changeExpirationDate(s.get('permitTypes').toJS(), value);
      s.set('permitTypes', fromJS(types));
    });
  },

  [SET_PERMIT_RESERVATION_TYPE](state, { payload: { value } }) {
    return state.withMutations((s) => {
      const typesSeleted = changeTypeSelected(s.get('permitTypes').toJS(), value);

      s.set('permitTypesVal', value);
      s.set('permitTypes', fromJS(typesSeleted));
    });
  },

  [SET_PERMIT_RESERVATION_USERS](state, { payload: { value } }) {
    return state.withMutations((s) => {
      const usersSeleted = changeUsersSelected(s.get('permitReservationUsers').toJS(), value);

      s.set('permitReservationUsersSelected', fromJS(value));
      s.set('permitReservationUsers', fromJS(usersSeleted));
    });
  }
};

export default function getPermitTypeReducer(initData) {
  return reducerHandler(getInitialState(initData), handlers);
}

