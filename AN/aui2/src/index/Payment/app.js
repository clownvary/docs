import renderRoot, {
  registerResize,
  caculateIframeHeight
} from 'shared/components/Root';

import store from './store';
import Payment from './index';
import { windowResize } from './actions';

renderRoot(store, Payment, true);

registerResize(() => {
  const iframeHeight = caculateIframeHeight();
  store.dispatch(windowResize(iframeHeight));
});


if (!__STATIC__) {
  /* draftReceiptID and draftReceiptEntryID are involved when MODIFYING the permit.
    Since new receiptID and receiptEntryID will be created in payment page,
    if you want to go back to the previous page, then the old receiptID and receiptEntryID
    should be used.
  */
  window.forcedSetIFrameHeight = '100%';
}
