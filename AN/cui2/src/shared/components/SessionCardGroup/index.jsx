import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'shared/translation/formatted';
import Card from 'shared/components/Card';
import SessionCard from '../SessionCard';
import { ALL, INDIVIDUAL, WEEKLY } from './selectionMode';
import selfMessages from './translations';

import './index.less';

class SessionCardGroup extends React.PureComponent {
  static propTypes = {
    orderable: PropTypes.bool,
    selectable: PropTypes.bool,
    deletable: PropTypes.bool,
    mode: PropTypes.oneOf([ALL, INDIVIDUAL, WEEKLY]),
    sessions: PropTypes.arrayOf(PropTypes.object),
    selectedSessionIds: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    onSelect: PropTypes.func
  };

  static defaultProps = {
    orderable: false,
    selectable: false,
    deletable: false,
    individualSelect: false,
    sessions: [],
    selectedSessionIds: [],
    exceptionDates: {},
    extraDates: {}
  };

  onSessionSelect = (sessionId, select) => {
    const { mode, sessions, selectedSessionIds, onSelect } = this.props;
    let sessionIds = [];
    if (mode === INDIVIDUAL) {
      if (select) {
        sessionIds = selectedSessionIds.concat(sessionId);
      } else {
        sessionIds = selectedSessionIds.filter(sid => sid !== sessionId);
      }
    } else if (select) {
      sessionIds = sessions
        .filter(session => session.is_enable && session.session_id)
        .map(session => session.session_id);
    }

    return onSelect(sessionIds);
  };

  getSessionSelectProps = () => {
    const { selectable, mode } = this.props;
    const selectProps = {};
    if (selectable) {
      selectProps.selectable = selectable;
      selectProps.onSelect = this.onSessionSelect;
      selectProps.mode = mode;
    }
    return selectProps;
  };

  render() {
    const {
      className, selectedSessionIds, sessions, orderable, deletable, children, onDelete, exceptionDates, extraDates,
      selectable
    } = this.props;
    const selectProps = this.getSessionSelectProps();
    return (
      <div className={classNames('session-card-group', className)}>
        {
          sessions.map((session, index) => (
            <SessionCard
              key={`session-card-${index}`}
              orderable={orderable}
              index={index}
              session={session}
              exceptionDate={exceptionDates[session.session_id]}
              extraDate={extraDates[session.session_id]}
              selected={selectedSessionIds.indexOf(session.session_id) >= 0}
              disabled={selectable && !session.is_enable}
              deletable={deletable}
              onDelete={onDelete}
              {...selectProps}
            />
          ))
        }
        {children}
        {
          sessions.length === 0 && !children &&
          <Card className="empty-session-card">
            <FormattedMessage {...selfMessages.sorry} />
            <FormattedMessage {...selfMessages.noSession} />
          </Card>
        }
      </div>
    );
  }
}

export default injectIntl(SessionCardGroup);
