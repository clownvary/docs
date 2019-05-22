import { Response } from 'src/common/restClient';

describe('Response', () => {
  it('isSuccess works well', () => {
    const isSuccess = Response.isSuccess('0000');

    expect(isSuccess).toBeTruthy();
  });

  it('isValidationError works well', () => {
    const isValidationError = Response.isValidationError('9008');

    expect(isValidationError).toBeTruthy();
  });

  it('isSystemError works well', () => {
    const isSystemError = Response.isSystemError('9999');

    expect(isSystemError).toBeTruthy();

    const isSystemError2 = Response.isSystemError('001');

    expect(isSystemError2).toBeTruthy();
  });

  it('Response inits well', () => {
    const res = {
      headers: {
        response_code: '0000',
        response_message: 'Successful'
      },
      body: {
        is_permit_accessible: 'false',
        message: 'This reservation is currently in use. Please try again later. '
      }
    };

    const r = new Response(res);

    expect(r.success).toBeTruthy();

    const r1 = new Response(res, true);

    expect(r1.success).toBeTruthy();

    const r2 = new Response({}, true);

    expect(r2.isSystemError).toBeTruthy();
  });
});
