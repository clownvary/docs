import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';
import { count } from 'react-base-ui/lib/utils/dataAccess';
import {
  FETCH_PERMIT_STAGESEQUENCE_SUCCESS,
  FORMAT_STAGE_LIST,
  GET_ONE_STAGESEQUENCE_SUCCESS,
  DELETE_STAGESEQUENCE_SUCCESS,
  LOAD_ADD_STAGESEQUENCES_SUCCESS,
  UPDATE_STAGESEQUENCE_SUCCESS,
  RESET_LOAD_ADD_STAGESEQUENCES,
  STAGE_SEQUENCES_CHANGE,
  FETCH_COUNT_STAGESEQUENCE_SUCCESS,
  UPDATE_COLLAPSE_EXTEND_ENUM,
  UPDATE_ONE_COLLAPSE_STATUS,
  IS_CHANGE_USER,
  CHANGE_STAGE_USER
} from '../consts/actionTypes';
import formatStageList from '../utils/formatStageList';
import updateStageUser from '../utils/updateStageUser';

const initialState = fromJS({
  stageSequencesList: [],
  addableStageSequences: [],
  stageListData: [],
  stageSequenceCount: '0/0',
  isStageSequencesChange: false,
  collapseExtendEnum: {},
  isChangeStageCustomer: false
});

const handlers = {
  [FETCH_PERMIT_STAGESEQUENCE_SUCCESS](state, {
    payload: {
      body: {
        stage_sequences,
        has_addable_stagesequence
      }
    }
  }) {
    return state
      .set('stageSequencesList', fromJS(convertCasingPropObj(stage_sequences)))
      .set('hasAddableStagesequence', has_addable_stagesequence);
  },

  [FORMAT_STAGE_LIST](state, {
    payload: systemUserID
  }) {
    return state.set('stageListData', fromJS(formatStageList(state.get('stageSequencesList'), systemUserID)));
  },

  [GET_ONE_STAGESEQUENCE_SUCCESS](state, {
    payload: {
      body: {
        stage_sequence
      }
    }
  }) {
    const oneStageSequence = convertCasingPropObj(stage_sequence);
    const updateStageIndex = state
      .get('stageSequencesList')
      .findIndex(item => item.get('stageSequenceID') === oneStageSequence.stageSequenceID);

    return state.setIn(['stageSequencesList', updateStageIndex], fromJS(oneStageSequence));
  },

  [FETCH_COUNT_STAGESEQUENCE_SUCCESS](state, {
    payload: {
      body: {
        stage_sequence_count,
        permit_status
      }
    }
  }) {
    return state
      .set('stageSequenceCount', stage_sequence_count)
      .set('permitStatus', permit_status);
  },

  [LOAD_ADD_STAGESEQUENCES_SUCCESS](state, {
    payload: {
      body: { addable_stage_sequences }
    }
  }) {
    return state.set('addableStageSequences', fromJS(convertCasingPropObj(addable_stage_sequences)));
  },

  [RESET_LOAD_ADD_STAGESEQUENCES](state) {
    return state.set('addableStageSequences', fromJS([]));
  },

  [UPDATE_STAGESEQUENCE_SUCCESS](state, { payload: stageSequenceID }) {
    const currentIndex = state
      .get('addableStageSequences')
      .findIndex(item => item.get('stageSequenceID') === stageSequenceID);

    return state.updateIn(['addableStageSequences', currentIndex],
      item => item.withMutations((value) => { value.set('checked', !value.get('checked')); }));
  },

  [DELETE_STAGESEQUENCE_SUCCESS](state, {
    payload: stageSequenceID
  }) {
    const stageListData = state.get('stageListData');
    const stageSequencesList = state.get('stageSequencesList');
    const deleteStageIndex = stageListData
      .findIndex(item => item.getIn(['header', 'stageSequenceID']) === stageSequenceID);

    return state.set('stageListData', stageListData.delete(deleteStageIndex))
          .set('stageSequencesList', stageSequencesList.delete(deleteStageIndex));
  },

  [STAGE_SEQUENCES_CHANGE](state, {
    payload: isChange
  }) {
    return state.set('isStageSequencesChange', isChange);
  },

  [UPDATE_COLLAPSE_EXTEND_ENUM](state) {
    const stageSequencesList = state.get('stageListData');
    const collapseExtendEnum = {};

    stageSequencesList.forEach((panelItem) => {
      const hasProcessAndPermission = panelItem.getIn(['header', 'hasProcessAndPermission']);
      const stageSequenceID = panelItem.getIn(['header', 'stageSequenceID']);
      collapseExtendEnum[stageSequenceID] = count(stageSequencesList) === 1 ||
        hasProcessAndPermission;
    });

    return state.set('collapseExtendEnum', fromJS(collapseExtendEnum));
  },

  [UPDATE_ONE_COLLAPSE_STATUS](state, {
    payload: stageSequenceID
  }) {
    const collapseExtendEnum = state.get('collapseExtendEnum');
    return state.setIn(['collapseExtendEnum', `${stageSequenceID}`], !collapseExtendEnum.get(`${stageSequenceID}`));
  },

  [IS_CHANGE_USER](state, {
    payload: params
  }) {
    return state.set('isChangeStageCustomer', params);
  },

  [CHANGE_STAGE_USER](state, {
    payload: params
  }) {
    return state.set('stageListData', updateStageUser(state.get('stageListData'), params));
  }
};

export default reducerHandler(initialState, handlers);
