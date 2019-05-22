import createFSA from 'react-base-ui/lib/utils/createFSA';
import API from '../api';
import {
  READ_VERSION_UI_LOADING,
  READ_VERSION_UI_READ_SUCCESS,
  READ_VERSION_UI_READ_FAILED
} from '../consts/actionTypes';

const readVersionLoading = createFSA(READ_VERSION_UI_LOADING);
const readVersionSuccess = createFSA(READ_VERSION_UI_READ_SUCCESS);
const readVersionFailed = createFSA(READ_VERSION_UI_READ_FAILED);

export const readVersionAction = () =>
  (dispatch) => {
    dispatch(readVersionLoading(true));
    return API.readVersion()
              .then((response) => {
                dispatch(readVersionSuccess(response));
                dispatch(readVersionLoading(false));
              })
              .catch((error) => {
                dispatch(readVersionFailed());
                dispatch(readVersionLoading(false));
                return Promise.reject(error);
              });
  };
