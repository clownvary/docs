import React from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-base-ui/lib/components/LoadingBar';
import { isIE } from 'react-base-ui/lib/utils/browser';

export class Public extends React.PureComponent {

  render() {
    let DevTools;
    const { loading } = this.props;
    /* istanbul ignore next */
    if ((__STATIC__ || __DEV__) && !__TESTING__) {
      /* eslint-disable */
      DevTools = require('shared/components/DevTools');
      isIE() && require("babel-polyfill");
      /* eslint-enable */
    }
    /* istanbul ignore next */
    return (
      <div>
        {this.props.children}
        {DevTools && <DevTools />}
        <LoadingBar className={!loading.get('display') && 'u-hidden'} fullScreen />
      </div>
    );
  }
}

export default connect(
  state => ({
    loading: state.loading
  })
)(Public);
