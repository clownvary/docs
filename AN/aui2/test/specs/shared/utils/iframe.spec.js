import {
  getParentFrameHeight,
  getParentFrameWidth,
  setIFrameHeight,
  setIFrameWidth,
  getOffsetTop,
  getWindowSizeOfIframe
} from 'shared/utils/iframe';

describe('shared/utils/iframe', () => {
  test('getParentFrameHeight method should work fine', () => {
    const result = getParentFrameHeight();
    expect(result).toEqual(0);
  });

  test('getParentFrameWidth method should work fine', () => {
    const result = getParentFrameWidth();
    expect(result).toEqual(0);
  });

  test('setIFrameHeight method should work fine', () => {
    jest.useFakeTimers();
    const iframe = {
      height: 0
    };
    const height = 100;
    setIFrameHeight(iframe, height);
    jest.runAllTimers();
    jest.clearAllTimers();
  });

  test('setIFrameHeight method should work fine, if iframe is a nubmer', () => {
    const iframe = 100;
    const height = 100;
    setIFrameHeight(iframe, height);
  });

  test('setIFrameWidth method should work fine', () => {
    jest.useFakeTimers();
    const iframe = {
      style: {
        minWidth: 0
      }
    };
    const width = 100;
    setIFrameWidth(iframe, width);
    jest.runAllTimers();
    jest.clearAllTimers();
  });

  test('setIFrameWidth method should work fine, if urlParams is a number', () => {
    const iframe = 100;
    const width = 100;
    setIFrameWidth(iframe, width);
  });

  test('getOffsetTop method should work fine', () => {
    const result = getOffsetTop(document.body);
    expect(result).toEqual(0);
  });

  test('getWindowSizeOfIframe method should work fine', () => {
    const result = getWindowSizeOfIframe();
    expect(result).toEqual({ height: 768, width: 1024 });
  });
});
