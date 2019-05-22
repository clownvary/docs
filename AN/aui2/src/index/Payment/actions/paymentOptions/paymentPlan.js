import { fromJS } from 'immutable';
import find from 'lodash/find';
import moment from 'moment';
import normalizeData from 'shared/utils/normalizeData';
import DateTimeFormat from 'shared/utils/DateTimeFormat';
import camelize from 'shared/utils/camelize';
import getDynamicUrl from 'shared/utils/getDynamicUrl';
import URL from '../../urls';
import getSessionIDs from '../../utils/getSessionIDs';
import { USE_NEW_CARD_ENTITY } from '../../reducers/paymentOptions/creditCard';
import { getPriorCreditCardListAction, getIframeUrlAsyncAction } from './creditCard';
import {
  addNewToCheckList,
  resetUseNewECheckSelectedValue
} from './electronicCheck';

import {
  updatePaymentOptionByKeyAction,
  updatePaymentOptionAction,
  addPaymentOptionAction
} from './options';
import { showErrors } from '../index';
import genSchedules, { genModifiedSchedules } from '../../utils/paymentScheduleGeneration';
import { getECheckList, formatECheckOption } from '../../utils/eCheckHelper';
import {
  proceedMagtekModalPromiseAction,
  hideMagtekModalAction
} from '../modals/Magtek';
import { getCardInfoByPinPadPromiseAction } from '../../components/Modals/PinPad/actions/pinpad';
import {
  proceedNewCreditCardModalPromiseAction,
  fetchAccountHolderAction,
  hideNewCreditCardModalAction
} from '../modals/NewCreditCard';
import {
  showECheckModalPromiseAction
} from '../modals/NewECheck';
import {
  paymentTypes,
  paymentPlanPaymentTypes as ppPaymentTypes,
  newOptions,
  creditCardTypes as CCTYPES,
  paymentTypeNames
} from '../../consts';
import { showModalAction, showError as showPaymentScheduleErrorInTheEditModal } from '../modals/paymentSchedulesEdit';

export const CHANGE_PAYMENTPLAN_AMOUNT = 'CHANGE_PAYMENTPLAN_AMOUNT';
export const CHANGE_PAYMENTPLAN_SECTION = 'CHANGE_PAYMENTPLAN_SECTION';
export const GET_PAYMENT_SCHEDULE = 'GET_PAYMENT_SCHEDULE';
export const GET_PAYMENT_SCHEDULE_SUCCESS = 'GET_PAYMENT_SCHEDULE_SUCCESS';
export const GET_PAYMENT_SCHEDULE_FAILE = 'GET_PAYMENT_SCHEDULE_FAILE';
export const SET_PAYMENT_SCHEDULES = 'SET_PAYMENT_SCHEDULES';
export const CHANGE_AUTO_PAYMENT_STATUS = 'CHANGE_AUTO_PAYMENT_STATUS';
export const UPDATE_BACKUP_PAYMENT = 'UPDATE_BACKUP_PAYMENT';
export const UPDATE_BACKUP_PAYMENT_SUCCESS = 'UPDATE_BACKUP_PAYMENT_SUCCESS';
export const UPDATE_BACKUP_PAYMENT_FAILE = 'UPDATE_BACKUP_PAYMENT_FAILE';
export const UPDATE_AUTO_PAYMMENT_TYPE = 'UPDATE_AUTO_PAYMMENT_TYPE';
export const FETCH_CREDITCARD_LIST = 'FETCH_CREDITCARD_LIST';
export const SET_ECP_LIST = 'SET_ECP_LIST';
export const FETCH_PAYMENTPLAN_ECHECKS_SUCCESS = 'FETCH_PAYMENTPLAN_ECHECKS_SUCCESS';
export const UPDATE_CREDITCARD_LIST = 'UPDATE_CREDITCARD_LIST';
export const UPDATE_ECP_LIST = 'UPDATE_ECP_LIST';
export const CHANGE_PAYMENT_CARD = 'CHANGE_PAYMENT_CARD';
export const OVERRIDE_CC_EXPIRATION = 'OVERRIDE_CC_EXPIRATION';
export const PAYMENTPLAN_ADD_CREDITCARD = 'Payment/PaymentOptions/PAYMENTPLAN_ADD_CREDITCARD';
export const PAYMENTPLAN_ADD_ECHECK = 'Payment/PaymentOptions/PAYMENTPLAN_ADD_ECHECK';

