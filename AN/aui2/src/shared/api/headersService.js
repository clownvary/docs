export const defaultPageInfo = {
  order_by: '',
  page_number: 1,
  order_option: 'ASC',
  total_records: 0,
  total_records_per_page: 20,
  total_page: 1
};

/* istanbul ignore next */
const defaultHeaderProps = {
  'Content-Type': (__STATIC__ ? 'application/x-www-form-urlencoded' : 'application/x-www-form-urlencoded'),
  'X-Requested-With': 'XMLHttpRequest',
  page_info: defaultPageInfo
};

export default function processHeaders(headers) {
  const noPagination = headers.page_info === null;
  const pageInfo = Object.assign({}, defaultHeaderProps.page_info, headers.page_info || {});
  /* istanbul ignore next */
  if (!pageInfo.page_number ||
    !Number.isInteger(pageInfo.page_number) ||
    pageInfo.page_number < 1) {
    pageInfo.page_number = 1;
  }

  const finalHeaders = Object.assign({},
    defaultHeaderProps,
    headers,
    { page_info: pageInfo });

  if (noPagination) {
    delete finalHeaders.page_info;
  }

  Object.keys(finalHeaders).forEach((key) => {
    if (typeof finalHeaders[key] === 'object') {
      finalHeaders[key] = JSON.stringify(finalHeaders[key]);
    }
  });

  return finalHeaders;
}
