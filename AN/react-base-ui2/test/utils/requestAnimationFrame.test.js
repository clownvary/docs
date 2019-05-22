import requestAnimationFrame from 'src/utils/requestAnimationFrame';

describe('utils/requestAnimationFrame', () => {
  it('requestAnimationFrame should work fine', () => {
    jest.useFakeTimers();
    const result = requestAnimationFrame;
    expect(typeof result).toEqual('function');

    const result2 = requestAnimationFrame(() => 'test');
    jest.runAllTimers();
    expect(result2).toEqual(1);
  });
});
