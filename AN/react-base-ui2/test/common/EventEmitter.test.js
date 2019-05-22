import EventEmitter from 'src/common/EventEmitter';
import Evented from 'src/common/Evented';

describe('src/EventEmitter', () => {
  it('EventEmitter', () => {
    const instance = new EventEmitter();
    instance.eventNames();

    instance.once('test1', test, '1');
    instance.listeners('test', true);
    instance.listeners('test');

    const callBack = (arg1, arg2) => {
      expect(arg1).toEqual('arg1');
      expect(arg2).toEqual('arg2');
    };

    instance.on('someEvent', (arg1, arg2) => {
      expect(arg1).toEqual('arg1');
      expect(arg2).toEqual('arg2');
    });
    instance.on('someEvent1', callBack);
    instance.on('someEvent1', callBack);
    instance.on('someEvent1', callBack);
    instance.emit('someEvent', 'arg1', 'arg2');
    instance.emit('someEvent1', 'arg1', 'arg2');
    instance.emit('testEvent', 'arg1', 'arg2');

    instance.off('someEvent1', callBack);
    instance.on('someEvent1', callBack);
    instance.off('someEvent1');

    instance.isOn('someEvent');
    instance.isOn('someEvent', () => {});

    instance.removeAllListeners('someEvent');
    instance.removeAllListeners();
    instance.removeAllListeners('222');
  });

  it('Evented', () => {
    const eventedInstance = new Evented();
    const fn = () => { };
    eventedInstance.on('event', fn, 'arg1');
    eventedInstance.off('event', fn, 'arg1');
  });
});
