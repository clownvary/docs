import validator from 'shared/components/Survey/rules/phone';

describe('shared/components/Survey/ruls/phone', () => {
  it('validation should work well', () => {
    let err = validator('001', '1234567', '', 'US', '');
    expect(err).toEqual('');

    err = validator('', '1234567', '', 'US', '');
    expect(err).toEqual('phone_missing_areacode');

    err = validator('', '1234567', '', 'AU', '');
    expect(err).toEqual('phone_missing_areacode');

    err = validator('', '1234567', '', 'NZ', '');
    expect(err).toEqual('phone_missing_areacode');

    err = validator('111', '12345aaa67', '', 'US', '');
    expect(err).toEqual('phone_invalid_characters');

    err = validator('111', '', '', 'US', '');
    expect(err).toEqual('phone_missing_phonenumber');

    err = validator('aaa', '', '', 'US', '');
    expect(err).toEqual('phone_wholenumber_areacode');
  })
});
