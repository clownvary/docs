import { enableScroll } from 'index/Resource/utils/overflow';

describe('index/Resource/utils/overflow.js', () => {
  test('basic usage', () => {
    const el = document.createElement('div');

    let noException = true;
    try {
      enableScroll(null, false);
    } catch (e) {
      noException = false
    }
    expect(noException).toBe(true);

    enableScroll(el, false);
    expect(el.classList.contains('hide-scroll')).toBe(true);

    enableScroll(el, true);
    expect(el.classList.contains('hide-scroll')).toBe(false);

    enableScroll(el, true);
    expect(el.classList.contains('hide-scroll')).toBe(false);

    el.classList.add('hide-scroll');
    expect(el.classList.length).toBe(1);
    enableScroll(el, false);
    expect(el.classList.length).toBe(1);
  })
});
