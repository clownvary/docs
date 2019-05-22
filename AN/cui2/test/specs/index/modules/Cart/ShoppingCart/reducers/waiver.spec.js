import { expect } from 'chai';
import { is, fromJS } from 'immutable';
import waiverReducer from 'index/modules/Cart/ShoppingCart/reducers/waiver';

describe('index/modules/Cart/ShoppingCart/reducers/waiver', () => {
  const defaultWaiversAgreements = fromJS({
    final_system_waiver: { required: true, value: false, error: false },
    final_initials_waiver: { required: true, value: '', error: false }
  });

  const expectedInitialState = fromJS({
    waivers: null,
    waiversAgreements: defaultWaiversAgreements,
    warningAlertShown: true
  });
  it('Should return the expected initial state', () => {
    expect(is(expectedInitialState, waiverReducer(undefined, {}))).to.be.true;
  });
});
