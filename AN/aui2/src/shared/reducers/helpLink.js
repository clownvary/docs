import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import FETCH_HELP_SUCCESS from 'shared/consts/helpLink';


const initialState = fromJS({ data: {} });


const handlers = {
  [FETCH_HELP_SUCCESS](state, { payload: { body: { help } } }) {
    return state.set('data', help);
  }
};

export default reducerHandler(initialState, handlers);
