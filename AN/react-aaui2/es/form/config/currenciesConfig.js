import _extends from 'babel-runtime/helpers/extends';
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

      return _extends({}, acc, (_extends2 = {}, _extends2[locale] = getTemplate(code, config, locale), _extends2));
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
var JPY = createCurrency('JPY', {}, _extends({}, DEFAULT_FORMAT_CONFIG, { integerOnly: true }));
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
var BIF = createCurrency('BIF', {}, _extends({}, DEFAULT_FORMAT_CONFIG, { integerOnly: true }));
var BYR = createCurrency('BYR', {}, _extends({}, DEFAULT_FORMAT_CONFIG, { integerOnly: true }));
var CLF = createCurrency('CLF', {}, _extends({}, DEFAULT_FORMAT_CONFIG, { integerOnly: true }));
var CLP = createCurrency('CLP', {}, _extends({}, DEFAULT_FORMAT_CONFIG, { integerOnly: true }));
var CVE = createCurrency('CVE', {}, _extends({}, DEFAULT_FORMAT_CONFIG, { integerOnly: true }));
var DJF = createCurrency('DJF', {}, _extends({}, DEFAULT_FORMAT_CONFIG, { integerOnly: true }));
var GNF = createCurrency('GNF', {}, _extends({}, DEFAULT_FORMAT_CONFIG, { integerOnly: true }));
var ISK = createCurrency('ISK', {}, _extends({}, DEFAULT_FORMAT_CONFIG, { integerOnly: true }));
var KMF = createCurrency('KMF', {}, _extends({}, DEFAULT_FORMAT_CONFIG, { integerOnly: true }));
var KRW = createCurrency('KRW', {}, _extends({}, DEFAULT_FORMAT_CONFIG, { integerOnly: true }));
var PYG = createCurrency('PYG', {}, _extends({}, DEFAULT_FORMAT_CONFIG, { integerOnly: true }));
var RWF = createCurrency('RWF', {}, _extends({}, DEFAULT_FORMAT_CONFIG, { integerOnly: true }));
var UGX = createCurrency('UGX');
var UYI = createCurrency('UYI', {}, _extends({}, DEFAULT_FORMAT_CONFIG, { integerOnly: true }));
var VND = createCurrency('VND');
var VUV = createCurrency('VUV', {}, _extends({}, DEFAULT_FORMAT_CONFIG, { integerOnly: true }));
var XAF = createCurrency('XAF', {}, _extends({}, DEFAULT_FORMAT_CONFIG, { integerOnly: true }));
var XPF = createCurrency('XPF', {}, _extends({}, DEFAULT_FORMAT_CONFIG, { integerOnly: true }));
var RMB = createCurrency('RMB', { zh_CN: { symbol: '¥' } }); // Enhanced, is same to CNY?

export { USD, CAD, AUD, EUR, CNY, NZD, GBP, BRL, DKK, HKD, IDR, JPY, MYR, MXN, NOK, PAB, PLN, PHP, SGD, ZAR, LKR, SEK, CHF, TWD, THB, BIF, BYR, CLF, CLP, CVE, DJF, GNF, ISK, KMF, KRW, PYG, RWF, UGX, UYI, VND, VUV, XAF, XPF, RMB };