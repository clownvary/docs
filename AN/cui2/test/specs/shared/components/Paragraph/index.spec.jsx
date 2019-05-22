import React from 'react';
import Paragraph from 'shared/components/Paragraph';
import { LINE, CHAR } from 'shared/components/Paragraph/truncationType';
import { mount } from 'enzyme';

const text = 'Sora and Shiro are two hikikomori step-siblings who are known in the online gaming world as Blank, an undefeated group of gamers. One day, they are challenged to a game of chess by Tet, a god from another reality. The two are victorious and are offered to live in a world that centers around games. They accept, believing it to be a joke, and are summoned to a reality known as Disboard[Jp. 1]. There, a spell known as the Ten Pledges prevents the citizens of Disboard from inflicting harm on one another, forcing them to resolve their differences by gambling with games whose rules and rewards are magically enforced. In-game, rule enforcement only occurs when the method of cheating is acknowledged and outed by the opponent, allowing players to cheat through discreet methods. Sora and Shiro traverse to Elkia[Jp. 2], the nation inhabited by humans, and befriend the duchess Stephanie Dola. Learning about Elkia\'s decline, the two participate in a tournament to determine the next ruler; after winning the crown, they earn the right to challenge the Disboard\'s other species as humanity\'s representative.LN 1.4 Their next goal is to conquer all sixteen species in order to challenge Tet to a game; as of the sixth volume, five of the sixteen are under their control.';

describe('shared/components/Paragraph', () => {
  it('Should render component correctly with default props', () => {
    const component = mount(
      <Paragraph className="test-paragraph">
        {text}
      </Paragraph>
    );

    expect(component.find('.an-paragraph')).toHaveLength(1);
    expect(component.find('.u-text-left')).toHaveLength(1);
    expect(component.find('.u-text-pre-line')).toHaveLength(1);
    expect(component.find('.test-paragraph')).toHaveLength(1);
  });

  it('Should component works fine', () => {
    const component = mount(
      <Paragraph className="test-paragraph" align="right" preLineWrap={false}>
        <span>{text}</span>
      </Paragraph>
    );

    expect(component.find('.u-text-right')).toHaveLength(1);
    expect(component.find('.test-paragraph')).toHaveLength(1);
    expect(component.find('.u-text-pre-line')).toHaveLength(0);
  });

  it('Should render component fine with picture', () => {
    const picture = 'http://www.google.com/logo.png';
    const component = mount(
      <Paragraph picture={picture} pictureFloat="left">
        {text}
      </Paragraph>
    );

    expect(component.find('img.an-paragraph-img.u-float-left')).toHaveLength(1);
  });

  it('Should render component fine with line truncation', () => {
    const component = mount(
      <Paragraph truncateType={LINE} truncateValue={6}>
        {text}
      </Paragraph>
    );

    expect(component.find('LinesTruncation')).toHaveLength(1);
  });

  it('Should render component fine with char truncation', () => {
    const component = mount(
      <Paragraph truncateType={CHAR} truncateValue={100}>
        {text}
      </Paragraph>
    );

    expect(component.find('CharsTruncation')).toHaveLength(1);
  });
});
