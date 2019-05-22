import { fromJS } from 'immutable';
import formatStageList from 'index/StageSequence/utils/formatStageList';

const data = [{
  stageSequenceID: 3,
  checked: true,
  stageSequenceName: 'cd_sequence_#1',
  associations: 'edmund test bug',
  stageLinks: [{
    headStage: {
      nextStages: [{
        nextStages: [{
          nextStages: [],
          approvalUserID: 0,
          stageName: 'END',
          status: 0,
          trasactionStageID: 3649,
          comments: '',
          approvalUserName: '',
          transactionID: 54478,
          stageID: 2
        }],
        approvalUserID: 192,
        stageName: 'cd_stage_#2',
        status: 4,
        trasactionStageID: 3648,
        comments: '',
        approvalUserName: 'Grace Admin13',
        transactionID: 54478,
        stageID: 54
      }],
      approvalUserID: 209,
      stageName: 'cd_stage_#1',
      status: 2,
      trasactionStageID: 3647,
      comments: '',
      approvalUserName: 'Grace Admin18 16.10',
      transactionID: 54478,
      stageID: 53
    }
  },
  {
    headStage: {
      approvalUserID: 209,
      stageName: 'END',
      status: 1,
      trasactionStageID: 3647,
      comments: '',
      approvalUserName: 'Grace Admin18 16.10',
      transactionID: 54478,
      stageID: 53
    }
  },
  {
    headStage: {
      nextStages: [{
        approvalUserID: 192,
        stageName: 'cd_stage_#2',
        status: 0,
        trasactionStageID: 3648,
        comments: '',
        approvalUserName: 'Grace Admin13',
        transactionID: 54478,
        stageID: 54
      }],
      approvalUserID: 209,
      stageName: 'sdfsad#12323',
      status: 1,
      trasactionStageID: 3647,
      comments: '',
      approvalUserName: 'Grace Admin18 16.10',
      transactionID: 54478,
      stageID: 53
    }
  }
  ]
}
];

it('method formatStageList works fine', () => {
  formatStageList(fromJS([{
    stageSequenceID: 3,
    checked: true,
    stageSequenceName: 'cd_sequence_#1',
    associations: 'edmund test bug',
    stageLinks: [{}]
  }]));

  expect(formatStageList(fromJS([{
    stageSequenceID: 3,
    checked: true,
    stageSequenceName: 'cd_sequence_#1',
    associations: 'edmund test bug',
    stageLinks: [{}]
  }]), 209)).toEqual([{ content: [], header: { hasProcessAndPermission: false, associations: 'edmund test bug', stageSequenceID: 3, stageSequenceName: 'cd_sequence_#1', status: 'finish' } }]);
  expect(formatStageList(fromJS(data), 209)).toEqual([{
    content: [{
      stage: [{
        approvalUserID: 209,
        approvalUserName: 'Grace Admin18 16.10',
        comments: '',
        stageID: 53,
        stageName: 'cd_stage_#1',
        status: 2,
        transactionID: 54478,
        trasactionStageID: 3647
      }, {
        approvalUserID: 209,
        approvalUserName: 'Grace Admin18 16.10',
        comments: '',
        stageID: 53,
        stageName: 'sdfsad#12323',
        status: 1,
        transactionID: 54478,
        trasactionStageID: 3647
      }],
      status: 'wait'
    }, {
      stage: [{
        approvalUserID: 192,
        approvalUserName: 'Grace Admin13',
        comments: '',
        stageID: 54,
        stageName: 'cd_stage_#2',
        status: 4,
        transactionID: 54478,
        trasactionStageID: 3648
      }, {
        approvalUserID: 192,
        approvalUserName: 'Grace Admin13',
        comments: '',
        stageID: 54,
        stageName: 'cd_stage_#2',
        status: 0,
        transactionID: 54478,
        trasactionStageID: 3648
      }],
      status: 'wait'
    }],
    header: {
      associations: 'edmund test bug',
      hasProcessAndPermission: true,
      stageSequenceID: 3,
      stageSequenceName: 'cd_sequence_#1',
      status: 'error'
    }
  }]);
});

