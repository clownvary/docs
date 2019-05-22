/* istanbul ignore next */
import identity from 'lodash/identity';
import isEmpty from 'lodash/isEmpty';
import Status from './consts/status';

class WebSocketClient {
  constructor({ instanceName, removeInstance, ...options }) {
    this.resolve = identity;
    this.reject = identity;

    this.options = options || {};
    this.retryReconnectCount = 0;
    this.instance = this.buildInstance();

    this.name = instanceName;
    this.removeInstance = removeInstance;

    console.log(this.options.heartbeatInterval, this.options.heartbeatMessage);
    if (this.options.heartbeatInterval > 0 && !isEmpty(this.options.heartbeatMessage)) {
      setTimeout(() => this.triggerHeartBeat(this), this.options.heartbeatInterval * 1000);
    }
  }

  send(message, waitForResult = true) {
    if (this.instance == null || this.instance.readyState > Status.OPEN) {
      if (this.options.reconnectable) {
        this.retryReconnectCount += 1;
        if (this.retryReconnectCount > this.options.reconnectRetryCount) {
          return Promise.reject('fail to send message: instance is null. ');
        }
        if (this.options.isDebug) {
          console.info('try to reconnect to websocket server');
        }
        this.instance = this.buildInstance();
      } else {
        return Promise.reject('fail to send message: instance is null. ');
      }
    }
    const self = this;
    return new Promise((resolve, reject) => {
      let promise = Promise.resolve();

      if (this.instance.readyState === Status.CONNECTING) {
        promise = new Promise((resolve2, reject2) => {
          self.reject = reject2;
          self.resolve = resolve2;
        });
      }

      return promise.then(() => {
        self.reject = reject;
        self.resolve = resolve;
        if (this.instance.readyState !== Status.OPEN) {
          return self.reject(`fail to send message: websocketstatus is ${this.instance.readyState}`);
        }

        if (this.options.isDebug) {
          console.info('try to send message', message);
        }

        if (waitForResult) {
          return self.instance.send(message);
        }

        return self.resolve();
      });
    });
  }

  close() {
    if (this.options.isDebug) {
      console.info('try to close websocket');
    }
    if (this.instance) {
      this.instance.close();
    }
  }

  triggerHeartBeat(self) {
    if (self.options.isDebug) {
      console.info('try to send heart beat', new Date());
    }
    self.send(self.options.heartbeatMessage, false)
      .then(() => setTimeout(
        () => self.triggerHeartBeat(self), self.options.heartbeatInterval * 1000));
  }

  getStatus() {
    return this.instance && this.instance.readyState;
  }

  buildInstance() {
    const serverUrl = `wss://${this.options.url}:${this.options.port}/websocket`;
    if (this.options.isDebug) {
      console.info('websocket server url', serverUrl);
    }
    const instance = new WebSocket(serverUrl);

    instance.onerror = (evt) => {
      if (this.options.isDebug) {
        console.error('onerror', evt);
      }
      return this.reject(`${evt.code}:${evt.reason}`);
    };
    instance.onmessage = (evt) => {
      if (this.options.isDebug) {
        console.log('onmessage', evt);
      }
      return this.resolve(`${evt.data}`);
    };
    instance.onclose = (evt) => {
      if (this.options.isDebug) {
        console.log('onclose', evt);
      }
      this.removeInstance();
      return this.reject(`${evt.code}:${evt.reason}`);
    };
    instance.onopen = (evt) => {
      if (this.options.isDebug) {
        console.log('onopen', evt);
        console.log('status', instance.readyState);
      }

      this.resolve();
    };

    return instance;
  }
}

export default WebSocketClient;
