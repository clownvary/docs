import PropTypes from 'prop-types';
import React from 'react';
import UIComponent from '../UIComponent';
import {
  renderBreadCrumbs,
  cleanOnLeaving,
  promptUserOnBeforeUnloadPage,
  cleanOnUnloadPage,
  promptOnLeavePage,
  resetWorkWhenLeavePage
} from './breadCrumbHelper';

window.cleanOnLeaving = cleanOnLeaving;

export default class BreadCrumb extends UIComponent {
  static propTypes = {
    tabLabel: PropTypes.string,
    breadCrumb: PropTypes.object,  // eslint-disable-line
    isPromptUser: PropTypes.bool.isRequired,
    promptsWhenHasUnfinishedTasks: PropTypes.array, // eslint-disable-line
    isSilientOutsideWorkflow: PropTypes.bool,
    isSilientInsideWorkflow: PropTypes.bool,
    isCleanedBoforeUnloadPage: PropTypes.bool
  }

  static defaultProps = {
    isPromptUser: true,
    isSilientOutsideWorkflow: false,
    isSilientInsideWorkflow: true,
    isCleanedBoforeUnloadPage: false
  }

  render() {
    return <div />;
  }

  /* eslint-disable consistent-return */
  componentDidMount() {
    const { isPromptUser } = this.props;

    this.renderBreadCrumbs();

    if (!isPromptUser) {
      return false;
    }

    this.createWorkWhenLeavePage();
  }

  componentDidUpdate({
    breadCrumb: prevBreadCrumb,
    tabLabel: prevTabLabel,
    isSilientOutsideWorkflow: previsSilientOutsideWorkflow,
    isSilientInsideWorkflow: previsSilientInsideWorkflow
  }) {
    const {
      isPromptUser,
      breadCrumb,
      tabLabel,
      isSilientOutsideWorkflow,
      isSilientInsideWorkflow
    } = this.props;
    if ((prevTabLabel !== tabLabel) || (breadCrumb !== prevBreadCrumb)) {
      this.renderBreadCrumbs();
    }

    if (!isPromptUser) {
      return resetWorkWhenLeavePage();
    }

    if (
      breadCrumb !== prevBreadCrumb ||
      isSilientOutsideWorkflow !== previsSilientOutsideWorkflow ||
      isSilientInsideWorkflow !== previsSilientInsideWorkflow
    ) {
      this.createWorkWhenLeavePage();
    }
  }

  renderBreadCrumbs() {
    const {
      breadCrumb,
      tabLabel
    } = this.props;
    const receiptID = breadCrumb.get('receiptID');
    const labelForTab = tabLabel || `Receipt #${receiptID}`;

    renderBreadCrumbs(labelForTab, receiptID, breadCrumb.get('data').toJS());
  }

  createWorkWhenLeavePage() {
    const {
      breadCrumb,
      promptsWhenHasUnfinishedTasks,
      isSilientInsideWorkflow,
      isSilientOutsideWorkflow,
      isCleanedBoforeUnloadPage
    } = this.props;

    /**
     * The shouldPromptWhenLeavePage function here is to
     * let sid_lib.js know that when click the links(include breadcrumbs)
     * which out of facility redesign
     * should prompt user and do some clean work such as cancel receipt.
     */
    window.shouldPromptWhenLeavePage = () => true;

    /**
     * Flag: indicate that the clean work has been done
     * when redirect to the page which out of current workflow.
     * Specially referring to links other than breadcrumbs
     */
    window.isCleanedBoforeUnloadPage = isCleanedBoforeUnloadPage;

    // Flag: indicate the redirect within pages in current workflow
    window.isPageRedirectInCurrentWorkflow = false;

    /**
     * execution sequence: promptWhenLeavePage -> onbeforeunload -> onunload
     * If things such as prompt user and cancel receipt has been done in promptWhenLeavePage
     * then nothing need been done again in onunload and unload.
     */
    window.onbeforeunload = promptUserOnBeforeUnloadPage;
    window.onunload = () => cleanOnUnloadPage(breadCrumb);

    /**
      * The window.promptWhenLeavePage is called by sdi_lib.js and triggered in two conditions:
      * 1. By the click action of tab, breadcrumb and navigator link.
      * 2. Execute it explicitly in the business.
      */
    window.promptWhenLeavePage = (oFrame, newUrl) => promptOnLeavePage(
      newUrl,
      {
        breadCrumb,
        promptsWhenHasUnfinishedTasks,
        isSilientInsideWorkflow,
        isSilientOutsideWorkflow
      }
    );
  }
}
