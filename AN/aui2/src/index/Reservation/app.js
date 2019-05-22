import renderRoot, { registerResize } from 'shared/components/Root';
import store from './store';
import Reservation from './index';

renderRoot(store, Reservation, true);
registerResize();
