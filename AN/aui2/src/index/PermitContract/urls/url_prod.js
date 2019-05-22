const rootUrl = window.__environment__.ROOT_URL;

export const PermitContractInfo = `${rootUrl}/rest/permit/{permit_id}/contract`;
export const PermitSchedule = `${rootUrl}/rest/permit/{permit_id}/schedule`;
export const amendment = `${rootUrl}/rest/permit/{permit_id}/amendments/0`;
export const generatePermitContractPdf = `${rootUrl}/rest/permit/htmlToPdf`;
export const emailContract = `${rootUrl}/rest/permit/emailcontract`;
