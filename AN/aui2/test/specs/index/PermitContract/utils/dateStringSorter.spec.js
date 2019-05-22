import dateStringSorter from 'index/PermitContract/utils/dateStringSorter';

it('method dateStringSorter should work fine', () => {
  const original = [
    { value: '09 Jul 2017' },
    { value: '31 Jul 2017' },
    { value: '--' },
    { value: '01 Aug 2017' },
    { value: '1 Aug 2017' },
    { value: '01 Aug 2016' },
    { value: 'not a real date'}
  ];
  const expectResult = [
    { value: '--' },
    { value: 'not a real date'},
    { value: '01 Aug 2016' },
    { value: '09 Jul 2017' },
    { value: '31 Jul 2017' },
    { value: '01 Aug 2017' },
    { value: '1 Aug 2017' }
  ];
  expect(expectResult).toEqual(original.sort(dateStringSorter('DD MMM YYYY')));
});
