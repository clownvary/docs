import React, { PureComponent } from 'react'
import { string, object, array } from 'prop-types'
import classNames from 'classnames'

import * as da from './shared/data-access'

export default class ProgressSteps extends PureComponent {
  static displayName = 'AAUIProgressSteps'

  static propTypes = {
    className: string,
    size: string,
    steps: array, // eslint-disable-line
    style: object, // eslint-disable-line
  }

  render() {
    const { className, style, size, steps } = this.props
    const classes = classNames(
      {
        'progress-steps': true,
        [`progress-steps--${size}`]: size,
      },
      className,
    )

    return (
      <ul className={classes} style={style}>
        {steps.map(step => (
          <li
            key={da.get(step, 'text')}
            className={`progress-steps__step ${da.get(step, 'status')}`}
          >
            <span className="progress-steps__step-text">
              {da.get(step, 'text')}
            </span>
          </li>
        ))}
      </ul>
    )
  }
}
