import Selectable from 'src/services/decoration/selectable';

describe('services/decoration/selectable/Selectable.js', () => {
  test('basic usage', () => {
    jest.useFakeTimers();

    const onStart = jest.fn();
    const onEnd = jest.fn();
    const el = document.createElement('div');
    el.classList.add('allow-start');
    document.body.appendChild(el);

    let service;

    try {
      service = new Selectable({}, {});
    } catch (e) {
      expect(e.message).toBe('Invalid target element');
    }

    // enable by default
    service = new Selectable(el, {
      selectableClass: 'prevent-start',
      key: 'test',
      onEnd,
      onStart
    });

    jest.spyOn(service, 'getRectBox');

    // try enable an enabled one
    try {
      service.enable();
    } catch (e) {
      expect(e.message).toBe('Already enabled');
    }

    // start prevented by selectableClass
    el.dispatchEvent(new MouseEvent('mousedown'));
    expect(service.ipos).toBeUndefined();

    // start prevented by key
    service.options.selectableClass = 'allow-start';
    el.dispatchEvent(new MouseEvent('mousedown'));
    expect(service.ipos).toBeUndefined();
    expect(onStart).toHaveBeenCalledTimes(1);

    // start successfully
    delete service.options.key;
    el.dispatchEvent(new MouseEvent('mousedown'));
    expect(service.on).toBe(true);
    expect(onStart).toHaveBeenCalledTimes(2);

    // drawing rect
    service.ipos = null;
    document.dispatchEvent(new MouseEvent('mousemove'));
    expect(service.rectBox).toBeUndefined();

    service.ipos = [1, 1];
    service.getRectBox.mockImplementation(() => null);
    document.dispatchEvent(new MouseEvent('mousemove'));
    expect(service.rectBox).toBeUndefined();

    service.getRectBox.mockRestore();
    document.dispatchEvent(new MouseEvent('mousemove'));
    expect(service.rectBox).toBeTruthy();

    window.dispatchEvent(new MouseEvent('mouseup'));
    expect(service.rectBox).toBeNull();

    service.disable();
    expect(service.on).toBe(false);

    const onSelect = jest.fn();
    const onDeselect = jest.fn();
    const subEl1 = document.createElement('div');
    const subEl2 = document.createElement('div');
    const subEl3 = document.createElement('div');
    const subEl4 = document.createElement('div');
    subEl1.classList.add('selectable', 'selected');
    subEl2.classList.add('selectable');
    subEl3.classList.add('selectable');
    subEl4.classList.add('selectable');
    el.appendChild(subEl1);
    el.appendChild(subEl2);
    el.appendChild(subEl3);
    el.appendChild(subEl4);

    service = new Selectable('.allow-start', {
      enabled: false,
      elements: '.selectable',
      selectedClass: 'selected',
      selectableClass: 'allow-start',
      onSelect,
      onDeselect
    });
    jest.spyOn(service, 'isCross');
    jest.spyOn(service, 'getRectBox');
    jest.spyOn(service, 'suspend');

    service.enable();
    expect(service.on).toBe(true);

    el.dispatchEvent(new MouseEvent('mousedown'));
    expect(service.ipos).toBeTruthy();

    document.dispatchEvent(new MouseEvent('mousemove'));
    expect(service.rectBox).toBeTruthy();

    subEl1.dispatchEvent(new MouseEvent('click'));
    expect(service.suspend).toHaveBeenCalledTimes(1);

    service.ipos = null;
    window.dispatchEvent(new MouseEvent('mouseup'));
    expect(service.rectBox).toBeTruthy();

    service.ipos = [undefined, undefined];
    window.dispatchEvent(new MouseEvent('mouseup'));
    expect(service.rectBox).toBeNull();

    service.ipos = [1, 1];
    service.getRectBox.mockImplementationOnce(() => null);
    window.dispatchEvent(new MouseEvent('mouseup'));
    expect(service.isCross).not.toBeCalled();

    service.ipos = [1, 1];
    service.isCross.mockImplementationOnce(() => true)
                   .mockImplementationOnce(() => true)
                   .mockImplementationOnce(() => false);
    window.dispatchEvent(new MouseEvent('mouseup'));
    jest.runAllTimers();
    expect(onSelect).toHaveBeenCalledTimes(2);
    expect(onDeselect).toHaveBeenCalledTimes(1);

    // misc
    service.ipos = [1, 1];
    service.drawRect({ pageX: 0, pageY: 0 });
    expect(service.rectBox.style.left).toBe('1px');

    delete service.rectBox;
    service.cleanRectBox();
    expect(service.rectBox).toBeNull();
  });

  test('enable scroll', () => {
    const rectBoxElement = document.getElementById('an-selection-box');
    if (rectBoxElement) {
      rectBoxElement.parentNode.removeChild(rectBoxElement);
    }

    const getMouseEvent = (type, pageX = 0, pageY = 0) => {
      const mouseEvent = new MouseEvent(type);
      mouseEvent.pageX = pageX;
      mouseEvent.pageY = pageY;
      return mouseEvent;
    };

    jest.useFakeTimers();

    const onStart = jest.fn();
    const onEnd = jest.fn();
    const container = document.createElement('div');
    container.classList.add('container');
    document.body.appendChild(container);

    const getBoundingClientRectSpy = jest.spyOn(container, 'getBoundingClientRect');
    container.getBoundingClientRect.mockImplementation(
      () => ({ top: 100, left: 100, right: 400, bottom: 400 }));

    const service = new Selectable(container, {
      selectableClass: 'container',
      scrollEnabled: true,
      scrollContainer: container,
      scrollVertical: 20,
      scrollHorizontal: 20,
      scrollSensitiveDistance: 5,
      onEnd,
      onStart
    });

    const getRectBoxSpy = jest.spyOn(service, 'getRectBox');

    container.dispatchEvent(getMouseEvent('mousedown'));
    expect(service.on).toBe(true);
    expect(onStart).toHaveBeenCalledTimes(1);

    const mouseMoveEvent1 = getMouseEvent('mousemove', 10, 10);

    // drawing rect
    service.ipos = null;
    document.dispatchEvent(mouseMoveEvent1);
    expect(service.rectBox).toBeUndefined();

    service.ipos = [20, 20];
    document.dispatchEvent(mouseMoveEvent1);
    expect(service.rectBox).toBeTruthy();

    service.scrollPos = [20, 20];
    document.dispatchEvent(mouseMoveEvent1);
    expect(service.rectBox).toBeTruthy();
    jest.runAllTimers();

    const mouseMoveEvent2 = getMouseEvent('mousemove', 400, 400);
    service.scrollPos = [0, 0];
    service.ipos = [200, 200];
    document.dispatchEvent(mouseMoveEvent2);
    expect(service.rectBox).toBeTruthy();
    jest.runAllTimers();

    const mouseMoveEvent3 = getMouseEvent('mousemove', 200, 200);
    service.scrollPos = [50, 100];
    service.ipos = [100, 50];
    document.dispatchEvent(mouseMoveEvent3);
    expect(service.rectBox).toBeTruthy();
    jest.runAllTimers();

    window.dispatchEvent(getMouseEvent('mouseup'));
    expect(service.rectBox).toBeNull();

    service.disable();
    expect(service.on).toBe(false);

    getBoundingClientRectSpy.mockReset();
    getBoundingClientRectSpy.mockRestore();
    getRectBoxSpy.mockReset();
    getRectBoxSpy.mockRestore();
  });
});
