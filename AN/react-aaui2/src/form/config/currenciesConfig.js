const locales = [
  'en_US',
  'en_CA',
  'en_AU',
  'es_ES',
  'zh_CN',
  'en_NZ',
  'en_GB',
  'de_DE',
  'de_AT',
  'fr_FR',
  'it_IT',
  'fr_BE',
  'pt_PT',
  'pt_BR',
  'es_CL',
  'da_DK',
  'id_ID',
  'en_IE',
  'ja_JP',
  'nl_BE',
  'nl_NL',
  'es_MX',
  'ms_MY',
  'no_NO',
  'en_PH',
  'es_PR',
  'en_SG',
  'zh_SG',
  'en_ZA',
  'sv_SE',
  'de_CH',
  'fr_CH',
  'it_CH',
  'fr_CA',
  'es_PA',
  'th_TH',
  'zh_TW',
  'zh_HK',
  'si_LK',
]

const DEFAULT_TEMPLATE = '{symbol} {negative}{amount}'
const DEFAULT_FORMAT_CONFIG = {
  integerOnly: false,
  separationCount: 3,
  separator: ',',
  negativeMark: '-',
}

const getTemplate = (code, config, locale) => {
  const symbol = (config[locale] && config[locale].symbol) || code.toUpperCase()
  const template =
    (config[locale] && config[locale].template) || DEFAULT_TEMPLATE

  return template.replace('{symbol}', symbol)
}

const createCurrency = (
  code,
  config = {},
  formatConfig = DEFAULT_FORMAT_CONFIG,
) => ({
  localizeConfig: locales.reduce(
    (acc, locale) => ({
      ...acc,
      [locale]: getTemplate(code, config, locale),
    }),
    {},
  ),
  formatConfig,
  getLocalizeTemplate(locale) {
    return getTemplate(code, config, locale)
  },
})

const USD = createCurrency('USD', {
  en_US: { symbol: '$', template: '{negative}{symbol}{amount}' },
})

const CAD = createCurrency('CAD', {
  en_US: { template: '{negative}{symbol} {amount}' },
  en_CA: { symbol: '$', template: '{negative}{symbol} {amount}' },
  fr_CA: { symbol: '$' },
})
const AUD = createCurrency('AUD', { en_AU: { symbol: '$' } })
const EUR = createCurrency('EUR')
const CNY = createCurrency('CNY', { zh_CN: { symbol: '¥' } }) // Enhanced
const NZD = createCurrency('NZD')
const GBP = createCurrency('GBP', { en_GB: { symbol: '£' } })
const BRL = createCurrency('BRL')
// const CLP = createCurrency('CLP') // Duplicate
const DKK = createCurrency('DKK') // Enhanced?
const HKD = createCurrency('HKD')
const IDR = createCurrency('IDR')
const JPY = createCurrency(
  'JPY',
  {},
  { ...DEFAULT_FORMAT_CONFIG, integerOnly: true },
)
const MYR = createCurrency('MYR')
const MXN = createCurrency('MXN')
const NOK = createCurrency('NOK')
const PAB = createCurrency('PAB')
const PLN = createCurrency('PLN')
const PHP = createCurrency('PHP')
const SGD = createCurrency('SGD')
const ZAR = createCurrency('ZAR')
const LKR = createCurrency('LKR')
const SEK = createCurrency('SEK')
const CHF = createCurrency('CHF')
const TWD = createCurrency('TWD')
const THB = createCurrency('THB')
const BIF = createCurrency(
  'BIF',
  {},
  { ...DEFAULT_FORMAT_CONFIG, integerOnly: true },
)
const BYR = createCurrency(
  'BYR',
  {},
  { ...DEFAULT_FORMAT_CONFIG, integerOnly: true },
)
const CLF = createCurrency(
  'CLF',
  {},
  { ...DEFAULT_FORMAT_CONFIG, integerOnly: true },
)
const CLP = createCurrency(
  'CLP',
  {},
  { ...DEFAULT_FORMAT_CONFIG, integerOnly: true },
)
const CVE = createCurrency(
  'CVE',
  {},
  { ...DEFAULT_FORMAT_CONFIG, integerOnly: true },
)
const DJF = createCurrency(
  'DJF',
  {},
  { ...DEFAULT_FORMAT_CONFIG, integerOnly: true },
)
const GNF = createCurrency(
  'GNF',
  {},
  { ...DEFAULT_FORMAT_CONFIG, integerOnly: true },
)
const ISK = createCurrency(
  'ISK',
  {},
  { ...DEFAULT_FORMAT_CONFIG, integerOnly: true },
)
const KMF = createCurrency(
  'KMF',
  {},
  { ...DEFAULT_FORMAT_CONFIG, integerOnly: true },
)
const KRW = createCurrency(
  'KRW',
  {},
  { ...DEFAULT_FORMAT_CONFIG, integerOnly: true },
)
const PYG = createCurrency(
  'PYG',
  {},
  { ...DEFAULT_FORMAT_CONFIG, integerOnly: true },
)
const RWF = createCurrency(
  'RWF',
  {},
  { ...DEFAULT_FORMAT_CONFIG, integerOnly: true },
)
const UGX = createCurrency('UGX')
const UYI = createCurrency(
  'UYI',
  {},
  { ...DEFAULT_FORMAT_CONFIG, integerOnly: true },
)
const VND = createCurrency('VND')
const VUV = createCurrency(
  'VUV',
  {},
  { ...DEFAULT_FORMAT_CONFIG, integerOnly: true },
)
const XAF = createCurrency(
  'XAF',
  {},
  { ...DEFAULT_FORMAT_CONFIG, integerOnly: true },
)
const XPF = createCurrency(
  'XPF',
  {},
  { ...DEFAULT_FORMAT_CONFIG, integerOnly: true },
)
const RMB = createCurrency('RMB', { zh_CN: { symbol: '¥' } }) // Enhanced, is same to CNY?

export {
  USD,
  CAD,
  AUD,
  EUR,
  CNY,
  NZD,
  GBP,
  BRL,
  DKK,
  HKD,
  IDR,
  JPY,
  MYR,
  MXN,
  NOK,
  PAB,
  PLN,
  PHP,
  SGD,
  ZAR,
  LKR,
  SEK,
  CHF,
  TWD,
  THB,
  BIF,
  BYR,
  CLF,
  CLP,
  CVE,
  DJF,
  GNF,
  ISK,
  KMF,
  KRW,
  PYG,
  RWF,
  UGX,
  UYI,
  VND,
  VUV,
  XAF,
  XPF,
  RMB,
}
