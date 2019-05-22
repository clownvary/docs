import React from 'react';
import { connect } from 'react-redux';
import Collapse from 'react-base-ui/lib/components/Collapse';
import Steps from 'react-base-ui/lib/components/Steps';
import { count } from 'react-base-ui/lib/utils/dataAccess';
import Button from 'react-base-ui/lib/components/Button';
import { confirm } from 'react-base-ui/lib/services/dialog';
import UIComponent from 'shared/components/UIComponent';
import BreadCrumb from 'shared/components/BreadCrumb';
import { redirect } from 'shared/actions/route';
import { pages } from 'shared/consts';
import Error from 'shared/components/Error';
import { Authority } from 'shared/authorities';
import getStageItemStatus from './utils/getStageItemStatus';
import AddButton from './components/AddButton';
import NoStage from './components/NoStage';
import CollapseHeader from './components/CollapseHeader';
import StepItemTitle from './components/StepItemTitle';
import AddStageItem from './components/AddStageItem';
import permitStatusEnum from './consts/permitStatusEnum';

import {
  fetchStageSequence,
  transactionStageseAsyncAction,
  updateStageSequenceAsyncAction,
  deleteStageSequenceAsyncAction,
  saveStageSequenceChangeAsyncAction,
  loadAddAbleStageSequences,
  stageSequencesChangeAction,
  resetLoadAddStageSequencesAction,
  fetchCountStageSequenceAsyncAction,
  updateCollapseExtendEnum,
  updateOneCollapseStatus,
  changeStageUser,
  isChangeUserAction
} from './actions';
import './index.less';

class StageSequence extends UIComponent {
  constructor(props) {
    super(props);

    this.state = {
      showAddButton: true
    };
  }

  componentDidMount() {
    this.props.fetchCountStageSequenceAsyncAction();
    this.props.fetchStageSequence().then(() => {
      const { initialData: { systemUserID } } = this.props;
      this.props.updateCollapseExtendEnum(systemUserID);
    });
  }

  back = () => {
    const { initialData } = this.props;

    const backUrl = pages.buildUrl(pages.reloadReservationDetailPage, {
      permit_id: initialData.permitID,
      batch_id: initialData.batchID,
      receipt_id: initialData.receiptID
    });

    this.props.redirect(backUrl);
  }

  deleteStageSequence = (stageSequenceID) => {
    const defaultOptions = {
      title: 'Delete Stage Sequence',
      showCancel: true,
      cancelText: 'No',
      confirmText: 'Yes'
    };

    confirm(
      (<div>Are you sure you want to delete this stage sequence?</div>),
        defaultOptions
      ).then(() => {
        this.props.deleteStageSequenceAsyncAction(stageSequenceID);
      });
  }

  handleCancel = () => {
    const defaultOptions = {
      title: 'Cancel Changes',
      showCancel: true,
      cancelText: 'No',
      confirmText: 'Yes'
    };
    confirm(
      (<div>If you continue, no changes will be saved. Are you sure you want to cancel it?</div>),
      defaultOptions
    ).then(() => {
      this.props.stageSequencesChangeAction(false);
      this.props.resetLoadAddStageSequencesAction();
      this.props.fetchStageSequence().then(() => {
        this.props.isChangeUserAction(false);
        this.setState({ showAddButton: true });
      });
    });
  }

  handleConfirmChange = () => {
    this.props.saveStageSequenceChangeAsyncAction().then(() => {
      this.props.stageSequencesChangeAction(false);
      this.props.resetLoadAddStageSequencesAction();
      this.props.fetchStageSequence().then(() => {
        const { initialData: { systemUserID } } = this.props;
        this.props.isChangeUserAction(false);
        this.props.updateCollapseExtendEnum(systemUserID);
        this.setState({ showAddButton: true });
      });
      this.props.fetchCountStageSequenceAsyncAction();
    });
  }

  handleCollapseChange(stageSequenceID) {
    stageSequenceID !== undefined && this.props.updateOneCollapseStatus(stageSequenceID);
  }

  loadAddAbleStageSequences = () => {
    this.props.loadAddAbleStageSequences().then(() => {
      this.setState({ showAddButton: false });
    });
  }

  isEnableAdd() {
    const { stageSequence } = this.props;
    const permitStatus = stageSequence.get('permitStatus');
    const isEnableAddOrDelete = Authority.isEnabled('addOrDeleteStageSequence');

    return isEnableAddOrDelete &&
      (permitStatus === permitStatusEnum.tentative ||
      permitStatus === permitStatusEnum.approved ||
      permitStatus === permitStatusEnum.issued);
  }

  isEnableDelete() {
    const { stageSequence } = this.props;
    const permitStatus = stageSequence.get('permitStatus');
    const isEnableAddOrDelete = Authority.isEnabled('addOrDeleteStageSequence');

    return isEnableAddOrDelete &&
      (permitStatus === permitStatusEnum.tentative ||
      permitStatus === permitStatusEnum.stageDenied);
  }

  renderAddButton(stageListData) {
    const { stageSequence } = this.props;
    const { showAddButton } = this.state;
    const hasAddableStagesequence = stageSequence.get('hasAddableStagesequence');

    return (
      showAddButton && !!count(stageListData) &&
      <AddButton
        isEnableAdd={this.isEnableAdd()}
        hasAddableStagesequence={hasAddableStagesequence}
        loadAddAbleStageSequences={this.loadAddAbleStageSequences}
      />
    );
  }

