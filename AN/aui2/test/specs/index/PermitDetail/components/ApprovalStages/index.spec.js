import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import Collapse from 'react-base-ui/lib/components/Collapse';
import ApprovalStages from 'index/PermitDetail/components/ApprovalStages';
import StageSequenceItem from 'index/PermitDetail/components/ApprovalStages/StageSequenceItem';

const props = {
  updateStageSequenceAsyncAction: jest.fn(),
  initialData: {
    batchID: '1111111',
    receiptID: '2222222',
    receiptEntryID: '3333333'
  },
  stageSequencesList: fromJS([])
};

const stageList = [{
  stageSequenceID: 22,
  checked: false,
  stageSequenceName: 'Allen_Test_Sequence11',
  associations: ['RL - EventType 02', '*1lillian_facility*', '*lillian_facility(Parent)']
}, {
  stageSequenceID: 46,
  checked: true,
  stageSequenceName: 'RL - 1',
  associations: ['RL - EventType 01', '*lillian_facility(Parent)']
}];

const setup = props => mount(<ApprovalStages {...props} />);
describe('index/PermitDetail/components/ApprovalStages', () => {
  it('ApprovalStages should render without errors', () => {
    const component = setup(props);
    expect(component.find(Collapse)).toHaveLength(0);
  });

  it('ApprovalStages should render without errors', () => {
    const nextProps = { ...props, stageSequencesList: fromJS(stageList) };
    const component = setup(nextProps);
    expect(component.find(Collapse)).toHaveLength(1);
    expect(component.find('.approval-stages__item')).toHaveLength(2);
    expect(component.find('.association-item__divider')).toHaveLength(3);

    component.find(StageSequenceItem).at(0).node.props.onStageSequenceChange({ target: { checked: true } });
    expect(props.updateStageSequenceAsyncAction).toHaveBeenCalled();
  });
});

