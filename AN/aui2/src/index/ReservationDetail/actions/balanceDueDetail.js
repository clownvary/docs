import URL from '../urls';

export const FETCH_BALANCEDUEDETAIL = 'FETCH_BALANCEDUEDETAIL';

let cachedPromise;

const fetchBalanceDueDetailActionRaw = (batchId, receiptId) => ({
  types: ['', FETCH_BALANCEDUEDETAIL, ''],
  promise: API => API.get(URL.fetchBalanceDueDetail, {
    body: {
      batch_id: batchId,
      receipt_id: receiptId
    }
  }),
  meta: {
    ignoreLoadingbar: true,
    ignoreBusinessErrors: true,
    ignoreSystemErrors: true
  }
});

export const fetchBalanceDueDetailAsyncAction = () => (dispatch, getState) => {
  const { batchID, receiptID } = getState().initialData;
  /* istanbul ignore else */
  if (!cachedPromise) {
    cachedPromise = dispatch(fetchBalanceDueDetailActionRaw(batchID, receiptID));
  }

  return cachedPromise;
};

export default {
  fetchBalanceDueDetailAsyncAction
};
