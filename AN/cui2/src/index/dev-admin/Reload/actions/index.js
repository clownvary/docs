import createFSA from 'react-base-ui/lib/utils/createFSA';
import API from '../api';
import {
  RELOAD_UI_LOADING,
  RELOAD_UI_RELOAD_SITES_SUCCESS,
  RELOAD_UI_RELOAD_SITES_FAILED
} from '../consts/actionTypes';

const reloadSitesLoading = createFSA(RELOAD_UI_LOADING);
const reloadSitesSuccess = createFSA(RELOAD_UI_RELOAD_SITES_SUCCESS);
const reloadSitesFailed = createFSA(RELOAD_UI_RELOAD_SITES_FAILED);

export const reloadSitesAction = siteIds =>
  (dispatch) => {
    dispatch(reloadSitesLoading(true));
    return API.reloadSites({ siteIds })
              .then(() => {
                dispatch(reloadSitesSuccess());
                dispatch(reloadSitesLoading(false));
              })
              .catch((error) => {
                dispatch(reloadSitesFailed());
                dispatch(reloadSitesLoading(false));
                return Promise.reject(error);
              });
  };