const {
  paymentPlanInitData: {
    payment_plan_wording: paymentPlanWording,
    first_payment_date: firstPaymentDate,
    show_auto_payment_method: showAutoPaymentMethod,
    auto_schedule_read_only: autoScheduleReadOnly,
    reservation_payment_plans: reservationPaymentPlans,
    billing_types: billingTypes,
    number_of_payments: numberOfPayments,
    auto_payment_types: autoPaymentTypes,
    backup_payment_info: backupPaymentInfo,
    payment_dates: initPaymentSchedules
  }
} = window.__payment__.__initialState__;

const dataCache = { backupPaymentInfo: camelize(backupPaymentInfo || {}) };

let _instancePaymentIframe;

export function generatePaymentSchedules(schedules) {
  const generatedSchedules = schedules.map(schedule => ({
    ...schedule,
    dueDate: schedule.due_date
  }));

  return generatedSchedules;
}

const _generatePaymentPlan = (amount, totalBlanceAmount) => {
  const initReservationPPs = normalizeData(reservationPaymentPlans);
  /* istanbul ignore next */
  initReservationPPs.selected = initReservationPPs.selected.length ?
    initReservationPPs.selected[0] : -1;

  const initFrequecys = normalizeData(billingTypes);
  /* istanbul ignore next */
  initFrequecys.selected = initFrequecys.selected.length ? initFrequecys.selected[0] : -1;

  const initNumOfPayments = normalizeData(numberOfPayments);
  /* istanbul ignore next */
  initNumOfPayments.selected = initNumOfPayments.selected.length ?
    initNumOfPayments.selected[0] : -1;

  const getAutoPaymentType = (ppPaymentType) => {
    /* istanbul ignore if */
    if (!autoPaymentTypes || !autoPaymentTypes.length) {
      return {
        valid: false
      };
    }

    const autoPayTypeInfo = find(autoPaymentTypes, payTypeObj => payTypeObj.id === ppPaymentType);
    /* istanbul ignore else */
    if (autoPayTypeInfo) {
      const { name, id, selected } = autoPayTypeInfo;

      return {
        name,
        id,
        selected,
        valid: true,
        list: []
      };
    }

    return {
      valid: false
    };
  };

  const initAutoPaymentTypes = {
    [ppPaymentTypes.CREDITCARD]: getAutoPaymentType(ppPaymentTypes.CREDITCARD),
    [ppPaymentTypes.ELECTRONICCHECK]: getAutoPaymentType(ppPaymentTypes.ELECTRONICCHECK)
  };

  const initAutoCCValid = initAutoPaymentTypes[ppPaymentTypes.CREDITCARD].valid;
  const initAutoEcpValid = initAutoPaymentTypes[ppPaymentTypes.ELECTRONICCHECK].valid;

  /* istanbul ignore else */
  if (initAutoCCValid || initAutoEcpValid) {
    /* istanbul ignore else */
    if (initAutoCCValid && initAutoEcpValid) {
      /* istanbul ignore next */
      initAutoPaymentTypes.selected =
        initAutoPaymentTypes[ppPaymentTypes.ELECTRONICCHECK].selected ?
        ppPaymentTypes.ELECTRONICCHECK : ppPaymentTypes.CREDITCARD;
    } else if (initAutoCCValid) {
      initAutoPaymentTypes.selected = ppPaymentTypes.CREDITCARD;
    } else {
      initAutoPaymentTypes.selected = ppPaymentTypes.ELECTRONICCHECK;
    }
  } else {
    initAutoPaymentTypes.selected = null;
  }
  /* istanbul ignore next */
  return {
    disabled: true,
    amount,
    totalBlanceAmount,
    firstPaymentDate,
    autoScheduleReadOnly,
    paymentPlanWording,
    showAutoPaymentMethod,
    reservationPPs: initReservationPPs,
    frequecys: initFrequecys,
    numOfPayments: initNumOfPayments,
    autoPaymentTypes: initAutoPaymentTypes,
    ComponentName: 'PaymentPlan',
    activeVal: paymentTypes.PAYMENTPLAN,
    list: [{
      text: paymentPlanWording,
      value: paymentTypes.PAYMENTPLAN
    }],
    backupPaymentInfo: dataCache.backupPaymentInfo,
    paymentSchedules: (initPaymentSchedules && initPaymentSchedules.length) ?
      generatePaymentSchedules(initPaymentSchedules) :
      genSchedules({
        paymentPlanAmount: amount,
        firstPaymentDate,
        numOfPayments: initNumOfPayments.selected,
        frequencys: initFrequecys.selected
      }),
    schedulesEdit: fromJS({
      showModel: false,
      error: ''
    })
  };
};

