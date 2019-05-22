import axe from '../js/axe-test'
import axeConf from '../axe-config'

import '../../samples/more-button'

test('a11y test error for MoreButton', () => axe(axeConf).then(result => {
  expect(result.violations).toEqual([])
}))
