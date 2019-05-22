import axe from '../js/axe-test'
import axeConf from '../axe-config'

import '../../samples/tageditor'

test('a11y test error for tag editor', () => axe(axeConf).then(result => {
  expect(result.violations).toEqual([])
}))
