import React from 'react';
import { fromJS } from 'immutable';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import Collapse from 'react-base-ui/lib/components/Collapse';
import StageSequence from 'index/StageSequence';
import NoStage from 'index/StageSequence/components/NoStage';
import AddButton from 'index/StageSequence/components/AddButton';
import CollapseHeader from 'index/StageSequence/components/CollapseHeader';
import StepItemTitle from 'index/StageSequence/components/StepItemTitle';

const initialData = {
  permitLabel: 'permitXXX'
};


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
      status: 0,
      trasactionStageID: 3652,
      comments: '',
      approvalUserName: 'Grace Admin13',
      transactionID: 54482,
      stageID: 54
    }]
  }]
}];

const addableStageSequences = [{
  stageSequenceID: 22,
  checked: false,
  stageSequenceName: 'Allen_Test_Sequence',
  stageLinks: [],
  associations: ['CD_FootBall_Room#1']
}, {
  stageSequenceID: 26,
  checked: false,
  stageSequenceName: 'Allen_Test_Sequence#2',
  stageLinks: [],
  associations: ['CD_General', 'CD_FootBall_Room#1']
}];

const collapseExtendEnum = fromJS({
  4: true,
  5: false
});

const dataTwo = {
  header: {
    status: 'wait',
    stageSequenceName: 'cd_sequence_#123',
    associations: ['edmund test bug'],
    stageSequenceID: 4,
    hasProcessAndPermission: false
  },
  content: [{
    status: 'wait',
    stage: [{
      approvalUserID: 2029,
      stageName: 'cd_stage_#12',
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
      approvalUserID: 1923,
      stageName: 'cd_stage_#23',
      status: 0,
      trasactionStageID: 3652,
      comments: '',
      approvalUserName: 'Grace Admin13',
      transactionID: 54482,
      stageID: 54
    }]
  }]
};

const defaultProps = {
  error: fromJS({ list: [], systemErrors: [], businessErrors: [] }),
  initialData: fromJS(initialData),
  stageSequence: fromJS({
    stageListData,
    addableStageSequences: [],
    collapseExtendEnum
  }),
  redirect: jest.fn()
};

jest.mock('shared/authorities', () => ({
  Authority: {
    isEnabled: () => true
  }
}));

jest.mock('react-base-ui/lib/services/dialog', () => ({
  confirm: () => new Promise((resolve) => {
    resolve();
  })
}));


jest.mock('index/StageSequence/actions', () => ({
  fetchStageSequence: jest.fn(() => new Promise((resolve) => {
    resolve();
  })),
  transactionStageseAsyncAction: jest.fn(),
  fetchCountStageSequenceAsyncAction: jest.fn(),
  updateStageSequenceAsyncAction: jest.fn(),
  deleteStageSequenceAsyncAction: jest.fn(),
  stageSequencesChangeAction: jest.fn(),
  isChangeUserAction: jest.fn(),
  formatStageListAction: jest.fn(),
  loadAddAbleStageSequences: jest.fn(() => new Promise((resolve) => {
    resolve();
  })),
  resetLoadAddStageSequencesAction: jest.fn(),
  updateOneCollapseStatus: jest.fn(),
  updateCollapseExtendEnum: jest.fn(),
  saveStageSequenceChangeAsyncAction: jest.fn(() => new Promise((resolve) => {
    resolve();
  }))
}));

describe('index/StageSequence/index', () => {
  let store = null;
  function setup(props = defaultProps) {
    const mockStore = configureStore(middlewares);
    store = mockStore(Object.assign({}, props));
    const component = mount(
      <StageSequence
        {...props}
      />,
      { context: { store } }
    );
    return component;
  }

  test('component stageListData length > 1 should works fine', () => {
    stageListData[1] = dataTwo;
    const nextProps = {
      ...defaultProps,
      stageSequence: fromJS({
        stageListData: fromJS(stageListData),
        addableStageSequences: fromJS([]),
        collapseExtendEnum
      })
    };
    const component = setup(nextProps);
    expect(component.find('.is-expanded')).toHaveLength(1);

    component.find(Collapse).node.props.onChange();
  });

  test('component and initialization works fine', () => {
    const component = setup();
    expect(component.find('.an-page__header')).toHaveLength(1);
    expect(component.find('.is-expanded')).toHaveLength(0);

    expect(Collapse).toHaveLength(1);
    component.find(StepItemTitle).node.props.transactionStageseAsyncAction();
  });

  test('component back should works fine', () => {
    const component = setup();
    component.find('.an-page__footer button').simulate('click');
    expect(defaultProps.redirect).toHaveBeenCalled;
  });

  test('component stageListData and addableStageSequences is [] should works fine', () => {
    const nextProps = {
      ...defaultProps,
      stageSequence: fromJS({
        stageListData: [],
        addableStageSequences: []
      })
    };
    const component = setup(nextProps);
    expect(component.find(NoStage)).toHaveLength(1);
  });

  test('component Confirm Changes should works fine', () => {
    const nextProps = {
      ...defaultProps,
      stageSequence: fromJS({
        stageListData,
        addableStageSequences,
        isStageSequencesChange: true,
        collapseExtendEnum
      })
    };
    const component = setup(nextProps);
    component.find(AddButton).node.props.loadAddAbleStageSequences();
    const footerButton = component.find('.an-page__footer button');
    footerButton.at(1).simulate('click');
    component.find(CollapseHeader).node.props.deleteStageSequence();
    footerButton.at(0).simulate('click');
  });
});
