import { fromJS } from 'immutable';
import {
  FETCH_QUICK_VIEW_SUCCESS,
  SET_QUICK_VIEW,
  DELETE_QUICK_VIEW,
  SHOW_NEW_QUICK_VIEW_DIALOG,
  SAVE_QUICK_VIEW,
  SET_QUICK_VIEW_ERROR,
  CHANGE_QUICK_VIEW_TYPE
} from 'index/Resource/actions/quickView';

import getQuickViewReducer from 'index/Resource/reducers/quickView';

const initData1 = {
  permitID: 1,
  eventID: -1,
  receiptEntryID: '',
  quickView: [
    {
        "id": 6,
        "name": "test1",
        "selected": false,
        "resource_ids": [
            10,
            11
        ]
    },
    {
        "id": 7,
        "name": "test2 ",
        "selected": false,
        "resource_ids": [
            10,
            11
        ]
    },
    {
        "id": 8,
        "name": "test3 test3 test3 test3 test3 test3 test3 test3 test3 test3 test3 test3 test3 test3 test3 test3 test3 test3",
        "selected": false,
        "resource_ids": [
            10,
            11
        ]
    }
]
};
const reducer1 = getQuickViewReducer(initData1);


const initData2 = {
  permitID: -1,
  eventID: 1,
  receiptEntryID: '',
  quickView: __resourceCalender__.__initialState__.quickView
};
const reducer2 = getQuickViewReducer(initData2);

const initData3 = {
  permitID: 1,
  eventID: -1,
  receiptEntryID: '',
  quickView: __resourceCalender__.__initialState__.quickView
};
const reducer3 = getQuickViewReducer(initData2);

const initData = {
  permitID: -1,
  eventID: -1,
  receiptEntryID: '',
  quickView: __resourceCalender__.__initialState__.quickView
};
const reducer = getQuickViewReducer(initData);
const defaultStates = {
  data: [],
  selectedView: '',
  showModal: false,
  name: '',
  errorMessage: '',
  selectedViewType: 0
};

const data = {
  quick_view_list: [{
    id: 6,
    'name': 'test1',
    selected: true,
    resource_ids: [
      10,
      11
    ]
  }]
};

const newData = [{
  id: 6,
  'name': 'test1',
  'value': 6,
  'text': 'test1',
  selected: true,
  resource_ids: [10, 11]
}];

const setup = (initialState) => {
  const state = reducer(fromJS(initialState), {});
  const jsState = state.toJS();
  return {
    state,
    jsState
  };
};

const setup1 = (initialState) => {
  const state = reducer1(fromJS(initialState), {});
  const jsState = state.toJS();
  return {
    state,
    jsState
  };
};


const setup2 = (initialState) => {
  const state = reducer2(fromJS(initialState), {});
  const jsState = state.toJS();
  return {
    state,
    jsState
  };
};

const setup3 = (initialState) => {
  const state = reducer3(fromJS(initialState), {});
  const jsState = state.toJS();
  return {
    state,
    jsState
  };
};

describe('Resource/reducers/quickView', () => {

  test('SET_QUICK_VIEW should work fine', () => {
    const { state } = setup(defaultStates);
    const value = 12;

    const newState = reducer(state, {
      type: SET_QUICK_VIEW,
      payload: { value }
    });

    const selectedView = newState.get('selectedView');

    expect(selectedView).toEqual(value);
  });

  test('SHOW_NEW_QUICK_VIEW_DIALOG should work fine', () => {
    const { state } = setup1(defaultStates);
    const isShow = true;

    const newState = reducer(state, {
      type: SHOW_NEW_QUICK_VIEW_DIALOG,
      payload: { isShow }
    });

    expect(newState.get('showModal')).toEqual(isShow);
    expect(newState.get('selectedViewType')).toEqual(0);
  });

  test('SAVE_QUICK_VIEW should work fine', () => {
    const { state } = setup2(defaultStates);

    const newState = reducer(state, {
      type: SAVE_QUICK_VIEW,
      payload: {
        body: data
      }
    });

    const selectedView = newState.get('selectedView');

    expect(newState.get('data').toJS()).toMatchObject(newData);
    expect(selectedView).toEqual(6);
  });

  test('DELETE_QUICK_VIEW should work fine', () => {
    const { state } = setup3(defaultStates);

    const newState = reducer(state, {
      type: DELETE_QUICK_VIEW,
      payload: {
        body: data
      }
    });

    expect(newState.get('data').toJS()).toMatchObject(newData);
  });

  test('SET_QUICK_VIEW_ERROR should work fine', () => {
    const { state } = setup(defaultStates);

    const errorMessage = 'Max length is 5';

    const newState = reducer(state, {
      type: SET_QUICK_VIEW_ERROR,
      payload: {
        errorMessage
      }
    });

    expect(newState.get('errorMessage')).toEqual(errorMessage);
  });

  test('CHANGE_QUICK_VIEW_TYPE should work fine', () => {
    const { state } = setup(defaultStates);

    const viewType = 1;

    const newState = reducer(state, {
      type: CHANGE_QUICK_VIEW_TYPE,
      payload: {
        viewType
      }
    });

    expect(newState.get('selectedViewType')).toEqual(viewType);
    expect(newState.get('errorMessage')).toEqual('');
  });
});
