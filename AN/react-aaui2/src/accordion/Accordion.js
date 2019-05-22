import React, { PureComponent } from 'react'
import { string, bool, node } from 'prop-types'

import Panel from './AccordionPanel'
import KEY_CODES from '../shared/keyCodes'

export default class Accordion extends PureComponent {
  static propTypes = {
    className: string,
    children: node,
    multiSelectable: bool,
    transition: string,
  }

  static defaultProps = {
    multiSelectable: false,
    transition: 'height 0.2s ease',
  }

  state = {
    status: {},
    focusableChildren: [],
  }

  setStatus = (key, active) => {
    const status = { ...this.state.status }

    if (this.props.multiSelectable) {
      status[key] = active
    } else {
      React.Children.forEach(this.props.children, (child, k) => {
        status[k] = false
      })
      status[key] = active
    }
    this.setState({
      status,
    })
  }

  handleInitChildren = (index, children) => {
    if (children) {
      this.setState({
        focusableChildren: [...this.state.focusableChildren, children],
      })
    } else {
      this.setState({
        focusableChildren: [...this.state.focusableChildren],
      })
    }
  }

  handleChildChangeFocus = (index, active, keyCode, children, disabled) => {
    const focusableChildren = this.state.focusableChildren
    const currentIndex = focusableChildren.indexOf(children)
    const maxIndex = focusableChildren.length - 1

    switch (keyCode) {
      case KEY_CODES.ENTER:
      case KEY_CODES.SPACE:
        if (!disabled) {
          this.setStatus(index, active)
        }
        break
      case KEY_CODES.DOWNARROW:
        children.blur()
        focusableChildren[
          currentIndex + 1 >= maxIndex ? maxIndex : currentIndex + 1
        ].focus()
        break
      case KEY_CODES.UPARROW:
        children.blur()
        focusableChildren[currentIndex - 1 <= 0 ? 0 : currentIndex - 1].focus()
        break
      default:
        break
    }
  }

  render() {
    const { status } = this.state
    const items = []

    React.Children.map(this.props.children, (child, key) => {
      const item = React.cloneElement(child, {
        key,
        index: key,
        active: status[key] !== undefined ? status[key] : child.props.active,
        transition: this.props.transition,
        onInitChildren: this.handleInitChildren,
        setStatus: this.setStatus,
        onChangeFocus: this.handleChildChangeFocus,
      })

      items.push(item)
    })
    return (
      <div className={`accordion-group ${this.props.className || ''}`}>
        {items}
      </div>
    )
  }
}

Accordion.Panel = Panel
