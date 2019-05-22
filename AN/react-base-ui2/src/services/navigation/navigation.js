import isFunction from 'lodash/isFunction';
import omit from 'lodash/omit';
import { pageLoading } from '../loading';
import { confirm } from '../dialog';

export default class Navigation {

  constructor() {
    this.isRunning = false;
  }

  exec(execFunc, showLoading, showConfirm, confirmOptions = { message: 'Are you sure to leave this page?' }) {
    const next = () => {
      if (showLoading) {
        pageLoading.show();
      }
      this.setState(true);
      isFunction(execFunc) && execFunc();
    };
    if (showConfirm) {
      const options = omit(confirmOptions, ['message']);
      confirm(confirmOptions.message, {
        title: 'Redirect',
        showCancel: true,
        cancelText: 'Cancel',
        confirmText: 'Ok',
        ...options
      }).then(() => {
        next();
      });
    } else {
      next();
    }
  }

  redirect(url, options = {
    window: null,
    useReplace: false,
    showLoading: true,
    showConfirm: false
  }) {
    const { useReplace, window: optWindow, showLoading, showConfirm } = options;
    const win = optWindow || window;
    const execFunc = () => {
      useReplace ? win.location.replace(url) : win.location.href = url;
    };
    this.exec(execFunc, showLoading, showConfirm);
  }

  reload(options = { window: null, showLoading: true, showConfirm: false }) {
    const { window: optWindow, showLoading, showConfirm } = options;
    const win = optWindow || window;
    const execFunc = () => { win.location.reload(); };
    this.exec(execFunc, showLoading, showConfirm, { message: 'Are you sure to reload this page', title: 'Reload' });
  }

  getState() {
    return this.isRunning;
  }
  setState(state = false) {
    this.isRunning = state;
  }
}

