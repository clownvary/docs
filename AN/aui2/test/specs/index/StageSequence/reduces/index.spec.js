import { fromJS } from 'immutable';
import {
  FETCH_PERMIT_STAGESEQUENCE_SUCCESS,
  GET_ONE_STAGESEQUENCE_SUCCESS,
  LOAD_ADD_STAGESEQUENCES_SUCCESS,
  RESET_LOAD_ADD_STAGESEQUENCES,
  UPDATE_STAGESEQUENCE_SUCCESS,
  DELETE_STAGESEQUENCE_SUCCESS,
  STAGE_SEQUENCES_CHANGE,
  FETCH_COUNT_STAGESEQUENCE_SUCCESS,
  UPDATE_ONE_COLLAPSE_STATUS,
  UPDATE_COLLAPSE_EXTEND_ENUM,
  FORMAT_STAGE_LIST,
  IS_CHANGE_USER,
  CHANGE_STAGE_USER
} from 'index/StageSequence/consts/actionTypes';
import reducers from 'index/StageSequence/reducers';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';

const stageData = {
  stage_sequence_id: 22,
  checked: true,
  stage_sequence_name: 'Allen_Test_Sequence',
  associations: 'CD_General | CD_FootBall_Room#1',
  stage_links: [
    {
      head_stage: {
        trasaction_stage_id: 3618,
        stage_id: 50,
        stage_name: 'CD_TEST_#1',
        status: 1,
        transaction_id: 69227,
        approval_user_id: 192,
        comments: 'Comment: It was a humorously perilous business for both of us. For, before we proceed further, it must be said that the monkey-rope was fast at both ends; fast to Queequeg\'s broad canvas belt, and fast to my narrow leather one. ',
        next_stages: [
          {
            trasaction_stage_id: 3619,
            stage_id: 51,
            stage_name: 'CD_TEST_#2',
            status: 0,
            transaction_id: 69227,
            approval_user_id: 212,
            comments: '',
            approval_user_name: 'Grace Cao3'
          }
        ],
        approval_user_name: 'Grace Admin13'
      }
    }
  ]
};

const stageListDataOne = [{
  header: {
    status: 'wait',
    stageSequenceName: 'cd_sequence_#1',
    associations: ['edmund test bug'],
    stageSequenceID: 5,
    hasProcessAndPermission: false
  },
  content: [{
    status: 'wait',
    stage: [{
      approvalUserID: 209,
      stageName: 'cd_stage_#1',
      status: 1,
      trasactionStageID: 3651,
      comments: '',
      approvalUserName: 'Grace Admin18 16.10',
      transactionID: 54482,
      stageID: 53
    }]
  }, {
    status: 'wait',
    stage: [{
      approvalUserID: 192,
      stageName: 'cd_stage_#2',
      status: 1,
      trasactionStageID: 3652,
      comments: '',
      approvalUserName: 'Grace Admin13',
      transactionID: 54482,
      stageID: 54
    }]
  }]
}];

const stageDataTwo = {
  header: {
    status: 'wait',
    stageSequenceName: 'cd_sequence_#1',
    associations: ['edmund test bug'],
    stageSequenceID: 6,
    hasProcessAndPermission: false
  },
  content: [{
    status: 'wait',
    stage: [{
      approvalUserID: 209,
      stageName: 'cd_stage_#1',
      status: 1,
      trasactionStageID: 3651,
      comments: '',
      approvalUserName: 'Grace Admin18 16.10',
      transactionID: 54482,
      stageID: 53
    }]
  }, {
    status: 'wait',
    stage: [{
      approvalUserID: 192,
      stageName: 'cd_stage_#2',
      status: 0,
      trasactionStageID: 3652,
      comments: '',
      approvalUserName: 'Grace Admin13',
      transactionID: 54482,
      stageID: 54
    }]
  }]
};

const stageSequencesList = [{
  stageSequenceID: 5,
  checked: true,
  stageSequenceName: 'cd_sequence_#1',
  associations: ['edmund test bug'],
  stageLinks: [{
    headStage: {
      nextStages: [{
        nextStages: [{
          nextStages: [],
          approvalUserID: 1,
          stageName: 'END',
          status: 0,
          trasactionStageID: 3653,
          comments: '',
          approvalUserName: '',
          transactionID: 54482,
          stageID: 2
        }],
        approvalUserID: 192,
        stageName: 'cd_stage_#2',
        status: 1,
        trasactionStageID: 3652,
        comments: '',
        approvalUserName: 'Grace Admin13',
        transactionID: 54482,
        stageID: 54
      }],
      approvalUserID: 209,
      stageName: 'cd_stage_#1',
      status: 1,
      trasactionStageID: 3651,
      comments: '',
      approvalUserName: 'Grace Admin18 16.10',
      transactionID: 54482,
      stageID: 53
    }
  }]
}];

const addableStageSequences = [
  {
    stage_sequence_id: 22,
    checked: false,
    stage_sequence_name: 'Allen_Test_Sequence',
    stage_links: [],
    associations: [
      'CD_FootBall_Room#1'
    ]
  }
];

const body = {
  stage_sequences: [stageData]
};


