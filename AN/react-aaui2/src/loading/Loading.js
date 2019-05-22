import React from 'react'

import './Loading.less'
import img from './Loading.gif'

export default function Loading() {
  return (
    <div className="loading">
      <img alt="" src={img} />
    </div>
  )
}
