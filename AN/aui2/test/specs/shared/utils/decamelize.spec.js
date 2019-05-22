import decamelize from 'shared/utils/decamelize';

describe('shared/utils/decamelize', () => {
  test('decamelize method should work fine, if param is a String', () => {
    const obj = 'English';
    const result = decamelize(obj);
    expect(result).toEqual('_english');
  });

  test('decamelize method should work fine, if param is a Array', () => {
    const obj = ['English', 'Chinese'];
    const result = decamelize(obj);
    expect(result).toEqual(obj);
  });

  test('decamelize method should work fine, if param is a Object', () => {
    const obj = {
      classId: 1,
      age: 30
    };
    const result = decamelize(obj);
    expect(result).toEqual({ class_id: 1, age: 30 });
  });
});
