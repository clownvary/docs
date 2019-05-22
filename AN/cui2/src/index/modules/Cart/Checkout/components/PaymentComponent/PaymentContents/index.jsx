import React from 'react';
import classnames from 'classnames';

import * as CreditCard from '../CreditCard/';
import * as ECheck from '../ECheck/';

import './index.less';

export default class PaymentContents extends React.Component {

  getContentComponent(typeName, typeValue) {
    const { name, selectedType, onItemSelectedChange, onPayItemAdded } = this.props;
    const prepareProps = {
      name, selectedType, onItemSelectedChange, onPayItemAdded
    };
    switch (typeValue.get('component')) {
      case CreditCard.name:
        return <CreditCard.default {...prepareProps} data={typeValue} typeName={typeName} />;
      case ECheck.name:
        return <ECheck.default {...prepareProps} data={typeValue} typeName={typeName} />;
      default:
        return '';
    }
  }

  render() {
    const { data, selectedType } = this.props;

    return (
      <div className="payment-comp-contents">
        {
          data.get('types').entrySeq().map(([typeName, typeValue]) => {
            const isSelected = selectedType === typeName;
            return (
              <div key={typeName} className={classnames('payment-comp-cont', { 'payment-comp-cont-active': isSelected })}>
                {
                  this.getContentComponent(typeName, typeValue)
                }
              </div>
            );
          })
        }
      </div>
    );
  }
}
