import { PHONE_NUMBER_CONFIG } from '../config'

const required = val => !!val
const email = val => /[0-9-._a-z]+@[0-9-.a-z]+\.[a-z]+/i.test(val)
const min = (val = '', minLen = 0) => val.length >= minLen
const max = (val = '', maxLen = 0) => val.length <= maxLen
const numeric = val => !isNaN(parseFloat(val)) && isFinite(val)
const url = val =>
  /^((ht|f)tps?):\/\/[\w-]+(\.[\w-]+)+([\w-.,@?^=%&:/~+#]*[\w-@?^=%&/~+#])?$/i.test(
    val,
  )
const phone = val =>
  PHONE_NUMBER_CONFIG.some(phoneNumberPattern => phoneNumberPattern.test(val))
const regexp = (val, regex) => (val ? new RegExp(regex).test(val) : true)

export default {
  required,
  email,
  min,
  max,
  numeric,
  url,
  phone,
  regexp,
}
