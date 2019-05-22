import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';
import Client from './WebSocketClient';

/**
 * @module WebSocketService
 * @description WebSocketService is a singletone service that provide
 * create/manage websocket instance
 *
 * To use WebSocketService, import it from react-base-ui
 * @example
 * import WSService from 'react-base-ui/lib/services/websocket';
 * // setup global config
 * WSService.setup({ reconnectable,
 *            heartbeatInterval,
 *            heartbeatMessage,
 *            url,
 *            port,
 *            isDebug,
 *            maxSize });
 *
 * // getInstance
 * const ws = WSService.getInstance(); // get the default web socket instance
 * const wsCustom = WSService.getInstance({ name: 'Custom' }); // get a named web socket instance.
 * const wsOverrideGlobalConfig = WSService.getInstance({ reconnectable: true, url: 'wss://localhost', port: '5555' }); // override global setting
 *
 * // send message
 * ws.send({ initMessage })
 *   .then(() => {
 *     return ws.send({ openCashDrawerMessage }).then((data) => {
 *       if (data.code) {
 *         var r = JSON.parse(data);
 *         if (r.status  == 'success' {
 *           // successed
 *         })
 *
 *         return Promise.reject(`${r.code}:${r.reason}`);
 *       }
 *     })
 *   })
 *   .catch((err) => {
 *     return Promise.reject('fail to send message');
 *   })
 *
 * // close ws
 * ws.close();
 *
 * */
class WebSocketService {

  constructor() {
    this.DEFAULT_INSTANCE_NAME = 'DEFAULTINSTANCENAME';

    this.instances = {};
    this.defaultOptions = {
      heartbeatInterval: 30,
      reconnectable: true,
      reconnectRetryCount: 5,
      isDebug: false,
      maxSize: 5
    };
  }

  setup(options) {
    const {
      url,
      port
    } = options || {};
    if (!isString(url) || isEmpty(url)) {
      throw new Error('invalid url.');
    }

    if (/[^\d]/.test(port) || isEmpty(url)) {
      throw new Error('invalid port');
    }

    this.options = Object.assign({}, this.defaultOptions, options);
  }

  getInstance = ({ name: instanceName, ...options } = {}) => {
    if (this.getInstanceCount() >= this.options.maxSize) {
      throw new Error(`instance number exceed the max size ${this.maxSize}`);
    }

    /* istanbul ignore if */
    if (!instanceName) {
      instanceName = this.DEFAULT_INSTANCE_NAME;
    }

    /* istanbul ignore else */
    if (this.instances[instanceName] == null) {
      this.instances[instanceName] = new Client({
        ...this.options,
        ...options,
        removeInstance: () => this.removeInstance(instanceName),
        instanceName
      });
    }

    return this.instances[instanceName];
  }

  getInstanceCount() {
    return Object.keys(this.instances).length;
  }

  removeInstance(instanceName) {
    if (instanceName && this.instances && instanceName in this.instances) {
      delete this.instances[instanceName];
    }
  }

  reset() {
    this.options = {};
    this.instances = {};
  }
}

export default WebSocketService;
