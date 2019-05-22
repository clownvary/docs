import { fromJS } from 'immutable';
import enLocal from 'source/en-US.js';//eslint-disable-line
import reducerHandler from 'react-base-ui/lib/utils/reducerHandler';

import {
  SETCURRENTLOCALE
} from '../actions/intl';

const initialState = fromJS({
  currentLocale: 'en-US',
  defaultLocale: 'en-US',
  locales: ['en-US'],
  messages: {
    'en-US': enLocal
  }
});

const handlers = {

  [SETCURRENTLOCALE](state, { payload: { body } }) {
    return state.set('currentLocale', body);
  }

};

export default reducerHandler(initialState, handlers);
