import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import middlewares from 'utils/middlewares';
import helper from 'utils/testHelper';
import merge from 'lodash/merge';
import {
  validateWaiversAction,
  validateAndCheckoutShoppingCartAction,
  checkoutShoppingCartAction
} from 'index/modules/Cart/ShoppingCart/actions/checkout';
import {
  CHECKOUT_UI_VALIDATION
} from 'index/modules/Cart/ShoppingCart/consts/actionTypes';
import { CALL_HISTORY_METHOD } from 'react-router-redux/lib/actions';
import { configurations } from 'utils/context';

describe('index/modules/Cart/ShoppingCart/actions/checkout', () => {
  let store = null;
  const mockStore = configureStore(middlewares);
  const waivers = {
    waiver_text: 'abcd<br/>wowoowowow',
    waiver_text_donation: '',
    waiver_initials_online_text: 'this is tom test system init',
    require_waiver_scrollbottom: true,
    waiver_checked: true,
    waiver_initials_value: '2143',
    attachments: [
      {
        id: '111',
        attached_checklist_item_Id: -2,
        activity_id: 8269,
        dcprogram_id: 0,
        package_id: 0,
        event_type_id: 0,
        stage: {
          uploaded_file_content_type: 'image/jpeg',
          item_type: 1,
          uploaded_file_href_text: 'This is an Active default image',
          description: '3232 csssheck lssist item 1',
          uploaded_fileId: 16,
          id: 5,
          item_text: 'ergsdsdsdssddds'
        },
        show_online: true,
        item_signed_online: true,
        due_increment: 0,
        is_required: false,
        waiver_duration: 0,
        signature_line: false,
        required_before_completing_transaction: true,
        age_limit: 0,
        show_on_online_enrollment_page: false,
        require_initials_online: false,
        print_payer_and_customer: false,
        checked: false,
        online_waiver_initials: null,
        waiver_in_force: false,
        is_global_waiver: true,
        reno: 0,
        description: 'Check list item 1 [Activity Enrollment: LimActivity - 2322]',
        attachment_link: 'http://localhost:8080/linux01/servlet/downloadFile.sdi?uploadedfile_id=16'
      }
    ]
  };
  const waiversAgreements = {
    final_initials_waiver: {
      value: 'test',
      required: true
    },
    final_system_waiver: {
      value: null,
      required: false
    },
    111: {
      value: 'test',
      required: false
    }
  };
  const checkout = {
    validatePass: true
  };
  beforeEach(() => {
    store = mockStore({
      configurations,
      modules: {
        Cart: {
          ShoppingCart: {
            waiver: fromJS({
              waivers: { ...waivers },
              waiversAgreements: { ...waiversAgreements }
            }),
            checkout: fromJS({ ...checkout }),
            ordersummary: fromJS({
              data: {
                is_need_payment: true
              }
            })
          }
        }
      }
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  it('should return CHECKOUT_UI_VALIDATION，CALL_HISTORY_METHOD correctly when dispatch validateWaiversAction with final_system_waiver is required', (done) => {
    const tempWaiversAgreements = merge(
      {}, waiversAgreements, { final_system_waiver: { required: true, value: true } }
    );
    const newStore = mockStore({
      configurations,
      modules: {
        Cart: {
          ShoppingCart: {
            checkout: fromJS({
              needPay: false,
              validatePass: true,
              needValidate: false
            }),
            waiver: fromJS({
              waivers: { ...waivers },
              waiversAgreements: { ...tempWaiversAgreements }
            }),
            ordersummary: fromJS({
              data: {
                is_need_payment: true
              }
            })
          }
        }
      }
    });
    newStore.dispatch(validateAndCheckoutShoppingCartAction()).then(() => {
      const actions = newStore.getActions();
      expect(helper.isIncluding([{
        type: CHECKOUT_UI_VALIDATION
      },
      {
        type: CALL_HISTORY_METHOD,
        payload: {
          args: ['/newcart/checkout']
        }
      }
      ], actions)).toBeTruthy();
      done();
    });
  });

  it('should return CHECKOUT_UI_VALIDATION，CALL_HISTORY_METHOD correctly when dispatch validateWaiversAction with validatePass is false', (done) => {
    const tempWaiversAgreements = merge(
      {}, waiversAgreements, { final_system_waiver: { required: true, value: true } }
    );
    const newStore = mockStore({
      configurations,
      modules: {
        Cart: {
          ShoppingCart: {
            checkout: fromJS({
              needPay: false,
              validatePass: false,
              needValidate: false
            }),
            waiver: fromJS({
              waivers: { ...waivers },
              waiversAgreements: { ...tempWaiversAgreements }
            }),
            ordersummary: fromJS({
              data: {
                is_need_payment: false
              }
            })
          }
        }
      }
    });
    newStore.dispatch(validateAndCheckoutShoppingCartAction()).then(() => {
      const actions = newStore.getActions();
      expect(helper.isIncluding([{
        type: CHECKOUT_UI_VALIDATION
      }
      ], actions)).toBeTruthy();
      done();
    });
  });

  it('should return CHECKOUT_UI_VALIDATION，CALL_HISTORY_METHOD correctly when dispatch validateWaiversAction with needpay is false', (done) => {
    const tempWaiversAgreements = merge(
      {}, waiversAgreements, { final_system_waiver: { required: true, value: true } }
    );
    const newStore = mockStore({
      configurations,
      modules: {
        Cart: {
          ShoppingCart: {
            checkout: fromJS({
              needPay: false,
              validatePass: true,
              needValidate: false
            }),
            waiver: fromJS({
              waivers: { ...waivers },
              waiversAgreements: { ...tempWaiversAgreements }
            }),
            ordersummary: fromJS({
              data: {
                is_need_payment: false
              }
            })
          }
        }
      }
    });
    newStore.dispatch(validateAndCheckoutShoppingCartAction()).then(() => {
      const actions = newStore.getActions();
      expect(helper.isIncluding([{
        type: CHECKOUT_UI_VALIDATION
      },
      {
        type: CALL_HISTORY_METHOD
      }
      ], actions)).toBeTruthy();
      done();
    });
  });

  it('should return CHECKOUT_UI_VALIDATION correctly when dispatch validateWaiversAction with final_system_waiver is not required', (done) => {
    store.dispatch(validateAndCheckoutShoppingCartAction()).then(() => {
      const actions = store.getActions();
      expect(helper.isIncluding([{
        type: CHECKOUT_UI_VALIDATION
      }], actions)).toBeTruthy();
      done();
    });
  });

  it('should return CHECKOUT_UI_VALIDATION correctly when dispatch validateWaiversAction with final_system_waiver is not required and needapy is false', (done) => {
    mockAPI({
      path: '/test/json/Cart/ShoppingCart/post_checkout.json',
      result: {
        headers: {
          response_code: '0000',
          response_message: 'We&#39;re sorry but you do not meet our minimum age requirement of 13 to purchase items online. ',
          page_info: {
            order_by: '',
            page_number: 1,
            total_page: 1,
            total_records: 0,
            total_records_per_page: 30,
            order_option: 'ASC'
          }
        },
        body: {
          need_pay: false,
          errors: {
          }
        }
      }
    }, () => {
      store.dispatch(validateAndCheckoutShoppingCartAction()).then(() => {
        const actions = store.getActions();
        expect(helper.isIncluding([{
          type: CHECKOUT_UI_VALIDATION
        }], actions)).toBeTruthy();
        done();
      });
    });
  });

  it('should return error correctly when dispatch validateWaiversAction with error is validationError', (done) => {
    const newWaiversAgreements = waiversAgreements;
    newWaiversAgreements['111'] = { required: true, value: null };
    const newStore = mockStore({
      configurations,
      modules: {
        Cart: {
          ShoppingCart: {
            waiver: fromJS({
              waivers: { ...waivers },
              waiversAgreements: { ...newWaiversAgreements }
            }),
            checkout: fromJS({ ...checkout })
          }
        }
      }
    });
    newStore.dispatch(validateAndCheckoutShoppingCartAction()).catch((error) => {
      expect(error.message).toEqual('Please check or initial all required waivers.');
      done();
    });
  });

  it('should reject customize error when dispatch checkoutShoppingCartAction', (done) => {
    const errorMessage = 'test error';
    mockAPI({
      path: '/test/json/Cart/ShoppingCart/post_checkout.json',
      result: {
        headers: {
          response_code: '9007',
          response_message: errorMessage
        }
      }
    }, () => {
      store.dispatch(checkoutShoppingCartAction()).catch((error) => {
        expect(error.data.response.message).toEqual(errorMessage);
        done();
      });
    });
  });

  it('should reject validation error when dispatch checkoutShoppingCartAction', (done) => {
    const errorMessage = 'test error';
    mockAPI({
      path: '/test/json/Cart/ShoppingCart/post_checkout.json',
      result: {
        headers: {
          response_code: '9008',
          response_message: errorMessage
        }
      }
    }, () => {
      store.dispatch(checkoutShoppingCartAction()).catch((error) => {
        expect(error.message).toEqual(errorMessage);
        done();
      });
    });
  });

  it('should reject body error when dispatch checkoutShoppingCartAction ', (done) => {
    const message = 'test error';
    mockAPI({
      path: '/test/json/Cart/ShoppingCart/post_checkout.json',
      result: {
        headers: {
          response_code: '9019',
          response_message: message
        },
        body: {
          message
        }
      }
    }, () => {
      store.dispatch(checkoutShoppingCartAction()).catch((error) => {
        expect(error.message).toEqual(message);
        done();
      });
    });
  });

  it('should not response when dispatch checkoutShoppingCartAction and waivers = null ', () => {
    const newWaiversAgreements = waiversAgreements;
    newWaiversAgreements['111'] = { required: true, value: null };
    const newStore = mockStore({
      configurations,
      modules: {
        Cart: {
          ShoppingCart: {
            waiver: fromJS({
              waivers: {},
              waiversAgreements: { ...newWaiversAgreements }
            }),
            checkout: fromJS({ ...checkout })
          }
        }
      }
    });
    newStore.dispatch(checkoutShoppingCartAction()).then((r) => { expect(r).toBeUndefined; });
  });

  it('should not response when dispatch checkoutShoppingCartAction ', () => {
    const newWaiversAgreements = waiversAgreements;
    newWaiversAgreements['111'] = null;
    waivers.attachments[0].stage = null;
    const newStore = mockStore({
      configurations,
      modules: {
        Cart: {
          ShoppingCart: {
            waiver: fromJS({
              waivers: { ...waivers },
              waiversAgreements: { ...newWaiversAgreements }
            }),
            checkout: fromJS({ ...checkout })
          }
        }
      }
    });
    newStore.dispatch(checkoutShoppingCartAction()).then((r) => { expect(r).toBeUndefined; });
  });

  it('should return CHECKOUT_UI_VALIDATION correctly when dispatch validateWaiversAction ', () => {
    const newWaiversAgreements = waiversAgreements;
    newWaiversAgreements['111'] = { required: true, value: null };
    const newStore = mockStore({
      configurations,
      modules: {
        Cart: {
          ShoppingCart: {
            waiver: fromJS({
              waivers: { ...waivers },
              waiversAgreements: { ...newWaiversAgreements }
            }),
            checkout: fromJS({ ...checkout })
          }
        }
      }
    });
    newStore.dispatch(validateWaiversAction());
    const newActions = newStore.getActions();
    expect(helper.isIncluding([{
      type: CHECKOUT_UI_VALIDATION,
      payload: { isPass: false }
    }], newActions)).toBeTruthy();

    newWaiversAgreements.final_initials_waiver = false;

    const newStore1 = mockStore({
      configurations,
      modules: {
        Cart: {
          ShoppingCart: {
            waiver: fromJS({
              waivers: { ...waivers },
              waiversAgreements: { ...newWaiversAgreements }
            }),
            checkout: fromJS({ ...checkout })
          }
        }
      }
    });
    newStore1.dispatch(validateWaiversAction());
    const newActions1 = newStore1.getActions();
    expect(helper.isIncluding([{
      type: CHECKOUT_UI_VALIDATION,
      payload: { isPass: false }
    }], newActions1)).toBeTruthy();

    newWaiversAgreements.final_initials_waiver = { required: true, value: 0 };

    const newStore11 = mockStore({
      configurations,
      modules: {
        Cart: {
          ShoppingCart: {
            waiver: fromJS({
              waivers: { ...waivers },
              waiversAgreements: { ...newWaiversAgreements }
            }),
            checkout: fromJS({ ...checkout })
          }
        }
      }
    });
    newStore11.dispatch(validateWaiversAction());
    const newActions11 = newStore11.getActions();
    expect(helper.isIncluding([{
      type: CHECKOUT_UI_VALIDATION,
      payload: { isPass: false }
    }], newActions11)).toBeTruthy();

    const newStore12 = mockStore({
      configurations,
      modules: {
        Cart: {
          ShoppingCart: {
            waiver: fromJS({
              waivers: {},
              waiversAgreements: { ...newWaiversAgreements }
            }),
            checkout: fromJS({ ...checkout })
          }
        }
      }
    });
    newStore12.dispatch(validateWaiversAction());
    const newActions12 = newStore11.getActions();
    expect(helper.isIncluding([{
      type: CHECKOUT_UI_VALIDATION,
      payload: { isPass: false }
    }], newActions12)).toBeTruthy();

    const newStore13 = mockStore({
      configurations,
      modules: {
        Cart: {
          ShoppingCart: {
            waiver: fromJS({
              waivers: null,
              waiversAgreements: { ...newWaiversAgreements }
            }),
            checkout: fromJS({ ...checkout })
          }
        }
      }
    });
    newStore13.dispatch(validateWaiversAction());
    const newActions13 = newStore11.getActions();
    expect(helper.isIncluding([{
      type: CHECKOUT_UI_VALIDATION,
      payload: { isPass: false }
    }], newActions13)).toBeTruthy();


    const newWaiversAgreements2 = waiversAgreements;
    newWaiversAgreements2['111'] = { required: true, value: 'test' };
    const newStore2 = mockStore({
      configurations,
      modules: {
        Cart: {
          ShoppingCart: {
            waiver: fromJS({
              waivers: { ...waivers },
              waiversAgreements: { ...newWaiversAgreements }
            }),
            checkout: fromJS({ ...checkout })
          }
        }
      }
    });
    newStore2.dispatch(validateWaiversAction());
    const newActions2 = newStore2.getActions();
    expect(helper.isIncluding([{
      type: CHECKOUT_UI_VALIDATION,
      payload: { isPass: true }
    }], newActions2)).toBeFalsy();
  });
});
