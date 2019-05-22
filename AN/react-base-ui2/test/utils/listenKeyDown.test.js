import listenKeyDown from 'src/utils/listenKeyDown';

describe('utils/listenKeyDown', () => {
  it('listenKeyDown should work fine', () => {
    const preventDefaultSpy = jest.fn();
    const handleSpy = jest.fn();
    const event = {
      which: 23,
      preventDefault: preventDefaultSpy
    };
    listenKeyDown(event, 23, handleSpy);
    expect(handleSpy).not.toHaveBeenCalled();

    listenKeyDown(event, [25, 24], handleSpy);
    expect(handleSpy).not.toHaveBeenCalled();

    listenKeyDown(event, [23, 24], handleSpy);
    expect(handleSpy).toHaveBeenCalled();
    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});
