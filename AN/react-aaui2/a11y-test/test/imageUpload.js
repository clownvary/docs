import axe from '../js/axe-test'
import axeConf from '../axe-config'

import '../../samples/imageUpload'

test('a11y test error for ImageUpload', () => axe(axeConf).then(result => {
  expect(result.violations).toEqual([])
}))
