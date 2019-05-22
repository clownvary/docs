import syncAjax from 'src/common/restClient/syncRequest';

describe('src/common/restClient/syncRequest', () => {
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
  };

  afterEach(() => {
    window.XMLHttpRequest = oldXMLHttpRequest;
  });

  it('syncAjax method should work fine', () => {
    window.XMLHttpRequest = jest.fn(() => createMockXHR({
      status: 200
    }));
    const options = {
      url: 'url',
      type: 'post',
      body: { name: 'test' },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      withCredentials: true,
      success: jest.fn(),
      error: jest.fn()
    };
    syncAjax(options);
    expect(options.success).toHaveBeenCalledTimes(1);
    expect(options.error).toHaveBeenCalledTimes(1);
  });

  it('syncAjax method should work fine, if request error', () => {
    window.XMLHttpRequest = jest.fn(() => createMockXHR({
      status: 301
    }));
    const options = {
      url: 'url?id=1',
      body: { name: 'test' },
      success: jest.fn(),
      error: jest.fn()
    };
    syncAjax(options);
    expect(options.error).toHaveBeenCalled();
  });

  it('syncAjax method should work fine, if success and error are not function', () => {
    const oldConsole = global.console;
    global.console = {
      log: jest.fn()
    };
    window.XMLHttpRequest = jest.fn(() => createMockXHR({
      status: 200
    }));
    syncAjax({ url: 'url' });
    expect(global.console.log).toHaveBeenCalled();
    global.console = oldConsole;
  });
});
