import filterValidCustomProps from 'src/utils/filterValidCustomProps';
import omit from 'lodash/omit';

describe('utils/filterValidCustomProps', () => {
  it('filterValidCustomProps should work fine', () => {
    const obj = {
      'data-name': 'test',
      required: 'test key1',
      'aria-name': 'test key2',
      name: 'test key2'

    };
    expect(filterValidCustomProps(obj)).toEqual(omit(obj, 'name'));
    expect(filterValidCustomProps(obj, /^[^-]\w+$/)).toEqual(omit(obj, ['data-name', 'aria-name']));
  });
});
