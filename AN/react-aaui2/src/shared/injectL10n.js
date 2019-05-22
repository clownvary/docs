import React, { PureComponent } from 'react'

import L10n from './L10n'
import getDisplayName from './getDisplayName'
import {
  aauiL10nConfigPropTypes,
  aauiL10nFuncPropTypes,
  aauiL10nShape,
} from './types'
import { omit } from './utils'

const staticL10n = new L10n()

export default function injectL10n(options = {}) {
  const aauiL10nConfigPropKeys = Object.keys(aauiL10nConfigPropTypes)
  const aauiL10nFuncPropKeys = Object.keys(aauiL10nFuncPropTypes)

  const aauiL10nName = 'aauiL10n'
  const { l10nName = 'l10n' } = options

  return function wrapWithInjectL10n(WrappedComponent) {
    class InjectL10n extends PureComponent {
      static displayName = `InjectL10n(${getDisplayName(WrappedComponent)})`
      static contextTypes = { aauiL10n: aauiL10nShape }

      constructor(props) {
        super(props)

        this.unsubscribe = null
      }

      componentDidMount() {
        if (this.context[aauiL10nName]) {
          this.unsubscribe = this.context[aauiL10nName].subscribe(() =>
            this.forceUpdate(),
          )
        }
      }

      componentWillUnmount() {
        if (this.unsubscribe) {
          this.unsubscribe()
        }

        this.unsubscribe = null
      }

      getBoundL10n = () => {
        const l10n = this.context[aauiL10nName] || staticL10n
        const boundFuncs = aauiL10nFuncPropKeys.reduce(
          (funcs, name) => ({
            ...funcs,
            [name]: l10n[name].bind(l10n),
          }),
          {},
        )
        const boundConfig = aauiL10nConfigPropKeys.reduce(
          (config, name) => ({
            ...config,
            [name]: l10n[name],
          }),
          {},
        )

        return {
          [l10nName]: {
            ...l10n,
            ...boundConfig,
            ...boundFuncs,
          },
        }
      }

      render() {
        const finalProps = omit(this.props, [aauiL10nName])

        return <WrappedComponent {...finalProps} {...this.getBoundL10n()} />
      }
    }

    return InjectL10n
  }
}
