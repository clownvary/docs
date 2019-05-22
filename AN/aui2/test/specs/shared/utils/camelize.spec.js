import camelize from 'shared/utils/camelize';

describe('shared/utils/camelize', () => {
  test('camelize method should work fine, if param is a String', () => {
    const obj = 'English';
    const result = camelize(obj);
    expect(result).toEqual(obj);
  });

  test('camelize method should work fine, if param is a Array', () => {
    const obj = ['English', 'Chinese'];
    const result = camelize(obj);
    expect(result).toEqual(obj);
  });

  test('camelize method should work fine, if param is a Object', () => {
    const obj = {
      'name_a': 'Nana',
      age: 30
    };
    const result = camelize(obj);
    expect(result).toEqual({ nameA: 'Nana', age: 30 });
  });
});
