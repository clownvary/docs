import React, { Component } from 'react';
import radium from 'radium';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import { FormattedDyncMessage } from 'shared/translation/formatted';
import locationHelp from 'shared/utils/locationHelp';

import 'shared/assets/images/logo.png';
import './index.less';

/* eslint-disable no-script-url */
export class Header extends Component {

  static contextTypes = {
    configurations: React.PropTypes.object,
    systemSettings: React.PropTypes.object,
    isLoginUser: React.PropTypes.func
  }

  generateLogin() {
    const { systemSettings } = this.context;
    const login = systemSettings.getIn(['header', 'login']);

    return (
      <div className="an-header__user-profiles">
        { login.map((item, i) => (
          <span key={i}>
            <a role="button" href="javascript:void(0)" onClick={() => locationHelp.redirect(item.get('url'))}>{ item.get('title') }</a>
            { i + 1 < login.count() ? ' |' : '' }
          </span>
          )) }
      </div>
    );
  }

  generateLogout() {
    const { systemSettings } = this.context;
    const logout = systemSettings.getIn(['header', 'logout']);
    const firstname = systemSettings.getIn(['user', 'firstname']);

    return (
      <div className="an-header__user-profiles">
        <b>Welcome, <FormattedDyncMessage value={firstname} /></b>
        {logout.map((item, i) => {
          let notExecuteUnloadCallback = false;
          if (item.get('title') === 'Sign Out') {
            notExecuteUnloadCallback = true;
          }
          return (
            <span key={i}>
              <a role="button" href="javascript:void(0)" onClick={() => locationHelp.redirect(item.get('url'), notExecuteUnloadCallback)}>{item.get('title')}</a>
              {i + 1 < logout.count() ? ' |' : ''}
            </span>
          );
        }) }
      </div>
    );
  }

  render() {
    const { configurations, systemSettings, isLoginUser } = this.context;
    const logo = systemSettings.getIn(['header', 'logo']);

    return (
      <div className="an-header">
        <header className="an-header__wrapper">
          <div className="an-header__logo">
            <a href={configurations.get('banner_logo_link')} target="_blank" rel="noopener noreferrer">
              { logo ?
                <img
                  src={logo.get('url')}
                  alt={`${decodeHtmlStr(logo.get('title'))}`}
                  title={decodeHtmlStr(logo.get('title'))}
                />
              : null
             }
            </a>
          </div>
          { isLoginUser() ?
            this.generateLogout() :
            this.generateLogin() }
        </header>
      </div>
    );
  }
}

export default radium(Header);
