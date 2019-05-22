import Navigation from 'src/services/navigation';
import { pageLoading } from 'src/services/loading';
import * as dialog from 'src/services/dialog';

describe('Navigation Service', () => {
  beforeEach(() => {
    pageLoading.show = jest.fn();
    dialog.confirm = jest.fn(() => Promise.resolve());
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('redirect should works fine', () => {
    const url = 'http://www.baidu.com';

    Navigation.redirect(url, { useReplace: false, showLoading: false, showConfirm: false });
    expect(window.location.href).toEqual('about:blank');
    expect(pageLoading.show).not.toHaveBeenCalled();

    Navigation.redirect(url, { useReplace: true, showLoading: true, showConfirm: false });
    expect(window.location.href).not.toEqual(url);
    expect(pageLoading.show).toHaveBeenCalledTimes(1);

    Navigation.redirect(url, { useReplace: false, showLoading: false, showConfirm: true });
    expect(dialog.confirm).toHaveBeenCalled();

    Navigation.redirect(url);
    expect(pageLoading.show).toHaveBeenCalledTimes(2);
  });

  it('reload should works fine', () => {
    const tempWindow = {
      location: {
        reload: jest.fn()
      }
    };

    Navigation.reload({ window: tempWindow, showLoading: false });
    expect(tempWindow.location.reload).toHaveBeenCalledTimes(1);

    Navigation.reload({ window: tempWindow, showLoading: true });
    expect(pageLoading.show).toHaveBeenCalled();
    expect(tempWindow.location.reload).toHaveBeenCalledTimes(2);

    Navigation.reload();
    expect(pageLoading.show).toHaveBeenCalledTimes(2);
  });

  it('getState should works fine', () => {
    Navigation.setState();
    expect(Navigation.getState()).toBeFalsy();

    Navigation.setState(true);
    expect(Navigation.getState()).toBeTruthy();

    Navigation.setState(false);
    expect(Navigation.getState()).toBeFalsy();

    Navigation.setState(undefined);
    expect(Navigation.getState()).toBeFalsy();

    Navigation.setState(null);
    expect(Navigation.getState()).toBeFalsy();

    Navigation.setState('');
    expect(Navigation.getState()).toBeFalsy();
  });
});

