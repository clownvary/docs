import filterBy from 'src/utils/filterBy';

describe('utils/filterBy', () => {
  it('filterBy should work fine', () => {
    const obj = {
      name: 'test',
      key1: 'test key1',
      key2: 'test key2'
    };
    expect(filterBy(obj, 'key1')).toEqual({ key1: 'test key1' });
    expect(filterBy(obj, '')).toEqual(obj);
  });
});
