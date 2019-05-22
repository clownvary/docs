import axe from '../js/axe-test'
import axeConf from '../axe-config'

import '../../samples/radio'

test('a11y test error for radio', () => axe(axeConf).then(result => {
  expect(result.violations).toEqual([])
}))
