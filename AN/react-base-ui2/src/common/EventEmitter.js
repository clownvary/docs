
import clone from 'lodash/clone';
import last from 'lodash/last';

function Events() {
}

function EventListener(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

class EventEmitter {
  constructor(prefix = '~', topOnly = false) {
    this.prefix = prefix;
    this.topOnly = topOnly;
    this._events = new Events();
    this._eventsCount = 0;
  }

  eventNames() {
    const names = [];
    let events;

    /* istanbul ignore else */
    if (this._eventsCount === 0) return names;
    /* istanbul ignore next */
    this._events.keys.forEach(name => names.push(this.prefix ? name.slice(1) : name));

    /* istanbul ignore next */
    if (Object.getOwnPropertySymbols) {
      return names.concat(Object.getOwnPropertySymbols(events));
    }

    /* istanbul ignore next */
    return names;
  }

  listeners(event, exists) {
    /* istanbul ignore next */
    const evt = this.prefix ? this.prefix + event : event;
    const available = this._events[evt];

    if (exists) return !!available;
    /* istanbul ignore else */
    if (!available) return [];
    /* istanbul ignore next */
    if (available.fn) return [available.fn];
    /* istanbul ignore next */
    return clone(available);
  }

  emit(event, ...args) {
    /* istanbul ignore next */
    const evt = this.prefix ? this.prefix + event : event;

    if (!this._events[evt]) return false;

    let listeners = this._events[evt];
    /* istanbul ignore else */
    if (listeners.fn) {
      listeners = [listeners];
    }

    const fire = (listener) => {
      /* istanbul ignore if */
      if (listener.once) this._removeListener(event, listener.fn, undefined, true);
      listener.fn.apply(listener.context, args);
    };
    /* istanbul ignore if */
    if (this.topOnly) {
      fire(last(listeners));
    } else {
      listeners.forEach(listener => fire(listener));
    }

    return true;
  }

  _addListener(event, fn, context, once = false) {
    /* istanbul ignore next */
    const listener = new EventListener(fn, context || this, once);
    /* istanbul ignore next */
    const evt = this.prefix ? this.prefix + event : event;

    if (!this._events[evt]) {
      this._events[evt] = listener;
      this._eventsCount = this._eventsCount + 1;
    } else if (!this._events[evt].fn) this._events[evt].push(listener);
    else {
      this._events[evt] = [this._events[evt], listener];
    }

    return this;
  }

  _removeListener(event, fn, context, once) {
    /* istanbul ignore next */
    const evt = this.prefix ? this.prefix + event : event;
    /* istanbul ignore if */
    if (!this._events[evt]) return this;
    if (!fn) {
      this._eventsCount = this._eventsCount - 1;
      /* istanbul ignore if */
      if (this._eventsCount === 0) {
        this._events = new Events();
      } else {
        delete this._events[evt];
      }
      return this;
    }

    let listeners = this._events[evt];
    /* istanbul ignore if */
    if (listeners.fn) {
      listeners = [listeners];
    }

    listeners = listeners.filter(listener => (listener.fn !== fn
          || (once && !listener.once)
          || (context && listener.context !== context)));

    /* istanbul ignore if */
    if (listeners.length) {
      this._events[evt] = listeners.length === 1 ? listeners[0] : listeners;
    } else {
      this._eventsCount = this._eventsCount - 1;
      /* istanbul ignore if */
      if (this._eventsCount === 0) {
        this._events = new Events();
      } else {
        delete this._events[evt];
      }
    }

    return this;
  }

  on(event, fn, context) {
    return this._addListener(event, fn, context);
  }

  once(event, fn, context) {
    return this._addListener(event, fn, context, true);
  }

  off(event, fn, context, once) {
    return this._removeListener(event, fn, context, once);
  }

  isOn(event, fn) {
    /* istanbul ignore next */
    const evt = this.prefix ? this.prefix + event : event;

    if (!this._events[evt] || !fn) return false;

    let listeners = this._events[evt];
    /* istanbul ignore else */
    if (listeners.fn) {
      listeners = [listeners];
    }

    return listeners.some(listener => (listener.fn === fn));
  }

  removeAllListeners(event) {
    let evt;

    if (event) {
      /* istanbul ignore next */
      evt = this.prefix ? this.prefix + event : event;
      if (this._events[evt]) {
        this._eventsCount = this._eventsCount - 1;
        /* istanbul ignore if */
        if (this._eventsCount === 0) {
          this._events = new Events();
        } else {
          delete this._events[evt];
        }
      }
    } else {
      this._events = new Events();
      this._eventsCount = 0;
    }

    return this;
  }
}

export default EventEmitter;

