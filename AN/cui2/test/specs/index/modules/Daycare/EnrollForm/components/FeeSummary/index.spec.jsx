import React from 'react';
import { fromJS } from 'immutable';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import { Icon } from 'react-base-ui/lib/components/SVG';
import CommonFeeSummary from 'shared/components/FeeSummary';
import { FeeSummary } from 'index/modules/Daycare/EnrollForm/components/FeeSummary';

describe('index/modules/Daycare/EnrollForm/components/FeeSummary', () => {
  const feeSummary = {
    subTotal: 10.0,
    tax: 0.95,
    total: 10.95
  };

  const setup = (props) => {
    const component = mountWithIntl(
      <FeeSummary
        feeSummary={fromJS(feeSummary)}
        {...props}
      />
    );

    return {
      component
    };
  };

  it('should renders correctly', () => {
    const { component } = setup({ responsive: { isSm: false, isMd: false } });
    const summaryItems = component.find('li');
    expect(summaryItems).toHaveLength(2);
    expect(summaryItems.at(0).find('.field-label').text()).toEqual('Subtotal');
    expect(summaryItems.at(0).find('.field-value').text()).toEqual('$10.00');
    expect(summaryItems.at(1).find('.field-label').text()).toEqual('Taxes');
    expect(summaryItems.at(1).find('.field-value').text()).toEqual('$0.95');
    expect(component.find('strong').text()).toEqual('Total');
    expect(component.find('b').text()).toEqual('$10.95');
    expect(component.find('button').text()).toEqual('Add to cart');
  });

  it('if refund < 0 should renders correctly', () => {
    const component =
      mountWithIntl(<FeeSummary responsive={{ isLg: false }} feeSummary={fromJS({ ...feeSummary, refund: -3 })} />);

    const summaryItems = component.find('li');
    expect(summaryItems).toHaveLength(3);
    expect(summaryItems.at(2).find('.field-label').text()).toEqual('Refund of Prior Enrollment');
    expect(summaryItems.at(2).find('.field-value').text()).toEqual('-$3.00');
  });

  it('should render summary title on mobile or tablet', () => {
    const { component } = setup({ responsive: { isSm: true, isMd: false, isLg: false } });
    const summaryTitle = component.find('a');
    expect(summaryTitle).toHaveLength(1);
  });

  it('should have correct state of summary title', () => {
    const { component } = setup({ responsive: { isSm: true, isMd: false, isLg: false } });
    const icon = component.find(Icon);
    const summaryTitle = component.find('a');
    expect(icon.prop('name')).toContain('down');
    expect(icon.prop('aria-label')).toContain('down');
    expect(component.find(CommonFeeSummary)).toHaveLength(0);

    summaryTitle.simulate('click');
    expect(icon.prop('name')).toContain('up');
    expect(icon.prop('aria-label')).toContain('up');
    expect(component.find(CommonFeeSummary)).toHaveLength(1);
  });
});
