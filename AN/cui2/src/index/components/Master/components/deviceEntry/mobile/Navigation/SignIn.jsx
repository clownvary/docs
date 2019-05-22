import React from 'react';
import radium from 'radium';
import BaseItem from './BaseItem';

export class SignIn extends BaseItem {

  render() {
    const { login } = this.props;
    const signIn = login.filter(o => o.get('title') === 'Sign In');
    const account = login.filter(o => o.get('title') === 'Create an Account');

    return (
      <li className="sign-in-bar an-grid an-col-mg-12">
        <div className="sign-in an-col an-col-6-12">
          <a href={signIn.get(0).get('url')} >{signIn.get(0).get('title')}</a>
        </div>
        <div className="an-col an-col-6-12">
          <a href={account.get(0).get('url')} >{account.get(0).get('title')}</a>
        </div>
      </li>
    );
  }
}

export default radium(SignIn);
