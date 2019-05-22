import React from 'react';
import classNames from 'classnames';
import TextArea from 'react-base-ui/lib/components/TextArea';
import Button from 'react-base-ui/lib/components/Button';
import stageAction from '../../consts/stageAction';
import { stageStatus } from '../../consts/stageStatus';

export default class StepItemForm extends React.PureComponent {
  constructor(props) {
    super(props);

    const { comments } = props.stageItem;
    this.state = {
      statusText: comments,
      showFormError: false
    };
    this.statusText = comments;
  }

  componentWillReceiveProps({ stageItem }) {
    const { statusText } = this.state;
    if (stageItem.comments !== this.props.stageItem.comments || stageItem.comments !== statusText) {
      this.setState({ statusText: stageItem.comments });
      this.statusText = stageItem.comments;
      if (this.state.showFormError) {
        this.setState({ showFormError: false });
      }
    }
  }

  handleTextAreaChange = (e) => {
    const value = e.target.value;
    this.setState({ statusText: value, showFormError: false });
    this.statusText = value; // fix: IE bug
  }

  submitTransactionStagese(params) {
    const { stageItem, transactionStageseAsyncAction, stageSequenceID } = this.props;
    const { statusText } = this.state;

    transactionStageseAsyncAction({
      ...params,
      statusText,
      stageSequenceID,
      transactionStageID: stageItem.trasactionStageID
    });
  }

  handleSubmitDeny = () => {
    if (!this.statusText.trim()) {
      this.setState({ showFormError: true });
      return;
    }

    this.submitTransactionStagese({
      stageAction: stageAction.DENY
    });
  }

  handleSubmitApprove = () => {
    this.setState({ showFormError: false });

    this.submitTransactionStagese({
      stageAction: stageAction.APPROVE
    });
  }

  handleSubmitReset = () => {
    this.submitTransactionStagese({
      stageAction: stageAction.RESET
    });
  }

  isShowRestButton() {
    const { stageItem: { status } } = this.props;

    return status === stageStatus.APPROVED || status === stageStatus.DENIED;
  }

  isShowApproveAndDenyButton() {
    const { stageItem: { status } } = this.props;

    return status === stageStatus.PROGRESS_NO_EMAIL || status === stageStatus.PROGRESS;
  }

  render() {
    const { showFormError, statusText } = this.state;

    const textAreaCls = classNames('input stage-comment-textarea', {
      'stage-comment-textarea--error': showFormError
    });

    return (
      <div className="step-item-form">
        <TextArea
          className={textAreaCls}
          value={statusText}
          onChange={this.handleTextAreaChange}
          rows="4"
          maxLength={300}
          placeholder="Leave a comment…"
        />
        <div className="step-item-button-group">
          {
            showFormError &&
            <span className="step-item-form__error">Please enter a reason for denying the request</span>
          }
          {
            this.isShowApproveAndDenyButton() &&
            <div>
              <Button onClick={this.handleSubmitDeny}>Deny</Button>
              <Button
                type="primary"
                onClick={this.handleSubmitApprove}
              >
                Approve
              </Button>
            </div>
          }
          {
            this.isShowRestButton() &&
            <Button
              type="primary"
              onClick={this.handleSubmitReset}
            >
            Reset
          </Button>
          }
        </div>
      </div>
    );
  }
}
