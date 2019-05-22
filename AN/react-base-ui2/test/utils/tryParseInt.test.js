import tryParseInt from 'src/utils/tryParseInt';

it('utils -> tryParseInt', () => {
  const value1 = NaN;
  const value2 = null;
  const value3 = '-3333asdfsdf';
  const value4 = 'ddd';
  const value5 = '11ddd';
  const value6 = '0';

  expect(tryParseInt(value1)).toEqual(0);
  expect(tryParseInt(value2, 30)).toEqual(30);
  expect(tryParseInt(value3)).toEqual(-3333);
  expect(tryParseInt(value4, 10)).toEqual(10);
  expect(tryParseInt(value5)).toEqual(11);
  expect(tryParseInt(value6, 8)).toEqual(0);
});
