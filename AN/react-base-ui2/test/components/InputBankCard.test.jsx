import React from 'react';
import { mount } from 'enzyme';
import InputBankCard from 'src/components/InputBankCard';

describe('InputBankCard Component - dom render', () => {
  test('InputBankCard render Input component with the default class', () => {
    const wrapper = mount(
      <InputBankCard />
    );
    expect(wrapper.find('div.input-bank-card-base').length).toEqual(1);
    expect(wrapper.find('div.input-bank-card-base').find('Input').length).toEqual(1);
  });
});

describe('InputBankCard Component - check defaultProps', () => {
  test('Should get all defaultProps as expected', () => {
    const wrapper = mount(
      <InputBankCard />
    );
    expect(wrapper.prop('value')).toEqual('');
    expect(wrapper.prop('className')).toEqual('');
    expect(wrapper.prop('group')).toEqual(4);
    expect(wrapper.prop('maxLength')).toEqual(16);
    expect(wrapper.prop('showPrompt')).toEqual(false);
    expect(wrapper.prop('keepPosition')).toEqual(false);
    expect(wrapper.prop('gapChar')).toEqual(' ');
  });

  test('Should get the expected mask property by maxLength and group property', () => {
    const wrapper = mount(
      <InputBankCard />
    );
    const mask = wrapper.instance().getMask();
    const expectedMask = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
    expect(mask).toEqual(expectedMask);
  });

  test('Should show the expected formatted value if pass a pure number(string)', () => {
    const wrapper = mount(
      <InputBankCard value="233658763587" />
    );
    expect(wrapper.instance().preValue).toEqual('2336 5876 3587');
  });

  test('Should show the expected formatted value if pass a none pure number(string)', () => {
    const wrapper = mount(
      <InputBankCard value="2336abc   5876$%3587" />
    );
    expect(wrapper.instance().preValue).toEqual('2336 5876 3587');
  });
});

describe('InputBankCard Component - check mask property', () => {
  test('Should get the expected mask property if pass 0 or null as maxLength', () => {
    const wrapper = mount(
      <InputBankCard maxLength={0} />
    );
    const mask = wrapper.instance().getMask();
    const expectedMask = [];
    expect(mask).toEqual(expectedMask);

    const wrapper2 = mount(
      <InputBankCard maxLength={null} />
    );
    const mask2 = wrapper2.instance().getMask();
    const expectedMask2 = [];
    expect(mask2).toEqual(expectedMask2);
  });

  test('Should get the expected mask property if pass 0 or null', () => {
    const wrapper = mount(
      <InputBankCard group={0} />
    );
    const mask = wrapper.instance().getMask();
    const expectedMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
    expect(mask).toEqual(expectedMask);

    const wrapper2 = mount(
      <InputBankCard group={null} />
    );
    const mask2 = wrapper2.instance().getMask();
    const expectedMask2 = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
    expect(mask2).toEqual(expectedMask2);
  });

  test('Should get the expected mask property if pass "" or null as gapChar', () => {
    const wrapper = mount(
      <InputBankCard gapChar={''} />
    );
    const mask = wrapper.instance().getMask();
    const expectedMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
    expect(mask).toEqual(expectedMask);

    const wrapper2 = mount(
      <InputBankCard gapChar={null} />
    );
    const mask2 = wrapper2.instance().getMask();
    const expectedMask2 = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
    expect(mask2).toEqual(expectedMask2);
  });
});

describe('InputBankCard Component - check gourp property using different value', () => {
  test('Should get the expected value show and mask if pass 5', () => {
    const wrapper = mount(
      <InputBankCard group={5} value="2937924733433453463" />
    );
    const mask = wrapper.instance().getMask();
    const expectedMask = [/\d/, /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, ' ', /\d/];
    expect(mask).toEqual(expectedMask);
    expect(wrapper.instance().preValue).toEqual('29379 24733 43345 3');
  });

  test('Should get the expected value show and mask if pass 4', () => {
    const wrapper = mount(
      <InputBankCard group={4} value="2937924733433453463" />
    );
    const mask = wrapper.instance().getMask();
    const expectedMask = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
    expect(mask).toEqual(expectedMask);
    expect(wrapper.instance().preValue).toEqual('2937 9247 3343 3453');
  });

  test('Should get the expected value show and mask if pass 3', () => {
    const wrapper = mount(
      <InputBankCard group={3} value="2937924733433453463" />
    );
    const mask = wrapper.instance().getMask();
    const expectedMask = [/\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/];
    expect(mask).toEqual(expectedMask);
    expect(wrapper.instance().preValue).toEqual('293 792 473 343 345 3');
  });

  test('Should get the expected value show and mask if pass 1', () => {
    const wrapper = mount(
      <InputBankCard group={1} value="2937924733433453463" />
    );
    const mask = wrapper.instance().getMask();
    const expectedMask = [/\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/];
    expect(mask).toEqual(expectedMask);
    expect(wrapper.instance().preValue).toEqual('2 9 3 7 9 2 4 7 3 3 4 3 3 4 5 3');
  });

  test('Should get the expected value show and mask if pass 0', () => {
    const wrapper = mount(
      <InputBankCard group={0} value="2937924733433453463" />
    );
    const mask = wrapper.instance().getMask();
    const expectedMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
    expect(mask).toEqual(expectedMask);
    expect(wrapper.instance().preValue).toEqual('2937924733433453');
  });
});

