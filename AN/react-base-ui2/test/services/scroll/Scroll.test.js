import scroll from 'src/services/scroll';

describe('services/scroll', () => {
  test('basic usage', () => {
    const s = scroll;
    const addEventListener = jest.fn();
    const removeEventListener = jest.fn();

    const dom1 = { addEventListener, removeEventListener };
    const dom2 = { addEventListener, removeEventListener };

    s.addToGroup('test', dom1, false, true);
    s.addToGroup('test', dom2, false, true);

    expect(addEventListener).toHaveBeenCalledTimes(2);

    const onScrollSpy = jest.spyOn(s, 'onScroll');
    dom2.sync();
    expect(onScrollSpy).toBeCalled();

    dom1.scrollLeft = 0;
    dom1.scrollTop = 0;
    dom1.scrollWidth = 10;
    dom1.scrollHeight = 10;
    dom1.clientWidth = 2;
    dom1.clientHeight = 2;

    dom2.scrollLeft = 1;
    dom2.scrollTop = 1;
    dom2.scrollWidth = 10;
    dom2.scrollHeight = 10;
    dom2.clientWidth = 2;
    dom2.clientHeight = 2;

    s.onScroll('test', dom1);

    expect(dom1.scrollLeft).toBe(0);
    expect(dom1.scrollTop).toBe(0);

    s.onScroll('test', dom1, true);
    expect(dom1.scrollLeft).toBe(0);
    expect(dom1.scrollTop).toBe(0);

    s.onScroll('test', dom1);
    expect(dom1.scrollLeft).toBe(dom2.scrollLeft);
    expect(dom1.scrollTop).toBe(dom2.scrollTop);

    expect(s.getScrollbarSize({ offsetWidth: 1, offsetHeight: 0 })).toBe(null);
    const size = s.getScrollbarSize({
      offsetWidth: 100,
      clientWidth: 50,
      offsetHeight: 100,
      clientHeight: 50
    });
    expect(size.width).toBe(50);
    expect(size.height).toBe(50);

    s.removeFromGroup('non-exists', dom1);
    expect(s.groups.test.length).toBe(2);

    s.removeFromGroup('test', dom2);
    expect(s.groups.test.length).toBe(1);

    s.removeFromGroup('test', dom1);
    expect(s.groups.test).toBeUndefined();
  });
  test('scrollCallback should be tirgger correctly', () => {
    const s = scroll;
    const spy = jest.fn();
    const dom = document.createElement('div');
    const evt = document.createEvent('HTMLEvents');
    evt.initEvent('scroll', false, true);
    s.addToGroup('test', dom, false, true, spy);
    dom.dispatchEvent(evt);
    expect(spy).toHaveBeenCalled();
  });
});
