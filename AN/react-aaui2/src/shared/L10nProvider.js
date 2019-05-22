import { PureComponent, Children } from 'react'
import { string, object, node } from 'prop-types'
import L10n from './L10n'
import { aauiL10nShape } from './types'

const l10nName = 'aauiL10n'

export default class L10nProvider extends PureComponent {
  static propTypes = {
    locale: string,
    messages: object, // eslint-disable-line
    l10n: object, // eslint-disable-line
    messagePath: string, // eslint-disable-line
    children: node,
  }

  static defaultProps = {
    locale: 'en_US',
  }

  static childContextTypes = { [l10nName]: aauiL10nShape }

  constructor(props, context) {
    super(props, context)

    this.state = { messages: props.messages || {} }
    this.l10n = props.l10n || new L10n(props, context)
  }

  getChildContext() {
    return {
      [l10nName]: this.l10n,
    }
  }

  componentDidMount() {
    const modules = [
      import(/* webpackChunkName: "AUI/L10n/[request]" */
      `../../i18n/${this.props.locale}.json`),
    ]

    if (this.props.messagePath) {
      const messageLocalPath = `${this.props.messagePath.replace(
        '{locale}',
        this.props.locale,
      )}`
      modules.push(import(`${messageLocalPath}`))
    }

    Promise.all(modules).then(messages => {
      this.syncMessages({
        ...messages[0],
        ...messages[1],
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.locale !== nextProps.locale) {
      this.l10n.locale = nextProps.locale

      const modules = [
        import(/* webpackChunkName: "AUI/L10n/[request]" */
        `../../i18n/${this.l10n.locale}.json`),
      ]

      if (nextProps.messagePath) {
        const messageLocalPath = `${nextProps.messagePath.replace(
          '{locale}',
          this.l10n.locale,
        )}`
        modules.push(import(`${messageLocalPath}`))
      }

      Promise.all(modules).then(messages => {
        this.syncMessages({
          ...messages[0],
          ...messages[1],
        })
      })
    }

    if (this.props.messages !== nextProps.messages) {
      this.syncMessages(nextProps.messages)
    }
  }

  syncMessages(messages) {
    this.l10n.messages = {
      ...this.l10n.messages,
      ...messages,
    }

    this.setState({
      messages: this.l10n.messages,
    })
  }

  render() {
    return Children.only(this.props.children)
  }
}
