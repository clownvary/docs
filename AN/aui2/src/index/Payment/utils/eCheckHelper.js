import find from 'lodash/find';
import normalizeData from 'shared/utils/normalizeData';

import { paymentTypes, paymentTypeNames, newOptions } from '../consts';

const getECheckLabel = () => {
  const echeckOption = find(window.__payment__.__initialState__.paymentOptions,
    item => item.id === paymentTypes.ELECTRONICCHECK);
  return echeckOption ?
    echeckOption.name : paymentTypeNames[paymentTypes.ELECTRONICCHECK];
};


const formatECheckOption = (eCheckInfo, eCheckLength) => {
  if (eCheckInfo && eCheckInfo.value !== newOptions.NEW_OPTION_VALUE) {
    const accountNumber = eCheckInfo.eft_account_number;
    if (accountNumber) {
      let numberStr = accountNumber.substr(accountNumber.length - 4);

      if (!numberStr.match(/^\d{4}/g)) {
        numberStr = accountNumber.substr(accountNumber.length - 3);
      }

      const name = `${eCheckInfo.eft_account_type_name} ends in ${numberStr}`;
      const id = eCheckInfo.echeck_id && eCheckInfo.echeck_id !== -1 ? eCheckInfo.echeck_id : `newECheck_${eCheckLength}`;

      return {
        ...eCheckInfo,
        is_add_to_customer_ecp: !!eCheckInfo.is_add_to_customer_ecp,
        name,
        echeck_id: id,
        text: name,
        value: id
      };
    }
  }

  return eCheckInfo;
};

const getECheckList = (list) => {
  const newList = list.map(item => formatECheckOption(item, list.length));

  const eCheckList = normalizeData(newList, {
    valueField: 'echeck_id'
  });

  eCheckList.data.push({
    value: newOptions.NEW_OPTION_VALUE,
    text: `Use new ${getECheckLabel()}`
  });

  return eCheckList;
};

export default {
  getECheckList,
  getECheckLabel,
  formatECheckOption
};
