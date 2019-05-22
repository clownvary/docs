import { is, fromJS } from 'immutable';
import {
  FETCH_STAGESEQUENCE_SUCCESS,
  UPDATE_STAGESEQUENCE_SUCCESS
} from 'index/PermitDetail/consts/actionTypes';
import reducers from 'index/PermitDetail/reducers/stageSequences';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';


const body = {
  stage_sequences: [
    {
      stage_sequence_id: 22,
      checked: true,
      stage_sequence_name: 'Allen_Test_Sequence11',
      associations: [
        'RL - EventType 02',
        '*1lillian_facility*',
        '*lillian_facility(Parent)'
      ]
    },
    {
      stage_sequence_id: 46,
      checked: true,
      stage_sequence_name: 'RL - 1',
      associations: [
        'RL - EventType 01',
        '*lillian_facility(Parent)'
      ]
    }
  ]
};

describe('index/PermitDetail/reducers', () => {
  const initialState = fromJS({
    stageSequencesList: []
  });

  it('Return the expected initial state', () => {
    const state = reducers(undefined, {});
    expect(is(initialState, state)).toBe(true);
  });

  it('fetch stageSequencesList should work fine', () => {
    const state = reducers(initialState, {
      type: FETCH_STAGESEQUENCE_SUCCESS,
      payload: { body }
    });
    expect(state.get('stageSequencesList').toJS()).toEqual(convertCasingPropObj(body.stage_sequences));
  });

  it('update stageSequences should  work fine', () => {
    const initState = fromJS({
      stageSequencesList: convertCasingPropObj(body.stage_sequences)
    });
    const state = reducers(initState, {
      type: UPDATE_STAGESEQUENCE_SUCCESS,
      payload: 22
    });
    expect(state.getIn(['stageSequencesList', 0]).get('checked')).toEqual(false);
  });
});
