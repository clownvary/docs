/** TODO need mock websocket to finish the ut */
import Client from 'src/services/websocket/WebSocketClient';
window.WebSocket = function() {

};

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

  const removeInstance = jest.fn();

  it('constructor should work well', () => {
    const c = new Client({ instanceName: 'test', removeInstance, ...defaultOptions });
    expect(c.options).toEqual(defaultOptions);
  });

  // it('send should work well', (done) => {
  //   const serverUrl = `wss://${defaultOptions.url}:${defaultOptions.port}/websocket`;
  //   console.log('serverUrl', serverUrl);
  //   const client = new Client({ instanceName: 'test', removeInstance, ...defaultOptions, isDebug: true });

  //   // const mockServer = new Server(serverUrl);
  //   // mockServer.on('connection', (socket) => {
  //   //   socket.on('message', (data) => {
  //   //     console.log('server', data);
  //   //     socket.send(`receive: ${data}`);
  //   //   });
  //   // });

  //   // const c = new WebSocket(serverUrl);

  //   // c.onclose = evt => console.log('onclose', evt);
  //   // c.onopen = evt => console.log('onopen', evt);
  //   // c.onmessage = evt => console.log('onmessage', evt);
  //   // c.onerror = evt => console.log('onerror', evt);

  //   // c.send('test');
  //   const spy = jest.spyOn(WebSocket, 'send');

  //   client.send('test').then((data) => {
  //     expect(spy).toHaveBeenCalled();
  //     done();
  //   }).catch((err) => {
  //     console.error(err);
  //     throw new Error(err);
  //   });
  // }, 10000);
});
