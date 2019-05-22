import WSService from 'src/services/websocket';

// jest.mock(WebSocket, () => {});
jest.mock('src/services/websocket/WebSocketClient', () => class mockClient {
  constructor({ instanceName, removeInstance }) {
    this.callCount = 0;
    this.test = /test/.test(instanceName);
    this.removeInstance = removeInstance;
  }
  getStatus() { // first return 0, and then return 1
    this.callCount += 1;
    if (this.test) {
      if (this.callCount > 1) {
        return 1;
      }
    }
    return 0;
  }
});


describe('websocket Service', () => {
  const defaultOptions = {
    url: 'localhost',
    port: 4444,
    reconnectable: false,
    heartbeatInterval: 30,
    heartbeatMessage: '',
    isDebug: false,
    maxSize: 5
  };

  it('can setup ws successfully', () => {
    const options = { url: 'ddd',
      port: 5555,
      reconnectable: true,
      heartbeatInterval: 1,
      heartbeatMessage: 'test',
      isDebug: true,
      reconnectRetryCount: 5,
      maxSize: 6
    };
    WSService.setup({ ...options });
    expect(WSService.options).toEqual(options);
  });

  it('can setup ws failed with empty parameter', () => {
    expect(() => WSService.setup()).toThrowError();
  });

  it('can setup ws failed with empty url', () => {
    const options = {
      url: '',
      port: 5555,
      reconnectable: true,
      heartbeatInterval: 1,
      heartbeatMessage: 'test',
      isDebug: true,
      maxSize: 6
    };

    expect(() => WSService.setup({ ...options })).toThrowError('invalid url');
  });

  it('can setup ws failed with empty port', () => {
    const options = {
      url: 'test',
      port: 'aa00',
      reconnectable: true,
      heartbeatInterval: 1,
      heartbeatMessage: 'test',
      isDebug: true,
      maxSize: 6
    };

    expect(() => WSService.setup({ ...options })).toThrowError('invalid port');
  });

  it('wss.getInstance() successfully', () => {
    WSService.setup({ ...defaultOptions });

    expect(() => WSService.getInstance()).not.toBeNull();
  });

  it('wss.getInstance() failed', () => {
    WSService.reset();
    WSService.setup({ ...defaultOptions });
    WSService.getInstance({ name: 'test1' });
    WSService.getInstance({ name: 'test2' });
    WSService.getInstance({ name: 'test3' });
    WSService.getInstance({ name: 'test4' });
    WSService.getInstance({ name: 'test5' });
    expect(() => WSService.getInstance({ name: 'test6' })).toThrowError();
  });

  it('wss.getInstanceCount() should work', () => {
    WSService.reset();
    expect(WSService.getInstanceCount()).toEqual(0);

    WSService.setup({ ...defaultOptions });
    WSService.getInstance({ name: 'test' });
    expect(WSService.getInstanceCount()).toEqual(1);
  });

  it('wss.removeInstance() should work', () => {
    WSService.reset();
    WSService.setup({ ...defaultOptions });
    WSService.getInstance({ name: 'test' });
    expect(WSService.getInstanceCount()).toEqual(1);
    WSService.removeInstance();
    expect(WSService.getInstanceCount()).toEqual(1);
    WSService.removeInstance('test');
    expect(WSService.getInstanceCount()).toEqual(0);

    const ws = WSService.getInstance({ name: 'test' });
    expect(WSService.getInstanceCount()).toEqual(1);
    ws.removeInstance();
    expect(WSService.getInstanceCount()).toEqual(0);
  });
});
