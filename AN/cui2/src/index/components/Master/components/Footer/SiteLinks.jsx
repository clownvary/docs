import React from 'react';
import radium from 'radium';
import { FormattedHtmlMessage } from 'shared/translation/formatted';

export class SiteLinks extends React.PureComponent {

  static contextTypes = {
    configurations: React.PropTypes.object
  }

  // Specifies the default values for props:
  static defaultProps = {
    siteLinks: []
  }

  render() {
    const { siteLinks, isActiveLinks } = this.props;
    const { configurations } = this.context;

    return (
      <div className="an-footer__links__wrapper">
        <div className="an-footer__links__item">
          { siteLinks.map((link, index) => {
            const linkDom = link.url ?
                (
                  <a
                    id={`anchor-description-${index}`}
                    href={`#anchor-description-${index}`}
                    onClick={(e) => {
                      window.open(link.url, 'l1'); e.preventDefault();
                    }}
                  >
                    <FormattedHtmlMessage value={link.title} />
                  </a>
                ) :
                (
                  <FormattedHtmlMessage value={link.title} />
                );
            const updated = configurations.get('new_privacy_policy') &&
              isActiveLinks &&
              link.title === 'Your Privacy Rights' ?
                (<b>: <font color="#FBAD18">Updated</font></b>) : null;
            return (
              <span key={index}>{ linkDom }{ updated }</span>
            );
          }) }
        </div>
      </div>
    );
  }
}

export default radium(SiteLinks);
