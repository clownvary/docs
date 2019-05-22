import React from 'react';
import classNames from 'classnames';
import isString from 'lodash/isString';
import { FormattedMessage, FormattedHtmlMessage } from 'shared/translation/formatted';
import commonMessages from 'shared/translation/messages/common';

import './index.less';
import 'shared/assets/images/img-active-logo.png';

export default class PageHeader extends React.PureComponent {

  static contextTypes = {
    configurations: React.PropTypes.object
  }

  static defaultProps = {
    classes: 'page-header',
    showLogo: true,
    altLogo: {...commonMessages.logoAlt},
    imgPath: '/images/img-active-logo.png'
  }

  render() {
    const {
      routes=[],
      className, classes, imgPath, showLogo, altLogo,
      children, ...rest
    } = this.props;

    const { configurations } = this.context;
    const validRoutes = routes.filter((route) => !!route.path);

    const { pageHeaderOptions } = validRoutes[validRoutes.length - 1] || {};
    const specificContent = (pageHeaderOptions && pageHeaderOptions.specificContentId) ?
      configurations.get(pageHeaderOptions.specificContentId)
      : '';

    const title = (pageHeaderOptions && pageHeaderOptions.title) ? pageHeaderOptions.title : null;
    let pageTitle = undefined;
    if (title){
      if (isString(title)){
        pageTitle = <h1>{title}</h1>;
      }else{
        pageTitle = <h1><FormattedMessage {...title} /></h1>;
      }
    }
    return (
      <div
        {...rest}
        className={classNames(classes, className)}>
        {children}
        {
          showLogo && !configurations.get('hide_active_branding') ? <div className="logo-wrapper"><img src={`${window.__akamaiUrl}${imgPath}`} alt={altLogo.defaultMessage} /></div> : undefined
        }
        {pageTitle}
        {
          specificContent ?
            <div className='page-header-specific'>
                <FormattedHtmlMessage value={specificContent} />
            </div> : undefined
        }
      </div>
    )
  }

}
