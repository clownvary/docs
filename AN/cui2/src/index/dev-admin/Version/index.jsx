import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Icon } from 'react-base-ui/lib/components/SVG';
import MixedPage from 'shared/components/ErrorPage';
import { FormattedMessage } from 'shared/translation/formatted';
import commonMessages from 'shared/translation/messages/common';
import selfMessages from './translations';

import { readVersionAction } from './actions';

import './index.less';

export class Version extends React.PureComponent {
  static propTypes = {
    version: PropTypes.shape({}).isRequired
  }

  componentWillMount() {
    this.props.readVersionAction();
  }

  getResponseContent() {
    const { version, intl: { messages } } = this.props;
    const data = version.get('data');

    return version.get('successful') ?
      <div className="an-module-container read-config-successful">
        <h1><FormattedMessage {...selfMessages.successfulTitle} /></h1>
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
        <h2 className="u-color-secondarytext"><FormattedMessage {...selfMessages.failedTitle} /></h2>
      </MixedPage>;
  }

  render() {
    return this.props.version.get('loading') ?
      <MixedPage>
        <h2 className="u-color-secondarytext"><FormattedMessage {...commonMessages.loadingText} /></h2>
      </MixedPage> :
      this.getResponseContent();
  }

}

export default injectIntl(connect(
  state => ({
    version: state.dev.version
  }),
  {
    readVersionAction
  }
)(Version));
