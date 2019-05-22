const localeStr =
  'de_DE,de_AT,de_CH,en_AU,en_CA,en_GB,en_ZA,en_IE,en_NZ,en_US,es_ES,fr_CA,fr_FR,fr_CH,it_IT,it_CH,pt_BR,sv_SE,zh_CN'
const localeData = localeStr.split(',').map(l => ({
  text: l,
  value: l,
}))
const dropdownData = [
  {
    text: 'Tennis',
    value: 'tennis',
  },
  {
    text: 'Basketball',
    value: 'basketball',
  },
  {
    text: 'Swimming',
    value: 'swimming',
  },
]

const currenciesStr =
  'USD,CAD,AUD,EUR,CNY,NZD,GBP,BRL,DKK,HKD,IDR,JPY,MYR,MXN,NOK,PAB,PLN,PHP,SGD,ZAR,LKR,SEK,CHF,TWD,THB,BIF,BYR,CLF,CLP,CVE,DJF,GNF,ISK,KMF,KRW,PYG,RWF,UGX,UYI,VND,VUV,XAF,XPF,RMB'
const currenciesData = currenciesStr.split(',').map(l => ({
  text: l,
  value: l,
}))

export { localeData, dropdownData, currenciesData }
