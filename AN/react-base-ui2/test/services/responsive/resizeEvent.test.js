import { attachResizeEvent, detachResizeEvent } from 'src/services/responsive/resizeEvent';

describe('services/responsive/resizeEvent.js', () => {
  test('basic usage', () => {
    const target = document.createElement('div');
    const identity = () => {};
    document.body.appendChild(target);
    expect(attachResizeEvent()).toBeUndefined();

    const testTarget = { resizeSensor: {} };
    attachResizeEvent(testTarget);
    expect(testTarget.resizeSensor).toEqual({});

    target.style.position = 'absolute';
    attachResizeEvent(target, identity);
    expect(target.resizeSensor).toBeTruthy();

    const expand = document.querySelector('.resize-sensor-expand');
    expand.dispatchEvent(new Event('scroll'));

    jest.useFakeTimers();
    const resizeEmitterSpy = jest.spyOn(target.resizeEmitter, 'emit');
    Object.defineProperty(target, 'clientWidth', { get: () => 100 });
    expand.dispatchEvent(new Event('scroll'));
    jest.runAllTimers();
    expect(resizeEmitterSpy).toBeCalled();

    resizeEmitterSpy.mockClear();
    Object.defineProperty(target, 'clientHeight', { get: () => 100 });
    const resizeEmitterBackup = target.resizeEmitter;
    delete target.resizeEmitter;
    expand.dispatchEvent(new Event('scroll'));
    jest.runAllTimers();
    expect(resizeEmitterSpy).not.toBeCalled();
    target.resizeEmitter = resizeEmitterBackup;

    expect(detachResizeEvent()).toBeUndefined();
    detachResizeEvent({});
    detachResizeEvent(target, () => {});
    expect(target.resizeSensor).toBeUndefined();

    attachResizeEvent(target);
    expect(target.resizeSensor).toBeTruthy();
    detachResizeEvent(target);
    expect(target.resizeSensor).toBeTruthy();

    target.removeChild(target.resizeSensor);
    delete target.resizeSensor;
    delete target.resizeEmitter;

    attachResizeEvent(target, identity);
    target.removeChild(target.resizeSensor);
    expect(detachResizeEvent(target, () => {})).toBeUndefined();
  });
});
