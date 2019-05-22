import React from 'react'
import ReactDOM from 'react-dom'

import L10nProvider from '../src/shared/L10nProvider'
import L10nMessage from '../src/shared/L10nMessage'
import Dropdown from '../src/Dropdown'
import Row from '../src/grid/Row'
import Col from '../src/grid/Col'
import injectL10n from '../src/shared/injectL10n'

const localeStr =
  'de_DE,de_AT,de_CH,en_AU,en_CA,en_GB,en_ZA,en_IE,en_NZ,en_US,es_ES,fr_CA,fr_FR,fr_CH,it_IT,it_CH,pt_BR,sv_SE,zh_CN'
const localeData = localeStr.split(',').map(l => ({
  text: l,
  value: l,
}))

class UpdateBlocker extends React.PureComponent {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

class Page extends React.PureComponent {
  render() {
    return (
      <h1>
        {this.props.l10n.formatMessage('country.displayName.CN')}
      </h1>
    )
  }
}

const InjectedPage = injectL10n()(Page)

class App extends React.PureComponent {
  state = { locale: 'en_US' }

  handleChange = ({ value: locale }) => {
    this.setState(() => ({
      locale,
    }))
  }

  render() {
    const { locale } = this.state

    return (
      <div className="container">
        <L10nProvider locale={locale}>
          <Row>
            <Col span={3}>
              <Dropdown
                data={localeData}
                value={locale}
                onChange={this.handleChange}
              />
            </Col>
            <Col span={3}>
              <UpdateBlocker>
                <InjectedPage />
              </UpdateBlocker>
            </Col>
          </Row>
        </L10nProvider>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
