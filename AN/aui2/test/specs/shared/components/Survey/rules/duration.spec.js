import validator from 'shared/components/Survey/rules/duration';

describe('shared/components/Survey/ruls/duration', () => {
  it('validation should work well', () => {
    let err = validator('00:00:00');
    expect(err).toEqual('required');

    err = validator('01:02:03');
    expect(err).toEqual('');
  })
});
