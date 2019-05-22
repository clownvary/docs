import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import TextNotice from 'index/components/Master/components/Footer/TextNotice';
//eslint-disable-next-line

import context from 'utils/context';

const footer = context.systemSettings.get('footer');

const haveQuestions = footer.get('have_questions').toJS();

const methodsOfPayment = footer.get('methods_of_payment').toJS();

function setup(_data = haveQuestions) {
  const component = mount(
    <TextNotice
      data={_data}
    />);

  return {
    component,
    dlElement: component.find('dl')
  };
}

describe('index/components/Master/components/Footer/TextNotice', () => {
  it('should render haveQuestions well', () => {
    const {
      dlElement
    } = setup();

    const dtText = dlElement.find('dt').text();

    const aHref = dlElement.find('a').props().href;
    const aText = dlElement.find('a').text();

    expect(dlElement.length).toEqual(methodsOfPayment.items.length);
    expect(dtText).toEqual(haveQuestions.title);
    expect(aHref).toEqual('javascript:void(0)');
    dlElement.find('a').simulate('click');
    expect(aText).toEqual(haveQuestions.items[0].title);
  });

  it('should render methodsOfPayment well', () => {
    const {
      dlElement
    } = setup(methodsOfPayment);

    const dtText = dlElement.find('dt').first().text();
    const aElemnt = dlElement.find('a');

    expect(dlElement.length).toEqual(methodsOfPayment.items.length);
    expect(dtText).toEqual(methodsOfPayment.title);
    expect(aElemnt.length).toEqual(0);
  });

  it('data is null', () => {
    const {
      dlElement
    } = setup(null);

    const dtText = dlElement.find('dt').first().text();
    const aElemnt = dlElement.find('a');

    expect(dlElement.length).toEqual(methodsOfPayment.items.length);
    expect(dtText).toEqual('');
    expect(aElemnt.length).toEqual(0);
  });
});
