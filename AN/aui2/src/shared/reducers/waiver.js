import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';
import { getCurrentInitState } from 'shared/utils/initStateHelper';

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
} from '../actions/waiver';

const {
      batchID,
      receiptID,
      receiptEntryID,
      akamaiEnabled,
      akamaiDirectory,
      homeUrl,
      images,
      enableDigitalSignature,
      hideChecklistItemsSection,
      permitID
    } = getCurrentInitState();

const initialState = fromJS({
  data: fromJS([]),
  error: false,
  loading: false,
  batchID,
  receiptID,
  receiptEntryID,
  akamaiEnabled,
  akamaiDirectory,
  homeUrl,
  images,
  enableDigitalSignature,
  hideChecklistItemsSection,
  permitID,
  showWaiver: true,
  errorMsg: {},
  allWaivers: fromJS({})
});

const handlers = {

  [FETCH_WAIVER](state) {
    return state.set('loading', true);
  },

  [FETCH_WAIVER_SUCCESS](state, { payload: { body: { waiver_list: data, has_new: hasNew } } }) {
    return state.withMutations((s) => {
      s.set('error', false);
      s.set('data', fromJS(convertCasingPropObj(data)));
      s.set('showWaiver', true);
      s.set('hasNew', hasNew);
    });
  },

  [FETCH_WAIVER_FAILURE](state, { payload }) {
    return state.withMutations((s) => {
      s.set('error', payload);
      s.set('data', fromJS([]));
    });
  },

  [SAVE_WAIVER](state) {
    return state.set('loading', true);
  },

  [SAVE_WAIVER_SUCCESS](state) {
    return state.withMutations((s) => {
      s.set('error', false);
    });
  },

  [SAVE_WAIVER_FAILURE](state, { payload }) {
    return state.withMutations((s) => {
      s.set('error', payload);
    });
  },

  [SHOW_WAIVER](state, { payload: { isShow } }) {
    return state.withMutations((s) => {
      s.set('showWaiver', isShow);
    });
  },
  [CHANGE_WAIVER](state, { payload: { itemID, isInpermit, signatureString } }) {
    const data = state.get('data');
    let checked = false;
    const temp = [];
    let itemObj;
    let dataID = 0;
    return state.withMutations((s) => {
      data.map((item) => {
        itemObj = item.toJS();
        dataID = (item.get('transactionstageID') === -1 ? item.get('attachedchecklistitemID') : item.get('transactionstageID'));
        if (dataID === parseInt(itemID, 10)) {
          if (signatureString.length > 0) {
            itemObj.displayPermitSelected = true;
            itemObj.agreetowaiverSelected = true;
          } else if (isInpermit) {
            checked = item.get('displayPermitSelected');
            itemObj.displayPermitSelected = !checked;
          } else {
            checked = item.get('agreetowaiverSelected');
            itemObj.agreetowaiverSelected = !checked;
          }
          itemObj.signatureBase64 = signatureString;
        }
        temp.push(itemObj);
        return true;
      });
      if (signatureString) {
        const errorMsg = s.get('errorMsg');
        errorMsg[itemID] = '';
        s.set('errorMsg', errorMsg);
      }
      s.set('data', fromJS(temp));
    });
  },
  [SAVE_WAIVER_ERROR_MESSAGE](state, { payload: { errorMsg } }) {
    return state.withMutations((s) => {
      s.set('errorMsg', errorMsg);
    });
  },
  [SET_WAIVER_ERROR_MESSAGE](state, { payload: { waiverIndex } }) {
    const errorMsg = state.get('errorMsg');
    const keys = Object.keys(errorMsg);
    return state.withMutations((s) => {
      if (keys.indexOf(`${waiverIndex}`) > -1) {
        errorMsg[waiverIndex] = '';
      }
      s.set('errorMsg', errorMsg);
    });
  },

  [DECORATE_WAIVER](state, { payload: { data,
    hasNew, eventIndex, addableWaivers, addableWaiversLoaded } }) {
    const allWaivers = state.get('allWaivers').toJS();
    allWaivers[`event_${eventIndex}`] = { data, hasNew, addableWaivers, addableWaiversLoaded };
    return state.set('allWaivers', fromJS(allWaivers));
  },

  [HIDE_ADD_WAIVER_BUTTON](state, { payload: eventIndex }) {
    return state.setIn(['allWaivers', `event_${eventIndex}`, 'addableWaiversLoaded'], true);
  },

  [CHANGE_WAIVER_BY_EVENTID](state, { payload:
    { itemID, isInpermit, signatureString, eventIndex, waiverIndex } }) {
    const waiver = state.get('allWaivers').get(`event_${eventIndex}`);

    const waiverData = waiver.get('data');
    const addableWaivers = waiver.get('addableWaivers');
    let isAddWaiver = false;
    let data = waiverData;
    if (addableWaivers && addableWaivers.find(item => item.get('waiverIndex') === waiverIndex)) {
      isAddWaiver = true;
      data = addableWaivers;
    }

    let checked = false;
    const temp = [];
    let itemObj;
    let dataID = 0;
    return state.withMutations((s) => {
      data.map((item) => {
        itemObj = item.toJS();
        dataID = (item.get('transactionstageID') === -1 ? item.get('attachedchecklistitemID') : item.get('transactionstageID'));
        if (dataID === parseInt(itemID, 10)) {
          if (signatureString.length > 0) {
            itemObj.displayPermitSelected = true;
            itemObj.agreetowaiverSelected = true;
          } else if (isInpermit) {
            checked = item.get('displayPermitSelected');
            itemObj.displayPermitSelected = !checked;
          } else {
            checked = item.get('agreetowaiverSelected');
            itemObj.agreetowaiverSelected = !checked;
          }
          itemObj.signatureBase64 = signatureString;
        }
        temp.push(itemObj);
        return true;
      });
      if (signatureString) {
        const errorMsg = s.get('errorMsg');
        errorMsg[waiverIndex] = '';
        s.set('errorMsg', errorMsg);
      }
      const allWaivers = state.get('allWaivers').toJS();
      if (isAddWaiver) {
        allWaivers[`event_${eventIndex}`] = { ...waiver.toJS(), addableWaivers: temp, hasNew: waiver.get('hasNew') };
      } else {
        allWaivers[`event_${eventIndex}`] = { ...waiver.toJS(), data: temp, hasNew: waiver.get('hasNew') };
      }
      s.set('allWaivers', fromJS(allWaivers));
    });
  }
};

export default reducerHandler(initialState, handlers);
