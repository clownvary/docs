/* eslint-disable import/prefer-default-export */
const rootUrl = window.__environment__.ROOT_URL;

export const fetchEventDetail = `${rootUrl}/rest/permit/event`;

export const saveQuestionWhenCreating = `${rootUrl}/rest/permitdetail/questionanswer`;

export const saveQuestionWhenUpdating = `${rootUrl}/rest/permit/questionanswer`;

export const deleteQuestion = `${rootUrl}/rest/permit/deletequestion`;

export const confirmChange = `${rootUrl}/rest/permitdetail/{permitID}`;

export const isImpactOthersEventsFeeOrQuestion = `${rootUrl}/rest/permit/questiononotherevents`;

export const bookingCountExceed = `${rootUrl}/rest/permit/bookingcountexceed`;

/* eslint-disable import/prefer-default-export */
export const deleteEvent = `${rootUrl}/rest/permit/event?batch_id={batchID}&receipt_id={receiptID}&event_id={eventID}&new_entry_id={newEntryID}`;

export const leaveToPaymentPlan = `${rootUrl}/rest/paymentplan/permitrecalculatebalance?permit_id={permitId}&batch_id={batchId}&receipt_id={receiptId}&draft_receipt_id={draftReceiptId}`;

export const fetchBalanceDueDetail = `${rootUrl}/rest/permit/balanceduedetail`;

export const fileUpload = `${rootUrl}/rest/permit/attachments`;

export const fetchAttachments = `${rootUrl}/rest/permit/attachments?permit_id={permitID}`;

export const downloadFile = `${rootUrl}/downloadFile.sdi?uploadedfile_id={uploadedfileId}`;

export const deleteAttachment = `${rootUrl}/rest/permit/attachments?permit_id={permitID}&uploadedfile_id={uploadedfileId}`;

export const updateExpirationDate = `${rootUrl}/rest/permit/expirationdate`;

export const loadAddableQuestions = `${rootUrl}/rest/permit/loadaddablequestions`;

export const changeAgent = `${rootUrl}/rest/permitdetail/changeAgent`;

export const changeCustomerOrCompany = `${rootUrl}/rest/permitdetail/changeCustomerOrCompany`;

export const fetchPermitEvents = `${rootUrl}/rest/permit/events?permit_id={permitId}&batch_id={batchId}&receipt_id={receiptId}`;

export const searchCompany = 'adminSelect.sdi?oc=Company&control=modify.holder&singular=true&choose_customer_company=true';

export const searchCustomer = 'adminSelect.sdi?oc=Customer&control=modify.holder&singular=true&show_passnumber_top=&show_passnumber_bottom=True&for_facility_redesign=true&&choose_customer_company=true';

export const fetchAgents = `${rootUrl}/rest/permitdetail/companyagents`;
