import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import { fromJS } from 'immutable';
import first from 'lodash/first';
import * as actions from 'index/Resource/actions/index';
import { mockDispatch, getMockActions, clearMockActions } from '../../../../utils/mockDispatch';

describe('index/Resource/actions/index', () => {
  let store = null;
  let API = {
    post: null
  };
  const centers = {
    "data": [{
      "name": "111111Lois Ce&amp;nter without Facility",
      "id": 138,
      "selected": false,
      "text": "111111Lois Ce&nter without Facility",
      "value": 138
    }, {
      "name": "14.5 Sprint 4 Moon's center",
      "id": 151,
      "selected": false,
      "text": "14.5 Sprint 4 Moon's center",
      "value": 151
    }],
    "selected": [],
    "errMsg": ""
  };

  const eventTypes = {
    "data": [{
      "id": 25,
      "name": "14.5 I&amp;map Fixed ET",
      "selected": false,
      "text": "14.5 I&map Fixed ET",
      "value": 25
    }, {
      "id": 27,
      "name": "14.5 Imap NO ET",
      "selected": false,
      "text": "14.5 Imap NO ET",
      "value": 27
    }],
    "selected": []
  };

  const facilityTypes = {
    "data": [{
      "name": "reco&amp;urce1",
      "id": 1,
      "type": 0,
      "selected": true,
      "text": "reco&urce1",
      "value": 1
    }, {
      "name": "recource2",
      "id": 2,
      "type": 1,
      "selected": true,
      "text": "recource2",
      "value": 2
    }],
    "selected": [1, 2],
    "disabledFacilityType": true
  };

  const resourceTypes = {
    "data": [{
      "name": "faci&amp;lity type 1",
      "id": 0,
      "selected": true,
      "text": "faci&lity type 1",
      "value": 0
    }, {
      "name": "facility type 2",
      "id": 1,
      "selected": false,
      "text": "facility type 2",
      "value": 1
    }],
    "selected": [0]
  };

  const resources = {
    "totalSize": 10,
    "data": [{
      "name": "rec&amp;ource1",
      "id": 1,
      "type": 0,
      "selected": true,
      "text": "rec&amp;ource1",
      "value": 1
    }, {
      "name": "recource2",
      "id": 2,
      "type": 1,
      "selected": true,
      "text": "recource2",
      "value": 2
    }, {
      "name": "recource3fdsaaaaaaaaaaaaaaaa",
      "id": 3,
      "type": 2,
      "selected": false,
      "text": "recource3fdsaaaaaaaaaaaaaaaa",
      "value": 3
    }],
    "totalPage": 12,
    "pageNumber": 1,
    "isFetchData": true,
    "selected": [1, 2, 3],
    "loading": false,
    "errMsg": ""
  };

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({
      resourceFilter: {
        centers: fromJS(centers),
        eventTypes: fromJS(eventTypes),
        facilityTypes: fromJS(facilityTypes),
        resourceTypes: fromJS(resourceTypes),
        resources: fromJS(resources)
      },
      initialData: {
        permitID: -1,
        eventID: 2,
        batchID: '1111111',
        receiptID: '2222222',
        receiptEntryID: '3333333',
      }
    });
    API.post = jest.fn();
  });

  afterEach(() => {
    store.clearActions();
    clearMockActions();
    API = {
      post: null
    };
  });

  it('saveFilters works fine', () => {
    const {
      SAVE_FILTERS,
      SAVE_FILTERS_SUCCESS,
      SAVE_FILTERS_FAILURE,
      saveFilters
    } = actions;

    return store.dispatch(saveFilters([1, 2]));

    const storeActions = store.getActions();

    expect(storeActions.some(action => action.type === SAVE_FILTERS)).toBe(true);
  });

  it('saveFilters works fine, if resourceIDs is null', () => {
    const {
      SAVE_FILTERS,
      SAVE_FILTERS_SUCCESS,
      SAVE_FILTERS_FAILURE,
      saveFilters
    } = actions;

    return store.dispatch(saveFilters());

    const storeActions = store.getActions();

    expect(storeActions.some(action => action.type === SAVE_FILTERS)).toBe(true);

  });
});
