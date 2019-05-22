import {
  SET_PERMIT_RESERVATION_DATE,
  SET_PERMIT_RESERVATION_TYPE,
  SET_PERMIT_RESERVATION_USERS
} from 'index/PermitDetail/actions/permitType';

import normalizeData from 'shared/utils/normalizeData';
import getPermitTypeReducer from 'index/PermitDetail/reducers/permitType';

const reducer = getPermitTypeReducer(__permitDetail__.__initialState__);

describe('index/PermitDetail/reducers/permitType.js', () => {
  it('create inital state corretly', () => {
    const permitTypeDetail = window.__permitDetail__.__initialState__.permitTypeDetail;
    const types = permitTypeDetail.permit_hold_types;
    const users = window.__permitDetail__.__initialState__.permitReservationUsers;

    let state = reducer(undefined, {});

    expect(state.get('permitTypes').size).toEqual(types.length);
    expect(state.get('permitReservationUsers').toJS()).toEqual(normalizeData(users).data);
  })

  it('should handle SET_PERMIT_RESERVATION_DATE correctly', () => {
    const newDate = 'Jun 18, 2017';

    const state = reducer(undefined, {
      type: SET_PERMIT_RESERVATION_DATE,
      payload: { value: newDate }
    });

    const permitTypes = state.get('permitTypes').toJS();
    const selectedPermitTypes = permitTypes.filter(pt => pt.selected);

    expect(selectedPermitTypes.length).toEqual(1);
    expect(selectedPermitTypes[0].permitExpirationDate).toEqual(newDate);
  });

  it('should handle SET_PERMIT_RESERVATION_TYPE correctly', () => {
    const newType = 1
    const state = reducer(undefined, {
      type: SET_PERMIT_RESERVATION_TYPE,
      payload: { value: newType }
    });

    const permitTypes = state.get('permitTypes').toJS();
    const selectedPermitTypes = permitTypes.filter(pt => pt.selected);

    expect(selectedPermitTypes.length).toEqual(1);
    expect(selectedPermitTypes[0].value).toEqual(newType);
    expect(state.get('permitTypesVal')).toEqual(newType);
  });

  it('should handle SET_PERMIT_RESERVATION_USERS correctly', () => {
    const newUsers = [230];
    const state = reducer(undefined, {
      type: SET_PERMIT_RESERVATION_USERS,
      payload: { value: newUsers }
    });

    const users = state.get('permitReservationUsers').toJS();
    const selectedUsers = users.filter(u => u.selected);

    expect(state.get('permitReservationUsersSelected').toJS()).toEqual(newUsers);
    expect(selectedUsers.map(u => u.id)).toEqual(newUsers);
  });


  it('if permit_reservation_users is null getPermitTypeReducer should works fine, ', () => {
    const initState = {
      permitTypeDetail: {
        permit_hold_types: [],
        permit_reservation_users: '',
        expiration_date: 'Jul 12, 2016',
        default_expiration_date: 'Jul 14, 2016'
      },
      permitReservationUsers: '',
    }
    getPermitTypeReducer(initState);
  });
})

