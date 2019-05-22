import renderRoot, { registerResize } from 'shared/components/Root';
import store from './store';
import Cart from './index';

renderRoot(store, Cart, true);

registerResize();

if (!__STATIC__) {
  window.forcedSetIFrameHeight = '100%';
}
