import React, { PureComponent } from 'react'
import { string, bool, func, object, any, oneOf } from 'prop-types'
import classNames from 'classnames'

import { noop, debounce, filterValidProps } from '../shared/utils'
import KEY_CODES from '../shared/keyCodes'
import * as da from '../shared/data-access'

export default class Dropdown extends PureComponent {
  static displayName = 'AAUIDropdown'

  static propTypes = {
    className: string,
    value: string,
    defaultValue: string,
    maxHeight: string,
    placeholder: string,
    filterPlaceholder: string,
    preIcon: string,
    size: oneOf(['m', 'lg']),
    theme: oneOf(['flat', 'gradient', 'borderless']),
    isMoreButton: bool,
    disabled: bool,
    filter: bool,
    highlight: bool,
    uncontrolled: bool,
    data: any, // eslint-disable-line
    style: object, // eslint-disable-line
    onChange: func,
    onExpand: func,
    onCollapse: func,
  }

  static defaultProps = {
    placeholder: 'Select one...',
    filterPlaceholder: 'Filter...',
    size: 'm',
    theme: 'flat',
    filter: false,
    highlight: false,
    uncontrolled: true, // keep it compatiable with existing implementation
    onChange: noop,
    onExpand: noop,
    onCollapse: noop,
  }

  constructor(props) {
    super(props)

    const { data, value, defaultValue, highlight } = this.props
    const val = value || defaultValue
    const activeItemIndex = highlight ? this.getActiveIndex(data, val) : -1

    this.state = {
      isExpanded: false,
      value: val,
      dataView: data,
      activeItemIndex,
    }
  }

  componentWillMount = () => {
    this.keyboardValue = ''
    this.clearKeyboardValue = debounce(() => {
      this.keyboardValue = ''
    }, 600)
  }

  componentDidMount = () => {
    Object.defineProperties(this, {
      value: {
        get() {
          return this.state.value
        },
        set(v) {
          if (this.props.value === undefined) {
            this.setState({ value: v })
          }
        },
      },
    })
  }

  componentWillReceiveProps = nextProps => {
    const newState = {}
    if (nextProps.value !== this.props.value) {
      newState.value = nextProps.value
    } else if (nextProps.defaultValue !== this.props.defaultValue) {
      newState.value =
        this.state.value === undefined
          ? nextProps.defaultValue
          : this.state.value
    }
    if (nextProps.data !== this.props.data) {
      newState.dataView = nextProps.data
    }
    if (Object.keys(newState).length > 0) {
      const value = newState.value || nextProps.value || nextProps.defaultValue
      newState.activeItemIndex = nextProps.highlight
        ? this.getActiveIndex(nextProps.data, value)
        : -1
      this.setState(newState)
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.isExpanded && !prevState.isExpanded) {
      this.props.onExpand()
    }

    if (prevState.isExpanded && !this.state.isExpanded) {
      this.props.onCollapse()
    }

    if (this.state.isExpanded) {
      if (this.props.filter) {
        this.filterInput.focus()
      } else {
        this.itemMenu.focus()
      }

      const itemMenu = this.itemMenu
      const activeItem = itemMenu.querySelector('.selected')
      if (activeItem) {
        const itemMenuHeight = itemMenu.offsetHeight
        const itemMenuScrollTop = itemMenu.scrollTop
        const activeItemTop = activeItem.offsetTop
        const activeItemHeight = activeItem.offsetHeight
        /* eslint no-mixed-operators: 0 */
        if (
          activeItemTop +
            activeItemHeight -
            itemMenuHeight -
            itemMenuScrollTop >
          0
        ) {
          itemMenu.scrollTop = activeItemTop + activeItemHeight - itemMenuHeight
        } else if (activeItemTop < itemMenuScrollTop) {
          itemMenu.scrollTop = activeItemTop
        }
        activeItem.focus()
      }
    }
  }

  getActiveIndex = (data, val) =>
    Array.findIndex(data, item => item.value === val)

