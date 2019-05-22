
import React from 'react';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import context, { childContextTypes } from 'utils/context';

import { FormattedMessage } from 'shared/translation/formatted';
import CreditCardTab from 'index/modules/Cart/Checkout/components/PaymentComponent/CreditCard/Tab';
const setup = (_context = context) => {
  const component = mountWithIntl(
    <CreditCardTab />,
    { context: _context, childContextTypes }
  );

  return {
    component
  };
};

describe('index/modules/Cart/Checkout/components/PaymentComponent/CreditCard/Tab', () => {
  it('should render component correctly', () => {
    const { component } = setup();
    component.render();
    expect(component.length).toEqual(1);
  });
  it('should include style class icon-credit-card-m', () => {
    const { component } = setup();
    expect(component.find('.icon-svg-credit-card-m').length).toEqual(1);
  });
  it('should include FormattedMessage correctly', () => {
    const { component } = setup();
    expect(component.find(FormattedMessage).length).toEqual(1);
  });
});
