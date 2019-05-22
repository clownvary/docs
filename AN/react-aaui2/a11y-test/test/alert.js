import axe from '../js/axe-test'
import axeConf from '../axe-config'

import '../../samples/alert'

test('a11y test error for Alert', () => axe(axeConf).then(result => {
  expect(result.violations).toEqual([])
}))
