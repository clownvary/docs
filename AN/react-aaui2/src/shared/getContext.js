import React from 'react'

const getContext = contextTypes => BaseComponent => {
  const GetContext = (props, context) => (
    <BaseComponent {...context} {...props} />
  )

  GetContext.contextTypes = contextTypes
  GetContext.WrappedComponent = BaseComponent

  return GetContext
}

export default getContext
