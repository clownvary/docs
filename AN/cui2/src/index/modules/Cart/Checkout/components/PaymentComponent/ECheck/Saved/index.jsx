import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Radio } from 'react-base-ui/lib/components/Radio';
import { withResponsiveProvider } from 'react-base-ui/lib/services/responsive';

import { FormattedMessage } from 'shared/translation/formatted';
import selfMessages from '../translations';
import { AccountTypes } from '../../consts/eCheck';
import { decodeCardNumber } from '../../utils/decodeCardNumber';

export class SavedECheck extends React.Component {

  static propTypes = {
    name: PropTypes.string,
    data: PropTypes.shape({}),
    typeName: PropTypes.string,
    responsive: PropTypes.shape({}),
    onItemSelectedChange: PropTypes.func.isRequired
  }

  render() {
    const { name, data, typeName, onItemSelectedChange, responsive } = this.props;
    const isVisibility = data && data.size && data.get('list').size;

    return isVisibility ? (
      <div className="layout-width-limited">
        <ul className="card-list">
          {
            data.get('list').map((card, i) => {
              const isChecked = data.getIn(['selected', 'id']) === card.get('id');
              return (
                <li key={i} className={classNames('card-item', { 'card-item-active': isChecked })}>
                  <Radio
                    name={`${name}_ecp_radio`}
                    value={card.get('id')}
                    onChange={(e) => {
                      onItemSelectedChange(typeName, e.target.value);
                    }}
                    checked={isChecked}
                  >
                    <div className="an-grid">
                      <div className="an-col an-col-3-8 card-item-title">
                        {
                          card.get('account_type') === AccountTypes.SAVINGS && <FormattedMessage {...selfMessages.savings} />
                        }
                        {
                          card.get('account_type') === AccountTypes.CHECKING && <FormattedMessage {...selfMessages.checking} />
                        }
                      </div>
                      <div className="an-col an-col-5-8 card-item-info">
                        <p className="card-item-number">{`**** ${decodeCardNumber(card.get('account_number'))}`}</p>
                        {
                           !responsive.isSm ?
                            (<p className="card-item-petitInfo u-color-secondarytext">
                              <FormattedMessage {...selfMessages.routingNumber} />{` **** ${decodeCardNumber(card.get('routing_number'))}`}
                            </p>) :
                            (<div>
                              <p className="card-item-petitInfo u-color-secondarytext">
                                <FormattedMessage {...selfMessages.routingNumber} />
                              </p>
                              <p className="card-item-petitInfo u-color-secondarytext">
                                {` **** ${decodeCardNumber(card.get('routing_number'))}`}
                              </p>
                            </div>
                            )
                        }
                      </div>
                    </div>
                  </Radio>
                </li>
              );
            })
          }
        </ul>
      </div>
    ) : null;
  }
}
export default withResponsiveProvider(SavedECheck);
