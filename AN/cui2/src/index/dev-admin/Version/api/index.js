import { HttpMethod, createAPI } from 'react-base-ui/lib/common/restClient';

const apiSet = {};

const path = `${window.__siteBaseName}/rest`;
apiSet.readVersion = createAPI(HttpMethod.GET, `${path}/version`);

// istanbul ignore else
if (__STATIC__) {
  const testPath = '/test/json/common';

  apiSet.readVersion = apiSet.readVersion.mock(`${testPath}/get_readVersion.json`);
}

export default apiSet;
