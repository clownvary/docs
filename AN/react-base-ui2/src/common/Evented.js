import EventEmitter from './EventEmitter';

class Evented {
  constructor(prefix = 'Evented') {
    this.emitter = new EventEmitter(prefix);
  }

  /**
   * Attach event handler
   * @param {string} event Event name
   * @param {function} fn Handler function
   * @param {object} context Calling context
   */
  on(event, fn, context) {
    this.emitter.on(event, fn, context);
  }

  off(event, fn, context) {
    this.emitter.off(event, fn, context);
  }

  triggerEvent(name, param) {
    this.emitter.emit('change', param);
  }
}


export default Evented;
