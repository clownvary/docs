import { fromJS } from 'immutable';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import reducerHandler from 'react-base-ui/lib/utils/reducerHandler';

import {
  DONATIONS_UI_AMOUNT,
  DONATIONS_UI_CAMPAIGN,
  DONATIONS_UI_LIST
} from '../consts/actionTypes';

const initialState = fromJS({
  amount: null,
  selectedCampaign: null,
  selectedCampaignValue: null,
  donations: fromJS([]),
  donationAmounts: fromJS([])
});

const handlers = {

  [DONATIONS_UI_AMOUNT](state, { payload }) {
    return state.set('amount', payload);
  },

  [DONATIONS_UI_CAMPAIGN](state, { payload }) {
    return state.withMutations((s) => {
      // If campaign changed, clear amount state.
      if (payload !== s.get('selectedCampaignValue')) {
        s.set('amount', null);
      }

      // get selected campaign state.
      const selectedCampaign = s.get('donations').filter(d => d.get('campaign_id') === payload).get(0);

      s.set('selectedCampaign', selectedCampaign || null);
      s.set('selectedCampaignValue', selectedCampaign ? payload : null);

      // When campaign chenged, change donationAmounts state.
      s.set('donationAmounts', selectedCampaign ?
        selectedCampaign.get('donation_amounts') : fromJS([]));
    });
  },

  [DONATIONS_UI_LIST](state, { payload: donations }) {
    return state.set('donations', fromJS(donations).map(item => item.withMutations((s) => {
      s.set('value', s.get('campaign_id'));
      s.set('text', decodeHtmlStr(s.get('campaign_name')));
    })));
  }
};

export default reducerHandler(initialState, handlers);
