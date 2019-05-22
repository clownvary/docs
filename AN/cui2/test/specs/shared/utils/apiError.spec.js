import { ErrorObj, ErrorType } from 'react-base-ui/lib/common/error';
import { isValidationErrorFromApi } from 'shared/utils/apiError';

describe('shared/utils', () => {
  it('should return result correcty', () => {
    const err1 = new ErrorObj(ErrorType.APP, 'test', { response: { isValidationError: true } });
    expect(isValidationErrorFromApi(err1)).toBeTruthy();
    const err2 = new ErrorObj(ErrorType.APP, 'test', { response: { isValidationError: false } });
    expect(isValidationErrorFromApi(err2)).toBeFalsy();
    const err3 = new Error('test');
    expect(isValidationErrorFromApi(err3)).toBeFalsy();
  });
});
