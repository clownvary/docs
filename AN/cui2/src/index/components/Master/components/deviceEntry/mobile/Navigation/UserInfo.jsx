import React, { Component } from 'react';
import radium from 'radium';
import { FormattedDyncMessage } from 'shared/translation/formatted';

export class UserInfo extends Component {

  getContent() {
    const { firstname, lastname } = this.props.user.toJS();

    return (
      <div className="user-info__wrapper">
        <div className="user-info__name">
          <span className="user-info__name__short-name">
            <FormattedDyncMessage value={firstname.charAt(0).toUpperCase()} />
            <FormattedDyncMessage value={lastname.charAt(0).toUpperCase()} />
          </span>
          <span className="user-info__name__full-name">
            <FormattedDyncMessage value={firstname} />
            {' '}
            <FormattedDyncMessage value={lastname} />
          </span>
        </div>
      </div>
    );
  }

  getUserInfo() {
    const { isMobile } = this.props;

    if (isMobile) {
      return (
        <li className="user-info"> <a href={this.props.myCountUrl} > {this.getContent()} </a></li>
      );
    }

    return this.getContent();
  }

  render() {
    return this.getUserInfo();
  }
}

export default radium(UserInfo);
