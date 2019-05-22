import React from 'react';
import { fromJS } from 'immutable';
import { mount } from 'enzyme';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import context, { childContextTypes } from 'utils/context';

import { EnrollForm as EnrollFormPure } from 'index/modules/Daycare/EnrollForm';
import { SESSIONS, ENROLL_DETAIL } from 'index/modules/Daycare/EnrollForm/consts/sectionName';

jest.mock('index/modules/Daycare/EnrollForm/components/EnrollDetailSection/AuthorizedPickup', () => 'AuthorizedPickup');
jest.mock('index/modules/Daycare/EnrollForm/components/EnrollDetailSection/Question', () => 'Question');
jest.mock('index/modules/Daycare/EnrollForm/components/EnrollDetailSection', () => 'EnrollDetailSection');
jest.mock('index/modules/Daycare/EnrollForm/components/ParticipantSection', () => 'ParticipantSection');
jest.mock('index/modules/Daycare/EnrollForm/components/SessionSection', () => 'SessionSection');
jest.mock('index/modules/Daycare/EnrollForm/components/FeeSummary', () => 'FeeSummary');
jest.mock('shared/consts/legancyUrls', () => ({
  homeUrl: 'http://test.com',
  activitySearchUrl: 'http://test.com'
}));

jest.mock('shared/utils/locationHelp', () => ({
  destroy: () => {},
  initPromptWhenLeavePage: () => { },
  redirect: () => { },
  beforeunloadPrompt: true
}));

jest.mock('react-base-ui/lib/common/restClient/syncRequest', () => () => {});

const participants = {
  id: null,
  validId: null,
  list: [
    {
      id: 1,
      name: 'Bo Xu',
      validation_msg: null
    },
    {
      id: 2,
      name: 'Flora1 Xu',
      validation_msg: 'Does not meet gender qualification.'
    }
  ]
};

const enrollSession = {
  reservationUnit: 0,
  individualSelection: false,
  sessions: [
    { session_id: 331 },
    { session_id: 333 }
  ],
  selectedSessionIds: []
};

const collapse = {
  collapseSections: [SESSIONS, ENROLL_DETAIL],
  disableSections: []
};

const feeSummary = {
  subTotal: 10.0,
  tax: 0.95,
  total: 10.95
};

const enrollForm = {
  error: {},
  programName: 'No-Radio-No-Life Program'
};

const enrollDetail = {};

const params = { programId: 435 };

const location = { query: { } };

const receipt = { receiptNumber: 0 };

const routes = [
  {
    path: '/site',
    breadcrumbOptions: { name: 'Home', href: 'https://apm.activenet.com/Home' }
  },
  {
    path: 'program/:programId',
    breadcrumbOptions: { name: 'FlexRegZZ Program Detail' }
  }
];

const router = {
  setRouteLeaveHook: () => { }
};

const actions = {
  fetchParticipants: jest.fn(),
  selectParticipant: jest.fn(),
  selectEnrollSession: jest.fn(),
  fetchEnrollFormEntryAsyncAction: jest.fn(),
  fetchPickups: jest.fn(),
  changeQuestionAnswer: jest.fn(),
  selectPickups: jest.fn()
};

const defaultProps = {
  participants: fromJS(participants),
  enrollSession: fromJS(enrollSession),
  feeSummary: fromJS(feeSummary),
  enrollForm: fromJS(enrollForm),
  enrollDetail: fromJS(enrollDetail),
  collapse: fromJS(collapse),
  receipt: fromJS(receipt),
  responsive: { isSm: false, isMd: false, isLg: true }
};

const setup = (_props = {}, _context = context) => {
  const props = Object.assign({}, defaultProps, _props);

  const component = mount(
    <EnrollFormPure
      intl={{ messages: {} }}
      {...actions}
      validateEnrollForm={() => new Promise(resolve => resolve())}
      params={params}
      location={location}
      routes={routes}
      router={router}
      {...props}
    />,
    { context: _context, childContextTypes }
  );
  return {
    component,
    breadcrumb: component.find('.override-breadcrumb'),
    primaryHeader: component.find('h1.enrollform__primary-header'),
    description: component.find('.an-truncation'),
    extraDetails: component.find('.enrollform-extra'),
    actions
  };
};

