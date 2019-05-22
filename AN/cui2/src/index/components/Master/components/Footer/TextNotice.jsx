import React from 'react';
import { FormattedHtmlMessage } from 'shared/translation/formatted';
import locationHelp from 'shared/utils/locationHelp';

/* eslint-disable no-script-url */

export default class TextNotice extends React.PureComponent {
    // Specifies the default values for props:
  static defaultProps = {
    title: '<<Notice title>>',
    items: [{
      title: '<<item  title here.>>',
      url: null
    }],
    cssStyle: 'an-footer__site-notice__wrapper'
  }
  render() {
    const cssStyle = this.props.cssStyle;
    const data = this.props.data || {};
    const title = data.title || '';
    const items = data.items || [];

    const domContents = [];
    items.forEach((item, index) => {
      domContents.push(
        <dd key={index}>
          {
            !item.url ?
              <FormattedHtmlMessage value={item.title} /> :
              <a
                href="javascript:void(0)"
                role="button"
                onClick={() => locationHelp.redirect(item.url)}
              >
                <FormattedHtmlMessage value={item.title} />
              </a>
          }
        </dd>
            );
    });
    return (
      <dl className={cssStyle}>
        <dt>
          <FormattedHtmlMessage value={title} />
        </dt>
        { domContents }
      </dl>);
  }
}
