import { fromJS, is } from 'immutable';
import reducers from 'shared/reducers/specialHandling';
import {
  FETCH_SPECIAL_HANDLING_STATUS_SUCCESS,
  FETCH_SPECIAL_HANDLING_INFO_SUCCESS,
  RESET_SPECIAL_HANDLING,
  TOGGLE_SPECIAL_HANDLING
} from 'shared/actions/specialHandling';

describe('shared/reducers/specialHandling', () => {
  const getInitialState = () =>
    fromJS({
      customerId: "",
      specialHandling: false,
      shown: false
    });

  it('Return the expected initial state', () => {
    const state = reducers(undefined, {});
    expect(is(getInitialState(), state)).toBeTruthy();
  });

  it('reset special handling state success', () => {
    const state = reducers(getInitialState(), { type: RESET_SPECIAL_HANDLING });
    expect(getInitialState()).toEqual(state);
  });

  it('toggle special handling display state success', () => {
    const state = reducers(getInitialState(), {
      type: TOGGLE_SPECIAL_HANDLING,
      payload: { shown: false }
    });
    expect(state.get('shown')).toBe(false);
  });

  it('fetch special handling status success', () => {
    const state = reducers(getInitialState(), {
      type: FETCH_SPECIAL_HANDLING_STATUS_SUCCESS,
      payload: {
        body: {
          customer_special_handling_info: {
            customer_id: '1123',
            customer_special_handling: true
          }
        }
      }
    });
    expect(state.get('customerId')).toEqual('1123');
    expect(state.get('specialHandling')).toBeTruthy();
  });

  it('fetch special handling info success', () => {
    const state = reducers(getInitialState(), {
      type: FETCH_SPECIAL_HANDLING_INFO_SUCCESS,
      payload: {
        body: {
          customer_alert_info: {
            customer_id: '1123',
            customer_name: 'Amy Chen',
            customer_notes: 'notes content',
            customer_medical_alert: 'medical alert content',
            show_customer_medical_alert: false,
            customer_general_alert: 'general staff only content',
          }
        }
      }
    });
    expect(state.get('shown')).toBe(true);
    expect(state.get('customerName')).toEqual('Amy Chen');
    expect(state.get('notes')).toEqual('notes content');
    expect(state.get('medicalAlert')).toEqual('medical alert content');
    expect(state.get('generalAlert')).toEqual('general staff only content');
    expect(state.get('medicalAlertShown')).toBeFalsy();
  });
});
