import renderRoot, { registerResize } from 'shared/components/Root';

import store from './store';
import Resource from './index';
import { resizeAction } from './actions/main';

renderRoot(store, Resource, true);

registerResize((height) => {
  store.dispatch(resizeAction(height));
});

if (!__STATIC__) {
  // we have to replace current history state to Resource Calendar Page with Create Mode,
  // then history.back will back to Resource Calendar Page With Create Mode instead of Update Mode.
  // otherwise you can get an permit lock error.
  history.replaceState(
    null,
    null,
    location.href
      .replace(/(permit_id=)(\d*)/, (match, permitName, permitId) => `${permitName}${permitId}`)
      .replace(/(receipt_id=)(\d*)/, '')
      .replace(/(batch_id=)(\d*)/, '')
  );
}
