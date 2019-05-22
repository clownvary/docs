import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Icon } from 'react-base-ui/lib/components/SVG';
import MixedPage from 'shared/components/ErrorPage';
import { FormattedMessage } from 'shared/translation/formatted';
import commonMessages from 'shared/translation/messages/common';

import selfMessages from './translations';

import { readConfigurationAction } from './actions';
import { readVersionAction } from '../Version/actions';
import { DEFAULTSITEID } from './consts';

import './index.less';

export class Configuration extends React.PureComponent {
  static propTypes = {
    configuration: PropTypes.shape({}).isRequired,
    params: PropTypes.shape({
      siteIds: PropTypes.string
    }).isRequired,
    location: PropTypes.shape({
      search: PropTypes.string
    }).isRequired
  }

  componentWillMount() {
    const siteIds = this.getSiteIds();
    this.props.readConfigurationAction(siteIds);
    this.props.readVersionAction();
  }

  getSiteIds() {
    const { params: { siteIds }, location: { search } } = this.props;
    return siteIds || search || DEFAULTSITEID;
  }

  getResponseContent() {
    const { configuration, intl: { messages }, cuiVersion, auiVersion } = this.props;
    const data = configuration.get('data');

    return configuration.get('successful') ?
      <div className="an-module-container read-config-successful">
        <h1>
          <FormattedMessage {...selfMessages.successfulTitle} />
          <b className="u-color-secondarytext">{` [${configuration.get('siteId')}]`}</b>
          <div className="version">
            <FormattedMessage
              {...selfMessages.cuiVersionTitle}

              values={{ version: cuiVersion }}
            />
          </div>
          <div className="version">
            <FormattedMessage
              {...selfMessages.auiVersionTitle}

              values={{ version: auiVersion }}
            />
          </div>
        </h1>
        <table className="an-simple-table an-sm-simple-table">
          <thead>
            <tr>
              <td width="10%"><FormattedMessage {...selfMessages.gridTitleNumber} /></td>
              <td width="40%"><FormattedMessage {...selfMessages.gridTitleKey} /></td>
              <td width="50%"><FormattedMessage {...selfMessages.gridTitleValue} /></td>
            </tr>
          </thead>
          <tbody>
            {
              data.entrySeq()
                  .sort((a, b) => a[0].localeCompare(b[0]))
                  .toList().map((seqData, index) => (
                    <tr key={index + 1}>
                      <td data-label={`${messages[selfMessages.gridTitleNumber.id]}: `}>{index + 1}</td>
                      <td data-label={`${messages[selfMessages.gridTitleKey.id]}: `} className="read-config-col-bold">{seqData[0]}</td>
                      <td data-label={`${messages[selfMessages.gridTitleValue.id]}: `}>{String(seqData[1])}</td>
                    </tr>
              ))
            }
          </tbody>
        </table>
      </div> :
      <MixedPage className="read-config-failed">
        <Icon
          name="remove"
          aria-label="remove icon"
        />
        <h2><FormattedMessage {...selfMessages.failedTitle} /></h2>
      </MixedPage>;
  }

  render() {
    return this.props.configuration.get('loading') ?
      <MixedPage>
        <h2 className="u-color-secondarytext"><FormattedMessage {...commonMessages.loadingText} /></h2>
      </MixedPage> :
      this.getResponseContent();
  }

}

export default injectIntl(connect(
  state => ({
    configuration: state.dev.configuration,
    cuiVersion: state.dev.version.getIn(['data', 'cui_version']),
    auiVersion: state.dev.version.getIn(['data', 'aui_version'])
  }),
  {
    readConfigurationAction,
    readVersionAction
  }
)(Configuration));
