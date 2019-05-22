const rootUrl = window.__environment__.ROOT_URL;

export const savePermitType = `${rootUrl}/json/PermitDetail/savePermitType.json`;
export const searchCustomer = `${rootUrl}/adminSelect.sdi?oc=Customer&control=new_customer.quick_res_reference&singular=true&show_passnumber_top=&show_passnumber_bottom=True&for_facility_redesign=true`;
export const searchCompany = `${rootUrl}/adminSelect.sdi?oc=Company&control=new_company.company&singular=true`;
export const companyagents = `${rootUrl}/json/PermitDetail/saveCustomerAndCompany.json`;
export const customerandcompany = `${rootUrl}/json/PermitDetail/saveCustomerAndCompany.json`;
export const fetchQuestionWhenCreating = `${rootUrl}/json/PermitDetail/questions.json`;
export const saveQuestionWhenCreating = `${rootUrl}/json/PermitDetail/saveQuestion.json`;
export const fetchQuestionWhenUpdating = `${rootUrl}/json/PermitDetail/questions2.json`;
export const addToCart = `${rootUrl}/json/PermitDetail/addToCart.json`;
export const permitdetail = `${rootUrl}/json/PermitDetail/permitdetail.json`;
export const ready4checkout = `${rootUrl}/json/Cart/ready4checkout.json`;
export const incart = `${rootUrl}/json/Cart/incart.json`;
export const fetchStageSequences = `${rootUrl}/json/PermitDetail/stageSequences.json`;
export const updateStageSequence = `${rootUrl}/json/PermitDetail/updateStagesequences.json`;
