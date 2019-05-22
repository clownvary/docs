import { HttpMethod, createAPI } from 'react-base-ui/lib/common/restClient';

const apiSet = {};

const path = `${window.__siteBaseName}/rest`;
apiSet.readConfiguration = createAPI(HttpMethod.GET, `${path}/configuration/{{siteIds}}`);

// istanbul ignore else
if (__STATIC__) {
  const testPath = '/test/json/common';

  apiSet.readConfiguration = apiSet.readConfiguration.mock(`${testPath}/get_readConfiguration.json`);
}

export default apiSet;
