import { fromJS } from 'immutable';
import {
  FETCH_WAIVER,
  FETCH_WAIVER_SUCCESS,
  FETCH_WAIVER_FAILURE,
  SAVE_WAIVER,
  SAVE_WAIVER_SUCCESS,
  SAVE_WAIVER_FAILURE,
  SHOW_WAIVER,
  CHANGE_WAIVER,
  SAVE_WAIVER_ERROR_MESSAGE,
  SET_WAIVER_ERROR_MESSAGE,
  DECORATE_WAIVER,
  CHANGE_WAIVER_BY_EVENTID,
  HIDE_ADD_WAIVER_BUTTON
} from 'shared/actions/waiver';
import reducers from 'shared/reducers/waiver';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';

describe('shared/reducers/waiver', () => {
  const getInitialState = () => fromJS({
    data: fromJS([]),
    error: false,
    loading: false,
    showWaiver: true,
    errorMsg: {},
    allWaivers: fromJS({
      event_12: {
        addable_waivers: [],
      }

    })
  });

  const waiverResponse1 = {
    transactionstage_id: -1,
    attachedchecklistitem_id: 33,
    stage_id: 24,
    stage_version: 6,
    stage_type: 1,
    description: 'Test Jack Waiver',
    attachment_id: 110,
    attachment_name: 'New Waiver PD',
    show_display_permit: true,
    display_permit_selected: false,
    disable_agreetowaiver: false,
    agreetowaiver_selected: false,
    can_modify_signature: true,
    signature_base64: '',
    item_text: 'test waiver',
    uploadfile_href_text: 'test pad',
    is_required: true,
    waiver_index: 1
  };
  const waiverResponse2 = {
    transactionstage_id: 31,
    attachedchecklistitem_id: 13,
    stage_id: 8,
    stage_version: 0,
    stage_type: 1,
    description: 'Global waiver',
    attachment_id: -1,
    attachment_name: '',
    show_display_permit: true,
    display_permit_selected: false,
    disable_agreetowaiver: false,
    agreetowaiver_selected: false,
    can_modify_signature: true,
    signature_base64: '',
    item_text: 'It is a global waiver\r\nThis should be a new line.\r\nThe end.',
    uploadfile_href_text: null,
    is_required: false,
    waiver_index: 2
  };

  const eventIndex = 12;
  const itemID = 33;

  it('Set fetching waiver state success', () => {
    const action = {
      type: FETCH_WAIVER
    };
    const state = reducers(getInitialState(), action);
    expect(state.get('loading')).toBe(true);
  });

  it('Should fetch waiver success', () => {
    const action = {
      type: FETCH_WAIVER_SUCCESS,
      payload: {
        body: {
          waiver_list: [waiverResponse1, waiverResponse2],
          has_new: true
        }
      }
    };
    const state = reducers(getInitialState(), action);
    expect(state.get('error')).toBe(false);
    expect(state.get('showWaiver')).toBe(true);
    expect(state.get('hasNew')).toBe(true);
    const data = state.get('data').toJS();
    expect(Array.isArray(data)).toBeTruthy();
    expect(data[0]).toEqual(convertCasingPropObj(waiverResponse1));
    expect(data[1]).toEqual(convertCasingPropObj(waiverResponse2));
  });

  it('Should fetch waiver failure', () => {
    const action = {
      type: FETCH_WAIVER_FAILURE,
      payload: true
    };
    const state = reducers(getInitialState(), action);
    const data = state.get('data').toJS();
    expect(Array.isArray(data)).toBeTruthy();
    expect(data).toHaveLength(0);
    expect(state.get('error')).toBe(true);
  });

  it('Set saving waiver state success', () => {
    const action = {
      type: SAVE_WAIVER
    };
    const state = reducers(getInitialState(), action);
    expect(state.get('loading')).toBe(true);
  });

  it('Set save waiver success', () => {
    const action = {
      type: SAVE_WAIVER_SUCCESS
    };
    const stateWithError = getInitialState().set('error', true);
    const state = reducers(stateWithError, action);
    expect(state.get('error')).toBe(false);
  });

  it('Set save waiver failure', () => {
    const action = {
      type: SAVE_WAIVER_FAILURE,
      payload: true
    };
    const state = reducers(getInitialState(), action);
    expect(state.get('error')).toBe(true);
  });

  it('Show waiver success', () => {
    const action = {
      type: SHOW_WAIVER,
      payload: {
        isShow: true
      }
    };
    const state = reducers(getInitialState(), action);
    expect(state.get('showWaiver')).toBe(true);
  });

  it('Should save waiver error message', () => {
    const msg1 = 'waiver1 should be checked';
    const msg2 = 'waiver2 should be checked';
    const action = {
      type: SAVE_WAIVER_ERROR_MESSAGE,
      payload: {
        errorMsg: {
          0: msg1,
          2: msg2
        }
      }
    };
    const state = reducers(getInitialState(), action);
    const errorMsg = state.get('errorMsg');
    expect(typeof errorMsg).toBe('object');
    expect(errorMsg[0]).toBe(msg1);
    expect(errorMsg[2]).toBe(msg2);
  });

  it('Should change waiver success', () => {
    // prepare
    let state = reducers(getInitialState(), {
      type: FETCH_WAIVER_SUCCESS,
      payload: {
        body: {
          waiver_list: [waiverResponse1, waiverResponse2],
          has_new: true
        }
      }
    });
    state = reducers(state, {
      type: SAVE_WAIVER_ERROR_MESSAGE,
      payload: {
        errorMsg: {
          33: 'error happens'
        }
      }
    });

    const action = {
      type: CHANGE_WAIVER,
      payload: {
        itemID,
        isInpermit: true,
        signatureString: 'abcd'
      }
    };
    state = reducers(state, action);
    expect(state.get('errorMsg')[33]).toBe('');
    const data = state.get('data').toJS();
    expect(Array.isArray(data)).toBeTruthy();
    expect(data).toHaveLength(2);
    const waiver1 = data[0];
    expect(waiver1.displayPermitSelected).toBe(true);
    expect(waiver1.agreetowaiverSelected).toBe(true);
    expect(waiver1.signatureBase64).toBe('abcd');
    const waiver2 = data[1];
    expect(waiver2.displayPermitSelected).toBe(false);
    expect(waiver2.agreetowaiverSelected).toBe(false);
  });

  it('Should change waiver success without signature', () => {
    // prepare
    let state = reducers(getInitialState(), {
      type: FETCH_WAIVER_SUCCESS,
      payload: {
        body: {
          waiver_list: [waiverResponse1, waiverResponse2],
          has_new: true
        }
      }
    });

    const action = {
      type: CHANGE_WAIVER,
      payload: {
        itemID,
        isInpermit: true,
        signatureString: ''
      }
    };
    state = reducers(state, action);
    const data = state.get('data').toJS();
    expect(Array.isArray(data)).toBeTruthy();
    expect(data).toHaveLength(2);
    const waiver1 = data[0];
    expect(waiver1.displayPermitSelected).toBe(true);
    expect(waiver1.agreetowaiverSelected).toBe(false);
    const waiver2 = data[1];
    expect(waiver2.displayPermitSelected).toBe(false);
    expect(waiver2.agreetowaiverSelected).toBe(false);
  });

  it('Should change waiver success without signature and not in permit', () => {
    // prepare
    let state = reducers(getInitialState(), {
      type: FETCH_WAIVER_SUCCESS,
      payload: {
        body: {
          waiver_list: [waiverResponse1, waiverResponse2],
          has_new: true
        }
      }
    });

    const action = {
      type: CHANGE_WAIVER,
      payload: {
        itemID,
        isInpermit: false,
        signatureString: ''
      }
    };
    state = reducers(state, action);
    const data = state.get('data').toJS();
    expect(Array.isArray(data)).toBeTruthy();
    expect(data).toHaveLength(2);
    const waiver1 = data[0];
    expect(waiver1.displayPermitSelected).toBe(false);
    expect(waiver1.agreetowaiverSelected).toBe(true);
    const waiver2 = data[1];
    expect(waiver2.displayPermitSelected).toBe(false);
    expect(waiver2.agreetowaiverSelected).toBe(false);
  });

  it('Should clean error message success by waiver index', () => {
    let state = reducers(getInitialState(), {
      type: SAVE_WAIVER_ERROR_MESSAGE,
      payload: {
        errorMsg: {
          33: 'error happens'
        }
      }
    });
    const action = {
      type: SET_WAIVER_ERROR_MESSAGE,
      payload: {
        waiverIndex: 33
      }
    };
    state = reducers(state, action);
    expect(state.get('errorMsg')[33]).toBe('');
  });

  it('Should note clean error message success by different waiver index', () => {
    let state = reducers(getInitialState(), {
      type: SAVE_WAIVER_ERROR_MESSAGE,
      payload: {
        errorMsg: {
          33: 'error happens'
        }
      }
    });
    const action = {
      type: SET_WAIVER_ERROR_MESSAGE,
      payload: {
        waiverIndex: 30
      }
    };
    state = reducers(state, action);
    expect(state.get('errorMsg')[33]).toBe('error happens');
  });

  it('Should decorate waiver success', () => {
    const action = {
      type: DECORATE_WAIVER,
      payload: {
        data: [
          convertCasingPropObj(waiverResponse1)
        ],
        hasNew: true,
        eventIndex
      }
    };
    const state = reducers(getInitialState(), action);
    const waivers = state.get('allWaivers').toJS();
    expect(typeof waivers).toBe('object');
    const waiver = waivers[`event_${eventIndex}`];
    expect(Array.isArray(waiver.data)).toBeTruthy();
    expect(waiver.data[0]).toEqual(convertCasingPropObj(waiverResponse1));
    expect(waiver.hasNew).toBe(true);
  });

  it('Should change waiver success by event id', () => {
    let state = reducers(getInitialState(), {
      type: DECORATE_WAIVER,
      payload: {
        data: [
          convertCasingPropObj(waiverResponse1),
          convertCasingPropObj(waiverResponse2)
        ],
        hasNew: true,
        addable_waivers: [],
        eventIndex
      }
    });
    const action = {
      type: CHANGE_WAIVER_BY_EVENTID,
      payload: {
        itemID,
        isInpermit: true,
        signatureString: 'abcde',
        eventIndex,
        waiverIndex: 2,
      }
    };
    state = reducers(state, action);
    const waivers = state.get('allWaivers').toJS();
    const data = waivers[`event_${eventIndex}`].data;
    const waiver1 = data[0];
    expect(waiver1.displayPermitSelected).toBe(true);
    expect(waiver1.agreetowaiverSelected).toBe(true);
    expect(waiver1.signatureBase64).toBe('abcde');
    const waiver2 = data[1];
    expect(waiver2.displayPermitSelected).toBe(false);
    expect(waiver2.agreetowaiverSelected).toBe(false);
  });

  it('Should decorate waiver success by event id', () => {
    let state = reducers(getInitialState(), {
      type: DECORATE_WAIVER,
      payload: {
        data: [
          convertCasingPropObj(waiverResponse1),
          convertCasingPropObj(waiverResponse2)
        ],
        hasNew: true,
        eventIndex
      }
    });
    const action = {
      type: CHANGE_WAIVER_BY_EVENTID,
      payload: {
        itemID,
        isInpermit: true,
        signatureString: 'abcde',
        eventIndex,
        waiverIndex: 2
      }
    };
    state = reducers(state, action);
    const waivers = state.get('allWaivers').toJS();
    const data = waivers[`event_${eventIndex}`].data;
    const waiver1 = data[0];
    expect(waiver1.displayPermitSelected).toBe(true);
    expect(waiver1.agreetowaiverSelected).toBe(true);
    expect(waiver1.signatureBase64).toBe('abcde');
    const waiver2 = data[1];
    expect(waiver2.displayPermitSelected).toBe(false);
    expect(waiver2.agreetowaiverSelected).toBe(false);
  });

  it('Should change waiver success by event id without signature', () => {
    let state = reducers(getInitialState(), {
      type: DECORATE_WAIVER,
      payload: {
        data: [
          convertCasingPropObj(waiverResponse1),
          convertCasingPropObj(waiverResponse2)
        ],
        hasNew: true,
        eventIndex
      }
    });
    const action = {
      type: CHANGE_WAIVER_BY_EVENTID,
      payload: {
        itemID,
        isInpermit: true,
        signatureString: '',
        eventIndex,
        waiverIndex: 2
      }
    };
    state = reducers(state, action);
    const waivers = state.get('allWaivers').toJS();
    const data = waivers[`event_${eventIndex}`].data;
    const waiver1 = data[0];
    expect(waiver1.displayPermitSelected).toBe(true);
    expect(waiver1.agreetowaiverSelected).toBe(false);
    expect(waiver1.signatureBase64).toBe('');
    const waiver2 = data[1];
    expect(waiver2.displayPermitSelected).toBe(false);
    expect(waiver2.agreetowaiverSelected).toBe(false);
  });

  it('Should change waiver success by event id without signature and not in permit', () => {
    let state = reducers(getInitialState(), {
      type: DECORATE_WAIVER,
      payload: {
        data: [
          convertCasingPropObj(waiverResponse1),
          convertCasingPropObj(waiverResponse2)
        ],
        hasNew: true,
        eventIndex
      }
    });
    const action = {
      type: CHANGE_WAIVER_BY_EVENTID,
      payload: {
        itemID,
        isInpermit: false,
        signatureString: '',
        eventIndex,
        waiverIndex: 2
      }
    };
    state = reducers(state, action);
    const waivers = state.get('allWaivers').toJS();
    const data = waivers[`event_${eventIndex}`].data;
    const waiver1 = data[0];
    expect(waiver1.displayPermitSelected).toBe(false);
    expect(waiver1.agreetowaiverSelected).toBe(true);
    expect(waiver1.signatureBase64).toBe('');
    const waiver2 = data[1];
    expect(waiver2.displayPermitSelected).toBe(false);
    expect(waiver2.agreetowaiverSelected).toBe(false);
  });

  it('HIDE_ADD_WAIVER_BUTTON', () => {
    let state = reducers(getInitialState(), {
      type: DECORATE_WAIVER,
      payload: {
        data: [
          convertCasingPropObj(waiverResponse1),
          convertCasingPropObj(waiverResponse2)
        ],
        hasNew: true,
        eventIndex
      }
    });
    const action = {
      type: CHANGE_WAIVER_BY_EVENTID,
      payload: {
        itemID,
        isInpermit: false,
        signatureString: '',
        eventIndex,
        waiverIndex: 2
      }
    };
    state = reducers(state, action);
    const waivers = state.get('allWaivers').toJS();
  });

  it('HIDE_ADD_WAIVER_BUTTON state success', () => {
    const action = {
      type: HIDE_ADD_WAIVER_BUTTON,
      payload: 12
    };
    const state = reducers(getInitialState(), action);
    expect(state.getIn(['allWaivers', `event_${eventIndex}`, 'addableWaiversLoaded'])).toBe(true);
  });

  it('change add waiver Should be success ', () => {
    let state = reducers(getInitialState(), {
      type: DECORATE_WAIVER,
      payload: {
        data: [
          convertCasingPropObj(waiverResponse1),
          convertCasingPropObj(waiverResponse2)
        ],
        addableWaivers: [convertCasingPropObj({
          "transactionstage_id": -1,
          "attachedchecklistitem_id": 106,
          "stage_id": 41,
          "stage_version": 1,
          "stage_type": 0,
          "description": "2-waiver",
          "attachment_id": "EC8C128F",
          "attachment_name": "",
          "show_display_permit": true,
          "display_permit_selected": false,
          "disable_agreetowaiver": false,
          "agreetowaiver_selected": false,
          "can_modify_signature": false,
          "signature_base64": "",
          "item_text": "",
          "uploadfile_href_text": null,
          "waiver_index": "3671_0_41",
          "due_date": null,
          "complete_date": null,
          "is_required": false
        })],
        hasNew: true,
        eventIndex
      }
    });
    const action = {
      type: CHANGE_WAIVER_BY_EVENTID,
      payload: {
        itemID,
        isInpermit: true,
        signatureString: '',
        eventIndex,
        waiverIndex: "3671_0_41"
      }
    };
    state = reducers(state, action);
    const waivers = state.get('allWaivers').toJS();
    const data = waivers[`event_${eventIndex}`].addableWaivers;
    const waiver1 = data[0];
    expect(waiver1.displayPermitSelected).toBe(false);
    expect(waiver1.agreetowaiverSelected).toBe(false);
    expect(waiver1.signatureBase64).toBe('');
  });
});
