import openTheExistingPage from 'shared/utils/openTheExistingPage';

describe('shared/utils/openTheExistingPage', () => {
  test('openTheExistingPage method should work fine', () => {
    const mypage = 'url?name=monkey';
    const myname = 'myname';

    openTheExistingPage(mypage, myname, -50, -10);
  });

  test('openTheExistingPage method should work fine, if param is invalid', () => {
    const mypage = '?name=monkey';
    openTheExistingPage(mypage);
  });
});
