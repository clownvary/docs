import getMainReducer from 'index/PermitDetail/reducers/index';
import * as actions from 'index/PermitDetail/actions/index';

const reducer = getMainReducer(__permitDetail__.__initialState__);

describe('index -> PermitDetail -> reducers -> index', () => {
  it('should handle SET_WAIVER_ERRORS correctly', () => {

    const state = reducer(undefined, actions.setWaiverErrors());
    expect(state.getIn(['errors', 'waiverErrors']).toJS()).toEqual({errorsKey: "Please check all required waivers."});
  });

  it('should handle CLEAR_WAIVER_ERRORS correctly', () => {

    const state = reducer(undefined, actions.setWaiverErrors({}));
    expect(state.getIn(['errors', 'waiverErrors']).toJS()).toEqual({});
  });

  it('should handle PERMIT_DETAILS_CHANGED correctly', () => {
    const state = reducer(undefined, actions.permitDetailsChanged());
    expect(state.get('isPermitDetailsChanged')).toBe(true)
  });

  it('should handle FETCH_READY4CHECKOUT_SUCCESS correctly', () => {
    let state = reducer(undefined, {
      type: 'FETCH_READY4CHECKOUT_SUCCESS',
      payload: { body: { ready4checkout: 'true' } }
    })

    expect(state.get('ready4Checkout')).toBe(true);

    state = reducer(undefined, {
      type: 'FETCH_READY4CHECKOUT_SUCCESS',
      payload: { body: { ready4checkout: 'others' } }
    })

    expect(state.get('ready4Checkout')).toBe(false);
  })

  it('should handle FETCH_INCART_SUCCESS correctly', () => {
    let state = reducer(undefined, {
      type: 'FETCH_INCART_SUCCESS',
      payload: { body: { in_cart: 'true' } }
    })

    expect(state.get('inCart')).toBe(true);

    state = reducer(undefined, {
      type: 'FETCH_INCART_SUCCESS',
      payload: { body: { in_cart: 'others' } }
    })

    expect(state.get('inCart')).toBe(false);
  })
});
