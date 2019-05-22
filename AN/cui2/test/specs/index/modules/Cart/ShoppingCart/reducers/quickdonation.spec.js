import { is, fromJS } from 'immutable';
import API from 'index/modules/Cart/ShoppingCart/api';
import {
  DONATIONS_UI_AMOUNT,
  DONATIONS_UI_CAMPAIGN,
  DONATIONS_UI_LIST
} from 'index/modules/Cart/ShoppingCart/consts/actionTypes';
import quickdonationReducer from 'index/modules/Cart/ShoppingCart/reducers/quickdonation';

describe('index/modules/Cart/ShoppingCart/reducers/quickdonation', () => {
  const expectedInitialState = fromJS({
    amount: null,
    selectedCampaign: null,
    selectedCampaignValue: null,
    donations: fromJS([]),
    donationAmounts: fromJS([])
  });

  it('Should return the expected initial state', () => {
    expect(is(expectedInitialState, quickdonationReducer(undefined, {}))).toEqual(true);
  });

  it('Should change amount successfully', () => {
    expect(quickdonationReducer(undefined, {
      type: DONATIONS_UI_AMOUNT,
      payload: 100
    }).get('amount')).toEqual(100);
  });

  it('Should change campaign successfully if pass a correct campaingn id', () => {
    const stateReturn = quickdonationReducer(fromJS({
      amount: 100,
      selectedCampaign: 1,
      selectedCampaignValue: null,
      donations: fromJS([
        {
          campaign_id: 1,
          campaign_name: 'Demo campaign name',
          donation_amounts: []
        }
      ]),
      donationAmounts: fromJS([])
    }), {
      type: DONATIONS_UI_CAMPAIGN,
      payload: 1
    });
    expect(stateReturn.get('amount')).toEqual(null);
    expect(stateReturn.get('selectedCampaignValue')).toEqual(1);
    expect(stateReturn.getIn(['selectedCampaign', 'campaign_id'])).toEqual(1);
    expect(stateReturn.get('donationAmounts').toJS()).toBeInstanceOf(Array);


    const stateReturn1 = quickdonationReducer(fromJS({
      amount: 100,
      selectedCampaign: 1,
      selectedCampaignValue: null,
      donations: fromJS([
        {
          campaign_id: 1,
          campaign_name: 'Demo campaign name',
          donation_amounts: []
        }
      ]),
      donationAmounts: fromJS([])
    }), {
      type: DONATIONS_UI_CAMPAIGN,
      payload: null
    });

    expect(stateReturn1.get('amount')).toEqual(100);
  });

  it('Should change campaign unsuccessfully if pass a non-existent campaingn id', () => {
    const stateReturn = quickdonationReducer(fromJS({
      amount: 100,
      selectedCampaign: null,
      selectedCampaignValue: null,
      donations: fromJS([
        {
          campaign_id: 1,
          campaign_name: 'Demo campaign name',
          donation_amounts: []
        }
      ]),
      donationAmounts: fromJS([])
    }), {
      type: DONATIONS_UI_CAMPAIGN,
      payload: 111
    });
    expect(stateReturn.get('amount')).toEqual(null);
    expect(stateReturn.get('selectedCampaignValue')).toEqual(null);
    expect(stateReturn.get('selectedCampaign')).toEqual(null);
    expect(stateReturn.get('donationAmounts').toJS()).toBeInstanceOf(Array);
  });

  it('Should update donation successfully', () => {
    const stateReturn = quickdonationReducer(undefined, {
      type: DONATIONS_UI_LIST,
      payload: [
        {
          campaign_id: 1,
          campaign_name: 'Demo campaign name'
        }
      ]
    });
    expect(stateReturn.getIn(['donations', 0, 'value'])).toEqual(1);
    expect(stateReturn.getIn(['donations', 0, 'text'])).toEqual('Demo campaign name');
  });

  it('Should submit donation successfully', (done) => {
    API.setQuickDonation().then((response) => {
      expect(response.headers.response_code).toEqual('0000');
      done();
    });
  });
});
