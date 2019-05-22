import syncAjax from 'shared/utils/syncRequest';

describe('shared/utils/syncRequest', () => {
  const oldXMLHttpRequest = window.XMLHttpRequest;
  const mockXHR = {
    open: jest.fn(),
    setRequestHeader: jest.fn(),
    onload: jest.fn(),
    onerror: jest.fn(),
    readyState: 4,
    responseText: {}
  };

  const createMockXHR = (paramsObj) => {
    const newMockXHR = {
      ...mockXHR,
      send: jest.fn(() => {
        newMockXHR.onload();
        newMockXHR.onerror();
      }),
      ...paramsObj
    };
    return newMockXHR;
  }

  afterEach(() => {
    window.XMLHttpRequest = oldXMLHttpRequest;
  });

  test('syncAjax method should work fine', () => {
    window.XMLHttpRequest = jest.fn(() => createMockXHR({
      status: 200
    }));
    const options = {
      url: 'url',
      withCredentials: true,
      success: jest.fn(),
      error: jest.fn()
    };
    syncAjax(options);
    expect(options.success).toHaveBeenCalledTimes(1);
    expect(options.error).toHaveBeenCalledTimes(1);
  });

  test('syncAjax method should work fine, if request error', () => {
    window.XMLHttpRequest = jest.fn(() => createMockXHR({
      status: 301
    }));
    const options = {
      url: 'url',
      success: jest.fn(),
      error: jest.fn()
    };
    syncAjax(options);
    expect(options.error).toHaveBeenCalled();
  });

  test('syncAjax method should work fine, if success and error are not function', () => {
    const oldConsole = global.console;
    global.console = {
      log: jest.fn()
    };
    window.XMLHttpRequest = jest.fn(() => createMockXHR({
      status: 200
    }));
    syncAjax();
    expect(global.console.log).toHaveBeenCalled();
    global.console = oldConsole;
  });
});
