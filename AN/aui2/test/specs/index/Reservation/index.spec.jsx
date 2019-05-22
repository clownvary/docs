import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import ConnectedReservation, { Reservation } from 'index/Reservation';
import middlewares from 'shared/api/middlewares';
import PermitFilter from 'index/Reservation/components/PermitFilter';
import PermitAction from 'index/Reservation/components/PermitAction';
import PermitGrid from 'index/Reservation/components/PermitGrid';
import LinkGroup from 'index/Reservation/components/LinkGroup';
import HelpLink from 'shared/components/HelpLink';
import Error from 'shared/components/Error';
import { Authority, AuthorityID, AuthorityType } from 'shared/authorities';

jest.mock('index/Reservation/components/PermitFilter', () => 'PermitFilter');
jest.mock('index/Reservation/components/PermitAction', () => 'PermitAction');
jest.mock('index/Reservation/components/PermitGrid', () => 'PermitGrid');
jest.mock('index/Reservation/components/LinkGroup', () => 'LinkGroup');
jest.mock('shared/components/HelpLink', () => 'HelpLink');
jest.mock('shared/components/Error', () => 'Error');
jest.mock('react-base-ui/lib/utils/browser', () => ({
  isIE: jest.fn().mockReturnValue(false).mockReturnValueOnce(true),
}));

describe('index/Reservation', () => {
  const actions = {
    raiseUnrecognizedAuthCode: jest.fn(),
    redirect: jest.fn()
  };

  afterEach(() => {
    actions.raiseUnrecognizedAuthCode.mockClear();
    actions.redirect.mockClear();
    window.setTabAttr = '';
    window.setTabLabel = '';
    window.addRootBreadCrumbForFacilityRedesign = '';
  });

  const props = {
    permits: fromJS({
      isPermitAccessible: 'false',
      selectedPermit: {}
    }),
    filters: fromJS({ createdByMe: false }),
    breadCrumb: fromJS(
      {
        batchID: '',
        receiptID: '',
        data: [{
          isRoot: true,
          type: 'rootmenuitem',
          name: 'Reservations',
          functionMenu: '',
          promptMessage: null,
          url: '',
          action: null
        }]
      }
    )
  };

  const mockStore = configureStore(middlewares);
  const store = mockStore({
    ...actions,
    ...props
  });

  const setup = props => mount(<ConnectedReservation {...props} {...actions} />, { context: { store } });
  window.setTabAttr = () => { };
  window.setTabLabel = () => { };
  window.addRootBreadCrumbForFacilityRedesign = () => { };
  it('component should render without error', () => {
    Authority.init([
      {
        id: AuthorityID.RESERVATIONS_PAGE,
        authorityType: AuthorityType.DISPLAYED
      }
    ]);
    __STATIC__ = false;

    const component = setup(props);
    expect(component.find('section.reservation-page')).toHaveLength(1);
    expect(component.find('div.page-title')).toHaveLength(1);
    expect(component.find(HelpLink)).toHaveLength(1);
    expect(component.find(PermitFilter)).toHaveLength(1);
    expect(component.find(PermitAction)).toHaveLength(1);
    expect(component.find(PermitGrid)).toHaveLength(1);
    expect(component.find(Error)).toHaveLength(1);
    component.setState({'topOffset': 0});

    component.setProps({
      permits: fromJS({
        isPermitAccessible: 'false',
        selectedPermit: {},
        message: 'not accessible'
      })
    });

    expect(component.find('div.permit-access-message')).toHaveLength(1);
    expect(actions.raiseUnrecognizedAuthCode).not.toHaveBeenCalled();
    __STATIC__ = true;
  });

  it('component should render without error if do not have authority', () => {
    const authority = [
      {
        authorityType: 'hide',
        id: 'reservationsPage',
        name: 'Reservations Page'
      }
    ];

    Authority.init(authority);
    const component = setup(Object.assign({}, props));

    expect(component.find('section.reservation-page')).toHaveLength(0);
    expect(component.find(Error)).toHaveLength(0);
    expect(actions.raiseUnrecognizedAuthCode).not.toHaveBeenCalled();
  });

  it('component should render without error if raise unrecognized authority', () => {
    const authority = [
      {
        authorityType: 'unrecognized_authority',
        id: 'reservationsPage',
        name: 'Reservations Page'
      }
    ];

    Authority.init(authority);
    const component = setup(Object.assign({}, props));

    expect(component.find('section.reservation-page')).toHaveLength(0);
    expect(component.find(Error)).toHaveLength(1);
  });
});
