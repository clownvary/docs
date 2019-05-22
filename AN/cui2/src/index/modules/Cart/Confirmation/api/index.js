import { HttpMethod, createAPI } from 'react-base-ui/lib/common/restClient';

const path = `${window.__siteBaseName}/rest`;
const apiSet = {};

apiSet.getReceiptSummary = createAPI(HttpMethod.GET, `${path}/cartReceipt`);
apiSet.getGaTransaction = createAPI(HttpMethod.GET, `${path}/confirmation/transactions/ga`);


// istanbul ignore else
if (__STATIC__) {
  const testPath = '/test/json/Cart/Confirmation';

  apiSet.getReceiptSummary = apiSet.getReceiptSummary.mock(`${testPath}/get_receiptsummary.json`);
  apiSet.getGaTransaction = apiSet.getGaTransaction.mock(`${testPath}/get_transactions_ga.json`);
}

export default apiSet;
