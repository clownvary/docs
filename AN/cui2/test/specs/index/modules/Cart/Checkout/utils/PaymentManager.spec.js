import { fromJS, is } from 'immutable';
import expect from 'expect';

import PaymentManagerHelper from 'index/modules/Cart/Checkout/utils/PaymentManagerHelper';
import * as PaymentTypes from 'index/modules/Cart/Checkout/consts/paymentTypes';
import PaymentModules from 'index/modules/Cart/Checkout/consts/paymentModules';

export const PAYMET_TYPES = fromJS({
  [PaymentTypes.CREDIT_CARD]: {
    component: 'CreditCard',
    selected: null,
    list: [],
    tempList: [],
    totalList: [],
    cardTypes: [],
    merchantName: '',
    autoCheckFirst: false,
    disableFilterList: false,
    disableCVVandCVC: false,
    disableGuarantee: false,
    disableSaveForFurture: false,
    instanceOfPCI: null,
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

export const PAYMENT_MODULE = fromJS({
  types: {},
  selectedType: null,
  selected: null,
  isShow: true
});

describe('index/modules/Cart/Checkout/utils/PaymentManagerHelper', () => {
  const paymentManager = new PaymentManagerHelper();
  const initialModules = fromJS({});

  describe('Inspect registerModule method if register module successfull or failed.', () => {
    it('Register successfull if just includes CREDIT_CARD.', () => {
      const moduleName = PaymentModules.PRIMARY;
      const expectedModules = fromJS({
        [moduleName]: PAYMENT_MODULE
                        .set('selectedType', PaymentTypes.CREDIT_CARD)
                        .setIn(
                          ['types', PaymentTypes.CREDIT_CARD],
                          PAYMET_TYPES.get(PaymentTypes.CREDIT_CARD)
                        )
      });

      paymentManager
        .syncModules(initialModules)
        .registerModule(
          moduleName,
          [PaymentTypes.CREDIT_CARD],
          PaymentTypes.CREDIT_CARD
        );
      expect(is(paymentManager.getModules(), expectedModules)).toBe(true);
    });

    it('Register successfull if just includes ECHECK.', () => {
      const moduleName = PaymentModules.PRIMARY;
      const expectedModules = fromJS({
        [moduleName]: PAYMENT_MODULE
                        .set('selectedType', PaymentTypes.ECHECK)
                        .setIn(
                          ['types', PaymentTypes.ECHECK],
                          PAYMET_TYPES.get(PaymentTypes.ECHECK)
                        )
      });

      paymentManager
        .syncModules(initialModules)
        .registerModule(
          moduleName,
          [PaymentTypes.ECHECK],
          PaymentTypes.ECHECK
        );
      expect(is(paymentManager.getModules(), expectedModules)).toBe(true);
    });

    it('Register successfull if includes CREDIT_CARD and ECHECK.', () => {
      const moduleName = PaymentModules.PRIMARY;
      const expectedModules = fromJS({
        [moduleName]: PAYMENT_MODULE
                        .set('selectedType', PaymentTypes.CREDIT_CARD)
                        .setIn(
                          ['types', PaymentTypes.CREDIT_CARD],
                          PAYMET_TYPES.get(PaymentTypes.CREDIT_CARD)
                        )
                        .setIn(
                          ['types', PaymentTypes.ECHECK],
                          PAYMET_TYPES.get(PaymentTypes.ECHECK)
                        )
      });

      paymentManager
        .syncModules(initialModules)
        .registerModule(
          moduleName,
          [PaymentTypes.CREDIT_CARD, PaymentTypes.ECHECK],
          PaymentTypes.CREDIT_CARD
        );
      expect(is(paymentManager.getModules(), expectedModules)).toBe(true);
    });

    it('Register successfull with expected default payment type.', () => {
      const moduleName = PaymentModules.PRIMARY;
      const expectedModules = fromJS({
        [moduleName]: PAYMENT_MODULE
                        .set('selectedType', PaymentTypes.CREDIT_CARD)
                        .setIn(
                          ['types', PaymentTypes.CREDIT_CARD],
                          PAYMET_TYPES.get(PaymentTypes.CREDIT_CARD)
                        )
                        .setIn(
                          ['types', PaymentTypes.ECHECK],
                          PAYMET_TYPES.get(PaymentTypes.ECHECK)
                        )
      });

      paymentManager
        .syncModules(initialModules)
        .registerModule(
          moduleName,
          [PaymentTypes.CREDIT_CARD, PaymentTypes.ECHECK]
        );
      expect(is(paymentManager.getModules(), expectedModules)).toBe(true);
    });

    it('Register CREDIT_CARD successfull with the expected spcific setting - disableCVVandCVC is true.', () => {
      const moduleName = PaymentModules.PRIMARY;
      const expectedModules = fromJS({
        [moduleName]: PAYMENT_MODULE
                        .set('selectedType', PaymentTypes.CREDIT_CARD)
                        .setIn(
                          ['types', PaymentTypes.CREDIT_CARD],
                          PAYMET_TYPES.get(PaymentTypes.CREDIT_CARD)
                                      .set('disableCVVandCVC', true)
                        )
      });

      paymentManager
        .syncModules(initialModules)
        .registerModule(
          moduleName,
          [PaymentTypes.CREDIT_CARD],
          PaymentTypes.CREDIT_CARD,
        {
          [PaymentTypes.CREDIT_CARD]: { disableCVVandCVC: true }
        }
        );
      expect(is(paymentManager.getModules(), expectedModules)).toBe(true);
    });

    it('Register CREDIT_CARD successfull with the expected spcific setting - disableGuarantee is true.', () => {
      const moduleName = PaymentModules.PRIMARY;
      const expectedModules = fromJS({
        [moduleName]: PAYMENT_MODULE
                        .set('selectedType', PaymentTypes.CREDIT_CARD)
                        .setIn(
                          ['types', PaymentTypes.CREDIT_CARD],
                          PAYMET_TYPES.get(PaymentTypes.CREDIT_CARD)
                                      .set('disableGuarantee', true)
                        )
      });

      paymentManager
        .syncModules(initialModules)
        .registerModule(
          moduleName,
          [PaymentTypes.CREDIT_CARD],
          PaymentTypes.CREDIT_CARD,
        {
          [PaymentTypes.CREDIT_CARD]: { disableGuarantee: true }
        }
        );
      expect(is(paymentManager.getModules(), expectedModules)).toBe(true);
    });

    it('Register CREDIT_CARD successfull with the expected spcific setting - disableSaveForFurture is true.', () => {
      const moduleName = PaymentModules.PRIMARY;
      const expectedModules = fromJS({
        [moduleName]: PAYMENT_MODULE
                        .set('selectedType', PaymentTypes.CREDIT_CARD)
                        .setIn(
                          ['types', PaymentTypes.CREDIT_CARD],
                          PAYMET_TYPES.get(PaymentTypes.CREDIT_CARD)
                                      .set('disableSaveForFurture', true)
                        )
      });

      paymentManager
        .syncModules(initialModules)
        .registerModule(
          moduleName,
          [PaymentTypes.CREDIT_CARD],
          PaymentTypes.CREDIT_CARD,
        {
          [PaymentTypes.CREDIT_CARD]: { disableSaveForFurture: true }
        }
        );
      expect(is(paymentManager.getModules(), expectedModules)).toBe(true);
    });

    it('Register ECHECK successfull with the expected spcific setting - disableTips is true.', () => {
      const moduleName = PaymentModules.PRIMARY;
      const expectedModules = fromJS({
        [moduleName]: PAYMENT_MODULE
                        .set('selectedType', PaymentTypes.ECHECK)
                        .setIn(
                          ['types', PaymentTypes.ECHECK],
                          PAYMET_TYPES.get(PaymentTypes.ECHECK)
                                      .set('disableTips', true)
                        )
      });

      paymentManager
        .syncModules(initialModules)
        .registerModule(
          moduleName,
          [PaymentTypes.ECHECK],
          PaymentTypes.ECHECK,
        {
          [PaymentTypes.ECHECK]: { disableTips: true }
        }
        );
      expect(is(paymentManager.getModules(), expectedModules)).toBe(true);
    });

    it('Register ECHECK successfull with the expected spcific setting - disableGuarantee is true.', () => {
      const moduleName = PaymentModules.PRIMARY;
      const expectedModules = fromJS({
        [moduleName]: PAYMENT_MODULE
                        .set('selectedType', PaymentTypes.ECHECK)
                        .setIn(
                          ['types', PaymentTypes.ECHECK],
                          PAYMET_TYPES.get(PaymentTypes.ECHECK)
                                      .set('disableGuarantee', true)
                        )
      });

      paymentManager
        .syncModules(initialModules)
        .registerModule(
          moduleName,
          [PaymentTypes.ECHECK],
          PaymentTypes.ECHECK,
        {
          [PaymentTypes.ECHECK]: { disableGuarantee: true }
        }
        );
      expect(is(paymentManager.getModules(), expectedModules)).toBe(true);
    });

    it('Register ECHECK successfull with the expected spcific setting - disableSaveForFurture is true.', () => {
      const moduleName = PaymentModules.PRIMARY;
      const expectedModules = fromJS({
        [moduleName]: PAYMENT_MODULE
                        .set('selectedType', PaymentTypes.ECHECK)
                        .setIn(
                          ['types', PaymentTypes.ECHECK],
                          PAYMET_TYPES.get(PaymentTypes.ECHECK)
                                      .set('disableSaveForFurture', true)
                        )
      });

      paymentManager
        .syncModules(initialModules)
        .registerModule(
          moduleName,
          [PaymentTypes.ECHECK],
          PaymentTypes.ECHECK,
        {
          [PaymentTypes.ECHECK]: { disableSaveForFurture: true }
        }
        );
      expect(is(paymentManager.getModules(), expectedModules)).toBe(true);
    });

    it('Register failed if no moduleName passed in.', () => {
      const moduleName = '';

      paymentManager
        .syncModules(initialModules)
        .registerModule(
          moduleName,
          [PaymentTypes.ECHECK],
          PaymentTypes.ECHECK,
        {
          [PaymentTypes.ECHECK]: { disableSaveForFurture: true }
        }
        );
      expect(is(paymentManager.getModules(), initialModules)).toBe(true);
    });
  });

  describe('Inspect setModule and getModule method if it executes as expected.', () => {
    const moduleName = PaymentModules.PRIMARY;
    const module = PAYMENT_MODULE
            .set('selectedType', PaymentTypes.ECHECK)
            .setIn(
              ['types', PaymentTypes.ECHECK],
              PAYMET_TYPES.get(PaymentTypes.ECHECK)
            );
    const modules = fromJS({
      [moduleName]: module
    });

    it('Set module as expected.', () => {
      const expectedModules = fromJS({
        [moduleName]: module
      });

      paymentManager
        .syncModules(initialModules)
        .setModule(moduleName, module);
      expect(is(paymentManager.getModules(), expectedModules)).toBe(true);
    });

    it('Get module as expected.', () => {
      paymentManager
        .syncModules(modules);
      expect(is(paymentManager.getModule(moduleName), module)).toBe(true);
    });
  });

  describe('Inspect setIsShow and getIsShow method if it executes as expected.', () => {
    const moduleName = PaymentModules.PRIMARY;
    const module = PAYMENT_MODULE
            .set('selectedType', PaymentTypes.ECHECK)
            .setIn(
              ['types', PaymentTypes.ECHECK],
              PAYMET_TYPES.get(PaymentTypes.ECHECK)
            );
    const modules = fromJS({
      [moduleName]: module
    });

    it('Set isShow as expected.', () => {
      paymentManager
        .syncModules(modules)
        .setIsShow(moduleName, false);
      expect(paymentManager.getIsShow(moduleName)).toBe(false);
    });

    it('Get isShow as expected.', () => {
      paymentManager
        .syncModules(modules)
        .setIsShow(moduleName, true);
      expect(paymentManager.getIsShow(moduleName)).toBe(true);
    });
  });

  describe('Inspect setSelectedType and getSelectedType method if it executes as expected.', () => {
    const moduleName = PaymentModules.PRIMARY;
    const module = PAYMENT_MODULE
            .set('selectedType', PaymentTypes.ECHECK)
            .setIn(
              ['types', PaymentTypes.ECHECK],
              PAYMET_TYPES.get(PaymentTypes.ECHECK)
            );
    const modules = fromJS({
      [moduleName]: module
    });

    it('Set selectedType as expected.', () => {
      paymentManager
        .syncModules(modules)
        .setSelectedType(moduleName, PaymentTypes.CREDIT_CARD);
      expect(paymentManager.getSelectedType(moduleName)).toBe(PaymentTypes.CREDIT_CARD);
    });

    it('Get selectedType as expected.', () => {
      paymentManager
        .syncModules(modules)
        .setSelectedType(moduleName, PaymentTypes.ECHECK);
      expect(paymentManager.getSelectedType(moduleName)).toBe(PaymentTypes.ECHECK);
    });
  });

  describe('Inspect setList and getList method if it executes as expected.', () => {
    const moduleName = PaymentModules.PRIMARY;
    const module = PAYMENT_MODULE
            .set('selectedType', PaymentTypes.ECHECK)
            .setIn(
              ['types', PaymentTypes.ECHECK],
              PAYMET_TYPES.get(PaymentTypes.ECHECK)
            );
    const modules = fromJS({
      [moduleName]: module
    });

    it('Set list as expected.', () => {
      const expectedList = undefined;
      paymentManager
        .syncModules(modules)
        .setList(moduleName, PaymentTypes.ECHECK, expectedList);
      expect(is(paymentManager.getList(moduleName, PaymentTypes.ECHECK), expectedList)).toBe(false);
    });
    it('Set list as expected(2).', () => {
      const expectedList = fromJS([1, 2, 3]);
      paymentManager
        .syncModules(modules)
        .setList(moduleName, PaymentTypes.ECHECK, expectedList);
      expect(is(paymentManager.getList(moduleName, PaymentTypes.ECHECK), expectedList)).toBe(true);
    });

    it('Get list as expected.', () => {
      const expectedList = fromJS([4, 5, 6]);
      paymentManager
        .syncModules(modules)
        .setList(moduleName, PaymentTypes.ECHECK, expectedList);
      expect(is(paymentManager.getList(moduleName, PaymentTypes.ECHECK), expectedList)).toBe(true);
    });
  });

  describe('Inspect setTotalList and getTotalList method if it executes as expected.', () => {
    const moduleName = PaymentModules.PRIMARY;
    const module = PAYMENT_MODULE
            .set('selectedType', PaymentTypes.ECHECK)
            .setIn(
              ['types', PaymentTypes.ECHECK],
              PAYMET_TYPES.get(PaymentTypes.ECHECK)
            );
    const modules = fromJS({
      [moduleName]: module
    });

    it('Set totalList as expected.', () => {
      const expectedList = fromJS([1, 2, 3]);
      paymentManager
        .syncModules(modules)
        .setTotalList(moduleName, PaymentTypes.ECHECK, expectedList);
      expect(
        is(paymentManager.getTotalList(moduleName, PaymentTypes.ECHECK), expectedList)
      ).toBe(true);
    });
    it('Set totalList as expected(2).', () => {
      const expectedList = undefined;
      paymentManager
        .syncModules(modules)
        .setTotalList(moduleName, PaymentTypes.ECHECK, expectedList);
      expect(
        is(paymentManager.getTotalList(moduleName, PaymentTypes.ECHECK), expectedList)
      ).toBe(false);
    });

    it('Get totalList as expected.', () => {
      const expectedList = fromJS([4, 5, 6]);
      paymentManager
        .syncModules(modules)
        .setTotalList(moduleName, PaymentTypes.ECHECK, expectedList);
      expect(
        is(paymentManager.getTotalList(moduleName, PaymentTypes.ECHECK), expectedList)
      ).toBe(true);
    });
  });

  describe('Inspect setTempList and getTempList method if it executes as expected.', () => {
    const moduleName = PaymentModules.PRIMARY;
    const module = PAYMENT_MODULE
            .set('selectedType', PaymentTypes.ECHECK)
            .setIn(
              ['types', PaymentTypes.ECHECK],
              PAYMET_TYPES.get(PaymentTypes.ECHECK)
            );
    const modules = fromJS({
      [moduleName]: module
    });

    it('Set tempList as expected.', () => {
      const expectedList = fromJS([1, 2, 3]);
      paymentManager
        .syncModules(modules)
        .setTempList(moduleName, PaymentTypes.ECHECK, expectedList);
      expect(
        is(paymentManager.getTempList(moduleName, PaymentTypes.ECHECK), expectedList)
      ).toBe(true);
    });
    it('Set tempList as expected(2).', () => {
      const expectedList = undefined;
      paymentManager
        .syncModules(modules)
        .setTempList(moduleName, PaymentTypes.ECHECK, expectedList);
      expect(
        is(paymentManager.getTempList(moduleName, PaymentTypes.ECHECK), expectedList)
      ).toBe(false);
    });

    it('Get tempList as expected.', () => {
      const expectedList = fromJS([4, 5, 6]);
      paymentManager
        .syncModules(modules)
        .setTempList(moduleName, PaymentTypes.ECHECK, expectedList);
      expect(
        is(paymentManager.getTempList(moduleName, PaymentTypes.ECHECK), expectedList)
      ).toBe(true);
    });
  });

  describe('Inspect setCardTypes and getCardTypes method if it executes as expected.', () => {
    const moduleName = PaymentModules.PRIMARY;
    const module = PAYMENT_MODULE
            .set('selectedType', PaymentTypes.CREDIT_CARD)
            .setIn(
              ['types', PaymentTypes.CREDIT_CARD],
              PAYMET_TYPES.get(PaymentTypes.CREDIT_CARD)
            );
    const modules = fromJS({
      [moduleName]: module
    });

    it('Set cardTypes as expected.', () => {
      const expectedList = fromJS([1, 2, 3]);
      paymentManager
        .syncModules(modules)
        .setCardTypes(moduleName, PaymentTypes.CREDIT_CARD, expectedList);
      expect(
        is(paymentManager.getCardTypes(moduleName, PaymentTypes.CREDIT_CARD), expectedList)
      ).toBe(true);
    });

    it('Get cardTypes as expected.', () => {
      const expectedList = fromJS([4, 5, 6]);
      paymentManager
        .syncModules(modules)
        .setCardTypes(moduleName, PaymentTypes.CREDIT_CARD, expectedList);
      expect(
        is(paymentManager.getCardTypes(moduleName, PaymentTypes.CREDIT_CARD), expectedList)
      ).toBe(true);
    });

    it('Get cardTypes as expected if no cardTypes property in current pay type.', () => {
      const expectedList = fromJS([4, 5, 6]);
      paymentManager
        .syncModules(modules)
        .setCardTypes(moduleName, PaymentTypes.ECHECK, expectedList);

      expect(
        paymentManager.getCardTypes(moduleName, PaymentTypes.ECHECK)
      ).toBe(undefined);
    });
  });

  describe('Inspect setMerchantName and getMerchantName method if it executes as expected.', () => {
    const moduleName = PaymentModules.PRIMARY;
    const module = PAYMENT_MODULE
            .set('selectedType', PaymentTypes.CREDIT_CARD)
            .setIn(
              ['types', PaymentTypes.CREDIT_CARD],
              PAYMET_TYPES.get(PaymentTypes.CREDIT_CARD)
            );
    const modules = fromJS({
      [moduleName]: module
    });

    it('Set merchantName as expected.', () => {
      const merchantName = 'Bill';
      paymentManager
        .syncModules(modules)
        .setMerchantName(moduleName, PaymentTypes.CREDIT_CARD, merchantName);
      expect(
        paymentManager.getMerchantName(moduleName, PaymentTypes.CREDIT_CARD)
      ).toBe(merchantName);
    });

    it('Get merchantName as expected.', () => {
      const merchantName = 'Xiong';
      paymentManager
        .syncModules(modules)
        .setMerchantName(moduleName, PaymentTypes.CREDIT_CARD, merchantName);
      expect(
        paymentManager.getMerchantName(moduleName, PaymentTypes.CREDIT_CARD)
      ).toBe(merchantName);
    });

    it('Get merchantName as expected if no merchantName property in current pay type.', () => {
      const merchantName = 'Xiong';
      paymentManager
        .syncModules(modules)
        .setMerchantName(moduleName, PaymentTypes.ECHECK, merchantName);
      expect(
        paymentManager.getMerchantName(moduleName, PaymentTypes.ECHECK)
      ).toBe(undefined);
    });
  });

  describe('Inspect setSelect and getSelect method if it executes as expected.', () => {
    const moduleName = PaymentModules.PRIMARY;
    const module = PAYMENT_MODULE
            .set('selectedType', PaymentTypes.CREDIT_CARD)
            .setIn(
              ['types', PaymentTypes.CREDIT_CARD],
              PAYMET_TYPES.get(PaymentTypes.CREDIT_CARD)
            );
    const modules = fromJS({
      [moduleName]: module
    });

    it('Set select as expected.', () => {
      const select = 'Bill';
      paymentManager
        .syncModules(modules)
        .setSelect(moduleName, PaymentTypes.CREDIT_CARD, select);
      expect(
        paymentManager.getSelect(moduleName, PaymentTypes.CREDIT_CARD)
      ).toBe(select);
      expect(
        paymentManager.getModule(moduleName).get('selected')
      ).toBe(select);
    });

    it('Get select as expected.', () => {
      const select = 'Xiong';
      paymentManager
        .syncModules(modules)
        .setSelect(moduleName, PaymentTypes.CREDIT_CARD, select);
      expect(
        paymentManager.getSelect(moduleName, PaymentTypes.CREDIT_CARD)
      ).toBe(select);
      expect(
        paymentManager.getModule(moduleName).get('selected')
      ).toBe(select);
    });
    it('Get select as expected when typename is null', () => {
      const select = 'Xiong';
      paymentManager
        .syncModules(modules)
        .setSelect(moduleName, PaymentTypes.CREDIT_CARD, select);
      expect(
        paymentManager.getSelect(moduleName, null)
      ).toBe(select);
      expect(
        paymentManager.getModule(moduleName).get('selected')
      ).toBe(select);
    });
  });

  const twoModulesForTest = paymentManager
                              .syncModules(initialModules)
                              .registerModule(
                                PaymentModules.PRIMARY,
                                [PaymentTypes.CREDIT_CARD, PaymentTypes.ECHECK],
                                PaymentTypes.CREDIT_CARD
                              ).registerModule(
                                PaymentModules.PRIMARY.SECONDARY,
                                [PaymentTypes.CREDIT_CARD, PaymentTypes.ECHECK],
                                PaymentTypes.CREDIT_CARD
                              ).getModules();
  const totalListForCC = [
    {
      id: '1_xxx1111',
      card_number: 'xxx1111',
      card_type_id: 1
    },
    {
      id: '2_xxx2222',
      card_number: 'xxx2222',
      card_type_id: 2
    }
  ];
  const tempListForCC = [
    {
      id: '1_1111__isTemped',
      card_number: 'xxx1111',
      card_type_id: 1
    },
    {
      id: '2_2222_isTemped',
      card_number: 'xxx2222',
      card_type_id: 2
    }
  ];
  const creditCardTypesForCC = [
    {
      id: '1_1111'
    },
    {
      id: '2_2222'
    }
  ];
  const totalListForECP = [
    {
      id: '1_1111',
      account_number: '1111',
      routing_number: '2222'
    },
    {
      id: '2_2222',
      account_number: '3333',
      routing_number: '4444'
    }
  ];

  describe('Inspect updateShowList method if it executes as expected.', () => {
    it('Set show list as expected.', () => {
      paymentManager
        .syncModules(twoModulesForTest)
        .setTotalList(PaymentModules.PRIMARY, PaymentTypes.CREDIT_CARD, totalListForCC);
      expect(
        paymentManager.getList(PaymentModules.PRIMARY, PaymentTypes.CREDIT_CARD).size
      ).toBe(0);
      paymentManager.updateShowList(PaymentModules.PRIMARY, PaymentTypes.CREDIT_CARD);
      expect(
        paymentManager.getList(PaymentModules.PRIMARY, PaymentTypes.CREDIT_CARD).size
      ).toBe(2);
      paymentManager.setTempList(PaymentModules.PRIMARY, PaymentTypes.CREDIT_CARD, tempListForCC);
      paymentManager.updateShowList(PaymentModules.PRIMARY, PaymentTypes.CREDIT_CARD);
      expect(
        paymentManager.getList(PaymentModules.PRIMARY, PaymentTypes.CREDIT_CARD).size
      ).toBe(4);
    });
    it('Set select as expected if disableFilterList is true or false.', () => {
      paymentManager
        .syncModules(initialModules)
        .registerModule(
          PaymentModules.PRIMARY,
          [PaymentTypes.CREDIT_CARD, PaymentTypes.ECHECK],
          PaymentTypes.CREDIT_CARD,
        {
          [PaymentTypes.CREDIT_CARD]: {
            autoCheckFirst: true,
            disableFilterList: true
          }
        }
        ).registerModule(
          PaymentModules.SECONDARY,
          [PaymentTypes.CREDIT_CARD, PaymentTypes.ECHECK],
          PaymentTypes.CREDIT_CARD
        )
        .setTotalListAndUpdateModules(PaymentTypes.CREDIT_CARD, totalListForCC)
        .setTotalListAndUpdateModules(PaymentTypes.ECHECK, totalListForECP);
      expect(
        paymentManager.getList(PaymentModules.PRIMARY, PaymentTypes.CREDIT_CARD).size
      ).toBe(2);
      expect(
        paymentManager.getList(PaymentModules.SECONDARY, PaymentTypes.CREDIT_CARD).size
      ).toBe(1);
    });
  });

  describe('Inspect updateSelectedPayItem method if it executes as expected.', () => {
    it('Update selected payment item as expected if autoCheckFirst is true.', () => {
      paymentManager
        .syncModules(initialModules)
        .registerModule(
          PaymentModules.PRIMARY,
          [PaymentTypes.CREDIT_CARD, PaymentTypes.ECHECK],
          PaymentTypes.CREDIT_CARD,
        {
          [PaymentTypes.CREDIT_CARD]: {
            autoCheckFirst: true,
            disableFilterList: true
          }
        }
        ).registerModule(
          PaymentModules.SECONDARY,
          [PaymentTypes.CREDIT_CARD, PaymentTypes.ECHECK],
          PaymentTypes.CREDIT_CARD
        )
        .setTotalListAndUpdateModules(PaymentTypes.CREDIT_CARD, totalListForCC)
        .setTotalListAndUpdateModules(PaymentTypes.ECHECK, totalListForECP);
      expect(
        paymentManager.getSelect(PaymentModules.PRIMARY, PaymentTypes.CREDIT_CARD).size > 0
      ).toBe(true);
      expect(
        paymentManager.getSelect(PaymentModules.SECONDARY, PaymentTypes.CREDIT_CARD)
      ).toBe(null);
    });

    it('Update selected payment item as expected if autoCheckFirst is false.', () => {
      paymentManager
        .syncModules(initialModules)
        .registerModule(
          PaymentModules.PRIMARY,
          [PaymentTypes.CREDIT_CARD, PaymentTypes.ECHECK],
          PaymentTypes.CREDIT_CARD,
        {
          [PaymentTypes.CREDIT_CARD]: {
            autoCheckFirst: false,
            disableFilterList: true
          }
        }
        ).registerModule(
          PaymentModules.SECONDARY,
          [PaymentTypes.CREDIT_CARD, PaymentTypes.ECHECK],
          PaymentTypes.CREDIT_CARD
        )
        .setTotalListAndUpdateModules(PaymentTypes.CREDIT_CARD, totalListForCC)
        .setTotalListAndUpdateModules(PaymentTypes.ECHECK, totalListForECP);
      expect(
        paymentManager.getSelect(PaymentModules.PRIMARY, PaymentTypes.CREDIT_CARD)
      ).toBe(null);
      expect(
        paymentManager.getSelect(PaymentModules.SECONDARY, PaymentTypes.CREDIT_CARD)
      ).toBe(null);
    });
  });

  describe('Inspect setSelectedTypeAndUpdateModules method if it executes as expected.', () => {
    it('Update selected payment item as expected if autoCheckFirst is true.', () => {
      paymentManager
        .syncModules(initialModules)
        .registerModule(
          PaymentModules.PRIMARY,
          [PaymentTypes.CREDIT_CARD, PaymentTypes.ECHECK],
          PaymentTypes.CREDIT_CARD,
        {
          [PaymentTypes.CREDIT_CARD]: {
            autoCheckFirst: true,
            disableFilterList: true
          }
        }
        ).registerModule(
          PaymentModules.SECONDARY,
          [PaymentTypes.CREDIT_CARD, PaymentTypes.ECHECK],
          PaymentTypes.CREDIT_CARD
        )
        .setSelectedTypeAndUpdateModules(PaymentModules.PRIMARY, PaymentTypes.ECHECK);
      expect(
        paymentManager.getSelectedType(PaymentModules.PRIMARY)
      ).toBe(PaymentTypes.ECHECK);
    });
  });

  describe('Inspect setCreditCardTypesAndUpdateModules method if it executes as expected.', () => {
    it('Set credit card types as expected.', () => {
      paymentManager
        .syncModules(initialModules)
        .registerModule(
          PaymentModules.PRIMARY,
          [PaymentTypes.CREDIT_CARD, PaymentTypes.ECHECK],
          PaymentTypes.CREDIT_CARD,
        {
          [PaymentTypes.CREDIT_CARD]: {
            autoCheckFirst: true,
            disableFilterList: true
          }
        }
        ).registerModule(
          PaymentModules.SECONDARY,
          [PaymentTypes.CREDIT_CARD, PaymentTypes.ECHECK],
          PaymentTypes.CREDIT_CARD
        )
        .setCreditCardTypesAndUpdateModules(PaymentTypes.CREDIT_CARD, creditCardTypesForCC);
      expect(
        paymentManager.getCardTypes(PaymentModules.PRIMARY, PaymentTypes.CREDIT_CARD).size
      ).toBe(2);
      expect(
        paymentManager.getCardTypes(PaymentModules.SECONDARY, PaymentTypes.CREDIT_CARD).size
      ).toBe(2);
    });
  });

  describe('Inspect setMerchantNameAndUpdateModules method if it executes as expected.', () => {
    it('Set merchantName as expected.', () => {
      const expectedName = 'Bill.Xiong';
      paymentManager
        .syncModules(initialModules)
        .registerModule(
          PaymentModules.PRIMARY,
          [PaymentTypes.CREDIT_CARD, PaymentTypes.ECHECK],
          PaymentTypes.CREDIT_CARD,
        {
          [PaymentTypes.CREDIT_CARD]: {
            autoCheckFirst: true,
            disableFilterList: true
          }
        }
        ).registerModule(
          PaymentModules.SECONDARY,
          [PaymentTypes.CREDIT_CARD, PaymentTypes.ECHECK],
          PaymentTypes.CREDIT_CARD
        )
        .setMerchantNameAndUpdateModules(PaymentTypes.CREDIT_CARD, expectedName);
      expect(
        paymentManager.getMerchantName(PaymentModules.PRIMARY, PaymentTypes.CREDIT_CARD)
      ).toBe(expectedName);
      expect(
        paymentManager.getMerchantName(PaymentModules.SECONDARY, PaymentTypes.CREDIT_CARD)
      ).toBe(expectedName);
    });
  });

  describe('Inspect setSelectAndUpdateModules method if it executes as expected.', () => {
    it('Set select as expected.', () => {
      paymentManager
        .syncModules(initialModules)
        .registerModule(
          PaymentModules.PRIMARY,
          [PaymentTypes.CREDIT_CARD, PaymentTypes.ECHECK],
          PaymentTypes.CREDIT_CARD,
        {
          [PaymentTypes.CREDIT_CARD]: {
            autoCheckFirst: true,
            disableFilterList: true
          }
        }
        ).registerModule(
          PaymentModules.SECONDARY,
          [PaymentTypes.CREDIT_CARD, PaymentTypes.ECHECK],
          PaymentTypes.CREDIT_CARD
        )
        .setTotalListAndUpdateModules(PaymentTypes.CREDIT_CARD, totalListForCC);
      expect(
        paymentManager.getSelect(PaymentModules.PRIMARY, PaymentTypes.CREDIT_CARD).get('id')
      ).toBe(totalListForCC[0].id);

      paymentManager
        .setSelectAndUpdateModules(
          PaymentModules.PRIMARY,
          PaymentTypes.CREDIT_CARD,
          totalListForCC[1].id
        );
      expect(
        paymentManager.getSelect(PaymentModules.PRIMARY, PaymentTypes.CREDIT_CARD).get('id')
      ).toBe(totalListForCC[1].id);
    });

    it('Set select as expected(to top).', () => {
      expect(
        paymentManager.getList(PaymentModules.PRIMARY, PaymentTypes.CREDIT_CARD).getIn([0, 'id'])
      ).toBe(totalListForCC[0].id);
      paymentManager
        .setSelectAndUpdateModules(
          PaymentModules.PRIMARY,
          PaymentTypes.CREDIT_CARD,
          totalListForCC[1].id,
          true
        );
      expect(
        paymentManager.getList(PaymentModules.PRIMARY, PaymentTypes.CREDIT_CARD).getIn([0, 'id'])
      ).toBe(totalListForCC[1].id);
    });
  });

  describe('Inspect setIsShowAndUpdateModules method if it executes as expected.', () => {
    it('Set isShow as expected.', () => {
      paymentManager
        .syncModules(initialModules)
        .registerModule(
          PaymentModules.PRIMARY,
          [PaymentTypes.CREDIT_CARD, PaymentTypes.ECHECK],
          PaymentTypes.CREDIT_CARD,
        {
          [PaymentTypes.CREDIT_CARD]: {
            autoCheckFirst: true,
            disableFilterList: true
          }
        }
        ).registerModule(
          PaymentModules.SECONDARY,
          [PaymentTypes.CREDIT_CARD, PaymentTypes.ECHECK],
          PaymentTypes.CREDIT_CARD
        );
      expect(
        paymentManager.getIsShow(PaymentModules.PRIMARY)
      ).toBe(true);

      paymentManager
        .setIsShowAndUpdateModules(
          PaymentModules.PRIMARY,
          false
        );
      expect(
        paymentManager.getIsShow(PaymentModules.PRIMARY)
      ).toBe(false);

      paymentManager
        .setIsShowAndUpdateModules(
          PaymentModules.PRIMARY,
          false
        );
      expect(
        paymentManager.getIsShow(PaymentModules.PRIMARY)
      ).toBe(false);
    });
  });

  describe('Inspect addTemporaryPayItemAndUpdateModules method if it executes as expected.', () => {
    it('Add temporary pay item as expected.', () => {
      paymentManager
        .syncModules(initialModules)
        .registerModule(
          PaymentModules.PRIMARY,
          [PaymentTypes.CREDIT_CARD, PaymentTypes.ECHECK],
          PaymentTypes.CREDIT_CARD,
        {
          [PaymentTypes.CREDIT_CARD]: {
            autoCheckFirst: true,
            disableFilterList: true
          }
        }
        ).registerModule(
          PaymentModules.SECONDARY,
          [PaymentTypes.CREDIT_CARD, PaymentTypes.ECHECK],
          PaymentTypes.CREDIT_CARD
        )
        .setTotalListAndUpdateModules(PaymentTypes.CREDIT_CARD, totalListForCC)
        .setTotalListAndUpdateModules(PaymentTypes.ECHECK, totalListForECP);

      paymentManager.setTempList(PaymentModules.PRIMARY, PaymentTypes.CREDIT_CARD, tempListForCC);

      const newTempItem = {
        id: '3_3333__isTemped',
        card_number: 'xxx3333',
        card_type_id: 1
      };
      paymentManager
        .addTemporaryPayItemAndUpdateModules(
          PaymentModules.PRIMARY,
          PaymentTypes.CREDIT_CARD,
          newTempItem
        );
      expect(
        paymentManager
          .getTempList(PaymentModules.PRIMARY, PaymentTypes.CREDIT_CARD)
          .some(item => item.get('id') === newTempItem.id)
      ).toBe(true);
      paymentManager
        .addTemporaryPayItemAndUpdateModules(
          PaymentModules.PRIMARY,
          PaymentTypes.CREDIT_CARD,
          [newTempItem]
        );
      expect(
        paymentManager
          .getTempList(PaymentModules.PRIMARY, PaymentTypes.CREDIT_CARD)
          .some(item => item.get('id') === newTempItem.id)
      ).toBe(true);
    });
  });

  describe('Inspect clearSelectUnderModule method if it executes as expected.', () => {
    it('Clear select as expected.', () => {
      paymentManager
        .syncModules(initialModules)
        .registerModule(
          PaymentModules.PRIMARY,
          [PaymentTypes.CREDIT_CARD, PaymentTypes.ECHECK],
          PaymentTypes.CREDIT_CARD,
        {
          [PaymentTypes.CREDIT_CARD]: {
            autoCheckFirst: true,
            disableFilterList: true
          }
        }
        ).registerModule(
          PaymentModules.SECONDARY,
          [PaymentTypes.CREDIT_CARD, PaymentTypes.ECHECK],
          PaymentTypes.CREDIT_CARD
        )
        .setTotalListAndUpdateModules(PaymentTypes.CREDIT_CARD, totalListForCC)
        .setTotalListAndUpdateModules(PaymentTypes.ECHECK, totalListForECP)
        .setSelectAndUpdateModules(
          PaymentModules.PRIMARY,
          PaymentTypes.CREDIT_CARD,
          totalListForCC[1].id,
          true
        );
      expect(
        paymentManager
          .getSelect(PaymentModules.PRIMARY, PaymentTypes.CREDIT_CARD).size > 0
      ).toBe(true);

      paymentManager.clearSelectUnderModule();
      paymentManager.clearSelectUnderModule(PaymentModules.PRIMARY);
      expect(
        paymentManager
          .getSelect(PaymentModules.PRIMARY, PaymentTypes.CREDIT_CARD)
      ).toBe(null);
    });
  });
});
