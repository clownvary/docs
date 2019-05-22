import axe from '../js/axe-test'
import axeConf from '../axe-config'

import '../../samples/datepicker'

test('a11y test error for DatePicker', () => axe(axeConf).then(result => {
  expect(result.violations).toEqual([])
}))
