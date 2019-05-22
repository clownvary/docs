import { fromJS } from 'immutable';
import first from 'lodash/first';
import last from 'lodash/last';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import mockAPI from 'utils/mockAPI';
import * as actions from 'index/PermitDetail/actions/addToCart';
import * as prerequisiteActions from 'shared/actions/prerequisite';
import { mockState } from '../mockState';

describe('index -> PermitDetail -> actions -> addToCart', () => {
  let store = null;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({
      prerequisite: fromJS({
        needOverride: false
      })
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  test('addToCart should works fine', () => {
    const { addToCart, PERMIT_ADD_TO_CART, PERMIT_ADD_TO_CART_SUCCESS } = actions;

    return store.dispatch(addToCart('data')).then(({ payload: { body } }) => {
      const fetchAction = first(store.getActions());
      expect(fetchAction.type).toEqual(PERMIT_ADD_TO_CART);

      const fetchResultAction = last(store.getActions());
      expect(fetchResultAction.type).toEqual(PERMIT_ADD_TO_CART_SUCCESS);

      expect(body.auto_compelete_receipt).toBeTruthy();
      expect(body.no_charge).toBeTruthy();
      expect(body.error).toEqual('');
      expect(body.receipt_header_id).toBeTruthy();
    });
  });

  test('addToCartCheck should works fine, if no error and all required',
    () => {
      const { addToCartCheck, PERMIT_ADD_TO_CART, PERMIT_ADD_TO_CART_SUCCESS } = actions;
      const waiverData = fromJS([{
        transactionstageID: -1,
        attachedchecklistitemID: -3,
        stageID: 8,
        stageVersion: 0,
        stageType: 1,
        description: 'Global waiver',
        attachmentID: -1,
        attachmentName: '',
        showDisplayPermit: true,
        displayPermitSelected: false,
        disableAgreetowaiver: false,
        agreetowaiverSelected: false,
        canModifySignature: true,
        signatureBase64: '',
        itemText: 'It is a global waiver\r\nThis should be a new line.\r\nThe end.',
        uploadfileHrefText: null,
        isRequired: false,
        waiverIndex: 2
      }]);

      const getState = {
        waiver: fromJS({
          data: waiverData
        }),
        question: fromJS({
          errorMsg: fromJS([])
        }),
        prerequisite: fromJS(mockState.prerequisite)
      };
      const mockStore = configureStore(middlewares);

      store = mockStore(getState);
      return store.dispatch(addToCartCheck({})).then(({ payload: { body } }) => {
        const storeActions = store.getActions();

        expect(storeActions.some(action => action.type === PERMIT_ADD_TO_CART)).toEqual(true);
        expect(storeActions.some(action => action.type === PERMIT_ADD_TO_CART_SUCCESS)).toEqual(true);
        expect(body.auto_compelete_receipt).toBeTruthy();
        expect(body.no_charge).toBeTruthy();
        expect(body.error).toEqual('');
        expect(body.receipt_header_id).toBeTruthy();
      });
    }
  );

  test('addToCartCheck should works fine, no error', (done) => {
    const { addToCartCheck } = actions;
    const waiverData = fromJS([{
      transactionstageID: -1,
      attachedchecklistitemID: -3,
      stageID: 8,
      stageVersion: 0,
      stageType: 1,
      description: 'Global waiver',
      attachmentID: -1,
      attachmentName: '',
      showDisplayPermit: true,
      displayPermitSelected: true,
      disableAgreetowaiver: false,
      agreetowaiverSelected: false,
      canModifySignature: true,
      signatureBase64: '',
      itemText: 'It is a global waiver\r\nThis should be a new line.\r\nThe end.',
      uploadfileHrefText: null,
      isRequired: true,
      waiverIndex: 2
    }]);
    const getState = {
      waiver: fromJS({
        data: waiverData
      }),
      survey: fromJS({
        questions: [],
        errors: [{ customquestionIndex: 1, message: 'this is a mock error' }]
      }),
      prerequisite: fromJS(mockState.prerequisite)
    };

    const mockStore = configureStore(middlewares);
    store = mockStore(getState);

    const actionResult = store.dispatch(addToCartCheck({}));

    expect(actionResult).toEqual(false);
    done();
  });

  test('addToCartCheck should works fine, no waiver', (done) => {
    const { addToCartCheck } = actions;
    // add the extra element which is needed by moveToTopOfPage() in addToCartCheck
    const element = document.createElement('div');
    element.id = 'permit-detail-page';
    element.scrollIntoView = jest.fn();
    document.body.appendChild(element);

    const mockStore = configureStore(middlewares);
    store = mockStore({
      waiver: fromJS({}),
      survey: fromJS({
        questions: [],
        errors: [{
          customquestionIndex: 2,
          message: 'this is a mock error'
        }]
      }),
      prerequisite: fromJS({
        needOverride: false,
        isOverride: false
      })

    });

    const actionResult = store.dispatch(addToCartCheck({}));
    expect(actionResult).resolves.toBe({});
    done();
  });

  test('addToCartCheck should works fine, no required', (done) => {
    const { addToCartCheck } = actions;
    const waiverData = fromJS([{
      transactionstageID: -1,
      attachedchecklistitemID: -3,
      stageID: 8,
      stageVersion: 0,
      stageType: 1,
      description: 'Global waiver',
      attachmentID: -1,
      attachmentName: '',
      showDisplayPermit: true,
      displayPermitSelected: true,
      disableAgreetowaiver: false,
      agreetowaiverSelected: false,
      canModifySignature: true,
      signatureBase64: '',
      itemText: 'It is a global waiver\r\nThis should be a new line.\r\nThe end.',
      uploadfileHrefText: null,
      isRequired: true,
      waiverIndex: 2
    }]);

    const getState = {
      waiver: fromJS({
        data: waiverData
      }),
      question: fromJS({
        errorMsg: fromJS([])
      }),
      prerequisite: fromJS(mockState.prerequisite)
    };

    const mockStore = configureStore(middlewares);
    store = mockStore(getState);

    const action = store.dispatch(addToCartCheck({}));
    expect(typeof action).toEqual('boolean');
    done();
  });

  test('addToCartCheck, need override', () => {
    const { addToCartCheck } = actions;
    const mockStore = configureStore(middlewares);
    store = mockStore({
      waiver: fromJS({
        data: []
      }),
      question: fromJS({
        errorMsg: fromJS([])
      }),
      prerequisite: fromJS({
        needOverride: true,
        isOverride: false
      })
    });

    store.dispatch(addToCartCheck({}))
    expect(first(store.getActions()).type).toBe(prerequisiteActions.PREREQUISITE_ADD_ERRORS)
  });

  test('addToCartCheck should works fine, other conditions', () => {
    const { addToCartCheck, PERMIT_ADD_TO_CART, PERMIT_ADD_TO_CART_SUCCESS } = actions;
    const waiverData = fromJS([{
      transactionstageID: -1,
      attachedchecklistitemID: -3,
      stageID: 8,
      stageVersion: 0,
      stageType: 1,
      description: 'Global waiver',
      attachmentID: -1,
      attachmentName: '',
      showDisplayPermit: true,
      displayPermitSelected: false,
      disableAgreetowaiver: false,
      agreetowaiverSelected: false,
      canModifySignature: true,
      signatureBase64: '',
      itemText: 'It is a global waiver\r\nThis should be a new line.\r\nThe end.',
      uploadfileHrefText: null,
      isRequired: false,
      waiverIndex: 2
    }]);

    const getState = {
      waiver: fromJS({
        data: waiverData
      }),
      question: fromJS({
        errorMsg: fromJS([])
      }),
      prerequisite: fromJS({
        // ...mockState.prerequisite,
        needOverride: true,
        isOverride: true,
        haveOverrideAuthority: true
      })
    };
    const mockStore = configureStore(middlewares);
    const headers = {
      "response_code": "0000",
      "response_message": "Successful",
      "page_info": {
        "order_by": "",
        "total_page": 1,
        "total_records": 0,
        "total_records_per_page": 20,
        "order_option": "ASC",
        "page_number": 0
      }
    };

    mockAPI([{
        path: '/json/PermitDetail/addToCart.json',
        time: 1,
        result: {
          headers,
          "body": {
            "auto_compelete_receipt": "false",
            "nocharge": "false",
            "error": "",
            "receipt_header_id": "0",
            "override_result": {
              "success": false,
            }
          }
        }
      },
      {
        path: '/json/PermitDetail/addToCart.json',
        time: 2,
        result: {
          headers,
          "body": {
            "auto_compelete_receipt": "true",
            "nocharge": "true",
            "error": "",
            "receipt_header_id": "0",
          }
        }
      },
      {
        path: '/json/PermitDetail/addToCart.json',
        time: 3,
        result: {
          headers,
          "body": {
            "auto_compelete_receipt": "",
            "nocharge": "",
            "error": "",
            "receipt_header_id": "0",
          }
        }
      },
      {
        path: '/json/PermitDetail/addToCart.json',
        time: 4,
        result: {
          headers,
          "body": {
            "auto_compelete_receipt": "false",
            "nocharge": "false",
            "error": "",
            "receipt_header_id": "0",
          }
        }
      }
    ])

    store = mockStore(getState);
    return store.dispatch(addToCartCheck({})).then(({ payload: { body } }) => {
      const storeActions = store.getActions();

      expect(storeActions.some(action => action.type === PERMIT_ADD_TO_CART)).toEqual(true);
      expect(storeActions.some(action => action.type === PERMIT_ADD_TO_CART_SUCCESS)).toEqual(true);
      expect(body.auto_compelete_receipt).toBeTruthy();
      expect(body.nocharge).toBeTruthy();
      expect(body.error).toEqual('');
      expect(body.receipt_header_id).toBeTruthy();
    }).then(() => {
      store.dispatch(addToCartCheck({})).then(({ payload: { body } }) => {
        const storeActions = store.getActions();

        expect(storeActions.some(action => action.type === PERMIT_ADD_TO_CART)).toEqual(true);
        expect(storeActions.some(action => action.type === PERMIT_ADD_TO_CART_SUCCESS)).toEqual(true);
        expect(body.auto_compelete_receipt).toBeTruthy();
        expect(body.nocharge).toBeTruthy();
        expect(body.error).toEqual('');
        expect(body.receipt_header_id).toBeTruthy();
      });
    }).then(() => {
      store.dispatch(addToCartCheck({})).then(({ payload: { body } }) => {
        const storeActions = store.getActions();

        expect(storeActions.some(action => action.type === PERMIT_ADD_TO_CART)).toEqual(true);
        expect(storeActions.some(action => action.type === PERMIT_ADD_TO_CART_SUCCESS)).toEqual(true);
        expect(body.auto_compelete_receipt).toBeFalsy();
        expect(body.nocharge).toBeFalsy();
        expect(body.error).toEqual('');
        expect(body.receipt_header_id).toBeTruthy();
      });
    }).then(() => {
      store.dispatch(addToCartCheck({})).then(({ payload: { body } }) => {
        const storeActions = store.getActions();

        expect(storeActions.some(action => action.type === PERMIT_ADD_TO_CART)).toEqual(true);
        expect(storeActions.some(action => action.type === PERMIT_ADD_TO_CART_SUCCESS)).toEqual(true);
        expect(body.auto_compelete_receipt).toBeTruthy();
        expect(body.nocharge).toBeTruthy();
        expect(body.error).toEqual('');
        expect(body.receipt_header_id).toBeTruthy();
      });
    })
  });
});
