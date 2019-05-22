import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import Checkbox from 'react-base-ui/lib/components/Checkbox';
import StageSequenceItem from 'index/PermitDetail/components/ApprovalStages/StageSequenceItem';
import AssociationItem from 'index/PermitDetail/components/ApprovalStages/AssociationItem';

const item = {
  stageSequenceID: 22,
  checked: false,
  stageSequenceName: 'Allen_Test_Sequence11',
  associations: ['RL - EventType 02', '*1lillian_facility*', '*lillian_facility(Parent)']
};

const props = {
  onStageSequenceChange: jest.fn(),
  item: fromJS(item)
};

const setup = props => mount(<StageSequenceItem {...props} />);
describe('index/PermitDetail/components/ApprovalStages/StageSequenceItem', () => {
  it('StageSequenceItem should render without errors', () => {
    const component = setup(props);
    expect(component.find(Checkbox)).toHaveLength(1);
    expect(component.find(AssociationItem)).toHaveLength(3);

    component.find(Checkbox).at(0).node.props.onChange({ target: { checked: true } });
    expect(props.onStageSequenceChange).toHaveBeenCalled();
  });
});

