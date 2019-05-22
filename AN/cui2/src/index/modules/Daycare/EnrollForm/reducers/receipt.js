import { fromJS } from 'immutable';
import isNumber from 'lodash/isNumber';
import reducerHandler from 'react-base-ui/lib/utils/reducerHandler';

import {
  RECEIPT_NUMBER
} from '../consts/actionTypes';

const initialState = fromJS({ receiptNumber: 0 });

const handlers = {
  [RECEIPT_NUMBER](state, { payload: { receiptNumber } }) {
    if (isNumber(receiptNumber)) {
      return fromJS({ receiptNumber });
    }
    return state;
  }
};

export default reducerHandler(initialState, handlers);
