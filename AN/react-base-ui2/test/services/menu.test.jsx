import { attachPopupMenu, clearPopupMenu } from 'src/services/menu';

describe('services/menu', () => {
  test('attachPopupMenu and clearPopupMenu', () => {
    try {
      attachPopupMenu('test', {}, {});
    } catch (e) {
      expect(e.message).toBe('Target is not a DOM element.');
    }

    const target = document.createElement('div');
    target.classList.add('test-target');
    document.body.appendChild(target);
    expect(document.body.innerHTML).toMatchSnapshot();

    attachPopupMenu('test', {}, { target });
    expect(target.__menuAttached).toBe(true);

    attachPopupMenu('test', {}, { target });
    expect(target.__menuAttached).toBe(true);

    target.dispatchEvent(new MouseEvent('click'));
    expect(document.body.innerHTML).toMatchSnapshot();


    try {
      clearPopupMenu();
    } catch (e) {
      expect(e.message).toBe('Target is not a DOM element.');
    }

    clearPopupMenu(target);
    expect(target.__menuAttached).toBeUndefined();
  });
});