describe('index/PermitContract/reducers/index', () => {
  const initialState = fromJS({});

  it('Should fetch PermitContract info work fine', () => {
    const state = reducers(initialState, {
      type: FETCH_PERMIT_STAGESEQUENCE_SUCCESS,
      payload: { body }
    });
    expect(state.toJS()).toEqual(convertCasingPropObj({ stageSequencesList: body.stage_sequences }));
  });

  it('Should fetch get one stage info work fine', () => {
    const initState = fromJS({
      stageSequencesList: convertCasingPropObj(body.stage_sequences)
    });
    const state = reducers(initState, {
      type: GET_ONE_STAGESEQUENCE_SUCCESS,
      payload: { body: { stage_sequence: stageData } }
    });
    expect(state.toJS()).toEqual(convertCasingPropObj({ stageSequencesList: [stageData] }));
  });

  it('Should fetch conut stage info work fine', () => {
    const state = reducers(initialState, {
      type: FETCH_COUNT_STAGESEQUENCE_SUCCESS,
      payload: { body: { stage_sequence_count: 1, permit_status: 2 } }
    });
    expect(state.toJS()).toEqual({
      stageSequenceCount: 1,
      permitStatus: 2
    });
  });

  it('load add stage sequences should work fine', () => {
    const state = reducers(initialState, {
      type: LOAD_ADD_STAGESEQUENCES_SUCCESS,
      payload: { body: { addable_stage_sequences: [{ status: 1 }] } }
    });
    expect(state.toJS()).toEqual({
      addableStageSequences: [{ status: 1 }]
    });
  });

  it('reset add stage sequences should work fine', () => {
    const state = reducers(initialState, {
      type: RESET_LOAD_ADD_STAGESEQUENCES
    });
    expect(state.toJS()).toEqual({
      addableStageSequences: []
    });
  });

  it('update stage sequences should work fine', () => {
    const initState = fromJS({
      addableStageSequences: convertCasingPropObj(addableStageSequences)
    });
    const state = reducers(initState, {
      type: UPDATE_STAGESEQUENCE_SUCCESS,
      payload: 22
    });
    expect(state.toJS()).toEqual({
      addableStageSequences: [{
        associations: ['CD_FootBall_Room#1'],
        checked: true,
        stageLinks: [],
        stageSequenceID: 22,
        stageSequenceName: 'Allen_Test_Sequence'
      }]
    });
  });

  it('delete stage sequences should work fine', () => {
    const initState = fromJS({
      stageListData: stageListDataOne,
      stageSequencesList: convertCasingPropObj([{...stageData, stage_sequence_id: 5}])
    });
    const state = reducers(initState, {
      type: DELETE_STAGESEQUENCE_SUCCESS,
      payload: 5
    });
    expect(state.toJS()).toEqual({
      stageListData: [],
      stageSequencesList: []
    });
  });

  it('stage sequences change should work fine', () => {
    const state = reducers(initialState, {
      type: STAGE_SEQUENCES_CHANGE,
      payload: false
    });
    expect(state.toJS()).toEqual({
      isStageSequencesChange: false
    });
  });

  it('stage sequences if only one updateCollapseExtendEnum should work fine', () => {
    const initState = fromJS({
      stageListData: stageListDataOne
    });
    const state = reducers(initState, {
      type: UPDATE_COLLAPSE_EXTEND_ENUM,
      payload: 5
    });
    expect(state.toJS().collapseExtendEnum).toEqual({ 5: true });
  });

  it('change user should work fine', () => {
    const initState = fromJS({
      stageListData: stageListDataOne
    });
    const state = reducers(initState, {
      type: CHANGE_STAGE_USER,
      payload: {
        approvalUserID: 192,
        approvalUserName: 'test',
        trasactionStageID: 3651,
        stageSequenceID: 5
      }
    });

    const result = [{
      content: [{
        stage: [{
          approvalUserID: 192,
          approvalUserName: 'test',
          comments: '',
          stageID: 53,
          stageName: 'cd_stage_#1',
          status: 1,
          transactionID: 54482,
          trasactionStageID: 3651
        }],
        status: 'wait'
      }, {
        stage: [{
          approvalUserID: 192,
          approvalUserName: 'Grace Admin13',
          comments: '',
          stageID: 54,
          stageName: 'cd_stage_#2',
          status: 1,
          transactionID: 54482,
          trasactionStageID: 3652
        }],
        status: 'wait'
      }],
      header: {
        associations: ['edmund test bug'],
        hasProcessAndPermission: false,
        stageSequenceID: 5,
        stageSequenceName: 'cd_sequence_#1',
        status: 'wait'
      }
    }];

    expect(state.toJS().stageListData).toEqual(result);
  });


  it('format stage list should work fine', () => {
    const initState = fromJS({
      stageSequencesList
    });
    const state = reducers(initState, {
      type: FORMAT_STAGE_LIST,
      payload: 5
    });
    expect(state.toJS().stageListData).toEqual(stageListDataOne);
  });

  it('stage sequences greater than one updateCollapseExtendEnum should work fine', () => {
    const initState = fromJS({
      stageListData: [stageListDataOne[0], stageDataTwo]
    });
    const state = reducers(initState, {
      type: UPDATE_COLLAPSE_EXTEND_ENUM,
      payload: 5
    });
    expect(state.toJS().collapseExtendEnum).toEqual({ 5: false, 6: false });
  });

  it('stage sequences updateOneCollapseStatus should work fine', () => {
    const initState = fromJS({
      collapseExtendEnum: {}
    });

    const state = reducers(initState, {
      type: UPDATE_ONE_COLLAPSE_STATUS,
      payload: 1
    });
    expect(state.toJS()).toEqual({
      collapseExtendEnum: { 1: true }
    });
  });

  it('stage sequences updateOneCollapseStatus should work fine', () => {
    const initState = fromJS({
      isChangeStageCustomer: false
    });

    const state = reducers(initState, {
      type: IS_CHANGE_USER,
      payload: true
    });
    expect(state.toJS()).toEqual({
      isChangeStageCustomer: true
    });
  });
});
