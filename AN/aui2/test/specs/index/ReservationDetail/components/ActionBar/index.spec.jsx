import React from 'react';
import { shallow, mount } from 'enzyme';
import { fromJS } from 'immutable';
import isFunction from 'lodash/isFunction';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';
import * as func from 'shared/utils/func';
import { Authority } from 'shared/authorities';
import ConnectedActionBar, { ActionBar } from 'index/ReservationDetail/components/ActionBar/index';
import { doesNotThrow } from 'assert';
import { confirm } from 'react-base-ui/lib/services/dialog';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import Button from 'react-base-ui/lib/components/Button';


jest.mock('react-base-ui/lib/services/dialog',()=>({
  confirm:jest.fn().mockReturnValue(Promise.resolve())
}));
jest.mock('shared/components/CancelPermit', () => 'CancelPermit');
jest.mock('shared/actions/cancelPermit', () => ({
  confirmCancelPermit: jest.fn()
    .mockReturnValueOnce(Promise.resolve())
    .mockReturnValueOnce(Promise.reject('Cancel the cancel permit action.'))
    .mockReturnValue(Promise.resolve())
}));

const availableStatusList = [
  {
     "status_type":0,
     "status_text":"Issue",
     "stage_id":-1,
     "status_id":4,
     "id": 4,
     "value": 4,
     "text": "Issue",
     "permit_status_action":-1,
     "transaction_stage_id":-1
  },
  {
     "status_type":0,
     "status_text":"Complete",
     "stage_id":-1,
     "status_id":7,
     "id": 7,
     "value": 7,
     "text": "Complete",
     "permit_status_action":-1,
     "transaction_stage_id":-1
  },
  {
    "status_type": 0,
    "status_text": 'Deny',
    "stage_id": -1,
    "status_id": 9,
    "id": 9,
    "value": 9,
    "text": 'Deny',
    "permit_status_action": -1,
    "transaction_stage_id": -1
  }
]

const mockData = {
  "action_bar_information":{
      "change_permit_status":{
         "system_behavior_id":"changePermitStatusAsycAction",
         "current_status" : {
               "status_type":0,
               "status_text":"Issue",
               "stage_id":-1,
               "status_id":4,
               "value": 4,
               "text": "Issue",
               "permit_status_action":-1,
               "transaction_stage_id":-1
          },
         "available_status_list": availableStatusList
      },
      "copy_permit":{
        "system_behavior_id":"copyPermit"
     },
      "cancel_permit":{
         "system_behavior_id":"cancelPermit"
      },
      "modify_payment_plan":{
         "system_behavior_id":"modifyPaymentPlan"
      },
      "make_payment":{
         "system_behavior_id":"makePayment"
      },
      "refund_charges":{
         "system_behavior_id":"refundCharges"
      },
      "refund_permit":{
         "system_behavior_id":"refundPermit"
      },
      "view_email_print_permit":{
         "system_behavior_id":"viewEmailPrintPermit"
      },
      "view_print_amendment":{
         "system_behavior_id":"viewPrintAmendment"
      },
      "view_permit_contract": {
        "system_behavior_id": "viewPermitContract"
      }
   }
};

const authorities = [
  {
    "id":"changePermitStatusAsycAction",
    "authorityType":"enabled",
    "name":"Change Permit Status"
  },
  {
    "id":"cancelPermit",
    "authorityType":"disabled",
    "name":"Cancel Permit"
  },
  {
    "id":"makePayment",
    "authorityType":"enabled",
    "name":"Cancel Permit"
  },
  {
    "id":"refundPermit",
    "authorityType":"disabled",
    "name":"Cancel Permit"
  },
  {
    "id": "viewPermitContract",
    "authorityType": "enabled",
    "name": "View Permit Contract"
  },
  {
    "id":"copyPermit",
    "authorityType":"enabled",
    "name":"Copy Permit"
 },
 {
    "id": "addEvent",
    "authorityType": "enabled",
    "name": "Add Event"
  }
];

