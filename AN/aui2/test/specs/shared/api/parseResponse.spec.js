import parseResponse from 'shared/api/parseResponse';
import { SUCCESS, NO_RESULT, isSystemError } from 'shared/api/parseResponse';

describe('shared/api/parseResponse', () => {
  it('parseResponse method should work fine', () => {
    const success = { response_code: SUCCESS };
    expect(parseResponse(success)).toBeTruthy();

    const noResult = { response_code: NO_RESULT };
    expect(parseResponse(noResult)).toBeTruthy();

    const failure = { response_code: '67187' };
    expect(parseResponse(failure)).toBeFalsy();
  });

  it('isSystemError method should work fine', () => {
    expect(isSystemError(SUCCESS)).toBeFalsy();
    expect(isSystemError('105')).toBeTruthy();
    expect(isSystemError('9999')).toBeTruthy();
  });
});
