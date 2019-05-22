import { fromJS } from 'immutable';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';

import middlewares from 'utils/middlewares';// eslint-disable-line
import helper from 'utils/testHelper';// eslint-disable-line

import * as actions from 'index/dev-admin/Version/actions';
import {
  READ_VERSION_UI_LOADING,
  READ_VERSION_UI_READ_SUCCESS,
  READ_VERSION_UI_READ_FAILED
} from 'index/dev-admin/Version/consts/actionTypes';


describe('index/dev-admin/Version/actions/index', () => {
  let store = null;
  const initialState = fromJS({
    loading: false,
    successful: false,
    siteId: 1,
    data: {
      siteId: 0,
      globalVersion: false,
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

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore(initialState);
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('Dispatch Action: reloadSitesAction', () => {
    it('Should return action READ_VERSION_UI_LOADING and READ_VERSION_UI_READ_SUCCESS', (done) => {
      const { readVersionAction } = actions;

      store.dispatch(readVersionAction()).then(() => {
        expect(helper.isIncluding([
          {
            type: READ_VERSION_UI_LOADING
          },
          {
            type: READ_VERSION_UI_READ_SUCCESS
          }
        ], store.getActions())).to.be.true;
        done();
      });
    });

    it('Should return action READ_VERSION_UI_LOADING and READ_VERSION_UI_READ_FAILED', (done) => {
      const { readVersionAction } = actions;

      mockAPI(
        {
          path: '/test/json/common/get_readVersion.json',
          result: {
            headers: {
              response_code: '9008',
              response_message: 'failed'
            },
            body: {}
          }
        }, () => store.dispatch(readVersionAction()).catch((error) => {
          expect(helper.isIncluding([
            {
              type: READ_VERSION_UI_LOADING
            },
            {
              type: READ_VERSION_UI_READ_FAILED
            }
          ], store.getActions())).to.be.true;
          expect(error.data.code === '9008').to.be.true;
          done();
        })
      );
    });
  });
});