const eventActionInformation = convertCasingPropObj({
  "add_event": {
    "system_behavior_id": "addEvent"
  }
});

const initialData = {
  permitLabel: '',
  permitNumber: -1,
  viewPermitId: -1,
  permitID: '1111111',
  batchID: '1111111',
  receiptID: '2222222',
  receiptEntryID: '3333333'
};

const hideAuthorites = authorities.map((auth) =>
  auth.id === 'changePermitStatusAsycAction'
    ? { ...auth }
    : { ...auth, authorityType: 'hide' });

const disabledAuthorities = authorities.map((auth) =>
  auth.id === 'changePermitStatus'
    ? { ...auth }
    : { ...auth, authorityType: 'disabled' });

const enabledAuthorities = authorities.map((auth) =>
  auth.id === 'changePermitStatus'
    ? { ...auth }
    : { ...auth, authorityType: 'enabled' });

const actions = {
  setStatus: jest.fn(),
  redirect: jest.fn(),
  gotoPaymentModificationPage: jest.fn(),
  gotoRefundDepositFeesPageAction: jest.fn(),
  reEnterReservationDetailPageAction: jest.fn(),
  fetchPermitStatusInfo: jest.fn(),
  cancelPermitAsycAction: jest.fn(),
  changePermitStatusAsycAction: jest.fn().mockReturnValue(Promise.resolve()),
  fetchPermitEvents: jest.fn().mockReturnValue(Promise.resolve()),
  addEvent: jest.fn(),
  buildUrl: jest.fn()
}
const resetActions = () => Object.keys(actions).forEach(fn => actions[fn].mockClear());

const data = convertCasingPropObj(mockData);

const setup = (overrides) => {
  const actionBar = mount(<ActionBar actionBar={fromJS({status : 1})}
                                     initialData={initialData}
                                     actionBarInformation={data.actionBarInformation}
                                     actionBarInformationNoCamel={mockData.action_bar_information}
                                     eventActionInformation={eventActionInformation}
                                     updateExpirationDate={() => {
                                        return new Promise((resolve) => {
                                          resolve();
                                        })
                                      }}
                                     {...actions}
                                     {...overrides} />);

  const instance = actionBar.instance();

  return {
    actionBar,
    instance
  };
};

