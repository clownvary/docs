import React from 'react';
import { fromJS } from 'immutable';
import Text from 'shared/components/Text';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import CouponItem from 'index/modules/Cart/ShoppingCart/components/Coupon/CouponItem';

const mouseEvents = {
  onMouseDown: jest.fn()
};

const initialState = fromJS({
  mouseEvents,
  active: false,
  selected: false,
  option: {
    coupon_id: 3,
    value: '6846516848964165168463521',
    text: '6846516848964165168463521',
    coupon_code: '6846516848964165168463521',
    coupon_title: 'Eric-daycare-coupon-fix-5',
    discount_type: 0,
    amount: 5,
    max_uses: 0,
    max_uses_per_customer: 0,
    dcprogram_id: 1071,
    dcprogram_name: 'EricDC-NoChoice01',
    appliable_participants: [{
      customer_id: 8489,
      first_name: 'A',
      middle_name: '',
      last_name: 'C1'
    }, {
      customer_id: 8586,
      first_name: 'Eric',
      middle_name: '',
      last_name: 'A01'
    }]
  }
});

function setup(state = initialState) {
  const component = mountWithIntl(
    <CouponItem
      selectOption={state.toJS()}
    />
  );
  return {
    component
  };
}

describe('index/modules/Cart/ShoppingCart/components/Coupon/CouponItem', () => {
  it('should display classes as except', () => {
    const { component } = setup();
    expect(component.find('.coupon-select-item')).toHaveLength(1);
    expect(component.find('.coupon-select-item__active')).toHaveLength(0);
    expect(component.find('.coupon-select-item__selected')).toHaveLength(0);
  });

  it('should display class coupon-select-item__active if active is true', () => {
    const { component } = setup(
      initialState.set('active', true)
    );
    expect(component.find('.coupon-select-item__active')).toHaveLength(1);
  });

  it('should display class coupon-select-item__selected if active is true', () => {
    const { component } = setup(
      initialState.set('selected', true)
    );
    expect(component.find('.coupon-select-item__selected')).toHaveLength(1);
  });

  it('should display one participant with only wording', () => {
    const { component } = setup(
      initialState.setIn(['option', 'appliable_participants'], fromJS([
        {
          customer_id: 8489,
          first_name: 'A',
          middle_name: '',
          last_name: 'C1'
        }
      ]))
    );
    expect(component.find('.coupon-content').find(Text)).toHaveLength(2);
    expect(component.find('.coupon-content').find(Text).at(0).text()).toContain('only');
  });

  it('should not display participant section if no appliable_participants', () => {
    const { component } = setup(
      initialState.setIn(['option', 'appliable_participants'], undefined)
    );
    expect(component.find('.coupon-content').find(Text)).toHaveLength(1);
  });
});
