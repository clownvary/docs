import FETCH_HELP_SUCCESS from 'shared/consts/helpLink';
import getDynamicUrl from 'shared/utils/getDynamicUrl';
import URL from '../urls';

export default viewName => (dispatch) => {
  const url = getDynamicUrl(URL.fetchHelpLink, {
    viewName
  });

  return dispatch({
    types: ['', FETCH_HELP_SUCCESS, ''],
    promise: API => API.get(url)
  });
};
