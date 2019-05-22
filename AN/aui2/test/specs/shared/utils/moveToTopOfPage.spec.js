import moveToTopOfPage from 'shared/utils/moveToTopOfPage';

describe('shared/utils/moveToTopOfPage', () => {
  test('moveToTopOfPage method should work fine', () => {
    moveToTopOfPage();
  });

  test('moveToTopOfPage method should work fine, if domContainer is valid', () => {
    moveToTopOfPage({
      scrollIntoView: jest.fn()
    });
  });
});
