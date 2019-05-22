import { showError } from 'shared/utils/messages';

describe('shared/utils/showError', () => {
  it('should return result correcty', () => {
    window.scrollTo(0, 1000);
    showError('scroll to screen top');
    expect(window.scrollY).toEqual(0);
  });
});
