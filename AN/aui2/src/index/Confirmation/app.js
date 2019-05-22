import renderRoot, { registerResize } from 'shared/components/Root';

import store from './store';
import Confirmation from './index';
import { resize } from './actions/index';

renderRoot(store, Confirmation);

registerResize((height) => {
  store.dispatch(resize(height));
});

