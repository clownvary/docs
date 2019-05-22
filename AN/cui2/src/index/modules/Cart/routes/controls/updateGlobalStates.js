import { syncLegacyCuiAction } from 'index/actions/legacyCui';
import { refreshCommonPartsActions } from 'index/components/Master/actions';

const updateGlobalStates = (store) => {
  store.dispatch(refreshCommonPartsActions());
  store.dispatch(syncLegacyCuiAction());
};

export default updateGlobalStates;
