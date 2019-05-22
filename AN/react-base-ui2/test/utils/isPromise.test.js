import isPromise from 'src/utils/isPromise';

describe('utils/isPromise', () => {
  it('isPromise should work fine', () => {
    const promise = new Promise((resolve) => {
      resolve('test');
    });
    expect(isPromise(promise)).toBeTruthy();
    expect(isPromise(null)).toBeFalsy();
  });
});
