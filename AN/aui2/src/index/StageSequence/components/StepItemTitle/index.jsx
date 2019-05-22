import React from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import Tooltip from 'react-base-ui/lib/components/Tooltip';
import { Dock } from 'react-base-ui/lib/consts';
import { SafeText } from 'react-base-ui/lib/components/SafeText';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import PopupWindowWithMenu from 'shared/utils/openTheExistingPage';
import StepItemForm from '../StepItemForm';
import URL from '../../urls';
import { stageStatus, stepItemStatus } from '../../consts/stageStatus';
import permitStatusEnum from '../../consts/permitStatusEnum';

export default class StepItemLine extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showComment: false
    };

    this.uniqueId = uniqueId('form_');
  }

  componentDidMount() {
    const tooltipOption = {
      content: 'Failed to send the approval request to this user account.',
      dockStyle: Dock.TOP_LEFT,
      distance: '0',
      showShadow: false,
      selector: '[data-tooltip]',
      trigger: 'hover',
      theme: 'light',
      effect: 'none',
      className: 'no-email-tooltip'
    };

    Tooltip.option(tooltipOption);
    Tooltip.build(tooltipOption.selector);
  }

  componentWillUnmount() {
    Tooltip.clean();
  }

  onCustomerChange = () => {
    const { item: { trasactionStageID }, stageSequenceID } = this.props;
    const url = `${URL.searchCustomer}&control=change_user_${this.uniqueId}.quick_res_reference&callback=__searchUserList()`;

    window.__searchUserList = () => {
      const approvalUserID = this.quickResReferenceId.value;
      const approvalUserName = this.quickResReference.value;
      if (approvalUserID && this.isShowChangeLink()) {
        this.props.changeStageUser({
          approvalUserID,
          approvalUserName,
          trasactionStageID,
          stageSequenceID
        });
      }
    };
    PopupWindowWithMenu(url, 'System User List', '600', '600', 'yes');
  }

  handleClick = () => {
    this.setState({ showComment: !this.state.showComment });
  }

  isAbleResetStage() {
    const { permitStatus, item: { status } } = this.props;
    const { tentative, approved, stageDenied } = permitStatusEnum;

    const isResetStatus = status === stageStatus.APPROVED || status === stageStatus.DENIED;

    return isResetStatus &&
      (permitStatus === tentative ||
      permitStatus === approved ||
      permitStatus === stageDenied);
  }

  isShowStepItemForm() {
    const { item: { status, approvalUserID }, systemUserID,
      isApproveAllStages, isAddStatus, isChangeStageCustomer } = this.props;

    const userHasPermission = isApproveAllStages || systemUserID === approvalUserID;

    const isAbleApproaeOrDeny = status === stageStatus.PROGRESS_NO_EMAIL ||
      status === stageStatus.PROGRESS;

    return !isChangeStageCustomer && userHasPermission &&
      !isAddStatus && (isAbleApproaeOrDeny || this.isAbleResetStage());
  }

  isShowCommentButton() {
    const { item: { status, comments } } = this.props;

    return comments &&
      !this.isShowStepItemForm() &&
      status !== stageStatus.NOT_STARTED;
  }

  isShowStageItemStatusIcon() {
    const { isNotSingleStage, item: { status } } = this.props;

    return isNotSingleStage && status !== stageStatus.NOT_STARTED;
  }


  isShowChangeLink() {
    const { item: { status, approvalUserID },
      changeStageSequencePermission, systemUserID } = this.props;

    return (changeStageSequencePermission || systemUserID === approvalUserID) && (
      status === stageStatus.PROGRESS ||
      status === stageStatus.PROGRESS_NO_EMAIL ||
      status === stageStatus.NOT_STARTED);
  }

  renderStepItemComponent() {
    const { item: { comments } } = this.props;
    const { showComment } = this.state;

    return showComment && (
      <SafeText
        className="stage-item__comment"
        tagName="div"
        dangerMode
        text={comments}
      />
    );
  }

  renderShowCommentButton() {
    const { showComment } = this.state;
    return this.isShowCommentButton() && (
      <div
        className={classNames('afx-col afx-xl-1-12 commment-button', {
          'is-extend': showComment
        })}
      >
        <i className="icon icon-sms" onClick={this.handleClick} />
      </div>
    );
  }

  renderApprovalUserNameNode() {
    const { item } = this.props;
    const { status, approvalUserName } = item;
    const cls = classNames('stage-owner-name', {
      'process-stage-owner': status === stageStatus.PROGRESS ||
        status === stageStatus.PROGRESS_NO_EMAIL
    });

    return (
      approvalUserName ?
        <SafeText className={cls} title={decodeHtmlStr(approvalUserName)} text={approvalUserName} />
      :
        <span className="no-stage-owner">No stage owner</span>
    );
  }

  renderChangeCustomNode() {
    return (
      this.isShowChangeLink() &&
        <span className="change-custom">
          <i className="icon icon-exchange" />
          <span onClick={this.onCustomerChange}>Change Authorizer</span>
        </span>
    );
  }

  renderIconStageStatusNode() {
    const { item: { status }, nowStepItemStatus } = this.props;
    return (
      this.isShowStageItemStatusIcon() &&
      <i
        className={classNames('icon icon-stage-status', {
          'icon-check-thin': status === stageStatus.APPROVED,
          'icon-close': status === stageStatus.DENIED,
          'icon-question': nowStepItemStatus === stepItemStatus.PROCESS && status === stageStatus.PROGRESS
        })}
      />
    );
  }

  render() {
    const { item, transactionStageseAsyncAction, stageSequenceID } = this.props;
    const { status } = item;
    return (
      <div className="stage-item">
        <div className="aaui-flex afx-xl-mg-12 stage-item__content">
          <div className="afx-col afx-xl-6-12">
            <SafeText
              className="stage-item__name"
              text={item.stageName}
            />
          </div>

          <span className="afx-col afx-xl-5-12 stage-owner-container">
            <i
              data-tooltip
              className={classNames('icon icon-exclamation-triangle icon-email-wring', {
                'is-hidden': status !== stageStatus.PROGRESS_NO_EMAIL
              })}
            />
            {this.renderIconStageStatusNode()}
            {this.renderApprovalUserNameNode()}
            {this.renderChangeCustomNode()}
            <form className="change-user-form" action="#" name={`change_user_${this.uniqueId}`}>
              <input type="hidden" name="quick_res_reference_id" ref={(el) => { this.quickResReferenceId = el; }} />
              <input type="text" name="quick_res_reference" ref={(el) => { this.quickResReference = el; }} />
            </form>
          </span>
          {this.renderShowCommentButton()}
        </div>
        {this.renderStepItemComponent()}
        {
          this.isShowStepItemForm() &&
          <StepItemForm
            stageItem={item}
            stageSequenceID={stageSequenceID}
            transactionStageseAsyncAction={transactionStageseAsyncAction}
          />
        }

      </div>
    );
  }
}
