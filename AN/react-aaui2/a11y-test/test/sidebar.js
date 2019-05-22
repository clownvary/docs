import axe from '../js/axe-test'
import axeConf from '../axe-config'

import '../../samples/sidebar'

test('a11y test error for sidebar', () => axe(axeConf).then(result => {
  expect(result.violations).toEqual([])
}))
