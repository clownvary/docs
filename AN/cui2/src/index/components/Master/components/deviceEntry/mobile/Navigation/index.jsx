import radium from 'radium';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withResponsiveProvider } from 'react-base-ui/lib/services/responsive';
import {
  showMenuAction as displayMenuAction,
  hideNavigationAction,
  setShadowAnimationEndAction
} from 'index/components/Master/actions';
import routeMap from 'shared/consts/routeMap';
import { getNavBarClass, getNavBarStyles, getNavItemStyles } from 'index/initializers/theme/customize';
import { fullSiteUrl, onlineDefaultRegistrationPage } from 'shared/consts/legancyUrls';
import { cookieService } from 'shared/services';
import selfMessages from 'shared/translation/messages/common';
import 'shared/styles/themes/responsiveIndex.less';
import 'shared/styles/themes/greenGray.less';
import 'shared/styles/themes/orangeYellow.less';
import 'shared/styles/themes/orangeGray.less';
import 'shared/styles/themes/greenYellow.less';
import 'shared/styles/themes/wcagAACompliance.less';

import HomeItem from './HomeItem';
import ActivitiesItem from './ActivitiesItem';
import CalendarItem from './CalendarItem';
import NormalItem from './NormalItem';
import UserInfo from './UserInfo';
import SignOut from './SignOut';
import SignIn from './SignIn';

export class MobileNavigation extends Component {

  static propTypes = {
    showMenu: PropTypes.bool,
    hideMenu: PropTypes.bool,
    menuHeight: PropTypes.number,
    showMenuAction: PropTypes.func,
    setShadowAnimationEndAction: PropTypes.func
  }

  static contextTypes = {
    configurations: PropTypes.object,
    systemSettings: PropTypes.object,
    theme: PropTypes.object,
    isLoginUser: PropTypes.func
  }

  componentWillReceiveProps(nextProps) {
    const { showMenu, responsive: { isMd: lastIsMd } } = this.props;
    const { responsive: { isMd } } = nextProps;

    lastIsMd !== isMd && this.props.hideNavigationAction();
    isMd && this.onAnimationend(showMenu);
  }

  onAnimationend = (showMenu) => {
    const menuShadow = this.menuShadow;
    const func = () => {
      menuShadow.removeEventListener('animationend', func);
      this.props.setShadowAnimationEndAction(true);
    };

    (showMenu && menuShadow) && menuShadow.addEventListener('animationend', func, false);
  }

  hasHomeMenu() {
    const { configurations } = this.context;

    return configurations.get('online_default_registration_page') === onlineDefaultRegistrationPage;
  }


  generateNavItems(isMobile) {
    const { systemSettings, theme } = this.context;
    const menus = systemSettings.getIn(['navigation', 'menus']);
    const { isLg } = this.props.responsive;
    const currentPath = this.props.routes[1].path;

    return menus.map(((item, i) => {
      const properties = {
        item,
        itemStyles: isLg ? getNavItemStyles(theme) : '',
        currentPath,
        routeMap
      };

      if (isMobile) {
        switch (item.get('title')) {
          case 'Home':
            return <HomeItem key={i} {...properties} />;
          case 'Activities':
            return <ActivitiesItem key={i} {...properties} />;
          case 'Calendar':
            return <CalendarItem key={i} {...properties} />;
          case 'MyCart':
            return undefined;
          default:
            return <NormalItem key={i} {...properties} />;
        }
      }

      switch (item.get('title')) {
        case 'Home':
          return <HomeItem key={i} {...properties} />;
        case 'Activities':
          return <ActivitiesItem key={i} {...properties} />;
        case 'MyCart':
          return undefined;
        default:
          return undefined;
      }
    }));
  }

  render() {
    const { systemSettings, theme, isLoginUser } = this.context;
    const { showMenu, menuHeight, hideMenu, showMenuAction,
      animationEnd, responsive: { isMd, isLg }, intl: { messages } } = this.props;
    const logout = systemSettings.getIn(['header', 'logout']);
    const login = systemSettings.getIn(['header', 'login']);

    const isMobile = cookieService.getMobileState();
    const isExistHomeMenu = this.hasHomeMenu();

    return (
      <div>
        <div
          className={classNames(
              'an-responsiveNavigation',
              { 'move-left': showMenu },
              { 'move-right': !showMenu },
              { 'an-responsiveNavigation--is-hide': hideMenu }
            )}
          style={{ height: menuHeight }}
        >
          <div className="an-responsiveNavigation__wrapper">
            <ul className={getNavBarClass(theme)} style={isLg ? getNavBarStyles(theme) : null}>
              { isLoginUser() ?
                <UserInfo
                  user={this.context.systemSettings.get('user')}
                  myCountUrl={logout.get(0).get('url')}
                  isMobile={isMobile}
                /> : <SignIn login={login} /> }
              { this.generateNavItems(isMobile) }
              <li className="placeholder" ><a>placeholder</a></li>
              { isLoginUser() ? <SignOut logout={logout} /> : null }
              { !isMobile && isExistHomeMenu ?
                <div className="an-responsiveNavigation__full-site">
                  {messages[selfMessages.navigationDesc.id]}<br />
                  {`${messages[selfMessages.navigationMoreInfo.id]} `}
                  <a href={fullSiteUrl}>{messages[selfMessages.fullSite.id]}</a>.
                </div> : null
              }
            </ul>
          </div>
        </div>
        { isMd && !animationEnd ?
          <div
            ref={(el) => { this.menuShadow = el; }}
            className={classNames(
              'an-responsiveNavigation__shadow ',
              { 'fade-in': showMenu },
              { 'fade-out': !showMenu },
              { 'an-responsiveNavigation--is-hide': hideMenu }
            )}
            onClick={() => { showMenu && showMenuAction(); }}
          /> : null
        }
      </div>
    );
  }
}

export default injectIntl(withResponsiveProvider(connect(
  state => ({
    showMenu: state.master.get('showMenu'),
    hideMenu: state.master.get('hideMenu'),
    menuHeight: state.master.get('menuHeight'),
    animationEnd: state.master.get('animationEnd'),
    currentSite: state.currentSite
  }),
  {
    showMenuAction: displayMenuAction,
    hideNavigationAction,
    setShadowAnimationEndAction
  }
)(radium(MobileNavigation))));
