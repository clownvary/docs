import { fromJS } from 'immutable';
import isArray from 'lodash/isArray';
import * as PaymentTypes from '../consts/paymentTypes';
import {
  generateCreditCardsIds,
  generateEChecksIds
} from './payment';

const PAYMET_TYPES = fromJS({
  [PaymentTypes.CREDIT_CARD]: {
    component: 'CreditCard',
    selected: null,
    list: [],
    tempList: [],
    totalList: [],
    cardTypes: [],
    instanceOfPCI: null,
    merchantName: '',
    autoCheckFirst: false,
    disableFilterList: false,
    disableCVVandCVC: false,
    disableGuarantee: false,
    disableSaveForFurture: false,
    setInstanceOfPCIAction: null,
    getPCILocationOfCCAsyncAction: null
  },
  [PaymentTypes.ECHECK]: {
    component: 'ECheck',
    selected: null,
    list: [],
    tempList: [],
    totalList: [],
    autoCheckFirst: false,
    disableFilterList: false,
    disableTips: false,
    disableGuarantee: false,
    disableSaveForFurture: false
  }
});

const PAYMENT_MODULE = fromJS({
  types: {},
  selectedType: null,
  selected: null,
  isShow: true
});

export default class PaymentManagerHelper {

  constructor() {
    this.modules = fromJS({});
  }

  getTypesIndexs = moduleName => [moduleName, 'types']

  getIsShowIndexs = moduleName => [moduleName, 'isShow']

  getSelectedTypeIndexs = moduleName => [moduleName, 'selectedType']

  getTypeIndexs = (moduleName, typeName) => [moduleName, 'types', typeName]

  getListIndexs = (moduleName, typeName) => [moduleName, 'types', typeName, 'list']

  getTotalListIndexs = (moduleName, typeName) => [moduleName, 'types', typeName, 'totalList']

  getTempListIndexs = (moduleName, typeName) => [moduleName, 'types', typeName, 'tempList']

  getCardTypesIndexs = (moduleName, typeName) => [moduleName, 'types', typeName, 'cardTypes']

  getSelectedIndexs = (moduleName, typeName) => [moduleName, 'types', typeName, 'selected']

  getMerchantNameIndexs = (moduleName, typeName) => [moduleName, 'types', typeName, 'merchantName']

  getInstanceOfPCIIndexs = (moduleName, typeName) => [moduleName, 'types', typeName, 'instanceOfPCI']

  syncModules(modules) {
    this.modules = modules;
    return this;
  }

  getModules() {
    return this.modules;
  }

  registerModule(moduleName, types, defaultType = PaymentTypes.CREDIT_CARD, settings = {}) {
    if (moduleName) {
      types = types.reduce((result, item) => {
        let type = PAYMET_TYPES.get(item);
        const options = settings[item];
        if (options) {
          type = type.merge(options);
        }
        return type ? result.set(item, type) : result;
      }, fromJS({}));

      const module = PAYMENT_MODULE
                        .set('types', types)
                        .set('selectedType', defaultType);

      this.modules = this.modules.set(moduleName, module);
    } else {
      console.error('Register module failed, must specify a payment module name.');
    }
    return this;
  }

  setModule(moduleName, module) {
    this.modules = this.modules.set(moduleName, module);
    return this;
  }

  getModule(moduleName) {
    return this.modules.get(moduleName);
  }

  setIsShow(moduleName, value) {
    const indexs = this.getIsShowIndexs(moduleName);
    this.modules = this.modules.setIn(indexs, value);
    return this;
  }

  getIsShow(moduleName) {
    const indexs = this.getIsShowIndexs(moduleName);
    return this.modules.getIn(indexs);
  }

  setSelectedType(moduleName, typeName) {
    const indexs = this.getSelectedTypeIndexs(moduleName);
    this.modules = this.modules.setIn(indexs, typeName);
    return this;
  }

  getSelectedType(moduleName) {
    const indexs = this.getSelectedTypeIndexs(moduleName);
    return this.modules.getIn(indexs);
  }

  setList(moduleName, typeName, list = []) {
    const indexs = this.getListIndexs(moduleName, typeName);
    this.modules = this.modules.setIn(indexs, fromJS(list));
    return this;
  }

  getList(moduleName, typeName) {
    const indexs = this.getListIndexs(moduleName, typeName);
    return this.modules.getIn(indexs);
  }

