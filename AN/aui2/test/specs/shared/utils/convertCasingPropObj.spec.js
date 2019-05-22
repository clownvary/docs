import convertCasingPropObj from 'shared/utils/convertCasingPropObj';

describe('shared/utils/convertCasingPropObj', () => {
  test('convertCasingPropObj method should work fine, if param is a String', () => {
    const obj = 'English';
    const result = convertCasingPropObj(obj);
    expect(result).toEqual(obj);
  });

  test('convertCasingPropObj method should work fine, if param is a Array', () => {
    const obj = ['English', 'Chinese'];
    const result = convertCasingPropObj(obj);
    expect(result).toEqual(obj);
  });

  test('convertCasingPropObj method should work fine, if param is a Object', () => {
    const obj = {
      'name_a': 'Nana',
      'class_id': 1,
      age: 30
    };
    const result = convertCasingPropObj(obj);
    expect(result).toEqual({ nameA: 'Nana', 'classID': 1, age: 30 });
  });
});