  getIndex = str => {
    const dataArray = this.props.data.toJS
      ? this.props.data.toJS()
      : this.props.data
    let index = 0
    let value = ''
    const length = da.count(dataArray)
    let isFound = false
    let keyWords = ''
    let i = 0
    if (
      this.state.keyWords &&
      str.toUpperCase().indexOf(this.state.keyWords) === 0
    ) {
      i = this.state.activeItemIndex + 1
    }

    for (; i < length; i += 1) {
      value = da.get(dataArray[i], 'text')
      if (value.toUpperCase().indexOf(str) === 0) {
        index = i
        isFound = true
        keyWords = str
        break
      }
    }

    if (
      this.state.keyWords &&
      str.toUpperCase().indexOf(this.state.keyWords) === 0
    ) {
      if (!isFound) {
        for (i = 0; i < length; i += 1) {
          value = da.get(dataArray[i], 'text')
          if (value.toUpperCase().indexOf(str) === 0) {
            index = i
            isFound = true
            keyWords = str
            break
          }
        }
      }
    }

    return { index, isFound, keyWords }
  }

  tryCollapse = () => {
    if (this.state.isExpanded) {
      this._timer = setTimeout(() => {
        this.setState({
          isExpanded: false,
          // activeItemIndex: -1
        })
      }, 100)
    }
  }

  cancelCollapseTimeout = () => {
    clearTimeout(this._timer)
  }

  giveFocus = e => {
    if (e.target === this.itemMenu) {
      this.itemMenu.focus()
    }
  }

  navigateByKeys = e => {
    if (e.keyCode === 9) {
      return
    }
    // focus next component if there are many input, dropdown
    // or others component on the screen when pressing tab.
    let isExpanded = false
    e.preventDefault()
    switch (e.keyCode) {
      case KEY_CODES.UPARROW: // up (Previous item)
        this.setState({
          activeItemIndex:
            this.state.activeItemIndex - 1 >= 0
              ? this.state.activeItemIndex - 1
              : da.count(this.state.dataView) - 1,
          isExpanded: true,
        })
        break
      case KEY_CODES.DOWNARROW: // down (Next item)
        this.setState({
          activeItemIndex:
            this.state.activeItemIndex + 1 < da.count(this.state.dataView)
              ? this.state.activeItemIndex + 1
              : 0,
          isExpanded: true,
        })
        break
      case KEY_CODES.ENTER: // enter (Select the active item)
        {
          const { dataView, activeItemIndex } = this.state

          if (activeItemIndex !== -1) {
            let value = da.get(dataView, activeItemIndex)
            value = da.get(value, 'value')
            this.select(value)
            this.dropdownButton.focus()
          }
        }
        break
      case KEY_CODES.ESCAPE: // escape (Hide dropdown menu)
        this.setState({
          isExpanded: false,
          activeItemIndex: this.state.activeItemIndex,
        })
        this.dropdownButton.focus()
        break
      case KEY_CODES.SPACE: // blank (Show dropdown menu)
        isExpanded = this.state.isExpanded
        if (!isExpanded) {
          this.setState({
            isExpanded: true,
            activeItemIndex: this.state.activeItemIndex,
          })
        }
        break
      default:
        // Filter dropdown list by the key word
        if (!this.props.filter) {
          const charStr = String.fromCharCode(e.keyCode)
          this.keyboardValue = this.keyboardValue + charStr
          this.filterFromKeyboard()
        }
    }
  }

  applyFilter = e => {
    this.setState({
      dataView: this.filterData(e.target.value, this.props.data),
    })
  }

  handleKeys = e => {
    // Delegate up, down, and escape to itemMenu.
    if ([38, 40, 27].indexOf(e.keyCode) > -1) return
    // Delegate enter to itemMenu if up/down selections are already made.
    if (e.keyCode === 13 && this.state.activeItemIndex > -1) return
    e.stopPropagation()
  }

  select = value => {
    const { highlight, uncontrolled, onChange } = this.props
    const activeItemIndex = highlight
      ? this.getActiveIndex(this.state.dataView, value)
      : -1

    this.setState({
      isExpanded: false,
      activeItemIndex,
    })

    if (!('value' in this.props) || uncontrolled) {
      this.setState({
        value,
      })
    }

    onChange({ value })
  }

  findItemByValue = value => {
    /* eslint no-restricted-syntax: 0 */
    for (const item of this.props.data) {
      if (da.get(item, 'value') === value) {
        return item
      }
    }
    return undefined
  }

  findTextByValue = value => {
    const item = this.findItemByValue(value)

    if (item) {
      return da.get(item, 'text')
    }

    return undefined
  }

