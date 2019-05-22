import getReducer, { getInitialState } from 'index/ReservationDetail/reducers/permitHolder';
import { wrapEventIndex } from 'index/ReservationDetail/utils/eventKeymanager';

import * as actions from 'index/ReservationDetail/actions/permitHolder';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';
import { fromJS } from 'immutable';

const initData = {
  reservationDetail: {
    general_information: {
      company_id: 123,
      company_name: 'Test',
      customer_id: 12345,
      customer_name: 'Agent',
      customer_type: 'Individual',
      customer_phone: '',
      customer_email: '',
      available_company_agents: [
        {
          id: 12345,
          name: 'Agent',
          selected: true
        }
      ]
    }
  }
}

describe('index -> ReservationDetail -> reducers -> permitHolder', () => {
  it('getInitialState works fine', () => {
    expect(getInitialState(initData).toJS()).toEqual({
      companyId: 123,
      companyName: 'Test',
      customerId: 12345,
      customerName: 'Agent',
      customerType: 'Individual',
      isPermitHolderBeDropIn: false,
      customerPhone: '',
      customerEmail: '',
      availableCompanyAgents: [
        {
          id: 12345,
          name: 'Agent',
          selected: true
        }
      ],
      allowResetFees: {}
    })
  });

  it('UPDATE_HOLDER_INFO should work fine', () => {
    const reducer = getReducer(initData);
    const state = reducer(undefined, {
      type: actions.UPDATE_HOLDER_INFO,
      payload: {
        holderInfo: fromJS({
          companyId: 321
        })
      }
    });
    expect(state.get('companyId')).toBe(321);
  });

  it('SET_ALLOW_RESET_FEE should works fine', () => {
    const reducer = getReducer(initData)
    const eventIndex = '1234';
    const state = reducer(undefined, actions.setAllowResetFee('1234', true));
    expect(state.getIn(['allowResetFees', wrapEventIndex(eventIndex)])).toBe(true);
  });
});
