import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import * as actions from 'index/PermitDetail/actions/stageSequences';

describe('index -> PermitDetail -> actions -> stageSequences', () => {
  let store = null;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({});
  });

  afterEach(() => {
    store.clearActions();
  });

  test('fetchStageSequences should works fine', () => {
    const { fetchStageSequences } = actions;

    return store.dispatch(fetchStageSequences({
      batchID: 1,
      receiptID: 2,
      receiptEntryID: 3
    })).then(({ payload: { body } }) => {
      const fetchAction = store.getActions()[2];
      expect(fetchAction.type).toEqual('FETCH_STAGESEQUENCE_SUCCESS');
      expect(body.stage_sequences.length).toEqual(2);
    });
  });

  test('updateStageSequenceAsyncAction should works fine', () => {
    const { updateStageSequenceAsyncAction } = actions;

    return store.dispatch(updateStageSequenceAsyncAction({
      batchID: 1,
      receiptID: 2,
      receiptEntryID: 3,
      checked: false,
      stageSequenceID: 1
    })).then(() => {
      const updateAction = store.getActions()[2];
      expect(updateAction.type).toEqual('UPDATE_STAGESEQUENCE_SUCCESS');
    });
  });
});
