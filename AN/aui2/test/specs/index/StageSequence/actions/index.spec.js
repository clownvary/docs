import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import * as actions from 'index/StageSequence/actions';

const initialData = {
  permitId: 11112,
  systemUserID: 32
};

describe('index -> StageSequence -> actions', () => {
  let store = null;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({ initialData });
  });

  afterEach(() => {
    store.clearActions();
  });

  test('fetchStageSequence method should works fine', () => {
    const { fetchStageSequence } = actions;
    return store.dispatch(fetchStageSequence()).then(() => {
      const storeActions = store.getActions();
      expect(Array.isArray(storeActions)).toBeTruthy();
      expect(storeActions[2].type).toEqual('FETCH_PERMIT_STAGESEQUENCE_SUCCESS');

      expect(storeActions[2].payload.headers.response_code).toBe('0000');
      expect(storeActions[2].payload.headers.response_message).toBe('Successful');
      expect(storeActions[3].type).toEqual('FORMAT_STAGE_LIST');
      expect(storeActions[3].payload).toEqual(32);
    });
  });

  test('fetchCountStageSequenceAsyncAction method should works fine', () => {
    const { fetchCountStageSequenceAsyncAction } = actions;
    return store.dispatch(fetchCountStageSequenceAsyncAction()).then(({ payload: { headers } }) => {
      const storeActions = store.getActions();
      expect(Array.isArray(storeActions)).toBeTruthy();
      expect(storeActions[1].type).toEqual('FETCH_COUNT_STAGESEQUENCE_SUCCESS');
      expect(headers.response_code).toBe('0000');
      expect(headers.response_message).toBe('Successful');
    });
  });

  test('getOneStageSequenceAsyncAction method should works fine', () => {
    const { getOneStageSequenceAsyncAction } = actions;
    return store.dispatch(getOneStageSequenceAsyncAction({ stageSequenceID: 1, permitID: 2 }))
      .then(({ payload: { headers } }) => {
        const storeActions = store.getActions();
        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions[1].type).toEqual('GET_ONE_STAGESEQUENCE_SUCCESS');
        expect(headers.response_code).toBe('0000');
        expect(headers.response_message).toBe('Successful');
      });
  });

  test('transactionStageseAsyncAction method should works fine', () => {
    const { transactionStageseAsyncAction } = actions;
    return store.dispatch(transactionStageseAsyncAction({ stageSequenceID: 1 }))
      .then(() => {
        const storeActions = store.getActions();
        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions[1].payload.headers.response_code).toBe('0000');
        expect(storeActions[1].payload.headers.response_message).toBe('Successful');
      });
  });

  test('loadAddAbleStageSequences method should works fine', () => {
    const { loadAddAbleStageSequences } = actions;
    return store.dispatch(loadAddAbleStageSequences({ stageSequenceID: 1, permitID: 2 }))
      .then(({ payload: { headers } }) => {
        const storeActions = store.getActions();
        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions[1].type).toEqual('LOAD_ADD_STAGESEQUENCES_SUCCESS');
        expect(headers.response_code).toBe('0000');
        expect(headers.response_message).toBe('Successful');
      });
  });

  test('resetLoadAddStageSequencesAction method should works fine', () => {
    const { resetLoadAddStageSequencesAction } = actions;
    store.dispatch(resetLoadAddStageSequencesAction());
    const storeActions = store.getActions();
    expect(Array.isArray(storeActions)).toBeTruthy();
    expect(storeActions[0].type).toEqual('RESET_LOAD_ADD_STAGESEQUENCES');
  });

  test('updateStageSequenceAsyncAction method should works fine', () => {
    const { updateStageSequenceAsyncAction } = actions;
    return store.dispatch(updateStageSequenceAsyncAction({ stageSequenceID: 1 }))
      .then(() => {
        const storeActions = store.getActions();
        expect(Array.isArray(storeActions)).toBeTruthy();

        expect(storeActions[2].type).toEqual('STAGE_SEQUENCES_CHANGE');
        expect(storeActions[3].type).toEqual('UPDATE_STAGESEQUENCE_SUCCESS');
      });
  });

  test('deleteStageSequenceAsyncAction method should works fine', () => {
    const { deleteStageSequenceAsyncAction } = actions;
    return store.dispatch(deleteStageSequenceAsyncAction(1))
      .then(() => {
        const storeActions = store.getActions();
        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions[2].type).toEqual('STAGE_SEQUENCES_CHANGE');
        expect(storeActions[3].type).toEqual('DELETE_STAGESEQUENCE_SUCCESS');
      });
  });

  test('saveStageSequenceChangeAsyncAction method should works fine', () => {
    const { saveStageSequenceChangeAsyncAction } = actions;
    return store.dispatch(saveStageSequenceChangeAsyncAction(1))
      .then(({ payload: { headers } }) => {
        expect(headers.response_code).toBe('0000');
        expect(headers.response_message).toBe('Successful');
      });
  });

  test('updateCollapseExtendEnum method should works fine', () => {
    const { updateCollapseExtendEnum } = actions;
    store.dispatch(updateCollapseExtendEnum(1));
    const storeActions = store.getActions();
    expect(Array.isArray(storeActions)).toBeTruthy();
    expect(storeActions[0].type).toEqual('UPDATE_COLLAPSE_EXTEND_ENUM');
    expect(storeActions[0].payload).toEqual(1);
  });

  test('updateOneCollapseStatus method should works fine', () => {
    const { updateOneCollapseStatus } = actions;
    store.dispatch(updateOneCollapseStatus(1));
    const storeActions = store.getActions();
    expect(storeActions[0].type).toEqual('UPDATE_ONE_COLLAPSE_STATUS');
    expect(storeActions[0].payload).toEqual(1);
  });

  test('isChangeUserAction method should works fine', () => {
    const { isChangeUserAction } = actions;
    store.dispatch(isChangeUserAction(true));
    const storeActions = store.getActions();
    expect(storeActions[0].type).toEqual('IS_CHANGE_USER');
    expect(storeActions[0].payload).toEqual(true);
  });

  test('changeStageUserAction method should works fine', () => {
    const { changeStageUserAction } = actions;
    store.dispatch(changeStageUserAction(true));
    const storeActions = store.getActions();
    expect(storeActions[0].type).toEqual('CHANGE_STAGE_USER');
    expect(storeActions[0].payload).toEqual(true);
  });

  test('changeStageUser method should works fine', () => {
    const { changeStageUser } = actions;
    return store.dispatch(changeStageUser(1))
      .then(() => {
        const storeActions = store.getActions();
        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions[2].type).toEqual('STAGE_SEQUENCES_CHANGE');
        expect(storeActions[3].type).toEqual('IS_CHANGE_USER');
      });
  });
});
