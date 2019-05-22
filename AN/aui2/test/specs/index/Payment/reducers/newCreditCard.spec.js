import { fromJS } from 'immutable';
import * as actions from 'index/Payment/actions/modals/NewCreditCard';
import getNewCreditCardReducer from 'index/Payment/reducers/modals/newCreditCard';
import normalizeData from 'shared/utils/normalizeData';

const reducer = getNewCreditCardReducer(__payment__.__initialState__);

describe('index -> payment -> reducers -> modals -> newCreditCard', () => {
    const EMPTYERROR = {
        ccNumber: '',
        ccNumber_cardType: '',
        ccExpiry: '',
        savedCard: '',
        errorKey:''
    };

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const initialStateFn = (currentMonth, currentYear) => (
        {

            cardTypeName: null,
            cardTypeID: null,
            cardTypeValue: null,
            cardTypeList: normalizeData([{
                id: 8,
                selected: false,
                card_type_id: 1,
                card_type: '3 visa'
                }], {
                valueField: 'id',
                textField: 'card_type'
            }),
            cardTypeValidation: {
                validation: null,
                showIcon: false,
                showDropDown: false
            },
            ExpirationDateMonthValue: currentMonth || '',
            ExpirationDateMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                .map(item => ({ value: item, text: item })),
            ExpirationDateYearValue: currentYear || '',
            ExpirationDateYear: Array(...{ length: 11 }).map((v, i) => {
                const val = i + currentYear;
                return { value: val, text: val };
            }),
            errorMsgs: fromJS(EMPTYERROR),
            showModel: false,
            ccTypeDropdown: false,
            CCNumberValue: '',
            saveCardInformation: true,
            isCheckedForPay: false
        }
    );
  
    const initialState = fromJS(initialStateFn(currentMonth, currentMonth));
    it('CLEAR_KEY_ERRORS_ACTION', (done) => {
        const initialState = fromJS(initialStateFn('', ''));
        const errorKey = 'errorKey';
        const state = reducer(initialState, {
            type: actions.CLEAR_KEY_ERRORS_ACTION,
            payload: { errorKey }
        });

        expect(state.toJS().errorMsgs.errorKey).toEqual('');
        done();
    });
    it('CLEAR_KEY_ERRORS_ACTION', (done) => {
        const errorKey = 'errorKey';
        const state = reducer(initialState, {
            type: actions.CLEAR_KEY_ERRORS_ACTION,
            payload: { errorKey }
        });

        expect(state.toJS().errorMsgs.errorKey).toEqual('');
        done();
    });
    it('IS_CHECKED_FOR_PAY_ACTION', (done) => {
        const value = true;
        const state = reducer(initialState, {
            type: actions.IS_CHECKED_FOR_PAY_ACTION,
            payload: { value }
        });
        expect(state.toJS().isCheckedForPay).toEqual(value);
        done();
    });

     it('SHOW_CC_MODAL_ACTION', (done) => {
        const value = false;
        const state = reducer(initialState, {
            type: actions.SHOW_CC_MODAL_ACTION,
            payload: { value }
        });

        expect(state.toJS().cardTypeList).toEqual(initialState.get('cardTypeList').toJS());
        done();
    });
     it('SHOW_CC_MODAL_ACTION', (done) => {
        const value = true;
        const state = reducer(initialState, {
            type: actions.SHOW_CC_MODAL_ACTION,
            payload: { value }
        });

        expect(state.toJS().isCheckedForPay).toEqual(false);
        expect(state.toJS().showModel).toEqual(value);
        done();
    });

    it('FETCH_CARD_TYPE_ACTION_SUCCESS', (done) => {
        const card_type_list = [{
            id: 8,
            selected: false,
            card_type_id: 1,
            card_type: '3 visa'
        }];
        const state = reducer(initialState, {
            type: actions.FETCH_CARD_TYPE_ACTION_SUCCESS,
            payload: { body:{card_type_list} }
        });

        expect(typeof state.toJS().cardTypeList).toEqual('object');
        done();
    });
      it('FETCH_CARD_TYPE_ACTION_SUCCESS another branch', (done) => {
        const card_type_list = [{
            id: 8,
            selected: true,
            card_type_id: 1,
            card_type: '3 visa'
            }];
        const state = reducer(initialState, {
            type: actions.FETCH_CARD_TYPE_ACTION_SUCCESS,
            payload: { body:{card_type_list} }
        });

        expect(typeof state.toJS().cardTypeList).toEqual('object');
        done();
    });
});

