import radium from 'radium';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import findIndex from 'lodash/findIndex';
import { Link } from 'shared/components/Link';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import { Icon } from 'react-base-ui/lib/components/SVG';
import 'react-base-ui/lib/svgs';

import { showMenuAction } from 'index/components/Master/actions';
import { initCartPageAsyncAction } from 'index/modules/Cart/ShoppingCart/actions/common';
import selfMessages from 'shared/translation/messages/common';

import 'shared/assets/images/logo.png';

import reloadMyCart from '../../common/reloadMyCart';

import './index.less';

export class MobileHeader extends Component {

  static contextTypes = {
    configurations: PropTypes.object,
    systemSettings: PropTypes.object
  }

  static propTypes = {
    cartCount: PropTypes.number,
    showMenuAction: PropTypes.func,
    showMenu: PropTypes.bool
  }

  componentDidMount() {
    window.onpopstate = () => {
      this.props.showMenuAction(false);
    };
  }

  componentWillUnmount() {
    window.onpopstate = null;
  }

  onClickMyCart(myCartUrl) {
    this.props.showMenuAction(false);
    this.reloadMyCart(myCartUrl);
  }

  reloadMyCart = reloadMyCart;

  render() {
    const { showMenu, cartCount, intl: { messages } } = this.props;
    const { configurations, systemSettings } = this.context;
    const logo = systemSettings.getIn(['header', 'logo']);
    const menus = systemSettings.getIn(['navigation', 'menus']).toJS();
    const index = findIndex(menus, o => o.title === 'MyCart');
    const myCartUrl = menus[index].url;

    return (
      <div className="an-responsiveHeader">
        <header className="an-responsiveHeader__wrapper is-center">
          <div className="an-responsiveHeader__menu">
            <button
              onClick={() => { this.props.showMenuAction(); }}
              onTouchStart={() => { }}
              // add empty onTouchStart event  trigger safari :active style
            >
              <Icon name={showMenu ? 'remove' : 'bars'} aria-label="remove icon" />

              {messages[selfMessages.menuText.id]}
            </button>
          </div>
          <div className="an-responsiveHeader__logo">
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
          <div className="an-responsiveHeader__cart">
            <Link to={myCartUrl} onClick={() => this.onClickMyCart(myCartUrl)}>
              <button
                onTouchStart={() => { }}
                // add empty onTouchStart event  trigger safari :active style
              >
                <Icon
                  name="shopping-cart"
                  className="an-responsiveHeader__cart-icon"
                />
                {
                  cartCount ? <span className="an-responsiveHeader__cart-count">{cartCount}</span> : null
                }
                <span className="an-responsiveHeader__cart-empty-count">{messages[selfMessages.emptyText.id]}</span>
              </button>
            </Link>
          </div>
        </header>
      </div>
    );
  }
}

export default injectIntl(connect(
  state => ({
    cartCount: state.master.get('cartCount'),
    showMenu: state.master.get('showMenu')
  }), {
    showMenuAction, initCartPageAsyncAction
  }
)(radium(withRouter(MobileHeader))));
