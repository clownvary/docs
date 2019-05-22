import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import { pages } from 'shared/consts';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';
import eventDetailJson from 'json/ReservationDetail/eventDetail.json'

import { initPaginations, showMore, INIT_PAGINATIONS, SHOW_MORE_RECURRING_FEES } from 'shared/actions/pagination';
import { fromJS } from 'immutable';

describe('shared/actions/pagination', () => {
  let store = null;
  const initState = {
    pagination: fromJS({
      paginations: fromJS([])
    }),
    permitFee: fromJS({
      facilityFees: []
    }),
    facility: fromJS({
      allFacilities:fromJS ({
        event_2_0: {
         ...convertCasingPropObj(eventDetailJson.body.event_detail)
        }
      })
    })
  };
  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore(initState);
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('initPagination: ',()=>{
    it('initPaginations action should works fine when page is null', () => {
      store.dispatch(initPaginations(null));
      const storeActions = store.getActions();
      expect(storeActions.length).toBeGreaterThanOrEqual(1);
      expect(storeActions[0].type).toBe(INIT_PAGINATIONS);
      expect(storeActions[0].payload).toEqual({"paginations": []});
    });
    it('initPaginations action should works fine when page is permitDeatailPage', () => {
      store.dispatch(initPaginations());
      const storeActions = store.getActions();
      expect(storeActions.length).toBeGreaterThanOrEqual(1);
      expect(storeActions[0].type).toBe(INIT_PAGINATIONS);
      expect(storeActions[0].payload).toEqual({"paginations": []});
    });
    it('initPaginations action should works fine when page is reservationDetailPage', () => {
      store.dispatch(initPaginations());
      const storeActions = store.getActions();
      expect(storeActions.length).toBeGreaterThanOrEqual(1);
      expect(storeActions[0].type).toBe(INIT_PAGINATIONS);
      expect(storeActions[0].payload).toEqual({"paginations": []});
    });
  });

  describe('showMore:',()=>{
    it('showMore action should works when pagination has value', () => {
      const mockStore = configureStore(middlewares);
      const tempState =  {
        pagination: fromJS({
          paginations: fromJS([
            {"currentPage": 1, "isLastPage": false, "pageCount":2, "paginationId": 23252, "remaining": 4,"total": 10}])
        })};
      const tempStore = mockStore(tempState);
      tempStore.dispatch(showMore(23252,2));
      const storeActions = tempStore.getActions();
      expect(storeActions.length).toBeGreaterThanOrEqual(1);
      expect(storeActions[0].type).toBe(SHOW_MORE_RECURRING_FEES);
      expect(storeActions[0].payload).toEqual(
        {"currentPage": 2, "isLastPage": false, "paginationId": 23252, "remaining": 6}
      );
    });

    it('showMore action should works when pagination has no value', () => {
      const mockStore = configureStore(middlewares);
      const tempState =  {
        pagination: fromJS({
          paginations: fromJS([])})};
      const tempStore = mockStore(tempState);
      tempStore.dispatch(showMore(23252,2));
      const storeActions = tempStore.getActions();
      expect(storeActions.length).toBeGreaterThanOrEqual(1);
      expect(storeActions[0].type).toBe(SHOW_MORE_RECURRING_FEES);
      expect(storeActions[0].payload).toEqual(
        {"currentPage": 1, "isLastPage": false, "paginationId": 23252, "remaining": 0}
      );
    });
    it('showMore action should works when remainder is not 0', () => {
      const mockStore = configureStore(middlewares);
      const tempState =  {
        pagination: fromJS({
          paginations: fromJS([
            {"currentPage": 1, "isLastPage": false, "pageCount":3, "paginationId": 23252, "remaining": 4,"total": 10}])
          })};
      const tempStore = mockStore(tempState);
      tempStore.dispatch(showMore(23252,2));
      const storeActions = tempStore.getActions();
      expect(storeActions.length).toBeGreaterThanOrEqual(1);
      expect(storeActions[0].type).toBe(SHOW_MORE_RECURRING_FEES);
      expect(storeActions[0].payload).toEqual(
        {"currentPage": 2, "isLastPage": false, "paginationId": 23252, "remaining": 4}
      );
    });

    it('showMore action should works when value > lastPage ', () => {
      const mockStore = configureStore(middlewares);
      const tempState =  {
        pagination: fromJS({
          paginations: fromJS([
            {"currentPage": 1, "isLastPage": false, "pageCount":3, "paginationId": 23252, "remaining": 4,"total": 10}])
          })};
      const tempStore = mockStore(tempState);
      tempStore.dispatch(showMore(23252,12));
      const storeActions = tempStore.getActions();
      expect(storeActions.length).toBeGreaterThanOrEqual(1);
      expect(storeActions[0].type).toBe(SHOW_MORE_RECURRING_FEES);
      expect(storeActions[0].payload).toEqual(
        {"currentPage": 4, "isLastPage": true, "paginationId": 23252, "remaining": -2}
      );
    });
  });


});