  renderAddableStageSequences() {
    const { stageSequence } = this.props;
    const addableStageSequences = stageSequence.get('addableStageSequences');

    return addableStageSequences.map((stageItem, index) => (
      <AddStageItem
        key={index}
        stageItem={stageItem}
        updateStageSequenceAsyncAction={this.props.updateStageSequenceAsyncAction}
      />
    ));
  }

  renderSteps(panelItem) {
    const { initialData, stageSequence } = this.props;
    const { showAddButton } = this.state;
    const permitStatus = stageSequence.get('permitStatus');
    const isApproveAllStages = Authority.isEnabled('approveAllStages');
    const changeStageSequencePermission = Authority.isEnabled('changeStageSequence');

    const isChangeStageCustomer = stageSequence.get('isChangeStageCustomer');

    return (
      <Steps direction="vertical">
        {
          panelItem.content.map((item, Pindex) => {
            const nowStepItemStatus = getStageItemStatus(item.stage);
            return (
              <Steps.StepItem
                key={Pindex}
                status={nowStepItemStatus}
                title={item.stage.map((stageItem, Tindex) =>
                  <StepItemTitle
                    key={Tindex}
                    item={stageItem}
                    isNotSingleStage={count(item.stage) > 1}
                    isAddStatus={!showAddButton}
                    systemUserID={initialData.systemUserID}
                    nowStepItemStatus={nowStepItemStatus}
                    stageSequenceID={panelItem.header.stageSequenceID}
                    isChangeStageCustomer={isChangeStageCustomer}
                    isApproveAllStages={isApproveAllStages}
                    permitStatus={permitStatus}
                    changeStageSequencePermission={changeStageSequencePermission}
                    transactionStageseAsyncAction={this.props.transactionStageseAsyncAction}
                    changeStageUser={this.props.changeStageUser}
                  />
                )}
              />
            );
          })
        }
      </Steps>
    );
  }

  renderStageList(stageListData) {
    const collapseExtendEnum = this.props.stageSequence.get('collapseExtendEnum');
    const StageListNode = stageListData.map((panelItem, index) => {
      const { header: { stageSequenceID } } = panelItem;
      return (
        <Collapse
          key={index}
          className="stage-collapse"
          activeKey={collapseExtendEnum.get(`${stageSequenceID}`) ? '0' : ''}
          onChange={() => this.handleCollapseChange(stageSequenceID)}
        >
          <Collapse.Panel
            Header={props =>
              <CollapseHeader
                {...props}
                data={panelItem.header}
                deleteStageSequence={this.deleteStageSequence}
                isEnableDelete={this.isEnableDelete()}
              />
            }
          >
            {this.renderSteps(panelItem)}
          </Collapse.Panel>
        </Collapse>
      );
    });
    return StageListNode;
  }

  render() {
    const { error, stageSequence, breadCrumb } = this.props;
    const stageSequenceCount = stageSequence.get('stageSequenceCount');
    const addableStageSequences = stageSequence.get('addableStageSequences');
    const hasAddableStagesequence = stageSequence.get('hasAddableStagesequence');
    const isStageSequencesChange = stageSequence.get('isStageSequencesChange');
    const stageListData = stageSequence.get('stageListData').toJS();
    const hasStageData = count(stageListData) || count(addableStageSequences);

    return (
      <div className="an-page stage-sequence-page">
        {
          /* istanbul ignore next */
          __STATIC__ ?
          undefined :
          <BreadCrumb
            isPromptUser
            breadCrumb={breadCrumb}
          />
        }
        <div className="an-page__header">
          <h1>Stage Sequence
            {
              stageSequenceCount !== '0/0' &&
              <span className="stage-sequence-count">
                {`(${stageSequenceCount})`}
              </span>
            }
          </h1>
          { this.renderAddButton(stageListData) }
        </div>

        {
          !hasStageData ?
            <NoStage
              hasAddableStagesequence={hasAddableStagesequence}
              isEnableAdd={this.isEnableAdd()}
              loadAddAbleStageSequences={this.loadAddAbleStageSequences}
            />
          :
            (<div>
              { this.renderAddableStageSequences() }
              { this.renderStageList(stageListData) }
            </div>)
        }
        <div className="an-page__footer fixed">
          <div className="an-page__footer__content">
            {
              isStageSequencesChange ?
                <Button onClick={this.handleCancel}>Cancel</Button>
                  :
                <Button onClick={this.back}>Back</Button>
            }
            {
              isStageSequencesChange &&
              <Button
                type="strong"
                onClick={this.handleConfirmChange}
              >
                Confirm Changes
              </Button>
            }
          </div>
        </div>
        <Error error={error} />
      </div>
    );
  }
}

export default connect(
  state => ({
    error: state.error,
    initialData: state.initialData,
    breadCrumb: state.breadCrumb,
    stageSequence: state.stageSequence
  }),
  {
    fetchStageSequence,
    transactionStageseAsyncAction,
    updateStageSequenceAsyncAction,
    deleteStageSequenceAsyncAction,
    saveStageSequenceChangeAsyncAction,
    loadAddAbleStageSequences,
    stageSequencesChangeAction,
    resetLoadAddStageSequencesAction,
    fetchCountStageSequenceAsyncAction,
    updateCollapseExtendEnum,
    updateOneCollapseStatus,
    changeStageUser,
    isChangeUserAction,
    redirect
  }
)(StageSequence);
