import React from 'react'
import Dropdown from './Dropdown'
import NativeSelect from './NativeSelect'
import { ShowAt, HideAt } from '../viewport'

const Select = props => (
  <div>
    <ShowAt smAndAbove>
      <Dropdown {...props} />
    </ShowAt>
    <HideAt smAndAbove>
      <NativeSelect {...props} />
    </HideAt>
  </div>
)

export { Select }
export default Dropdown
