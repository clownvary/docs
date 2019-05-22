import axe from '../js/axe-test'
import axeConf from '../axe-config'

import '../../samples/modal'

test('a11y test error for modal', () => axe(axeConf).then(result => {
  expect(result.violations).toEqual([])
}))
