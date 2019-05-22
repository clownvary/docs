import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import isFunction from 'lodash/isFunction';
import store from 'index/Reservation/store';
import configureStore from 'redux-mock-store';
import Button from 'react-base-ui/lib/components/Button';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import Checkbox from 'react-base-ui/lib/components/Checkbox';
import Sticky from 'shared/components/Sticky';
import Alert from 'shared/components/Alert';
import { Authority } from 'shared/authorities';
import { PermitAction } from 'index/Reservation/components/PermitAction';

jest.mock('react-base-ui/lib/components/Button', () => 'Button');
jest.mock('react-base-ui/lib/components/Dropdown', () => 'Dropdown');
jest.mock('shared/components/Sticky', () => 'Sticky');
jest.mock('react-base-ui/lib/services/dialog', () => ({
  confirm: jest.fn().mockReturnValue(Promise.resolve())
}));
jest.mock('shared/actions/cancelPermit', () => ({
  confirmCancelPermit: jest.fn().mockReturnValueOnce(Promise.resolve())
    .mockReturnValueOnce(Promise.reject('Cancel the cancel permit action.'))
}));


const actionsData = {
  statusInfo: {},
  statusList: [{
    text: 'Issue',
    value: '0'
  }, {
    text: 'Deny',
    value: '1',
  }, {
    text: '"Complete"',
    value: '2'
  }]
};

const props = {
  actions: fromJS(actionsData),
  selectedPermit: fromJS({
    permit_id: 1,
    permit_number: 1
  }),
  completePermit: jest.fn(),
  cancelPermit: jest.fn(),
  changePermitStatus: jest.fn(),
  raiseUnrecognizedAuthCode: jest.fn(),
  cancelPermitAsycAction: jest.fn(),
  redirect: jest.fn(),
  initialData: {
    permitWording: 'Facility'
  }
};

const defaultInitState = {
  authority: fromJS({
    authorities: [ {
        id: 'permitActionsOnReservationsPage',
        authorityType: 'display',
        status_text: null
      }
    ]
  })
};

