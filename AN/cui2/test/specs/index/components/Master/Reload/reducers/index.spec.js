import { fromJS } from 'immutable';
import { expect } from 'chai';
import reducers from 'index/dev-admin/Reload/reducers';
import * as actions from 'index/dev-admin/Reload/consts/actionTypes';

describe('index/modules/Cart/Checkout/reducers/billingAddress', () => {
  const initialState = fromJS({
    loading: false,
    successful: false
  });

  it('Should get loading to be true', () => {
    const {
      RELOAD_UI_LOADING
    } = actions;
    const returnState = reducers(initialState, {
      type: RELOAD_UI_LOADING,
      payload: true
    });
    expect(returnState.get('loading')).to.be.true;
  });

  it('Should get loading to be false', () => {
    const {
      RELOAD_UI_LOADING
    } = actions;
    const returnState = reducers(initialState, {
      type: RELOAD_UI_LOADING,
      payload: false
    });
    expect(returnState.get('loading')).to.be.false;
  });

  it('Should get successful to be true', () => {
    const {
      RELOAD_UI_RELOAD_SITES_SUCCESS
    } = actions;
    const returnState = reducers(initialState, {
      type: RELOAD_UI_RELOAD_SITES_SUCCESS
    });
    expect(returnState.get('successful')).to.be.true;
  });

  it('Should get successful to be false', () => {
    const {
      RELOAD_UI_RELOAD_SITES_FAILED
    } = actions;
    const returnState = reducers(initialState, {
      type: RELOAD_UI_RELOAD_SITES_FAILED
    });
    expect(returnState.get('successful')).to.be.false;
  });
});
