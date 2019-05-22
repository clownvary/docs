import isLoginCustomerId from 'shared/utils/isLoginCustomerId';

describe('shared/utils/isLoginCustomerId', () => {
  it('method shall work fine', () => {
    const loginCustomerId = 166;
    expect(isLoginCustomerId(loginCustomerId)).toBeTruthy();

    const notLoginCustomerId = -1;
    expect(isLoginCustomerId(notLoginCustomerId)).toBeFalsy();
  });
});