const _getPaymentSchedule = ({
  val,
  payNow,
  isSelectModifyPaymentPlan,
  batchID,
  receiptID,
  permitID
}) => {
  /* istanbul ignore next */
  const url = isSelectModifyPaymentPlan
    ? URL.getPaymentPlanSchedulesWhenModification : URL.getPaymentPlanSchedule;
  return {
    types: [GET_PAYMENT_SCHEDULE, GET_PAYMENT_SCHEDULE_SUCCESS, GET_PAYMENT_SCHEDULE_FAILE],
    promise: API => API.get(url, {
      body: {
        batch_id: batchID,
        receipt_id: receiptID,
        reservation_paymentplan_id: val,
        pay_now: payNow,
        permit_id: permitID
      }
    })
  };
};

export function overrideCcExpiration(flag) {
  return {
    type: OVERRIDE_CC_EXPIRATION,
    payload: { flag }
  };
}

export function setEcpList(ecpList) {
  return {
    type: SET_ECP_LIST,
    payload: { ecpList }
  };
}

export function fetchCCList(creditCardList) {
  return {
    type: FETCH_CREDITCARD_LIST,
    payload: { creditCardList }
  };
}

const _changePaymentPlanAmount = (amount, isSelectModifyPaymentPlan) => ({
  type: CHANGE_PAYMENTPLAN_AMOUNT,
  payload: { amount, isSelectModifyPaymentPlan }
});

const _changePaymentCard = (ppPaymentType, value) => ({
  type: CHANGE_PAYMENT_CARD,
  payload: { ppPaymentType, value }
});


export const _getBackupPayment = ({ batchID, receiptID }) => ({
  types: [UPDATE_BACKUP_PAYMENT, UPDATE_BACKUP_PAYMENT_SUCCESS, UPDATE_BACKUP_PAYMENT_FAILE],
  promise: API => API.get(URL.getBackupPaymentInfo, {
    body: {
      batch_id: batchID,
      receipt_id: receiptID
    }
  })
});


const addCreditCardIntoPaymentPlan = ({
  saved_name,
  card_number,
  ams_account_id,
  card_expiration,
  cardtype_id,
  value,
  text
}) => ({
  type: PAYMENTPLAN_ADD_CREDITCARD,
  payload: { saved_name, card_number, ams_account_id, card_expiration, cardtype_id, value, text }
});

const addECheckIntoPaymentPlan = ({
  is_add_to_customer_ecp,
  eft_account_number,
  name,
  text,
  eft_routing_number,
  value,
  eft_ams_account_id,
  eft_account_type_name,
  echeck_id,
  eft_account_type
}) => ({
  type: PAYMENTPLAN_ADD_ECHECK,
  payload: {
    is_add_to_customer_ecp,
    eft_account_number,
    eft_routing_number,
    eft_ams_account_id,
    eft_account_type_name,
    eft_account_type,

    echeck_id,
    value,
    name,
    text
  }
});

export const addCreditCardInPaymentPlanAction = newCreditCard =>
  dispatch => dispatch(addCreditCardIntoPaymentPlan(newCreditCard));

export const addECheckIntoPaymentPlanAction = (optIndex, saveCardInformation, newECheck) =>
  (dispatch) => {
    if (saveCardInformation) {
      dispatch(addNewToCheckList(optIndex, newECheck));
    }

    window.isInPendingPayment = false;
    return dispatch(addECheckIntoPaymentPlan(newECheck));
  };

export const setPaymenPlanSchedule = (schedules, index) =>
  dispatch => dispatch(updatePaymentOptionByKeyAction(index, 'paymentSchedules', schedules));

export const changeAutoPaymentStatus = (status, index) =>
  dispatch => dispatch(updatePaymentOptionByKeyAction(index, 'showAutoPaymentMethod', status));

