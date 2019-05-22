import React from 'react';
import PropTypes from 'prop-types';
import { withResponsiveProvider } from 'react-base-ui/lib/services/responsive';
import { Icon } from 'react-base-ui/lib/components/SVG';

import { injectIntl } from 'react-intl';
import socialSharingMessages from 'shared/translation/messages/socialSharing';
import './index.less';
export class SocialSharing extends React.PureComponent {
  static propTypes = {
    parameters: PropTypes.shape({}).isRequired
  };
  static defaultProps = {
    width: 650,
    height: 590
  }
  getURL(name){
    const { parameters } = this.props;
    const parameter = (name === 'twitterWindow') ? parameters.twitterParameter : parameters.facebookParameter;
    let url = (name === 'twitterWindow') ? 'https://twitter.com/share?url=' : 'https://www.facebook.com/share.php?u=';
    url += parameter;
    return url;
  }
  openwindow(name) {
    const { width, height } = this.props;
    const iTop = (window.screen.availHeight - height) / 2;
    const iLeft = (window.screen.availWidth - width) / 2;
    const url = this.getURL(name);
    window.open(url, name, `height=${height},width=${width},top=${iTop},left=${iLeft},toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no`);
  }
  render() {
    const { responsive: { isLg }, intl: { messages } } = this.props;
    return (
            <div className="an-social-sharing">
            {
              isLg ? <div>
                        <a
                          href="javascript:void(0);"
                          className="an-social-sharing__link"
                          aria-label={messages[socialSharingMessages.facebookAriaLabelText.id]}
                          onClick={() => {
                            this.openwindow('facebookWindow');
                          }}
                        >
                          <Icon
                            name="facebook-rounded"
                            aria-label="facebook icon"
                            className="icon-facebook"
                            title={messages[socialSharingMessages.facebookTooltip.id]}
                          />
                        </a>
                        <a
                          href="javascript:void(0);"
                          className="an-social-sharing__link"
                          aria-label={messages[socialSharingMessages.twitterAriaLabelText.id]}
                          onClick={() => {
                            this.openwindow('twitterWindow');
                          }}
                        >
                          <Icon
                            name="twitter-rounded"
                            aria-label="twitter icon"
                            className="icon-twitter"
                            title={messages[socialSharingMessages.twitterTooltip.id]}
                          />

                        </a>
                    </div> :
                    <div>
                        <a
                          className="an-social-sharing__link"
                          aria-label={messages[socialSharingMessages.facebookAriaLabelText.id]}
                          href={this.getURL('facebookWindow')}
                          target="_blank"
                        >
                          <Icon
                            name="facebook-rounded"
                            aria-label="facebook icon"
                            className="icon-facebook"
                            title={messages[socialSharingMessages.facebookTooltip.id]}
                          />
                        </a>
                        <a
                          className="an-social-sharing__link"
                          aria-label={messages[socialSharingMessages.twitterAriaLabelText.id]}
                          href={this.getURL('twitterWindow')}
                          target="_blank"
                        >
                          <Icon
                            name="twitter-rounded"
                            aria-label="twitter icon"
                            className="icon-twitter"
                            title={messages[socialSharingMessages.twitterTooltip.id]}
                          />
                        </a>
                    </div>
            }
            </div>
    );
  }
}
export default injectIntl(withResponsiveProvider(SocialSharing));
