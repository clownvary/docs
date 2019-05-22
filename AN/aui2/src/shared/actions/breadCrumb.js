import getDynamicUrl from 'shared/utils/getDynamicUrl';
import URL from '../urls';

export const BREADCRUMB_FETCH_SUCCESS = 'BREADCRUMB_FETCH_SUCCESS';

export function getBreadCrumb({ batchID, receiptID }) {
  const url = getDynamicUrl(URL.fetchBreadCrumb, { batchID, receiptID });

  return {
    types: ['', BREADCRUMB_FETCH_SUCCESS, ''],
    promise: API => API.get(url)
  };
}
