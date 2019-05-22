const rootUrl = window.__environment__.ROOT_URL;

export const permitStageSequence = `${rootUrl}/rest/permit/{permitID}/permitstagesequences`;
export const transactionStages = `${rootUrl}/rest/permit/{permitID}/stagesequences/{stageSequenceID}/transactionstages/{transactionStageID}`;
export const updateAddStageSequence = `${rootUrl}/rest/permit/permitstagesequences/{stageSequenceID}`;
export const deletePermitStageSequence = `${rootUrl}/rest/permit/permitstagesequences/{stageSequenceID}`;
export const loadAddAbleStageSequences = `${rootUrl}/rest/permit/permitstagesequences/addablestagesequences`;
export const processModifyStageSequence = `${rootUrl}/rest/permit/permitstagesequences`;
export const getOneStageSequence = `${rootUrl}/rest/permit/{permitID}/stagesequences/{stageSequenceID}`;
export const fetchCountStageSequences = `${rootUrl}/rest/permit/{permitID}/stagesequences/counts`;
export const searchCustomer = `${rootUrl}/adminSelect.sdi?oc=ANServlet.SystemUser&multiselect=&forreports=&sortcol=&popup_window=yes`;
export const changeStageUser = `${rootUrl}/rest/permit/stagesequence/{stageSequenceID}/transactionstage/{trasactionStageID}/authorizer/{approvalUserID}`;

