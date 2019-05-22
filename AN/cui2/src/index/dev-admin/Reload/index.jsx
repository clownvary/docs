import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-base-ui/lib/components/SVG';
import MixedPage from 'shared/components/ErrorPage';
import { FormattedMessage } from 'shared/translation/formatted';
import commonMessages from 'shared/translation/messages/common';
import selfMessages from './translations';

import { reloadSitesAction } from './actions';
import { DEFAULTSITEID } from './consts';

import './index.less';

export class Reload extends React.PureComponent {
  static propTypes = {
    reload: PropTypes.shape({}).isRequired,
    params: PropTypes.shape({
      siteIds: PropTypes.string
    }).isRequired,
    location: PropTypes.shape({
      search: PropTypes.string
    }).isRequired
  }

  componentWillMount() {
    const siteIds = this.getSiteIds();
    this.props.reloadSitesAction(siteIds);
  }

  getSiteIds() {
    const { params: { siteIds }, location: { search } } = this.props;
    return siteIds || search || DEFAULTSITEID;
  }

  getResponseContent() {
    return this.props.reload.get('successful') ?
      <MixedPage className="reload reload-successful">
        <Icon
          name="check"
        />
        <h2 className="u-color-secondarytext"><FormattedMessage {...selfMessages.successfulTitle} /></h2>
      </MixedPage> :
      <MixedPage className="reload reload-failed">
        <Icon
          name="remove"
          aria-label="remove icon"
        />
        <h2 className="u-color-secondarytext"><FormattedMessage {...selfMessages.failedTitle} /></h2>
      </MixedPage>;
  }

  render() {
    return this.props.reload.get('loading') ?
      <MixedPage>
        <h2 className="u-color-secondarytext"><FormattedMessage {...commonMessages.loadingText} /></h2>
      </MixedPage> :
      this.getResponseContent();
  }

}

export default connect(
  state => ({
    reload: state.dev.reload
  }),
  {
    reloadSitesAction
  }
)(Reload);
