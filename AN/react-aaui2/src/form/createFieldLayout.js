import React from 'react'
import classNames from 'classnames'

import { Row, Col } from '../grid'
import L10nMessage from '../shared/L10nMessage'
import { FormFieldPropTypes } from './types'

const propTypes = { ...FormFieldPropTypes }
const defaultProps = {
  l10nMessageValues: {},
}

export default ({
  sm = [],
  span = [],
  fluid = true,
  gutter = true,
  align,
  className,
}) => {
  const FormFieldLayout = ({
    label,
    errMsg,
    required,
    children,
    l10nMessageValues,
    ...rest
  }) => {
    const rowClasses = classNames(
      {
        form__group: true,
        'form__group--error': errMsg,
      },
      className,
    )
    const labelClasses = classNames({
      form__label: true,
      'form__label--require': required,
    })
    const controlClasses = classNames({
      form__control: true,
      'form__control--static': rest.static,
    })
    const validateClasses = classNames('form__validate')

    const [smLabel, smControl, smValidate] = sm
    const [spanLabel, spanControl, spanValidate] = span

    return (
      <Row fluid={fluid} gutter={gutter} align={align} className={rowClasses}>
        <Col sm={smLabel} span={spanLabel} className={labelClasses}>
          <label>
            <L10nMessage id={label} />
          </label>
        </Col>
        <Col sm={smControl} span={spanControl} className={controlClasses}>
          {children}
        </Col>
        {!!errMsg && (
          <Col sm={smValidate} span={spanValidate} className={validateClasses}>
            <i className="icon-times-circle" />
            <L10nMessage id={errMsg} values={l10nMessageValues} />
          </Col>
        )}
      </Row>
    )
  }

  FormFieldLayout.propTypes = propTypes
  FormFieldLayout.defaultProps = defaultProps

  return FormFieldLayout
}
