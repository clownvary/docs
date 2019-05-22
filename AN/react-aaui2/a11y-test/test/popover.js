import axe from '../js/axe-test'
import axeConf from '../axe-config'

import '../../samples/popover'

test('a11y test error for popover', () => axe(axeConf).then(result => {
  expect(result.violations).toEqual([])
}))
