import { fromJS } from 'immutable';
import unionBy from 'lodash/unionBy';
import reducerHandler from 'react-base-ui/lib/utils/reducerHandler';

import {
  PICKUP_UI_LIST,
  PICKUP_UI_SELECTED,
  DETAIL_UI_RESET
} from '../consts/actionTypes';

const initialState = fromJS({
  authorizedRequired: false,
  pickupList: [],
  selectedPickupIds: []
});

const mergePickups = (pickups1, pickups2) => unionBy(pickups1, pickups2, 'customer_id');

const handlers = {
  [PICKUP_UI_LIST](state, { payload: { pickupData } }) {
    if (pickupData) {
      return state.withMutations((s) => {
        s.set('authorizedRequired', pickupData.enable_authorized_pickups);
        const mergedPickups = mergePickups(pickupData.authorized_pickups, pickupData.pickups);
        s.set('pickupList', fromJS(mergedPickups));
        const defaultPickupIds = pickupData.authorized_pickups.map(pickup => pickup.customer_id);
        s.set('selectedPickupIds', fromJS(defaultPickupIds));
      });
    }
    return state;
  },

  [PICKUP_UI_SELECTED](state, { payload: { pickupIds } }) {
    return state.set('selectedPickupIds', fromJS(pickupIds));
  },

  [DETAIL_UI_RESET]() {
    return initialState;
  }
};

export default reducerHandler(initialState, handlers);
