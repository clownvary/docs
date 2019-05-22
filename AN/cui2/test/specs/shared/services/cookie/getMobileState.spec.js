import getMobileState from 'shared/services/cookie/getMobileState';

describe('shared/service/cookie/getMobileState', () => {
  it('should return false', () => {
    expect(getMobileState()).toEqual(false);
    window.__reduxInitialState.currentSite = null;
    expect(getMobileState()).toEqual(false);
  });

});
