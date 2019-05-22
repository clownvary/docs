import { createAPI } from 'src/common/restClient';
import isFunction from 'lodash/isFunction';


describe('createAPI', () => {
  it('init createAPI well', () => {
    expect(isFunction(createAPI)).toBeTruthy();
    const api = createAPI();
    api();
    expect(api).toBeTruthy();
    const mock = api.mock('abc');
    expect(isFunction(mock)).toBeTruthy();
  });
});