  filterData = (key, dataset) => {
    const k = key.trim().toLowerCase()
    const klen = k.length

    function matcher(item) {
      const t = da
        .get(item, 'text')
        .trim()
        .toLowerCase()
      let i = 0
      let kc = k.charAt(i)
      for (const tc of t) {
        if (tc === kc) {
          i += 1
          if (i >= klen) {
            return true
          }
          kc = k.charAt(i)
        }
      }
      return false
    }

    return !k ? dataset : dataset.filter(matcher)
  }

  clearKeyboard = e => {
    e.persist()
    this.clearKeyboardValue(e)
  }

  filterFromKeyboard = () => {
    const result = this.getIndex(this.keyboardValue)
    if (result.isFound) {
      this.setState({
        activeItemIndex: result.index,
        keyWords: result.keyWords,
      })
    }
  }

  toggleMenu = () => {
    clearTimeout(this._timer)

    this.setState({
      isExpanded: !this.state.isExpanded,
    })
  }

  handleInputOnclick = value => () => {
    this.select(value)
  }

  render = () => {
    const {
      className,
      maxHeight,
      placeholder,
      filterPlaceholder,
      size,
      theme,
      preIcon,
      disabled,
      filter,
      isMoreButton,
      style,
      ...rest
    } = this.props
    const { isExpanded, value, dataView, activeItemIndex } = this.state
    const validProps = filterValidProps(rest)
    const classes = classNames(
      {
        dropdown: true,
        'dropdown--with-search': filter,
        [`dropdown--${theme}`]: theme,
        [`dropdown--${size}`]: size,
      },
      className,
    )
    const buttonClasses = classNames({
      dropdown__button: true,
      show: isMoreButton && isExpanded,
      expand: !isMoreButton && isExpanded,
      collapse: !isMoreButton && !isExpanded,
      disabled,
    })
    const listClasses = classNames({
      dropdown__menu: true,
      show: isExpanded && !disabled,
    })

    return (
      <div
        className={classes}
        style={style}
        {...validProps}
        onKeyUp={disabled ? undefined : this.clearKeyboard}
        onKeyDown={disabled ? undefined : this.navigateByKeys}
        role="combobox"
        aria-expanded={isExpanded && !disabled}
      >
        <button
          type="button"
          ref={ref => {
            this.dropdownButton = ref
          }}
          aria-label={this.findTextByValue(value) || placeholder}
          className={buttonClasses}
          onMouseDown={e => e.preventDefault()}
          onClick={disabled ? undefined : this.toggleMenu}
        >
          {preIcon && <i className={`dropdown__prefix-icon ${preIcon}`} />}
          <span className="dropdown__button-text" role="textbox">
            {this.findTextByValue(value) || placeholder}
          </span>
          {isMoreButton ? (
            <span className={'icon-caret-down'} />
          ) : (
            <span
              className={`${isExpanded
                ? 'icon-chevron-up'
                : 'icon-chevron-down'}`}
            />
          )}
        </button>
        <div>
          <ul
            className={listClasses}
            ref={ref => {
              this.itemMenu = ref
            }}
            role="listbox"
            tabIndex={0}
            style={{ maxHeight }}
            onMouseDown={this.giveFocus}
            onFocus={this.cancelCollapseTimeout}
            onBlur={this.tryCollapse}
          >
            {filter ? (
              <li>
                <div className="dropdown__menu__search-box">
                  <i className="icon-search" />
                  <input
                    type="text"
                    className="input"
                    ref={ref => {
                      this.filterInput = ref
                    }}
                    role="textbox"
                    aria-label="Search"
                    autoComplete="off"
                    placeholder={filterPlaceholder}
                    onKeyDown={this.handleKeys}
                    onChange={this.applyFilter}
                  />
                </div>
              </li>
            ) : (
              undefined
            )}
            {filter ? (
              <li className="dropdown__menu-divider" role="separator" />
            ) : (
              undefined
            )}
            {dataView.map((item, i) => (
              <li
                key={da.get(item, 'value')}
                tabIndex={0}
                role="option"
                className={i === activeItemIndex ? 'selected' : undefined}
                aria-selected={i === activeItemIndex ? true : undefined}
                onClick={this.handleInputOnclick(da.get(item, 'value'))}
              >
                <a>{da.get(item, 'text')}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
