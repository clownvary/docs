import React from 'react'

export default class UpdateBlocker extends React.PureComponent {
  render() {
    return <div>{this.props.children}</div>
  }
}
