import serializeData from 'shared/utils/serialize';

describe('shared/utils/serialize', () => {
  test('serializeData method should work fine', () => {
    const data = {
      name: 'monkey',
      food: ['apple', 'banana']
    };
    const result = serializeData(data);
    expect(result).toEqual('name=monkey&food=%5B%22apple%22%2C%22banana%22%5D');
  });

  test('serializeData method should work fine, if data is Array', () => {
    const data = ['monkey', 'dog'];
    const result = serializeData(data);
    expect(result).toEqual(['monkey', 'dog']);
  });
});
