import axe from '../js/axe-test'
import axeConf from '../axe-config'

import '../../samples/input'

test('a11y test error for input', () => axe(axeConf).then(result => {
  expect(result.violations).toEqual([])
}))
