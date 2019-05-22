import { string, object, func, shape } from 'prop-types'

export const tabsAPIShape = shape({
  select: func,
  getSelected: func,
})

export const aauiL10nConfigPropTypes = {
  locale: string,
  messages: object, // eslint-disable-line
  config: object, // eslint-disable-line
}

export const aauiL10nFuncPropTypes = {
  formatMessage: func,
  parseDateTime: func,
  formatDateTime: func,
  formatCurrency: func,
  subscribe: func,
}

export const aauiL10nShape = shape({
  ...aauiL10nConfigPropTypes,
  ...aauiL10nFuncPropTypes,
})
