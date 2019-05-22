import axe from '../js/axe-test'
import axeConf from '../axe-config'

import '../../samples/fileUpload'

test('a11y test error for FileUpload', () => axe(axeConf).then(result => {
  expect(result.violations).toEqual([])
}))
