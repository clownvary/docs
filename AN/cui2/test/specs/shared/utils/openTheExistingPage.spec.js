import openTheExistingPage from 'shared/utils/openTheExistingPage';

describe('shared/utils/openTheExistingPage', () => {
  it('openTheExistingPage should correcty', () => {
    openTheExistingPage('test/url', 'New family member', '1000', '800', 'yes')
    openTheExistingPage('test/url?test=1', 'New family member', '1000', '800', 'yes')
    openTheExistingPage('test/url', 'New family member', '-1000', '800', 'yes')
  });
});
