import React from 'react'

export default class NonUpdateBlocker extends React.Component {
  render() {
    return <div>{this.props.children}</div>
  }
}
