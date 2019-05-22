import renderRoot, { registerResize } from 'shared/components/Root';
import store from './store';
import ReservationDetail from './index';

renderRoot(store, ReservationDetail, true);

registerResize();
