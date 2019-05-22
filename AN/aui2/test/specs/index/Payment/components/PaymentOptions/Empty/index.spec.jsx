import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Empty from 'index/Payment/components/PaymentOptions/Empty';
import InputNumeric from 'react-base-ui/lib/components/InputNumeric';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import resetActions from 'utils/resetActions';

describe('index/Payment/components/PaymentOptions/Empty', () => {
  const actions = {
    onChange: jest.fn()
  };

  const setup = (props) => mount(<Empty {...props} />);

  it('Empty component should render without error', () => {
    const props = {
      item: {
        list: [
          { value: '172', name: 'Check' },
          { value: '173', name: 'Cash' },
        ],
        amount: 350
      },
      ...actions
    };
    const component = setup(props);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should handle onChange correctly', () => {
    const props = {
      item: {
        list: [
          { value: '172', name: 'Check' },
          { value: '173', name: 'Cash' },
        ],
        amount: 350
      },
      ...actions
    };
    const component = setup(props);
    const dropdown = component.find(Dropdown);
    dropdown.node.props.onChange({});
    expect(actions.onChange).toHaveBeenCalledTimes(1);
  })
});
