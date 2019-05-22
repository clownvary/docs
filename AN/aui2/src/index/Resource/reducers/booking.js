import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import {
  BOOKING_RESET_UNEDITABLE_BOOKINGS
} from '../actions/booking';

const initialState = fromJS({
  unEditableBookings: []
});

const handlers = {
  [BOOKING_RESET_UNEDITABLE_BOOKINGS](state, { payload: { unEditableBookings } }) {
    return state.set('unEditableBookings', fromJS(unEditableBookings));
  }
};

export default reducerHandler(initialState, handlers);
