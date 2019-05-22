import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';

export default class TitlePanel extends React.PureComponent {
  static displayName = 'TitlePanel';
  static propTypes = {
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ])
  }

  constructor(props) {
    super(props);

    this.onSettingsClick = this.onSettingsClick.bind(this);
  }

  onSettingsClick() {
    const { onSettingsClick } = this.props;
    if (isFunction(onSettingsClick)) {
      onSettingsClick();
    }
  }

  render() {
    const { className, showSettings = false, title, children } = this.props;
    return (<div className={classNames('an-titlepanel', className)}>
      <div className="an-titlepanel__header">
        <div className="sections">
          <span className="start">{title}</span>
          <span className="center" />
          <span className="end">
            {showSettings && <i className="icon icon-settings" onClick={this.onSettingsClick} />}
          </span>
        </div>
      </div>
      <div className="an-titlepanel__body">
        {children}
      </div>
    </div>);
  }
}
