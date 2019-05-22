import L10n from 'shared/L10n'
import Store from 'form/store'
import { aauiL10nShape } from 'shared/types'
import { FormStorePropTypes } from 'form/types'

const l10n = new L10n()
const context = {
  aauiFormStore: new Store(),
  aauiL10n: l10n,
  l10n,
}
const formMountOptions = {
  context,
  childContextTypes: {
    ...FormStorePropTypes,
    aauiL10n: aauiL10nShape,
    l10n: aauiL10nShape,
  },
}

export default formMountOptions
export { l10n }
