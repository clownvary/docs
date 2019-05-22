import React from 'react';
import { fromJS } from 'immutable';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import ConnectedCancelPermit, { CancelPermit } from 'shared/components/CancelPermit';

jest.mock('react-base-ui/lib/services/dialog', () => ({
  confirm: jest.fn()
    .mockReturnValueOnce(Promise.resolve())
    .mockReturnValueOnce(Promise.reject())
}));

describe('shared/components/CancelPermit', () => {

  let store;

  beforeEach(() => {
    const mockStore = configureStore();
    store = mockStore();
  });

  afterEach(() => {
    store.clearActions();
  });
  const actions = {
    getCancelPermitPermissionAsyncAction: jest.fn(),
    gotoRefundDepositFeesPageAction: jest.fn(),
    gotoReservationDetailPageAction: jest.fn(),
    onCancelPermit: jest.fn(),
    onCancelPermitWithoutRefund: jest.fn(),
    onCancelPermitWithoutRefundPermission: jest.fn()
  }
  const setup = props => {
    const component = mount(
      <CancelPermit display {...actions} {...props} />
    );
    const connectedComponent = mount(
      <ConnectedCancelPermit display store={store} {...actions} {...props} />
    );
    const instance = component.instance();

    return {
      component,
      instance,
      connectedComponent
    }
  }

  it('CancelPermit component should render correctly.', () => {
    const props = {
      className: 'cancelPermit',
      disabled: false,
      permitWording: 'permit',
      permitID: 1,
      permitNumber: 1
    };
    const { component } = setup(props);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('cancelPermit should work well when permit can be cancelled.', (done) => {
    const props = {
      className: 'cancelPermit',
      disabled: false,
      permitWording: 'permit',
      permitID: 1,
      permitNumber: 1,
      onCancelPermit: jest.fn()
        .mockReturnValueOnce(Promise.resolve({ hasPaiedAmount: true, hasRefundPermission: true }))
        .mockReturnValueOnce(Promise.reject('Permit can`t be cancelled.'))
    };
    const { instance } = setup(props);
    instance.cancelPermit().then(
      () => {
        expect(actions.gotoRefundDepositFeesPageAction).toHaveBeenCalled();
        expect(props.onCancelPermit).toHaveBeenCalledTimes(1);
      }
    )

    instance.cancelPermit().catch(
      (err) => {
        expect(err).toEqual('Permit can`t be cancelled.');
        done();
      }
    )
  });

  it('onCancelPermitEnabled should work well when permit can be cancelled.', (done) => {
    const props = {
      disabled: false,
      permitWording: 'permit',
      permitID: 1,
      permitNumber: 1,
      onCancelPermitWithoutRefundPermission: jest.fn(),
      onCancelPermitWithoutRefund: jest.fn().mockReturnValue(Promise.resolve())
    };
    const { instance } = setup(props);
    instance.onCancelPermitEnabled(true, false).then(
      () => {
        expect(props.onCancelPermitWithoutRefundPermission).toHaveBeenCalledTimes(1);
      }
    )

    instance.onCancelPermitEnabled(true, false).catch(
      () => {
        expect(props.onCancelPermitWithoutRefundPermission).toHaveBeenCalledTimes(1);
      }
    )

    instance.onCancelPermitEnabled(false, false).then(
      () => {
        expect(props.onCancelPermitWithoutRefund).toHaveBeenCalledTimes(1);
        done();
      }
    )
  });

});
