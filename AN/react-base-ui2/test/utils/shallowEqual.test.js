import shallowEqual from 'src/utils/shallowEqual';

describe('utils/shallowEqual', () => {
  it('shallowEqual should work fine', () => {
    const objA = { name: 'test', key: 'test key' };
    const objB = { name: 'test', key: 'test key' };
    const objC = objA;
    const objD = { name: 'test', key: 'test key', key2: 'test key2' };

    expect(shallowEqual(objA, objB)).toBeTruthy();
    expect(shallowEqual(objA, objC)).toBeTruthy();
    expect(shallowEqual(null, objC)).toBeFalsy();
    expect(shallowEqual(null, null)).toBeTruthy();
    expect(shallowEqual(objA, null)).toBeFalsy();
    expect(shallowEqual('objA', objB)).toBeFalsy();
    expect(shallowEqual(objA, 'objB')).toBeFalsy();
    expect(shallowEqual(objA, objD)).toBeFalsy();
  });
});
