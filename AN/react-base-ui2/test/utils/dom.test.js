import * as Dom from 'src/utils/dom';

function mockProperty(obj, property) {
  const originValue = obj[property];
  Object.defineProperty(obj, property, ((_value) => {
    return {
      get: function _get() {
        return _value;
      },
      set: function _set(v) {
        _value = v;
      },
      configurable: true
    };
  })(obj[property]));
  return originValue;
}

function resetProperty(obj, property, value) {
  obj[property] = value;
}
describe('utils/dom', () => {
  describe('addClass method:', () => {
    const ele = document.createElement('div');
    const originClasses = ele.classList;
    const className = 'testClass';
    afterAll(() => {
      resetProperty(ele, 'classList', originClasses);
    });
    it('addClass should work fine when class is undefined', () => {
      Dom.addClass(ele, undefined);
      expect(ele.classList).toEqual(originClasses);
    });
    it('addClass should work fine when class is variable', () => {
      Dom.addClass(ele, className);
      expect(ele.classList).toContain(className);
    });
    it('addClass should work fine when classlist is undefined', () => {
      mockProperty(ele, 'classList');
      ele.classList = undefined;
      Dom.addClass([ele], className);
      expect(ele.className).toContain(className);
    });
  });

  describe('removeClass method:',()=>{
    const ele = document.createElement('div');
    const originClasses = ele.classList;
    const className = 'testClass';
    afterAll(()=>{
      resetProperty(ele, 'classList', originClasses);
    });

    it('removeClass should work fine when class is undefined',()=>{
      Dom.removeClass(ele, undefined);
      expect(ele.classList).toEqual(originClasses);
    });
    it('removeClass should work fine when class is variable',()=>{
      Dom.addClass(ele, className);
      expect(ele.classList).toContain(className);
      Dom.removeClass(ele, className);
      expect(ele.classList).not.toContain(className);
    });
    it('removeClass should work fine when classlist is undefined',()=>{
      mockProperty(ele, 'classList');
      ele.classList = undefined;
      ele.className = className;
      expect(ele.className).toContain(className);
      Dom.removeClass([ele], className);
      expect(ele.className).not.toContain(className);
    });
  });

  describe('hasClass method:', () => {
    const ele = document.createElement('div');
    const originClasses = ele.classList;
    const className = 'testClass';
    afterAll(() => {
      resetProperty(ele, 'classList', originClasses);
    });

    it('hasClass should work fine when class is variable', () => {
      expect(Dom.hasClass(ele, className)).toBeFalsy();
      Dom.addClass(ele, className);
      expect(Dom.hasClass(ele, className)).toBeTruthy();
    });
    it('hasClass should work fine when classList is undefined', () => {
      mockProperty(ele, 'classList');
      ele.classList = undefined;
      Dom.addClass(ele, className);
      expect(Dom.hasClass(ele, className)).toBeTruthy();
      Dom.removeClass(ele, className);
      expect(Dom.hasClass(ele, className)).toBeFalsy();
    });
  });
  it('isWindow should work fine', () => {
    expect(Dom.isWindow()).toBeFalsy();
    expect(Dom.isWindow(window)).toBeTruthy();
    expect(Dom.isWindow({ window })).toBeFalsy();
  });
  it('outerWidth should work fine', () => {
    const ele = document.createElement('div');
    mockProperty(ele, 'offsetWidth');
    ele.offsetWidth = 100;
    expect(Dom.outerWidth(ele)).toEqual(100);

    const originWith = document.documentElement.clientWidth;
    mockProperty(document.documentElement, 'clientWidth');
    document.documentElement.clientWidth = 100;
    expect(Dom.outerWidth(window)).toEqual(100);
    resetProperty(document.documentElement, 'clientWidth', originWith);
  });

  it('outerHeight should work fine', () => {
    const ele = document.createElement('div');
    mockProperty(ele, 'offsetHeight');
    ele.offsetHeight = 100;
    expect(Dom.outerHeight(ele)).toEqual(100);

    const originHeight = document.body.offsetHeight;

    mockProperty(document.body, 'offsetHeight');
    document.body.offsetHeight = 100;
    expect(Dom.outerHeight(document)).toEqual(100);
    resetProperty(document.body, 'offsetHeight', originHeight);
  });

  it('scrollLeft should work fine', () => {
    const ele = document.createElement('div');
    mockProperty(ele, 'scrollLeft');
    ele.scrollLeft = 100;
    expect(Dom.scrollLeft(ele)).toEqual(100);
  });
  it('scrollTop should work fine', () => {
    const ele = document.createElement('div');
    mockProperty(ele, 'scrollTop');
    ele.scrollTop = 100;
    expect(Dom.scrollTop(ele)).toEqual(100);
  });
  it('offset should work fine', () => {
    const ele = document.createElement('div');
    expect(Dom.offset()).toEqual(null);

    expect(Dom.offset(ele)).toEqual({ top: 0, left: 0 });
    mockProperty(ele, 'getClientRects');
    mockProperty(ele, 'getBoundingClientRect');
    mockProperty(ele, 'ownerDocument');
    ele.getClientRects = jest.fn(() => {
      return { length: 2 };
    });
    ele.getBoundingClientRect = jest.fn(() => {
      return { top: 200, left: 100 };
    });
    expect(Dom.offset(ele)).toEqual({ top: 200, left: 100 });
  });
  it('calcScrollWidth should work fine', () => {
    expect(Dom.calcScrollWidth()).toEqual(0);
  });
  it('isPointInDOM should work fine', () => {
    const ele = document.createElement('div');
    expect(Dom.isPointInDOM(100, 200, ele)).toBeFalsy();
    mockProperty(ele, 'getBoundingClientRect');
    ele.getBoundingClientRect = jest.fn(() => { return { left: 100, top: 200, right: 300, bottom: 400 }; });
    expect(Dom.isPointInDOM(100, 200, null)).toBeFalsy();
    expect(Dom.isPointInDOM(110, 300, ele)).toBeTruthy();
  });
  it('findAncestor should work fine', () => {
    const elem = document.createElement('div');
    const className = 'test class';
    expect(Dom.findAncestor(elem, className)).toEqual(null);
  });
});
