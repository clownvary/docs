import axe from '../js/axe-test'
import axeConf from '../axe-config'
import '../components/Form'

test('a11y test error for form', () => axe(axeConf).then(result => {
  expect(result.violations.length).toBe(0)
}))
