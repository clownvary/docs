import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';

import find from 'lodash/find';
import identity from 'lodash/identity';
import normalizeData from 'shared/utils/normalizeData';
import Checkbox from 'react-base-ui/lib/components/Checkbox';
import  ElectronicCheck from 'index/Payment/components/Modals/ElectronicCheck';

const setup = (props) => {
  const component = mount(<ElectronicCheck {...props} />);
  return {
    component,
    save: component.find('.btn').at(1),
    cancel: component.find('.btn').at(0)
  };
};
const echeckAccountTypeList = [
  {
    selected: true,
    account_type: 'C',
    account_type_name: 'Checking'
  },
  {
    selected: false,
    account_type: 'S',
    account_type_name: 'Savings'
  }
];
const createState = (accountNumber,routingNumber,newEcheckError) =>({
  accountNumber: accountNumber,
  routingNumber: routingNumber,
  accountTypeValue: find(echeckAccountTypeList, v => !!v.selected).account_type,
  saveInformation: true,
  showModel: true,
  accountTypeList: normalizeData(echeckAccountTypeList, {
    valueField: 'account_type',
    textField: 'account_type_name'
  }),
  newEcheckError: newEcheckError
})
const actions = {
  onSubmit: jest.fn(),
  onCancel: jest.fn(),
  changeSaveAccountInformation: jest.fn(),
  changeAccountType: jest.fn(),
  onError:jest.fn(),
  showPriorEcp:true,
  title:'test'

};

describe('index/Payment/components/Modals/ElectronicCheck', () => {
  const eventData = {
      target:{
        value:'123123123123',
        focus: identity
      }
    }
  it('render schedule items with values', () => {
     const props = {
      ...{data:createState('123123','123123','')},
      ...actions
    };

    const { component, save, cancel } = setup(props);
    const container = component.find('.new-eCheck-modal');
    expect(container).toHaveLength(1);
    expect(component.find('.form-label-col').at(0).text()).toContain('Account Number');
    expect(component.find('.form-label-col').at(1).text()).toContain('Routing Number');
    expect(component.find('.form-label-col').at(2).text()).toContain('Account Type');
    component.find('#accountNumber').at(0).simulate('input', eventData);
    component.find('#routingNumber').at(0).simulate('input', eventData);
    component.find('.echeck-type-dropdown').at(0).find('li').at(1).simulate('click');
    expect(actions.changeAccountType).toHaveBeenCalled();
    save.simulate('click');
    expect(actions.onSubmit).toHaveBeenCalled();
    cancel.simulate('click');
    expect(actions.onCancel).toHaveBeenCalled();
    component.find('.icon-close').at(0).simulate('click',eventData);
    expect(actions.onCancel).toHaveBeenCalled();
    component.setProps({
      ...actions,
      data: {
        ...createState('11111111111111111111111111111111111111111111111111','1111111111','Invalid Routing Number')
      }
    });
    component.find('#accountNumber').at(0).simulate('input', eventData);
    component.find('#routingNumber').at(0).simulate('input', eventData);
    cancel.simulate('click', eventData);
    expect(actions.onCancel).toHaveBeenCalled();
    component.setProps({
      ...actions,
      data: {
        ...createState('11111111111111111111111111111111111111111111111111','1111111111','Invalid Account Number'),
        showModel: false
      }
    });
    component.setProps({ ...actions,data:createState()});
    actions.showPriorEcp = false;
    component.setProps({ ...actions,data:createState('qweqw','qweqwe','')});
  });

  it('component should render correctly with error', () => {
    const props = {
      ...{ data: createState('', '223', 'Invalid Account Number') },
      ...actions,
      showPriorEcp: true
    };
    const { component } = setup(props);
    expect(component.find('div.form-error')).toHaveLength(1);
    component.find(Checkbox).node.props.onChange({ target: { checked: true } });
    expect(actions.changeSaveAccountInformation).toHaveBeenCalled();
  });
});
