import getDynamicUrl from 'shared/utils/getDynamicUrl';

describe('shared/utils/getDynamicUrl', () => {
  test('getDynamicUrl method should work fine', () => {
    const url = '{1}';
    const urlParams = [{
      1: 'monkey'
    }, {
      2: 'dog'
    }];
    const result = getDynamicUrl(url, urlParams);
    expect(result).toBeTruthy();
  });

  test('getDynamicUrl method should work fine, if urlParams is a null', () => {
    const url = '';
    const urlParams = null;
    const result = getDynamicUrl(url, urlParams);
    expect(result).toEqual(url);
  });
});