export const updateAutoPaymentType = (selectedPayType, index) =>
  dispatch => dispatch(updatePaymentOptionAction(
    opts => opts.setIn([index, 'autoPaymentTypes', 'selected'], selectedPayType)));

export const changePaymentPlanAmount = (amount, totalBlanceAmount) =>
  (dispatch, getState) => {
    const isSelectModifyPaymentPlan = getState().paymentAction.get('isSelectModifyPaymentPlan');
    const modifyMode = parseInt(getState().initialData.permitID, 10) > 0;
    /* istanbul ignore else */
    if (amount > 0 || (!modifyMode && parseInt(amount, 10) === 0)) {
      dispatch(addPaymentOptionAction(_generatePaymentPlan(amount, totalBlanceAmount)));
    }

    return dispatch(_changePaymentPlanAmount(amount, isSelectModifyPaymentPlan));
  };

export const getBackupPayment = () =>
  (dispatch, getState) => {
    const { batchID, receiptID } = getSessionIDs(getState());
    return dispatch(_getBackupPayment({ batchID, receiptID }))
      .then(({ payload: { body: { backup_payment_info } } }) => {
        const payOptions = getState().paymentOptions.options.get('data');
        const paymentPlabOpt = payOptions.find(opt => opt.get('activeVal') === paymentTypes.PAYMENTPLAN);
        const ppIndex = payOptions.indexOf(paymentPlabOpt);

        dataCache.backupPaymentInfo = camelize(backup_payment_info);
        /* istanbul ignore if */
        if (ppIndex > -1) {
          dispatch(updatePaymentOptionByKeyAction(ppIndex, 'backupPaymentInfo', fromJS(dataCache.backupPaymentInfo)));
        }
      });
  };

export function isCCExpireForPaymentSchedule(paymentOptions, paymentSchedules, payActionCache) {
  let ppErrorMsg = '';
  const ccInfo = find(paymentOptions.paymentPlan.ppAutoCCList.data,
    ccItem => ccItem.value === paymentOptions.paymentPlan.ppAutoCCList.selected
  );

  if (paymentSchedules.length && ccInfo) {
    const lastScheduleDateStr = paymentSchedules.slice(-1)[0].dueDate;
    const lastScheduleDate = DateTimeFormat.parseDate(lastScheduleDateStr);
    const ccInfoExpDate = moment(ccInfo.card_expiration, 'MM/YYYY');

    if (lastScheduleDate.isAfter(ccInfoExpDate)) {
      ppErrorMsg = [
        'Credit card expires before date of final scheduled charge ',
        `(${lastScheduleDateStr}). `,
        `Click the '${payActionCache.submitBtn}' button again `,
        'if you want to proceed using the specified date.'
      ].join('');

      return {
        isCCExpireBeforeLastPaySchedule: true,
        ppErrorMsg,
        isErrTypeWarning: true
      };
    }

    return { isCCExpireBeforeLastPaySchedule: false };
  }

  return {
    isCCExpireBeforeLastPaySchedule: false
  };
}

export function setPaymentSchedule(schedules, index) {
  return (dispatch, getState) => {
    const { paymentOptions, payment } = getState();
    const plainPaymentOptions = fromJS(paymentOptions).toJS();
    /* istanbul ignore else */
    if (plainPaymentOptions.paymentPlan.overrideCcExpBeforePpLast) {
      const { isCCExpireBeforeLastPaySchedule } =
      isCCExpireForPaymentSchedule(plainPaymentOptions, schedules, {});
      const paymentErrors = payment.get('errors').filter(err => err.get('type') !== 'warning');

      if (!isCCExpireBeforeLastPaySchedule) {
        dispatch(overrideCcExpiration(false));
        dispatch(showErrors(paymentErrors.toJS()));
      }
    }

    return dispatch(setPaymenPlanSchedule(schedules, index));
  };
}

const setPaymentSchedulesAfterGet = ({
  val,
  payNow,
  index,
  isSelectModifyPaymentPlan
}) => (dispatch, getState) => {
  const { batchID, receiptID, permitID } = getSessionIDs(getState());
  return dispatch(_getPaymentSchedule({
    val,
    payNow,
    isSelectModifyPaymentPlan,
    batchID,
    receiptID,
    permitID
  }))
    .then(({ payload: { body: { payment_schedules } } }) => {
      dispatch(setPaymentSchedule(generatePaymentSchedules(payment_schedules), index));
    });
};


