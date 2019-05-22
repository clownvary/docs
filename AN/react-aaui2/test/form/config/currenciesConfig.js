import * as currenciesConfig from 'form/config/currenciesConfig'

it('should get correct currency config', () => {
  const { getLocalizeTemplate } = currenciesConfig.CNY
  const locale = 'zh_CN'

  expect(getLocalizeTemplate(locale)).toEqual('¥ {negative}{amount}')
})

it('should get default(en_US) currency config if the locale is not support', () => {
  const { getLocalizeTemplate } = currenciesConfig.USD
  const locale = 'unsupported'
  const DEFAULT_TEMPLATE = 'USD {negative}{amount}'

  expect(getLocalizeTemplate(locale)).toEqual(DEFAULT_TEMPLATE)
})
