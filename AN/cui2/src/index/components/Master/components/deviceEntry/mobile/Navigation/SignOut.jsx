import React from 'react';
import radium from 'radium';
import BaseItem from './BaseItem';

export class SignOut extends BaseItem {

  render() {
    const { logout } = this.props;
    const filterData = logout.filter(o => o.get('title') === 'Sign Out');

    return (
      <li className="sign-out">
        <a href={filterData.get(0).get('url')}>
          <span>{filterData.get(0).get('title')}</span>
        </a>
      </li>
    );
  }
}

export default radium(SignOut);
