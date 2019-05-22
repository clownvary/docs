import { HttpMethod, createAPI } from 'react-base-ui/lib/common/restClient';

const path = `${window.__siteBaseName}/rest`;
const apiSet = {};

apiSet.getBalance = createAPI(HttpMethod.GET, `${path}/outstanding/balance`);
apiSet.commitBalance = createAPI(HttpMethod.POST, `${path}/outstanding/balance`);

// istanbul ignore else
if (__STATIC__) {
  const testPath = '/test/json/Cart/Balance';
  apiSet.getBalance = apiSet.getBalance.mock(`${testPath}/get_balances.json`);
  apiSet.commitBalance = apiSet.commitBalance.mock(`${testPath}/post_balance.json`);
}

export default apiSet;
