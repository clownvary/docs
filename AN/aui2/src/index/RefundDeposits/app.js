import renderRoot, { registerResize } from 'shared/components/Root';
import store from './store';
import RefundDeposits from './index';

renderRoot(store, RefundDeposits, true);

registerResize();

if (!__STATIC__) {
  window.forcedSetIFrameHeight = '100%';
}
