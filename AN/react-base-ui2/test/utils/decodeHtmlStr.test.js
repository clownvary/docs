import decodeHtmlStr from 'src/utils/decodeHtmlStr';

describe('utils/decodeHtmlStr', () => {
  it('decodeHtmlStr works fine', () => {
    const src = '&amp;&lt;&gt;&#39;&quot;&#126;&#096;';
    const dest = '&<>\'"~`';
    expect(decodeHtmlStr(src)).toEqual(dest);

    const blank = String.fromCharCode('160');
    expect(decodeHtmlStr('&nbsp;')).toEqual(blank);

    expect(decodeHtmlStr()).toEqual('');
    expect(decodeHtmlStr(123)).toEqual('123');
  });
});
