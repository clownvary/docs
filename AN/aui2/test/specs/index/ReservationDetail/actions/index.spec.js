import configureStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import middlewares from 'shared/api/middlewares';
import { SET_DISABLED } from 'index/ReservationDetail/actions/actionBar';
import * as actions from 'index/ReservationDetail/actions/index';
import first from 'lodash/first';
import last from 'lodash/last';
import question from 'json/ReservationDetail/questions3.json';

describe('index -> ReservationDetail -> actions -> index', () => {
  let store = null;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({
      initialData: {
        batchID: 232,
        receiptID: 323
      },
      main: fromJS({
        isPermitDetailsChanged: false,
        confirmChangeError: {
          questionErrors: fromJS({ '88_3': { errors: '4567' }, 1: { errors: '' } })
        },
        errors: {
          questionErrors: { '88_3': '4567', 1: 'errors' }
        }
      }),
      question: fromJS({
        allQuestions: { wrappedEventIndex: question.body.questions },
        hideQuestions: question.body.questions
      }),
      actionBar: fromJS({
        disableActions: false
      })
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  it('showTotalBalanceDueDetail should work fine', (done) => {
    const { SHOW_TOTAL_BALANCE_DUE_DETAIL, showTotalBalanceDueDetail } = actions;

    store.dispatch(showTotalBalanceDueDetail());
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(SHOW_TOTAL_BALANCE_DUE_DETAIL);
    done();
  });

  it('setWaiverErrors should works fine', (done) => {
    const { setWaiverErrors, SET_WAIVER_ERRORS } = actions;
    store.dispatch(setWaiverErrors());
    const action = first(store.getActions());
    expect(action).toBeInstanceOf(Object);
    expect(action.type).toEqual(SET_WAIVER_ERRORS);
    expect(typeof action.payload.errors).toEqual('object');
    done();
  });

  it('setWaiverErrors should works fine', (done) => {
    const { setWaiverErrors, SET_WAIVER_ERRORS } = actions;
    store.dispatch(setWaiverErrors({}));
    const action = first(store.getActions());
    expect(action).toBeInstanceOf(Object);
    expect(action.type).toEqual(SET_WAIVER_ERRORS);
    expect(typeof action.payload.errors).toEqual('object');
    done();
  });

  it('permitDetailsChanged should work fine', (done) => {
    const { permitDetailsChanged, PERMIT_DETAILS_HAS_CHANGED } = actions;
    const mockStore = configureStore(middlewares);
    store = mockStore({
      main: fromJS({
        isPermitDetailsChanged: true,
        confirmChangeError: {
          questionErrors: {}
        },
        errors: {
          questionErrors: { 1: '', 2: '', 3: 'errors', 4: '' }
        }
      }),
      question: fromJS({
        allQuestions: {},
        hideQuestions: []
      }),
      actionBar: fromJS({
        disableActions: true
      })
    });
    store.dispatch(permitDetailsChanged());
    const myActions = store.getActions();
    expect(myActions.length).toBe(1);
    const firstAction = first(myActions);
    expect(firstAction.type).toBe(PERMIT_DETAILS_HAS_CHANGED);
    expect(typeof firstAction).toBe('object');
    done();
  });
  it('permitDetailsChanged another branch should work fine', (done) => {
    const { CHANGE_PERMIT_DETAILS, permitDetailsChanged } = actions;
    store.dispatch(permitDetailsChanged());
    const myActions = store.getActions();
    expect(myActions.length).toBe(2);
    const firstAction = first(myActions);
    const lastAction = last(myActions);
    expect(firstAction.type).toBe(SET_DISABLED);
    expect(typeof lastAction).toBe('object');
    expect(lastAction.type).toBe(CHANGE_PERMIT_DETAILS);
    done();
  });

  it('saveConfirmChangeErrors should work fine', (done) => {
    const { SAVE_CONFIRM_CHANGE_ERRORS, saveConfirmChangeErrors } = actions;
    const waiverErrors = 2;
    store.dispatch(saveConfirmChangeErrors(waiverErrors));

    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(SAVE_CONFIRM_CHANGE_ERRORS);
    expect(action.payload.waiverErrors).toBe(waiverErrors);
    done();
  });

  it('removeWaiverConfirmChangeError should work fine', (done) => {
    const { REMOVE_WAIVER_CONFIRM_CHANGE_ERROR, removeWaiverConfirmChangeError } = actions;
    const waiverIndex = 1;
    store.dispatch(removeWaiverConfirmChangeError(waiverIndex));

    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(REMOVE_WAIVER_CONFIRM_CHANGE_ERROR);
    expect(action.payload.waiverIndex).toBe(1);
    done();
  });

  it('updateWaiverConfirmChangeError should work fine', (done) => {
    const { UPDATE_WAIVER_CONFIRM_CHANGE_ERROR, updateWaiverConfirmChangeError } = actions;
    const waiverErrors = 1;
    store.dispatch(updateWaiverConfirmChangeError(waiverErrors));

    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(UPDATE_WAIVER_CONFIRM_CHANGE_ERROR);
    expect(action.payload.waiverErrors).toBe(1);
    done();
  });

  it('changeAgent should work fine when in production.', (done) => {
    const { changeAgent } = actions;

    store.dispatch(changeAgent(1)).then(() => {
      const storeActions = store.getActions();
      expect(storeActions).toHaveLength(3);
      done();
    });
  });
});
