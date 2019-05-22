import axe from '../js/axe-test'
import axeConf from '../axe-config'

import '../../samples/tag'

test('a11y test error for tag', () => axe(axeConf).then(result => {
  expect(result.violations).toEqual([])
}))
