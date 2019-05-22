import configureStore from 'redux-mock-store';
import some from 'lodash/some';
import filter from 'lodash/filter';
import first from 'lodash/first';
import find from 'lodash/find';
import { fromJS } from 'immutable';
import middlewares from 'shared/api/middlewares';
import * as actions from 'index/Resource/actions/resourceFilters';
import { mockDispatch, getMockActions, clearMockActions } from '../../../../utils/mockDispatch';

describe('index/Resource/actions/resourceFilters', () => {
  let store = null;
  let API = {
    get: null
  };

  const initialData = {
    permitID: -1,
    eventID: 2,
    batchID: '1111111',
    receiptID: '2222222',
    receiptEntryID: '3333333'
  };

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({
      initialData,
      quickView: fromJS({
        data: fromJS([{
            "id": '6',
            "name": "test1",
            "value": '6',
            "text": 'test1',
            "selected": false,
            "resource_ids": [
                10,
                11
            ]
          }]),
        selectedView: '6'
      }),
      bookingInfo: fromJS({
        data: {
          eventResource: [
            {
              setupMinutes: 0,
              bookingAssignment: 0,
              definedDateRange: [
                {
                  id: 17,
                  name: 'Dec 1, 2016 to Dec 30, 2016',
                  selected: true,
                  parent_id: 766,
                  text: 'Dec 1, 2016 to Dec 30, 2016',
                  value: 17
                }
              ],
              resourceType: 0,
              resourceID: 766,
              reservationPeriodUnit: 6,
              resourceNumber: '',
              resourceName: '1_resource_test_date_range_new',
              cleanupMinutes: 0,
              id: 766,
              bookingDetail: [{
                resourceBookingID: 0,
                attendance: 1,
                dateRangeID: 17,
                pendingID: 'pending_766_1638',
                endEventTime: '',
                isDeleteSchedule: false
              }]
            }, {
              setupMinutes: 0,
              bookingAssignment: 0,
              resourceType: 0,
              resourceID: 1,
              reservationPeriodUnit: 6,
              resourceNumber: '',
              resourceName: 'resource1',
              cleanupMinutes: 0,
              id: 1
            }
          ]
        },
        prepCodeList: fromJS([
          { id: 6, text: 'edc5a12', value: 6 },
          { id: 7, text: '5604a49', value: 7 },
          { id: 8, text: 'f760c9c', value: 8 }
        ]),
        scheduleTypes: fromJS([]),
        setUpList: fromJS([]),
        error: {
          serverMessages: {},
          conflictMessage: []
        }
      }),
      resourceFilter: {
        centers: fromJS({
          selected: []
        }),
        eventTypes: fromJS({
          selected: []
        }),
        resourceTypes: fromJS({
          selected: []
        }),
        facilityTypes: fromJS({
          selected: []
        }),
        resources: fromJS({
          selected: []
        })
      },
      onboarding: fromJS({}),
      hideIntro: true
    });
    API.get = jest.fn();
  });

  afterEach(() => {
    store.clearActions();
    clearMockActions();
    API = {
      get: null
    };
  });

  it('fetchCenters should work fine', () => {
    const {
      fetchCenters,
      FETCH_CENTERS_SUCCESS,
      FETCH_CENTERS_FAILURE
    } = actions;
    const sites = [1, 2];
    const centers = [1, 2];

    return store.dispatch(fetchCenters(sites, sites))
      .then(() => {
        const storeActions = store.getActions();

        expect(storeActions.some(action => action.type
          === FETCH_CENTERS_SUCCESS)).toBeTruthy();
    });
  });

  it('fetchCenters should work fine, if no sites and centers', () => {
    const {
      fetchCenters,
      FETCH_CENTERS_SUCCESS,
      FETCH_CENTERS_FAILURE
    } = actions;

    return store.dispatch(fetchCenters())
      .then(() => {
        const storeActions = store.getActions();

        expect(storeActions.some(action => action.type
          === FETCH_CENTERS_SUCCESS)).toBeTruthy();
    });
  });

  it('setCenter should work fine', () => {
    const { SET_CENTER, setCenter } = actions;

    store.dispatch(setCenter());
    const action = first(store.getActions('', ''));

    expect(typeof action).toBe('object');
    expect(action.type).toBe(SET_CENTER);
  });

  it('clearErrMsg should work fine', () => {
    const { CLEAR_ERRMSG, clearErrMsg } = actions;

    store.dispatch(clearErrMsg());
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(CLEAR_ERRMSG);
  });

  it('fetchEventTypes should work fine', () => {
    const {
      fetchEventTypes,
      FETCH_EVENT_TYPE_SUCCESS,
      FETCH_EVENT_TYPE_FAILURE
    } = actions;

    return store.dispatch(fetchEventTypes())
      .then(() => {
        const storeActions = store.getActions();

        expect(storeActions.some(action => action.type
          === FETCH_EVENT_TYPE_SUCCESS)).toBeTruthy();
    });
  });

  it('setEventTypes should work fine', () => {
    const {
      setEventTypes,
      SET_EVENT_TYPE
    } = actions;

    store.dispatch(setEventTypes({ value:'' }));
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(SET_EVENT_TYPE);
  });

  it('fetchResourceTypes should work fine', () => {
    const {
      fetchResourceTypes,
      FETCH_RESOURCE_TYPE_SUCCESS,
      FETCH_RESOURCE_TYPE_FAILURE
    } = actions;

    return store.dispatch(fetchResourceTypes())
      .then(() => {
        const storeActions = store.getActions();

        expect(storeActions.some(action => action.type
          === FETCH_RESOURCE_TYPE_SUCCESS)).toBeTruthy();
    });
  });

  it('setResourceTypes should work fine', () => {
    const {
      setResourceTypes,
      SET_RESOURCE_TYPE
    } = actions;

    store.dispatch(setResourceTypes({ value:'' }));
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(SET_RESOURCE_TYPE);
  });

  it('fetchFacilityTypes should work fine', () => {
    const {
      fetchFacilityTypes,
      FETCH_FACILITY_TYPE_SUCCESS,
      FETCH_FACILITY_TYPE_FAILURE
    } = actions;

    return store.dispatch(fetchFacilityTypes())
      .then(() => {
        const storeActions = store.getActions();

        expect(storeActions.some(action => action.type
          === FETCH_FACILITY_TYPE_SUCCESS)).toBeTruthy();
    });
  });

  it('setFacilityTypes should work fine', () => {
    const {
      setFacilityTypes,
      SET_FACILITY_TYPE
    } = actions;

    store.dispatch(setFacilityTypes({ value:'' }));
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(SET_FACILITY_TYPE);
  });

  it('fetchResource should work fine', () => {
    const {
      fetchResource
    } = actions;
    const params = { sites: '1,2,3,4' };

    return store.dispatch(fetchResource(params))
      .then(() => {
        const storeActions = store.getActions();

        expect(storeActions.some(action => action.type
          === 'FETCH_RESOURCES')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'FETCH_RESOURCES_SUCCESS')).toBeTruthy();
    });
  });

  it('fetchSelectedResources should work fine', () => {
    const {
      fetchSelectedResources
    } = actions;
    const params = { sites: '1,2,3,4' };
    const fullCalendarParams = {
      resource_ids: '1',
      selected_date: '2016 JUN 4',
      include_linked_resources: true
    };

    return store.dispatch(fetchSelectedResources(params,fullCalendarParams))
      .then(() => {
        const storeActions = store.getActions();

        expect(storeActions.some(action => action.type
          === 'FETCH_SELECTED_RESOURCES_SUCCESS')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'SET_SELECTED_RESOURCES')).toBeTruthy();
    });
  });

  it('fetchSelectedResources should work fine, if no fullCalendarParams', () => {
    const {
      fetchSelectedResources
    } = actions;
    const params = { sites: '1,2,3,4' };

    return store.dispatch(fetchSelectedResources(params))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions.some(action => action.type
          === 'FETCH_SELECTED_RESOURCES_SUCCESS')).toBeTruthy();
    });
  });

  it('changeResource should work fine', () => {
    const {
      changeResource,
      CHANGE_RESOURCES
    } = actions;

    store.dispatch(changeResource({
      value: '',
      errMsg: ''
    }));
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(CHANGE_RESOURCES);
  });

  it('loadResource should work fine', () => {
    const {
      loadResource,
      LOAD_RESOURCES,
      LOAD_RESOURCES_SUCCESS,
      FETCH_RESOURCES_FAILURE
    } = actions;
    const params = {};
    const pageNumber = 1;

    return store.dispatch(loadResource(params, pageNumber))
      .then(() => {
        const storeActions = store.getActions();
        const loadAction = find(storeActions, action => action.type === LOAD_RESOURCES);
        const loadSuccessAction = find(storeActions, action => action.type === LOAD_RESOURCES_SUCCESS);;
        const pageNumber = loadSuccessAction.payload.headers.page_info.page_number;

        expect(loadAction.meta.ignoreLoadingbar).toBe(true);
        expect(loadSuccessAction.meta.ignoreLoadingbar).toBe(true);
        expect(pageNumber).toBe(1);
    });
  });

  it('ajaxLoadResource should work fine', () => {
    const {
      ajaxLoadResource
    } = actions;

    store.dispatch(ajaxLoadResource({}, 0));
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe('LOAD_RESOURCES');
  });

  it('setFetchResource should work fine', () => {
    const {
      setFetchResource,
      SET_FETCH_RESOURCES
    } = actions;

    store.dispatch(setFetchResource(''));
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(SET_FETCH_RESOURCES);
  });

  it('clearResourceMaxMsg should work fine', () => {
    const {
      clearResourceMaxMsg
    } = actions;

    store.dispatch(clearResourceMaxMsg());
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe('CHANGE_RESOURCES');
  });

  it('changeCenter should work fine', () => {
    const {
      changeCenter
    } = actions;

    store.dispatch(changeCenter());
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe('FETCH_RESOURCES');
  });

  it('changeEventTypes should work fine', () => {
    const {
      changeEventTypes
    } = actions;

    store.dispatch(changeEventTypes());
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe('FETCH_RESOURCES');
  });

  it('changeResourceTypes should work fine', () => {
    const {
      changeResourceTypes
    } = actions;

    store.dispatch(changeResourceTypes());
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe('FETCH_RESOURCES');
  });

  it('changeFacilityTypes should work fine', () => {
    const {
      changeFacilityTypes
    } = actions;

    store.dispatch(changeFacilityTypes());
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe('FETCH_RESOURCES');
  });

  it('restoreDefault should work fine', () => {
    const {
      restoreDefault
    } = actions;

    store.dispatch(restoreDefault([1]));
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe('SET_QUICK_VIEW');
  });
  it('restoreDefault should work fine when value is not equal resourceId',()=>{
    const {
      restoreDefault
    } = actions;
    const mockStore = configureStore(middlewares);
    store = mockStore({
      quickView: fromJS({
        data: fromJS([{
          "id": '6',
          "name": "test1",
          "value": '6',
          "text": 'test1',
          "selected": false,
          "resource_ids": [
            10,
            11
          ]
        }]),
        selectedView: '5'
      })
    });
    store.dispatch(restoreDefault([]));
    const action = first(store.getActions());

    expect(typeof action).toBe('undefined');
  });
  it('ajaxLoadResource should work fine', () => {
    const {
      ajaxLoadResource
    } = actions;

    store.dispatch(ajaxLoadResource({facility_name:'test'},2));
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe('LOAD_RESOURCES');
  });

  it('clearFilter should work fine', () => {
    const { clearFilter } = actions;

    return store.dispatch(clearFilter())
      .then(() => {
        const storeActions = store.getActions();

        expect(storeActions.some(action => action.type
          === 'SET_CENTER')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'SET_EVENT_TYPE')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'SET_FACILITY_TYPE')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'SET_RESOURCE_TYPE')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'CHANGE_RESOURCES')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'SET_QUICK_VIEW')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'SET_RESOURCE_IDS')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'SAVE_FILTERS')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'FETCH_RESOURCES_SUCCESS')).toBeTruthy();
      });
  });
});
