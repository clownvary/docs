import { HttpMethod, createAPI } from 'react-base-ui/lib/common/restClient';

const apiSet = {};

const path = `${window.__siteBaseName}/rest`;
apiSet.reloadSites = createAPI(HttpMethod.GET, `${path}/reload/{{siteIds}}`);

// istanbul ignore else
if (__STATIC__) {
  const testPath = '/test/json/common';

  apiSet.reloadSites = apiSet.reloadSites.mock(`${testPath}/get_reloadSites.json`);
}

export default apiSet;
