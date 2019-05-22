/* eslint import/no-extraneous-dependencies: off */
/* eslint import/no-unresolved: off */
import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';
import eventDetailJson from 'json/ReservationDetail/eventDetail.json'
import jsonPermitFee from 'json/PermitDetail/newReservationFee.json';
import jsonEventDetail from 'json/ReservationDetail/eventDetail.json';
import jsonDeletePermitFee from 'json/PermitDetail/deleteNewReservationFee.json';
import jsonDeleteFacilityCharge from 'json/PermitDetail/deleteFacilityCharge.json';
import jsonResetFee from 'json/PermitDetail/resetfees.json';
import URL from 'shared/urls';
import {
  FETCH_PERMIT_FEE_SUCCESS,
  DELETE_PERMIT_FEE_DETAIL,
  DECORATE_FACILITY,
  DETECT_SAME_CHARGE_SUCCESS,
  APPLY_TO_ALL_SUCCESS,
  requestPermitFee,
  fetchPermitFee,
  deletePermitFeeDetail,
  deleteReservationFeeDetail,
  decorateFacility,
  resetFeeAsyncAction,
  detectSameCharge,
  applyToAll
} from 'shared/actions/permitFee';
import {
  INIT_PAGINATIONS
} from 'shared/actions/pagination';

describe('shared -> actions -> permitFee', () => {
  let store = null;
  const mockStore = configureStore(middlewares);
  const initialData = {
    permitID: '',
    batchID: '1111111',
    receiptID: '2222222',
    receiptEntryID: '3333333'
  };
  const appendState = {
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
    store = mockStore({
      initialData,
      ...appendState
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  it('requestPermitFee should works fine', (done) => {
    store.dispatch(requestPermitFee(URL.newReservationFee, {}, false))
      .then(() => {
        const myActions = store.getActions();
        expect(myActions[myActions.length - 1].type).toEqual(FETCH_PERMIT_FEE_SUCCESS);
        expect(myActions[myActions.length - 1].payload).toEqual(jsonPermitFee);
        done();
      });
  });

  it('fetchPermitFee should works fine', (done) => {
    store.dispatch(fetchPermitFee())
      .then(() => {
        const myActions = store.getActions();
        expect(myActions[myActions.length - 2].type).toEqual(FETCH_PERMIT_FEE_SUCCESS);
        expect(myActions[myActions.length - 1].type).toEqual(INIT_PAGINATIONS)
        expect(myActions[myActions.length - 2].payload).toEqual(jsonPermitFee);
        done();
      });
  });

  it('fetchPermitFee should works fine with params of requestUrl and requestParams', (done) => {
    const requestUrl = 'json/ReservationDetail/eventDetail.json';
    const requestParams = {};

    store.dispatch(fetchPermitFee(requestUrl, requestParams))
      .then(() => {
        const myActions = store.getActions();
        expect(myActions[myActions.length - 2].type).toEqual('');
        expect(myActions[myActions.length - 1].type).toEqual(INIT_PAGINATIONS)
        expect(myActions[myActions.length - 2].payload).toEqual(jsonEventDetail);
        done();
      });
  });

  it('deletePermitFeeDetail should works fine', (done) => {
    store.dispatch(deletePermitFeeDetail({}))
      .then(() => {
        const myActions = store.getActions();
        expect(myActions[0].type).toEqual(DELETE_PERMIT_FEE_DETAIL);
        expect(myActions[1].type).toEqual('');
        expect(myActions[1].payload).toEqual(jsonDeletePermitFee);
        expect(myActions[2].type).toEqual('');
        expect(myActions[3].type).toEqual(FETCH_PERMIT_FEE_SUCCESS);
        expect(myActions[3].payload).toEqual(jsonPermitFee);
        done();
      });
  });

  it('deleteReservationFeeDetail should works fine', (done) => {
    store.dispatch(deleteReservationFeeDetail({}))
      .then(() => {
        const myActions = store.getActions();
        expect(myActions[myActions.length - 1].payload).toEqual(jsonDeleteFacilityCharge);
        done();
      });
  });

  it('decorateFacility should works fine', () => {
    const params = {
      eventFee: {},
      feeSummary: {},
      eventIndex: 2
    };
    store.dispatch(decorateFacility(params));
    const myActions = store.getActions();

    expect(myActions.length).toEqual(1);
    expect(myActions[0].type).toEqual(DECORATE_FACILITY);
    expect(myActions[0].payload).toEqual(params);
  });

  it('resetFeeAsyncAction should works fine when has no permit id and no event id', (done) => {
    store.dispatch(resetFeeAsyncAction())
      .then(() => {
        const myActions = store.getActions();
        expect(myActions.length).toEqual(2);
        expect(myActions[1].payload).toEqual(jsonResetFee);
        done();
      });
  });

  it('resetFeeAsyncAction should works fine when has permit id and event id is empty string', (done) => {
    store = mockStore({
      initialData: {
        ...initialData,
        permitID: '1'
      }
    });
    store.dispatch(resetFeeAsyncAction(''))
      .then(() => {
        const myActions = store.getActions();
        expect(myActions.length).toEqual(2);
        expect(myActions[1].payload).toEqual(jsonResetFee);
        done();
      });
  });
  it('detectSameCharge should works fine ', (done) => {
    store = mockStore({
      initialData: {
        ...initialData
      }
    });
    store.dispatch(detectSameCharge())
      .then(() => {
        const actions = store.getActions();
        expect(actions.length).toEqual(2);
        expect(actions[1].type).toEqual(DETECT_SAME_CHARGE_SUCCESS);
        done();
      });
    });

  describe('applyToAll:',()=>{
    it('applyToAll should works fine', (done) => {
      store = mockStore({
        initialData: {
          ...initialData,
          permitID: '1'
        }
      });
      store.dispatch(applyToAll(''))
        .then(() => {
          const actions = store.getActions();
          expect(actions.length).toEqual(2);
          expect(actions[1].type).toEqual(APPLY_TO_ALL_SUCCESS);
          done();
        });
    });
    it('applyToAll should works fine when receiptEntryID is null', (done) => {
      store = mockStore({
        initialData: {
          ...initialData,
          receiptEntryID: '',
          permitID: '1'
        }
      });
      store.dispatch(applyToAll(''))
        .then(() => {
          const actions = store.getActions();
          expect(actions.length).toEqual(2);
          expect(actions[1].type).toEqual(APPLY_TO_ALL_SUCCESS);
          done();
        });
    });
  });
});