  setTotalList(moduleName, typeName, list = []) {
    const indexs = this.getTotalListIndexs(moduleName, typeName);
    this.modules = this.modules.setIn(indexs, fromJS(list));
    return this;
  }

  setInstanceOfPCI(moduleName, typeName, instance) {
    const indexs = this.getInstanceOfPCIIndexs(moduleName, typeName);
    this.modules = this.modules.setIn(indexs, instance);
    return this;
  }

  getTotalList(moduleName, typeName) {
    const indexs = this.getTotalListIndexs(moduleName, typeName);
    return this.modules.getIn(indexs);
  }

  setTempList(moduleName, typeName, list = []) {
    const indexs = this.getTempListIndexs(moduleName, typeName);
    this.modules = this.modules.setIn(indexs, fromJS(list));
    return this;
  }

  getTempList(moduleName, typeName) {
    const indexs = this.getTempListIndexs(moduleName, typeName);
    return this.modules.getIn(indexs);
  }

  /**
   * setCardTypes - set cardTypes if it exists.
   *
   * @param  {String} moduleName Payment module name, such as 'primary', 'secondary'
   * @param  {String} typeName   Payment type name, such as 'Credit Card', 'Electronic Check'
   * @param  {Array} cardTypes  Card types list
   */
  setCardTypes(moduleName, typeName, cardTypes) {
    const indexs = this.getCardTypesIndexs(moduleName, typeName);
    if (this.modules.getIn(indexs) !== undefined) {
      this.modules = this.modules.setIn(indexs, fromJS(cardTypes));
    }
    return this;
  }

  getCardTypes(moduleName, typeName) {
    const indexs = this.getCardTypesIndexs(moduleName, typeName);
    return this.modules.getIn(indexs);
  }

  /**
   * setMerchantName - set merchantName if it exists.
   */
  setMerchantName(moduleName, typeName, merchantName) {
    const indexs = this.getMerchantNameIndexs(moduleName, typeName);
    if (this.modules.getIn(indexs) !== undefined) {
      this.modules = this.modules.setIn(indexs, fromJS(merchantName));
    }
    return this;
  }

  getMerchantName(moduleName, typeName) {
    const indexs = this.getMerchantNameIndexs(moduleName, typeName);
    return this.modules.getIn(indexs);
  }

  setSelect(moduleName, typeName, item) {
    const indexs = this.getSelectedIndexs(moduleName, typeName);
    this.modules = this.modules.setIn(indexs, fromJS(item));
    if (item) {
      this.modules = this.modules.setIn([moduleName, 'selected'], fromJS(item));
    }
    return this;
  }

  getSelect(moduleName, typeName) {
    if (typeName) {
      const indexs = this.getSelectedIndexs(moduleName, typeName);
      return this.modules.getIn(indexs);
    }
    return this.modules.getIn([moduleName, 'selected']);
  }

  updateShowList(moduleName, typeName) {
    const modules = this.modules;
    const type = modules.getIn(this.getTypeIndexs(moduleName, typeName));
    const totalList = type.get('totalList');
    const tempList = type.get('tempList');

    const disableFilterList = type.get('disableFilterList');
    let list = type.get('list');
    let validList = totalList.concat([]);

    if (!disableFilterList) {
      const selectedList = modules.remove(moduleName).toList().filter((md) => {
        const { isShow, types: { [typeName]: { selected } = false } } = md.toJS();
        return isShow && selected;
      }).map(md => md.getIn(['types', typeName, 'selected']));
      validList = validList.filter(item => !selectedList.some(c => c.get('id') === item.get('id')));
    }

    validList = tempList.concat(validList);
    list = list.filter(item => validList.some(c => c.get('id') === item.get('id')));
    validList.forEach((item) => {
      const index = list.findIndex(c => c.get('id') === item.get('id'));
      list = index === -1 ? list.push(item) : list.set(index, item);
    });

    this.setList(moduleName, typeName, list);
  }

