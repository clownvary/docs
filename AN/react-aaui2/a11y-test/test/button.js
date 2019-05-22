import axe from '../js/axe-test'
import axeConf from '../axe-config'

import '../../samples/button'

test('a11y test error for Button', () => axe(axeConf).then(result => {
  expect(result.violations).toEqual([])
}))
