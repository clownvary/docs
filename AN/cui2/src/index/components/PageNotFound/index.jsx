import React from 'react';
import { Icon } from 'react-base-ui/lib/components/SVG';
import ErrorPage from 'shared/components/ErrorPage';
import { FormattedMessage } from 'shared/translation/formatted';
import errorPageMessages from 'shared/translation/messages/errorPage';

export default class PageNotFound extends React.PureComponent {

  render() {
    return (
      <ErrorPage className="error-page-not-found">
        <Icon
          name="http-503"
        />
        <h2 className="u-color-secondarytext"><FormattedMessage {...errorPageMessages.pageNotFound_title} /></h2>
        <p><FormattedMessage {...errorPageMessages.pageNotFound_description} /></p>
      </ErrorPage>
    );
  }

}