export function changePaymentPlanFields(filedInfo) {
  return (dispatch) => {
    const { index, val, field } = filedInfo;
    if (field === 'firstPaymentDate') {
      dispatch(updatePaymentOptionByKeyAction(index, field, val));
    } else {
      dispatch(updatePaymentOptionAction(opts => opts.setIn([index, field, 'selected'], val)));
    }
  };
}

export function changePaymentPlanSection(sectionInfo) {
  const { field, val, index } = sectionInfo;
  return (dispatch, getState) => {
    const { payment, paymentOptions, paymentAction, paymentSummary } = getState();
    const payNow = payment.get('payNow');
    const {
      frequecys,
      numOfPayments,
      firstPaymentDate: optionFirstPaymentDate,
      amount
    } = paymentOptions.options.toJS().data[index];
    const isSelectModifyPaymentPlan = paymentAction.get('isSelectModifyPaymentPlan');
    /* istanbul ignore next */
    const totalBalanceAmount = isSelectModifyPaymentPlan ?
      paymentSummary.get('totalBalanceAmount') : amount;
    const balancePaid = totalBalanceAmount - amount;

    switch (field) {
      case 'frequecys':
      case 'numOfPayments':
      case 'firstPaymentDate':
        dispatch(changePaymentPlanFields(sectionInfo));
        return dispatch(setPaymentSchedule(
          genSchedules({
            paymentPlanAmount: totalBalanceAmount,
            firstPaymentDate: field === 'firstPaymentDate' && val ? val : optionFirstPaymentDate,
            numOfPayments: field === 'numOfPayments' ? val : numOfPayments.selected,
            frequencys: field === 'frequecys' ? val : frequecys.selected,
            paid: balancePaid
          }), index));
      case 'reservationPPs':
        dispatch(changePaymentPlanFields(sectionInfo));
        if (val !== 0) {
          return dispatch(setPaymentSchedulesAfterGet({
            val,
            payNow,
            index,
            isSelectModifyPaymentPlan
          }));
        }
        return dispatch(setPaymentSchedule(
          genSchedules({
            paymentPlanAmount: totalBalanceAmount,
            firstPaymentDate: optionFirstPaymentDate,
            numOfPayments: numOfPayments.selected,
            frequencys: frequecys.selected,
            paid: balancePaid
          }), index));
      default:
        return false;
    }
  };
}

export function updateAutoPaymentTypeAndCCExpStatus(selectedPayType, index) {
  return (dispatch, getState) => {
    const { paymentOptions, payment } = getState();
    const overrideCcExpBeforePpLast = paymentOptions.paymentPlan.get('overrideCcExpBeforePpLast');
    const paymentErrors = payment.get('errors').filter(err => err.get('type') !== 'warning');
    /* istanbul ignore else */
    if (overrideCcExpBeforePpLast) {
      dispatch(overrideCcExpiration(false));
      dispatch(showErrors(paymentErrors.toJS()));
    }

    return dispatch(updateAutoPaymentType(selectedPayType, index));
  };
}

const _loadPPElectronicCheckList = (params, isSelectModifyPaymentPlan) => {
  const url = isSelectModifyPaymentPlan ? URL.paymentPlanECheckList : URL.loadECheckList;
  return {
    types: ['', FETCH_PAYMENTPLAN_ECHECKS_SUCCESS, ''],
    promise: API => API.get(url, {
      body: { ...params }
    })
  };
};

const loadPPElectronicCheckList = isSelectModifyPaymentPlan =>
  (dispatch, getState) => {
    const { batchID, receiptID, permitID } = getSessionIDs(getState());
    return dispatch(_loadPPElectronicCheckList({
      batch_id: batchID,
      receipt_id: receiptID,
      permit_id: permitID
    }, isSelectModifyPaymentPlan));
  };

