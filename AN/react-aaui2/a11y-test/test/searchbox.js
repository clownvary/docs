import axe from '../js/axe-test'
import axeConf from '../axe-config'

import '../../samples/SearchInput'

test('a11y test error for SearchInput', () => axe(axeConf).then(result => {
  expect(result.violations).toEqual([])
}))
