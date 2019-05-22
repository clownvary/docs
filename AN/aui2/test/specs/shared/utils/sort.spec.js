import objArrSort from 'shared/utils/sort';

describe('shared/utils/sort', () => {
  test('objArrSort method should work fine', () => {
    const obj = [{
      name: 'monkey'
    },{
      name: 'dog'
    },{
      name: 'dog'
    },{
      name: 'dog1'
    },{
      name: 1
    },{
      name: 2
    }];
    const result = objArrSort(obj, 'name');
    expect(result).toEqual([
      { name: 'dog' },
      { name: 'dog' },
      { name: 'dog1' },
      { name: 'monkey' },
      { name: 1 },
      { name: 2 }
    ]);
  });
});
