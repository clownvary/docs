import { hookLocaleData } from 'src/services/i18n';

describe('hookLocaleData', () => {
  it('addLocaleData works well when global.IntlPolyfill = null', () => {
    global.IntlPolyfill = null;
    hookLocaleData();
    expect(global.IntlPolyfill).toHaveProperty('__addLocaleData');
    global.IntlPolyfill.__addLocaleData({});
    expect(global.IntlPolyfill.__addLocaleData.__anHooked).toBe(true);
  });

  it('addLocaleData works well when global.IntlPolyfill = {}', () => {
    global.IntlPolyfill = {};
    hookLocaleData();
    expect(global.IntlPolyfill.__addLocaleData).toBeUndefined();
  });

  it('addLocaleData works well when global.IntlPolyfill is not empty object ', () => {
    global.IntlPolyfill = {
      __addLocaleData: () => {}
    };
    hookLocaleData();
    expect(global.IntlPolyfill).toHaveProperty('__addLocaleData');
    global.IntlPolyfill.__addLocaleData({}, '');
    expect(global.IntlPolyfill.__addLocaleData.__anHooked).toBe(true);
  });
});
