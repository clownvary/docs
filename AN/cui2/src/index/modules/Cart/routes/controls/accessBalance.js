import getRoutPathWithOrg from 'shared/utils/getRoutPathWithOrg';
import { fetchBalanceAction } from '../../../Cart/Balance/actions/balance';

const accessBalance = (replace, callback, store) => {
  store.dispatch(fetchBalanceAction()).then((response) => {
    const { body: { outstanding_balance_smmary:
      { outstanding_balances: outstandingBalances }
    } } = response;
    if (!(outstandingBalances && outstandingBalances.length > 0)) {
      replace(getRoutPathWithOrg('newcart'));
    }
    callback();
  });
};

export default accessBalance;
