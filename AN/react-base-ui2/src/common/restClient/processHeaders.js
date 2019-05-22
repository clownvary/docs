import * as HttpMethod from './consts/HttpMethod';
import * as HttpContentType from './consts/HttpContentType';

export default function processHeaders(method, headers) {
  /* istanbul ignore next */
  const contentType = {
    'Content-Type': ((__STATIC__ || method === HttpMethod.POST || method === HttpMethod.PUT) ? HttpContentType.JSON : HttpContentType.URL_ENCODED)
  };

  const requestedWidth = {
    'X-Requested-With': 'XMLHttpRequest'
  };

  const pageInfo = {
    page_info: {
      page_number: 1,
      total_records_per_page: 20
    }
  };

  // const pgInfo = Object.assign({}, pageInfo, headers.page_info);
  const finalHeaders = Object.assign({}, contentType, requestedWidth, pageInfo, headers);

  Object.keys(finalHeaders).forEach((key) => {
    if (typeof finalHeaders[key] === 'object') {
      finalHeaders[key] = JSON.stringify(finalHeaders[key]);
    }
  });

  return finalHeaders;
}
