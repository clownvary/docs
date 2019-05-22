import normalizeKeys from 'src/utils/normalizeKeys';

describe('utils/normalizeKeys', () => {
  it('normalizeKeys should work fine', () => {
    const obj = {
      name: 'test',
      key: 'test key'
    };
    expect(normalizeKeys(obj)).toEqual(obj);
    expect(normalizeKeys([1, 2, 3])).toEqual([1, 2, 3]);
  });
});
