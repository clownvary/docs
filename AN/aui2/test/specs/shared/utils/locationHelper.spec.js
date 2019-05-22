import {
  redirect,
  reload
} from 'shared/utils/locationHelper';

describe('shared/utils/locationHelper', () => {
  test('redirect method should work fine', () => {
    const oldConsole = global.console;
    global.console = {
      log: jest.fn()
    };
    const url = 'url';
    const win = null;

    redirect(url, win);
    expect(global.console.log).toHaveBeenCalledTimes(1);
    global.console = oldConsole;
  });

  test('redirect method should work fine, if useReplace is false', () => {
    const oldConsole = global.console;
    global.console = {
      log: jest.fn()
    };
    const url = 'url';
    const win = null;

    redirect(url, win, false);
    expect(global.console.log).toHaveBeenCalledTimes(1);
    global.console = oldConsole;
  });

  test('reload method should work fine', () => {
    const win = null;
    reload(win)
  });
});
