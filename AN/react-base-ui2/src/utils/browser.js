import { OS, Browser } from '../consts';

export function getOS() {
  const platform = navigator.platform;

  if (['Win32', 'Windows'].indexOf(platform) > -1) {
    return OS.Window;
  }

  if (['Mac68K', 'MacPPC', 'Macintosh', 'MacIntel'].indexOf(platform) > -1) {
    return OS.MAC;
  }

  if (platform === 'X11') {
    return OS.UNIX;
  }

  if ((String(navigator.platform).indexOf('Linux') > -1)) {
    return OS.LINUX;
  }

  return OS.OTHER;
}

export function getBrowser() {
  const agent = navigator.userAgent || navigator.vendor || window.opera;

  if (/msie/gi.test(agent) || /Trident.*rv:11\./gi.test(agent)) {
    return Browser.IE;
  }

  if (/edge/gi.test(agent)) {
    return Browser.EDGE;
  }

  if (/firefox/gi.test(agent)) {
    return Browser.FIREFOX;
  }

  if (/chrome/gi.test(agent)) {
    return Browser.CHROME;
  }

  if (/opera/gi.test(agent)) {
    return Browser.OPERA;
  }

  if (/safari/gi.test(agent)) {
    return Browser.SAFARI;
  }

  return Browser.OTHER;
}

export function isAndroid() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return /android/i.test(userAgent);
}

export function isIos() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return /iPhone|iPod|iPad/i.test(userAgent);
}

export function isTablet() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return /tablet/i.test(userAgent);
}

export function isMobile() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return /Android|webOS|iPhone|iPod|BlackBerry/i.test(userAgent);
}

export function isEdge() {
  return getBrowser() === Browser.EDGE;
}

export function isIE() {
  return getBrowser() === Browser.IE;
}

export default {
  os: getOS(),
  browser: getBrowser(),
  android: isAndroid(),
  tablet: isTablet(),
  mobile: isMobile()
};
