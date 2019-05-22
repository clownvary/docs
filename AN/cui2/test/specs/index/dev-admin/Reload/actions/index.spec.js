import { fromJS } from 'immutable';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';

import middlewares from 'utils/middlewares';// eslint-disable-line
import helper from 'utils/testHelper';// eslint-disable-line

import * as actions from 'index/dev-admin/Reload/actions';
import {
  RELOAD_UI_LOADING,
  RELOAD_UI_RELOAD_SITES_SUCCESS
} from 'index/dev-admin/Reload/consts/actionTypes';


describe('index/dev-admin/Reload/actions/index', () => {
  let store = null;
  const initialState = fromJS({
    loading: false,
    successful: false
  });

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore(initialState);
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('Dispatch Action: reloadSitesAction', () => {
    it('Should return action RELOAD_UI_LOADING and RELOAD_UI_RELOAD_SITES_SUCCESS', (done) => {
      const { reloadSitesAction } = actions;
      store.dispatch(reloadSitesAction()).then(() => {
        expect(helper.isIncludingByOrder([
          {
            type: RELOAD_UI_LOADING
          },
          {
            type: RELOAD_UI_RELOAD_SITES_SUCCESS
          }
        ], store.getActions())).to.be.true;
        done();
      }).catch(done);
    });

    it('Promise.reject and not API error.', (done) => {
      const { reloadSitesAction } = actions;
      mockAPI(
         {
            path: '/test/json/common/get_reloadSites.json',
            result: {
              "headers":{
                "response_code": "9008",
                "response_message": "failed",
              },
              "body": {}
            }
          }, () =>
        store.dispatch(reloadSitesAction())
        .catch((error) => {
          expect(helper.isIncludingByOrder([
          {
            type: RELOAD_UI_LOADING
          },
          {
            type: RELOAD_UI_RELOAD_SITES_SUCCESS
          }
        ], store.getActions())).not.to.be.true;
          done();
        })
      );
    });

  });
});
