import createFSA from 'react-base-ui/lib/utils/createFSA';
import API from '../api';

import {
  SESSIONS_UI,
  EXCEPTION_DATES_UI
} from '../consts/actionTypes';

const uiSessions = createFSA(SESSIONS_UI);
const uiExceptionDates = createFSA(EXCEPTION_DATES_UI);

export const fetchSessions = programId => dispatch => API.getSessions({ programId })
  .then((response) => {
    const { body: { program_sessions: sessions, no_vacancy: sessionUnavailable } } = response;
    dispatch(uiSessions({ sessions, sessionUnavailable }));
    return Promise.resolve(response);
  });

export const fetchExceptionDates = programId => dispatch =>
  API.getExceptionExtraDates({ programId }).then((response) => {
    const { body: { program_exceptionandextradates: dates } } = response;
    dispatch(uiExceptionDates({ dates }));
    return Promise.resolve(response);
  });
