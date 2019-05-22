import axe from '../js/axe-test'
import axeConf from '../axe-config'

import '../../samples/label'

test('a11y test error for label', () => axe(axeConf).then(result => {
  expect(result.violations).toEqual([])
}))
