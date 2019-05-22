import { Request } from 'src/common/restClient';
import isFunction from 'lodash/isFunction';
import * as HttpMethod from 'src/common/restClient/consts/HttpMethod';

describe('Request', () => {
  it('isSuccess works well', () => {
    Request.instance[HttpMethod.GET]('/json/Resource/bookable_resources.json');
    Request.instance[HttpMethod.GET]('/json/Resource/bookable_resources.json', { body: {} });
    Request.instance[HttpMethod.GET]('/json/Resource/bookable_resources.json', { result: {} });

    expect(isFunction(Request.instance[HttpMethod.GET])).toBeTruthy();
  });
});
