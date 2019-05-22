import React from 'react';
import { fromJS } from 'immutable';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import context, { childContextTypes } from 'utils/context';

import { Program } from 'index/modules/Daycare/Program';

const programInfo = {
  sessionFacilities: [],
  ageMinRestriction: [0, 0, 0],
  ageMaxRestriction: [0, 0, 0],
  programName: 'No-Radio-No-Life Program',
  seasonName: 'Spring 2018',
  programNumber: '6036',
  description: 'Sora and Shiro are two hikikomori step-siblings who are known in the online gaming world as Blank, an undefeated group of gamers. ',
  extraDetails: [{
    extraDetailId: 11992,
    extraDetailType: 'Document'
  }],
  enrollStatus: {
    enabled: true,
    startMessage: 'Opens on Feb 20, 2017 9:00 am.',
    generalMessage: 'Online enrollment opening soon.'
  }
};

const sessions = fromJS({
  fetched: true,
  sessions: [],
  exceptionDates: {},
  extraDates: {}
})

const params = { programId: 435 };

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

const setup = (_props = {}, _context = context) => {
  const props = Object.assign({}, {
    programInfo: fromJS(programInfo),
    sessions,
    feeSummary: fromJS({
      free: false,
      individualSelection: true,
      estimatePrice: 199
    }),
    responsive: { isSm: false, isMd: false }
  }, _props);
  const actions = {
    fetchProgramInfo: jest.fn(),
    fetchSessions: jest.fn(),
    fetchExceptionDates: jest.fn(),
    fetchEnrollNow: jest.fn(),
    fetchEstimatePrice: jest.fn()
  };
  const component = mountWithIntl(
    <Program
      {...props}
      {...actions}
      params={params}
      routes={routes}
    />,
    { context: _context, childContextTypes }
  );
  return {
    component,
    breadcrumb: component.find('.program__override-breadcrumb'),
    primaryHeader: component.find('h1.program__primary-header'),
    secondaryHeader: component.find('.program__secondary-header'),
    description: component.find('.an-truncation'),
    extraDetails: component.find('.program-extra'),
    actions
  };
};

describe('index/modules/Daycare/Program', () => {
  it('Should render breadcrumb fine', () => {
    const { breadcrumb } = setup();
    expect(breadcrumb).toHaveLength(1);
    expect(breadcrumb.find('a')).toHaveLength(2);
    expect(breadcrumb.find('.an-breadcrumb__separator')).toHaveLength(2);

    const items = breadcrumb.find('.an-breadcrumb__item');
    expect(items).toHaveLength(3);

    const aNodeList = breadcrumb.find('a');
    expect(aNodeList.at(0).text()).toEqual('HomeZ~');
    expect(aNodeList.at(1).text()).toEqual('ActivitiesZ Home ~ Search');
  });

  it('Should render headers fines', () => {
    const { primaryHeader, secondaryHeader } = setup();

    expect(primaryHeader).toHaveLength(1);
    expect(primaryHeader.text()).toEqual('No-Radio-No-Life Program');

    expect(secondaryHeader).toHaveLength(1);
    const secondaryHeaderSpans = secondaryHeader.find('span');
    expect(secondaryHeaderSpans).toHaveLength(3);
    expect(secondaryHeaderSpans.at(0).text()).toEqual('Spring 2018');
    expect(secondaryHeaderSpans.at(1).text()).toEqual('|');
    expect(secondaryHeaderSpans.at(2).text()).toEqual('#6036');
  });

  it('Should render headers fine if no season name', () => {
    const noSeasonNameProgramInfo = Object.assign({}, programInfo, {
      seasonName: ''
    });
    const { secondaryHeader } = setup({ programInfo: fromJS(noSeasonNameProgramInfo) });
    expect(secondaryHeader).toHaveLength(1);
    const secondaryHeaderSpans = secondaryHeader.find('span');
    expect(secondaryHeaderSpans).toHaveLength(1);
    expect(secondaryHeaderSpans.at(0).text()).toEqual('#6036');
  });

  it('Should render description fine', () => {
    const { description } = setup();
    expect(description).toHaveLength(1);
    expect(description.text()).toEqual(`Description: ${programInfo.description}`);
  });

  it('Should render extra details fine', () => {
    const { extraDetails } = setup();
    expect(extraDetails).toHaveLength(1);
  });

  it('ComponentDidMount should work fine', () => {
    const { actions } = setup();
    expect(actions.fetchProgramInfo).toHaveBeenCalledTimes(1);
    expect(actions.fetchExceptionDates).toHaveBeenCalledTimes(1);
  });

  it('handleStickyStateChange should work fine', () => {
    const { component } = setup();
    const instance = component.instance();

    expect(instance.state.stuck).toBeFalsy();

    instance.handleStickyStateChange({ isSticky: true });
    expect(instance.state.stuck).toBeTruthy();
  });

  it('onEnrollNow should work fine', () => {
    const { component, actions } = setup();
    const instance = component.instance();

    instance.onEnrollNow();
    expect(actions.fetchEnrollNow).toHaveBeenCalledTimes(1);
  });

  it('render responsive layout correctly', () => {
    const { component } = setup({ responsive: { isSm: true } });
    expect(component.find('.module-daycare .heading')).toHaveLength(1);
    expect(component.find('.module-daycare-program .heading')).toHaveLength(0);
  });
});