  updateSelectedPayItem(moduleName, typeName) {
    const list = this.getList(moduleName, typeName);
    const totalList = this.getTotalList(moduleName, typeName);
    const selectItem = this.getSelect(moduleName, typeName);
    const isSelectedType = this.getSelectedType(moduleName) === typeName;
    const autoCheckFirst = this.modules.getIn(this.getTypeIndexs(moduleName, typeName).concat(['autoCheckFirst']));

    if (totalList && isSelectedType && !selectItem && autoCheckFirst) {
      this.setSelect(moduleName, typeName, list.get(0));
      this.modules.remove(moduleName).forEach((md, mdName) => {
        this.updateShowList(mdName, typeName);
      });
    }
  }

  updateModule(moduleName, typeName) {
    this.updateShowList(moduleName, typeName);
  }

  updateModules() {
    this.modules.forEach((module, moduleName) => {
      module.get('types').forEach((type, typeName) => {
        this.updateShowList(moduleName, typeName);
      });
    });
  }

  setSelectedTypeAndUpdateModules(moduleName, typeName) {
    this.setSelectedType(moduleName, typeName);
    return this;
  }

  setCreditCardTypesAndUpdateModules(typeName, cardTypes) {
    this.modules.forEach((module, moduleName) => {
      module.get('types').forEach((type, _typeName) => {
        typeName === _typeName && this.setCardTypes(moduleName, typeName, cardTypes);
      });
    });
    return this;
  }

  setMerchantNameAndUpdateModules(typeName, merchantName) {
    this.modules.forEach((module, moduleName) => {
      module.get('types').forEach((type, _typeName) => {
        typeName === _typeName && this.setMerchantName(moduleName, typeName, merchantName);
      });
    });
    return this;
  }

  setTotalListAndUpdateModules(typeName, totalList) {
    this.modules.forEach((module, moduleName) => {
      module.get('types').forEach((type, _typeName) => {
        if (typeName === _typeName) {
          if (typeName === PaymentTypes.CREDIT_CARD) {
            totalList = generateCreditCardsIds(totalList);
          }
          if (typeName === PaymentTypes.ECHECK) {
            totalList = generateEChecksIds(totalList);
          }
          this.setTotalList(moduleName, typeName, totalList);
        }
        this.updateModule(moduleName, _typeName);
        this.updateSelectedPayItem(moduleName, typeName);
      });
    });
    return this;
  }

  movePayItemToTop(moduleName, typeName, selectedItem) {
    const list = this.getList(moduleName, typeName);
    const newList = list.filter(item => item.get('id') !== selectedItem.get('id')).unshift(selectedItem);
    this.setList(moduleName, typeName, newList);
  }

  setSelectAndUpdateModules(moduleName, typeName, payItemId, toTop) {
    const list = this.getList(moduleName, typeName);
    const selectedItem = list.find(item => item.get('id') === payItemId);

    this.setSelect(moduleName, typeName, selectedItem);
    this.modules.forEach((module, _moduleName) => {
      module.get('types').forEach((type, _typeName) => {
        if (moduleName === _moduleName && typeName !== _typeName) {
          this.setSelect(_moduleName, _typeName, null);
        }
      });
    });
    this.updateModules();
    if (toTop && selectedItem) {
      this.movePayItemToTop(moduleName, typeName, selectedItem);
    }
    return this;
  }

  setIsShowAndUpdateModules(moduleName, value) {
    const isShow = this.getIsShow(moduleName, value);
    if (isShow !== value) {
      this.setIsShow(moduleName, value);
      this.updateModules();
    }
    return this;
  }

  addTemporaryPayItemAndUpdateModules(moduleName, typeName, items) {
    this.modules.forEach((module, _moduleName) => {
      module.get('types').forEach((type, _typeName) => {
        if (moduleName === _moduleName && typeName === _typeName) {
          let tempList = this.getTempList(moduleName, typeName);
          items = !isArray(items) ? fromJS([items]) : fromJS(items);
          items.forEach((newItem) => {
            tempList = tempList.filter(item => item.get('id') !== newItem.get('id')).unshift(newItem);
          });
          this.setTempList(moduleName, typeName, tempList);
        }
        this.updateModule(_moduleName, _typeName);
      });
    });
    return this;
  }

  clearSelectUnderModule(moduleName) {
    const module = this.getModule(moduleName);
    if (module) {
      const typesIndexs = this.getTypesIndexs(moduleName);
      this.modules.getIn(typesIndexs).mapKeys(type => this.setSelect(moduleName, type, null));
      this.modules = this.modules.setIn([moduleName, 'select'], null);
    }
  }

}
