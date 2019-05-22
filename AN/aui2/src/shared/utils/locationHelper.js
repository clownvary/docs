export function redirect(url, win, useReplace = true) {
  /* eslint-disable */
  win = win || window;
  /* eslint-enable */
  window.isPageRedirectInCurrentWorkflow = true;

  /* fix the problem that page redirect will block unit test in PhantomJS */
  /* istanbul ignore else */
  if (__TESTING__) {
    console.log(`TEST LOG: try to run location.${useReplace ? 'replace' : 'href'}(${url})`);
    return;
  }

  /* istanbul ignore next */
  if (useReplace) {
    win.location.replace(url);
  } else {
    /* eslint-disable */
    win.location.href = url;
    /* eslint-enable */
  }
}

export function reload(win) {
  /* eslint-disable */
  win = win || window;
  /* eslint-enable */
  window.isPageRedirectInCurrentWorkflow = true;
  win.location.replace(win.location.href);
}
