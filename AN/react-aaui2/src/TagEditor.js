import React, { PureComponent } from 'react'
import { bool, string, array, object, func, node, oneOfType } from 'prop-types'
import classNames from 'classnames'

import { omit, noop } from './shared/utils'
import Tag from './Tag'

let lastFocusedElement = null

function trackLastFocusedElement() {
  lastFocusedElement = document.activeElement
}

function stopPropagation(e) {
  e.stopPropagation()
}

export default class TagEditor extends PureComponent {
  static displayName = 'AUITagEditor'

  static propTypes = {
    errored: bool,
    editMode: bool,
    className: string,
    onChange: func,

    placeholder: node,
    data: oneOfType([array, object]).isRequired,
  }

  static defaultProps = {
    errored: false,
    editMode: true,
    onChange: noop,
    data: [],
  }

  componentDidUpdate(prevProps) {
    const lastTag = this.tag

    this.props.data.length > prevProps.data.length &&
      lastTag &&
      lastTag.toInput()
  }

  setTagRef = tag => {
    this.tag = tag
  }

  handleClick = () => {
    if (lastFocusedElement && lastFocusedElement.tagName === 'INPUT') return

    const d = this.props.data
    const data = d.concat({ text: 'your tag name', isNew: true })

    this.props.onChange(data)
  }

  handleTagClose = ind => () => {
    const d = this.props.data
    const data = d.filter((item, index) => index !== ind)

    this.props.onChange(data)
  }

  handleTagChange = ind => (text, isKeyFinished) => {
    let data = this.props.data

    if (text === '') {
      data = data.filter((item, index) => index !== ind)
    } else {
      data = data.map((item, index) => {
        if (index === ind) {
          return { text }
        }

        return item
      })

      // If we the `keyCode` is `TAB` or `ENTER`, then add another new Tag
      if (isKeyFinished && ind === data.length - 1) {
        data = data.concat({ text: 'your tag name', isNew: true })
      }
    }

    this.props.onChange(data)
  }

  handleTabCancel = ind => () => {
    const { data } = this.props

    // Remove tag it it's new
    if (data[ind].isNew) {
      this.props.onChange(data.filter((item, index) => index !== ind))
    }
  }

  render() {
    const {
      errored,
      editMode,
      className,
      placeholder,
      data,
      ...rest
    } = this.props
    const classes = classNames(
      {
        tageditor: true,
        'is-errored': errored,
      },
      className,
    )

    return (
      <div
        className={classes}
        {...omit(rest, ['onChange'])}
        onMouseDown={trackLastFocusedElement}
        onClick={editMode ? this.handleClick : noop}
      >
        {data.map(({ text, isNew, ...tagRestProps }, i) => (
          <Tag
            key={i}
            ref={this.setTagRef}
            value={text}
            isNew={!!isNew}
            editMode={editMode}
            onChange={this.handleTagChange(i)}
            onCancel={this.handleTabCancel(i)}
            onClose={this.handleTagClose(i)}
            onClick={stopPropagation}
            {...tagRestProps}
          />
        ))}
        {!data.length && placeholder}
      </div>
    )
  }
}
