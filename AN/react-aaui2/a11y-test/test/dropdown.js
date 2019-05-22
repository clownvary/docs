import axe from '../js/axe-test'
import axeConf from '../axe-config'

import '../components/Dropdown'

test('a11y test error for Dropdown', () => axe(axeConf).then(result => {
  expect(result.violations).toEqual([])
}))
