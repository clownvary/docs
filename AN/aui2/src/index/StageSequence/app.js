import renderRoot, { registerResize } from 'shared/components/Root';
import store from './store';
import StageSequence from './index';

renderRoot(store, StageSequence, true);

registerResize();
