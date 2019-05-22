import { HttpMethod, createAPI } from 'react-base-ui/lib/common/restClient';

const apiSet = {};

const path = `${window.__siteBaseName}/rest/system`;
apiSet.getCartCount = createAPI(HttpMethod.GET, `${path}/cart/count`);

// istanbul ignore else
if (__STATIC__) {
  const testPath = '/test/json/common';

  apiSet.getCartCount = apiSet.getCartCount.mock(`${testPath}/get_cartcount.json`);
}

export default apiSet;
