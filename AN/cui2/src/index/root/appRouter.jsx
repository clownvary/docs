import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useScroll } from 'react-router-scroll';
import { Router, applyRouterMiddleware } from 'react-router';
import { intlShape } from 'react-intl';
import debounce from 'lodash/debounce';
import { replace } from 'react-router-redux';
import { clearAll } from 'shared/utils/messages';
import { gaService } from 'shared/services';
import ScrollBehavior from 'scroll-behavior';
import configRoute from 'shared/utils/configRoute';

import routesCreator from './routes';

class CustomScrollBehavior extends ScrollBehavior {
  scrollToTarget = () => {
    window.scrollTo(0, 0);
    window.onbeforeunload = () => { window.scrollTo(0, 0); };
  }
}

export class AppRouter extends React.Component {

  static contextTypes = {
    intl: intlShape,
    store: PropTypes.shape({}),
    orgPath: PropTypes.string,
    getWording: PropTypes.func,
    configurations: PropTypes.object,
    systemSettings: PropTypes.shape({})
  }

  static propTypes = {
    history: React.PropTypes.shape({})
  }

  static defaultProps = {}

  componentDidMount() {
    const { history } = this.props;
    /**
     * Below code includes two fuctions:
     *  1. Clean url according to the excluded query list(src/index/root/consts/excludedQueries.js).
     *  2. Clear Alerts when the route changes.
     */
    history.listenBefore(() => {
      window.scrollTo(0, 0);
    });
    this.unlistenHistory = history.listen(() => {
      clearAll();
    });
  }

  componentWillUnmount() {
    this.unlistenHistory();
  }

  render() {
    const { history } = this.props;
    const routes = configRoute.getRoutes(routesCreator)({ ...this.context });

    return (
      <Router
        history={history}
        routes={routes}
        render={applyRouterMiddleware(useScroll({
          createScrollBehavior: config => new CustomScrollBehavior(config)
        }))}
        onUpdate={debounce(() => { gaService.getInstance().initPage(); }, 1000)}
      />
    );
  }
}

export default connect(
  null,
  {
    replace
  }
)(AppRouter);
