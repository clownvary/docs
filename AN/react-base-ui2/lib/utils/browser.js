'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.

getOS = getOS;exports.





















getBrowser = getBrowser;exports.





























isAndroid = isAndroid;exports.




isIos = isIos;exports.




isTablet = isTablet;exports.




isMobile = isMobile;exports.




isEdge = isEdge;exports.



isIE = isIE;var _consts = require('../consts');function getOS() {var platform = navigator.platform;if (['Win32', 'Windows'].indexOf(platform) > -1) {return _consts.OS.Window;}if (['Mac68K', 'MacPPC', 'Macintosh', 'MacIntel'].indexOf(platform) > -1) {return _consts.OS.MAC;}if (platform === 'X11') {return _consts.OS.UNIX;}if (String(navigator.platform).indexOf('Linux') > -1) {return _consts.OS.LINUX;}return _consts.OS.OTHER;}function getBrowser() {var agent = navigator.userAgent || navigator.vendor || window.opera;if (/msie/gi.test(agent) || /Trident.*rv:11\./gi.test(agent)) {return _consts.Browser.IE;}if (/edge/gi.test(agent)) {return _consts.Browser.EDGE;}if (/firefox/gi.test(agent)) {return _consts.Browser.FIREFOX;}if (/chrome/gi.test(agent)) {return _consts.Browser.CHROME;}if (/opera/gi.test(agent)) {return _consts.Browser.OPERA;}if (/safari/gi.test(agent)) {return _consts.Browser.SAFARI;}return _consts.Browser.OTHER;}function isAndroid() {var userAgent = navigator.userAgent || navigator.vendor || window.opera;return (/android/i.test(userAgent));}function isIos() {var userAgent = navigator.userAgent || navigator.vendor || window.opera;return (/iPhone|iPod|iPad/i.test(userAgent));}function isTablet() {var userAgent = navigator.userAgent || navigator.vendor || window.opera;return (/tablet/i.test(userAgent));}function isMobile() {var userAgent = navigator.userAgent || navigator.vendor || window.opera;return (/Android|webOS|iPhone|iPod|BlackBerry/i.test(userAgent));}function isEdge() {return getBrowser() === _consts.Browser.EDGE;}function isIE() {
  return getBrowser() === _consts.Browser.IE;
}exports.default =

{
  os: getOS(),
  browser: getBrowser(),
  android: isAndroid(),
  tablet: isTablet(),
  mobile: isMobile() };