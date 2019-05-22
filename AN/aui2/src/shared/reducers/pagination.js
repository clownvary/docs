import { fromJS } from 'immutable';
import map from 'lodash/map';
import reducerHandler from 'shared/utils/reducerHandler';
import { INIT_PAGINATIONS, SHOW_MORE_RECURRING_FEES } from 'shared/actions/pagination';

const initialState = fromJS({ paginations: fromJS([]) });

const handlers = {
  [INIT_PAGINATIONS](state, { payload: { paginations } }) {
    return state.set('paginations', fromJS(paginations));
  },
  [SHOW_MORE_RECURRING_FEES](state, { payload }) {
    const paginations = state.get('paginations').toJS();
    const { paginationId, currentPage, isLastPage, remaining } = payload;
    const newPaginations = map(paginations, (p) => {
      if (p.paginationId === paginationId) {
        p.current = currentPage;
        p.isLastPage = isLastPage;
        p.remaining = remaining;
      }
      return p;
    });
    return state.set('paginations', fromJS(newPaginations));
  }
};

export default reducerHandler(initialState, handlers);
