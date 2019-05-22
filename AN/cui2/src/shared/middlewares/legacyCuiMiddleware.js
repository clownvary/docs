import { fromJS } from 'immutable';
import fetch from 'isomorphic-fetch';
import { getCUIServerUrl } from '../utils/getCUIServerUrl';

import { SYNC_LEGACY_CUI } from 'index/actions/legacyCui';

const refreshSessionAPI = 'Shopping_Cart?refresh_session=true';

export default ({ dispatch, getState }) => next => (action) => {
    const { type } = action;

    // istanbul ignore else
    if (type === SYNC_LEGACY_CUI) {
      // istanbul ignore else

        return Promise.resolve();


      /* istanbul ignore next */
    //   const url = `${getCUIServerUrl(getState().configurations)}/${refreshSessionAPI}`;

    //   /* istanbul ignore next */
    //   return fetch(url, {
    //     credentials: 'include',
    //     method: 'get'
    //   }).then(
    //     (response = {}) => {
    //       const { status, statusText, ok } = response;
    //       if (ok) {
    //         console.log(
    //           [
    //             `[Successed to refresh legacy cui session] - `,
    //             `After dispatch action ${type}.`
    //           ].join('')
    //         );
    //       } else {
    //         console.log(
    //           [
    //             `[Failed to refresh legacy cui session] - `,
    //             `After dispatch action ${type}.`
    //           ].join('')
    //         );
    //       }
    //     },
    //     (error = {}) => {
    //       console.log(`[${error.stack}] - ${url}`);
    //     }
    //   );
    }

    // /* istanbul ignore next */
    return next(action);
};
