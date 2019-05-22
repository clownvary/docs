import { getBreadCrumb } from 'shared/actions/breadCrumb';

describe('shared -> actions -> getBreadCrumb', () => {
  test('getBreadCrumb should work fine', () => {
    const params = {
      batchID: 0,
      receiptID: 1
    };
    const API = {
      get: jest.fn()
    };

    const result = getBreadCrumb(params);
    result.promise(API);

    expect(result.types.some(type => type === 'BREADCRUMB_FETCH_SUCCESS')).toBeTruthy();
    expect(typeof result.promise).toBe('function');
  });
});
