import renderRoot, { registerResize } from 'shared/components/Root';
import store from './store';
import PermitDetail from './index';

renderRoot(store, PermitDetail, true);

registerResize();

if (!__STATIC__) {
  window.forcedSetIFrameHeight = '100%';
}
