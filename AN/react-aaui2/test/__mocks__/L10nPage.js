import React from 'react'

export default class L10nPage extends React.PureComponent {
  render() {
    return <h1>{this.props.l10n.formatMessage('country.displayName.CN')}</h1>
  }
}
