import React, { Component } from 'react';
import radium from 'radium';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import 'shared/assets/images/poweredbyactive_Reversed.png';

import ActiveLogo from './ActiveLogo';
import SiteLinks from './SiteLinks';
import TextNotice from './TextNotice';
import SeparationLine from './SeparationLine';

import './index.less';


export class Footer extends Component {

  static contextTypes = {
    configurations: React.PropTypes.object,
    systemSettings: React.PropTypes.object
  }

  onContainerRef = (node) => {
    this.node = node;
  }

  render() {
    const { configurations, systemSettings } = this.context;
    const { active_links: activeLinks, site_links: siteLinks,
      site_info: siteInfo, methods_of_payment: methodsOfPayment,
      have_questions: haveQuestions, custom_content: customContent,
      copy_right: copyRight } = systemSettings.get('footer').toJS();

    return (
      <div className="an-footer" ref={this.onContainerRef}>
        <div className="an-footer__wrapper">
          <div className="an-grid an-col-mg-12 an-footer__site-notice">
            <div className="an-col an-col-3-9">
              <TextNotice data={siteInfo} />
            </div>
            <div className="an-col an-col-3-9">
              <TextNotice data={methodsOfPayment} />
              <TextNotice data={haveQuestions} />
            </div>
            <div className="an-col an-col-2-9">
              <TextNotice data={customContent} />
            </div>
          </div>
          <SeparationLine />
          <div className="an-footer__links">
            <SiteLinks siteLinks={activeLinks} isActiveLinks />
            <SiteLinks siteLinks={siteLinks} />
            <p className="an-footer__copyright">
              <span dangerouslySetInnerHTML={{ __html: decodeHtmlStr(copyRight ? copyRight.title : '') }} />
            </p>
            <ActiveLogo showLogo={!configurations.get('hide_active_branding')} />
          </div>
        </div>
      </div>
    );
  }
}

export default radium(Footer);
