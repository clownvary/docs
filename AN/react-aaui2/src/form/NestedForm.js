import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import connectForm from './connectForm'
import { FormFieldPropTypes } from './types'

const { func, node } = PropTypes
const propTypes = {
  ...FormFieldPropTypes,
  children: node,
  onChange: func,
}

class NestedForm extends PureComponent {
  handleChange = ({ values, errors }) => {
    const { api: { setValue, setError }, onChange } = this.props

    setValue(values)
    setError(errors)

    if (typeof onChange === 'function') {
      onChange({ values, errors })
    }
  }

  render() {
    const { children, ...rest } = this.props

    return (
      <div>
        {React.Children.map(children, child =>
          React.cloneElement(child, {
            ...rest,
            onChange: this.handleChange,
          }),
        )}
      </div>
    )
  }
}

NestedForm.propTypes = propTypes

export default connectForm()(NestedForm)
