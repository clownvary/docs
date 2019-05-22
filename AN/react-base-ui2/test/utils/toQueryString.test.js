import toQueryString from 'src/utils/toQueryString';

describe('utils/toQueryString', () => {
  it('toQueryString should work fine', () => {
    const objA = { name: 'test', key: 'test key', key2: 'test key2' };
    const objB = { name: 'test', key: ['test key', 'test key2'] };
    expect(toQueryString('test')).toEqual('test');
    expect(toQueryString(objA)).toEqual('name=test&key=test%20key&key2=test%20key2');
    expect(toQueryString(objB)).toEqual('name=test&key=%5B%22test%20key%22%2C%22test%20key2%22%5D');
  });
});
