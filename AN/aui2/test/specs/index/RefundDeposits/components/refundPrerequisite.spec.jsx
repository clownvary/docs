import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import RefundPrerequisite from 'index/RefundDeposits/components/RefundPrerequisite';

const initialState = {
  prerequisite: fromJS({}),
  initialData: {
    initData: {
      override_info: {
        has_override_authority: false
      }
    },
    savedData: {
      user_name: 'name',
      user_password: 'pass',
      override_checked: true
    }
  },
  deposits: [],
  rentalFees: []
};

function setup(defaultState = initialState) {
  const state = Object.assign({}, initialState, defaultState);

  const actions = {
    updateIsOverrideAction: jest.fn(),
    updateUserPasswordAction: jest.fn(),
    updateUserNameAction: jest.fn(),
    clearPrerequisiteErrsAction: jest.fn(),
    updateOverrideAuthorityAction: jest.fn(),
    updateNeedOverrideAction: jest.fn(),
    updateOverrideMsgAction: jest.fn()
  };

  const component = mount(
    <RefundPrerequisite
      {...actions}
      {...state}
    />);

  return {
    component,
    actions,
    state
  };
}

describe('index -> Refund -> components -> RefundPrerequisite', () => {
  it('should render correctly when has no authority to override.', () => {
    const {
      actions
    } = setup();

    expect(actions.updateUserNameAction).toHaveBeenCalled();
    expect(actions.updateUserPasswordAction).toHaveBeenCalled();
    expect(actions.updateIsOverrideAction).toHaveBeenCalled();
    expect(actions.updateOverrideAuthorityAction).not.toHaveBeenCalled();
    expect(actions.updateNeedOverrideAction).not.toHaveBeenCalled();
    expect(actions.updateOverrideMsgAction).not.toHaveBeenCalled();
  });

  it('should render correctly when has authority to override.', () => {
    const {
      actions
    } = setup({
      deposits: [
        {
          needOverride: true,
          refundDate: "Mar 22, 2017",
          need_override: true,
          id: 1,
          selected: true
        }
      ],
      initialData: {
        initData: {
          override_info: {
            has_override_authority: true
          }
        },
        savedData: {
          user_name: '',
          user_password: '',
          override_checked: false
        }
      }
    });

    expect(actions.updateUserNameAction).not.toHaveBeenCalled();
    expect(actions.updateUserPasswordAction).not.toHaveBeenCalled();
    expect(actions.updateIsOverrideAction).not.toHaveBeenCalled();
    expect(actions.updateOverrideAuthorityAction).toHaveBeenCalled();
    expect(actions.updateNeedOverrideAction).toHaveBeenCalled();
    expect(actions.updateOverrideMsgAction).toHaveBeenCalled();
  });
});
