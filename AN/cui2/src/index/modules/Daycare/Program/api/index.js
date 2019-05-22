import { HttpMethod, createAPI } from 'react-base-ui/lib/common/restClient';

const path = `${window.__siteBaseName}/rest`;
const apiSet = {};

apiSet.getProgramInfo = createAPI(HttpMethod.GET, `${path}/program/{{programId}}`);
apiSet.getSessions = createAPI(HttpMethod.GET, `${path}/program/{{programId}}/sessions`);
apiSet.getEnrollNow = createAPI(HttpMethod.GET, `${path}/program/enrollNow`);
apiSet.getExceptionExtraDates = createAPI(HttpMethod.GET, `${path}/program/{{programId}}/exceptionandextradates`);
apiSet.getEstimatePrice = createAPI(HttpMethod.GET, `${path}/program/{{programId}}/estimateprice`);

// istanbul ignore else
if (__STATIC__) {
  const testPath = '/test/json/Daycare/Program';
  apiSet.getProgramInfo = apiSet.getProgramInfo.mock(`${testPath}/get_program_info.json`);
  apiSet.getSessions = apiSet.getSessions.mock(`${testPath}/get_sessions.json`);
  apiSet.getEnrollNow = apiSet.getEnrollNow.mock(`${testPath}/get_enroll_now.json`);
  apiSet.getExceptionExtraDates = apiSet.getExceptionExtraDates.mock(`${testPath}/get_exception_extra_dates.json`);
  apiSet.getEstimatePrice = apiSet.getEstimatePrice.mock(`${testPath}/get_estimate_price.json`);
}

export default apiSet;
