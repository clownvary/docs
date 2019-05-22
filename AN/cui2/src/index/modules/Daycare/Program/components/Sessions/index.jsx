import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Heading } from 'shared/components/Heading';
import SessionCardGroup from 'shared/components/SessionCardGroup';
import selfMessages from './translations';

import './index.less';

class Sessions extends React.PureComponent {
  static propTypes = {
    sessions: PropTypes.Object
  };

  static defaultProps = {
    sessions: []
  };

  renderTitle = (sessionsCount, messages) => {
    const sessionLabel = messages[
      sessionsCount && sessionsCount > 1
        ? selfMessages.sessions.id
        : selfMessages.session.id
      ];

    const countLabel = sessionsCount && sessionsCount > 0 ? `${sessionsCount} ` : '';

    return <Heading className="title">{`${countLabel}${sessionLabel}`}</Heading>;
  };

  render() {
    const { sessions: sessionState, intl: { messages } } = this.props;
    const fetched = sessionState.get('fetched');
    const sessions = sessionState.get('sessions').toJS();
    const exceptionDates = sessionState.get('exceptionDates').toJS();
    const extraDates = sessionState.get('extraDates').toJS();
    return (
      <div className="program__sessions">
        {this.renderTitle(sessions.length, messages)}
        {
          fetched && (
            <SessionCardGroup
              orderable
              sessions={sessions}
              exceptionDates={exceptionDates}
              extraDates={extraDates}
            />
          )
        }
      </div>
    );
  }
}

export default injectIntl(Sessions);