export function fetchAutoPaymentMethodList() {
  return (dispatch, getState) => {
    const {
      paymentPlanInitData: {
        show_prior_cc: showPriorCC,
        show_prior_ecp: showPriorEcp
      }
    } = getState().initialData;

    const isSelectModifyPaymentPlan = getState().paymentAction.get('isSelectModifyPaymentPlan');
    /*
      If has selected auto payment method in the create new workflow,
      then when choose the modify payment plan action,
      we should fetch auto payment method event show_prior_ecp or show_prior_cc is false
    */
    /* istanbul ignore else */
    if (showPriorEcp || isSelectModifyPaymentPlan) {
      dispatch(loadPPElectronicCheckList(isSelectModifyPaymentPlan));
    } else {
      const ecpList = getECheckList([]);
      ecpList.selected = -1;
      dispatch(setEcpList(ecpList));
    }
    /* istanbul ignore else */
    if (showPriorCC || isSelectModifyPaymentPlan) {
      const isRefund = getState().payment.get('isRefund');
      dispatch(getPriorCreditCardListAction(isRefund, isSelectModifyPaymentPlan))
        .then(({ payload: { body: { items } } }) => {
          let creditCardList = items.saved_credit_card_list;
          /* eslint-disable */
          creditCardList.forEach((item) => {
            item.name = `${item.cardtype} ends in ${item.card_number}`;
          });
          /* eslint-enable */

          creditCardList = normalizeData(creditCardList, {
            valueField: 'card_number'
          });

          creditCardList.data.push(USE_NEW_CARD_ENTITY);
          /* istanbul ignore next */
          creditCardList.selected = creditCardList.selected.length
            ? creditCardList.selected[0] : -1;
          dispatch(fetchCCList(creditCardList));
        });
    } else {
      const creditCardList = normalizeData([]);

      creditCardList.data.push(USE_NEW_CARD_ENTITY);
      creditCardList.selected = -1;
      dispatch(fetchCCList(creditCardList));
    }
  };
}

export const changePaymentCard = (optIndex, value, ppPaymentType) =>
  (dispatch, getState) => {
    if (value === newOptions.NEW_OPTION_VALUE) {
      /* eslint-disable no-case-declarations */
      switch (ppPaymentType) {
        case ppPaymentTypes.CREDITCARD:
          const state = getState();
          const { batchID, receiptID } = getSessionIDs(state);
          const {
            ccScanWithApdDevice,
            ccScanWithMagesafeDevice
          } = state.initialData;
          const {
            isCheckedForPay
          } = state.paymentModals.newCreditCard.toJS();

          // dispatch new cc modal, save success need also refetch cc list of payment method
          /* istanbul ignore  else */
          if (!isCheckedForPay) {
            let processNewCardPromise = null;
            /* istanbul ignore next */
            if (!ccScanWithApdDevice && !ccScanWithMagesafeDevice) {
              processNewCardPromise = dispatch(proceedNewCreditCardModalPromiseAction());
            } else if (ccScanWithMagesafeDevice) {
              processNewCardPromise = dispatch(proceedMagtekModalPromiseAction(0.00, false));
            } else {
              const { companyId, agentId, customerId } = state.payer.toJS().params;

              const pinpadPayData = {
                isRefund: false,
                debitCardId: false,
                batchID,
                receiptID,
                companyId,
                agentId,
                customerId,
                pays: [{
                  amount: 0,
                  paymentTypeId: paymentTypes.CREDITCARD,
                  payName: paymentTypeNames[paymentTypes.CREDITCARD]
                }]
              };
              processNewCardPromise = dispatch(getCardInfoByPinPadPromiseAction(
                pinpadPayData, { fetchAccountHolderAction }));
            }

            return processNewCardPromise.then(({
              walletId,
              ccNumberValue,
              cardTypeId,
              cardTypeSystemId,
              expirationDate
            }) => {
              dispatch(hideNewCreditCardModalAction());
              dispatch(hideMagtekModalAction());

              // add to cc list and select it
              const last4Digits = ccNumberValue.toString().slice(-4);
              const name = `${CCTYPES[cardTypeId]} ends in ${last4Digits}`;

              const newCreditCard = {
                saved_name: ccNumberValue,
                card_number: last4Digits,
                ams_account_id: walletId,
                card_expiration: expirationDate,
                cardtype_id: cardTypeSystemId,
                value: last4Digits,
                text: name
              };

              dispatch(addCreditCardInPaymentPlanAction(newCreditCard));

              dispatch(_changePaymentCard(ppPaymentType, newCreditCard.value));
            });
          }
          break;
        case ppPaymentTypes.ELECTRONICCHECK:
          return dispatch(showECheckModalPromiseAction())
            .then(
              /* eft_account_number,
              eft_account_type,
              eft_account_type_name,
              eft_ams_account_id,
              eft_routing_number,
              is_add_to_customer_ecp,
              echeck_id
              */
              (eCheckInfo) => {
                const newOptionLength = getState().paymentOptions.paymentPlan.getIn(['ppAutoEcpList', 'data']).size;
                const newOption = formatECheckOption(eCheckInfo, newOptionLength);

                dispatch(addECheckIntoPaymentPlanAction(
                  optIndex, !!eCheckInfo.is_add_to_customer_ecp,
                  newOption));

                if (newOption.is_add_to_customer_ecp) {
                  dispatch(_changePaymentCard(ppPaymentType, newOption.value));
                }
              })
            .catch((err) => {
              dispatch(resetUseNewECheckSelectedValue(optIndex));
              Promise.reject(err);
            });
        default:
          break;
      }
      /* eslint-enable no-case-declarations */
    }

    const { payment, paymentOptions } = getState();
    const paymentErrors = payment.get('errors').filter(err => err.get('type') !== 'warning');
    const overrideCcExpBeforePpLast = paymentOptions.paymentPlan.get('overrideCcExpBeforePpLast');
    /* istanbul ignore else */
    if (overrideCcExpBeforePpLast) {
      dispatch(showErrors(paymentErrors.toJS()));
      dispatch(overrideCcExpiration(false));
    }

    return dispatch(_changePaymentCard(ppPaymentType, value));
  };