describe('index -> ReservationDetail -> components -> ActionBar', () => {
  beforeAll(() =>{
    func.newWindow = jest.fn();
  });

  afterAll(() => {
    func.newWindow.mockRestore();
  });

  beforeEach(() => {
    Object.keys(actions).forEach((mockFnName) => {
      actions[mockFnName].mockClear();
    });
  });

  it('should include 5 buttons 1 dropdown', () => {
    Authority.init(window.__authoritiy__);
    const { actionBar } = setup();
    expect(actionBar.find('.actions').find('.btn').length).toBe(5);
    expect(actionBar.find('.aaui-dropdown').length).toBe(1);
  });

  it('should hide buttons when authorities are "hide"', () => {
    Authority.init(hideAuthorites);

    const { actionBar } = setup();
    expect(actionBar.find('.actions').find('.btn.u-hidden').length).toBe(5);
  });

  it('Dropdown should include 2 items', () => {
    Authority.init(window.__authoritiy__);
    const { actionBar } = setup();
    const dropdownMenu = actionBar.find('.aaui-dropdown__menu');
    expect(dropdownMenu.find('li').length).toBe(3);
  });

  it('Has correct authority', () => {
    Authority.init(authorities);

    const { actionBar } = setup();
    const btns = actionBar.find('.btn');
    const dropdown = actionBar.find('.aaui-dropdown');
    expect(dropdown.at(0).node.disabled).toBe(undefined);

    expect(btns.at(0).node.disabled).toBe(false);
    expect(btns.at(1).node.disabled).toBe(false);
    expect(btns.at(2).node.disabled).toBe(true);
  });

  it('Mock disable action bar after invoke', () => {
    Authority.init(enabledAuthorities);
    const { actionBar } = setup({
      actionBar: fromJS({ status : 1, disableActions: true})
    })

    const dropdown = actionBar.find('.aaui-dropdown');
    const btns = actionBar.find('.btn');

    expect(dropdown.find('.is-disabled').length).toBe(1);
    expect(btns.at(0).node.disabled).toBe(true);
    expect(btns.at(1).node.disabled).toBe(true);
    expect(btns.at(2).node.disabled).toBe(true);
  });

  it('Handle permit status change', () => {
    Authority.init(authorities);
    const { actionBar, instance } = setup();
    const dropdown = actionBar.find(Dropdown);
    const spy = jest.fn();
    dropdown.prop('onChange')({value: 9}); // Deny
    instance.openConfirm('deny', spy).then(() => {
      expect(spy.mock.calls.length).toBe(1);
    }).catch(()=>false);
    dropdown.prop('onChange')({value: 7}); // Complete
    instance.openConfirm('complete', spy).then(() => {
      expect(spy.mock.calls.length).toBe(2);
    }).catch(()=>false);
    dropdown.prop('onChange')({value: 4}); // other
    instance.openConfirm('complete', spy).then(() => {
      expect(spy.mock.calls.length).toBe(2);
      expect(actions.changePermitStatusAsycAction).toHaveBeenCalled();
    }).catch(()=>false)
    instance.openConfirm(undefined, spy).then(() => {
      expect(spy.mock.calls.length).toBe(3);
    }).catch(()=>false)

    const statusDropdown = actionBar.find('.aaui-dropdown');
    const statusDropdownButton = statusDropdown.find('.aaui-dropdown__button');
    const statusDropdownMenu = statusDropdown.find('.aaui-dropdown__menu-wrapper');
    const statusDropdownItems = statusDropdownMenu.find('ul > li');
    const statusIssue = statusDropdownItems.first();

    expect(statusDropdownMenu.hasClass('u-hidden')).toBe(true);
    statusDropdownButton.simulate('click')
    expect(statusDropdownMenu.hasClass('u-hidden')).toBe(false);
    statusIssue.simulate('click');
    expect(actions.changePermitStatusAsycAction.mock.calls.length).toBe(2);
  });

  it('onCancelPermit should work well.', () => {
    Authority.init(enabledAuthorities);
    const fetchPermitStatusInfo = jest.fn()
      .mockReturnValueOnce(Promise.resolve({}))
      .mockReturnValueOnce(Promise.reject())
      .mockReturnValue(Promise.resolve());

    const { instance } = setup({
      fetchPermitStatusInfo
    });

    return instance.onCancelPermit(1).then(() => {
      expect(fetchPermitStatusInfo.mock.calls.length).toBe(1);
    }).then(() => {
      return instance.onCancelPermit(1).catch(() => {
        expect(fetchPermitStatusInfo.mock.calls.length).toBe(2);
      });
    });
  });

  it('onCancelPermitWithoutRefund should work well.', (done) => {
    Authority.init(enabledAuthorities);
    const changePermitStatusAsycAction = jest.fn()
      .mockReturnValueOnce(Promise.resolve({ payload: { body: { extrainfo: {} } } }))
      .mockReturnValueOnce(Promise.reject('Change Permmit Status Error.'))
      .mockReturnValue(Promise.resolve());

    const { instance } = setup({
      changePermitStatusAsycAction
    });

    instance.onCancelPermitWithoutRefund('', 1, 1).then(
      () => {
        expect(changePermitStatusAsycAction.mock.calls.length).toBe(1);
        expect(actions.reEnterReservationDetailPageAction.mock.calls.length).toBe(1);
      }
    )

    instance.onCancelPermitWithoutRefund('', 1, 1).catch(
      (err) => {
        expect(err).toEqual('Cancel the cancel permit action.');
      }
    )

    instance.onCancelPermitWithoutRefund('', 1, 1).catch(
      (err) => {
        expect(changePermitStatusAsycAction.mock.calls.length).toBe(2);
        expect(err).toEqual('Change Permmit Status Error.');
        done();
      }
    )
  });

  it('onCancelPermitWithoutRefundPermission should work well.', (done) => {
    Authority.init(enabledAuthorities);
    const cancelPermitAsycAction = jest.fn().mockReturnValueOnce(Promise.resolve())
      .mockReturnValueOnce(Promise.reject('Error happened when cancel permit.'))
      .mockReturnValue(Promise.resolve());

    const { instance } = setup({
      cancelPermitAsycAction
    });

    instance.onCancelPermitWithoutRefundPermission().then(
      () => {
        expect(cancelPermitAsycAction.mock.calls.length).toBe(1);
        expect(actions.reEnterReservationDetailPageAction).toHaveBeenCalled();
      }
    )

    instance.onCancelPermitWithoutRefundPermission().catch(
      (err) => {
        expect(cancelPermitAsycAction.mock.calls.length).toBe(2);
        expect(err).toEqual('Error happened when cancel permit.');
        done();
      }
    )
  });

  it('Handle make payment', () => {
    Authority.init(enabledAuthorities);
    const { actionBar, instance } = setup();

    expect(actions.gotoPaymentModificationPage.mock.calls.length).toBe(0);
    instance.makePayment(true);
    expect(actions.gotoPaymentModificationPage.mock.calls.length).toBe(0);
    instance.makePayment(false);
    expect(actions.gotoPaymentModificationPage.mock.calls.length).toBe(1);

    const actionButtons = actionBar.find('.actions').find('.btn');
    const makePaymentButton = actionButtons.at(1);

    makePaymentButton.simulate('click');
    expect(actions.gotoPaymentModificationPage.mock.calls.length).toBe(2);
  });

  it('Handle view permit contract', () => {
    Authority.init(enabledAuthorities);
    const { actionBar, instance } = setup();
    const actionButtons = actionBar.find('.actions').find('.btn');
    const viewPermitButton = actionButtons.at(0);

    expect(func.newWindow.mock.calls.length).toBe(0);
    viewPermitButton.simulate('click');
    expect(func.newWindow.mock.calls.length).toBe(1);
  });

  it('Handle refund deposit', () => {
    Authority.init(enabledAuthorities);
    const { actionBar, instance } = setup();

    expect(actions.gotoRefundDepositFeesPageAction.mock.calls.length).toBe(0);
    instance.gotoRefundDeposit();
    expect(actions.gotoRefundDepositFeesPageAction.mock.calls.length).toBe(1);

    const actionButtons = actionBar.find('.actions').find('.btn');
    const refundDepositButton = actionButtons.at(2);

    refundDepositButton.simulate('click');
    expect(actions.gotoRefundDepositFeesPageAction.mock.calls.length).toBe(2);
  })

  it('Handle change expirationDate', () => {
    const { actionBar, instance } = setup({ expirationDate: "2018 Jun 7 12:00 AM" });
    expect(actionBar.find('.is-expiration')).toHaveLength(1)

    actionBar.setState({ newExpirationDate: "2018 Jun 17 12:00 AM" })
    expect(actionBar.find('.is-expiration')).toHaveLength(0)
    actionBar.find('.icon-calendar-m').simulate('click')

    actionBar.setProps({ expirationDate: "2016 Jun 7 12:00 AM" })
    instance.calendar.wrappedComponent.props.valueChanged(["2016 Jun 9 12:00 AM"]);
  });

  it('copyPermitDialog should be triggered correctly',()=>{
    const { actionBar } = setup();
    const copyButtons = actionBar.find(Button).at(3);
    copyButtons.simulate('click');
    expect(actions.fetchPermitEvents).toHaveBeenCalled();
  });

  it('addEvent should be triggered correctly',()=>{
    const { actionBar, instance } = setup();
    resetActions();
    const addEventBtn = actionBar.find('.actions').find('.btn').last();
    expect(addEventBtn).toHaveLength(1);
    addEventBtn.simulate('click');
    expect(actions.addEvent).toHaveBeenCalled();
  });
});
