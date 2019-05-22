import isFSA from 'src/utils/isFSA';

describe('utils/isFSA', () => {

  it('isFSA should work fine', () => {
    const action = {
      type: 'test_type',
      payload: {
        name: 'test',
        key: 'test key'
      }
    };
    expect(isFSA(action)).toBeTruthy();

    action.type = Symbol('test');
    expect(isFSA(action)).toBeTruthy();

    action.type = 1;
    expect(isFSA(action)).toBeFalsy();
  });
});
