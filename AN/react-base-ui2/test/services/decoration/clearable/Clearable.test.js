import Clearable from 'src/services/decoration/clearable';
import { Trigger } from 'src/consts';

describe('services/decoration/clearable/Clearable.js', () => {
  test('basic usage', () => {
    const onClear = jest.fn();
    const el = document.createElement('input');
    el.setAttribute('id', 'test-clearable');
    document.body.appendChild(el);

    let service;

    try {
      service = new Clearable({}, {});
    } catch (e) {
      expect(e.message).toBe('Invalid target element');
    }

    service = new Clearable(el, { enabled: true, onClear });

    try {
      service.enable();
    } catch (e) {
      expect(e.message).toBe('Already enabled');
    }

    jest.spyOn(service, 'show');
    jest.spyOn(service, 'hide');
    expect(service.show).not.toBeCalled();
    expect(service.hide).not.toBeCalled();

    el.dispatchEvent(new Event('focus'));
    expect(service.show).toHaveBeenCalledTimes(1);
    expect(el.classList.contains('x')).toBe(true);

    el.dispatchEvent(new MouseEvent('mousemove'));
    expect(el.classList.contains('onX')).toBe(true);

    el.dispatchEvent(new MouseEvent('click'));
    expect(onClear).toHaveBeenCalledTimes(1);

    service.options.onClear = null;
    el.dispatchEvent(new MouseEvent('click'));
    expect(onClear).toHaveBeenCalledTimes(1);

    el.dispatchEvent(new MouseEvent('mousemove', { clientX: -30 }));
    expect(el.classList.contains('onX')).toBe(false);

    el.dispatchEvent(new MouseEvent('click'));
    expect(onClear).toHaveBeenCalledTimes(1);

    el.dispatchEvent(new Event('blur'));
    expect(service.hide).toHaveBeenCalledTimes(1);
    expect(el.classList.contains('x')).toBe(false);

    service.disable();
    expect(el.classList.contains('an-clearable')).toBe(false);

    service = new Clearable('#test-clearable', { trigger: Trigger.HOVER });

    jest.spyOn(service, 'show');
    jest.spyOn(service, 'hide');

    expect(service.show).not.toBeCalled();
    expect(service.hide).not.toBeCalled();

    expect(el.classList.contains('an-clearable')).toBe(false);
    service.enable();
    expect(el.classList.contains('an-clearable')).toBe(true);
  });
});
