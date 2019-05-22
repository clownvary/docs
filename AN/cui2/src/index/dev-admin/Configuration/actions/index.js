import createFSA from 'react-base-ui/lib/utils/createFSA';
import API from '../api';
import {
  READ_CONFIGURATION_UI_LOADING,
  READ_CONFIGURATION_UI_READ_SUCCESS,
  READ_CONFIGURATION_UI_READ_FAILED
} from '../consts/actionTypes';

const readConfigurationLoading = createFSA(READ_CONFIGURATION_UI_LOADING);
const readConfigurationSuccess = createFSA(READ_CONFIGURATION_UI_READ_SUCCESS);
const readConfigurationFailed = createFSA(READ_CONFIGURATION_UI_READ_FAILED);

export const readConfigurationAction = siteIds =>
  (dispatch) => {
    dispatch(readConfigurationLoading(true));
    return API.readConfiguration({ siteIds })
              .then((response) => {
                dispatch(readConfigurationSuccess(response));
                dispatch(readConfigurationLoading(false));
              })
              .catch((error) => {
                dispatch(readConfigurationFailed());
                dispatch(readConfigurationLoading(false));
                return Promise.reject(error);
              });
  };
