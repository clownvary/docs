import renderRoot, { registerResize } from 'shared/components/Root';
import store from './store';
import CustomError from './index';

renderRoot(store, CustomError, true);

registerResize();

if (!__STATIC__) {
  window.forcedSetIFrameHeight = '100%';
}