describe('index/modules/Daycare/EnrollForm', () => {
  beforeEach(() => {
    Object.keys(actions).forEach(key => actions[key].mockReset());
  });

  it('should render breadcrumb fine', () => {
    const component = mountWithIntl(
      <EnrollFormPure
        intl={{ messages: {} }}
        {...actions}
        validateEnrollForm={() => new Promise(resolve => resolve())}
        params={params}
        location={location}
        routes={routes}
        router={router}
        {...defaultProps}
      />,
      { context, childContextTypes }
    );
    const breadcrumb = component.find('.override-breadcrumb');
    expect(breadcrumb).toHaveLength(1);
    expect(breadcrumb.find('a')).toHaveLength(3);
    expect(breadcrumb.find('.an-breadcrumb__separator')).toHaveLength(3);
    breadcrumb.find('a').at(1).simulate('click');
    breadcrumb.find('a').at(2).simulate('click');
    const items = breadcrumb.find('.an-breadcrumb__item');
    expect(items).toHaveLength(4);

    const aNodeList = breadcrumb.find('a');
    expect(aNodeList.at(0).text()).toEqual('HomeZ~');
    expect(aNodeList.at(1).text()).toEqual('ActivitiesZ Home ~ Search');
    expect(aNodeList.at(2).text()).toEqual('FlexRegZZ ~ Program Detail');
    component.unmount();
  });

  it('should render headers fines', () => {
    const { primaryHeader, actions } = setup();

    expect(actions.fetchEnrollFormEntryAsyncAction).toHaveBeenCalled();
    expect(primaryHeader).toHaveLength(1);
    expect(primaryHeader.text()).toEqual(' No-Radio-No-Life Program');
  });

  it('should selectParticipant correctly', () => {
    const { component, actions } = setup();
    const instance = component.instance();
    const participantId = 1;
    instance.selectParticipant(participantId);
    instance.isSessionModify = true;
    instance.initPromptWhenLeavePage();
    expect(actions.selectParticipant).toBeCalledWith(
      params.programId,
      participantId,
      receipt.receiptNumber
    );
    component.unmount();
  });

  it('should selectParticipant correctly', () => {
    const { component, actions } = setup();
    const instance = component.instance();
    const sessionId = 31;
    instance.selectSessions(sessionId);
    expect(instance.isSessionModify).toBe(true);
    expect(actions.selectEnrollSession).toHaveBeenCalled();
  });

  it('should selectParticipant correctly', () => {
    const { component, actions } = setup();
    const instance = component.instance();

    instance.onAddToCartButtonClick();
    expect(instance.isSessionModify).toBe(false);
    expect(instance.isEditChangeParticipant).toBe(false);
  });

  it('should not fetch participants separately in edit mode', () => {
    const { actions } = setup({ location: { query: { reno: 1 } } });
    expect(actions.fetchParticipants).not.toHaveBeenCalled();
  });

  it('Stick integration shall work fine', () => {
    const { component } = setup();
    const instance = component.instance();
    expect(component.state().stuck).toEqual(false);

    instance.handleStickyStateChange({ isSticky: true });
    expect(component.state().stuck).toEqual(true);

    instance.selectPickups();
    expect(actions.selectPickups).toHaveBeenCalled();
  });

  it('fetchPickups shall work fine', () => {
    const { component } = setup();
    const instance = component.instance();
    instance.fetchPickups();
    expect(actions.fetchPickups).toHaveBeenCalled();
    instance.changeQuestionAnswer();
    expect(actions.changeQuestionAnswer).toHaveBeenCalled();
  });

  it('if modify EnrollForm selectParticipant and deleteTransaction shall work fine', () => {
    const participants = {
      id: 1,
      validId: null,
      list: [
        {
          id: 1,
          name: 'Bo Xu',
          validation_msg: null
        },
        {
          id: 2,
          name: 'Flora1 Xu',
          validation_msg: 'Does not meet gender qualification.'
        }
      ]
    };

    const newProps = {
      ...defaultProps,
      receipt: fromJS({ receiptNumber: 323 }),
      participants: fromJS(participants)
    };

    const component = mount(
      <EnrollFormPure
        intl={{ messages: {} }}
        {...actions}
        validateEnrollForm={() => new Promise(resolve => resolve())}
        params={params}
        location={{ query: { reno: 1 } }}
        routes={routes}
        router={router}
        {...newProps}
      />,
      { context, childContextTypes }
    );
    const instance = component.instance();
    instance.selectParticipant();
    expect(instance.isEditChangeParticipant).toBe(true);
    instance.initPromptWhenLeavePage();
    instance.deleteTransaction();

    instance.getParticipantName();
  });

  it('routerWillLeave shall work fine', () => {
    const { component } = setup();
    const instance = component.instance();
    instance.routerWillLeave();

    instance.isEditChangeParticipant = true;
    instance.routerWillLeave();
  });
});
