import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import * as permitActions from 'index/Reservation/actions/permitAction';
import permitStatusJSON from 'json/Bookings/permit_status_list.json';
import permitExtraInfoJSON from 'json/Bookings/permit_extra_info.json';
import changePermitStatusJSON from 'json/Bookings/change_permit_status.json';

describe('index -> Reservation -> actions -> permitAction -> changePermitStatus', () => {
  let store = null;
  let permitId = 866;

  beforeEach(function () {
    const mockStore = configureStore(middlewares);
    store = mockStore({ initialData: {} });
  });

  afterEach(function () {
    store.clearActions();
  });

  it('completePermit should works fine', (done) => {
    store.dispatch(permitActions.completePermit({ permit_id: permitId }))
      .then(({ payload: { body: { statusitems, extrainfo } } }) => {
        let actions = store.getActions();

        expect(actions.length).toBe(3);
        expect(Array.isArray(statusitems)).toBeTruthy();
        expect(typeof extrainfo).toBe('object');
        expect(extrainfo.permit_id).toBe(permitId);
        expect(extrainfo).toEqual(changePermitStatusJSON.body.extrainfo);
        done();
      });
  });

  it('completePermit should works fine when no param', (done) => {
    store.dispatch(permitActions.completePermit())
      .then(({ payload: { body: { statusitems, extrainfo } } }) => {
        let actions = store.getActions();

        expect(actions.length).toBeGreaterThanOrEqual(2);
        expect(Array.isArray(statusitems)).toBeTruthy();
        expect(typeof extrainfo).toBe('object');
        expect(extrainfo.permit_id).toBe(permitId);
        expect(extrainfo).toEqual(changePermitStatusJSON.body.extrainfo);
        done();
      });
  });

  it('fetchPermitStatusInfo should works fine', (done) => {
    store.dispatch(permitActions.fetchPermitStatusInfo(permitId))
      .then((res) => {
        expect(typeof res).toBe('object');
        expect(res.permit_id).toBe(permitId);
        expect(res).toEqual(permitExtraInfoJSON.body.extrainfo);
        done();
      }).then(null, function (err) {
      console.error(err);
      done(err);
    });
  });

  it('fetchPermitStatusList should works fine', (done) => {
    let statusitems = [{
        "status_type": 0,
        "status_text": "Issue",
        "stage_id": -1,
        "status_id": 4,
        "permit_status_action": -1,
        "transaction_stage_id": -1
      }, {
        "status_type": 0,
        "status_text": "Deny",
        "stage_id": -1,
        "status_id": 5,
        "permit_status_action": -1,
        "transaction_stage_id": -1
      },{
        "status_type": 0,
        "status_text": "Complete",
        "stage_id": -1,
        "status_id": 7,
        "permit_status_action": -1,
        "transaction_stage_id": -1
      }
    ];

    store.dispatch(permitActions.fetchPermitStatusList(permitId))
      .then(({ statusitems }) => {
        expect(Array.isArray(statusitems)).toBeTruthy();
        expect(statusitems).toEqual(permitStatusJSON.body.statusitems);
        done();
      }).then(null, function (err) {
      console.error(err);
      done(err);
    });
  });

  it('saveCreatedByMe should works fine', () => {
    const action = permitActions.saveCreatedByMe(23);

    expect(typeof action).toBe('object');
  });
});
