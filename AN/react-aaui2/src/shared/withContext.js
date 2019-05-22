import React, { PureComponent } from 'react'

const withContext = (childContextTypes, getChildContext) => BaseComponent => {
  class WithContext extends PureComponent {
    getChildContext = () => getChildContext(this.props)

    render() {
      return <BaseComponent {...this.props} />
    }
  }

  WithContext.childContextTypes = childContextTypes

  return WithContext
}

export default withContext
