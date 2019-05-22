import React from 'react';
import PropTypes from 'prop-types';

import { KeyCode } from '../../consts';
import { listenKeyDown } from '../../utils';

const HeaderPropTypes = {
  onPrevClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
  onTitleClick: PropTypes.func.isRequired,
  onTodayClick: PropTypes.func.isRequired,

  title: PropTypes.string.isRequired,
  displayToday: PropTypes.bool.isRequired,
  todayLabel: PropTypes.string.isRequired,
  prefix: PropTypes.string.isRequired
};

class Header extends React.PureComponent {
  static displayName = 'Header';
  static propTypes = HeaderPropTypes;

  render() {
    return (
      <div className={`${this.props.prefix}calendar-header`}>
        <i
          className="icon icon-chevron-left"
          onClick={this.props.onPrevClick}
          tabIndex={0}
          onKeyDown={e => listenKeyDown(e,
            [KeyCode.ENTER, KeyCode.SPACE],
            () => this.props.onPrevClick())
          }
        />
        {
          this.props.displayToday && (
          <span
            className={`${this.props.prefix}calendar-header-today`}
            onClick={this.props.onTodayClick}
            tabIndex={0}
            onKeyDown={e => listenKeyDown(e,
              [KeyCode.ENTER, KeyCode.SPACE],
              () => this.props.onTodayClick())
            }
          >{this.props.todayLabel}</span>)
        }
        <span
          className={`${this.props.prefix}calendar-header-title`}
          onClick={this.props.onTitleClick}
          tabIndex={0}
          onKeyDown={e => listenKeyDown(e,
            [KeyCode.ENTER, KeyCode.SPACE],
            () => this.props.onTitleClick())
          }
        >{this.props.title}</span>
        <i
          className="icon icon-chevron-right"
          onClick={this.props.onNextClick}
          tabIndex={0}
          onKeyDown={e => listenKeyDown(e,
            [KeyCode.ENTER, KeyCode.SPACE],
            () => this.props.onNextClick())
          }
        />
      </div>
    );
  }
}

export default Header;
