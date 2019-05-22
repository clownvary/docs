import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import { fromJS } from 'immutable';
import first from 'lodash/first';
import mockAPI from 'utils/mockAPI';
import * as actions from 'index/Resource/actions/monthView';

describe('index/Resource/actions/monthView', () => {
  let mockStore = null;
  let store = null;
  const initialData = {
    permitID: -1,
    eventID: 2,
    batchID: '1111111',
    receiptID: '2222222',
    receiptEntryID: '3333333'
  };

  beforeEach(() => {
    mockStore = configureStore(middlewares);
    store = mockStore({
      resourceBooking: fromJS({
        resource_ids: [1,2,3], 
        include_linked_resources: true,
        start_date: '2018-07-04'
      }),
      monthView:  fromJS({ showDayView: false}),
      initialData
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  it('switchView should work fine', () => {
    const { switchView } = actions;

    store.dispatch(switchView(false, '2018-07-04'));
    const storeActions = store.getActions();

    expect(storeActions.some(action => action.type === actions.SWITCH_VIEW)).toBeTruthy();
    expect(storeActions.some(action => action.type === actions.SET_LAST_DATE_OF_DAY_VIEW)).toBeTruthy();
  });

  it('switchView should work fine', () => {
    const { switchView } = actions;

    store.dispatch(switchView(true, '2018-07-04'));
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === actions.SWITCH_VIEW)).toBeTruthy();
    expect(storeActions.some(action => action.type === 'SET_RESOURCE_SELECTED_DATE')).toBeTruthy();
  });

  it('switchView should work fine when resource id list is empty', () => {
    const { switchView } = actions;
    store = mockStore({
      resourceBooking: fromJS({
        resource_ids: [], 
        include_linked_resources: true,
        start_date: '2018-07-04'
      }),
      monthView:  fromJS({ showDayView: false}),
      initialData
    });
    store.dispatch(switchView(false, '2018-07-04'));
    const storeActions = store.getActions();

    expect(storeActions.some(action => action.type === actions.SWITCH_VIEW)).toBeTruthy();
    expect(storeActions.some(action => action.type === actions.SET_LAST_DATE_OF_DAY_VIEW)).toBeTruthy();
  });

});
