const rootUrl = window.__environment__.ROOT_URL;

export const runningCart = `${rootUrl}/rest/cart/reservationrunningcart`;

export const authority = `${rootUrl}/rest/profile/authorities?permit_id={permitID}`;

export const cancelReceipt = `${rootUrl}/rest/common/receipt/cancel/{batchID}/{receiptID}?void_draft={voidDraft}`;

export const fetchCashSummarySheet = `${rootUrl}/rest/receiptpayment/cashsummarysheetconfirmation`;

export const createCashSummarySheet = `${rootUrl}/rest/receiptpayment/newcashsummarysheet`;

export const selectCashSummarySheet = `${rootUrl}/rest/receiptpayment/existingcashsummarysheet`;

export const waiver = `${rootUrl}/rest/permitdetail/waiver`;

export const saveWaiver = `${rootUrl}/rest/permitdetail/waiver`;

export const modifyWaiver = `${rootUrl}/rest/permit/waiver`;

export const loadAddableWaivers = `${rootUrl}/rest/permit/loadaddablewaivers`;

export const notes = `${rootUrl}/rest/permitdetail/note`;

export const saveNotes = `${rootUrl}/rest/permitdetail/note`;

export const modifyNotes = `${rootUrl}/rest/permit/note`;

export const newReservationFee = `${rootUrl}/rest/permitdetail/newreservationfee`;

export const deletePermitFee = `${rootUrl}/rest/permitdetail/permitcharge`;

/* eslint-disable quotes */
export const addNewCharge = `ChangeReservationFee.sdi?singular=true&for_facility_redesign=true&\
facility_charge_id={facilityChargeID}&facility_id_selected={facilityID}&facility_schedule_id={facilityScheduleID}&\
rno={receiptID}&reno={receiptEntryID}&callback=__feeAddNewCharge()`;

export const addNewChargeModify = `addPermitCharge.sdi?singular=true&for_facility_redesign=true&\
permit_id={permitID}&transaction_id={transactionID}&facility_id_selected={facilityID}&\
facility_schedule_id={facilityScheduleID}&new_entry_id={newEntryID}&\
rno={receiptID}&reno={receiptEntryID}&callback=__feeAddNewCharge('{eventID}','{eventIndex}','{newEntryID}')`;

export const editChargeModify = `ChangePermitCharge.sdi?singular=true&for_facility_redesign=true&\
permit_id={permitID}&transaction_id={transactionID}&facility_charge_id={facilityChargeID}&facility_id_selected={facilityID}&\
receiptdetail_id={receiptDetailID}&facility_schedule_id={facilityScheduleID}&receipt_id={receiptID}&\
new_entry_id={newEntryID}&form_name=changepermitcharge&sdireqauth={sdirequath}&callback=__feeAddNewCharge('{eventID}','{eventIndex}','{newEntryID}')`;
/* eslint-enable */

export const fetchPermitFeeModify = `${rootUrl}/rest/permit/reservationfee`;

export const deletePermitFeeModify = `${rootUrl}/rest/permitdetail/permitcharge`;

export const updateSkylogix = `${rootUrl}/rest/permit/pinvalue/{permitID}`;
export const permitContract = `${rootUrl}/ui.do?method=showPermitContract&permit_id={permitID}`;

export const fetchBreadCrumb = `${rootUrl}/rest/resource/breadcrumb?batch_id={batchId}&receipt_id={receiptId}`;
export const fetchHelpLink = `${rootUrl}/rest/common/help?view_name={viewName}`;

export const resetFee = `${rootUrl}/rest/permitdetail/resetfees`;

export const changePermitStatus = `${rootUrl}/rest/permit/permitstatus`;

export const fetchSpecialHandlingStatus = `${rootUrl}/rest/permitdetail/customerspecialhandling/{customerId}`;

export const fetchSpecialHandlingInfo = `${rootUrl}/rest/permitdetail/customeralertinfo/{customerId}`;

export const detectSameCharge = `${rootUrl}/rest/permitdetail/samecharge`;
export const applyToAll = `${rootUrl}/rest/permit/charges/applytoall`;

