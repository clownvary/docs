import axe from '../js/axe-test'
import axeConf from '../axe-config'

import '../../samples/pills'

test('a11y test error for pills', () => axe(axeConf).then(result => {
  expect(result.violations).toEqual([])
}))
