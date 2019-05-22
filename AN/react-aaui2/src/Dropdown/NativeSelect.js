import React, { Component } from 'react'
import { string, bool, object, func, oneOf, arrayOf, shape } from 'prop-types'
import classNames from 'classnames'
import { filterValidProps, noop, omit } from '../shared/utils'
import * as da from '../shared/data-access'
import injectL10n from '../shared/injectL10n'
import { aauiL10nShape } from '../shared/types'

class Select extends Component {
  static propTypes = {
    className: string,
    value: string,
    defaultValue: string,
    placeholder: string,
    preIcon: string,
    size: oneOf(['m', 'lg']),
    theme: oneOf(['flat', 'gradient', 'borderless']),
    isMoreButton: bool,
    disabled: bool,
    data: arrayOf(
      shape({
        text: string,
        value: string,
      }),
    ),
    style: object, // eslint-disable-line
    onChange: func,
    l10n: aauiL10nShape,
  }

  static defaultProps = {
    size: 'm',
    theme: 'flat',
    onChange: noop,
  }

  handleSelectChange = e => {
    const { value } = e.target
    const { onChange } = this.props

    onChange({ value })
  }

  render = () => {
    const {
      className,
      disabled,
      preIcon,
      placeholder,
      size,
      theme,
      isMoreButton,
      style,
      data,
      l10n,
      ...rest
    } = this.props
    const validProps = filterValidProps(rest)

    const classes = classNames(
      'dropdown',
      'dropdown--native',
      `dropdown--${theme}`,
      `dropdown--${size}`,
      {
        'dropdown--disabled': disabled,
      },
      className,
    )
    const selectClasses = classNames({
      dropdown__button: true,
      dropdown__select: true,
      disabled,
    })

    return (
      <div className={classes} style={style} {...validProps}>
        {preIcon && <i className={`dropdown__prefix-icon ${preIcon}`} />}
        <select
          className={selectClasses}
          onChange={this.handleSelectChange}
          disabled={disabled}
          {...omit(rest, [
            'onChange',
            'uncontrolled',
            'filterPlaceholder',
            'highlight',
            'maxHeight',
          ])}
        >
          {!rest.value &&
          !rest.defaultValue && (
            <option value="prompt">
              {placeholder ||
                l10n.formatMessage('react-aaui.common.dropdown.notice.select')}
            </option>
          )}
          {data.map(item => (
            <option value={item.value} key={item.value}>
              {da.get(item, 'text')}
            </option>
          ))}
        </select>
        {isMoreButton ? (
          <span className="icon-caret-down" />
        ) : (
          <span className="icon-chevron-down" />
        )}
      </div>
    )
  }
}

export default injectL10n()(Select)
