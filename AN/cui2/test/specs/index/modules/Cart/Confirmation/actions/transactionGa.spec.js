import { addGaTransactionsAction } from 'index/modules/Cart/Confirmation/actions/transactionGa';
import transactionGa from 'Cart/Confirmation/get_transactions_ga.json';

describe('index/modules/Cart/Confirmation/actions/transactionGa', () => {
  it('addGaTransactionsAction Should works well.', (done) => {
    addGaTransactionsAction().then((response) => {
      expect(response.body).toEqual(transactionGa.body);
      done();
    });
  });
});
