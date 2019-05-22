import { fromJS } from 'immutable';
import updateStageUser from 'index/StageSequence/utils/updateStageUser';

const stageListData = [{
  header: {
    status: 'wait',
    stageSequenceName: 'cd_sequence_#1',
    associations: ['edmund test bug'],
    stageSequenceID: 5,
    hasProcessAndPermission: false
  },
  content: [{
    status: 'wait',
    stage: [{
      approvalUserID: 209,
      stageName: 'cd_stage_#1',
      status: 1,
      trasactionStageID: 3600,
      comments: '',
      approvalUserName: 'Grace Admin18 16.10',
      transactionID: 54482,
      stageID: 53
    }]
  }, {
    status: 'wait',
    stage: [{
      approvalUserID: 192,
      stageName: 'cd_stage_#2',
      status: 1,
      trasactionStageID: 3600,
      comments: '',
      approvalUserName: 'Grace Admin13',
      transactionID: 54482,
      stageID: 54
    }]
  }]
},
{
  header: {
    status: 'wait',
    stageSequenceName: 'cd_sequence_#1',
    associations: ['edmund test bug'],
    stageSequenceID: 6,
    hasProcessAndPermission: false
  },
  content: [{
    status: 'wait',
    stage: [{
      approvalUserID: 201,
      stageName: 'cd_stage_#1',
      status: 1,
      trasactionStageID: 3651,
      comments: '',
      approvalUserName: 'Grace Admin18 16.10',
      transactionID: 54482,
      stageID: 53
    }]
  }, {
    status: 'wait',
    stage: [{
      approvalUserID: 192,
      stageName: 'cd_stage_#2',
      status: 1,
      trasactionStageID: 3652,
      comments: '',
      approvalUserName: 'Grace Admin13',
      transactionID: 54482,
      stageID: 54
    }]
  }]
}];

const resultData = [{
  header: {
    status: 'wait',
    stageSequenceName: 'cd_sequence_#1',
    associations: ['edmund test bug'],
    stageSequenceID: 5,
    hasProcessAndPermission: false
  },
  content: [{
    status: 'wait',
    stage: [{
      approvalUserID: 192,
      stageName: 'cd_stage_#1',
      status: 1,
      trasactionStageID: 3600,
      comments: '',
      approvalUserName: 'test',
      transactionID: 54482,
      stageID: 53
    }]
  }, {
    status: 'wait',
    stage: [{
      approvalUserID: 192,
      stageName: 'cd_stage_#2',
      status: 1,
      trasactionStageID: 3600,
      comments: '',
      approvalUserName: 'test',
      transactionID: 54482,
      stageID: 54
    }]
  }]
},
{
  header: {
    status: 'wait',
    stageSequenceName: 'cd_sequence_#1',
    associations: ['edmund test bug'],
    stageSequenceID: 6,
    hasProcessAndPermission: false
  },
  content: [{
    status: 'wait',
    stage: [{
      approvalUserID: 201,
      stageName: 'cd_stage_#1',
      status: 1,
      trasactionStageID: 3651,
      comments: '',
      approvalUserName: 'Grace Admin18 16.10',
      transactionID: 54482,
      stageID: 53
    }]
  }, {
    status: 'wait',
    stage: [{
      approvalUserID: 192,
      stageName: 'cd_stage_#2',
      status: 1,
      trasactionStageID: 3652,
      comments: '',
      approvalUserName: 'Grace Admin13',
      transactionID: 54482,
      stageID: 54
    }]
  }]
}];

const userInfo = {
  approvalUserID: 192,
  approvalUserName: 'test',
  trasactionStageID: 3600,
  stageSequenceID: 5
};

it('method updateStageUser works fine', () => {
  expect(updateStageUser(fromJS(stageListData), userInfo).toJS()).toEqual(resultData);
});
