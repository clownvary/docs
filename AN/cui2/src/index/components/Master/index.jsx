/* eslint react/forbid-prop-types: off */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import { withResponsiveProvider } from 'react-base-ui/lib/services/responsive';
import { addClass, removeClass } from 'react-base-ui/lib/utils/dom';
import { attachResizeEvent, detachResizeEvent } from 'react-base-ui/lib/services/responsive/resizeEvent';
import BackTop from 'react-base-ui/lib/components/BackTop';
import { syncLegacyCuiAction } from 'index/actions/legacyCui';
import { isCustomizedTheme } from 'index/initializers/theme/customize';

import 'shared/styles/index.less';
import { fetchShoppingCartCountAction } from './actions/index';
import Content from './components/content';
import { Header, Navigation } from './components/deviceEntry/pc';
import { MobileHeader, MobileNavigation } from './components/deviceEntry/mobile/index';
import Footer from './components/Footer';
import './index.less';

export class Master extends Component {

  static propTypes = {
    children: PropTypes.node,
    syncLegacyCuiAction: PropTypes.func,
    routes: PropTypes.array,
    params: PropTypes.shape({}),
    fetchShoppingCartCountAction: PropTypes.func
  }

  static contextTypes = {
    getWording: PropTypes.func,
    configurations: PropTypes.object,
    isLoginUser: PropTypes.func,
    theme: PropTypes.shape(
      {
        name: PropTypes.string,
        customizedColors: PropTypes.object
      }
    )
  }

  constructor(props) {
    super(props);

    this.onContainerRef = this.onContainerRef.bind(this);
    this.updateFooterStick = throttle(this.updateFooterStick, 100);
    this.footerStuck = false;
  }

  componentDidMount() {
    this.props.syncLegacyCuiAction();
    this.context.isLoginUser() && this.props.fetchShoppingCartCountAction();

    const { responsive: { isLg } } = this.props;
    if (isLg) {
      attachResizeEvent(this.content.node, this.updateFooterStick);
      window.addEventListener('resize', this.updateFooterStick);
      this.updateFooterStick();
    }
  }

  componentDidUpdate() {
    this.pageLoadAccessibilityHook && this.pageLoadAccessibilityHook.focus();
  }

  componentWillUnmount() {
    const { responsive: { isLg } } = this.props;
    if (isLg) {
      window.removeEventListener('resize', this.updateFooterStick);
      detachResizeEvent(this.content.node, this.updateFooterStick);
    }
  }

  onContainerRef(node) {
    this.containerNode = node;
  }

  onContentRef = (node) => {
    this.content = node;
  };

  onFooterRef = (node) => {
    this.footer = node;
  };

  getNewSiteClassName() {
    const { name: themeName } = this.context.theme;
    return isCustomizedTheme(themeName) === undefined ?
      'an-app an-app--theme-new' :
      'an-app an-app--theme-legacy';
  }

  updateFooterStick = () => {
    const container = this.containerNode;
    const footer = this.footer.node;

    const windowHeight = window.innerHeight;
    let pageHeight = container.offsetHeight;
    if (this.footerStuck) {
      pageHeight += footer.offsetHeight;
    }
    const nextFooterStuck = windowHeight > pageHeight;
    const footerStickyClassName = 'an-footer__sticky';

    if (this.footerStuck !== nextFooterStuck) {
      if (nextFooterStuck) {
        addClass(footer, footerStickyClassName);
      } else {
        removeClass(footer, footerStickyClassName);
      }
      this.footerStuck = nextFooterStuck;
    }
  }

  render() {
    const { routes, params, children, responsive: { isLg } } = this.props;
    const validRoutes = routes.filter(route => (!!route.path));
    const { pageHeaderOptions } = validRoutes[validRoutes.length - 1] || {};
    const pageTitle = (pageHeaderOptions && pageHeaderOptions.title) ?
                          pageHeaderOptions.title : null;

    return (
      <div
        className={this.getNewSiteClassName()}
        ref={this.onContainerRef}
      >
        <div
          aria-live="polite" tabIndex={-1}
          className="page-load-accessibility-hook"
          ref={n => (this.pageLoadAccessibilityHook = n)}
        >
          {`${pageTitle}, View loaded`}
        </div>
        { isLg ? <Header /> : <MobileHeader /> }
        { isLg ? <Navigation routes={routes} /> : <MobileNavigation routes={routes} /> }
        <Content
          ref={this.onContentRef}
          routes={routes}
          params={params}
        >
          {children}
        </Content>
        <Footer ref={this.onFooterRef} />
        { isLg || <BackTop visibilityHeight={1} /> }
      </div>
    );
  }
}

export default withResponsiveProvider(connect(
  state => ({
    theme: state.systemSettings.getIn(['customizeStyle', 'current_theme'])
  }), {
    syncLegacyCuiAction,
    fetchShoppingCartCountAction
  }
)(Master));
