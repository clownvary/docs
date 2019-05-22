import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import helper from 'utils/testHelper';
import middlewares from 'utils/middlewares';
import * as actions from 'index/modules/Cart/Checkout/actions/agreement';
import { actionTypes } from 'index/modules/Cart/Checkout/consts';


describe('index/modules/Cart/Checkout/actions/agreement', () => {
  let store = null;
  const data = [
    {
      id: 1,
      desc: 'Recurring Donation for Fiona Campaign111 - All Sites test test test test test test testtesteststsetsetsetsetsetsetsetsetssafasdfasd ',
      nextDue: '28 May 2017',
      lastDue: '6 May 2018',
      checked: true,
      disabled: true
    },
    {
      id: 2,
      desc: 'Recurring Donation for Fiona Campaign111 - All Sites 2',
      nextDue: 'On expiration',
      lastDue: 'Until user cancels',
      checked: true,
      disabled: false
    },
    {
      id: 3,
      desc: 'Recurring Donation for Fiona Campaign111 - All Sites 3',
      nextDue: '28 May 2017',
      lastDue: '6 May 2018',
      checked: false,
      disabled: true
    },
    {
      id: 4,
      desc: 'Recurring Donation for Fiona Campaign111 - All Sites 4',
      nextDue: '28 May 2017',
      lastDue: '6 May 2018',
      checked: false,
      disabled: false
    }
  ];

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({});
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('getAgreementAsyncAction', () => {
    it('Should return expected Action Object.', (done) => {
      const { getAgreementAsyncAction } = actions;

      const modules = {
        Cart: {
          Checkout: {
            futureCharges: fromJS({ data })
          }
        }
      };

      const configurations = fromJS({
        hide_payplan_details_for_online_checkout: false
      });

      store = configureStore(middlewares)({ configurations, modules });
      store.dispatch(getAgreementAsyncAction()).then(() => {
        expect(helper.isIncluding([
          {
            type: actionTypes.AGREEMENT_UI
          }], store.getActions())).toBeTruthy();
        done();
      });
    });

    it('Should return expected Action Object.', (done) => {
      const { getAgreementAsyncAction } = actions;

      const paymentManagerModules = {
        modules: {
          primary: {
            selectedType: 'Electronic Check',
            selected: {
              ams_account_id: 'Demo AccountID',
              save_name: 'woshiyun',
              routing_number: 'xxx8888',
              account_number: 'xxx3230',
              account_type: 'C',
              exclude: false,
              retired: false,
              ams_retention_date: null,
              is_secondary_payment: false
            }
          },
          secondary: {
            isShow: true,
            selected: {}
          }
        }
      };

      const modules = {
        Cart: {
          Checkout: {
            futureCharges: fromJS({ data }),
            paymentManager: fromJS(paymentManagerModules)
          }
        }
      };

      const configurations = fromJS({
        hide_payplan_details_for_online_checkout: false
      });

      store = configureStore(middlewares)({ configurations, modules });

      mockAPI([
        {
          path: '/test/json/Cart/Checkout/get_agreement.json',
          result: '/test/json/Cart/Checkout/get_agreement_nopayer.json'
        }
      ], () =>
        store.dispatch(getAgreementAsyncAction()).then(() => {
          expect(helper.isIncluding([
            {
              type: actionTypes.AGREEMENT_UI
            }], store.getActions())).toBeFalsy();
          done();
        }).catch((error) => { console.log(error); })
      );
    });
  });

  describe('signAgreementAction', () => {
    it('Should return expected Action Object.', () => {
      const { signAgreementAction } = actions;

      store.dispatch(signAgreementAction());
      expect(helper.isIncluding([
        {
          type: actionTypes.AGREEMENT_ON_SIGN
        }], store.getActions())).toBeTruthy();
    });
  });

  describe('displayAgreementAction', () => {
    it('Should return expected Action Object.', () => {
      const { displayAgreementAction } = actions;

      store.dispatch(displayAgreementAction());
      expect(helper.isIncluding([
        {
          type: actionTypes.AGREEMENT_UI_DISPLAY
        }], store.getActions())).toBeTruthy();
    });
  });

  describe('commitOrderAsyncAction', () => {
    const p = {
      payment_type: 9,
      pad_agreement: false,
      ach_agreement: true
    };

    const { commitOrderAsyncAction } = actions;

    const modules = {
      Cart: {
        Checkout: {
          futureCharges: fromJS({ data: [] })
        }
      }
    };

    const paymentManagerModules = {
      modules: {
        primary: {
          selectedType: 'Electronic Check',
          selected: {
            ams_account_id: 'Demo AccountID',
            save_name: 'woshiyun',
            routing_number: 'xxx8888',
            account_number: 'xxx3230',
            account_type: 'C',
            exclude: false,
            retired: false,
            ams_retention_date: null,
            is_secondary_payment: false
          }
        },
        secondary: {
          isShow: true,
          selected: {}
        }
      }
    };

    it('Should return expected Action Object when isShow is true of secondary.', (done) => {
      const configurations = fromJS({
        hide_payplan_details_for_online_checkout: false
      });

      modules.Cart.Checkout.futureCharges = fromJS({ data: [
        {
          index: 1,
          checked: false
        }
      ] });

      modules.Cart.Checkout.paymentManager = fromJS(paymentManagerModules);
      store = configureStore(middlewares)({ configurations, modules });

      store.dispatch(commitOrderAsyncAction(p)).catch(() => {
        expect(helper.isIncluding([
          {
            type: actionTypes.AGREEMENT_ON_SIGN
          }], store.getActions())).toBeTruthy();
        done();
      });
    });

    it('Should return expected Action Object when isShow is false of secondary.', (done) => {
      const configurations = fromJS({
        hide_payplan_details_for_online_checkout: false
      });

      paymentManagerModules.modules.primary.selected = {};
      paymentManagerModules.modules.secondary.isShow = false;

      modules.Cart.Checkout.paymentManager = fromJS(paymentManagerModules);
      store = configureStore(middlewares)({ configurations, modules });

      store.dispatch(commitOrderAsyncAction(p)).catch(() => {
        expect(helper.isIncluding([
          {
            type: actionTypes.AGREEMENT_ON_SIGN
          }], store.getActions())).toBeTruthy();
        done();
      });
    });


    it('Should return expected Action Object when hide_payplan_details_for_online_checkout is true.', (done) => {
      const configurations = fromJS({
        hide_payplan_details_for_online_checkout: true
      });

      modules.Cart.Checkout.paymentManager = fromJS(paymentManagerModules);
      store = configureStore(middlewares)({ configurations, modules });

      store.dispatch(commitOrderAsyncAction(p)).catch(() => {
        expect(helper.isIncluding([
          {
            type: actionTypes.AGREEMENT_ON_SIGN
          }], store.getActions())).toBeTruthy();
        done();
      });
    });
  });

  describe('commitCCOrderAsyncAction', () => {
    const { commitCCOrderAsyncAction } = actions;

    const modules = {
      Cart: {
        Checkout: {
          futureCharges: fromJS({ data: [] })
        }
      }
    };

    const paymentManagerModules = {
      modules: {
        primary: {
          selectedType: 'Credit Card',
          selected: {
            routing_number: '',
            card_type_flag: 5,
            ams_account_id: '14848185292048547353CXOSJFHJFZDKFZXQNJCZEXCLNTSALHNA',
            is_secondary_payment: false,
            ams_retention_date: 1575187200000,
            card_type: 'Discover',
            retired: false,
            card_id: 114,
            account_type: '',
            save_name: 'sjdj',
            card_type_id: 4,
            card_number: '1111',
            exclude: false,
            id: '4_1111',
            account_number: '',
            customer_id: 336,
            company_id: 0,
            card_expiration: '11/2019'
          }
        },
        secondary: {
          isShow: true,
          selected: {}
        }
      }
    };

    it('Should return a empty array actions.', (done) => {
      const configurations = fromJS({
        hide_payplan_details_for_online_checkout: false
      });

      modules.Cart.Checkout.futureCharges = fromJS({ data: [
        {
          index: 1,
          checked: false
        }
      ] });
      paymentManagerModules.modules.primary.selected.card_id = -1;

      modules.Cart.Checkout.paymentManager = fromJS(paymentManagerModules);
      store = configureStore(middlewares)({ configurations, modules });

      store.dispatch(commitCCOrderAsyncAction()).catch(() => {
        expect(helper.isIncluding([
          {
            type: actionTypes.AGREEMENT_UI_DISPLAY_ERROR
          }], store.getActions())).toBeTruthy();
        done();
      });
    });

    it('Should return a empty array actions when isShow is false of secondary.', (done) => {
      const configurations = fromJS({
        hide_payplan_details_for_online_checkout: false
      });

      modules.Cart.Checkout.futureCharges = fromJS({ data: [
        {
          index: 1,
          checked: false
        }
      ] });

      paymentManagerModules.modules.secondary.isShow = false;
      modules.Cart.Checkout.paymentManager = fromJS(paymentManagerModules);
      store = configureStore(middlewares)({ configurations, modules });

      store.dispatch(commitCCOrderAsyncAction()).catch(() => {
        expect(helper.isIncluding([
          {
            type: actionTypes.AGREEMENT_UI_DISPLAY_ERROR
          }], store.getActions())).toBeTruthy();
        done();
      });
    });

    it('Should return a empty array actions when hide_payplan_details_for_online_checkout is true.', (done) => {
      const configurations = fromJS({
        hide_payplan_details_for_online_checkout: true
      });

      modules.Cart.Checkout.paymentManager = fromJS(paymentManagerModules);
      store = configureStore(middlewares)({ configurations, modules });

      store.dispatch(commitCCOrderAsyncAction()).catch(() => {
        expect(helper.isIncluding([
          {
            type: actionTypes.AGREEMENT_UI_DISPLAY_ERROR
          }], store.getActions())).toBeTruthy();
        done();
      });
    });
  });

  describe('displayAgreementErrorAction', () => {
    it('Should return expected Action Object.', () => {
      const { displayAgreementErrorAction } = actions;

      store.dispatch(displayAgreementErrorAction({}));
      expect(helper.isIncluding([
        {
          type: actionTypes.AGREEMENT_UI_DISPLAY_ERROR
        }], store.getActions())).toBeTruthy();
    });
  });

  describe('commitOrderAction', () => {
    it('Should return expected Action Object with echeck show agreement', (done) => {
      const { commitOrderAction } = actions;

      const configurations = fromJS({
        show_pad_agreement_for_ecp: false,
        show_ach_agreement_for_ecp: true
      });

      const modules = {
        Cart: {
          Checkout: {
            futureCharges: fromJS({ data: [] })
          }
        }
      };

      store = configureStore(middlewares)({ configurations, modules });
      store.dispatch(commitOrderAction('Electronic Check')).then(() => {
        expect(helper.isIncluding([
          {
            type: actionTypes.AGREEMENT_UI
          }], store.getActions())).toBeTruthy();
        done();
      });
    });

    it('Should return expected Action Object with echeck not showing agreement', (done) => {
      const { commitOrderAction } = actions;
      const configurations = fromJS({
        show_pad_agreement_for_ecp: false,
        show_ach_agreement_for_ecp: false
      });

      store = configureStore(middlewares)({
        configurations,
        modules: {
          Cart: {
            Checkout: {
              paymentManager: fromJS({
                modules: {
                  primary: {
                    selectedType: 'Electronic Check',
                    selected: {
                      ams_account_id: 'Demo AccountID',
                      save_name: 'woshiyun',
                      routing_number: 'xxx8888',
                      account_number: 'xxx3230',
                      account_type: 'C',
                      exclude: false,
                      retired: false,
                      ams_retention_date: null,
                      is_secondary_payment: false
                    }
                  },
                  secondary: {
                    isShow: true,
                    selected: {}
                  }
                }
              }),
              futureCharges: fromJS({ data: [] })
            }
          }
        }
      });

      store.dispatch(commitOrderAction('Electronic Check')).catch(() => {
        expect(helper.isIncluding([
          {
            type: actionTypes.AGREEMENT_ON_SIGN
          }], store.getActions())).toBeTruthy();
        done();
      });
    });

    it('Should return expected Action Object when call credit card', (done) => {
      const { commitOrderAction } = actions;
      const configurations = fromJS({
        hide_payplan_details_for_online_checkout: false
      });

      store = configureStore(middlewares)({
        configurations,
        modules: {
          Cart: {
            Checkout: {
              paymentManager: fromJS({
                modules: {
                  primary: {
                    selectedType: 'Credit Card',
                    selected: {
                      routing_number: '',
                      card_type_flag: 5,
                      ams_account_id: '14848185292048547353CXOSJFHJFZDKFZXQNJCZEXCLNTSALHNA',
                      is_secondary_payment: false,
                      ams_retention_date: 1575187200000,
                      card_type: 'Discover',
                      retired: false,
                      card_id: 114,
                      account_type: '',
                      save_name: 'sjdj',
                      card_type_id: 4,
                      card_number: '1111',
                      exclude: false,
                      id: '4_1111',
                      account_number: '',
                      customer_id: 336,
                      company_id: 0,
                      card_expiration: '11/2019'
                    }
                  },
                  secondary: {
                    isShow: true,
                    selected: {}
                  }
                }
              }),
              futureCharges: fromJS({ data: [] })
            }
          }
        }
      });

      store.dispatch(commitOrderAction()).catch(() => {
        expect(helper.isIncluding([
          {
            type: actionTypes.AGREEMENT_UI_DISPLAY_ERROR
          }], store.getActions())).toBeTruthy();
        done();
      });
    });
  });

  describe('show error message when call payAsyncAction ', () => {
    const { payAsyncAction } = actions;
    const unselectedCardMessage = '1111';
    const unselectedSecondaryCardMessage = '222';

    const modules = {
      Cart: {
        Checkout: {
          futureCharges: fromJS({ data: [] })
        }
      }
    };

    const paymentManagerModules = {
      modules: {
        primary: {
          selectedType: 'Electronic Check',
          selected: {
            ams_account_id: 'Demo AccountID',
            save_name: 'woshiyun',
            routing_number: 'xxx8888',
            account_number: 'xxx3230',
            account_type: 'C',
            exclude: false,
            retired: false,
            ams_retention_date: null,
            is_secondary_payment: false
          },
          list: [{
            routing_number: 'xxx8888',
            ams_account_id: 'Demo AccountID',
            is_secondary_payment: false,
            ams_retention_date: null,
            retired: false,
            account_type: 'C',
            save_name: 'woshiyun',
            exclude: false,
            id: 'xxx3230_xxx8888',
            account_number: 'xxx3230'
          }]
        },
        secondary: {
          isShow: true,
          selected: {}
        }
      }
    };

    const configurations = fromJS({
      hide_payplan_details_for_online_checkout: true
    });

    it('jsut commit the primary card and show error message when not select one primary ecp card.', (done) => {
      const types = fromJS({
        'Electronic Check': { selected: null }
      });
      paymentManagerModules.modules.primary.types = types;
      modules.Cart.Checkout.paymentManager = fromJS(paymentManagerModules);

      store = configureStore(middlewares)({ configurations, modules });
      store.dispatch(payAsyncAction(unselectedCardMessage, unselectedSecondaryCardMessage))
      .catch(() => {
        expect(store.getActions().length).toEqual(0);
        done();
      });
    });

    it('just commit the primary card and show error message when not select one secondry ecp card.', (done) => {
      const types = fromJS({
        'Electronic Check': {
          selected: {
            routing_number: 'xxx8888',
            ams_account_id: 'Demo AccountID',
            is_secondary_payment: false,
            ams_retention_date: null,
            retired: false,
            account_type: 'C',
            save_name: 'woshiyun',
            exclude: false,
            id: 'xxx3230_xxx8888',
            account_number: 'xxx3230'
          },
          list: [
            {
              routing_number: 'xxx8888',
              ams_account_id: 'Demo AccountID',
              is_secondary_payment: false,
              ams_retention_date: null,
              retired: false,
              account_type: 'C',
              save_name: 'woshiyun',
              exclude: false,
              id: 'xxx3230_xxx8888',
              account_number: 'xxx3230'
            }
          ]
        }
      });

      const c = fromJS({
        hide_payplan_details_for_online_checkout: false
      });

      const secondary = {
        types: fromJS({
          'Electronic Check': { selected: null, list: [] }
        }),
        selectedType: 'Electronic Check',
        selected: {},
        list: [],
        isShow: true
      };

      paymentManagerModules.modules.primary.types = types;
      paymentManagerModules.modules.secondary = secondary;
      modules.Cart.Checkout.paymentManager = fromJS(paymentManagerModules);

      store = configureStore(middlewares)({ configurations: c, modules });
      store.dispatch(payAsyncAction(unselectedCardMessage, unselectedSecondaryCardMessage))
      .catch(() => {
        expect(store.getActions().length).toEqual(1);
        expect(helper.isIncluding([
          {
            type: actionTypes.AGREEMENT_UI_DISPLAY_ERROR
          }], store.getActions())).toBeTruthy();
        done();
      });
    });

    it('just commit the primary card and show error message when isShow is false', (done) => {
      const types = fromJS({
        'Electronic Check': {
          selected: {
            routing_number: 'xxx8888',
            ams_account_id: 'Demo AccountID',
            is_secondary_payment: false,
            ams_retention_date: null,
            retired: false,
            account_type: 'C',
            save_name: 'woshiyun',
            exclude: false,
            id: 'xxx3230_xxx8888',
            account_number: 'xxx3230'
          },
          list: [
            {
              routing_number: 'xxx8888',
              ams_account_id: 'Demo AccountID',
              is_secondary_payment: false,
              ams_retention_date: null,
              retired: false,
              account_type: 'C',
              save_name: 'woshiyun',
              exclude: false,
              id: 'xxx3230_xxx8888',
              account_number: 'xxx3230'
            }
          ]
        }
      });

      const c = fromJS({
        hide_payplan_details_for_online_checkout: false
      });

      const secondary = {
        types: fromJS({
          'Electronic Check': { selected: null, list: [] }
        }),
        selectedType: 'Electronic Check',
        selected: {},
        list: [],
        isShow: false
      };

      paymentManagerModules.modules.primary.types = types;
      paymentManagerModules.modules.secondary = secondary;
      modules.Cart.Checkout.paymentManager = fromJS(paymentManagerModules);

      store = configureStore(middlewares)({ configurations: c, modules });
      store.dispatch(payAsyncAction(unselectedCardMessage, unselectedSecondaryCardMessage))
      .catch(() => {
        expect(store.getActions().length).toEqual(2);
        expect(helper.isIncluding([
          {
            type: actionTypes.AGREEMENT_UI_DISPLAY_ERROR
          }], store.getActions())).toBeTruthy();
        done();
      });
    });

    it('just commit the primary card and show error message when not select one primary credit card.', (done) => {
      const types = fromJS({
        'Credit Card': { selected: null }
      });
      paymentManagerModules.modules.primary.types = types;
      paymentManagerModules.modules.primary.selectedType = 'Credit Card';
      modules.Cart.Checkout.paymentManager = fromJS(paymentManagerModules);

      store = configureStore(middlewares)({ configurations, modules });
      store.dispatch(payAsyncAction(unselectedCardMessage, unselectedSecondaryCardMessage))
      .catch(() => {
        expect(store.getActions().length).toEqual(0);
        done();
      });
    });
  });

  describe('payAsyncAction when commit order ', () => {
    const { payAsyncAction } = actions;

    const modules = {
      Cart: {
        Checkout: {
          futureCharges: fromJS({ data: [] })
        }
      }
    };

    const paymentManagerModules = {
      modules: {
        primary: {
          selectedType: 'Electronic Check',
          selected: {
            ams_account_id: 'Demo AccountID',
            save_name: 'woshiyun',
            routing_number: 'xxx8888',
            account_number: 'xxx3230',
            account_type: 'C',
            exclude: false,
            retired: false,
            ams_retention_date: null,
            is_secondary_payment: false
          },
          list: [{
            routing_number: 'xxx8888',
            ams_account_id: 'Demo AccountID',
            is_secondary_payment: false,
            ams_retention_date: null,
            retired: false,
            account_type: 'C',
            save_name: 'woshiyun',
            exclude: false,
            id: 'xxx3230_xxx8888',
            account_number: 'xxx3230'
          }]
        },
        secondary: {
          isShow: true,
          selected: {}
        }
      }
    };

    const configurations = fromJS({
      hide_payplan_details_for_online_checkout: false
    });

    it('commit secondry ecp card.', (done) => {
      const types = fromJS({
        'Electronic Check': {
          selected: {
            routing_number: 'xxx8888',
            ams_account_id: 'Demo AccountID',
            is_secondary_payment: false,
            ams_retention_date: null,
            retired: false,
            account_type: 'C',
            save_name: 'woshiyun',
            exclude: false,
            id: 'xxx3230_xxx8888',
            account_number: 'xxx3230'
          },
          list: [
            {
              routing_number: 'xxx8888',
              ams_account_id: 'Demo AccountID',
              is_secondary_payment: false,
              ams_retention_date: null,
              retired: false,
              account_type: 'C',
              save_name: 'woshiyun',
              exclude: false,
              id: 'xxx3230_xxx8888',
              account_number: 'xxx3230'
            }
          ]
        }
      });

      const secondary = {
        types: fromJS({
          'Electronic Check': {
            selected: {
              routing_number: 'xxx8888',
              ams_account_id: 'Demo AccountID',
              is_secondary_payment: false,
              ams_retention_date: null,
              retired: false,
              account_type: 'C',
              save_name: 'woshiyun',
              exclude: false,
              id: 'xxx3230_xxx8888',
              account_number: 'xxx3230'
            },
            list: [
              {
                routing_number: 'xxx8888',
                ams_account_id: 'Demo AccountID',
                is_secondary_payment: false,
                ams_retention_date: null,
                retired: false,
                account_type: 'C',
                save_name: 'woshiyun',
                exclude: false,
                id: 'xxx3230_xxx8888',
                account_number: 'xxx3230'
              }
            ]
          }
        }),
        selectedType: 'Electronic Check',
        selected: {
          routing_number: 'xxx8888',
          ams_account_id: 'Demo AccountID',
          is_secondary_payment: false,
          ams_retention_date: null,
          retired: false,
          account_type: 'C',
          save_name: 'woshiyun',
          exclude: false,
          id: 'xxx3230_xxx8888',
          account_number: 'xxx3230'
        },
        list: [
          {
            routing_number: 'xxx8888',
            ams_account_id: 'Demo AccountID',
            is_secondary_payment: false,
            ams_retention_date: null,
            retired: false,
            account_type: 'C',
            save_name: 'woshiyun',
            exclude: false,
            id: 'xxx3230_xxx8888',
            account_number: 'xxx3230'
          }
        ],
        isShow: true
      };

      paymentManagerModules.modules.primary.types = types;
      paymentManagerModules.modules.secondary = secondary;
      modules.Cart.Checkout.paymentManager = fromJS(paymentManagerModules);

      store = configureStore(middlewares)({ configurations, modules });
      store.dispatch(payAsyncAction()).catch(() => {
        expect(helper.isIncluding([
          {
            type: actionTypes.AGREEMENT_ON_SIGN
          }], store.getActions())).toBeTruthy();
        done();
      });
    });
  });

  describe('resetAgreementStateAction', () => {
    it('Should return expected Action Object.', () => {
      const { resetAgreementStateAction } = actions;

      store.dispatch(resetAgreementStateAction());
      expect(helper.isIncluding([
        {
          type: actionTypes.AGREEMENT_UI_RESET_STATE
        }], store.getActions())).toBeTruthy();
    });
  });

  describe('Validate errors from server when commit cc order', () => {
    const { commitCCOrderAsyncAction } = actions;

    const modules = {
      Cart: {
        Checkout: {
          futureCharges: fromJS({ data: [] })
        }
      }
    };

    const paymentManagerModules = {
      modules: {
        primary: {
          selectedType: 'Credit Card',
          selected: {
            routing_number: '',
            card_type_flag: 5,
            ams_account_id: '14848185292048547353CXOSJFHJFZDKFZXQNJCZEXCLNTSALHNA',
            is_secondary_payment: false,
            ams_retention_date: 1575187200000,
            card_type: 'Discover',
            retired: false,
            card_id: 114,
            account_type: '',
            save_name: 'sjdj',
            card_type_id: 4,
            card_number: '1111',
            exclude: false,
            id: '4_1111',
            account_number: '',
            customer_id: 336,
            company_id: 0,
            card_expiration: '11/2019'
          }
        },
        secondary: {
          isShow: false,
          selected: {}
        }
      }
    };


    it('Jump to confirm screen', (done) => {
      const configurations = fromJS({
        hide_payplan_details_for_online_checkout: true
      });

      modules.Cart.Checkout.paymentManager = fromJS(paymentManagerModules);
      store = configureStore(middlewares)({ configurations, modules });

      mockAPI({
        path: '/test/json/Cart/Checkout/post_order.json',
        result: '/test/json/Cart/Checkout/post_order_success.json'
      }, () =>
        store.dispatch(commitCCOrderAsyncAction())
        .then(() => {
          expect(helper.isIncluding([
            {
              type: actionTypes.AGREEMENT_UI_RESET_STATE
            }], store.getActions())).toBeTruthy();
          done();
        })
      );
    });

    it('Show billing address error message', (done) => {
      const configurations = fromJS({
        hide_payplan_details_for_online_checkout: true
      });

      modules.Cart.Checkout.paymentManager = fromJS(paymentManagerModules);
      store = configureStore(middlewares)({ configurations, modules });

      mockAPI({
        path: '/test/json/Cart/Checkout/post_order.json',
        result: {
          headers: {
            response_code: '9008',
            response_message: 'Failed',
            page_info: {
              order_by: '',
              total_records_per_page: 30,
              total_records: 0,
              total_page: 1,
              order_option: 'ASC',
              page_number: 1
            }
          },
          body: {
            errors: {
              billing_address: 'Invalid billing address'
            }
          }
        }
      }, () =>
        store.dispatch(commitCCOrderAsyncAction())
        .catch(() => {
          expect(helper.isIncluding([
            {
              type: actionTypes.AGREEMENT_UI_DISPLAY_ERROR
            }], store.getActions())).toBeTruthy();
          done();
        })
      );
    });

    it('Show secondary card error message', (done) => {
      const configurations = fromJS({
        hide_payplan_details_for_online_checkout: true
      });

      modules.Cart.Checkout.paymentManager = fromJS(paymentManagerModules);
      store = configureStore(middlewares)({ configurations, modules });

      mockAPI({
        path: '/test/json/Cart/Checkout/post_order.json',
        result: {
          body: {
            headers: {
              response_code: '9008',
              response_message: 'Failed',
              page_info: {
                order_by: '',
                total_records_per_page: 30,
                total_records: 0,
                total_page: 1,
                order_option: 'ASC',
                page_number: 1
              }
            },
            errors: {
              secondary_card: 'Invalid bank account type'
            }
          }
        }
      }, () =>
        store.dispatch(commitCCOrderAsyncAction())
        .catch(() => {
          expect(helper.isIncluding([
            {
              type: actionTypes.AGREEMENT_UI_DISPLAY_ERROR
            }], store.getActions())).toBeTruthy();
          done();
        })
      );
    });

    it('Promise.reject and not API error', (done) => {
      const configurations = fromJS({
        hide_payplan_details_for_online_checkout: true
      });

      modules.Cart.Checkout.paymentManager = fromJS(paymentManagerModules);
      store = configureStore(middlewares)({ configurations, modules });

      mockAPI({
        path: '/test/json/Cart/Checkout/post_order.json',
        result: {
          headers: {},
          body: {}
        }
      }, () =>
        store.dispatch(commitCCOrderAsyncAction())
        .catch(() => {
          expect(store.getActions().length).toEqual(0);
          done();
        })
      );
    });
  });

  describe('Validate errors from server when commit order and need pay is false then call payAsyncAction', () => {
    const { payAsyncAction } = actions;

    const modules = {
      Cart: {
        Checkout: {
          futureCharges: fromJS({ data: [] })
        }
      }
    };

    const paymentManagerModules = {
      modules: {
        primary: {
          selectedType: 'Credit Card',
          selected: {
            routing_number: '',
            card_type_flag: 5,
            ams_account_id: '14848185292048547353CXOSJFHJFZDKFZXQNJCZEXCLNTSALHNA',
            is_secondary_payment: false,
            ams_retention_date: 1575187200000,
            card_type: 'Discover',
            retired: false,
            card_id: 114,
            account_type: '',
            save_name: 'sjdj',
            card_type_id: 4,
            card_number: '1111',
            exclude: false,
            id: '4_1111',
            account_number: '',
            customer_id: 336,
            company_id: 0,
            card_expiration: '11/2019'
          }
        },
        secondary: {
          isShow: false,
          selected: {}
        }
      }
    };


    it('Jump to confirm screen', (done) => {
      const configurations = fromJS({
        hide_payplan_details_for_online_checkout: true
      });

      modules.Cart.Checkout.paymentManager = fromJS(paymentManagerModules);
      store = configureStore(middlewares)({ configurations, modules });
      mockAPI([
        {
          path: '/test/json/Cart/Checkout/get_needpay.json',
          result: '/test/json/Cart/Checkout/get_notneedpay.json'
        },
        {
          path: '/test/json/Cart/Checkout/post_order.json',
          result: '/test/json/Cart/Checkout/post_order_success.json'
        }
      ]
          , () =>
        store.dispatch(payAsyncAction())
        .then(() => {
          expect(helper.isIncluding([
            {
              type: actionTypes.AGREEMENT_UI_RESET_STATE
            }], store.getActions())).toBeTruthy();
          done();
        }).catch((error) => { console.log(error); })
      );
    });

    it('Show billing address error message', (done) => {
      const configurations = fromJS({
        hide_payplan_details_for_online_checkout: true
      });

      modules.Cart.Checkout.paymentManager = fromJS(paymentManagerModules);
      store = configureStore(middlewares)({ configurations, modules });

      mockAPI([
        {
          path: '/test/json/Cart/Checkout/get_needpay.json',
          result: '/test/json/Cart/Checkout/get_notneedpay.json'
        },
        {
          path: '/test/json/Cart/Checkout/post_order.json',
          result: {
            headers: {
              response_code: '9008',
              response_message: 'Failed',
              page_info: {
                order_by: '',
                total_records_per_page: 30,
                total_records: 0,
                total_page: 1,
                order_option: 'ASC',
                page_number: 1
              }
            },
            body: {
              errors: {
                billing_address: 'Invalid billing address'
              }
            }
          }
        }
      ], () =>
        store.dispatch(payAsyncAction('', ''))
        .catch(() => {
          expect(helper.isIncluding([
            {
              type: actionTypes.AGREEMENT_UI_DISPLAY_ERROR
            }], store.getActions())).toBeTruthy();
          done();
        })
      );
    });

    it('Show secondary card error message', (done) => {
      const configurations = fromJS({
        hide_payplan_details_for_online_checkout: true
      });

      modules.Cart.Checkout.paymentManager = fromJS(paymentManagerModules);
      store = configureStore(middlewares)({ configurations, modules });

      mockAPI([
        {
          path: '/test/json/Cart/Checkout/get_needpay.json',
          result: '/test/json/Cart/Checkout/get_notneedpay.json'
        },
        {
          path: '/test/json/Cart/Checkout/post_order.json',
          result: {
            headers: {
              response_code: '9008',
              response_message: 'Failed',
              page_info: {
                order_by: '',
                total_records_per_page: 30,
                total_records: 0,
                total_page: 1,
                order_option: 'ASC',
                page_number: 1
              }
            },
            body: {
              errors: {
                secondary_card: 'Invalid billing address'
              }
            }
          }
        }
      ], () =>
        store.dispatch(payAsyncAction('', ''))
        .catch(() => {
          expect(helper.isIncluding([
            {
              type: actionTypes.AGREEMENT_UI_DISPLAY_ERROR
            }], store.getActions())).toBeTruthy();
          done();
        })
      );
    });

    it('Promise.reject and not API error', (done) => {
      const configurations = fromJS({
        hide_payplan_details_for_online_checkout: true
      });

      modules.Cart.Checkout.paymentManager = fromJS(paymentManagerModules);
      store = configureStore(middlewares)({ configurations, modules });

      mockAPI([
        {
          path: '/test/json/Cart/Checkout/get_needpay.json',
          result: '/test/json/Cart/Checkout/get_notneedpay.json'
        },
        {
          path: '/test/json/Cart/Checkout/post_order.json',
          result: {
            headers: {},
            body: {}
          }
        }
      ], () =>
        store.dispatch(payAsyncAction('', ''))
        .catch(() => {
          expect(store.getActions().length).toEqual(0);
          done();
        })
      );
    });
  });


  describe('commitOrderAsyncAction', () => {
    const { commitOrderAsyncAction } = actions;

    const modules = {
      Cart: {
        Checkout: {
          futureCharges: fromJS({ data: [] })
        }
      }
    };

    const paymentManagerModules = {
      modules: {
        primary: {
          selectedType: 'Electronic Check',
          selected: {
            ams_account_id: 'Demo AccountID',
            save_name: 'woshiyun',
            routing_number: 'xxx8888',
            account_number: 'xxx3230',
            account_type: 'C',
            exclude: false,
            retired: false,
            ams_retention_date: null,
            is_secondary_payment: false
          }
        },
        secondary: {
          isShow: true,
          selected: {
            card_id: 1
          }
        }
      }
    };

    const configurations = fromJS({
      hide_payplan_details_for_online_checkout: false
    });

    it('Jump to confirm screen', (done) => {
      modules.Cart.Checkout.futureCharges = fromJS({ data: [
        {
          index: 1,
          checked: false
        }
      ] });

      modules.Cart.Checkout.paymentManager = fromJS(paymentManagerModules);
      store = configureStore(middlewares)({ configurations, modules });

      mockAPI({
        path: '/test/json/Cart/Checkout/post_order.json',
        result: '/test/json/Cart/Checkout/post_order_success.json'
      }, () =>
        store.dispatch(commitOrderAsyncAction({ electronic_payment: {} }))
        .then(() => {
          expect(helper.isIncluding([
            {
              type: actionTypes.AGREEMENT_UI_RESET_STATE
            }], store.getActions())).toBeTruthy();
          done();
        })
      );
    });

    it('Promise.reject and not API error.', (done) => {
      modules.Cart.Checkout.futureCharges = fromJS({ data: [
        {
          index: 1,
          checked: false
        }
      ] });

      modules.Cart.Checkout.paymentManager = fromJS(paymentManagerModules);
      store = configureStore(middlewares)({ configurations, modules });

      mockAPI({
        path: '/test/json/Cart/Checkout/post_order.json',
        result: {
          headers: {},
          body: {}
        }
      }, () =>
        store.dispatch(commitOrderAsyncAction({ electronic_payment: {} }))
        .catch(() => {
          expect(store.getActions().length).toEqual(1);
          done();
        })
      );
    });

    it('Promise.reject and have API error.', (done) => {
      modules.Cart.Checkout.futureCharges = fromJS({ data: [
        {
          index: 1,
          checked: false
        }
      ] });
      modules.Cart.Checkout.paymentManager = fromJS(paymentManagerModules);
      store = configureStore(middlewares)({ configurations, modules });

      mockAPI({
        path: '/test/json/Cart/Checkout/post_order.json',
        result: {
          headers: {
            response_code: '9019'
          },
          body: {
            message: 'this is test error message',
            isValidationError: true
          }
        }
      }, () =>
        store.dispatch(commitOrderAsyncAction({ electronic_payment: {} }))
        .catch((error) => {
          expect(error.message).toEqual('this is test error message');
          done();
        })
      );
    });
  });
});
