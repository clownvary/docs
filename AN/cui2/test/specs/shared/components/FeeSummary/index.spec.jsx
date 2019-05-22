import React from 'react';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import FeeSummary from 'shared/components/FeeSummary';

describe('index/modules/Daycare/EnrollForm/components/FeeSummary', () => {
  const defaultProps = {
    className: 'test-fee-summary',
    feeItems: [
      {
        className: 'item-1',
        name: { id: 'subtotal-id', defaultMessage: 'subtotal wording' },
        value: 10.0
      },
      {
        className: 'item-2',
        name: { id: 'taxes-id', defaultMessage: 'taxes wording' },
        value: 1.0
      },
      {
        className: 'item-3',
        name: { id: 'processing-fee-id', defaultMessage: 'processing fee wording' },
        value: 3.0
      },
      {
        className: 'item-4',
        name: { id: 'gift-card-id', defaultMessage: 'gift card wording' },
        value: 0.0
      }
    ],
    totalItem: {
      name: { id: 'total-id', defaultMessage: 'total wording' },
      value: 14.0
    }

  };

  const setup = (props) => {
    const component = mountWithIntl(
      <FeeSummary
        {...defaultProps}
        {...props}
      />);
    return {
      component
    };
  };

  it('should renders correctly with default props', () => {
    const { component } = setup();
    expect(component.find('.is-unexpanded')).toHaveLength(0);
    const summaryItems = component.find('li');
    expect(summaryItems).toHaveLength(3);
    expect(summaryItems.at(0).find('.field-label').text()).toEqual('subtotal wording');
    expect(summaryItems.at(0).find('.field-value').text()).toEqual('$10.00');
    expect(summaryItems.at(1).find('.field-label').text()).toEqual('taxes wording');
    expect(summaryItems.at(1).find('.field-value').text()).toEqual('$1.00');
    expect(summaryItems.at(2).find('.field-label').text()).toEqual('processing fee wording');
    expect(summaryItems.at(2).find('.field-value').text()).toEqual('$3.00');
    expect(component.find('strong').text()).toEqual('total wording');
    expect(component.find('b').text()).toEqual('$14.00');
  });

  it('should renders correctly with default props if not hide zero item', () => {
    const { component } = setup({ hideZeroItem: false });
    const summaryItems = component.find('li');
    expect(summaryItems).toHaveLength(4);
  });

  it('should renders correctly if it\'s collapsed', () => {
    const { component } = setup({ expanded: false });
    expect(component.find('.fee-summary.is-unexpanded')).toHaveLength(1);
    expect(component.find('.fee-summary-list')).toHaveLength(0);
    expect(component.find('.an-split-line')).toHaveLength(0);
    expect(component.find('.fee-summary-total.is-unexpanded')).toHaveLength(1);
  });
});
