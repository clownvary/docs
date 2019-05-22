import React from 'react';
import { fromJS } from 'immutable';
import { shallow, mount } from 'enzyme';// eslint-disable-line
import NoTransactions from 'index/modules/Cart/ShoppingCart/components/NoTransactions';
import { FormattedHtmlMessage } from 'shared/translation/formatted';
import context, { childContextTypes } from 'utils/context';// eslint-disable-line

function setup(_context = context) {
  const component = mount(<NoTransactions />,
    { context: _context, childContextTypes });
  return {
    component,
    formattedHtmlMessage: component.find(FormattedHtmlMessage)
  };
}

describe('index/modules/Cart/ShoppingCart/components/NoTransactions', () => {
  it('should render message correctly', () => {
    const defaultMessage = 'Your shopping cart is empty.';
    const { formattedHtmlMessage } = setup();
    expect(formattedHtmlMessage.prop('value')).toEqual(defaultMessage);

    const testMessage = 'this is test msg';
    const tempContext = { configurations: fromJS({ empty_cart_message_tips_text: testMessage }) };
    const { formattedHtmlMessage: formattedHtmlMessage2 } = setup(tempContext);
    expect(formattedHtmlMessage2.prop('value')).toEqual(testMessage);
  });
});