describe('InputBankCard Component - check maxLength using different value', () => {
  test('Should get the expected value show and mask if pass 10', () => {
    const wrapper = mount(
      <InputBankCard maxLength={10} value="2937924733433453463" />
    );
    const mask = wrapper.instance().getMask();
    const expectedMask = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/];
    expect(mask).toEqual(expectedMask);
    expect(wrapper.instance().preValue).toEqual('2937 9247 33');
  });

  test('Should get the expected value show and mask if pass 6', () => {
    const wrapper = mount(
      <InputBankCard maxLength={6} value="2937924733433453463" />
    );
    const mask = wrapper.instance().getMask();
    const expectedMask = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/];
    expect(mask).toEqual(expectedMask);
    expect(wrapper.instance().preValue).toEqual('2937 92');
  });

  test('Should get the expected value show and mask if pass 4', () => {
    const wrapper = mount(
      <InputBankCard maxLength={4} value="2937924733433453463" />
    );
    const mask = wrapper.instance().getMask();
    const expectedMask = [/\d/, /\d/, /\d/, /\d/];
    expect(mask).toEqual(expectedMask);
    expect(wrapper.instance().preValue).toEqual('2937');
  });

  test('Should get the expected value show and mask if pass 1', () => {
    const wrapper = mount(
      <InputBankCard maxLength={1} value="2937924733433453463" />
    );
    const mask = wrapper.instance().getMask();
    const expectedMask = [/\d/];
    expect(mask).toEqual(expectedMask);
    expect(wrapper.instance().preValue).toEqual('2');
  });

  test('Should get the expected value show and mask if pass 0', () => {
    const wrapper = mount(
      <InputBankCard maxLength={0} value="2937924733433453463" />
    );
    const mask = wrapper.instance().getMask();
    const expectedMask = [];
    expect(mask).toEqual(expectedMask);
    expect(wrapper.instance().preValue).toEqual('');
  });
});

describe('InputBankCard Component - check gapChar using different value', () => {
  test('Should get the expected value show and mask if pass " - "', () => {
    const wrapper = mount(
      <InputBankCard gapChar={' - '} value="2937924733433453463" />
    );
    expect(wrapper.instance().preValue).toEqual('2937 - 9247 - 3343 - 3453');
  });

  test('Should get the expected value show and mask if pass " ~ "', () => {
    const wrapper = mount(
      <InputBankCard gapChar={' ~ '} value="2937924733433453463" />
    );
    expect(wrapper.instance().preValue).toEqual('2937 ~ 9247 ~ 3343 ~ 3453');
  });

  test('Should get the expected value show and mask through update gapChar from " ~ " to " % "', () => {
    const wrapper = mount(
      <InputBankCard gapChar={' ~ '} value="2937924733433453463" />
    );
    expect(wrapper.instance().preValue).toEqual('2937 ~ 9247 ~ 3343 ~ 3453');
    wrapper.setProps({ gapChar: ' % ' });
    expect(wrapper.instance().preValue).toEqual('2937 % 9247 % 3343 % 3453');
  });
});

describe('InputBankCard Component - check showPrompt using different value', () => {
  test('Should get the expected value show and mask if pass true', () => {
    const wrapper = mount(
      <InputBankCard showPrompt value="293792" />
    );
    expect(wrapper.instance().preValue).toEqual('2937 92__ ____ ____');
  });

  test('Should get the expected value show and mask if pass false', () => {
    const wrapper = mount(
      <InputBankCard showPrompt={false} value="293792" />
    );
    expect(wrapper.instance().preValue).toEqual('2937 92');
  });

  test('Should get the expected value show and mask through update showPrompt from false to true', () => {
    const wrapper = mount(
      <InputBankCard showPrompt={false} value="293792" />
    );
    expect(wrapper.instance().preValue).toEqual('2937 92');
    wrapper.setProps({ showPrompt: true });
    expect(wrapper.instance().preValue).toEqual('2937 92__ ____ ____');
  });
});

describe('InputBankCard Component - check keepPosition using different value', () => {
  test('Should get the expected value show and mask if pass true', () => {
    const wrapper = mount(
      <InputBankCard showPrompt keepPosition value="293792" />
    );
    expect(wrapper.instance().preValue).toEqual('2937 92__ ____ ____');
  });

  test('Should get the expected value show and mask if pass false', () => {
    const wrapper = mount(
      <InputBankCard showPrompt keepPosition={false} value="293792" />
    );
    expect(wrapper.instance().preValue).toEqual('2937 92__ ____ ____');
  });

  test('Should get the expected value show and mask through update keepPosition from true to false', () => {
    const wrapper = mount(
      <InputBankCard showPrompt keepPosition value="293792" />
    );
    expect(wrapper.instance().preValue).toEqual('2937 92__ ____ ____');
    wrapper.setProps({ keepPosition: false });
    expect(wrapper.instance().preValue).toEqual('2937 92__ ____ ____');
  });
});

describe('InputBankCard Component - check simulate value change using different value', () => {
  test('Should get the expected value show and mask if pass true', () => {
    const onChangeMock = jest.fn(); // eslint-disable-line
    const wrapper = mount(
      <InputBankCard value="293792" onChange={onChangeMock} onInput={onChangeMock} />
    );
    expect(wrapper.instance().preValue).toEqual('2937 92');

    wrapper.find('input').simulate('input', {
      target: {
        value: '45636534056'
      }
    });
    expect(onChangeMock).toBeCalled();
    expect(wrapper.instance().preValue).toEqual('4563 6534 056');
  });
});
