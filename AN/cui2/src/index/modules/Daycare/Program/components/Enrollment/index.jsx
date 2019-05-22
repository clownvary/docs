import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { injectIntl } from 'react-intl';
import Button from 'react-base-ui/lib/components/Button';
import { formatI18n } from 'shared/translation/formatI18n';
import { FormattedNumber } from 'shared/translation/formatted';
import selfMessages from './translations';

import './index.less';

class Enrollment extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showInfo: true
    };
  }

  handleCloseInfoClick = () => {
    this.setState({ showInfo: false });
  };

  renderEstimatePrice = () => {
    const { intl: { messages }, feeSummary } = this.props;
    const { fetched, free, individualSelection, estimatePrice } = feeSummary.toJS();
    if (!fetched) {
      return null;
    }
    return (
      <div className="program-enrollment__price">
        {
          free || (
            <div className="program-enrollment__start-at">
              {formatI18n(messages[selfMessages.startingAt.id])}
            </div>
          )
        }
        <div className="program-enrollment__estimate">
          {
            <div className="program-enrollment__estimate__value u-color-moneytext">
              {
                free ?
                  formatI18n(messages[selfMessages.free.id]) :
                  <FormattedNumber numberStyle="currency" currency="USD" value={estimatePrice} />
              }
            </div>
          }
          {
            (!free && individualSelection) && (
              <div className="program-enrollment__estimate__post">
                {formatI18n(messages[selfMessages.perSession.id])}
              </div>
            )
          }
        </div>
      </div>
    );
  };

  render() {
    const {
      intl: { messages }, status, sessionUnavailable, stuck, className,
      isSm, isMd
    } = this.props;
    const { enabled, inPersonEnabled, generalMessage, startMessage, endMessage } = status;
    const disabled = !enabled || sessionUnavailable;
    return (
      <div
        className={classNames(className, 'an-panel', 'an-grid', 'program-enrollment', { 'is-sticky': stuck })}
      >
        { !(isSm || isMd) && this.renderEstimatePrice()}
        {
          (this.state.showInfo || !isSm) && (
            <div className="program-enrollment__info">
              <div>
                {
                  generalMessage &&
                  <div
                    className={classNames('program-enrollment__message', {
                      'is-opening': enabled || startMessage || endMessage,
                      'is-opening-in-person': inPersonEnabled
                    })}
                  >
                    {generalMessage}
                  </div>
                }
                {
                  startMessage &&
                  <div className="program-enrollment__time">
                    {startMessage}
                  </div>
                }
                {
                  endMessage &&
                  <div
                    className="program-enrollment__time"
                  >
                    {endMessage}
                  </div>
                }
              </div>
              {
                isSm &&
                <i className="icon icon-close" onClick={this.handleCloseInfoClick} />
              }
            </div>
          )
        }
        <div className="program-enrollment__enroll-btn-container">
          { (isSm || isMd) && this.renderEstimatePrice()}
          <Button
            type="strong"
            className="program-enrollment__enroll-btn"
            disabled={disabled}
            onClick={this.props.onEnrollNow}
          >
            {
              (enabled && sessionUnavailable) ?
                formatI18n(messages[selfMessages.noVacancy.id]) :
                formatI18n(messages[selfMessages.enrollNow.id])
            }
          </Button>
        </div>
      </div>
    );
  }
}

export default injectIntl(Enrollment);
