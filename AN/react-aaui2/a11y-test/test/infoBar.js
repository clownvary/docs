import axe from '../js/axe-test'
import axeConf from '../axe-config'

import '../../samples/infobar'

test('a11y test error for infobar', () => axe(axeConf).then(result => {
  expect(result.violations).toEqual([])
}))
