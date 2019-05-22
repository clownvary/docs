import getCookie from 'shared/services/cookie/getCookie';

describe('shared/service/cookie/getCookie', () => {
  it('should return empty value', () => {
    expect(getCookie() === '').toBeTruthy();
  });
});
