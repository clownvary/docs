import React from 'react'

import Viewport from './Viewport'

function HideAt(props) {
  return <Viewport not {...props} />
}

export default HideAt
