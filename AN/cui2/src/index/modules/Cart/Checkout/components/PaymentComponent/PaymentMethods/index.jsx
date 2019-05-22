import React from 'react';
import classnames from 'classnames';

import * as CreditCard from '../CreditCard/';
import * as ECheck from '../ECheck/';

import './index.less';

export default class PaymentMethods extends React.Component {
  render() {
    const { data, selectedType, onTypeChange } = this.props;
    const isVisibility = data.get('types').size > 1;

    return isVisibility ? (
      <div className="layout-width-limited">
        <div className="payment-comp-methods">
          {
            data.get('types').entrySeq().map(([typeName, typeValue]) => {
              const isSelected = selectedType === typeName;
              return (
                <div key={typeName} className={classnames('payment-comp__tab', { 'is-active': isSelected })}>
                  <button className="tab-box" onClick={() => onTypeChange(typeName)}>
                    {
                      (() => {
                        switch (typeValue.get('component')) {
                          case CreditCard.name:
                            return <CreditCard.Tab />;
                          case ECheck.name:
                            return <ECheck.Tab />;
                          default:
                            return '';
                        }
                      })()
                    }
                  </button>
                </div>
              );
            })
          }
        </div>
      </div>
    ) : null;
  }
}
