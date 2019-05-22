import { HttpMethod, createAPI } from 'react-base-ui/lib/common/restClient';

const checkoutPath = `${window.__siteBaseName}/rest`;

const apiSet = {};

apiSet.acceptAAOffer = createAPI(HttpMethod.POST, `${checkoutPath}/aaoffer`);

// istanbul ignore else
if (__STATIC__) {
  const testPath = '/test/json/AAOffer';
  apiSet.acceptAAOffer = apiSet.acceptAAOffer.mock(`${testPath}/post_aaoffer.json`);
}

export default apiSet;
