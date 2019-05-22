import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GlobalizeSink } from 'react-base-ui/lib/services/i18n';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import isLoginCustomerId from 'shared/utils/isLoginCustomerId';


class AppRoot extends Component {

  static childContextTypes = {
    orgPath: PropTypes.string,
    configurations: PropTypes.object,
    systemSettings: PropTypes.object,
    theme: PropTypes.shape(
      {
        name: PropTypes.string,
        customizedColors: PropTypes.object
      }
    ),
    getWording: PropTypes.func,
    isLoginUser: PropTypes.func
  }

  static propTypes = {
    orgPath: PropTypes.string,
    configurations: PropTypes.shape({}),
    systemSettings: PropTypes.shape({}),
    intl: PropTypes.shape({}),
    children: PropTypes.node
  }

  getChildContext() {
    const { orgPath, configurations, systemSettings } = this.props;
    return {
      orgPath,
      configurations,
      systemSettings,
      theme: {
        name: systemSettings.getIn(['customizeStyle', 'current_theme']),
        customizedColors: systemSettings.getIn(['customizeStyle', 'customized_theme'])
      },
      getWording: this.getWording.bind(this),
      isLoginUser: this.isLoginUser.bind(this)
    };
  }

  getWording(key) {
    const { configurations } = this.props;
    return key ? configurations.get(key) : undefined;
  }

  isLoginUser() {
    const { systemSettings } = this.props;
    const customerId = systemSettings.getIn(['user', 'customerid']);
    return isLoginCustomerId(customerId);
  }

  render() {
    const { intl, children } = this.props;
    const { currentLocale, defaultLocale, messages } = intl.toJS();

    return (
      <IntlProvider
        defaultLocale={defaultLocale}
        locale={currentLocale}
        key={currentLocale}
        messages={messages[currentLocale]}
      >
        <div className="cui">
          <GlobalizeSink onIntlChange={() => null} />
          <div style={{ height: '100%' }}>
            {children}
          </div>
        </div>
      </IntlProvider>
    );
  }
}

export default connect(
  state => ({
    intl: state.intl,
    orgPath: state.currentSite,
    configurations: state.configurations,
    systemSettings: state.systemSettings
  })
)(AppRoot);
