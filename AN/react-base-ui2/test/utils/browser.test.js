import { getOS, getBrowser, isAndroid, isIos, isTablet, isMobile, isEdge } from 'src/utils/browser';
import { OS, Browser } from 'src/consts';

function startMock(obj, property) {
  const originValue = obj[property];
  Object.defineProperty(obj, property, ((_value) => {
    return {
      get: function _get() {
        return _value;
      },
      set: function _set(v) {
        _value = v;
      },
      configurable: true
    };
  })(obj[property]));
  return originValue;
}

function endMock(obj, property, value) {
  obj[property] = value;
}
describe('utils/browser', () => {
  it('getOS should work fine', () => {
    const temp = startMock(navigator, 'platform');
    navigator.platform = 'Win32';
    expect(getOS()).toEqual(OS.Window);
    navigator.platform = 'Windows';
    expect(getOS()).toEqual(OS.Window);

    navigator.platform = 'Mac68K';
    expect(getOS()).toEqual(OS.MAC);
    navigator.platform = 'MacPPC';
    expect(getOS()).toEqual(OS.MAC);
    navigator.platform = 'Macintosh';
    expect(getOS()).toEqual(OS.MAC);
    navigator.platform = 'Macintosh';
    expect(getOS()).toEqual(OS.MAC);

    navigator.platform = 'X11';
    expect(getOS()).toEqual(OS.UNIX);

    navigator.platform = 'Linux';
    expect(getOS()).toEqual(OS.LINUX);
    navigator.platform = 'xxxLinuxxxx';
    expect(getOS()).toEqual(OS.LINUX);

    endMock(navigator, 'platform', temp);
  });

  it('getBrowser should work fine', () => {
    const temp = startMock(navigator, 'userAgent');
    navigator.userAgent = 'msie';
    expect(getBrowser()).toEqual(Browser.IE);
    navigator.userAgent = 'xxxmsiexxx';
    expect(getBrowser()).toEqual(Browser.IE);
    navigator.userAgent = 'xxxxTrident.srv:11.s2xcd';
    expect(getBrowser()).toEqual(Browser.IE);

    navigator.userAgent = 'edge';
    expect(getBrowser()).toEqual(Browser.EDGE);
    navigator.userAgent = '12edgexs';
    expect(getBrowser()).toEqual(Browser.EDGE);

    navigator.userAgent = 'firefox';
    expect(getBrowser()).toEqual(Browser.FIREFOX);
    navigator.userAgent = '12firefoxxs';
    expect(getBrowser()).toEqual(Browser.FIREFOX);

    navigator.userAgent = 'chrome';
    expect(getBrowser()).toEqual(Browser.CHROME);
    navigator.userAgent = '12chromexs';
    expect(getBrowser()).toEqual(Browser.CHROME);

    navigator.userAgent = 'opera';
    expect(getBrowser()).toEqual(Browser.OPERA);
    navigator.userAgent = '12coperaxs';
    expect(getBrowser()).toEqual(Browser.OPERA);

    navigator.userAgent = 'safari';
    expect(getBrowser()).toEqual(Browser.SAFARI);
    navigator.userAgent = '\x12safariaxs';
    expect(getBrowser()).toEqual(Browser.SAFARI);

    navigator.userAgent = 'safxari';
    expect(getBrowser()).toEqual(Browser.OTHER);
    navigator.userAgent = '12sa12fariaxs';
    expect(getBrowser()).toEqual(Browser.OTHER);
    navigator.userAgent = '12saxxchrom1e2fariaxs';
    expect(getBrowser()).toEqual(Browser.OTHER);

    endMock(navigator, 'userAgent', temp);
  });

  it('isAndroid should work fine', () => {
    const tempAgent = startMock(navigator, 'userAgent');
    const tempVendor = startMock(navigator, 'vendor');
    const tempOpera = startMock(window, 'opera');

    navigator.userAgent = 'android';
    expect(isAndroid()).toBeTruthy();
    navigator.userAgent = 'xxxxandroid12';
    expect(isAndroid()).toBeTruthy();
    navigator.userAgent = 'androixd';
    expect(isAndroid()).toBeFalsy();

    navigator.userAgent = null;
    navigator.vendor = 'android';
    expect(isAndroid()).toBeTruthy();
    navigator.vendor = 'xxxxandroid12';
    expect(isAndroid()).toBeTruthy();
    navigator.vendor = 'androixd';
    expect(isAndroid()).toBeFalsy();

    navigator.vendor = null;
    window.opera = 'android';
    expect(isAndroid()).toBeTruthy();
    window.opera = 'xxxxandroid12';
    expect(isAndroid()).toBeTruthy();
    window.opera = 'androixd';
    expect(isAndroid()).toBeFalsy();

    endMock(navigator, 'userAgent', tempAgent);
    endMock(navigator, 'vendor', tempVendor);
    endMock(window, 'opera', tempOpera);
  });

  it('isIos should work fine', () => {
    const tempAgent = startMock(navigator, 'userAgent');
    const tempVendor = startMock(navigator, 'vendor');
    const tempOpera = startMock(window, 'opera');

    navigator.userAgent = 'iPhone';
    expect(isIos()).toBeTruthy();
    navigator.userAgent = 'xxxxiPhone12';
    expect(isIos()).toBeTruthy();
    navigator.userAgent = 'ipad';
    expect(isIos()).toBeTruthy();
    navigator.userAgent = '1xcIpad00';
    expect(isIos()).toBeTruthy();
    navigator.userAgent = 'ipod';
    expect(isIos()).toBeTruthy();
    navigator.userAgent = '1xcIpod00';
    expect(isIos()).toBeTruthy();
    navigator.userAgent = 'ipoxd';
    expect(isIos()).toBeFalsy();

    navigator.userAgent = null;
    navigator.vendor = 'xxxxiPhone12';
    expect(isIos()).toBeTruthy();
    navigator.vendor = 'ipad';
    expect(isIos()).toBeTruthy();
    navigator.vendor = '1xcIpad00';
    expect(isIos()).toBeTruthy();
    navigator.vendor = 'ipod';
    expect(isIos()).toBeTruthy();
    navigator.vendor = '1xcIpod00';
    expect(isIos()).toBeTruthy();
    navigator.vendor = 'ipoxd';
    expect(isIos()).toBeFalsy();

    navigator.vendor = null;
    window.opera = 'xxxxiPhone12';
    expect(isIos()).toBeTruthy();
    window.opera = 'ipad';
    expect(isIos()).toBeTruthy();
    window.opera = '1xcIpad00';
    expect(isIos()).toBeTruthy();
    window.opera = 'ipod';
    expect(isIos()).toBeTruthy();
    window.opera = '1xcIpod00';
    expect(isIos()).toBeTruthy();
    window.opera = 'ipoxd';
    expect(isIos()).toBeFalsy();

    endMock(navigator, 'userAgent', tempAgent);
    endMock(navigator, 'vendor', tempVendor);
    endMock(window, 'opera', tempOpera);
  });

  it('isTablet should work fine', () => {
    const tempAgent = startMock(navigator, 'userAgent');
    const tempVendor = startMock(navigator, 'vendor');
    const tempOpera = startMock(window, 'opera');

    navigator.userAgent = 'tablet';
    expect(isTablet()).toBeTruthy();
    navigator.userAgent = 'xxxxtablet12';
    expect(isTablet()).toBeTruthy();
    navigator.userAgent = 'androixd';
    expect(isTablet()).toBeFalsy();

    navigator.userAgent = null;
    navigator.vendor = 'tablet';
    expect(isTablet()).toBeTruthy();
    navigator.vendor = 'xxxxtablet12';
    expect(isTablet()).toBeTruthy();
    navigator.vendor = 'androixd';
    expect(isTablet()).toBeFalsy();

    navigator.vendor = null;
    window.opera = 'tablet';
    expect(isTablet()).toBeTruthy();
    window.opera = 'xxxxtablet12';
    expect(isTablet()).toBeTruthy();
    window.opera = 'androixd';
    expect(isTablet()).toBeFalsy();

    endMock(navigator, 'userAgent', tempAgent);
    endMock(navigator, 'vendor', tempVendor);
    endMock(window, 'opera', tempOpera);
  });

  it('isMobile should work fine', () => {
    const tempAgent = startMock(navigator, 'userAgent');
    const tempVendor = startMock(navigator, 'vendor');
    const tempOpera = startMock(window, 'opera');

    navigator.userAgent = 'iPhone';
    expect(isMobile()).toBeTruthy();
    navigator.userAgent = 'xxxxiPhone12';
    expect(isMobile()).toBeTruthy();
    navigator.userAgent = 'Android';
    expect(isMobile()).toBeTruthy();
    navigator.userAgent = 'xxxxAndroid12';
    expect(isMobile()).toBeTruthy();
    navigator.userAgent = 'webos';
    expect(isMobile()).toBeTruthy();
    navigator.userAgent = '1xcwebos00';
    expect(isMobile()).toBeTruthy();
    navigator.userAgent = 'ipod';
    expect(isMobile()).toBeTruthy();
    navigator.userAgent = '1xcIpod00';
    expect(isMobile()).toBeTruthy();
    navigator.userAgent = 'BlackBerry';
    expect(isMobile()).toBeTruthy();
    navigator.userAgent = 'xxBlackBerry12';
    expect(isMobile()).toBeTruthy();
    navigator.userAgent = 'BlackB1erry';
    expect(isMobile()).toBeFalsy();

    navigator.userAgent = null;
    navigator.vendor = 'iPhone';
    expect(isMobile()).toBeTruthy();
    navigator.vendor = 'xxxxiPhone12';
    expect(isMobile()).toBeTruthy();
    navigator.vendor = 'Android';
    expect(isMobile()).toBeTruthy();
    navigator.vendor = 'xxxxAndroid12';
    expect(isMobile()).toBeTruthy();
    navigator.vendor = 'webos';
    expect(isMobile()).toBeTruthy();
    navigator.vendor = '1xcwebos00';
    expect(isMobile()).toBeTruthy();
    navigator.vendor = 'ipod';
    expect(isMobile()).toBeTruthy();
    navigator.vendor = '1xcIpod00';
    expect(isMobile()).toBeTruthy();
    navigator.vendor = 'BlackBerry';
    expect(isMobile()).toBeTruthy();
    navigator.vendor = 'xxBlackBerry12';
    expect(isMobile()).toBeTruthy();
    navigator.vendor = 'BlackB1erry';
    expect(isMobile()).toBeFalsy();

    navigator.vendor = null;
    window.opera = 'iPhone';
    expect(isMobile()).toBeTruthy();
    window.opera = 'xxxxiPhone12';
    expect(isMobile()).toBeTruthy();
    window.opera = 'Android';
    expect(isMobile()).toBeTruthy();
    window.opera = 'xxxxAndroid12';
    expect(isMobile()).toBeTruthy();
    window.opera = 'webos';
    expect(isMobile()).toBeTruthy();
    window.opera = '1xcwebos00';
    expect(isMobile()).toBeTruthy();
    window.opera = 'ipod';
    expect(isMobile()).toBeTruthy();
    window.opera = '1xcIpod00';
    expect(isMobile()).toBeTruthy();
    window.opera = 'BlackBerry';
    expect(isMobile()).toBeTruthy();
    window.opera = 'xxBlackBerry12';
    expect(isMobile()).toBeTruthy();
    window.opera = 'BlackB1erry';
    expect(isMobile()).toBeFalsy();
    endMock(navigator, 'userAgent', tempAgent);
    endMock(navigator, 'vendor', tempVendor);
    endMock(window, 'opera', tempOpera);
  });

  it('isEdge should work fine', () => {
    const tempAgent = startMock(navigator, 'userAgent');
    const tempVendor = startMock(navigator, 'vendor');
    const tempOpera = startMock(window, 'opera');

    navigator.userAgent = 'edge';
    expect(isEdge()).toBeTruthy();
    navigator.userAgent = 'xxxxedge12';
    expect(isEdge()).toBeTruthy();
    navigator.userAgent = 'androixd';
    expect(isEdge()).toBeFalsy();

    navigator.userAgent = null;
    navigator.vendor = 'edge';
    expect(isEdge()).toBeTruthy();
    navigator.vendor = 'xxxxedge12';
    expect(isEdge()).toBeTruthy();
    navigator.vendor = 'androixedgde';
    expect(isEdge()).toBeFalsy();

    navigator.vendor = null;
    window.opera = 'edge';
    expect(isEdge()).toBeTruthy();
    window.opera = 'xxxxedge12';
    expect(isEdge()).toBeTruthy();
    window.opera = 'androiedgxed';
    expect(isEdge()).toBeFalsy();

    endMock(navigator, 'userAgent', tempAgent);
    endMock(navigator, 'vendor', tempVendor);
    endMock(window, 'opera', tempOpera);
  });
});
