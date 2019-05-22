import axe from '../js/axe-test'
import axeConf from '../axe-config'

import '../../samples/accordion'

test('a11y test error for Checkbox', () => axe(axeConf).then(result => {
  expect(result.violations).toEqual([])
}))
