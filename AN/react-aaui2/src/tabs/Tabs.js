import React, { PureComponent } from 'react'
import { string, object, func, node } from 'prop-types'

import { identity } from '../shared/utils'

import { tabsAPIShape } from '../shared/types'
import KEY_CODES from '../shared/keyCodes'

const propTypes = {
  className: string,
  style: object,
  selected: string,
  defaultSelected: string,
  onChange: func,
  children: node,
}

export default class Tabs extends PureComponent {
  static displayName = 'AUITabs'
  static propTypes = propTypes
  static defaultProps = {
    onChange: identity,
  }
  static childContextTypes = {
    auiTabsAPI: tabsAPIShape,
  }

  constructor(props) {
    super(props)

    this.state = {
      selected: 'selected' in props ? props.selected : props.defaultSelected,
    }
  }

  getChildContext() {
    return {
      auiTabsAPI: {
        select: this.select,
        getSelected: this.getSelected,
      },
    }
  }

  componentDidMount() {
    Object.defineProperties(this, {
      selected: {
        get() {
          return this.state.selected
        },
        set(v) {
          this.props.selected === undefined && this.setState({ selected: v })
        },
      },
    })

    if (this.state.selected == null) {
      this.childrenForEach(child => {
        if (child.type === Tabs.Container) {
          this.setState({
            selected: child.props.name,
          })
        }
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const defaultSelected =
      nextProps.defaultSelected !== this.props.defaultSelected
        ? nextProps.defaultSelected
        : this.state.selected
    const newState = {
      selected:
        nextProps.selected !== this.props.selected
          ? nextProps.selected
          : defaultSelected,
    }

    newState.selected !== this.state.selected && this.setState(newState)
  }

  getSelected = () => this.state.selected

  childrenForEach = callback =>
    React.Children.forEach(this.props.children, callback)

  select = name => {
    if (this.props.selected === undefined) {
      this.setState(
        {
          selected: name,
        },
        () => {
          this.props.onChange(name)
        },
      )
    } else {
      this.props.onChange(name)
    }
  }

  handleKeyDown = e => {
    e.persist()

    const childrenName = []
    this.childrenForEach(child => {
      if (child.type === Tabs.Container) {
        childrenName.push(child.props.name)
      }
    })

    const len = childrenName.length
    const currentIndex = childrenName.indexOf(this.getSelected())
    switch (e.keyCode) {
      case KEY_CODES.LEFTARROW:
        this.select(
          childrenName[currentIndex === 0 ? len - 1 : currentIndex - 1],
        )
        break
      case KEY_CODES.RIGHTARROW:
        this.select(
          childrenName[currentIndex === len - 1 ? 0 : currentIndex + 1],
        )
        break
      default:
        break
    }
  }

  render() {
    const { className, style, children } = this.props

    return (
      <div
        className={className || ''}
        style={style}
        onKeyDown={this.handleKeyDown}
      >
        {children}
      </div>
    )
  }
}
