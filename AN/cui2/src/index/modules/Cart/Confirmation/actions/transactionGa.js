import { gaService } from 'shared/services';
import API from '../api';

export const addGaTransactionsAction = () =>
  API.getGaTransaction().then((response) => {
    gaService.getInstance().addTransaction(response);
    return Promise.resolve(response);
  });
