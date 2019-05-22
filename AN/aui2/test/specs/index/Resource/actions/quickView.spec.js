import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import { fromJS } from 'immutable';
import first from 'lodash/first';
import mockAPI from 'utils/mockAPI';
import * as actions from 'index/Resource/actions/quickView';
import { clearMockActions } from '../../../../utils/mockDispatch';
import deleteQuickViewJSON from 'json/Resource/deleteQuickView.json';

jest.mock('react-base-ui/lib/services/dialog', () => ({
  confirm: jest.fn().mockReturnValue(Promise.resolve())
}));

describe('index/Resource/actions/onboarding', () => {
  let store = null;
  let mockStore = null;
  let API = {
    get: null,
    post: null
  };
  const initialData = {
    permitID: -1,
    eventID: 2,
    batchID: '1111111',
    receiptID: '2222222',
    receiptEntryID: '3333333'
  }

  const dataList = [ {
      "id": 6,
      "name": "test1",
      "value": 6,
      "text": "test1",
      "selected": true,
      "scope_type": 0,
      "resource_ids": [
          10,
          11
        ]
    },
    {
      "id": 7,
      "name": "test2",
      "value": 7,
      "text": "test2",
      "selected": true,
      "scope_type": 0,
      "resource_ids": [
          10,
          11
        ]
    }
  ];

  beforeEach(() => {
    mockStore = configureStore(middlewares);
    store = mockStore({
      monthView: fromJS({showDayView: false}),
      resourceFilter: {
        centers: fromJS({ selected: [] }),
        eventTypes: fromJS({ selected: [] }),
        facilityTypes: fromJS({ selected: [] }),
        resourceTypes: fromJS({ selected: [] }),
        resources: fromJS({ selected: [] })
      },
      resourceBooking: fromJS({
        start_date: '',
        end_date: '',
        include_linked_resources: ''
      }),
      quickView: fromJS(
        {
          data: fromJS(dataList),
          selectedView: 6,
          showModel: false,
          name: 'view',
          errorMessage: '',
          selectedViewType: 0
        }
      ),
      initialData
    });
    API.get = jest.fn();
    API.post = jest.fn();
    API.put = jest.fn();
  });

  afterEach(() => {
    store.clearActions();
    clearMockActions();
    API = {
      get: null,
      post: null,
      put: null
    };
  });

  it('selectQuickViewAsyncAction should work fine', () => {
    const { selectQuickViewAsyncAction } = actions;

    return store.dispatch(selectQuickViewAsyncAction())
      .then(() => {
        const storeActions = store.getActions();
        expect(typeof storeActions).toBe('object');
      });
  });

  it('setQuickViewNameAction should work fine', () => {
    const { setQuickViewNameAction } = actions;

    store.dispatch(setQuickViewNameAction({ value: 10 }));
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe('SET_QUICK_VIEW');
  });

  it('setQuickViewAsyncAction should work fine', () => {
    const { setQuickViewAsyncAction } = actions;

    return store.dispatch(setQuickViewAsyncAction(-1))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions.some(action => action.type
          === 'SET_QUICK_VIEW')).toBeTruthy();
      });
  });

  it('setQuickViewAsyncAction should work fine when view is not -1', () => {
    const { setQuickViewAsyncAction } = actions;

    return store.dispatch(setQuickViewAsyncAction(6))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions.some(action => action.type
          === 'SET_SELECTED_RESOURCES')).toBeTruthy();
      });
  });

  it('setQuickViewAsyncAction should work fine when change view to a deleted one.', (done) => {
    const { setQuickViewAsyncAction } = actions;
    const mockResponse = {
      "headers": {
        "response_code": "0000"
      },
      "body": {
        "message": "The Quick View you are trying to use has been deleted",
        "quick_view_list": [
          {
            "id": 88,
            "name": "7",
            "selected": true,
            "resource_ids": [105, 108, 101]
          }, {
            "id": 80,
            "name": "V1",
            "selected": false,
            "resource_ids": [100, 105, 108]
          }, {
            "id": 87,
            "name": "ds",
            "selected": false,
            "resource_ids": [105, 108, 100, 101]
          }
        ]
      }
    };
    mockAPI({
      path: '/json/Resource/updateSelectedQuickView.json',
      result: mockResponse
    });


    return store.dispatch(setQuickViewAsyncAction(6))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions.length).toBe(3);
        expect(storeActions[0].type).toEqual('');
        expect(storeActions[1].type).toEqual('');
        expect(storeActions[1].payload).toEqual(mockResponse);
        expect(storeActions[2].type).toEqual('SAVE_QUICK_VIEW');
        expect(storeActions[2].payload.body).toEqual(mockResponse.body);
        done();
      });
  });
  it('showQuickViewModelAction should work fine', () => {
    const { showQuickViewModelAction } = actions;

    store.dispatch(showQuickViewModelAction({ value: 10 }));
    const action = first(store.getActions());

    expect(action.type).toBe('SHOW_NEW_QUICK_VIEW_DIALOG');
  });

  it('saveQuickViewAsyncAction should work fine', () => {
    const { saveQuickViewAsyncAction } = actions;

    return store.dispatch(saveQuickViewAsyncAction('111'))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions.some(action => action.type
          === 'SHOW_NEW_QUICK_VIEW_DIALOG')).toBeTruthy();
      });
  });

  it('saveQuickViewAsyncAction failed', () => {
    const { saveQuickViewAsyncAction } = actions;

    mockAPI({
      path: '/json/Resource/saveQuickView.json',
      result: {
        "headers": {
          "response_code": "0000",
          "response_message": "Successful"
        },
        "body": {
          "message": "Failed"
        }
      }
    });

    return store.dispatch(saveQuickViewAsyncAction('111'))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions.some(action => action.type
          === 'SET_QUICK_VIEW_ERROR')).toBeTruthy();
      });
  });

  it('validateQuickView should work fine when name is long text', () => {
    const { saveQuickViewAsyncAction } = actions;
    store.dispatch(saveQuickViewAsyncAction('whyy whyy'));

    return store.dispatch(saveQuickViewAsyncAction('1111'))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions.some(action => action.type
          === 'SAVE_QUICK_VIEW')).toBeTruthy();
      });
  });

  it('validateQuickView should work fine when name is long text', () => {
    const { saveQuickViewAsyncAction } = actions;
    store.dispatch(saveQuickViewAsyncAction('whyy whyy whyy whyy whyy whyy whyy whyy whyy whyy whyy whyy whyy whyy'));
    const action = first(store.getActions());

    expect(action.type).toBe('SET_QUICK_VIEW_ERROR');
  });

  it('validateQuickView should work fine when local view name is exist', () => {
    const { saveQuickViewAsyncAction } = actions;
    store.dispatch(saveQuickViewAsyncAction('test1'));
    const action = first(store.getActions());

    expect(action.type).toBe('SET_QUICK_VIEW_ERROR');
  });

  it('validateQuickView should work fine when local view name is exist', () => {
    const { saveQuickViewAsyncAction } = actions;

    store = mockStore({
      monthView: fromJS({showDayView: false}),
      resourceFilter: {
        resources: fromJS(
          { selected: [] }
        )
      },
      resourceBooking: fromJS({
        start_date: '',
        end_date: '',
        include_linked_resources: '',
        resource_ids: []
      }),
      quickView: fromJS(
        {
          data: fromJS([
            {
              "id": 6,
              "name": "test1",
              "value": 6,
              "text": "test1",
              "selected": false,
              "resource_ids": [
                  10,
                  11
              ],
              "scope_type": 0
            },
            {
              "id": 7,
              "name": "test2",
              "value": 7,
              "text": "test2",
              "selected": false,
              "resource_ids": [
                  10,
                  11
              ],
              "scope_type": 1
            }
          ]),
          selectedView: -1,
          showModel: false,
          name: 'view',
          errorMessage: '',
          selectedViewType: 1
        }
      ),
      initialData
    });

    store.dispatch(saveQuickViewAsyncAction('test2'));
    const action = first(store.getActions());

    expect(action.type).toBe('SET_QUICK_VIEW_ERROR');
  });

  it('validateQuickView not passed ', () => {
    const { saveQuickViewAsyncAction } = actions;
    store.dispatch(saveQuickViewAsyncAction('test1', dataList));
    const action = first(store.getActions());

    expect(action.type).toBe('SET_QUICK_VIEW_ERROR');
  });


  it('deleteQuickView should work well when delete the view whick is currently selected.', (done) => {
    const { deleteQuickViewAsyncAction } = actions;
    store.dispatch(deleteQuickViewAsyncAction('123', '123')).then(
      () => {
        const storeActions = store.getActions();
        expect(storeActions.length).toEqual(3);
        expect(storeActions[0].type).toEqual('SET_QUICK_VIEW');
        expect(storeActions[0].payload.value).toEqual(-1);
        expect(storeActions[1].type).toEqual('');
        expect(storeActions[2].type).toEqual('DELETE_QUICK_VIEW');
        expect(storeActions[2].payload.body).toEqual(deleteQuickViewJSON.body);
        done()
      }
    )
  });

  it('changeQuickViewTypeAction should work well ', () => {
    const { changeQuickViewTypeAction } = actions;
    store.dispatch(changeQuickViewTypeAction(1));
    const action = first(store.getActions());

    expect(action.type).toBe('CHANGE_QUICK_VIEW_TYPE');
  });
});
