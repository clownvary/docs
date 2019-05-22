import { messages } from 'shared/consts';
import { cancelReceipt } from 'shared/actions/receipt';
import isFunction from 'lodash/isFunction';
import * as da from 'react-base-ui/lib/utils/dataAccess';

function promptUser(msg = messages.leavePagePrompt) {
  /* eslint-disable no-alert */
  return confirm(msg);
}

export function cleanOnLeaving(actionInfo = {}) {
  const batchID = da.get(actionInfo, 'batchID');
  const receiptID = da.get(actionInfo, 'receiptID');
  const voidDraft = da.get(actionInfo, 'voidDraft');
  const result = cancelReceipt(batchID, receiptID, voidDraft);
  if (!result.success) {
    alert(result.response_message);
    return false;
  }

  return true;
}

function checkUnfinishedWork(promptsWhenHasUnfinishedTasks = []) {
  if (Array.isArray(promptsWhenHasUnfinishedTasks)) {
    return promptsWhenHasUnfinishedTasks
      .some(isPrompt => (isFunction(isPrompt) ? isPrompt() : false));
  }

  return false;
}

function checkLeavingCurrentWorkflow(breadCrumb, newUrl = '') {
  const currentWorkflowUrls = breadCrumb.get('data')
    .filter(breadcrumbInfo => breadcrumbInfo.get('url'))
    .map(breadcrumbInfo => breadcrumbInfo.get('url'));
  const lowercaseNewUrl = decodeURIComponent(newUrl).toLowerCase();

  if (currentWorkflowUrls.some(url => lowercaseNewUrl.indexOf(url.toLowerCase()) > -1)) {
    return false;
  }

  return true;
}

function redirectOutsideWorkflow(breadCrumb, isSilientOutsideWorkflow = false) {
  if ((isSilientOutsideWorkflow || promptUser()) && cleanOnLeaving(breadCrumb)) {
    window.isCleanedBoforeUnloadPage = true;
    return true;
  }

  return false;
}

function checkPromptUser(breadCrumbArr, newUrl) {
  return breadCrumbArr.find((breadCrumbItem) => {
    const url = (breadCrumbItem.get('url') || '').toLowerCase();
    return url && newUrl.indexOf(url) > -1 && breadCrumbItem.get('promptMessage');
  });
}

function checkAction(breadCrumbArr, newUrl) {
  return breadCrumbArr.find((breadCrumbItem) => {
    const url = (breadCrumbItem.get('url') || '').toLowerCase();
    return url && newUrl.indexOf(url) > -1 && breadCrumbItem.get('action');
  });
}

function redirectInsideWorkflow(breadCrumb, isSilientInsideWorkflow = true, newUrl = '') {
  const data = breadCrumb.get('data');
  const lowerCaseNewUrl = newUrl.toLowerCase();
  const isPrompt = checkPromptUser(data, lowerCaseNewUrl);
  const isHasAction = checkAction(data, lowerCaseNewUrl);
  const promptMessage = (isPrompt && isPrompt.get('promptMessage')) || undefined;

  if ((!isSilientInsideWorkflow || isPrompt) && !promptUser(promptMessage)) {
    return false;
  }

  if (isHasAction && cleanOnLeaving(isHasAction.get('action').get('parameter'))) {
    window.isPageRedirectInCurrentWorkflow = true;
    return true;
  }

  if (!isHasAction) {
    window.isPageRedirectInCurrentWorkflow = true;
    return true;
  }

  return false;
}

/**
 * @description render breadcrumb by
 * using the functions in ActiveNet/activenet-servlet/web/sdi_lib.js
 * @param {String} tabLabel
 * @param {Array} data
 *
 * Functions located in ActiveNet/activenet-servlet/web/sdi_lib.js :
 *   setTabLabel
 *   addRootBreadCrumbForFacilityRedesign
 *   addStaticBreadcrumb
 *   setFunctionPageBreadcrumb
 */
export function renderBreadCrumbs(tabLabel, receiptID, data) {
  setTabAttr('rno', receiptID);
  setTabLabel(tabLabel);
  data.forEach((breadInfo) => {
    if (breadInfo.isRoot) {
      return addRootBreadCrumbForFacilityRedesign(breadInfo.type, breadInfo.name, breadInfo.url);
    }

    if (!breadInfo.url) {
      return addStaticBreadcrumb(breadInfo.type, breadInfo.name);
    }

    return setFunctionPageBreadcrumb(breadInfo.functionMenu, breadInfo.name, breadInfo.url);
  });
}

/* eslint-disable consistent-return */
export function promptUserOnBeforeUnloadPage() {
  if (
    !window.isPageRedirectInCurrentWorkflow &&
    !window.isCleanedBoforeUnloadPage
  ) {
    return messages.leavePagePrompt;
  }
}
/* eslint-enable consistent-return */

export function cleanOnUnloadPage(breadCrumb) {
  if (
    !window.isPageRedirectInCurrentWorkflow &&
    !window.isCleanedBoforeUnloadPage
  ) {
    cleanOnLeaving(breadCrumb);
  }
}

export function promptOnLeavePage(
  newUrl,
  {
    promptsWhenHasUnfinishedTasks,
    breadCrumb,
    isSilientOutsideWorkflow,
    isSilientInsideWorkflow
  }) {
  const isHasUnfinishedWork = checkUnfinishedWork(promptsWhenHasUnfinishedTasks);
  if (isHasUnfinishedWork) {
    return false;
  }

  /**
   * click other links except the breadcrumb and the url in current page.
   * such as navigator in the left.
   */
  const isLeavingCurrentWorkflow = checkLeavingCurrentWorkflow(breadCrumb, newUrl);
  if (isLeavingCurrentWorkflow) {
    return redirectOutsideWorkflow(breadCrumb, isSilientOutsideWorkflow);
  }

  return redirectInsideWorkflow(breadCrumb, isSilientInsideWorkflow, newUrl);
}

export function resetWorkWhenLeavePage() {
  window.shouldPromptWhenLeavePage = undefined;
  window.isCleanedBoforeUnloadPage = undefined;
  window.isPageRedirectInCurrentWorkflow = undefined;
  window.onbeforeunload = undefined;
  window.onunload = undefined;
  window.promptWhenLeavePage = undefined;
}