export const requestSavePaymentSchedules = ({ paymentSchedules, requestParams }) => {
  const url = getDynamicUrl(URL.savePaymentSchedules, requestParams);
  const requestBody = paymentSchedules.map(schedule => ({
    due_date: schedule.get('dueDate'),
    amount: schedule.get('amount'),
    paid: 0
  }));

  return {
    types: ['', '', ''],
    promise: API => API.post(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody.toJS())
    }),
    meta: {
      ignoreLoadingbar: true,
      ignoreBusinessErrors: true,
      ignoreSystemErrors: true
    }
  };
};

export const savePaymentSchedules = (
  paymentSchedules,
  paymentPlanIndex,
  isSelectCustomForPaymentPlan) => (dispatch, getState) => {
    const state = getState();
    const { batchID, receiptID, permitID } = getSessionIDs(state);
    const { paymentAction, paymentOptions, paymentSummary } = state;
    const isSelectModifyPaymentPlan = paymentAction.get('isSelectModifyPaymentPlan');
    const savePaymentScheduleParams = {
      paymentSchedules,
      requestParams: {
        permitID,
        receiptID,
        batchID,
        reservationPaymentplanId: paymentOptions.options.getIn(['data', paymentPlanIndex, 'reservationPPs', 'selected'])
      }
    };

    if (isSelectModifyPaymentPlan) {
      if (!isSelectCustomForPaymentPlan) {
        return dispatch(requestSavePaymentSchedules(savePaymentScheduleParams))
          .then(({ payload: { body: { payment_schedules: finalPaymentSchedules } } }) => {
            dispatch(setPaymentSchedule(
              generatePaymentSchedules(finalPaymentSchedules),
              paymentPlanIndex));
            dispatch(showModalAction(false, paymentPlanIndex));
          }, ({ payload: { headers: { response_message: message } } }) => {
            dispatch(showPaymentScheduleErrorInTheEditModal(message, paymentPlanIndex));
          });
      }
      const totalBalanceAmount = paymentSummary.get('totalBalanceAmount');
      const balanceAmount = paymentSummary.get('balanceAmount');
      const balancePaid = totalBalanceAmount - balanceAmount;
      const finalPaymentSchedules = genModifiedSchedules(paymentSchedules.toJS(), balancePaid);

      dispatch(setPaymentSchedule(finalPaymentSchedules, paymentPlanIndex));
      return dispatch(showModalAction(false, paymentPlanIndex));
    }

    dispatch(setPaymentSchedule(paymentSchedules, paymentPlanIndex));
    return dispatch(showModalAction(false, paymentPlanIndex));
  };

export const getInstanceAction = instance => () => { _instancePaymentIframe = instance; };

export const submitPPPaymentIframeAsyncAction = () => () => {
  if (_instancePaymentIframe) {
    return _instancePaymentIframe.submitIframePromise();
  }
  return Promise.reject('the payment instance has not been init yet.');
};

export { getIframeUrlAsyncAction };
