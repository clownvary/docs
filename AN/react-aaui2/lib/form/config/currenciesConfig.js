'use strict';

exports.__esModule = true;
exports.RMB = exports.XPF = exports.XAF = exports.VUV = exports.VND = exports.UYI = exports.UGX = exports.RWF = exports.PYG = exports.KRW = exports.KMF = exports.ISK = exports.GNF = exports.DJF = exports.CVE = exports.CLP = exports.CLF = exports.BYR = exports.BIF = exports.THB = exports.TWD = exports.CHF = exports.SEK = exports.LKR = exports.ZAR = exports.SGD = exports.PHP = exports.PLN = exports.PAB = exports.NOK = exports.MXN = exports.MYR = exports.JPY = exports.IDR = exports.HKD = exports.DKK = exports.BRL = exports.GBP = exports.NZD = exports.CNY = exports.EUR = exports.AUD = exports.CAD = exports.USD = undefined;

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var locales = ['en_US', 'en_CA', 'en_AU', 'es_ES', 'zh_CN', 'en_NZ', 'en_GB', 'de_DE', 'de_AT', 'fr_FR', 'it_IT', 'fr_BE', 'pt_PT', 'pt_BR', 'es_CL', 'da_DK', 'id_ID', 'en_IE', 'ja_JP', 'nl_BE', 'nl_NL', 'es_MX', 'ms_MY', 'no_NO', 'en_PH', 'es_PR', 'en_SG', 'zh_SG', 'en_ZA', 'sv_SE', 'de_CH', 'fr_CH', 'it_CH', 'fr_CA', 'es_PA', 'th_TH', 'zh_TW', 'zh_HK', 'si_LK'];

var DEFAULT_TEMPLATE = '{symbol} {negative}{amount}';
var DEFAULT_FORMAT_CONFIG = {
  integerOnly: false,
  separationCount: 3,
  separator: ',',
  negativeMark: '-'
};

var getTemplate = function getTemplate(code, config, locale) {
  var symbol = config[locale] && config[locale].symbol || code.toUpperCase();
  var template = config[locale] && config[locale].template || DEFAULT_TEMPLATE;

  return template.replace('{symbol}', symbol);
};

var createCurrency = function createCurrency(code) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var formatConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_FORMAT_CONFIG;
  return {
    localizeConfig: locales.reduce(function (acc, locale) {
      var _extends2;

      return (0, _extends4.default)({}, acc, (_extends2 = {}, _extends2[locale] = getTemplate(code, config, locale), _extends2));
    }, {}),
    formatConfig: formatConfig,
    getLocalizeTemplate: function getLocalizeTemplate(locale) {
      return getTemplate(code, config, locale);
    }
  };
};

var USD = createCurrency('USD', {
  en_US: { symbol: '$', template: '{negative}{symbol}{amount}' }
});

