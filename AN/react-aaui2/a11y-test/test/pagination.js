import axe from '../js/axe-test'
import axeConf from '../axe-config'

import '../../samples/pagination'

test('a11y test error for pagination', () => axe(axeConf).then(result => {
  expect(result.violations).toEqual([])
}))
