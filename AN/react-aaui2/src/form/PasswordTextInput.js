import React, { PureComponent } from 'react'

import TextInput from './TextInput'

export default class PasswordTextInput extends PureComponent {
  static displayName = 'PasswordTextInput'

  state = {
    type: 'password',
  }

  handleIconClick = () => {
    this.setState(preState => ({
      type: preState.type === 'password' ? 'text' : 'password',
    }))
  }

  renderIconComponent = props => {
    const { type } = this.state
    const icon = type === 'password' ? 'icon-lock' : 'icon-unlock'

    return (
      <span {...props}>
        <i className={`icon ${icon}`} onClick={this.handleIconClick} />
      </span>
    )
  }

  render() {
    return (
      <TextInput
        icon
        type={this.state.type}
        PreComponent={this.renderIconComponent}
        {...this.props}
      />
    )
  }
}