var CAD = createCurrency('CAD', {
  en_US: { template: '{negative}{symbol} {amount}' },
  en_CA: { symbol: '$', template: '{negative}{symbol} {amount}' },
  fr_CA: { symbol: '$' }
});
var AUD = createCurrency('AUD', { en_AU: { symbol: '$' } });
var EUR = createCurrency('EUR');
var CNY = createCurrency('CNY', { zh_CN: { symbol: '¥' } }); // Enhanced
var NZD = createCurrency('NZD');
var GBP = createCurrency('GBP', { en_GB: { symbol: '£' } });
var BRL = createCurrency('BRL');
// const CLP = createCurrency('CLP') // Duplicate
var DKK = createCurrency('DKK'); // Enhanced?
var HKD = createCurrency('HKD');
var IDR = createCurrency('IDR');
var JPY = createCurrency('JPY', {}, (0, _extends4.default)({}, DEFAULT_FORMAT_CONFIG, { integerOnly: true }));
var MYR = createCurrency('MYR');
var MXN = createCurrency('MXN');
var NOK = createCurrency('NOK');
var PAB = createCurrency('PAB');
var PLN = createCurrency('PLN');
var PHP = createCurrency('PHP');
var SGD = createCurrency('SGD');
var ZAR = createCurrency('ZAR');
var LKR = createCurrency('LKR');
var SEK = createCurrency('SEK');
var CHF = createCurrency('CHF');
var TWD = createCurrency('TWD');
var THB = createCurrency('THB');
var BIF = createCurrency('BIF', {}, (0, _extends4.default)({}, DEFAULT_FORMAT_CONFIG, { integerOnly: true }));
var BYR = createCurrency('BYR', {}, (0, _extends4.default)({}, DEFAULT_FORMAT_CONFIG, { integerOnly: true }));
var CLF = createCurrency('CLF', {}, (0, _extends4.default)({}, DEFAULT_FORMAT_CONFIG, { integerOnly: true }));
var CLP = createCurrency('CLP', {}, (0, _extends4.default)({}, DEFAULT_FORMAT_CONFIG, { integerOnly: true }));
var CVE = createCurrency('CVE', {}, (0, _extends4.default)({}, DEFAULT_FORMAT_CONFIG, { integerOnly: true }));
var DJF = createCurrency('DJF', {}, (0, _extends4.default)({}, DEFAULT_FORMAT_CONFIG, { integerOnly: true }));
var GNF = createCurrency('GNF', {}, (0, _extends4.default)({}, DEFAULT_FORMAT_CONFIG, { integerOnly: true }));
var ISK = createCurrency('ISK', {}, (0, _extends4.default)({}, DEFAULT_FORMAT_CONFIG, { integerOnly: true }));
var KMF = createCurrency('KMF', {}, (0, _extends4.default)({}, DEFAULT_FORMAT_CONFIG, { integerOnly: true }));
var KRW = createCurrency('KRW', {}, (0, _extends4.default)({}, DEFAULT_FORMAT_CONFIG, { integerOnly: true }));
var PYG = createCurrency('PYG', {}, (0, _extends4.default)({}, DEFAULT_FORMAT_CONFIG, { integerOnly: true }));
var RWF = createCurrency('RWF', {}, (0, _extends4.default)({}, DEFAULT_FORMAT_CONFIG, { integerOnly: true }));
var UGX = createCurrency('UGX');
var UYI = createCurrency('UYI', {}, (0, _extends4.default)({}, DEFAULT_FORMAT_CONFIG, { integerOnly: true }));
var VND = createCurrency('VND');
var VUV = createCurrency('VUV', {}, (0, _extends4.default)({}, DEFAULT_FORMAT_CONFIG, { integerOnly: true }));
var XAF = createCurrency('XAF', {}, (0, _extends4.default)({}, DEFAULT_FORMAT_CONFIG, { integerOnly: true }));
var XPF = createCurrency('XPF', {}, (0, _extends4.default)({}, DEFAULT_FORMAT_CONFIG, { integerOnly: true }));
var RMB = createCurrency('RMB', { zh_CN: { symbol: '¥' } }); // Enhanced, is same to CNY?

exports.USD = USD;
exports.CAD = CAD;
exports.AUD = AUD;
exports.EUR = EUR;
exports.CNY = CNY;
exports.NZD = NZD;
exports.GBP = GBP;
exports.BRL = BRL;
exports.DKK = DKK;
exports.HKD = HKD;
exports.IDR = IDR;
exports.JPY = JPY;
exports.MYR = MYR;
exports.MXN = MXN;
exports.NOK = NOK;
exports.PAB = PAB;
exports.PLN = PLN;
exports.PHP = PHP;
exports.SGD = SGD;
exports.ZAR = ZAR;
exports.LKR = LKR;
exports.SEK = SEK;
exports.CHF = CHF;
exports.TWD = TWD;
exports.THB = THB;
exports.BIF = BIF;
exports.BYR = BYR;
exports.CLF = CLF;
exports.CLP = CLP;
exports.CVE = CVE;
exports.DJF = DJF;
exports.GNF = GNF;
exports.ISK = ISK;
exports.KMF = KMF;
exports.KRW = KRW;
exports.PYG = PYG;
exports.RWF = RWF;
exports.UGX = UGX;
exports.UYI = UYI;
exports.VND = VND;
exports.VUV = VUV;
exports.XAF = XAF;
exports.XPF = XPF;
exports.RMB = RMB;