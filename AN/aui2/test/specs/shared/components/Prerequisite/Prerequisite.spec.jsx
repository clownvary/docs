import React from 'react';
import { fromJS } from 'immutable';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import Prerequisite from 'shared/components/Prerequisite';
import Input from 'react-base-ui/lib/components/Input';
import Checkbox from 'react-base-ui/lib/components/Checkbox';

describe('shared/components/Prerequisite', () => {

  let store;

  beforeEach(() => {
    const mockStore = configureStore();
    store = mockStore();
  });

  afterEach(() => {
    store.clearActions();
  });
  const actions = {
    updateUserNameAction: jest.fn(),
    updateUserPasswordAction: jest.fn(),
    clearPrerequisiteErrsAction: jest.fn(),
    updateIsOverrideAction: jest.fn()
  }
  const setup = props => mount(
    <Prerequisite display {...props} store={store} {...actions}/>
  );

  it('Prerequisite component should render correctly if no need override', () => {
    const props = {
      prerequisite: fromJS({
        errors: [],
        needOverride: false,
        userName: '',
        userPassword: '',
        isOverride: false,
        haveOverrideAuthority: false,
        overrideMessage: ''
      })
    };
    const component = setup(props);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('Prerequisite component should render correctly if need override and hasn`t checked override', () => {
    const props = {
      prerequisite: fromJS({
        errors: [],
        needOverride: true,
        userName: '',
        userPassword: '',
        isOverride: false,
        haveOverrideAuthority: false,
        overrideMessage: 'override message'
      })
    };
    const component = setup(props);
    expect(toJson(component)).toMatchSnapshot();

    component.find(Checkbox).find('input').simulate('change');
  });

  it('Prerequisite component should work fine if need override and has checked override and no authority', () => {
    const props = {
      prerequisite: fromJS({
        errors: [{
          type: 'override'
        }, {
          type: 'user'
        }],
        needOverride: true,
        userName: '',
        userPassword: '',
        isOverride: true,
        haveOverrideAuthority: false,
        overrideMessage: 'override message'
      }),
      className: 'Prerequiste--refund'
    };
    const component = setup(props);
    expect(toJson(component)).toMatchSnapshot();

    const userNameInput = component.find(Input).at(0).find('input');
    const userPasswordInput = component.find(Input).at(1).find('input');
    const overrideCheckbox = component.find(Checkbox).find('input');
    overrideCheckbox.simulate('change');
    userNameInput.simulate('blur');
    userNameInput.simulate('input');
    userPasswordInput.simulate('blur');
    userPasswordInput.simulate('input');
  });

  it('Prerequisite component should work fine if need override and has checked override and no authority and has no error', () => {
    const props = {
      prerequisite: fromJS({
        errors: [],
        needOverride: true,
        userName: '',
        userPassword: '',
        isOverride: true,
        haveOverrideAuthority: false,
        overrideMessage: 'override message'
      })
    };

    const component = setup(props);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('Prerequisite component should work fine if need override and has checked overrid and has authority', () => {
    const props = {
      prerequisite: fromJS({
        errors: [],
        needOverride: true,
        userName: '',
        userPassword: '',
        isOverride: true,
        haveOverrideAuthority: true,
        overrideMessage: 'override message'
      })
    };

    const component = setup(props);
    expect(toJson(component)).toMatchSnapshot();
  });
});