describe('index => Reservation => components => PermitAction', function () {
  const mockStore = configureStore();
  let store = null;
  const body = {
    extraInfo: {
      is_modifying: true,
      is_pending_recalculation: true,
      is_expired: true
    },
    extrainfo: {
      is_modifying: true,
      is_pending_recalculation: true,
      is_expired: true
    },
    statusitems: [
      {
        text: 'Deny',
        value: '1',
        status_text: 'Deny',
        status_type: 'status type',
        status_id: 1,
        transaction_stage_id: 1,
        permit_status_action: 'permit status action'
      }
    ]
  };

  const setup = (initProps, store) => {
    const permitAction = mount(<PermitAction {...initProps} />, { context: { store } });

    const instance = permitAction.instance();

    return {
      permitAction,
      instance
    }
  };

  beforeAll(() => {
    props.fetchPermitStatusList = jest.fn(() => Promise.resolve(body));
    props.fetchPermitStatusInfo = jest.fn(() => Promise.resolve(body.extraInfo));
  });

  afterAll(function() {
    fetchPermitStatusList.clearAllTimers();
    fetchPermitStatusInfo.clearAllTimers();
    props.fetchPermitStatusList = null;
  });

  beforeEach(() => {
    Object.keys(props).forEach((mockFnName) => {
      if (isFunction(props[mockFnName])) {
        props[mockFnName].mockClear();
      }
    });
  });

  it('PermitAction should be rendered correctly', () => {
    const authoritiy = [{
      "authorityType": "hide",
      "id": "permitActionsOnReservationsPage",
      "name": "Permit Actions On Reservations Page"
    }];
    Authority.init(authoritiy);
    const store = mockStore({ ...defaultInitState });

    const { permitAction } = setup(props, store);
    const changeStatus = permitAction.find(Dropdown).at(0);
    const cancelPermitBtn = permitAction.find(Button).at(0);
    const newReservationBtn = permitAction.find(Button).at(1);

    changeStatus.simulate('change', { value: '1' });
    cancelPermitBtn.simulate('click');
    newReservationBtn.simulate('click');

    expect(permitAction.find('div.action-item').length).toBe(1);
    expect(permitAction.find(Button).length).toEqual(7);
    expect(permitAction.find(Dropdown).length).toEqual(1);
    expect(permitAction.find(Sticky).length).toEqual(0);
    expect(permitAction.find(Alert).length).toEqual(3);
  });

  it('If authorityType is "display", handle change status to "Complete"', () => {
    Authority.init(window.__authoritiy__);
    const actionsData = {
      statusInfo: {},
      statusList: [{
        text: 'Issue',
        value: '0'
      }, {
        text: 'Deny',
        value: '1',
        status_text: 'Complete',
        status_type: 'status type',
        status_id: 1,
        transaction_stage_id: 1,
        permit_status_action: 'permit status action'
      }, {
        text: '"Complete"',
        value: '2'
      }]
    };
    const newProps = Object.assign({}, props, {
      actions: fromJS(actionsData)
    });

    const initState = {
      authority: fromJS({
        authorities: [ {
            id: 'permitActionsOnReservationsPage',
            authorityType: 'display'
          }
        ]
      })
    };
    const store = mockStore({ ...initState });
    const { permitAction, instance } = setup(newProps, store);

    const changeStatus = permitAction.find(Dropdown).at(0);
    const cancelPermitBtn = permitAction.find(Button).at(0);
    const newReservationBtn = permitAction.find(Button).at(1);
    const changeAlert = permitAction.find('Alert').at(1);
    const confirmButton = changeAlert.find('Button').last();

    changeStatus.simulate('change', { value: '1' });
    cancelPermitBtn.simulate('click');
    newReservationBtn.simulate('click');

    const value = {
      value: '1',
      status_text: 'Complete'
    };
    instance.onChangePermitStatus(value);
    expect(changeAlert.find('.modal').hasClass('is-open')).toBe(true);

    confirmButton.simulate('click');
    expect(changeAlert.find('.modal').hasClass('is-open')).toBe(false);

    expect(newProps.fetchPermitStatusInfo.mock.calls.length).toBe(2);
  });

  it('If authorityType is "display", extraInfo.is_modifying is false and extraInfo.is_pending_recalculation if true, handle change status to "Complete"', () => {
    Authority.init(window.__authoritiy__);
    const actionsData = {
      statusInfo: {},
      statusList: [{
        text: 'Issue',
        value: '0'
      }, {
        text: 'Deny',
        value: '1',
        status_text: 'Complete'
      }, {
        text: '"Complete"',
        value: '2'
      }]
    };
    const newProps = Object.assign({}, props, {
      actions: fromJS(actionsData),
      fetchPermitStatusInfo: jest.fn(() => Promise.resolve({
        is_modifying: false,
        is_pending_recalculation: true
      }))
    });

    const initState = {
      authority: fromJS({
        authorities: [ {
            id: 'permitActionsOnReservationsPage',
            authorityType: 'display'
          }
        ]
      })
    };
    const store = mockStore({ ...initState });
    const { permitAction, instance } = setup(newProps, store);

    const changeStatus = permitAction.find(Dropdown).at(0);
    const cancelPermitBtn = permitAction.find(Button).at(0);
    const newReservationBtn = permitAction.find(Button).at(1);
    const changeAlert = permitAction.find('Alert').at(1);
    const confirmButton = changeAlert.find('Button').last();

    changeStatus.simulate('change', { value: '1' });
    cancelPermitBtn.simulate('click');
    newReservationBtn.simulate('click');

    const value = {
      value: '1',
      status_text: 'Complete'
    };
    instance.onChangePermitStatus(value);
    expect(changeAlert.find('.modal').hasClass('is-open')).toBe(true);

    confirmButton.simulate('click');
    expect(changeAlert.find('.modal').hasClass('is-open')).toBe(false);
  });

  it('If authorityType is "display" and extraInfo.can_be_completed is false, handle change status to "Complete"', () => {
    Authority.init(window.__authoritiy__);
    const actionsData = {
      statusInfo: {},
      statusList: [{
        text: 'Issue',
        value: '0'
      }, {
        text: 'Deny',
        value: '1',
        status_text: 'Complete'
      }, {
        text: '"Complete"',
        value: '2'
      }]
    };
    const newProps = Object.assign({}, props, {
      actions: fromJS(actionsData),
      fetchPermitStatusInfo: jest.fn(() => Promise.resolve({
        is_modifying: false,
        is_pending_recalculation: false,
        can_be_completed: false
      }))
    });

    const initState = {
      authority: fromJS({
        authorities: [ {
            id: 'permitActionsOnReservationsPage',
            authorityType: 'display'
          }
        ]
      })
    };
    const store = mockStore({ ...initState });
    const { permitAction, instance } = setup(newProps, store);

    const changeStatus = permitAction.find(Dropdown).at(0);
    const cancelPermitBtn = permitAction.find(Button).at(0);
    const newReservationBtn = permitAction.find(Button).at(1);
    const changeAlert = permitAction.find('Alert').at(1);
    const confirmButton = changeAlert.find('Button').last();

    changeStatus.simulate('change', { value: '1' });
    cancelPermitBtn.simulate('click');
    newReservationBtn.simulate('click');

    const value = {
      value: '1',
      status_text: 'Complete'
    };
    instance.onChangePermitStatus(value);
    expect(changeAlert.find('.modal').hasClass('is-open')).toBe(true);

    confirmButton.simulate('click');
    expect(changeAlert.find('.modal').hasClass('is-open')).toBe(false);
  });

  it('If authorityType is "display" and extraInfo.can_be_completed is true, handle change status to "Complete"', () => {
    Authority.init(window.__authoritiy__);
    const actionsData = {
      statusInfo: {},
      statusList: [{
        text: 'Issue',
        value: '0'
      }, {
        text: 'Deny',
        value: '1',
        status_text: 'Complete'
      }, {
        text: '"Complete"',
        value: '2'
      }]
    };
    const newProps = Object.assign({}, props, {
      actions: fromJS(actionsData),
      fetchPermitStatusInfo: jest.fn(() => Promise.resolve({
        is_modifying: false,
        is_pending_recalculation: false,
        can_be_completed: true
      }))
    });

    const initState = {
      authority: fromJS({
        authorities: [ {
            id: 'permitActionsOnReservationsPage',
            authorityType: 'display'
          }
        ]
      })
    };
    const store = mockStore({ ...initState });
    const { permitAction, instance } = setup(newProps, store);

    const changeStatus = permitAction.find(Dropdown).at(0);
    const cancelPermitBtn = permitAction.find(Button).at(0);
    const newReservationBtn = permitAction.find(Button).at(1);
    const changeAlert = permitAction.find('Alert').at(1);
    const confirmButton = changeAlert.find('Button').last();

    changeStatus.simulate('change', { value: '1' });
    cancelPermitBtn.simulate('click');
    newReservationBtn.simulate('click');

    const value = {
      value: '1',
      status_text: 'Complete'
    };
    instance.onChangePermitStatus(value);
    expect(changeAlert.find('.modal').hasClass('is-open')).toBe(true);

    confirmButton.simulate('click');
    expect(changeAlert.find('.modal').hasClass('is-open')).toBe(false);
  });

  it('If authorityType is "disabled", handle change status to "Deny"', () => {
    Authority.init(window.__authoritiy__);
    const actionsData = {
      statusInfo: {},
      statusList: [{
        text: 'Issue',
        value: '0'
      }, {
        text: 'Deny',
        value: '1',
        status_text: 'Deny'
      }, {
        text: '"Complete"',
        value: '2'
      }]
    };
    const newProps = Object.assign({}, props, {
      actions: fromJS(actionsData),
      fetchPermitStatusList: jest.fn(() => Promise.resolve(body))
    });

    const initState = {
      authority: fromJS({
        authorities: [{
            id: 'permitActionsOnReservationsPage',
            authorityType: 'disabled'
          }
        ]
      })
    };
    const store = mockStore({ ...initState });

    const { permitAction, instance } = setup(newProps, store);
    const changeStatus = permitAction.find(Dropdown).at(0);
    const cancelPermitBtn = permitAction.find(Button).at(0);
    const newReservationBtn = permitAction.find(Button).at(1);
    const changeAlert = permitAction.find('Alert').at(0);
    const confirmButton = changeAlert.find('Button').last();

    changeStatus.simulate('change', { value: '1' });
    cancelPermitBtn.simulate('click');
    newReservationBtn.simulate('click');

    const value = {
      value: '1',
      status_text: 'Deny'
    };
    instance.onChangePermitStatus(value);
    expect(changeAlert.find('.modal').hasClass('is-open')).toBe(true);

    confirmButton.simulate('click');
    expect(changeAlert.find('.modal').hasClass('is-open')).toBe(false);
  });

  it('If authorityType is "disabled" and have existing status, handle change status to "Deny"', () => {
    const authoritiy = [{
      "authorityType": "disabled",
      "id": "permitActionsOnReservationsPage",
      "name": "Permit Actions On Reservations Page"
    }];
    Authority.init(authoritiy);
    const actionsData = {
      statusInfo: {},
      statusList: [{
        text: 'Issue',
        value: '0'
      }, {
        text: 'Deny',
        value: '1',
        status_text: 'Deny',
        status_type: 'status type',
        status_id: 1,
        transaction_stage_id: 1,
        permit_status_action: 'permit status action'
      }, {
        text: '"Complete"',
        value: '2'
      }]
    };
    const mockBody = Object.assign({}, body);
    mockBody.extrainfo.is_modifying = false;

    const newProps = Object.assign({}, props, {
      actions: fromJS(actionsData),
      fetchPermitStatusList: jest.fn(() => Promise.resolve(mockBody))
    });

    const initState = {
      authority: fromJS({
        authorities: [{
            id: 'permitActionsOnReservationsPage',
            authorityType: 'disabled'
          }
        ]
      })
    };
    const store = mockStore({ ...initState });

    const { permitAction, instance } = setup(newProps, store);
    const changeStatus = permitAction.find(Dropdown).at(0);
    const cancelPermitBtn = permitAction.find(Button).at(0);
    const newReservationBtn = permitAction.find(Button).at(1);
    const changeAlert = permitAction.find('Alert').at(0);
    const confirmButton = changeAlert.find('Button').last();

    changeStatus.simulate('change', { value: '1' });
    cancelPermitBtn.simulate('click');
    newReservationBtn.simulate('click');

    const value = {
      value: '1',
      status_text: 'Deny'
    };
    instance.onChangePermitStatus(value);
    expect(changeAlert.find('.modal').hasClass('is-open')).toBe(true);

    confirmButton.simulate('click');
    expect(changeAlert.find('.modal').hasClass('is-open')).toBe(false);
  });

  it('If authorityType is "disabled" and no existing status, handle change status to "Deny"', () => {
    Authority.init(window.__authoritiy__);
    const actionsData = {
      statusInfo: {},
      statusList: [{
        text: 'Issue',
        value: '0'
      }, {
        text: 'Deny',
        value: '1',
        status_text: 'Deny'
      }, {
        text: '"Complete"',
        value: '2'
      }]
    };
    const mockBody = Object.assign({}, body);
    mockBody.extrainfo.is_modifying = false;
    mockBody.statusitems = [];

    const newProps = Object.assign({}, props, {
      actions: fromJS(actionsData),
      fetchPermitStatusList: jest.fn(() => Promise.resolve(mockBody))
    });

    const initState = {
      authority: fromJS({
        authorities: [{
            id: 'permitActionsOnReservationsPage',
            authorityType: 'disabled'
          }
        ]
      })
    };
    const store = mockStore({ ...initState });

    const { permitAction, instance } = setup(newProps, store);
    const changeStatus = permitAction.find(Dropdown).at(0);
    const cancelPermitBtn = permitAction.find(Button).at(0);
    const newReservationBtn = permitAction.find(Button).at(1);
    const changeAlert = permitAction.find('Alert').at(0);
    const confirmButton = changeAlert.find('Button').last();

    changeStatus.simulate('change', { value: '1' });
    cancelPermitBtn.simulate('click');
    newReservationBtn.simulate('click');

    const value = {
      value: '1',
      status_text: 'Deny'
    };
    instance.onChangePermitStatus(value);
    expect(changeAlert.find('.modal').hasClass('is-open')).toBe(true);

    confirmButton.simulate('click');
    expect(changeAlert.find('.modal').hasClass('is-open')).toBe(false);
  });

  it('If authorityType is "hide" and no existing status, handle change status to other status', () => {
    Authority.init(window.__authoritiy__);
    const actionsData = {
      statusInfo: {},
      statusList: [{
        text: 'Deny',
        value: '1',
        status_text: 'Other',
      }]
    };

    const initState = {
      authority: fromJS({
        authorities: [
          {
            id: 'permitActionsOnReservationsPage',
            authorityType: 'hide'
          }
        ]
      })
    };
    const newProps = Object.assign({}, props, {
      actions: fromJS(actionsData),
      selectedPermit: fromJS({
        permit_id: '1'
      }),
      fetchPermitStatusList: jest.fn(() => Promise.resolve(body)),
      changeCreateByMe:jest.fn()
    })
    const store = mockStore({ ...initState });

    const { permitAction } = setup(newProps, store);
    const changeStatus = permitAction.find(Dropdown).at(0);
    const cancelPermitBtn = permitAction.find(Button).at(0);
    const newReservationBtn = permitAction.find(Button).at(1);

    permitAction.find(Checkbox).node.props.onChange({ target: { checked: true } })
    expect(newProps.changeCreateByMe).toHaveBeenCalled();

    changeStatus.simulate('change', { value: '1' });
    cancelPermitBtn.simulate('click');
    newReservationBtn.simulate('click');

    expect(newProps.fetchPermitStatusList.mock.calls.length).toBe(1)
  });

  it('If authorityType is "hide" and have existing status, handle change status to other status', () => {
    Authority.init(window.__authoritiy__);
    const actionsData = {
      statusInfo: {},
      statusList: [{
        text: 'Issue',
        value: '0'
      }, {
        text: 'Deny',
        value: '1',
        status_text: 'Other',
        status_type: 'status type',
        status_id: 1,
        transaction_stage_id: 1,
        permit_status_action: 'permit status action'
      }, {
        text: '"Complete"',
        value: '2'
      }]
    };

    const initState = {
      authority: fromJS({
        authorities: [
          {
            id: 'permitActionsOnReservationsPage',
            authorityType: 'hide'
          }
        ]
      })
    };
    const newProps = Object.assign({}, props, {
      actions: fromJS(actionsData),
      selectedPermit: fromJS({
        permit_id: '1'
      }),
      fetchPermitStatusList: jest.fn(() => Promise.resolve(body))
    })
    const store = mockStore({ ...initState });

    const { permitAction } = setup(newProps, store);
    const changeStatus = permitAction.find(Dropdown).at(0);
    const cancelPermitBtn = permitAction.find(Button).at(0);
    const newReservationBtn = permitAction.find(Button).at(1);

    changeStatus.simulate('change', { value: '1' });
    cancelPermitBtn.simulate('click');
    newReservationBtn.simulate('click');

    expect(newProps.fetchPermitStatusList.mock.calls.length).toBe(1)
  });

  it('If authorityType is "hide" and have existing status, handle change status to other statu to Approve.', () => {
    Authority.init(window.__authoritiy__);
    const actionsData = {
      statusInfo: {},
      statusList: [{
        text: 'Issue',
        value: '0'
      }, {
        text: 'Deny',
        value: '1',
        status_text: 'Other',
        status_type: 'status type',
        status_id: 1,
        transaction_stage_id: 1,
        permit_status_action: 'permit status action'
      }, {
        text: '"Complete"',
        value: '2'
      }, {
        text: 'Approve',
        value: '3',
        status_text: 'Approve',
        status_type: 'status type',
        status_id: 3,
        transaction_stage_id: 3,
        permit_status_action: 'permit status action'
      }]
    };

    const initState = {
      authority: fromJS({
        authorities: [
          {
            id: 'permitActionsOnReservationsPage',
            authorityType: 'hide'
          }
        ]
      })
    };
    const newProps = Object.assign({}, props, {
      actions: fromJS(actionsData),
      selectedPermit: fromJS({
        permit_id: '1'
      }),
      fetchPermitStatusList: jest.fn(() => Promise.resolve(
        {
          extrainfo: {
            is_modifying: false,
            is_pending_recalculation: true,
            is_expired: true
          },
          statusitems: [
            {
              text: 'Approve',
              value: '3',
              status_text: 'Approve',
              status_type: 'status type',
              status_id: 3,
              transaction_stage_id: 3,
              permit_status_action: 'permit status action'
            }
          ]
        }
      ))
    })
    const store = mockStore({ ...initState });

    const { permitAction, instance } = setup(newProps, store);
    const changeStatus = permitAction.find(Dropdown).at(0);
    const cancelPermitBtn = permitAction.find(Button).at(0);
    const newReservationBtn = permitAction.find(Button).at(1);
    const changeAlert = permitAction.find('Alert').at(2);
    const confirmButton = changeAlert.find('Button').last();

    changeStatus.simulate('change', { value: '3' });
    cancelPermitBtn.simulate('click');
    newReservationBtn.simulate('click');
    instance.onChangePermitStatus('3');

    expect(newProps.fetchPermitStatusList.mock.calls.length).toBe(2);
  });

  it('onCancelPermit work well when is_modifying is true.', (done) => {
    Authority.init(window.__authoritiy__);
    const store = mockStore({ ...defaultInitState });
    const { instance } = setup(props, store);
    const permitID = 1;

    instance.onCancelPermit(permitID).catch(
      () => {
        expect(props.fetchPermitStatusInfo.mock.calls.length).toBe(1);
        done()
      }
    )
  });

  it('onCancelPermit work well when permit can`t be cancelled.', (done) => {
    Authority.init(window.__authoritiy__);

    const store = mockStore(defaultInitState);
    const newProps = {
      ...props,
      fetchPermitStatusInfo: jest.fn(() => Promise.resolve(
        {
          is_modifying: false,
          is_pending_recalculation: false,
          can_be_cancelled: false
        }
      ))
    }
    const { instance } = setup(newProps, store);
    const permitID = 1;

    instance.onCancelPermit(permitID).catch(
      () => {
        expect(newProps.fetchPermitStatusInfo.mock.calls.length).toBe(1);
        done()
      }
    )
  });

  it('onCancelPermit work well when permit is not be modified and can be cancelled.', (done) => {
    Authority.init(window.__authoritiy__);

    const store = mockStore(defaultInitState);
    const newProps = {
      ...props,
      fetchPermitStatusInfo: jest.fn(() => Promise.resolve(
        {
          is_modifying: false,
          is_pending_recalculation: false,
          can_be_cancelled: true,
          has_paied_amount: false,
          has_refund_permission: false
        }
      ))
    }
    const { instance } = setup(newProps, store);
    const permitID = 1;

    instance.onCancelPermit(permitID).then(
      (data) => {
        expect(newProps.fetchPermitStatusInfo.mock.calls.length).toBe(1);
        expect(data).toEqual({
          hasPaiedAmount: false,
          hasRefundPermission: false
        })
        done()
      }
    )
  });


  it('onCancelPermit should throw error when fetch permit information fails.', (done) => {
    Authority.init(window.__authoritiy__);

    const store = mockStore(defaultInitState);
    const error = 'some error happened.'
    const newProps = {
      ...props,
      fetchPermitStatusInfo: jest.fn(() => Promise.reject(error))
    }
    const { instance } = setup(newProps, store);
    const permitID = 1;

    instance.onCancelPermit(permitID).catch(
      (err) => {
        expect(newProps.fetchPermitStatusInfo.mock.calls.length).toBe(1);
        expect(err).toEqual(error);
        done()
      }
    )
  });


  it('onConfirmCancelPermit should work well', () => {
    Authority.init(window.__authoritiy__);
    const store = mockStore({ ...defaultInitState });
    const cancelPermitAsycAction = jest.fn();
    const newProps = {
      ...props,
      cancelPermitAsycAction
    };
    const { instance } = setup(newProps, store);

    instance.onConfirmCancelPermit();
    expect(newProps.cancelPermitAsycAction.mock.calls.length).toBe(1);
    const newProps1 = {
      ...props,
      selectedPermit: undefined,
      cancelPermitAsycAction
    };
    const { instance: instance1 } = setup(newProps1, store);

    instance1.onConfirmCancelPermit();
    expect(newProps1.cancelPermitAsycAction.mock.calls.length).toBe(2);
  });

  it('onCancelPermitWithoutRefund should work well after confirm cancel.', (done) => {
    Authority.init(window.__authoritiy__);
    const store = mockStore({ ...defaultInitState });
    const { instance } = setup(props, store);

    instance.onCancelPermitWithoutRefund().then(
      () => {
        expect(props.cancelPermitAsycAction.mock.calls.length).toBe(1);
        done();
      }
    )
  });

  it('onCancelPermitWithoutRefund should work well when cancel the cancel permit action.', (done) => {
    Authority.init(window.__authoritiy__);
    const store = mockStore({ ...defaultInitState });
    const { instance } = setup(props, store);

    instance.onCancelPermitWithoutRefund().catch(
      (err) => {
        expect(err).toEqual('Cancel the cancel permit action.');
        done();
      }
    )
  });

  it('onCancelPermitWithoutRefundPermission should work well.', () => {
    Authority.init(window.__authoritiy__);
    const store = mockStore({ ...defaultInitState });
    const { instance } = setup(props, store);

    instance.onCancelPermitWithoutRefundPermission();
    expect(props.cancelPermitAsycAction.mock.calls.length).toBe(1);
  })
});
