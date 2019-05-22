import React, { PureComponent } from 'react'
import { number, string, func, oneOf } from 'prop-types'
import classNames from 'classnames'

import Button from './Button'
import { noop, omit, debounce } from './shared/utils'
import keyCodes from './shared/keyCodes'

const TRIGGER_NAMES = ['button', 'input', 'enter']
const [BUTTON, INPUT, ENTER] = TRIGGER_NAMES
const propTypes = {
  delay: number,
  value: string,
  className: string,
  placeholder: string,
  searchBtnText: string,
  size: oneOf(['', 'lg']),
  trigger: oneOf(TRIGGER_NAMES),
  onChange: func,
  onSearch: func,
}
const defaultProps = {
  delay: 500,
  value: '',
  placeholder: 'Enter your search here...',
  searchBtnText: 'Search',
  size: '',
  trigger: BUTTON,
  onChange: noop,
  onSearch: noop,
}

export default class SearchInput extends PureComponent {
  static displayName = 'AUISearchInput'
  static propTypes = propTypes
  static defaultProps = defaultProps

  constructor(props) {
    super(props)

    this.state = {
      value: this.props.value,
    }

    this.debouncedOnChange = debounce(this.triggerSearch, props.delay)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value,
      })
    }
  }

  triggerSearch = value => {
    this.props.onSearch(value.trim())
  }

  handleChange = e => {
    const value = e.target.value
    const { trigger, onChange } = this.props

    onChange(value)

    this.setState(
      {
        value,
      },
      () => {
        if (trigger === INPUT) {
          this.debouncedOnChange(value)
        }
      },
    )
  }

  handleKeyDown = e => {
    const { trigger } = this.props
    const { value } = this.state

    // Enable `ENTER` by default if trigger is set as `BUTTON`
    if (
      (trigger === ENTER || trigger === BUTTON) &&
      e.keyCode === keyCodes.ENTER
    ) {
      e.preventDefault()

      this.triggerSearch(value)
    }
  }

  handleButtonClick = () => {
    const { value } = this.state

    this.triggerSearch(value)
  }

  handleCloseIconClick = () => {
    this.setState(
      {
        value: '',
      },
      () => {
        this.triggerSearch(this.state.value)
      },
    )
  }

  render() {
    const {
      className,
      placeholder,
      searchBtnText,
      size,
      trigger,
      ...rest
    } = this.props
    const { value } = this.state
    const hasFeedback = !!value
    const classes = classNames(
      {
        'search-box': true,
        [`search-box--${size}`]: size,
      },
      className,
    )
    const inputGroupClasses = classNames({
      'search-box__input-addon-group': true,
      'search-box__input-addon-group--has-feedback': hasFeedback,
    })

    return (
      <div className={classes}>
        <div className={inputGroupClasses}>
          <i className="icon-search" />
          <input
            {...omit(rest, ['onSearch', 'delay'])}
            className="input"
            type="search"
            value={value}
            placeholder={placeholder}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
          {hasFeedback && (
            <span
              className="icon-close input-feedback active"
              onClick={this.handleCloseIconClick}
            />
          )}
        </div>
        {trigger === BUTTON && (
          <Button noSubmit type="primary" onClick={this.handleButtonClick}>
            {searchBtnText}
          </Button>
        )}
      </div>
    )
  }
}
