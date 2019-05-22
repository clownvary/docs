import React from 'react';
import { shallow, mount } from 'enzyme';
import { fromJS } from 'immutable';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';
import FeeSummary from 'index/ReservationDetail/components/FeeSummary/index';

const mockData = {
  fee_summary: {
    sub_total: 127.5,
    taxes: [{
      name: 'Tax8',
      amount: 12.75
    }, {
      name: 'test1',
      amount: 12.75
    }, {
      name: 'test2',
      amount: 12.75
    }, {
      name: 'test3',
      amount: 4.78
    }],
    total: 170.53,
    amount_paid: null,
    due_now: null,
    refund_amount: null
  }
};
const initData = convertCasingPropObj(mockData);

const setup = (data) => {
  const fromJSData = fromJS(data);
  const output = shallow(<FeeSummary summary={fromJSData} />);

  const feeSummaryDOM = mount(<FeeSummary summary={fromJSData} />);

  return {
    output,
    feeSummaryDOM
  };
};

describe('index -> ReservationDetail -> components -> FeeSummary', () => {
  it('should include 6 divs with having a class named item after rendered', (done) => {
    const { feeSummaryDOM } = setup(initData);
    expect(feeSummaryDOM.find('.col-name').find('div').length).toBe(8);
    done();
  });

  it('when refund_amount = "3" should work fine', () => {
    const nextMockData = {
      fee_summary: {
        sub_total: 127.5,
        taxes: [{
          name: 'Tax8',
          amount: 12.75
        }, {
          name: 'test1',
          amount: 12.75
        }, {
          name: 'test2',
          amount: 12.75
        }, {
          name: 'test3',
          amount: 4.78
        }],
        total: 170.53,
        amount_paid: null,
        due_now: null,
        refund_amount: '3'
      }
    };
    const nextData = convertCasingPropObj(nextMockData);
    const { feeSummaryDOM } = setup(nextData);
    expect(feeSummaryDOM.find('.feeSummary')).toHaveLength(1);
  });
});
