import React, { PureComponent } from 'react'
import { bool, node, oneOf, object } from 'prop-types'
import MediaQuery from 'react-responsive'

const VIEWPORTS = {
  smAndAbove: { minWidth: '768px' },
  mdAndAbove: { minWidth: '992px' },
  lgAndAbove: { minWidth: '1200px' },
}

export default class Viewport extends PureComponent {
  static propTypes = {
    smAndAbove: bool,
    mdAndAbove: bool,
    lgAndAbove: bool,
    not: bool,
    type: oneOf(['all', 'screen', 'print']),
    children: node,
    viewports: object, // eslint-disable-line
  }

  static defaultProps = {
    smAndAbove: false,
    mdAndAbove: false,
    lgAndAbove: false,
    not: false,
    type: 'screen',
    viewports: {},
  }

  render() {
    const { not, smAndAbove, mdAndAbove, lgAndAbove, type, viewports } = this.props // eslint-disable-line
    const finalViewports = {
      ...VIEWPORTS,
      ...viewports,
    }
    const mediaQuery =
      Object.keys(finalViewports).reduce((mq, v) => {
        const viewport = this.props[v]

        return viewport
          ? `${not ? `not ${type} and` : ''} (min-width: ${finalViewports[v]
              .minWidth})`
          : mq
      }, '') || '()'

    return <MediaQuery query={mediaQuery}>{this.props.children}</MediaQuery>
  }
}
