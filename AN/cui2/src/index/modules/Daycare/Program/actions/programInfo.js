import createFSA from 'react-base-ui/lib/utils/createFSA';
import API from '../api';

import {
  PROGRAM_INFO_UI
} from '../consts/actionTypes';

const uiProgramInfo = createFSA(PROGRAM_INFO_UI);

export const fetchProgramInfo = programId => dispatch => API.getProgramInfo({ programId })
  .then((response) => {
    const { body: { program_general: programInfo } } = response;
    dispatch(uiProgramInfo({ programInfo }));
    return Promise.resolve(response);
  });
