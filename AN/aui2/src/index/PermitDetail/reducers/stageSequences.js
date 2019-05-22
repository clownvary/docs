import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';
import {
  FETCH_STAGESEQUENCE_SUCCESS,
  UPDATE_STAGESEQUENCE_SUCCESS
} from '../consts/actionTypes';

const initialState = fromJS({
  stageSequencesList: []
});

const handlers = {
  [FETCH_STAGESEQUENCE_SUCCESS](state, { payload: { body: data } }) {
    return state.set('stageSequencesList', fromJS(convertCasingPropObj(data.stage_sequences)));
  },
  [UPDATE_STAGESEQUENCE_SUCCESS](state, { payload: stageSequenceID }) {
    const currentIndex = state
      .get('stageSequencesList')
      .findIndex(item => item.get('stageSequenceID') === stageSequenceID);

    return state.updateIn(['stageSequencesList', currentIndex],
      item => item.withMutations((value) => { value.set('checked', !value.get('checked')); }));
  }
};

export default reducerHandler(initialState, handlers);
