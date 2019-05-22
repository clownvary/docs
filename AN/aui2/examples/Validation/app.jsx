import renderRoot from 'shared/components/Root';
import store from './store';
import Cart from './containers';
import './app.less';

renderRoot(store, Cart);
