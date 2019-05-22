import { is, fromJS } from 'immutable';
import { expect } from 'chai';
import reducers from 'index/dev-admin/Configuration/reducers';
import * as actions from 'index/dev-admin/Configuration/consts/actionTypes';

describe('index/dev-admin/Configuration/reducers/index', () => {
  const initialState = fromJS({
    loading: false,
    successful: false,
    siteId: 1,
    data: {
      siteId: 0,
      globalConfiguration: false,
      cui_url: 'apm.activecommunities.com',
      public_url: 'activenetdev0.active.com/jettytest11',
      enable_cui_seo_conversion: true,
      online_default_customer_type: 20,
      online_default_registration_page: 'OnLineIntroduction.sdi',
      default_login_format: 0,
      online_advanced_search_default_start_date_after: 'Dec 30, 1899 12:00:00 AM',
      online_advanced_search_default_start_date_before: '',
      online_default_facility_search_location: 0,
      online_default_facility_search_facility_type: 0,
      online_default_facility_search_keyword: '0',
      online_default_facility_search_show_locker_rooms: false,
      online_default_facility_search_detail_level: 0
    }
  });

  it('Should get loading to be true', () => {
    const {
      READ_CONFIGURATION_UI_LOADING
    } = actions;
    const returnState = reducers(initialState, {
      type: READ_CONFIGURATION_UI_LOADING,
      payload: true
    });
    expect(returnState.get('loading')).to.be.true;
  });

  it('Should get loading to be false', () => {
    const {
      READ_CONFIGURATION_UI_LOADING
    } = actions;
    const returnState = reducers(initialState, {
      type: READ_CONFIGURATION_UI_LOADING,
      payload: false
    });
    expect(returnState.get('loading')).to.be.false;
  });

  it('Should get successful to be true', () => {
    const {
      READ_CONFIGURATION_UI_READ_SUCCESS
    } = actions;
    const returnState = reducers(initialState, {
      type: READ_CONFIGURATION_UI_READ_SUCCESS,
      payload: {
        body: {
          site_id: 1,
          configuration: initialState.get('data').toJS()
        }
      }
    });
    expect(returnState.get('successful')).to.be.true;
  });

  it('Should get successful to be false', () => {
    const {
      READ_CONFIGURATION_UI_READ_FAILED
    } = actions;
    const returnState = reducers(initialState, {
      type: READ_CONFIGURATION_UI_READ_FAILED
    });
    expect(returnState.get('successful')).to.be.false;
  });

  it('Should get response data to be expected', () => {
    const {
      READ_CONFIGURATION_UI_READ_SUCCESS
    } = actions;
    const returnState = reducers(initialState, {
      type: READ_CONFIGURATION_UI_READ_SUCCESS,
      payload: {
        body: {
          site_id: 1,
          configuration: initialState.get('data').toJS()
        }
      }
    });
    expect(is(returnState.get('data'), initialState.get('data'))).to.be.true;
  });
});
