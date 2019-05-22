import { fromJS } from 'immutable';
import reducer from 'index/Reservation/reducers/permitAction';
import * as permitActions from 'shared/actions/cancelPermit';
import * as permitGridActions from 'index/Reservation/actions/permitGrid';

describe('index -> reservation -> reducers -> permitAction', () => {
  const initialState = fromJS({
    statusInfo: {},
    statusList: []
  });

  it('CHANGE_PERMIT_STATUS_FAILURE should works fine', function(done) {
    let state = reducer(initialState, {
      type: permitActions.CHANGE_PERMIT_STATUS_FAILURE
    }).toJS();
    expect(state.statusList).toHaveLength(0);
    expect(state.statusList).toEqual([]);
    expect(state.statusInfo).toEqual({});
    done();
  });

  it('CHANGE_PERMIT_STATUS_SUCCESS should works fine', function(done) {
    let statusItems = [{
      status_type: 0,
      status_text: 'Issue',
      stage_id: -1,
      status_id: 4,
      permit_status_action: -1,
      transaction_stage_id: -1
    }, {
      status_type: 0,
      status_text: 'Complete',
      stage_id: -1,
      status_id: 7,
      permit_status_action: -1,
      transaction_stage_id: -1
    }];
    let extraInfo = {
      permit_id: 867,
      permit_number: 867,
      event_name: 'TestEvent867',
      can_be_cancelled: true,
      can_be_completed: true,
      is_expired: false,
      permit_status: 'Approved',
      status_id: 0,
      is_pending_recalculation: false,
      can_be_modified: false,
      is_modifying: false
    };
    let state = reducer(initialState, {
      type: permitActions.CHANGE_PERMIT_STATUS_SUCCESS,
      payload: {
        body: {
          statusitems: statusItems,
          extrainfo: extraInfo
        }
      }
    }).toJS();
    expect(state.statusList).toHaveLength(2);
    expect(state.statusList).toEqual(statusItems);
    expect(typeof state.statusInfo).toBe('object');
    expect(state.statusInfo).toEqual(extraInfo);

    done();
  });

  it('SELECT_PERMIT should works fine', (done) => {
    let state = reducer(initialState, {
      type: permitGridActions.SELECT_PERMIT,
      payload: { value: { permit_id: 1 } }
    }).toJS();

    expect(state.statusInfo).toEqual({});
    expect(state.statusList).toEqual([]);

    done();
  })

  it('SELECT_PERMIT should works fine wihtout permitId', (done) => {
    let state = reducer(initialState, {
      type: permitGridActions.SELECT_PERMIT,
      payload: { }
    }).toJS();

    expect(state.statusInfo).toEqual({});
    expect(state.statusList).toEqual([]);

    done();
  })

  it('FETCH_PERMIT_STATUS_LIST_SUCCESS should works fine', (done) => {
    const extrainfo = {};
    let state = reducer(initialState, {
      type: permitGridActions.FETCH_PERMIT_STATUS_LIST_SUCCESS,
      payload: { body: { statusitems: [{ status_text: '1' }], extrainfo } }
    }).toJS();

    expect(state.statusInfo).toEqual(extrainfo);
    expect(state.statusList).toEqual([{ "status_text": "1", "text": "1", "value": "0" }]);

    done();
  })
});
