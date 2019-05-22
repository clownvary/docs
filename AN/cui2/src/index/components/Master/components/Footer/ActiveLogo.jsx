import React from 'react';
import { injectIntl } from 'react-intl';
import selfMessages from './translations';

export class ActiveLogo extends React.PureComponent {

  render() {
    const { showLogo, intl: { messages } } = this.props;
    return (
      <div className="an-footer__logo">
        { showLogo ?
          <a
            id="anchor-description-logo"
            href="#anchor-description-logo"
            onClick={(event) => { window.open('http://www.activenetwork.com/', 'l1'); event.preventDefault(); }}
          >
            <img src={`${window.__akamaiUrl}/images/poweredbyactive_Reversed.png`} alt={messages[selfMessages.logoTitle.id]} />
          </a> : null }
      </div>
    );
  }

}

export default injectIntl(ActiveLogo);
