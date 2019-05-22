import { getCurrentInitState } from 'shared/utils/initStateHelper';

describe('shared/utils/initStateHelper', () => {
  test('getCurrentInitState method should work fine', () => {
    const result = getCurrentInitState();
    expect(result).toBeTruthy();
  });

  test('getCurrentInitState method should work fine', () => {
    window.__permitDetail__ = null;
    window.__reservationDetail__ = null;
    const result = getCurrentInitState();
    expect(result).toEqual(undefined);
  });
});
