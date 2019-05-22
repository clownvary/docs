import axe from '../js/axe-test'
import axeConf from '../axe-config'

import '../../samples/radioGroup'

test('a11y test error for radioGroup', () => axe(axeConf).then(result => {
  expect(result.violations).toEqual([])
}))
