import { fromJS } from 'immutable';
import * as actionTypes from 'index/modules/Cart/Checkout/consts/actionTypes';
import agreementReducer from 'index/modules/Cart/Checkout/reducers/agreement';

/* eslint-disable */
import agreement from 'Cart/Checkout/get_agreement.json';
/* eslint-enable */

describe('index/modules/Cart/Checkout/reducers/agreement', () => {
  const agreementData = agreement.body.ecp_agreement;
  const errors = { moduleName: '', errorMessage: '' };

  const defaultState = fromJS({
    agreement: {},
    isDisplayAgreement: false,
    isSignedAgreement: false,
    errors: {}
  });

  const expectedInitialState = fromJS({
    agreement: agreementData,
    isDisplayAgreement: true,
    isSignedAgreement: true,
    errors: fromJS(errors)
  });

  it('Should sign agreement successfully', () => {
    const {
      AGREEMENT_ON_SIGN
    } = actionTypes;

    const returnState = agreementReducer(defaultState, {
      type: AGREEMENT_ON_SIGN
    });

    expect(returnState.get('isSignedAgreement')).toEqual(expectedInitialState.get('isSignedAgreement'));
  });

  it('Should display agreement successfully', () => {
    const {
      AGREEMENT_UI_DISPLAY
    } = actionTypes;

    const returnState = agreementReducer(defaultState, {
      type: AGREEMENT_UI_DISPLAY
    });

    expect(returnState.get('isDisplayAgreement')).toEqual(expectedInitialState.get('isDisplayAgreement'));
  });

  it('Should display agreement error successfully', () => {
    const {
      AGREEMENT_UI_DISPLAY_ERROR
    } = actionTypes;

    const returnState = agreementReducer(defaultState, {
      type: AGREEMENT_UI_DISPLAY_ERROR,
      payload: errors
    });

    expect(returnState.get('errors')).toEqual(expectedInitialState.get('errors'));
  });

  it('Should reset agreement state successfully', () => {
    const {
      AGREEMENT_UI_RESET_STATE
    } = actionTypes;

    const lastState = fromJS({
      isDisplayAgreement: false,
      isSignedAgreement: false,
      errors: fromJS({})
    });

    const returnState = agreementReducer(defaultState, {
      type: AGREEMENT_UI_RESET_STATE
    });

    expect(returnState.get('errors')).toEqual(lastState.get('errors'));
  });

  it('Should get agreement state successfully', () => {
    const {
      AGREEMENT_UI
    } = actionTypes;

    const returnState = agreementReducer(defaultState, {
      type: AGREEMENT_UI
    });

    expect(returnState.get('isDisplayAgreement')).toBeTruthy();
  });
});
