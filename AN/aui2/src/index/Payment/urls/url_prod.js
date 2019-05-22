const rootUrl = window.__environment__.ROOT_URL;
export const savePayer = `${rootUrl}/rest/receiptpayment/payer`;
export const fetchPaymentOptions = `${rootUrl}/rest/receiptpayment/paymentoptions`;
export const searchCustomer = `${rootUrl}/adminSelect.sdi?oc=Customer&control=new_customer.quick_res_reference&singular=true&show_passnumber_top=&show_passnumber_bottom=True&for_facility_redesign=true`;

export const searchCompany = `${rootUrl}/adminSelect.sdi?oc=Company&control=new_company.company&singular=true`;

export const companyagents = `${rootUrl}/rest/receiptpayment/companyagents`;

export const creditAccount = `${rootUrl}/rest/receiptpayment/account`;

export const makePayment = `${rootUrl}/rest/receiptpayment/payment`;

export const creditCardList = `${rootUrl}/rest/receiptpayment/creditcardlist`;

export const cardtype = `${rootUrl}/rest/receiptpayment/cardtype`;

export const accountholder = `${rootUrl}/rest/receiptpayment/accountholder`;

export const amsaccountid = `${rootUrl}/rest/receiptpayment/amsaccountid`;

export const loadECheckList = `${rootUrl}/rest/receiptpayment/echeck`;

export const addNewECheck = `${rootUrl}/rest/receiptpayment/echeck`;

export const ach = `${rootUrl}/rest/receiptpayment/ach`;

export const eCheckConfig = `${rootUrl}/rest/receiptpayment/echeckconfig`;

export const loadGiftCardList = `${rootUrl}/rest/receiptpayment/giftcardlist`;

export const fetchRefundOptions = `${rootUrl}/rest/refund/refundoptions`;

export const fetchRefundAccountConfig = `${rootUrl}/rest/refund/account/option`;

export const refundCreditCardList = `${rootUrl}/rest/refund/creditcards`;

export const amsaccountid4magnesafe = `${rootUrl}/rest/receiptpayment/amsaccountid4magnesafe`;

export const refundGiftCardlist = `${rootUrl}/rest/receiptpayment/giftcardrefundinfo`;

export const issueGiftCard = `${rootUrl}/rest/receiptpayment/giftcard`;

export const deletePendingGiftCard = `${rootUrl}/rest/receiptpayment/deletegiftcards`;

export const deletePayerGiftCards = `${rootUrl}/rest/receiptpayment/deletepayergiftcards`;

export const makeAPayment = `${rootUrl}/rest/permit/payonaccount/`;

export const ccexpireinfo = `${rootUrl}/rest/receiptpayment/ccexpireinfo`;

export const saveModifiedPaymentPlan = `${rootUrl}/rest/paymentplan/paymentplan?permit_id={permitID}&batch_id={batchID}&receipt_id={receiptID}`;

export const paymentPlanCreditCardList = `${rootUrl}/rest/paymentplan/creditcards`;

export const paymentPlanECheckList = `${rootUrl}/rest/paymentplan/echecks`;

export const getPaymentPlanSchedule = `${rootUrl}/rest/receiptpayment/autoplanschedules`;

export const getPaymentPlanSchedulesWhenModification = `${rootUrl}/rest/paymentplan/autoplanschedules`;

export const getIniPaymentPlanData = `${rootUrl}/rest/receiptpayment/paymentplaninitdata`;

export const getBackupPaymentInfo = `${rootUrl}/rest/receiptpayment/backuppaymentinfo`;

export const paymentPlanBackupUrl = 'modifyPaymentStaff.sdi?for_facility_redesign=true';

export const savePaymentSchedules = `${rootUrl}/rest/paymentplan/adjustautoplanschedule?permit_id={permitID}&receipt_id={receiptID}&batch_id={batchID}&reservation_paymentplan_id={reservationPaymentplanId}`;

export const getPayer = `${rootUrl}/rest/receiptpayment/payer?batch_id={batchID}&receipt_id={receiptID}`;

export const getPCIIframeUrl = `${rootUrl}/rest/receiptpayment/pcichekoutiframeurl`;

export const getRefundPCIIframeUrl = `${rootUrl}/rest/refund/pcichekoutiframeurl`;

export const getPaymentPlanPCIIframeUrl = `${rootUrl}/rest/paymentplan/pcichekoutiframeurl`;
