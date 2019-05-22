import axe from '../js/axe-test'
import axeConf from '../axe-config'

import '../../samples/tooltip'

test('a11y test error for tooltip', () => axe(axeConf).then(result => {
  expect(result.violations).toEqual([])
}))
