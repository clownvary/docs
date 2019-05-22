import {
  fromJS
} from 'immutable';
import { pages } from 'shared/consts';
import reducerHandler from 'shared/utils/reducerHandler';
import { BREADCRUMB_FETCH_SUCCESS } from 'shared/actions/breadCrumb';

function formatBreadCrumb(breadCrumbs) {
  return breadCrumbs.map((bc, index) => ({
    isRoot: !index,
    type: !index ? 'rootmenuitem' : bc.previous_name,
    name: bc.name,
    functionMenu: bc.url ? bc.previous_name : '',
    promptMessage: bc.confirm_message,
    url: bc.url ? pages.buildUrl(`${window.__environment__.ROOT_URL}${bc.url}`) : '',
    action: bc.action && {
      parameter: {
        batchID: bc.action.api_parameter.batch_id,
        voidDraft: bc.action.api_parameter.void_draft,
        receiptID: bc.action.api_parameter.receipt_id
      }
    }
  }));
}

const getInitialState = (initData) => {
  const breadCrumbs = initData.breadcrumb || [];
  const { batchID, receiptID } = initData;

  return fromJS(
    {
      batchID,
      receiptID,
      data: formatBreadCrumb(breadCrumbs)
    }
  );
};

const handlers = {
  [BREADCRUMB_FETCH_SUCCESS](state, { payload: { body: { breadcrumb } } }) {
    return state.set('data', fromJS(formatBreadCrumb(breadcrumb)));
  }
};

export default function getBreadCrumbReducerHandler(initData) {
  return reducerHandler(getInitialState(initData), handlers);
}

