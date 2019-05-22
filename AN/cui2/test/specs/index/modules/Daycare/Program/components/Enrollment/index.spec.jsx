import React from 'react';
import { fromJS } from 'immutable';
import { mountWithIntl } from 'utils/enzymeWithIntl';

import Enrollment from 'index/modules/Daycare/Program/components/Enrollment';

const defaultProps = {
  status: {
    enabled: true,
    inPersonEnabled: false,
    generalMessage: '',
    startMessage: '',
    endMessage: ''
  },
  feeSummary: fromJS({
    fetched: true,
    free: true,
    individualSelection: true,
    estimatePrice: 0
  }),
  sessionUnavailable: false,
  stuck: false,
  isSm: false,
  isMd: false
};

const setup = (_props = {}) => {
  const props = Object.assign({}, defaultProps, _props);
  const component = mountWithIntl(<Enrollment {...props} />);
  return {
    component,
    panel: component.find('.an-panel'),
    messagesDiv: component.find('.program-enrollment__info'),
    enrollBtn: component.find('.program-enrollment__enroll-btn')
  };
};

describe('index/modules/Daycare/Program/components/Enrollment', () => {
  it('Should render messagesDiv fine', () => {
    const status = {
      enabled: true,
      generalMessage: 'Online enrollment opening soon.',
      startMessage: 'Opens on Feb 20, 2017 9:00 am.',
      endMessage: 'Ends on May 3, 2017 10:00 am.'
    };
    const { panel, messagesDiv } = setup({ status });
    expect(messagesDiv).toHaveLength(1);

    const general = messagesDiv.find('.program-enrollment__message');
    expect(general).toHaveLength(1);
    expect(general.hasClass('is-opening')).toBeTruthy();
    expect(general.text()).toEqual(status.generalMessage);

    const timeMessage = messagesDiv.find('.program-enrollment__time');
    expect(timeMessage).toHaveLength(2);
    expect(timeMessage.at(0).text()).toEqual(status.startMessage);
    expect(timeMessage.at(1).text()).toEqual(status.endMessage);

    const estimatePrice = panel.find('.u-color-moneytext');
    expect(estimatePrice.text()).toEqual('Free');
  });

  it('Should render opening style message fine even if enroll closed', () => {
    const status = {
      enabled: false,
      inPersonEnabled: true,
      generalMessage: 'In person enrollment is still available.',
      endMessage: 'Internet registration closed on May 3, 2017 10:00 am.'
    };
    const { messagesDiv } = setup({ status });
    expect(messagesDiv).toHaveLength(1);

    const general = messagesDiv.find('.program-enrollment__message');
    expect(general).toHaveLength(1);
    expect(general.hasClass('is-opening-in-person')).toBeTruthy();
    expect(general.text()).toEqual(status.generalMessage);

    const timeMessage = messagesDiv.find('.program-enrollment__time');
    expect(timeMessage).toHaveLength(1);
    expect(timeMessage.at(0).text()).toEqual(status.endMessage);
  });

  it('Should render disabled enrollment fine', () => {
    const status = {
      enabled: false,
      generalMessage: 'Online Enrollment is Closed.'
    };
    const { messagesDiv, enrollBtn } = setup({ status });
    expect(messagesDiv).toHaveLength(1);

    const general = messagesDiv.find('.program-enrollment__message');
    expect(general).toHaveLength(1);
    expect(general.hasClass('is-opening')).toBeFalsy();

    expect(enrollBtn.props('disabled')).toBeTruthy();
    expect(enrollBtn.text()).toEqual('Enroll Now');
  });

  it('enrollment stuck should work fine', () => {
    const { panel } = setup({ stuck: true });
    expect(panel.hasClass('is-sticky')).toBeTruthy();
  });

  it('handle closeInfo correctly', () => {
    const { component } = setup({ isSm: true });
    const closeIcon = component.find('.icon-close');
    expect(closeIcon).toHaveLength(1);

    expect(component.find('.program-enrollment__info')).toHaveLength(1);
    closeIcon.simulate('click');
    expect(component.find('.program-enrollment__info')).toHaveLength(0);
  });

  it('enrollment renders correctly if sessions are no vacancy', () => {
    const { enrollBtn } = setup({ sessionUnavailable: true });
    expect(enrollBtn.props('disabled')).toBeTruthy();
    expect(enrollBtn.text()).toEqual('No Vacancy');
  });

  it('enrollment renders correctly if meet individual selection program', () => {
    const { panel } = setup({
      feeSummary: fromJS({
        fetched: true,
        free: false,
        individualSelection: true,
        estimatePrice: 199
      }),
      isMd: true
    });
    const btnContainer = panel.find('.program-enrollment__enroll-btn-container');
    expect(btnContainer.find('.program-enrollment__price')).toHaveLength(1);

    const startAt = panel.find('.program-enrollment__start-at');
    expect(startAt.text()).toEqual('Starting at');

    const estimatePrice = panel.find('.u-color-moneytext');
    expect(estimatePrice.text()).toEqual('$199.00');
    const estimatePricePost = panel.find('.program-enrollment__estimate__post');
    expect(estimatePricePost.text()).toEqual('/ session');
  });

  it('enrollment renders empty when the fee summary do not finish yet', () => {
    const { panel } = setup({
      feeSummary: defaultProps.feeSummary.set('fetched', false)
    });
    expect(panel.find('.program-enrollment__enroll-btn-container')).toHaveLength(1);
    expect(panel.find('.enrollment__price')).toHaveLength(0);
    expect(panel.find('.u-color-moneytext')).toHaveLength(0);
  });
});
