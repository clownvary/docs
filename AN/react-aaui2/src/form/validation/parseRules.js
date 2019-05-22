import Rules from './rules'

/*
 * `required|min:2|max:10` =>
 * [{"name":"required"},{"name":"min","param":"2"},{"name":"max","param":"10"}]
 */
const matchers = Object.keys(Rules).reduce(
  (r, rule) => ({
    ...r,
    [rule]: new RegExp(`${rule}[^|]*`),
  }),
  {},
)

matchers.regexp = /regexp:\(.*\)/

const parseRules = (rules = '') =>
  Object.keys(matchers).reduce((acc, key) => {
    const rule = rules.match(matchers[key])
    if (rule) {
      const [name, param] = rule[0].split(':')
      return param ? [...acc, { name, param }] : [...acc, { name }]
    }
    return acc
  }, [])

export default parseRules
