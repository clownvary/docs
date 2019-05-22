import { is, fromJS } from 'immutable';
import * as actionTypes from 'index/modules/Daycare/EnrollForm/consts/actionTypes';
import enrollDetailReducer from 'index/modules/Daycare/EnrollForm/reducers/enrollDetail';

describe('index/modules/Daycare/EnrollForm/reducers/enrollDetail', () => {
  const initialState = fromJS({
    authorizedRequired: false,
    pickupList: [],
    selectedPickupIds: []
  });

  it('Should return the expected initial state', () => {
    const { DETAIL_UI_RESET } = actionTypes;
    expect(is(initialState, enrollDetailReducer(undefined, {}))).toBeTruthy();
    expect(is(initialState, enrollDetailReducer(undefined, {
      type: DETAIL_UI_RESET }))).toBeTruthy();
  });

  it('Should save selected pickup id list correctly', () => {
    const { PICKUP_UI_SELECTED } = actionTypes;
    const pickupIds = [1, 2, 3];

    const returnState = enrollDetailReducer(initialState, {
      type: PICKUP_UI_SELECTED,
      payload: { pickupIds }
    });
    expect(is(returnState.get('selectedPickupIds'), fromJS(pickupIds))).toBeTruthy();
  });

  it('Should save pickup response data correctly', () => {
    const { PICKUP_UI_LIST } = actionTypes;
    const pickupData = {
      enable_authorized_pickups: true,
      authorized_pickups: [{ customer_id: 1 }, { customer_id: 2 }],
      pickups: [{ customer_id: 2 }, { customer_id: 3 }]
    };

    const returnState = enrollDetailReducer(initialState, {
      type: PICKUP_UI_LIST,
      payload: { pickupData }
    });
    expect(returnState.get('pickupList')).toHaveLength(3);
    expect(returnState.get('selectedPickupIds')).toHaveLength(2);

    const returnState2 = enrollDetailReducer(initialState, {
      type: PICKUP_UI_LIST,
      payload: { pickupData: null }
    });
    expect(is(initialState, returnState2)).toBeTruthy();
  });
});
