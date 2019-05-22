const rootUrl = window.__environment__.ROOT_URL;

export const savePermitType = `${rootUrl}/rest/permitdetail/permitholdtype`;
export const searchCustomer = `${rootUrl}/adminSelect.sdi?oc=Customer&control=new_customer.quick_res_reference&singular=true&show_passnumber_top=&show_passnumber_bottom=True&for_facility_redesign=true`;
export const searchCompany = `${rootUrl}/adminSelect.sdi?oc=Company&control=new_company.company&singular=true`;
export const companyagents = `${rootUrl}/rest/permitdetail/companyagents`;
export const customerandcompany = `${rootUrl}/rest/permitdetail/customerandcompany`;
export const fetchQuestionWhenCreating = `${rootUrl}/rest/permitdetail/question`;
export const saveQuestionWhenCreating = `${rootUrl}/rest/permitdetail/questionanswer`;
export const fetchQuestionWhenUpdating = `${rootUrl}/rest/permit/question`;
export const addToCart = `${rootUrl}/rest/permitdetail/cart`;
export const permitdetail = `${rootUrl}/rest/permitdetail/`;
export const ready4checkout = `${rootUrl}/rest/cart/ready4checkout`;
export const incart = `${rootUrl}/rest/cart/incart`;
export const fetchStageSequences = `${rootUrl}/rest/permitdetail/stagesequences`;
export const updateStageSequence = `${rootUrl}/rest/permitdetail/stagesequences/{stageSequenceID}`;
