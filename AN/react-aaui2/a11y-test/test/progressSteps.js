import axe from '../js/axe-test'
import axeConf from '../axe-config'

import '../../samples/progress-steps'

test('a11y test error for progress steps', () => axe(axeConf).then(result => {
  expect(result.violations).toEqual([])
}))
