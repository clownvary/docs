import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import Checkbox from 'react-base-ui/lib/components/Checkbox';
import AssociationItem from 'index/PermitDetail/components/ApprovalStages/AssociationItem';

const props = {
  isShowDivider: false,
  value: 'RL - EventType 02'
};

const setup = props => mount(<AssociationItem {...props} />);
describe('index/PermitDetail/components/ApprovalStages/AssociationItem', () => {
  it('AssociationItem should render without errors', () => {
    const component = setup(props);
    expect(component.find('.association-item')).toHaveLength(1);
    expect(component.find('.association-item__divider')).toHaveLength(0);
  });

  it('AssociationItem isShowDivider is true should render without errors', () => {
    const nextProps =  {
      isShowDivider: true,
      value: 'RL - EventType 02'
    };
    const component = setup(nextProps);
    expect(component.find('.association-item__divider')).toHaveLength(1);
  });
});

