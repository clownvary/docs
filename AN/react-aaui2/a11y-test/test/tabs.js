import axe from '../js/axe-test'
import axeConf from '../axe-config'

import '../../samples/tabs'

test('a11y test error for tabs', () => axe(axeConf).then(result => {
  expect(result.violations).toEqual([])
}))
