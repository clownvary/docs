import React from 'react';
import { SessionCardFooter } from 'shared/components/SessionCard/SessionCardFooter';
import { mountWithIntl as mount } from 'utils/enzymeWithIntl';

describe('shared/components/SessionCard/SessionCardFooter', () => {
  const session = {
    session_id: 63,
    session_name: 'Week 1109',
    description: 'week 1109 to week 1115',
    first_date: '2018 Nov 9',
    last_date: '2018 Nov 15',
    beginning_time: '8:00 AM',
    ending_time: '10:00 AM',
    days_of_week: 'Everyday',
    weeks_of_month: '',
    session_status: 3,
    "waitlisted_enrolled_dates": [
      "18,19 Jul 2019",
      "21 Aug 2019"
    ],
    "partially_full_dates": [
      "18,19,20 Jul 2018",
      "21 Aug 2019"
    ],
  };

  it('SessionCardFooter component Should correctly', () => {

    let wrapper = mount(<SessionCardFooter session={session} selected isPartiallyEnrolledOrWaitlisted responsive={{isSm:false}}/>);
    expect(wrapper.find('.session-card__footer__label').text()).toBe('Except enrolled/waitlisted dates:');
    wrapper = mount(<SessionCardFooter session={{...session, session_status: 1}} selected isPartiallyEnrolledOrWaitlisted responsive={{isSm:false}}/>);
    expect(wrapper.find('.session-card__footer__label').text()).toBe('Except enrolled dates:');
    wrapper = mount(<SessionCardFooter session={{...session, session_status: 2}} selected isPartiallyEnrolledOrWaitlisted responsive={{isSm:false}}/>);
    expect(wrapper.find('.session-card__footer__label').text()).toBe('Except waitlisted dates:');
    wrapper = mount(<SessionCardFooter session={{...session, session_status: 4}} selected isPartiallyFullAndNotAllowWaitlist responsive={{isSm:false}}/>);
    expect(wrapper.find('.session-card__footer__label').text()).toBe('Except full dates:');
    wrapper = mount(<SessionCardFooter session={{...session, session_status: 5}} selected isPartiallyFullAndAllowWaitlist responsive={{isSm:false}}/>);
    expect(wrapper.find('.session-card__footer__label').text()).toBe('Include full date(s):');

    wrapper = mount(<SessionCardFooter
      session={{ ...session, session_status: 6 }}
      selected
      isPartiallyEnrolledOrWaitlisted
      isPartiallyFullAndNotAllowWaitlist
      responsive={{isSm: false}}
    />);
    let footerLabel = wrapper.find('.session-card__footer__label')
    expect(footerLabel.at(0).text()).toBe('Except enrolled dates:');
    expect(footerLabel.at(1).text()).toBe('Except full dates:');

    wrapper = mount(<SessionCardFooter
      session={{ ...session, session_status: 7 }}
      selected
      isPartiallyEnrolledOrWaitlisted
      isPartiallyFullAndNotAllowWaitlist
      responsive={{isSm: false}}
    />);
    footerLabel = wrapper.find('.session-card__footer__label')
    expect(footerLabel.at(0).text()).toBe('Except waitlisted dates:');
    expect(footerLabel.at(1).text()).toBe('Except full dates:');
    expect(wrapper.find('.session-card__footer__label + div').at(0).text()).toBe('18,19 Jul 2019 / 21 Aug 2019');
    expect(wrapper.find('.session-card__footer__label + div').at(1).text()).toBe('18,19,20 Jul 2018 / 21 Aug 2019');

    wrapper = mount(<SessionCardFooter
      session={{ ...session, session_status: 8 }}
      selected
      isPartiallyEnrolledOrWaitlisted
      isPartiallyFullAndNotAllowWaitlist
      responsive={{isSm: false}}
    />);
    footerLabel = wrapper.find('.session-card__footer__label')
    expect(footerLabel.at(0).text()).toBe('Except enrolled/waitlisted dates:');
    expect(footerLabel.at(1).text()).toBe('Except full dates:');
    expect(wrapper.find('.session-times__status')).toHaveLength(0);

    wrapper = mount(<SessionCardFooter
      session={{ ...session, session_status: 9 }}
      selected
      isPartiallyEnrolledOrWaitlisted
      isPartiallyFullAndAllowWaitlist
      responsive={{isSm: false}}
    />);
    footerLabel = wrapper.find('.session-card__footer__label')
    expect(footerLabel.at(0).text()).toBe('Except enrolled dates:');
    expect(footerLabel.at(1).text()).toBe('Include full date(s):');
    expect(wrapper.find('.session-times__status')).toHaveLength(1);

    wrapper = mount(<SessionCardFooter
      session={{ ...session, session_status: 10 }}
      selected
      isPartiallyEnrolledOrWaitlisted
      isPartiallyFullAndAllowWaitlist
      responsive={{isSm: false}}
    />);
    footerLabel = wrapper.find('.session-card__footer__label')
    expect(footerLabel.at(0).text()).toBe('Except waitlisted dates:');
    expect(footerLabel.at(1).text()).toBe('Include full date(s):');
    expect(wrapper.find('.session-times__status')).toHaveLength(1);

    wrapper = mount(<SessionCardFooter
      session={{ ...session, session_status: 11 }}
      selected
      isPartiallyEnrolledOrWaitlisted
      isPartiallyFullAndAllowWaitlist
      responsive={{isSm: true}}
    />);
    footerLabel = wrapper.find('.session-card__footer__label')
    expect(footerLabel.at(0).text()).toBe('Except enrolled/waitlisted dates:');
    expect(footerLabel.at(1).text()).toBe('Include full date(s):');
    expect(wrapper.find('.session-times__status')).toHaveLength(1);
  });
});
