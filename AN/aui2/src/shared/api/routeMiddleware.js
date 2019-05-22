import { REDIRECT, RELOAD } from '../actions/route';
import { redirect, reload } from '../utils/locationHelper';
import { showLoadingbar } from '../actions/loadingBar';
import requestCounter from './stateManager';

export default function routeMiddleware() {
  return ({ dispatch }) => next => (action = {}) => {
    const { type, payload } = action;

    if (!type) {
      return next(action);
    }

    switch (type) {
      case REDIRECT:
        /* istanbul ignore else */
        if (payload) {
          const { url, win, useReplace } = payload;
          dispatch(showLoadingbar());
          requestCounter.livingRequestCountUp();
          redirect(url, win, useReplace);
        }
        break;
      case RELOAD:
        dispatch(showLoadingbar());
        requestCounter.livingRequestCountUp();
        reload();
        break;
      default:
        return next(action);
    }

    return next(action);
  };
}
